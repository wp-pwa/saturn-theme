import React from 'react';
import pkgJson from '../../package.json';
import * as sagas from './sagas';

const name = pkgJson.name;
const namespace = pkgJson.worona.namespace;

export default {
  name,
  namespace,
  sagas,
};
