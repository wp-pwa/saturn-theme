import { setStatic, compose } from 'recompose';
import Theme from './components/Theme';
import * as actions from './actions';
import * as types from './types';
import reducers from './reducers';

export default compose(
  setStatic('actions', actions),
  setStatic('types', types),
  setStatic('reducers', reducers),
)(Theme);
