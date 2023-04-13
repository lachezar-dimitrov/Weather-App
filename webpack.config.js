const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  // other webpack config options
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/index.html", to: "index.html" },
        { from: "src/assets", to: "assets" },
      ],
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images",
              publicPath: "assets/images",
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
