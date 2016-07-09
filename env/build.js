const shell = require('shelljs');
const ora = require('ora');
const webpack = require('webpack');
const config = require('./webpack.prod.conf');
let spinner;
let end;

if (process.env.NODE_ENV !== 'dev') {
  spinner = ora('Building ...');
  end = `\nBuild OK !`;
} else {
  spinner = ora('Start dev. server ...');
  end = `\nServer started !`;
}

spinner.start();

shell.rm('-rf', config.output.path);

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

  console.log(end);
});
