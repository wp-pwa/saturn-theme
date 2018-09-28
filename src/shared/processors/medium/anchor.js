export default {
  test: ({ component }) => component === 'a',
  process: ({ props }) => {
    const { className, ...others } = props;
    return {
      props: {
        className: className ? `${className} content-link` : 'content-link',
        ...others,
      },
    };
  },
};
