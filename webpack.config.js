'use strict';

var path = require('path')
var webpack = require('webpack')
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
})

var config = {
  entry: {
    app: [
      path.resolve(__dirname, 'src/index.ts')
    ]
  },
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'public', 'dist'),
    publicPath: './dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    definePlugin
  ],
  node: {
    fs: "empty"
  },
  devtool: 'cheap-source-map'
}

module.exports = config;
