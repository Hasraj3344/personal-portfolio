module.exports = {
  ci: {
    collect: {
      staticDistDir: './build',
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
      },
    },
    assert: {
      assertions: {
        // Performance budget
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],

        // Core Web Vitals thresholds
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'speed-index': ['error', { maxNumericValue: 3400 }],
        'interactive': ['error', { maxNumericValue: 3800 }],

        // Resource budget
        'resource-summary:script:size': ['error', { maxNumericValue: 350000 }],
        'resource-summary:image:size': ['error', { maxNumericValue: 500000 }],
        'resource-summary:stylesheet:size': ['error', { maxNumericValue: 50000 }],
        'resource-summary:total:size': ['error', { maxNumericValue: 1000000 }],

        // Network and compression
        'uses-text-compression': 'error',
        'uses-optimized-images': 'warn',
        'modern-image-formats': 'warn',
        'uses-responsive-images': 'warn',

        // JavaScript optimization
        'unused-javascript': 'warn',
        'unminified-javascript': 'error',
        'unused-css-rules': 'warn',
        'unminified-css': 'error',

        // Rendering
        'offscreen-images': 'warn',
        'render-blocking-resources': 'warn',

        // Accessibility
        'color-contrast': 'error',
        'image-alt': 'error',
        'button-name': 'error',
        'link-name': 'error',
        'aria-*': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',

        // SEO
        'meta-description': 'error',
        'viewport': 'error',
        'robots-txt': 'off',
        'canonical': 'warn',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
