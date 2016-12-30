const webpack = require('webpack');
const path    = require('path');
const plugins = require('webpack-load-plugins')({
  rename: {
    'html-webpack-plugin': 'Html',
  },
});

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
  entry: [
    `${APP_DIR}/index.jsx`,
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
    new plugins.Html({
      title: 'LetUs',
      template: `${APP_DIR}/index.html`,
    }),
  ],
  module: {
    loaders: [{
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
