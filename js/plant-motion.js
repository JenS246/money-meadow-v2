import { randomBetween, sceneConfig } from "./scene-config.js";

const easing = "cubic-bezier(0.45, 0.05, 0.45, 0.95)";

function motionBand(plant) {
  if (plant.classList.contains("background")) return sceneConfig.motion.background;
  if (plant.classList.contains("foreground")) return sceneConfig.motion.foreground;
  return sceneConfig.motion.middle;
}

export class PlantMotion {
  constructor(scene, reduceMotion) {
    this.scene = scene;
    this.reduceMotion = reduceMotion;
    this.animations = [];
    this.paused = false;
  }

  start() {
    if (this.reduceMotion.matches) return;

    this.scene.querySelectorAll(".plant .sway").forEach((sway, index) => {
      const plant = sway.closest(".plant");
      const band = motionBand(plant);
      const range = randomBetween(band.maxAngle * 0.45, band.maxAngle);
      const bias = randomBetween(-0.8, 0.8);
      const duration = randomBetween(band.minDuration, band.maxDuration);
      const pauseBeat = randomBetween(0.38, 0.62);

      const animation = sway.animate(
        [
          { transform: `rotate(${bias - range * 0.42}deg)`, offset: 0 },
          { transform: `rotate(${bias + range}deg)`, offset: pauseBeat - 0.08 },
          { transform: `rotate(${bias + range * 0.92}deg)`, offset: pauseBeat + 0.07 },
          { transform: `rotate(${bias - range * 0.67}deg)`, offset: 0.86 },
          { transform: `rotate(${bias - range * 0.42}deg)`, offset: 1 },
        ],
        {
          duration,
          delay: -randomBetween(0, duration) - index * 19,
          iterations: Infinity,
          easing,
        },
      );

      animation.playbackRate = randomBetween(0.88, 1.08);
      this.animations.push(animation);
    });
  }

  setPaused(paused) {
    this.paused = paused;
    this.animations.forEach((animation) => paused ? animation.pause() : animation.play());
  }

  destroy() {
    this.animations.forEach((animation) => animation.cancel());
    this.animations = [];
  }
}

