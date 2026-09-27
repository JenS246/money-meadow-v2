import { randomBetween, sceneConfig } from "./scene-config.js";

export class AmbientEvents {
  constructor(scene, reduceMotion) {
    this.scene = scene;
    this.reduceMotion = reduceMotion;
    this.timer = 0;
    this.running = false;
    this.lastEvent = "";
    this.events = [
      { name: "butterfly", selector: ".butterfly-event", duration: 8000 },
      { name: "paper", selector: ".paper-event", duration: 10000 },
      { name: "shadow", selector: ".shadow-event", duration: 7000 },
      { name: "seeds", selector: ".seed-event", duration: 6000 },
      { name: "coin", selector: ".coin-discovery", className: "is-glinting", duration: 1600 },
      { name: "disc", selector: ".silver-disc", className: "is-glinting", duration: 1600 },
      { name: "bend", selector: ".middle-plants .plant:nth-child(9)", className: "is-bending", duration: 2900 },
    ];
  }

  start() {
    if (this.reduceMotion.matches || this.running) return;
    this.running = true;
    this.schedule(sceneConfig.events.firstDelay);
  }

  schedule(range = sceneConfig.events.nextDelay) {
    window.clearTimeout(this.timer);
    const delay = randomBetween(range[0], range[1]);
    this.timer = window.setTimeout(() => this.playOne(), delay);
  }

  playOne() {
    if (!this.running) return;
    const options = this.events.filter((event) => event.name !== this.lastEvent);
    const event = options[Math.floor(Math.random() * options.length)];
    const element = this.scene.querySelector(event.selector);
    if (!element) {
      this.schedule();
      return;
    }

    const activeClass = event.className || "is-active";
    element.classList.remove(activeClass);
    void element.getBoundingClientRect();
    element.classList.add(activeClass);
    this.lastEvent = event.name;

    window.setTimeout(() => {
      element.classList.remove(activeClass);
      if (this.running) this.schedule();
    }, event.duration);
  }

  setPaused(paused) {
    if (paused) {
      this.running = false;
      window.clearTimeout(this.timer);
      this.scene.querySelectorAll(".ambient-event, .is-glinting, .is-bending").forEach((element) => {
        element.classList.remove("is-active", "is-glinting", "is-bending");
      });
      return;
    }

    this.running = false;
    this.start();
  }

  destroy() {
    this.running = false;
    window.clearTimeout(this.timer);
  }
}

