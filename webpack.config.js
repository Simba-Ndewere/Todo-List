// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "inline-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: 'index.html',
      inject: 'head',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

