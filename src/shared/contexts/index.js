import memoize from 'lodash/memoize';

export const home = memoize(menu => {
  const columns = menu.filter(({ type }) => type !== 'link').map(list => {
    const id = list.type === 'latest' ? 'post' : parseInt(list[list.type], 10);

    if (['page'].includes(list.type)) {
      return [
        {
          type: list.type,
          id,
        },
      ];
    }

    return [
      {
        type: list.type,
        id,
        page: 1,
      },
    ];
  });

  return {
    columns,
    options: {
      bar: 'list',
    },
  };
});

export const single = memoize(
  (columns = { type: 'latest', id: 'post', page: 1, extract: 'horizontal' }) => {
    if (!Array.isArray(columns)) {
      columns = [columns];
    }

    return {
      columns: [columns],
      options: {
        bar: 'single',
      },
    };
  },
);

export const media = memoize(medias => ({
  columns: medias.map(id => [{ type: 'media', id }]),
  options: {
    bar: 'media',
  },
}));
