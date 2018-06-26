import components from './components';
import Store from '../shared/stores';
import flow from './flows/client';
import { version } from '../../package.json';
import * as env from '../pwa/env';

export default components;
export { Store, version, flow, env };
