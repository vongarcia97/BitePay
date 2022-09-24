const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { SourceMapDevToolPlugin } = require('webpack');


module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new SourceMapDevToolPlugin({ filename: '[file].map' })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css?/i,
        use: ['style-loader', 'css-loader',  'postcss-loader']
      },
      { 
        test: /\.(png|jpg)$/, 
        use: ['url-loader?limit=8192'] }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
  },
  devServer: {
    client:{
      webSocketTransport: 'ws'
    },
    webSocketServer: 'ws',
    proxy: {
      '/api/**': 'http://localhost:3000/',
    },
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: '/dist'
    },
    historyApiFallback: true,
    liveReload: true,
    hot: true,
    compress: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  }
};
