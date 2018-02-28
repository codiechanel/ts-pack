const path = require("path");

const globalModules = require("global-modules");
const ourGlobalFolder = path.join(
  globalModules,
  "./",
  "@codiechanel/ts-pack"
);

module.exports = {
  /**
   * there seems to be no need to add context
   */
  // context: process.cwd(),
  entry: "./src/index.tsx",
  mode:"production",
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
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  }
};
