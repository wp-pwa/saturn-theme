/* eslint-disable */
require('babel-core/register');
require('babel-polyfill');
var getTemporaryFiles = require('./files.js').getTemporaryFiles;

getTemporaryFiles({ service: 'dashboard' });
