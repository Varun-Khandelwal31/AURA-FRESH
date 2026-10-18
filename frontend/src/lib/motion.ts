// AuraFresh Motion Specification (/lib/motion.ts)
// Strict motion design tokens adhering to 3D & Motion Spec.

// Stage node entrance
export const stageVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  active: { opacity: 1, y: 0, scale: 1.02, transition: { duration: 0.3 } },
};

// Action row arrival (top of feed)
export const actionArrival = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

// Pulsing live dot
export const livePulse = {
  animate: { scale: [1, 1.2, 1], opacity: [1, 0.6, 1] },
  transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
};

// 3D card hover (landing hero only)
export const heroCardHover = {
  rest: { rotateY: -8, rotateX: 4 },
  hover: { rotateY: -4, rotateX: 2, transition: { duration: 0.6 } },
};

// Freshness aura pulse (landing hero only)
export const auraPulse = {
  animate: { scale: [1, 1.08, 1], opacity: [0.6, 0.8, 0.6] },
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
};
