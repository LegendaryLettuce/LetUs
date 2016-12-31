const webpack = require('webpack');
const path    = require('path');
const plugins = require('webpack-load-plugins')({
  rename: {
    'html-webpack-plugin': 'Html',
    // 'favicons-webpack-plugin': 'Favicons',
  },
});

const BUILD_DIR   = path.resolve(__dirname, 'client/dist');
const APP_DIR     = path.resolve(__dirname, 'client/src');
const MODULES_DIR = path.resolve(__dirname, 'node_modules');

const devPlugins = [
  new plugins.Html({
    title: 'LetUs',
    template: `${APP_DIR}/index.html`,
  }),
  // new plugins.Favicons(`${APP_DIR}/favicon.png`),
];


const config = {
  entry: [
    `${APP_DIR}/index.jsx`,
  ],
  plugins: (process.env.NODE_ENV === 'production') ? [
    ...devPlugins,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
  ] : devPlugins,
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: { presets: ['es2015', 'react', 'stage-2'] },
        exclude: [MODULES_DIR],
      },
    ],
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
};

module.exports = config;
