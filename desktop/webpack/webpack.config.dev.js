var path = require('path');
var webpack = require('webpack');

var commonWebpackConfig = require('./webpack.config');

developmentWebpackConfig = Object.assign(commonWebpackConfig, {
  cache: true,
  devtool: 'eval',
  entry: {
    bundle: [
      'babel-polyfill',
      './src/index',
    ],
  },
});

developmentWebpackConfig.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
developmentWebpackConfig.plugins.push(new webpack.NoErrorsPlugin());

module.exports = developmentWebpackConfig;
