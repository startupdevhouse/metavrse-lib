const path = require('path');
const { merge } = require('webpack-merge');
const config = require('./webpack.config');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = [
  {
    name: 'web',

    entry: './web/index.ts',

    output: {
      path: path.resolve(__dirname, 'dist/web'),
      filename: 'web.js',
      clean: true,
      library: {
        name: 'webtest',
        type: 'umd',
      },
    },

    resolve: {
      extensions: ['.ts', '.js'],
      fallback: {
        fs: false,
        path: false,
        crypto: false,
      },
    },

    module: {
      rules: [
        {
          test: /\.(ts)$/,
          exclude: [/node_modules/],
          use: [{ loader: 'ts-loader' }],
        },
      ],
    },

    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: 'src/cherry',
            to: path.resolve(__dirname, './dist/cherry'),
          },
          {
            from: 'src/scripts',
            to: path.resolve(__dirname, './dist/scripts'),
          },
          {
            from: 'src/types',
            to: path.resolve(__dirname, './dist/types'),
          },
          { from: 'src/index.d.ts', to: path.resolve(__dirname, './dist') },
        ],
      }),
      // TODO: Need web based configuration for cherryGL
    ],
  },
];
