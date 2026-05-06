---
name: favicon-sprite-agent
description: Creates animated favicons using sprites or SVG animations for the web portfolio.
---

# Favicon Sprite Agent

Create animated favicons for the web portfolio.

## Files to create

- `public/favicon.svg` - Animated SVG favicon
- `public/favicon.png` - Fallback static favicon
- Update `index.html` to use new favicon

## Implementation

### Option 1: Animated SVG Favicon (Recommended)

SVG favicons support CSS animations and are lighter. Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <style>
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(0.8); opacity: 0.7; }
    }
    .logo { animation: pulse 2s ease-in-out infinite; transform-origin: center; }
  </style>
  <circle cx="16" cy="16" r="14" fill="#22c55e"/>
  <text x="16" y="21" text-anchor="middle" fill="white" font-family="monospace" font-size="14" font-weight="bold">D</text>
  <circle class="logo" cx="16" cy="16" r="12" fill="none" stroke="#22c55e" stroke-width="2"/>
</svg>
```

### Option 2: Multiple PNG Frames (Sprite Sheet)

For true animated .ico, create frames in `public/favicon-frames/`:

- `favicon-frame-0.png` (16x16)
- `favicon-frame-1.png` (16x16)
- `favicon-frame-2.png` (16x16)
- `favicon-frame-3.png` (16x16)

Then use JavaScript in `index.html` to cycle:

```html
<link rel="icon" type="image/png" href="/favicon-frame-0.png" id="favicon-sprite">
<script>
(function() {
  const frames = [
    '/favicon-frame-0.png',
    '/favicon-frame-1.png',
    '/favicon-frame-2.png',
    '/favicon-frame-3.png'
  ];
  let i = 0;
  setInterval(() => {
    document.getElementById('favicon-sprite').href = frames[i++ % frames.length];
  }, 500);
})();
</script>
```

### Option 3: Canvas-based Animation

For more complex animations, generate favicon dynamically via canvas (in `src/App.jsx` or a hook).

## Update index.html

Replace the favicon link in `index.html`:

```html
<link rel="icon" type="image/svg+xml" href="./favicon.svg">
```

Or keep both for browser compatibility:

```html
<link rel="icon" type="image/svg+xml" href="./favicon.svg">
<link rel="icon" type="image/x-icon" href="./favicon.ico">
```

## Verification

Check the page loads without favicon 404 errors:
```bash
bun run dev
```

Open browser console → Network tab → verify favicon.svg loads (200 status).

Confirm SVG renders correctly in browser tab.