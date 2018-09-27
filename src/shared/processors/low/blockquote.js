import Blockquote from '../../styled/Blockquote';

export default {
  test: ({ component }) => component === 'blockquote',
  process: () => ({ component: Blockquote }),
};
