import { setStatic, compose } from 'recompose';
import Theme from './components/Theme';
import * as actions from './actions';
import * as types from './types';
import * as selectors from './selectors';
import * as selectorCreators from './selectorCreators';
import reducers from './reducers';
import sagas from './sagas/client';

export default compose(
  setStatic('actions', actions),
  setStatic('types', types),
  setStatic('reducers', reducers),
  setStatic('sagas', sagas),
  setStatic('selectors', selectors),
  setStatic('selectorCreators', selectorCreators),
)(Theme);
