import { spawn } from 'child-process-promise';

export default async (config) => {
  await spawn('./node_modules/.bin/webpack-dev-server', ['--config', 'worona-packages/webpack.config.js',
    '--name', 'core-dashboard-worona',
    '--entrie', 'dashboard',
    '--env', config.env,
    '--location', config.location,
  ], { stdio: 'inherit' });
};
