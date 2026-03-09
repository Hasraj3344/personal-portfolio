/**
 * Feature detection utilities for progressive enhancement
 */

/**
 * Detect if browser supports backdrop-filter for glassmorphism
 * @returns {boolean}
 */
export const supportsBackdropFilter = () => {
  if (typeof CSS === 'undefined' || !CSS.supports) {
    return false;
  }

  return (
    CSS.supports('backdrop-filter', 'blur(10px)') ||
    CSS.supports('-webkit-backdrop-filter', 'blur(10px)')
  );
};

/**
 * Get backdrop filter value with fallback
 * @param {string} value - The backdrop filter value (e.g., 'blur(10px)')
 * @returns {string} The backdrop filter value or empty string if not supported
 */
export const getBackdropFilter = (value) => {
  return supportsBackdropFilter() ? value : '';
};

/**
 * Detect if browser supports CSS Grid
 * @returns {boolean}
 */
export const supportsGrid = () => {
  if (typeof CSS === 'undefined' || !CSS.supports) {
    return false;
  }

  return CSS.supports('display', 'grid');
};

/**
 * Detect if browser supports will-change
 * @returns {boolean}
 */
export const supportsWillChange = () => {
  if (typeof CSS === 'undefined' || !CSS.supports) {
    return false;
  }

  return CSS.supports('will-change', 'transform');
};

/**
 * Check if user prefers reduced motion
 * @returns {boolean}
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get safe animation duration based on user preference
 * @param {string} normalDuration - Normal animation duration (e.g., '0.3s')
 * @returns {string} Animation duration (0s if reduced motion preferred)
 */
export const getSafeAnimationDuration = (normalDuration) => {
  return prefersReducedMotion() ? '0s' : normalDuration;
};

export default {
  supportsBackdropFilter,
  getBackdropFilter,
  supportsGrid,
  supportsWillChange,
  prefersReducedMotion,
  getSafeAnimationDuration,
};
