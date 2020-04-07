const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    historyApiFallback: true
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|public|build|tools)/,
      use: {
        loader: "babel-loader"
      }
    }, {
      // For pure CSS (without CSS modules)
      test: /\.css$/i,
      exclude: /\.module\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
    {
      // For CSS modules
      test: /\.module\.css$/i,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
      ],
    },
    {
      test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
      loader: 'url-loader',
      options: {
        limit: 8192,
      },
    },],
  },
  plugins: [new HtmlWebpackPlugin({
    inject: true,
    template: './public/index.ejs',
  })]
};
