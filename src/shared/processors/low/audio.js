import LazyAudio from '../../components/LazyAudio';

export default {
  test: ({ component }) => component === 'audio',
  process: () => ({ component: LazyAudio }),
};
