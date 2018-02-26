import memoize from 'lodash/memoize';

export const home = memoize(menu => {
  const items = menu.filter(({ type }) => type !== 'link').map(list => {
    const id = list.type === 'latest' ? 'post' : parseInt(list[list.type], 10);

    if (['page'].includes(list.type)) {
      return {
        singleType: list.type,
        singleId: id,
      };
    }

    return {
      listType: list.type,
      listId: id,
      page: 1,
    };
  });

  return {
    items,
    infinite: false,
    options: {
      bar: 'list',
    },
  };
});

export const single = memoize((list = { listType: 'latest', listId: 'post', extract: true }) => ({
  items: [list],
  options: {
    bar: 'single',
  },
}));

export const media = memoize(medias => ({
  items: medias.map(id => ({ singleType: 'media', singleId: id })),
  infinite: false,
  options: {
    bar: 'media',
  },
}));
