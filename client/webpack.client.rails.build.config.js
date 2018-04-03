// Run like this:
// cd client && npm run build:client
// Note that Foreman (Procfile.dev) has also been configured to take care of this.

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const { env } = require('process')
const config = require('./webpack.client.base.config');
const { resolve } = require('path');
const webpackConfigLoader = require('react-on-rails/webpackConfigLoader');
const configPath = resolve('..', 'config');
const { output, settings } = webpackConfigLoader(configPath);
const isHMR = settings.dev_server && settings.dev_server.hmr

const devBuild = process.env.NODE_ENV !== 'production';


if (devBuild) {
  console.log('Webpack dev build for Rails'); // eslint-disable-line no-console
  config.devtool = 'eval-source-map';
} else {
  console.log('Webpack production build for Rails'); // eslint-disable-line no-console
}

module.exports = merge(config, {

  output: {
    filename: isHMR ? '[name]-[hash].js' : '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].chunk.js',

    publicPath: output.publicPath,
    path: output.path,
    pathinfo: devBuild,
  },

  // See webpack.client.base.config for adding modules common to both the webpack dev server and rails

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                modules: false,
                importLoaders: 1,
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [ autoprefixer ],
              },
            },
          ],
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                modules: false,
                importLoaders: 3,
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [ autoprefixer ],
              },
            },
            'sass-loader',
          ],
        }),
      },
      {
        test: require.resolve('react'),
        use: {
          loader: 'imports-loader',
          options: {
            shim: 'es5-shim/es5-shim',
            sham: 'es5-shim/es5-sham',
          }
        }
      }
    ],
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '[name]-[contenthash].css',
      allChunks: true
    }),
  ],
});
