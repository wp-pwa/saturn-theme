import components from './components';
import reducers from './reducers';
import clientSagas from './sagas/client';
import Store from './stores';
import { version } from '../../package.json';

export default components;
export { reducers, clientSagas, Store, version };
