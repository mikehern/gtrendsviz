const HtmlWebpackPlugin = require('html-webpack-plugin');

const outputDirectory = '/dist';

module.exports = {
  resolve: { extensions: ['.js', '.jsx', '.json'] },
  entry: './src/client/index.js',
  output: {
    path: __dirname + outputDirectory,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css?/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    port: 1337,
    open: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
