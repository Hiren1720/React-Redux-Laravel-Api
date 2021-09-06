var HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const packageMeta = require("./package.json");
// var cwd = process.cwd();
// var stylePaths = [
//   path.join(cwd, 'styles'),
//   path.join(cwd, 'components')
// ];
module.exports = {
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx", ".scss", ".css"],
  },
  module: {
    rules: [
      {
        exclude: "/node_modules/",
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: packageMeta.title,
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
  output: {
    filename: "main.js",
    path: path.join(__dirname, "dist"),
  },
  // sassLoader: {
  //     includePaths: [ path.join('./styles/partials') ]
  // },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: "http://localhost:8000",
    }),
  },
};
// const developmentConfig = {
//     module: {
//       loaders: [
//         {
//           test: /\.font.js$/,
//           loaders: ['style-loader', 'css-loader', 'fontgen-loader']
//         },
//         {
//           test: /\.css$/,
//           loaders: ['style-loader', 'css-loader'],
//           include: stylePaths
//         },
//         {
//           test: /\.scss$/,
//           loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
//           include: stylePaths
//         }
//       ]
//     }
// };
