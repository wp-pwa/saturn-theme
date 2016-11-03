var path = require('path');
var config = require('yargs').argv;
var plugins = require('./webpack/plugins');
var loaders = require('./webpack/loaders');

var pluginsArr = [
  plugins.definePlugin(config),
  plugins.dllReferencePlugin(config),
  plugins.lodashModuleReplacementPlugin(config),
  plugins.contextReplacementPlugin(),
  plugins.htmlWebpackPlugin(config),
].filter(function(plugin) { return typeof plugin !== 'undefined'; });

var loadersArr = [
  loaders.babel(config),
  loaders.css(config),
  loaders.sass(config),
  loaders.image(config),
  loaders.font(config),
  loaders.locale(config),
  loaders.json(config),
].filter(function(loader) { return typeof loader !== 'undefined'; });

module.exports = {
  entry: { main: [
    path.resolve('worona-packages', 'entry.js'),
  ] },
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: { loaders: loadersArr },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  // devtool: '#eval-source-map',
  devServer: {
    contentBase: 'dist',
    noInfo: false,
    inline: true,
    port: 3333,
    historyApiFallback: true,
  },
  postcss: function() { return [require('postcss-cssnext')()]; },
  stats: { children: false },
  plugins: pluginsArr,
};
