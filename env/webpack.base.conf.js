const path = require('path');
const fs = require('fs');
const conf = require('./config');
const root = path.resolve(__dirname, '../');
const dependencies = {};

fs
    .readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => {
      dependencies[mod] = `commonjs${mod}`;
    });

module.exports = {
  watch: process.env.NODE_ENV === 'dev',
  entry: conf.entry,
  output: conf.output,
  target: 'node',
  externals: dependencies,
  resolve: {
    extensions: ['', '.js'],
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /(node_modules|libs|env|dist)/,
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: root,
        exclude: /(node_modules|libs|env|dist|tests)/,
      },
    ],
  },
  eslint: {
    configFile: path.resolve(root, './.eslintrc'),
    formatter: require('eslint-friendly-formatter'),
  },
  plugins: [],
};
