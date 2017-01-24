var path = require('path');
var webpack = require('webpack');
require('dotenv').config({ silent: true });

var API_URL = 'https://api.lionshare.capital';
var WS_URL = 'wss://api.lionshare.capital';

if (process.env.DEV_SERVER === 'true') {
  API_URL = 'http://localhost:3005';
  WS_URL = 'ws://localhost:3005';
}

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __TEST__: JSON.stringify(process.env.NODE_ENV === 'test'),
  API_URL: JSON.stringify(API_URL),
  WS_URL: JSON.stringify(WS_URL),
});

var config = {
  Buffer: true,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  target: 'electron',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' },
      { test: /\.scss$/, loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!resolve-url!sass?outputStyle=expanded' },
      { test: /\.otf$/, loader: 'url-loader?mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.json')
    extensions: ['', '.js', '.json'],
    root: path.resolve('./src'),
  },
  plugins: [
    definePlugin,
  ],
  constants: {
    API_URL: API_URL,
    WS_URL: WS_URL,
  }
};

module.exports = config;
