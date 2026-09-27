import { AmbientEvents } from "./ambient-events.js";
import { prepareHotspots } from "./hotspots.js";
import { MeadowParallax } from "./parallax.js";

const scene = document.querySelector(".meadow");
const hotspotLayer = document.querySelector(".hotspot-layer");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

prepareHotspots(hotspotLayer);

const ambientEvents = new AmbientEvents(scene, reduceMotion);
const parallax = new MeadowParallax(scene, reduceMotion);

ambientEvents.start();
parallax.start();

reduceMotion.addEventListener("change", (event) => {
  if (event.matches) {
    ambientEvents.stop();
    parallax.stop();
  } else {
    ambientEvents.start();
    parallax.start();
  }
});

window.addEventListener("pagehide", () => {
  ambientEvents.stop();
  parallax.stop();
}, { once: true });
