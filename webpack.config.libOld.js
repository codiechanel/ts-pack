const path = require("path");
const Webpack = require("webpack");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const globalModules = require("global-modules");
const CopyWebpackPlugin = require("copy-webpack-plugin");
var fs = require("fs");
// const pkg = require('./package.json');
var pkg = JSON.parse(
  fs.readFileSync(path.join( process.cwd(),  "package.json"))
);
let libraryName = pkg.name;

const ourGlobalFolder = path.join(
  globalModules,
  "./",
  "@codiechanel/simple-pack"
);
/**
 * hard coded for now...
 */
const publicPath = "/";
const shouldUseSourceMap = false;
// const shouldUseRelativeAssetPaths = publicPath === "./";
// Note: defined here because it will be used more than once.
// const cssFilename = "static/css/[name].[contenthash:8].css";

const postCSSLoaderOptions = {
  // Necessary for external CSS imports to work
  // https://github.com/facebook/create-react-app/issues/2677
  ident: "postcss",
  plugins: () => [
    require("postcss-flexbugs-fixes"),
    autoprefixer({
      flexbox: "no-2009"
    })
  ]
};

module.exports = {
  // Don't attempt to continue if there are any errors.
  bail: true,
  // devtool: 'source-map',
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            presets: [
              require.resolve("@babel/preset-react"),
              [
                require.resolve("@babel/preset-env"),
                {
                  targets: {
                    // "esmodules": true, 

                    browsers: [
                      "last 2 chrome versions",
                      "last 2 firefox versions",
                      "last 2 edge versions"
                    ]
                  }
                }
              ]
            ],
            plugins: [
              require.resolve("@babel/plugin-proposal-class-properties"),
              require.resolve("@babel/plugin-proposal-object-rest-spread"), 
              require.resolve("@babel/plugin-proposal-decorators")
              // require.resolve("@babel/plugin-transform-regenerator"),
              // require.resolve("@babel/plugin-transform-runtime")
            ]
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          require.resolve("style-loader"),
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1
            }
          },
          {
            loader: require.resolve("postcss-loader"),
            options: postCSSLoaderOptions
          }
        ]
      },
      // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
      // using the extension .module.css
      {
        test: /\.module\.css$/,
        use: [
          require.resolve("style-loader"),
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[path]__[name]___[local]"
            }
          },
          {
            loader: require.resolve("postcss-loader"),
            options: postCSSLoaderOptions
          }
        ]
      }, 
     
    ]
  },
  resolve: {
    modules: [path.resolve(ourGlobalFolder, "node_modules"), path.resolve(process.cwd(), 'node_modules'), "node_modules"]
  },
  resolveLoader: {
    modules: [path.resolve(ourGlobalFolder, "node_modules")]
  },
  context: process.cwd(),
  //   context: path.join(process.cwd(), "src"),
  entry: [
    // polyfills if any
    "./src/index.js"
  ],
  output: {
     filename: "index.js",
    // publicPath: publicPath,
    path: path.resolve(process.cwd(), "lib"), 
    library: libraryName, 
    libraryTarget: 'umd',
    // umdNamedDefine: true,
    // libraryTarget: 'commonjs2',
    
  },
  /** 
   * we are now adding this dynamically
   */
  // externals: ["react", "material-ui"], 
  
};
