const config = require('./webpack.base.conf');
const webpack = require('webpack');
const plugins = [];

if (env.NODE_ENV !== 'dev') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    comments: false,
    compress: { warnings: false },
    sourceMap: true,
    mangle: true,
  }));
}

plugins.push(new webpack.optimize.OccurenceOrderPlugin());

config.plugins = config.plugins.concat(plugins);

module.exports = config;
