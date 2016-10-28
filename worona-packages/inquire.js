import inquirer from 'inquirer';
import semver from 'semver';
import { validate as urlValidate } from 'url-regexp';
import packageJson from '../package.json';

export const askForWoronaInfo = async () => {
  console.log('\n');
  const npmValues = await inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: 'Name (like my-package-name):',
    validate(name) { return /^[a-z0-9-]+$/.test(name) || 'Incorrect format. It should be something like my-package-name.'; },
  }, {
    type: 'input',
    name: 'version',
    message: 'Version:',
    default() { return '1.0.0'; },
    validate(version) { return !!semver.valid(version) || 'Incorrect version format.'; },
  }, {
    type: 'input',
    name: 'description',
    message: 'Description:',
    validate(name) { return /^[\w\s]+$/.test(name) || 'Incorrect format. Use only letters or spaces.'; },
  }, {
    type: 'input',
    name: 'repository',
    message: 'Git repository (like https://github.com/user/repo):',
    validate(url) { return (url === '' || urlValidate(url)) || 'Incorrect format. Enter a url or nothing at all.'; }
  }, {
    type: 'input',
    name: 'keywords',
    message: 'Keywords (comma separated list):',
    filter(keywords) {
      return keywords.split(',')
      .map(kw => kw.replace(', ', ','))
      .map(kw => kw.replace(/(^\s|\s$)/g, ''))
      .filter(kw => kw !== '')
      .concat(['worona', 'package']);
    },
    validate(keywords) { return keywords.reduce(
      (prev, kw) => /^[a-z0-9\s]*$/.test(kw) && prev, true ) ||
      'Incorrect format. Keywords should be made only of letters and numbers'; }
  }, {
    type: 'input',
    name: 'author',
    message: 'Author:',
  }, {
    type: 'input',
    name: 'license',
    message: 'License:',
    default() { return 'MIT'; },
  }]);
  const worona = await inquirer.prompt([{
    type: 'input',
    name: 'niceName',
    message: 'Nice name (like My Package Name):',
    validate(name) { return /^[\w\s]+$/.test(name) || 'Incorrect format. Use only letters or spaces.'; },
  }, {
    type: 'input',
    name: 'slug',
    message: 'Slug:',
    validate(name) { return /^[a-zA-Z0-9]+$/.test(name) || 'Incorrect format. Slug should be in camelcase.'; },
  }, {
    type: 'list',
    name: 'type',
    choices: ['extension', 'theme'],
    message: 'Type:',
  }, {
    type: 'list',
    name: 'service',
    choices: ['dashboard', 'app'],
    message: 'Service:',
  }]);
  worona.namespace = 'theme';
  if (worona.type !== 'theme') {
    const { extensionNamespace } = await inquirer.prompt([{
      type: 'input',
      name: 'namespace',
      message: 'Namespace:',
      validate(name) { return /^[a-zA-Z0-9]+$/.test(name) || 'Incorrect format. Namespace should be in camelcase.'; },
    }]);
    worona.namespace = extensionNamespace;
  }
  worona.default = false;
  worona.core = false;
  worona.listed = true;
  worona.deactivable = true;
  worona.public = true;
  worona.authors = [npmValues.author];

  const newPackageJson = { ...packageJson, ...npmValues, worona, repository: { type: 'git', url: `git+ssh://git@${npmValues.repository}` } };

  console.log(newPackageJson);
  console.log('\n');
};
