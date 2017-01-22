const path = require('path');
const webpack = require('webpack');

const commonWebpackConfig = require('./webpack.config');

const productionWebpackConfig = Object.assign(commonWebpackConfig, {
  cache: true,
  devtool: 'cheap-module-source-map',
  context: path.join(__dirname, '../../src'),
  entry: {
    bundle: ['babel-polyfill', './index'],
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
  },
});

productionWebpackConfig.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
productionWebpackConfig.plugins.push(new webpack.optimize.DedupePlugin());
productionWebpackConfig.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  })
);
productionWebpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  })
);

module.exports = productionWebpackConfig;
