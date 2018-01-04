/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';
import { dep } from 'worona-deps';

export const home = createSelector(
  state => dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state),
  menu => {
    const items = menu.filter(({ type }) => type !== 'link').map(list => {
      const id = list.type === 'latest' ? 'post' : parseInt(list[list.type], 10);

      if (['page'].includes(list.type)) {
        return {
          singleType: list.type,
          singleId: id
        };
      }

      return {
        listType: list.type,
        listId: id,
        page: 1
      };
    });

    return {
      items,
      infinite: false,
      options: {
        bar: 'list'
      }
    };
  }
);

export const single = {
  items: [{ listType: 'latest', listId: 'post', extract: true }],
  options: {
    bar: 'single'
  }
};
