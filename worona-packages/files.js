import request from 'superagent';
import { sync as mkdirSync } from 'mkdirp';
import { writeFileSync } from 'fs';

export const getTemporaryFiles = async ({ entrie, env }) => {
  const path = `node_modules/.worona/${entrie}/${env}`;
  mkdirSync(path);
  console.log('Downloading the needed files... please wait.');
  const manifest = await request(`https://cdn.worona.io/packages/dist/vendors-${entrie}-worona/${entrie}/${env}/json/manifest.json`);
  writeFileSync(`${path}/vendors-manifest.json`, JSON.stringify(manifest.body, null, 2));
  const core = await request(`https://cdn.worona.io/api/v1/settings/package-development/${entrie}`);
  writeFileSync(`${path}/core-files.json`, JSON.stringify(core.body, null, 2));
  console.log('Downloading finished.\n');
};
