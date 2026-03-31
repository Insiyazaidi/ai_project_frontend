// motions.js

// 🔥 Use spring for natural motion (recommended by Framer)
const smoothSpring = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.8
};

// 🔥 Container (tight stagger)
export const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1
    }
  }
};

// 🔥 Item (main animation)
export const item = {
  hidden: {
    opacity: 0,
    y: 16
  },
  show: {
    opacity: 1,
    y: 0,
    transition: smoothSpring
  }
};

// 🔥 Heading (slightly stronger)
export const heading = {
  hidden: {
    opacity: 0,
    y: 20
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ...smoothSpring,
      stiffness: 90
    }
  }
};

// 🔥 Image (soft entry)
export const imageAnim = {
  hidden: {
    opacity: 0,
    x: 30
  },
  show: {
    opacity: 1,
    x: 0,
    transition: smoothSpring
  }
};

// 🔥 Button (snappy feel)
export const buttonAnim = {
  hidden: {
    opacity: 0,
    y: 12
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 140,
      damping: 16
    }
  }
};