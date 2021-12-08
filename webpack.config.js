const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const { populateHtmlPlugins } = require("./webpack.helper.js");

module.exports = {
  mode: "development",
  devtool: false,
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "./js/index.[contenthash].js",
  },
  // prettier-ignore
  plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: "css/style.[contenthash].css",
            }),
    ].concat(
        populateHtmlPlugins(
            'index.html',
        )
    ),
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "./img/[name][ext]",
        },
      },
      {
        test: /\.wav$/,
        type: "asset/resource",
        generator: {
          filename: "./sound/[name][ext]",
        },
      },

      {
        test: /\.s?css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // prettier-ignore
            presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  devServer: {
    hot: false,
    port: 9000,
  },

  optimization: {
    // prettier-ignore
    minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ],
  },
};
