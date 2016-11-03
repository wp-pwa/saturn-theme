var webpack = require('webpack');
var path = require('path');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var definePlugin = function(config) {
  var nodeEnv = config.env === 'dev' ? 'development' : 'production';
  return new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify(nodeEnv) } });
};

var lodashModuleReplacementPlugin = function() {
  return new LodashModuleReplacementPlugin({
    currying: true,
    flattening: true,
    placeholders: true,
    collections: true,
  });
};

var dllReferencePlugin = function(config) {
  return new webpack.DllReferencePlugin({
    context: path.resolve('.'),
    manifest: require('.worona/' + config.entrie + '/' + config.env + '/vendors-manifest.json'),
  });
};

var contextReplacementPlugin = function() {
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|es/);
}

var htmlWebpackPlugin = function(config) {
  var files = require('.worona/' + config.entrie + '/' + config.env + '/core-files.json');
  return new HtmlWebpackPlugin({
    inject: false,
    title: 'Worona Dashboard (PKG DEV)',
    template: path.resolve('worona-packages', 'html', 'index.html'),
    favicon: path.resolve('worona-packages', 'html', 'favicon.png'),
    vendorsFile: files.vendors,
    coreFile: files.core,
    devServer: 'http://localhost:3333',
    window: {
      publicPath: 'https://cdn.worona.io/packages/dist/',
      __worona__: { [config.env]: true, remote: true },
    },
    appMountId: 'root',
    minify: { preserveLineBreaks: true, collapseWhitespace: true },
  });
};

module.exports = {
  definePlugin: definePlugin,
  lodashModuleReplacementPlugin: lodashModuleReplacementPlugin,
  dllReferencePlugin: dllReferencePlugin,
  htmlWebpackPlugin: htmlWebpackPlugin,
  contextReplacementPlugin: contextReplacementPlugin,
};
