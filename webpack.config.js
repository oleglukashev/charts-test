'use strict';

var webpack = require('webpack');
var path = require('path');
var Extract = require('extract-text-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
  entry: {
    app: ['./app/app.js'],
    vendor: [
      'angular',
      'angular-ui-bootstrap',
      'angular-ui-router',
      'd3',
    ]
  },

  // resolve: {
  //   alias: {
  //     'c3': path.resolve(__dirname, './assets/js/c3.js')
  //   }
  // },

  output: {
    path: path.join(process.cwd()),
    publicPath: "/",
    filename: '[name].js',
  },

  watch: true,

  plugins: [
    new webpack.ProvidePlugin({
      'c3': path.resolve(__dirname, 'app/assets/js/c3.js'),
      'd3': 'd3'
    }),
    new Extract('app.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name     : 'vendor',
      chunks   : ['app'],
      filename : 'vendor.js',
      minChunks: Infinity
    }),
    new webpack.DefinePlugin({
      
    }),
    new ngAnnotatePlugin({
      add: true
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: ['ng-annotate-loader', 'babel-loader?presets[]=es2015'],
        exclude: /node_modules/
      },
      {
        test  : /\.scss$/,
        loader: Extract.extract({ fallback: 'style-loader', use: 'css-loader!autoprefixer-loader?browsers=last 2 version!sass-loader' })
      },
      {
        test  : /\.css$/,
        loader: Extract.extract({ fallback: 'style-loader', use: 'css-loader!autoprefixer-loader?browsers=last 2 version' })
      },
      {
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        loader: 'file-loader?=name[path][name].[ext]'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]
  }
}
