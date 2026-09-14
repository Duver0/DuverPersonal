import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';
import { useIsDark } from '../../hooks/useIsDark.js';
import { GRID } from '../../theme/backgroundTokens.js';
import { GRID_VERT, GRID_FRAG } from './shaders.js';

const colorFor = (dark) => (dark ? GRID.dark.vec3 : GRID.light.vec3);
const baseAFor = (dark) => (dark ? GRID.dark.alpha : GRID.light.alpha);

const applyFallbackStyle = (canvas, dark) => {
  const token = dark ? GRID.dark : GRID.light;
  canvas.style.backgroundImage = `radial-gradient(${token.css} 1.2px, transparent 1.4px)`;
  canvas.style.backgroundSize = `${GRID.scale}px ${GRID.scale}px`;
};

/**
 * Capa de grid WebGL: puntos slate sutiles con revelado radial en hover.
 * - Lee color/alpha/escala de `backgroundTokens` + tema de `useIsDark`
 *   (sin MutationObserver propio).
 * - DPR cap 1.5. Draw estático inicial; el rAF solo arranca tras el primer
 *   `pointermove` y únicamente con `pointer: fine`.
 * - Fallback CSS con los grises slate del token.
 */
const GridLayer = () => {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();
  const isDark = useIsDark();
  const isDarkRef = useRef(isDark);
  const drawRef = useRef(null);

  // El tema cambia vía hook: re-dibuja (GL) o re-aplica fallback (sin GL).
  useEffect(() => {
    isDarkRef.current = isDark;
    if (drawRef.current) drawRef.current();
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      const drawFallback = () => applyFallbackStyle(canvas, isDarkRef.current);
      drawRef.current = drawFallback;
      drawFallback();
      return () => {
        drawRef.current = null;
      };
    }
    gl.getExtension('OES_standard_derivatives');

    const compile = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) return null;
      return sh;
    };
    const vs = compile(gl.VERTEX_SHADER, GRID_VERT);
    const fs = compile(gl.FRAGMENT_SHADER, GRID_FRAG);
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
    const uIsDark = gl.getUniformLocation(prog, 'uIsDark');

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const mouse = { x: 0.5, y: 0.5 };
    const target = { ...mouse };
    let hover = 0;
    let hoverTarget = 0;
    let running = false;
    let raf = 0;
    let idleTimer = 0;

    const draw = () => {
      const dark = isDarkRef.current;
      const col = colorFor(dark);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.x * canvas.width, mouse.y * canvas.height);
      gl.uniform1f(uHover, hover);
      gl.uniform1f(uBaseA, baseAFor(dark));
      gl.uniform3f(uColor, col[0], col[1], col[2]);
      gl.uniform1f(uIsDark, dark ? 1.0 : 0.0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    drawRef.current = draw;

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      draw();
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

    // Draw estático inicial; rAF solo tras primer pointermove con puntero fino.
    resize();
    window.addEventListener('resize', resize);
    const finePointer =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(pointer: fine)').matches;
    const interactive = !reduced && finePointer;
    if (interactive) {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idleTimer);
      drawRef.current = null;
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
    // `isDark` se sincroniza vía isDarkRef + efecto dedicado (sin re-iniciar GL).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] block h-full w-full"
      aria-hidden="true"
    />
  );
};

export default GridLayer;
