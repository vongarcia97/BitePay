const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { SourceMapDevToolPlugin } = require('webpack');


module.exports = {

  mode: process.env.NODE_ENV || 'production',

  entry: './client/index.js',

  node: false,

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new SourceMapDevToolPlugin({ filename: '[file].map' })
  ],

  externals: {
    bufferutil: "bufferutil",
    "utf-8-validate": "utf-8-validate",
  },

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
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'webpack-remove-debug'
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

  // Necessary for file changes inside the bind mount to get picked up
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },

  devServer: {
    // Required for Docker to work with dev server
    host: '0.0.0.0',
    //host: localhost,
    port: 8080,
    //enable HMR on the devServer
    hot: true,
    // fallback to root for other urls
    historyApiFallback: true,

    static: {
      // match the output path
      directory: path.resolve(__dirname, 'dist'),
      //match the output 'publicPath'
      publicPath: '/'
    },

    headers: { 'Access-Control-Allow-Origin': '*' },
    // proxy is required in order to make api calls to express server while using hot-reload webpack server
    // routes api fetch requests from localhost:8080/api/* (webpack dev server) to localhost:3000/api/* (where our Express server is running)

    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: true,
      },
    },

    liveReload: true,

    compress: false,

    headers: { 'Access-Control-Allow-Origin': '*' },
  }
};

