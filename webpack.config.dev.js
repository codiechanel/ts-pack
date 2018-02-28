const Webpack = require("webpack");
const path = require("path");
const publicPath = "/";
module.exports = {
  devServer: {
    // no effect
    // inline: true,
    historyApiFallback: true, 
    contentBase: path.join(process.cwd(), "public"),
    hot: true,
    filename: "bundle.js",
    publicPath: publicPath,
    stats: {
      colors: true
    },
  },
  /**
   * i think the entries below is already added by default
   */
  entry: [
    // polyfills if any
    // "webpack/hot/dev-server",
    // "webpack-dev-server/client?http://localhost:8080/",
    "./src/index.tsx"
  ],
  // entry: "./src/index.tsx",
  mode:"development",
  // devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public")
  },
  /**
   * you need to add this if you use hot: true
   */
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
  ], 
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  }
};
