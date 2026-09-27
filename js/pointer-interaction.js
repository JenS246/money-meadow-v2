import { sceneConfig } from "./scene-config.js";

export class PointerInteraction {
  constructor(scene, reduceMotion) {
    this.scene = scene;
    this.reduceMotion = reduceMotion;
    this.plants = [...scene.querySelectorAll(".plant")];
    this.frame = 0;
    this.latestPoint = null;
    this.enabled = !reduceMotion.matches;
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerLeave = this.onPointerLeave.bind(this);
  }

  start() {
    this.scene.addEventListener("pointermove", this.onPointerMove, { passive: true });
    this.scene.addEventListener("pointerleave", this.onPointerLeave, { passive: true });
    this.scene.addEventListener("pointercancel", this.onPointerLeave, { passive: true });
  }

  setEnabled(enabled) {
    this.enabled = enabled && !this.reduceMotion.matches;
    if (!this.enabled) this.reset();
  }

  onPointerMove(event) {
    if (!this.enabled) return;
    this.latestPoint = { x: event.clientX, y: event.clientY };
    if (this.frame) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.applyDisturbance(this.latestPoint);
    });
  }

  applyDisturbance(point) {
    const { radius, maxRotation, maxShift } = sceneConfig.interaction;

    this.plants.forEach((plant) => {
      const reactive = plant.querySelector(".reactive");
      const rect = plant.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.58;
      const dx = centerX - point.x;
      const dy = centerY - point.y;
      const distance = Math.hypot(dx, dy);

      if (distance >= radius) {
        plant.classList.remove("is-near");
        reactive.style.transform = "";
        return;
      }

      const strength = 1 - distance / radius;
      const direction = dx === 0 ? 1 : Math.sign(dx);
      const rotation = direction * strength * maxRotation;
      const shift = direction * strength * maxShift;
      plant.classList.add("is-near");
      reactive.style.transform = `translateX(${shift}px) rotate(${rotation}deg)`;
    });
  }

  onPointerLeave() {
    this.reset();
  }

  reset() {
    this.plants.forEach((plant) => {
      plant.classList.remove("is-near");
      plant.querySelector(".reactive").style.transform = "";
    });
  }

  destroy() {
    if (this.frame) cancelAnimationFrame(this.frame);
    this.scene.removeEventListener("pointermove", this.onPointerMove);
    this.scene.removeEventListener("pointerleave", this.onPointerLeave);
    this.scene.removeEventListener("pointercancel", this.onPointerLeave);
  }
}

