import pkgJson from '../package.json';

const name = pkgJson.name;
const namespace = pkgJson.worona.namespace;

export default {
  name,
  namespace,
};
