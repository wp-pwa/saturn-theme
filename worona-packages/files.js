import request from 'superagent';
import { sync as mkdirSync } from 'mkdirp';
import { writeFileSync } from 'fs';

export const getTemporaryFiles = async ({ service, env }) => {
  const path = `node_modules/.worona/${service}/${env}`;
  mkdirSync(path);
  console.log('Downloading the needed files... please wait.');
  const manifest = await request(`https://cdn.worona.io/packages/dist/vendors-${service}-worona/${service}/${env}/json/manifest.json`);
  writeFileSync(`${path}/vendors-manifest.json`, JSON.stringify(manifest.body, null, 2));
  const core = await request(`https://cdn.worona.io/api/v1/settings/package-development/${service}`);
  writeFileSync(`${path}/core-files.json`, JSON.stringify(core.body, null, 2));
  console.log('Downloading finished.\n');
};
