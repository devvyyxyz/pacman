# React Pacman

A minimal Pacman-like game built with React and Canvas. Intended for small deployments (e.g., itch.io).

Quick start

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Publish to itch.io

- Build an optimized bundle with `npm run build`.
- The output will be in the `dist` folder. Zip the `dist` folder or upload its contents to an HTML project on itch.io.

Files of interest

- [src/Game.tsx](src/Game.tsx) - main game logic (TypeScript)
- [src/App.tsx](src/App.tsx) - simple page wrapper
- [index.html](index.html) - Vite entry

Custom sprites

- You can upload custom sprites from the main menu. Filenames should include one of: `pacman`, `ghost1`, `pellet`, or `wall` and will be stored in your browser's `localStorage`.
- Alternatively, place images in `public/sprites/` named `pacman.png`, `ghost1.png`, `pellet.png`, `wall.png` and the game will load them automatically when present.
 - You can upload custom sprites from the Settings page. Filenames should include one of the basenames listed in `src/sprite-config.json` (by default: `pacman`, `red`, `cyan`, `orange`, `pellet`, `wall`) and will be stored in your browser's `localStorage`.
 - Alternatively, place images in `public/assets/` named with those basenames plus `.png` (for example `red.png`, `cyan.png`, `orange.png`). Ghost sheets should be 128×16 with 8 frames (the game slices them into 8 frames).
 - You can upload custom sprites from the Settings page. Filenames should include one of the basenames listed in `src/sprite-config.json` (by default: `PacMan`, `red`, `cyan`, `orange`, `pellet`, `wall`) and will be stored in your browser's `localStorage`.
 - Alternatively, place images in `public/assets/` named with those basenames plus `.png` (for example `PacMan.png`, `red.png`, `cyan.png`, `orange.png`). Ghost sheets should be 128×16 with 8 frames (the game slices them into 8 frames).

Files of interest

- [src/Game.jsx](src/Game.jsx) - main game logic
- [src/App.jsx](src/App.jsx) - simple page wrapper
- [index.html](index.html) - Vite entry

