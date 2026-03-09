const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB, onINP }) => {
      // Enhanced callback with detailed logging and analytics
      const sendToAnalytics = (metric) => {
        const body = {
          name: metric.name,
          value: metric.value,
          rating: metric.rating,
          delta: metric.delta,
          id: metric.id,
          navigationType: metric.navigationType,
        };

        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
          console.log('[Web Vitals]', body);
        }

        // Send to Google Analytics 4 if available
        if (window.gtag) {
          window.gtag('event', metric.name, {
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            metric_id: metric.id,
            metric_value: metric.value,
            metric_delta: metric.delta,
            metric_rating: metric.rating,
          });
        }

        // Call custom callback
        onPerfEntry(body);
      };

      // Core Web Vitals
      getCLS(sendToAnalytics);
      getFID(sendToAnalytics);
      getFCP(sendToAnalytics);
      getLCP(sendToAnalytics);
      getTTFB(sendToAnalytics);
      onINP(sendToAnalytics);
    });
  }
};

// Performance marks utility
export const createPerformanceMark = (name) => {
  if (window.performance && window.performance.mark) {
    window.performance.mark(name);
  }
};

export const measurePerformance = (name, startMark, endMark) => {
  if (window.performance && window.performance.measure) {
    try {
      window.performance.measure(name, startMark, endMark);
      const measure = window.performance.getEntriesByName(name)[0];
      if (measure && process.env.NODE_ENV === 'development') {
        console.log(`[Performance] ${name}: ${measure.duration.toFixed(2)}ms`);
      }
      return measure;
    } catch (error) {
      console.error('Error measuring performance:', error);
    }
  }
  return null;
};

export default reportWebVitals;
