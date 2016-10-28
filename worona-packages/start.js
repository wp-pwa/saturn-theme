import { argv } from 'yargs';
import packageJson from '../package.json';
import { askForWoronaInfo } from './inquire.js';
import { getTemporaryFiles } from './files.js';
import webpack from './webpack.js';

const start = async () => {
  const env = argv.env || 'dev';
  const worona = packageJson.worona || await askForWoronaInfo({ packageJson });
  await getTemporaryFiles({ service: worona.service, env });
  await webpack();
};

process.on('unhandledRejection', (err) => {
  console.log(err.stack);
  process.exit(1);
});

start();
