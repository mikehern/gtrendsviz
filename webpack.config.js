const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

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
      },
      {
        test: /\.(png|jpg)$/,
        include: path.join(__dirname, './src/client/assets'),
        loader: 'file-loader'
      },
      {
        test: /\.(ttf|eot|woff|woff2|otf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]",
            outputPath: "fonts/"
          },
        },
      },
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
