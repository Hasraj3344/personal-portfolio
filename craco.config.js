module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Fix for Supabase ESM import issues
      const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf);
      if (oneOfRule) {
        oneOfRule.oneOf.unshift({
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        });
      }

      // Fallback configuration for missing modules
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        "crypto": false,
        "stream": false,
        "util": false,
        "buffer": false
      };

      return webpackConfig;
    }
  }
};
