var https = require('https');
var http = require('http');
var fs = require('fs');
var argv = require('yargs').argv;

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var protocol = /http:/.test(url) ? http : https;
  var request = protocol.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};

if (!fs.existsSync('webpack/tmp')) fs.mkdirSync('webpack/tmp'); // Create tmp folder if it doesn't exist.

download(
  'https://cdn.worona.io/packages/core-' + argv.service + '-worona/dist/dev/vendors/vendors-manifest.json',
  'webpack/tmp/vendors-manifest.json'
);

download(
  'https://cdn.worona.io/api/v1/settings/package-development/' + argv.service,
  'webpack/tmp/core-files.json'
);
