const path = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const globalModules = require("global-modules");
var nodeExternals = require('webpack-node-externals');
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
      // {
      //   test: /\.json$/,
      //   use: 'json-loader'
      // }
    ]
  },
  resolve: {
    modules: [path.resolve(ourGlobalFolder, "node_modules"), path.resolve(process.cwd(), 'node_modules'),"node_modules"], 
    // plugins: [
    //   new TsconfigPathsPlugin({baseUrl: process.cwd(), configFile:path.resolve(process.cwd(), "tsconfig-lambda.json")  })
    // ], 
    /**
     * which is what enables users to leave off the extension when importing:
     * Using this will override the default array
     */
    extensions: [".tsx", ".ts", ".js", ".json"]
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
  // externals: [nodeExternals()],
  // plugins: [
  //   new TsconfigPathsPlugin({ configFile:path.resolve(process.cwd(), "tsconfig-lambda.json")  })
  // ], 
};
