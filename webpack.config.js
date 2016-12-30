const webpack = require('webpack');
const path    = require('path');

// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

// var plugins = [];
// {
//   plugins: [
//     new FaviconsWebpackPlugin('my-logo.png'),
//   ]
// }

const BUILD_DIR = path.resolve(__dirname, 'client/dist');
const APP_DIR   = path.resolve(__dirname, 'client/src');

const config = {
  entry: `${APP_DIR}/index.jsx`,
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
  ],
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'html',
      query: {
        minimize: true,
      },
    }, {
      test: /\.jsx$/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react'],
      },
    }],
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
};

module.exports = config;
