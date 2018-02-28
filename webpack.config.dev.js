const Webpack = require("webpack");
const path = require("path");
const publicPath = "/";

const globalModules = require("global-modules");
const ourGlobalFolder = path.join(
  globalModules,
  "./",
  "ts-pack"
);

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
  context: process.cwd(),
  /**
   * i think the entries below is already added by default
   */
  entry: [
    // polyfills if any
    "webpack/hot/dev-server",
    "webpack-dev-server/client?http://localhost:8080/",
    "./src/index.tsx"
  ],
  // entry: "./src/index.tsx",
  mode:"development",
  // devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: require.resolve("ts-loader"),
        exclude: /node_modules/
      }
    ]
  },
  // resolve: {
  //   extensions: [".tsx", ".ts", ".js"]
  // },
  resolve: {
    modules: [path.resolve(ourGlobalFolder, "node_modules"), path.resolve(process.cwd(), 'node_modules'),"node_modules"], 
    extensions: [".tsx", ".ts", ".js"]
  },
  resolveLoader: {
    modules: [path.resolve(ourGlobalFolder, "node_modules")]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(process.cwd(), "public"),
    // path: path.resolve(__dirname, "public")
  },
  /**
   * you need to add this if you use hot: true
   */
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
  ], 
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};
