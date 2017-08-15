import { setStatic, compose } from 'recompose';
import Theme from './components/Theme';
// import reducers from './reducers';

const Saturn = () => null;

export default compose(
  setStatic('Theme', Theme),
  // setStatic('reducers', reducers),
)(Saturn);
