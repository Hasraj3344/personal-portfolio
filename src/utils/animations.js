// Animation variants for Framer Motion

// Fade in animation
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Slide up animation
export const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Slide in from left
export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Slide in from right
export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Scale up animation
export const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// Stagger container for children animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Stagger item (use with staggerContainer)
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// Card hover animation
export const cardHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

// Button hover animation
export const buttonHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  tap: {
    scale: 0.95,
  },
};

// Navbar scroll animation
export const navbarScroll = {
  top: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(0px)',
    boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
  },
  scrolled: {
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: 0.3,
    },
  },
};

// Modal animation
export const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

// Backdrop animation
export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

// Page transition animation
export const pageTransition = {
  hidden: { opacity: 0, x: -200 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
    },
  },
  exit: {
    opacity: 0,
    x: 200,
    transition: {
      duration: 0.3,
    },
  },
};

// Scroll reveal animation (use with whileInView)
export const scrollReveal = {
  hidden: { opacity: 0, y: 75 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

// Rotate animation
export const rotate = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Pulse animation
export const pulse = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Bounce animation
export const bounce = {
  initial: { y: 0 },
  animate: {
    y: [-10, 0, -10],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Parallax effect for Hero (used with useTransform)
export const parallaxScroll = (offset) => ({
  y: offset,
  transition: { duration: 0, ease: 'linear' }
});

// Enhanced lift hover with shadow
export const liftHover = {
  rest: { y: 0 },
  hover: {
    y: -12,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  }
};

// Glow pulse animation
export const glowPulse = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
  }
};

// Spring stagger for lists
export const springStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

const animations = {
  fadeIn,
  slideUp,
  slideInLeft,
  slideInRight,
  scaleUp,
  staggerContainer,
  staggerItem,
  cardHover,
  buttonHover,
  navbarScroll,
  modalVariants,
  backdropVariants,
  pageTransition,
  scrollReveal,
  rotate,
  pulse,
  bounce,
  parallaxScroll,
  liftHover,
  glowPulse,
  springStagger,
};

export default animations;
