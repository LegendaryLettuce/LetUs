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

const standardPlugins = [
  new plugins.Html({
    title: 'LetUs',
    template: `${APP_DIR}/index.html`,
  }),
  // new plugins.Favicons(`${APP_DIR}/favicon.png`),
];


const config = {
  devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  entry: [
    // 'webpack-dev-server/client?http://localhost:3000',
    // 'webpack/hot/only-dev-server',
    // 'react-hot-loader/patch',
    `${APP_DIR}/app.jsx`,
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  plugins: (process.env.NODE_ENV === 'production') ? [
    ...standardPlugins,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
  ] : [
    ...standardPlugins,
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    colors: true,
    historyApiFallback: true,
    inline: false,
    port: 3000,
    hot: true,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2'],
          // plugins: ['react-hot-loader/babel'],
        },
        exclude: [MODULES_DIR],
      },
      { test: /\.css$/, loader: 'style-loader!css-loader?camelCase' },
      { test: /\.woff(2)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)?$/, loader: 'file-loader' },
    ],
  },
};

module.exports = config;
