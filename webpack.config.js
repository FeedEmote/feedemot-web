// var path = require('path')
// var webpack = require('webpack')
// var HtmlWebpackPlugin = require('html-webpack-plugin')

// // const LAUNCH_COMMAND = process.env.npm_lifecycle_event
// const LAUNCH_COMMAND = process.env.NODE_ENV
// const isProduction = LAUNCH_COMMAND === 'production'

// process.env.BABEL_ENV = LAUNCH_COMMAND

// const PATHS = {
//   app: path.join(__dirname, 'app'),
//   build: path.join(__dirname, 'app/public'),
// }

// const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: PATHS.app + '/index.html',
//   filename: 'index.html',
//   inject: 'body'
// })

// const productionPlugin = new webpack.DefinePlugin({
//   'process.env': {
//     NODE_ENV: JSON.stringify('production')
//   }
// })

// const base = {
  
//   output: {
//     path: PATHS.build,
//     filename: 'index_bundle.js',
//     publicPath: '/app/public/'
//   },
//   module: {
//     loaders: [
//       {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
//       {test: /\.css$/, loader: 'style!css?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]'}
//     ]
//   },
//   resolve: {
//     root: path.resolve('./app')
//   }
// }

// const developmentConfig = {
//   devtool: 'cheap-module-inline-source-map',
//   entry : [
//       "webpack-hot-middleware/client", // Needed for hot reloading
//       PATHS.app // Start with js/app.js...
//   ],
//   devServer: {
//     contentBase: PATHS.build,
//     hot: true,
//     inline: true,
//     progress: true,
//   },
//   plugins: [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
// }

// const productionConfig = {
//   entry: [
//     PATHS.app
//   ],
//   devtool: 'cheap-module-source-map',
//   plugins: [HTMLWebpackPluginConfig, productionPlugin]
// }

// module.exports = Object.assign({}, base, isProduction === true ? productionConfig : developmentConfig)

'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'app/index.js')
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    },
    { test: /\.svg$/,
      loader: 'url-loader', // the loader used for svg support
    },
    ]
  },
  resolve: {
    root: path.resolve('./app')
  }
};
