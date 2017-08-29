import { setStatic, compose } from 'recompose';
import Theme from './components/Theme';
import * as actions from './actions';
import * as types from './types';
import reducers from './reducers';
import sagas from './sagas/client';

export default compose(
  setStatic('actions', actions),
  setStatic('types', types),
  setStatic('reducers', reducers),
  setStatic('sagas', sagas),
)(Theme);
