/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const path = require('path');
const Dotenv = require('dotenv-webpack');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

module.exports = withImages(withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[name]__[local]___[hash:base64:5]',
  },
  sassLoaderOptions: {
    includePaths: ['node_modules', 'src'],
  },
  useFileSystemPublicRoutes: false,
  webpack: (config) => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
        systemvars: true,
      }),
      new FilterWarningsPlugin({
      // suppress conflicting order warnings from mini-css-extract-plugin.
      // see https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      }),
    ];

    return config;
  },
}));
