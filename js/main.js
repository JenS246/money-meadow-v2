import { AmbientEvents } from "./ambient-events.js";
import { initializeDiscoveries } from "./discoveries.js";
import { PlantMotion } from "./plant-motion.js";
import { PointerInteraction } from "./pointer-interaction.js";

const scene = document.querySelector(".meadow");
const toggle = document.querySelector(".motion-toggle");
const toggleLabel = document.querySelector(".motion-toggle__label");
const note = document.querySelector(".discovery-note");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const mobileScene = window.matchMedia("(max-width: 760px)");
const tabletScene = window.matchMedia("(min-width: 761px) and (max-width: 1050px)");

const plantMotion = new PlantMotion(scene, reduceMotion);
const pointerInteraction = new PointerInteraction(scene, reduceMotion);
const ambientEvents = new AmbientEvents(scene, reduceMotion);

plantMotion.start();
pointerInteraction.start();
ambientEvents.start();
const destroyDiscoveries = initializeDiscoveries(scene, note);

function updateSceneCrop() {
  if (mobileScene.matches) {
    scene.setAttribute("viewBox", "330 180 780 720");
  } else if (tabletScene.matches) {
    scene.setAttribute("viewBox", "80 120 1280 780");
  } else {
    scene.setAttribute("viewBox", "0 220 1440 680");
  }
}

updateSceneCrop();
mobileScene.addEventListener("change", updateSceneCrop);
tabletScene.addEventListener("change", updateSceneCrop);

let isPaused = reduceMotion.matches;

function renderMotionState() {
  toggle.setAttribute("aria-pressed", String(isPaused));
  toggleLabel.textContent = isPaused ? "Let the breeze return" : "Pause the breeze";
  plantMotion.setPaused(isPaused);
  pointerInteraction.setEnabled(!isPaused);
  ambientEvents.setPaused(isPaused);
}

toggle.addEventListener("click", () => {
  isPaused = !isPaused;
  renderMotionState();
});

reduceMotion.addEventListener("change", (event) => {
  isPaused = event.matches;
  if (!event.matches && plantMotion.animations.length === 0) plantMotion.start();
  renderMotionState();
});

if (isPaused) renderMotionState();

window.addEventListener("pagehide", () => {
  plantMotion.destroy();
  pointerInteraction.destroy();
  ambientEvents.destroy();
  destroyDiscoveries();
}, { once: true });
