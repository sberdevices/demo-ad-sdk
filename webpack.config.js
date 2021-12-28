const path = require('path');
const assert = require('assert');

const webpack = require('webpack');


assert.ok(process.env.DEV_TOKEN, 'Provide DEV_TOKEN');
assert.ok(process.env.DEV_PHRASE, 'Provide DEV_PHRASE');


module.exports = {
  entry: {
    baseInit: './src/index.js',
    initWithAssistant: './src/initWithAssistant.js',
    initWithParams: './src/initWithParams.js',
  },
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEV_TOKEN': JSON.stringify(process.env.DEV_TOKEN),
      'process.env.DEV_PHRASE': JSON.stringify(process.env.DEV_PHRASE),
    }),
  ],
};
