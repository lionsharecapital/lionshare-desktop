var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');

var config = require('./webpack/webpack.config.dev');
var compiler = webpack(config);

var app = express();

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: { colors: true }
  })
);

app.listen(3000, function() {
  console.log('listening on 3000');
});
