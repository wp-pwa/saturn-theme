import { argv } from 'yargs';
import packageJson from '../package.json';
import { askForWoronaInfo } from './inquire.js';
import { getTemporaryFiles } from './files.js';
import webpack from './webpack.js';

const start = async () => {
  const env = argv.env || 'dev';
  const location = argv.location || 'remote';
  const worona = packageJson.worona || await askForWoronaInfo({ packageJson });
  await getTemporaryFiles({ entrie: worona.service, env });
  await webpack({ ...worona, env, location });
};

process.on('unhandledRejection', (err) => {
  console.log(err.stack);
  process.exit(1);
});

start();
