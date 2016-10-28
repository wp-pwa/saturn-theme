/*eslint-disable */
var env = 'dev';
var path = require('path');
var webpack = require('webpack');
var argv = require('yargs').argv;
var coreFiles = require('./tmp/core-files.json');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var CopyWebpackPlugin = require('copy-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

var publicPath = argv.remote ? 'https://cdn.worona.io/' : 'https://localhost:4000/';

module.exports = {
  entry: {
    core: [
      // 'webpack/hot/dev-server',
      path.join(__dirname, 'entry.js'),
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    // chunkFilename: '[name].[chunkhash].js',
    // hashDigestLength: 32,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ],
  },
  // devtool: '#eval-source-map',
  devServer: {
		contentBase: path.join(__dirname, 'dist'),
		noInfo: false,
		// hot: true,
		inline: true,
    port: 3000,
    compress: false,
    historyApiFallback: true,
	},
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('development') } }),
    new LodashModuleReplacementPlugin(
      { currying: true, flattening: true, placeholders: true, collections: true }),
    // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb\.js|es\.js/),
    new HtmlWebpackPlugin({
      inject: false,
      title: 'Worona Dashboard (PACKAGE DEVELOPMENT)',
      template: path.join(__dirname, 'index.html'),
      favicon: path.join(__dirname, 'favicon.png'),
      vendorsFile: coreFiles.vendors,
      coreFile: coreFiles.core,
      devServer: 'https://localhost:4000',
      window: {
        publicPath: publicPath,
        __worona__: { [env]: true, remote: argv.remote },
      },
      appMountId: 'root',
      minify: { preserveLineBreaks: true, collapseWhitespace: true },
    }),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./tmp/vendors-manifest.json'),
    }),
    // new CopyWebpackPlugin([{
    //   from: './packages/core-dashboard-worona/dist/' + env + '/vendors/',
    //   to: 'packages/core-dashboard-worona/dist/' + env + '/vendors',
    // }], { copyUnmodified: true }),
  ]
};
