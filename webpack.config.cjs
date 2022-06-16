// @ts-check

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'dist', 'public'),
    publicPath: '/assets/',
  },
  devServer: {
    client: {
      overlay: false
  },
    compress: true,
    port: 8090,
    host: '0.0.0.0',
    // publicPath: '/assets/',
    historyApiFallback: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png|gif|woff|eot|ttf|svg)/,
        use: {
          loader: 'url-loader', // this need file-loader
          options: {
            limit: 50000
          },
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(css|scss)$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
