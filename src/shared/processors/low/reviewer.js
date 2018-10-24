import Reviewer from '../../components/Reviewer';

const getScores = criterions =>
  criterions.map(criterion => {
    const text = criterion.children[0];

    return [
      text.children[0].children[0].content,
      parseFloat(text.children[1].children[0].content, 10),
    ];
  });

export default {
  test: ({ component, props }) =>
    component === 'div' &&
    props &&
    props.className &&
    props.className.split(' ').includes('rwp-review-wrap'),
  process: ({ props, children }) => {
    let scores;

    try {
      scores = getScores(children[0].children[2].children);
    } catch (e) {
      scores = null;
    }

    console.log('scores:', scores);

    return {
      component: Reviewer,
      props: {
        ...props,
        scores,
        reviewerTheme: props.className
          .split(' ')
          .filter(name => name.startsWith('rwp-theme'))
          .join(''),
      },
    };
  },
};
