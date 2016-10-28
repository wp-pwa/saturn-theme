import packageJson from '../package.json';
import { askForWoronaInfo } from './inquire.js';

const start = async () => {
  if (!packageJson.worona) await askForWoronaInfo();
};

start();
