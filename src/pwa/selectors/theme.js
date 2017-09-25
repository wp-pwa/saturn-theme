import { createSelector } from 'reselect';
import { dep } from 'worona-deps';

const getEntity = createSelector(
  state => state,
  dep('router', 'selectors', 'getId'),
  dep('router', 'selectors', 'getType'),
  (state, id, type) => {
    if (type === 'latest') return null;

    const selectorName = `get${type
      .slice(0, 1)
      .toUpperCase()
      .concat(type.slice(1))}ById`;

    return dep('connection', 'selectorCreators', selectorName)(id)(state);
  },
);

export const getTitle = createSelector(
  state => state,
  getEntity,
  (state, entity) =>
    (entity && entity.yoast_meta && entity.yoast_meta.yoast_wpseo_title) ||
    (entity && entity.title && entity.title.rendered) ||
    (entity && entity.name) ||
    dep('connection', 'selectors', 'getSiteTitle')(state) ||
    '',
);
export const getDescription = createSelector(
  state => state,
  getEntity,
  (state, entity) =>
    (entity && entity.yoast_meta && entity.yoast_meta.yoast_wpseo_metadesc) ||
    (entity && entity.description) ||
    dep('connection', 'selectors', 'getSiteDescription')(state) ||
    '',
);

export const getCanonical = createSelector(
  getEntity,
  entity =>
    (entity && entity.yoast_meta && entity.yoast_meta.yoast_wpseo_canonical) ||
    (entity && entity.link) ||
    '',
);
