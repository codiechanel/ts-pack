const path = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
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
  // entry: "./src/index.tsx",
  context: path.join(process.cwd(), "src/lambda"),
  // context: process.cwd(), 
  entry: {},
  target: "node",
  mode:"production",
  // devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    modules: [path.resolve(ourGlobalFolder, "node_modules"), path.resolve(process.cwd(), 'node_modules'),"node_modules"], 
    // plugins: [
    //   new TsconfigPathsPlugin({baseUrl: process.cwd(), configFile:path.resolve(process.cwd(), "tsconfig-lambda.json")  })
    // ], 
    extensions: [".tsx", ".ts", ".js"]
  },
  resolveLoader: {
    modules: [path.resolve(ourGlobalFolder, "node_modules")]
  },
  // output: {
  //   filename: "bundle.js",
  //   path: path.resolve(process.cwd(), "lambda"),
  // },
  output: {
    path: path.join(
      process.cwd(),
      "lambda"
    ),
    filename: "[name].js",
    libraryTarget: "commonjs"
  },
  // plugins: [
  //   new TsconfigPathsPlugin({ configFile:path.resolve(process.cwd(), "tsconfig-lambda.json")  })
  // ], 
};
