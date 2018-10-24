import { uniq } from 'lodash-es';
import Reviewer from '../../components/Reviewer';

export default {
  test: ({ component, props }) =>
    component === 'div' &&
    props &&
    props.className &&
    props.className.split(' ').includes('rwp-review-wrap'),
  process: ({ props, children }) => {
    const scores = [];

    try {
      const criterions = children[0].children[2].children;

      criterions.forEach(criterion => {
        const score =
          parseFloat(
            criterion.children[0].children[1].children[0].content,
            10,
          ) * 10;

        criterion.children[1].children[0].props['data-score'] = score;

        scores.push(parseFloat(score, 10));
      });
    } catch (e) {
      console.error('Error in Reviewer Wordpress processor:', e); // eslint-disable-line
    }

    return {
      component: Reviewer,
      props: {
        ...props,
        scores: uniq(scores),
        reviewerTheme: props.className
          .split(' ')
          .filter(name => name.startsWith('rwp-theme'))
          .join(''),
      },
      children,
    };
  },
};
