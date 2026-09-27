export const eventTiming = {
  first: [4200, 7600],
  next: [7200, 14800],
};

export const motionEvents = [
  { selector: '[data-patch="roses"]', className: "is-trembling", duration: 2200 },
  { selector: '[data-patch="hollyhocks"]', className: "is-nodding", duration: 3500 },
  { selector: '[data-patch="hydrangeas"]', className: "is-breathing", duration: 4900 },
  { selector: '[data-patch="lupines"]', className: "is-nodding", duration: 3500 },
  { selector: '[data-patch="coneflowers"]', className: "is-nodding", duration: 3500 },
  { selector: '[data-patch="tulips"]', className: "is-trembling", duration: 2200 },
  { selector: '[data-patch="marigolds"]', className: "is-breathing", duration: 4900 },
  { selector: '[data-patch="peonies"]', className: "is-nodding", duration: 3500 },
  { selector: '[data-patch="bill-high"]', className: "is-lifting", duration: 3800 },
  { selector: '[data-patch="bill-middle"]', className: "is-lifting", duration: 3800 },
  { selector: '[data-patch="bill-low"]', className: "is-lifting", duration: 3800 },
  { selector: '[data-glint="path-high"]', className: "is-active", duration: 1500 },
  { selector: '[data-glint="path-low"]', className: "is-active", duration: 1500 },
  { selector: '[data-glint="large"]', className: "is-active", duration: 1500 },
  { selector: '[data-glint="bank"]', className: "is-active", duration: 1500 },
  { selector: '[data-event="butterfly"]', className: "is-active", duration: 9600, rare: true },
  { selector: '[data-event="seed"]', className: "is-active", duration: 7100, rare: true },
  { selector: '[data-event="leaf"]', className: "is-active", duration: 8100, rare: true },
  { selector: '[data-event="insect"]', className: "is-active", duration: 6900, rare: true },
];

export const hotspots = [
  { id: "path-coin-high", type: "coin", x: 34.8, y: 61.6, w: 3.1, h: 4.5 },
  { id: "path-coin-low", type: "coin", x: 40.9, y: 86.2, w: 4.3, h: 5.4 },
  { id: "large-copper-coin", type: "coin", x: 41.1, y: 64.5, w: 6.4, h: 11.5 },
  { id: "silver-coin", type: "coin", x: 53.6, y: 63.8, w: 4.2, h: 5.8 },
  { id: "high-bill", type: "bill", x: 77, y: 21, w: 15, h: 10 },
  { id: "middle-bill", type: "bill", x: 66, y: 32, w: 17, h: 11 },
  { id: "low-bill", type: "bill", x: 61, y: 51, w: 20, h: 13 },
  { id: "orange-lilies", type: "flower", x: 93, y: 34, w: 12, h: 22 },
  { id: "blue-hydrangeas", type: "flower", x: 35, y: 41, w: 13, h: 14 },
  { id: "distant-butterfly-route", type: "insect", x: 47, y: 32, w: 28, h: 16 },
];

export const randomBetween = (min, max) => min + Math.random() * (max - min);

