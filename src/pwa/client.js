import components from './components';
import Store from './stores/client';
import { version } from '../../package.json';
import * as env from '../pwa/env';

export default components;
export { Store, version, env };
