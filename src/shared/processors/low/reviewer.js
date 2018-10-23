import Reviewer from '../../components/Reviewer';

export default {
  test: ({ component, props }) =>
    component === 'div' &&
    props &&
    props.className &&
    props.className.split(' ').includes('rwp-review-wrap'),
  process: () => ({ component: Reviewer }),
};
