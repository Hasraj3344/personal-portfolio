const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');

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

      // Code splitting optimization
      webpackConfig.optimization = {
        ...webpackConfig.optimization,
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000,
          cacheGroups: {
            // React and React-DOM
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react',
              priority: 40,
              reuseExistingChunk: true,
            },
            // React Router
            reactRouter: {
              test: /[\\/]node_modules[\\/](react-router|react-router-dom)[\\/]/,
              name: 'react-router',
              priority: 35,
              reuseExistingChunk: true,
            },
            // Material-UI
            mui: {
              test: /[\\/]node_modules[\\/](@mui|@emotion)[\\/]/,
              name: 'mui',
              priority: 30,
              reuseExistingChunk: true,
            },
            // Styled Components
            styledComponents: {
              test: /[\\/]node_modules[\\/]styled-components[\\/]/,
              name: 'styled-components',
              priority: 25,
              reuseExistingChunk: true,
            },
            // Supabase
            supabase: {
              test: /[\\/]node_modules[\\/]@supabase[\\/]/,
              name: 'supabase',
              priority: 20,
              reuseExistingChunk: true,
            },
            // Other vendor libraries
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor',
              priority: 10,
              reuseExistingChunk: true,
            },
            // Common code used across multiple chunks
            common: {
              minChunks: 2,
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
        // Production optimizations
        minimize: webpackConfig.mode === 'production',
        minimizer: webpackConfig.mode === 'production' ? [
          new TerserPlugin({
            terserOptions: {
              parse: {
                ecma: 8,
              },
              compress: {
                ecma: 5,
                warnings: false,
                comparisons: false,
                inline: 2,
                drop_console: true, // Remove console.logs in production
              },
              mangle: {
                safari10: true,
              },
              output: {
                ecma: 5,
                comments: false,
                ascii_only: true,
              },
            },
          }),
          ...webpackConfig.optimization.minimizer.filter(
            (plugin) => plugin.constructor.name !== 'TerserPlugin'
          ),
        ] : webpackConfig.optimization.minimizer,
      };

      // Add bundle analyzer plugin if ANALYZE env variable is set
      if (process.env.ANALYZE === 'true') {
        webpackConfig.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'bundle-report.html',
            openAnalyzer: true,
          })
        );
      }

      return webpackConfig;
    }
  }
};
