import { eventTiming, motionEvents, randomBetween } from "./scene-config.js";

export class AmbientEvents {
  constructor(scene, reduceMotion) {
    this.scene = scene;
    this.reduceMotion = reduceMotion;
    this.timer = 0;
    this.running = false;
    this.lastSelectors = [];
  }

  start() {
    if (this.running || this.reduceMotion.matches) return;
    this.running = true;
    this.schedule(eventTiming.first);
  }

  schedule(range = eventTiming.next) {
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => this.play(), randomBetween(range[0], range[1]));
  }

  chooseEvent() {
    const available = motionEvents.filter((event) => {
      if (this.lastSelectors.includes(event.selector)) return false;
      const element = this.scene.querySelector(event.selector);
      return element && getComputedStyle(element).display !== "none";
    });
    const common = available.filter((event) => !event.rare);
    const pool = Math.random() < 0.22 ? available : common;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  play() {
    if (!this.running || this.reduceMotion.matches) return;
    const event = this.chooseEvent();
    const element = this.scene.querySelector(event.selector);

    if (!element) {
      this.schedule();
      return;
    }

    element.classList.remove(event.className);
    void element.getBoundingClientRect();
    element.classList.add(event.className);
    this.lastSelectors = [event.selector, ...this.lastSelectors].slice(0, 3);

    window.setTimeout(() => {
      element.classList.remove(event.className);
      if (this.running) this.schedule();
    }, event.duration);
  }

  stop() {
    this.running = false;
    window.clearTimeout(this.timer);
    this.scene.querySelectorAll(".is-active, .is-nodding, .is-trembling, .is-breathing, .is-lifting").forEach((element) => {
      element.classList.remove("is-active", "is-nodding", "is-trembling", "is-breathing", "is-lifting");
    });
  }
}
