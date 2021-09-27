const path = require('path');
const assert = require('assert');

const webpack = require('webpack');


assert.ok(process.env.DEV_TOKEN, 'Provide DEV_TOKEN');
assert.ok(process.env.DEV_PHRASE, 'Provide DEV_PHRASE');


module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.DEV_TOKEN': JSON.stringify(process.env.DEV_TOKEN),
      'process.env.DEV_PHRASE': JSON.stringify(process.env.DEV_PHRASE),
    }),
  ],
};