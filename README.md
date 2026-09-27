# Money Meadow V2

Money Meadow V2 brings the original Money Meadow artwork subtly to life. The full-screen experience preserves the lush photographic garden, its winding coin path, and the paper currency tucked among the flowers.

This is an independent project. It does not replace or modify the original `money-meadow-animation` repository.

## Visual foundation

The page uses its own copy of `garden-v6.png` from the original project. It is not hotlinked. The image remains the artwork and fills the viewport with responsive cropping.

Motion is deliberately uncommon and local:

- selected flower and leaf regions move by only a few pixels
- one bill edge may lift slightly before becoming still
- individual coins occasionally catch the light
- a butterfly, seed, leaf, or distant insect may appear
- foreground and middle-ground image patches respond with very small pointer parallax

The base image never sways as a single unit.

## Project structure

- `index.html`: full-screen scene markup
- `css/styles.css`: photographic masks, responsive crop, and event animation
- `assets/images/garden-v6.png`: independent local copy of the original artwork
- `js/scene-config.js`: event definitions, timing, and future hotspot data
- `js/ambient-events.js`: irregular event scheduling
- `js/parallax.js`: restrained pointer and touch depth response
- `js/hotspots.js`: dormant seek-and-find region preparation
- `js/main.js`: scene initialization and reduced-motion handling
- `.github/workflows/pages.yml`: GitHub Pages deployment

## Run locally

Serve the folder over HTTP because the JavaScript uses browser modules.

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.

## GitHub Pages

The included GitHub Actions workflow deploys the repository root as a static site.

Live site:

`https://jens246.github.io/money-meadow-v2/`

Repository:

`https://github.com/JenS246/money-meadow-v2`

All asset references are relative, so the project works from the repository subpath.

## Accessibility

The scene has a concise text description for screen readers. When `prefers-reduced-motion` is enabled, localized movement, glints, ambient events, and parallax are removed while the complete original artwork remains visible.

## Future seek-and-find support

`js/scene-config.js` contains image-relative regions for coins, bills, flowers, and insects. These regions are rendered as inert, non-interactive metadata today. A later game layer can enable them without rebuilding the visual scene.

## Services and data

The project has no backend, analytics, external fonts, runtime dependency, or user-data storage.

## License

Copyright © 2026. All rights reserved.
