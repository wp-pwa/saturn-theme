import { createSelector } from 'reselect';
import { dep } from 'worona-deps';

export const getEntity = createSelector(
  state => state,
  state => dep('router', 'selectors', 'getId')(state),
  (state, id) => dep('connection', 'selectors', 'getPostsEntities')(state)[id]
);

export const getTitle = createSelector(
  getEntity,
  entity => entity.title.rendered
)

export const getId = createSelector(
  getEntity,
  entity => entity.id
)

export const getType = createSelector(
  getEntity,
  entity => entity.type
)

export const getLink = createSelector(
  getEntity,
  entity => entity.link
)
