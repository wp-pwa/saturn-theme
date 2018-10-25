/* eslint-disable no-console */
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
        // Gets score x10 to be used as a CSS width value.
        const score =
          parseFloat(
            criterion.children[0].children[1].children[0].content,
            10,
          ) * 10;

        // Defines the [data-score] attribute for each bar node.
        criterion.children[1].children[0].props['data-score'] = score;
        // Stores the current score to pass as props.
        scores.push(parseFloat(score, 10));
      });
    } catch (e) {
      console.warn('Error in Reviewer Wordpress processor:', e);
    }

    return {
      component: Reviewer,
      props: {
        ...props,
        reviewerTheme: props.className
          .split(' ')
          .filter(name => name.startsWith('rwp-theme'))
          .join(''),
        scores: uniq(scores),
      },
      children,
    };
  },
};
