const config = require('./webpack.base.conf');
const webpack = require('webpack');
const plugins = [];

if (process.env.NODE_ENV !== 'dev') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    comments: false,
    compress: { warnings: false },
    sourceMap: false,
    mangle: true,
  }));
}

plugins.push(new webpack.optimize.OccurenceOrderPlugin());

config.plugins = config.plugins.concat(plugins);

module.exports = config;
