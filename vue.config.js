const PrerenderSPAPlugin = require('prerender-spa-plugin');
const JSDOMRenderer = require('@prerenderer/renderer-jsdom');

module.exports = {
  configureWebpack: (config) => {
    if (process.env.NODE_ENV !== 'production') {
      return {
        module: {
          rules: [
            {
              test: /\.md$/,
              loader: 'raw-loader'
            }
          ]
        }
      };
    }
    return {
      module: {
        rules: [
          {
            test: /\.md$/,
            loader: 'raw-loader'
          }
        ]
      },
      plugins: [
        new PrerenderSPAPlugin({
          staticDir: config.output.path,
          routes: ['/', '/games', '/news', '/about'],
          renderer: new JSDOMRenderer({
            renderAfterDocumentEvent: 'rendered'
          })
        })
      ]
    };
  }
};
