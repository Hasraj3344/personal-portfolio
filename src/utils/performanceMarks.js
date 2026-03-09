import { createPerformanceMark, measurePerformance } from '../reportWebVitals';

// Performance marks for tracking custom metrics
export const PerformanceMarks = {
  // Component lifecycle marks
  COMPONENT_MOUNT_START: 'component-mount-start',
  COMPONENT_MOUNT_END: 'component-mount-end',

  // Data fetching marks
  DATA_FETCH_START: 'data-fetch-start',
  DATA_FETCH_END: 'data-fetch-end',

  // Navigation marks
  ROUTE_CHANGE_START: 'route-change-start',
  ROUTE_CHANGE_END: 'route-change-end',

  // Image loading marks
  IMAGE_LOAD_START: 'image-load-start',
  IMAGE_LOAD_END: 'image-load-end',

  // User interaction marks
  INTERACTION_START: 'interaction-start',
  INTERACTION_END: 'interaction-end',
};

// Track component mount performance
export const trackComponentMount = (componentName) => {
  const startMark = `${componentName}-mount-start`;
  const endMark = `${componentName}-mount-end`;

  createPerformanceMark(startMark);

  return () => {
    createPerformanceMark(endMark);
    measurePerformance(`${componentName} Mount Time`, startMark, endMark);
  };
};

// Track data fetch performance
export const trackDataFetch = (fetchName) => {
  const startMark = `${fetchName}-fetch-start`;
  const endMark = `${fetchName}-fetch-end`;

  createPerformanceMark(startMark);

  return () => {
    createPerformanceMark(endMark);
    measurePerformance(`${fetchName} Fetch Time`, startMark, endMark);
  };
};

// Track route changes
export const trackRouteChange = (routeName) => {
  const startMark = `${routeName}-route-start`;
  const endMark = `${routeName}-route-end`;

  createPerformanceMark(startMark);

  return () => {
    createPerformanceMark(endMark);
    measurePerformance(`${routeName} Route Change`, startMark, endMark);
  };
};

// Get all performance entries
export const getPerformanceEntries = () => {
  if (window.performance && window.performance.getEntries) {
    return window.performance.getEntries();
  }
  return [];
};

// Clear all performance marks and measures
export const clearPerformanceData = () => {
  if (window.performance) {
    if (window.performance.clearMarks) {
      window.performance.clearMarks();
    }
    if (window.performance.clearMeasures) {
      window.performance.clearMeasures();
    }
  }
};

export default {
  PerformanceMarks,
  trackComponentMount,
  trackDataFetch,
  trackRouteChange,
  getPerformanceEntries,
  clearPerformanceData,
};
