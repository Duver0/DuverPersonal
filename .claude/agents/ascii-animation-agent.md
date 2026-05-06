---
name: ascii-animation-agent
description: Creates ASCII art animations that run in the console, for use as a background effect in the web portfolio.
---

# ASCII Animation Agent

Create ASCII art animations for terminal/console display.

## Files to create

- `src/utils/ascii-animations.js` - JavaScript module with animation functions

## Implementation

Create `src/utils/ascii-animations.js` with functions that generate animated ASCII art frames. Include:

1. **Matrix rain effect** - Falling characters like the movie Matrix
2. **Starfield/space effect** - Stars moving toward the viewer
3. **Boot sequence** - Classic computer boot style animation
4. **Loading spinner** - Simple spinner for loading states

Each animation should:
- Export a `frames` array with sequential ASCII frames
- Export a `name` string identifying the animation
- Export optional `delay` in ms between frames (default ~100ms)
- Be self-contained (no external dependencies)

Example structure:

```js
export const MATRIX = {
  name: 'matrix',
  delay: 80,
  frames: [
    // Array of ASCII frame strings
  ],
};

export const STARFIELD = {
  name: 'starfield',
  delay: 100,
  frames: [
    // Array of ASCII frame strings
  ],
};
```

## Animation Requirements

- Frames should be 20-30 characters wide for readability
- Use characters: `.`, `*`, `o`, `O`, `@`, `#`, `|`, `/`, `\`, `-`
- Avoid Unicode that may not render in all terminals
- Make loops seamless (last frame connects to first)

## Verification

Test by creating a quick runner:

```js
// test-animations.js
import { MATRIX, STARFIELD } from './src/utils/ascii-animations.js';

function play(anim, loops = 3) {
  for (let i = 0; i < anim.frames.length * loops; i++) {
    console.clear();
    console.log(anim.frames[i % anim.frames.length]);
    return new Promise(r => setTimeout(r, anim.delay));
  }
}

play(MATRIX);
```

Run:
```bash
bun run test-animations.js
```

Confirm animation plays smoothly in terminal.