import { spawn } from 'child-process-promise';

export default async (config) => {
  await spawn('./node_modules/.bin/webpack-dev-server', ['--config', 'worona-packages/webpack.config.js',
    '--name', 'core-dashboard-worona',
    '--entrie', 'dashboard',
    '--type', 'core',
    '--env', config.env,
    '--location', 'local',
  ], { stdio: 'inherit' });
};
