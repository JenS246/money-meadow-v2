# Money Meadow V2

Money Meadow V2 is a quiet, animated browser illustration. A layered botanical field contains coins, serial-like numerals, engraved patterns, printed fragments, and other traces of currency. The details are meant to be found gradually rather than announced.

This is an independent project. It does not replace or modify the original `money-meadow-animation` repository.

## How it works

The meadow is a single responsive SVG composed from reusable plant symbols. Native JavaScript gives each plant its own slow motion cycle, adds restrained pointer and touch reactions, and schedules occasional ambient events. No framework, build step, external font, or runtime dependency is required.

The code is split by responsibility:

- `index.html`: illustration markup, SVG definitions, and semantic page structure
- `css/styles.css`: page composition, responsive rules, textures, event keyframes, and accessibility fallbacks
- `js/scene-config.js`: motion and interaction settings
- `js/plant-motion.js`: asynchronous plant animation
- `js/pointer-interaction.js`: local pointer and touch disturbance
- `js/ambient-events.js`: uncommon butterflies, drifting paper, passing shadows, seeds, glints, and stronger bends
- `js/discoveries.js`: keyboard, pointer, and touch discovery feedback
- `js/main.js`: scene initialization and pause control
- `.github/workflows/pages.yml`: GitHub Pages deployment

## Run locally

Because the JavaScript uses browser modules, serve the folder over HTTP instead of opening `index.html` directly.

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.

## Publish with GitHub Pages

The included workflow deploys the repository root as a static Pages site.

1. Create a new GitHub repository named `money-meadow-v2`.
2. Push this project to the repository's `main` branch.
3. Open the repository on GitHub and go to **Settings > Pages**.
4. Under **Build and deployment**, select **GitHub Actions** as the source.
5. Run the **Deploy static site to Pages** workflow if it has not started automatically.

Expected site URL:

`https://jens246.github.io/money-meadow-v2/`

All project references are relative, so the site works from the repository subpath.

## Accessibility and responsive behavior

- `prefers-reduced-motion` stops plant movement and removes drifting events.
- The breeze can also be paused manually.
- Discoverable details can be reached with the keyboard and activated with Enter or Space.
- Text and controls keep visible focus styles and readable contrast.
- The mobile layout changes the scene crop rather than shrinking the entire desktop illustration.
- Touch movement gently disturbs nearby plants.

## Extending the meadow

The illustration is ready to grow into multiple scenes. Add a scene-specific configuration module, reuse or replace the SVG symbols, and keep seek-and-find state separate from the ambient visual modules. The current discoveries are descriptive only. There is no score, timer, inventory, or win state.

## Data and services

The project stores no user data and uses no backend or external service.

## License

Copyright © 2026. All rights reserved.
