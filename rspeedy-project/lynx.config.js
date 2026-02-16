import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin';
import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin';
import { defineConfig } from '@lynx-js/rspeedy';

export default defineConfig({
  plugins: [
    pluginReactLynx(),
    pluginQRCode({
      showQRCode: true,
    }),
  ],

  source: {
    entry: {
      index: './src/index.jsx',
    },
  },

  // Code splitting
  performance: {
    chunkSplit: {
      strategy: 'split-by-experience',
      override: {
        chunks: 'all',
        cacheGroups: {
          utils: {
            name: 'utils',
            test: /[\\/]src[\\/]utils[\\/]/,
            priority: 10,
          },
          components: {
            name: 'components',
            test: /[\\/]src[\\/]components[\\/]/,
            priority: 9,
          },
          'feature-home': {
            name: 'feature-home',
            test: /[\\/]src[\\/]features[\\/]home[\\/]/,
            priority: 20,
          },
          'feature-profile': {
            name: 'feature-profile',
            test: /[\\/]src[\\/]features[\\/]profile[\\/]/,
            priority: 20,
          },
          'feature-settings': {
            name: 'feature-settings',
            test: /[\\/]src[\\/]features[\\/]settings[\\/]/,
            priority: 20,
          },
        },
      },
    },
  },

  // Output
  output: {
    assetPrefix: process.env.CDN_URL || '/',
    distPath: {
      root: 'dist',
      js: 'static/js',
      jsAsync: 'static/js/async',
    },
  },

  // Server config - YANG BENAR
  server: {
    port: 3000,
    host: '0.0.0.0',
  },

  // Dev config - YANG BENAR
  dev: {
    hmr: true,
    liveReload: true,
  },
});
