const path = require('path');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  mode,

  entry: './client/App.jsx',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client'),
  },

  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.jsx$/,
        exclude: /node_modules/,
      },
      {
        test: /\.(sass|css|scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.png$/i,
        type: 'asset/resource',
      },
    ],
  },

  devServer: {
    static: path.join(__dirname, 'client'), //
    compress: true, // g-zip compression html files, leading the page to load faster, only for modern browser
    port: 8000, // Specify a port number to listen for requests on:
    hot: true, // Hot Module Replacement (HMR) exchanges, adds, or removes modules while an application is running, without a full reload.
    historyApiFallback: true,
    open: true, // opens the browser after server starts

    proxy: {
      '/dogs': 'http://localhost:3000',
      '/favorite': 'http://localhost:3000',
      '/users': 'http://localhost:3000',
      '/delete': 'http://localhost:3000',
    },
  },

  devtool: 'eval',
};
