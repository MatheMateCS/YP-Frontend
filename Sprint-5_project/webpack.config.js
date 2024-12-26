const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Импорт плагина
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Импорт плагина для извлечения CSS

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'), // Папка для сервера разработки
    port: 8080, // Порт для локального хоста
    open: true, // Автоматическое открытие браузера
  },
};
