import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

const VERT = `attribute vec2 aPos; void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAG = `#extension GL_OES_standard_derivatives : enable
precision mediump float;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uHover;
uniform float uBaseA;
uniform vec3 uColor;
void main(){
  vec2 uv = gl_FragCoord.xy / uResolution;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 m = vec2((uMouse.x / uResolution.x) * aspect, uMouse.y / uResolution.y);
  vec2 toM = p - m;
  float dist = length(toM);
  vec2 dir = toM / max(dist, 1e-4);
  float radius = 0.22;
  // Dip cóncavo: las celdas se comprimen hacia el cursor (hundimiento, no bulbo).
  // Al reducir la distancia efectiva al centro, el grid se "arrastra" hacia adentro.
  float dip = (1.0 - smoothstep(0.0, radius, dist)) * uHover;
  float warpedDist = dist * (1.0 - dip * 0.5);
  float scale = 44.0;
  vec2 coord = (m + dir * warpedDist) * scale;
  vec2 gv = abs(fract(coord) - 0.5);
  vec2 edge = 0.5 - gv;
  float lwCell = 0.00001;
  vec2 aa = fwidth(coord);
  vec2 lines = 1.0 - smoothstep(lwCell - aa, lwCell + aa, edge);
  float grid = max(lines.x, lines.y);
  // Percepción de profundidad 3D:
  // - el fondo del pozo se atenúa levemente (sombra interior)
  // - el borde de la depresión capta luz (realce en el rim)
  float shade = 1.0 - dip * 0.35;
  float rim = (1.0 - smoothstep(0.0, 0.045, abs(dist - radius * 0.6))) * dip * 0.55;
  float ring = (1.0 - smoothstep(0.0, 0.03, abs(dist - radius))) * uHover * 0.22;
  float infl = dip;
  float glow = infl * 0.18 + rim + ring;
  gl_FragColor = vec4(uColor, (uBaseA + glow) * grid * shade);
}`;

const colorFor = (dark) => (dark ? [0.55, 0.55, 0.58] : [0.45, 0.4, 0.88]);
const baseAFor = (dark) => (dark ? 0.11 : 0.11);

const GridBackground = () => {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.warn('[GridBackground] No canvas ref found');
      return undefined;
    }
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn(
        '[GridBackground] WebGL NO disponible (probablemente bloqueado por el entorno/navegador). Usando fallback CSS grid.',
      );
      const applyFallback = (dark) => {
        const c = dark ? 'rgba(150,150,156,0.14)' : 'rgba(99,102,241,0.11)';
        canvas.style.backgroundImage = `linear-gradient(${c} 1px, transparent 1px), linear-gradient(90deg, ${c} 1px, transparent 1px)`;
        canvas.style.backgroundSize = '44px 44px';
      };
      applyFallback(document.documentElement.classList.contains('dark'));
      const fallbackObserver = new MutationObserver(() => {
        applyFallback(document.documentElement.classList.contains('dark'));
      });
      fallbackObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
      return () => fallbackObserver.disconnect();
    }
    gl.getExtension('OES_standard_derivatives');
    console.log('[GridBackground] WebGL OK — grid interactivo activo.');

    const compile = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.warn('[GridBackground] shader error:', gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return undefined;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return undefined;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'uResolution');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');
    const uHover = gl.getUniformLocation(prog, 'uHover');
    const uBaseA = gl.getUniformLocation(prog, 'uBaseA');
    const uColor = gl.getUniformLocation(prog, 'uColor');

    const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 2);
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      draw();
    };

    const mouse = { x: 0.5, y: 0.5 };
    const target = { ...mouse };
    let hover = 0;
    let hoverTarget = 0;
    let running = false;
    let raf = 0;
    let idleTimer = 0;

    let isDark = document.documentElement.classList.contains('dark');
    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark');
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const draw = () => {
      const col = colorFor(isDark);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.x * canvas.width, mouse.y * canvas.height);
      gl.uniform1f(uHover, hover);
      gl.uniform1f(uBaseA, baseAFor(isDark));
      gl.uniform3f(uColor, col[0], col[1], col[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = () => {
      running = true;
      mouse.x += (target.x - mouse.x) * 0.2;
      mouse.y += (target.y - mouse.y) * 0.2;
      hover += (hoverTarget - hover) * 0.08;
      draw();
      if (hover > 0.002 || hoverTarget > 0) {
        raf = requestAnimationFrame(loop);
      } else {
        hover = 0.0;
        draw();
        running = false;
      }
    };
    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const onMove = (e) => {
      target.x = e.clientX / window.innerWidth;
      target.y = (window.innerHeight - e.clientY) / window.innerHeight;
      hoverTarget = 1;
      start();
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        hoverTarget = 0;
      }, 1500);
    };
    const onLeave = () => {
      hoverTarget = 0;
    };

    resize();
    window.addEventListener('resize', resize);
    if (!reduced) {
      window.addEventListener('mousemove', onMove);
      document.addEventListener('mouseleave', onLeave);
      start();
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idleTimer);
      themeObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [reduced, colorFor, baseAFor]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 block w-full h-full"
      aria-hidden="true"
    />
  );
};

export default GridBackground;
