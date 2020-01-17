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
      test: /\.css/,
      use: ['style-loader', 'css-loader']
    }],
  },
  plugins: [new HtmlWebpackPlugin({
    inject: true,
    template: './public/index.ejs',
  })]
};
