const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const JSDOMRenderer = require('@prerenderer/renderer-jsdom');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // For analyzing bundle size. npm run build to use

module.exports = {
  configureWebpack: (config) => {
    if (process.env.NODE_ENV !== 'production') {
      return {};
    }
    return {
      plugins: [
        new PrerenderSPAPlugin({
          staticDir: config.output.path,
          routes: ['/', '/games', '/news', '/about'],
          renderer: new JSDOMRenderer({
            renderAfterDocumentEvent: 'rendered'
          })
        })
        // new BundleAnalyzerPlugin()
      ]
    };
  }
};
