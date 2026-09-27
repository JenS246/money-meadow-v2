export class MeadowParallax {
  constructor(scene, reduceMotion) {
    this.scene = scene;
    this.reduceMotion = reduceMotion;
    this.frame = 0;
    this.point = { x: 0, y: 0 };
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerLeave = this.onPointerLeave.bind(this);
  }

  start() {
    if (this.reduceMotion.matches) return;
    this.scene.addEventListener("pointermove", this.onPointerMove, { passive: true });
    this.scene.addEventListener("pointerleave", this.onPointerLeave, { passive: true });
    this.scene.addEventListener("pointercancel", this.onPointerLeave, { passive: true });
  }

  onPointerMove(event) {
    const bounds = this.scene.getBoundingClientRect();
    this.point.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    this.point.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    if (this.frame) return;

    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.apply(this.point.x, this.point.y);
    });
  }

  apply(x, y) {
    const root = document.documentElement.style;
    root.setProperty("--parallax-back-x", `${(-x * 0.45).toFixed(2)}px`);
    root.setProperty("--parallax-back-y", `${(-y * 0.3).toFixed(2)}px`);
    root.setProperty("--parallax-mid-x", `${(-x * 1.35).toFixed(2)}px`);
    root.setProperty("--parallax-mid-y", `${(-y * 0.9).toFixed(2)}px`);
    root.setProperty("--parallax-front-x", `${(-x * 2.8).toFixed(2)}px`);
    root.setProperty("--parallax-front-y", `${(-y * 1.8).toFixed(2)}px`);
  }

  onPointerLeave() {
    this.apply(0, 0);
  }

  stop() {
    if (this.frame) cancelAnimationFrame(this.frame);
    this.scene.removeEventListener("pointermove", this.onPointerMove);
    this.scene.removeEventListener("pointerleave", this.onPointerLeave);
    this.scene.removeEventListener("pointercancel", this.onPointerLeave);
    this.apply(0, 0);
  }
}

