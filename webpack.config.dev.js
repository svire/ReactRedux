const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development"; //or production

//to configure webpack we export javascript object(module exports)
module.exports = {
  mode: "development",
  target: "web", //we can write node if we were useing webpack to build an app running in node so node could work with it instead of the browser
  devtool: "cheap-module-source-map", //recomended for development, source map for dubugging
  entry: "./src/index", //app entry file
  output: {
    path: path.resolve(__dirname, "build"), //dirname current directory name
    publicPath: "/", //this specife pulic url of the output directory when its referenced in the browser
    filename: "bundle.js",
  },
  //you could choose to serve your app using any node based web servers such as express
  devServer: {
    stats: "minimal",
    overlay: true, //overlay any errors in the browsser
    historyApiFallback: true, //all request will be send to index.html...we can load deep links and they all be handled by react router
    //ovo dole je nesto za chrome
    disableHostCheck: true,
    headers: {"Access-Control-Allow-Origin": "*"},
    https: false,
  },
  //specify array
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:3001"),
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
    }),
  ],
  module: {
    rules: [
      //how to find javascript files or jsx
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, //ignore node modules
        use: ["babel-loader", "eslint-loader"], //to tell webpack what to do with js files, to run babel on this files
      }, //now webpack will watch our files, recompile our code, and run ESLint when we hit save
      //run ESLINT first then run BABEL
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"], //two different loaders combo, webpack will bundle all css in single file
      },
    ],
  },
};
