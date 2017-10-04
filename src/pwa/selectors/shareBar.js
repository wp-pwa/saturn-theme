import { createSelector } from 'reselect';
import { dep } from 'worona-deps';

export const getEntity = createSelector(
  state => state,
  state => dep('router', 'selectors', 'getId')(state),
  (state, id) => dep('connection', 'selectorCreators', 'getPostById')(id)(state),
);

export const getTitle = createSelector(
  getEntity,
  entity => (entity && entity.title.rendered) || '',
);

export const getId = createSelector(getEntity, entity => (entity && entity.id) || 0);

export const getType = createSelector(getEntity, entity => (entity && entity.type) || '');

export const getLink = createSelector(getEntity, entity => (entity && entity.link) || '');
