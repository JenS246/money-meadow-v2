export const sceneConfig = {
  motion: {
    background: { minDuration: 11000, maxDuration: 18000, maxAngle: 1.4 },
    middle: { minDuration: 7200, maxDuration: 14000, maxAngle: 2.7 },
    foreground: { minDuration: 5800, maxDuration: 11500, maxAngle: 3.4 },
  },
  interaction: {
    radius: 150,
    maxRotation: 5.5,
    maxShift: 10,
  },
  events: {
    firstDelay: [3800, 7200],
    nextDelay: [6200, 12500],
  },
};

export const randomBetween = (min, max) => min + Math.random() * (max - min);

