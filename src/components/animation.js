// animations.js
export const bgAnimation = {
  initial: { scale: 1, y: 0 },
  whileInView: { scale: 1.2, y: -50 },
  transition: { duration: 1.5, ease: "easeOut" },
};

export const titleAnimation = {
  initial: { x: 100, opacity: 0 },
  whileInView: { x: 0, opacity: 1 },
  transition: { duration: 1, delay: 0.2 },
};

export const descriptionAnimation = {
  initial: { x: -100, opacity: 0 },
  whileInView: { x: 0, opacity: 1 },
  transition: { duration: 1, delay: 0.4 },
};