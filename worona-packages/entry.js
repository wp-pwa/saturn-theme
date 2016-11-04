require('babel-polyfill');
var pkg = require('../src/dashboard').default;
var packageDevelopment = require('worona-deps').packageDevelopment;

packageDevelopment(pkg);

console.log('Development package loaded!');
