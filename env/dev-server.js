require('shelljs/global');
env.NODE_ENV = 'dev';

const ora = require('ora');
const webpack = require('webpack');
const config = require('./webpack.prod.conf');
const spinner = ora(`Start dev. server ...`);

spinner.start();

rm('-rf', config.output.path);

const [colors, modules, children, chunks, chunkModules] = [true, false, false, false, false];

webpack(config, (err, stats) => {
  spinner.stop();

  if (err) {
    throw err;
  }

  process.stdout.write(`${stats.toString({
    colors,
    modules,
    children,
    chunks,
    chunkModules,
  })}\n`);

  console.log(`\nServer started.`);
});
