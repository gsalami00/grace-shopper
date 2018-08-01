const isDev = process.env.NODE_ENV === 'development'
const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv').config({path: path.join(__dirname, '.env')})

module.exports = () => {
  // create a nice object from the env variable
  const envKeys = Object.keys(dotenv).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(dotenv[next]);
  return prev;
  }, {});


  return {
    mode: isDev ? 'development' : 'production',
    entry: [
      '@babel/polyfill', // enables async-await
      './client/index.js'
    ],
    output: {
      path: __dirname,
      filename: './public/bundle.js'
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin(envKeys)
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    }
  }
}
