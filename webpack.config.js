const webpack = require('webpack');
const path    = require('path');

const BUILD_DIR = path.resolve(__dirname, 'client/dist');
const APP_DIR   = path.resolve(__dirname, 'client/src');

const config = {
  entry: `${APP_DIR}/index.jsx`,
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'html',
      query: {
        minimize: true,
      },
    }],
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
};

module.exports = config;
