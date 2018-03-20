const Webpack = require("webpack");
const path = require("path");
const publicPath = "/";

const globalModules = require("global-modules");
const ourGlobalFolder = path.join(
  globalModules,
  "./",
  "@codiechanel/ts-pack"
);

const autoprefixer = require("autoprefixer");
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
    proxy: {
      "/.netlify/functions": {
        target: "http://localhost:9000",
        pathRewrite: {
          "^/\\.netlify/functions": ""
        }
      }
    }
  },
  context: process.cwd(),
  /**
   * this is weird
   * if installed globally i need to add these
   * to make hot reloading to work
   * but locally, it works without it
   */
  entry: [
    // polyfills if any
    "webpack/hot/dev-server",
    "webpack-dev-server/client?http://localhost:8080/",
    "./src/index.tsx"
  ],
  // entry: "./src/index.tsx",
  mode:"development",
  devtool: "inline-source-map",
  /**
   * it seems that webpack auto resolves the path now
   * no need to use require.resolve
   */
  module: {
    rules: [
    
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
      // { test: /\.module\.css$/, loader: 'typings-for-css-modules-loader?modules&namedExport' }, 
      // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
      // using the extension .module.css
      {
        test: /\.module\.css$/,
        use: [
          require.resolve("style-loader"),
          {
            
            loader: require.resolve("css-loader"),
            // loader: require.resolve("typings-for-css-modules-loader"),
            options: {
              // namedExport not used by css-loader
              // namedExport: true, 
              // Enable/Disable CSS Modules
              modules: true,
              // Number of loaders applied before CSS loader
              importLoaders: 1,
              localIdentName: "[path]__[name]___[local]"
            }
          },
          {
            loader: require.resolve("postcss-loader"),
            options: postCSSLoaderOptions
          }
          
        ]
      }, 
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: { 
              /**
               * let's simplify for now
               */
              // name: '[path][name].[ext]',
              name: '[name].[ext]',
              // outputPath: 'assets/', 
              // publicPath: 'assets/'
            }  
          }
        ]
      }, 
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        include: [
          path.resolve(process.cwd(), "src"),
        ], 
        // exclude: [path.resolve(ourGlobalFolder, "node_modules"), path.resolve(process.cwd(), 'node_modules'),"node_modules"]
        // exclude: /node_modules/
      }, 
      {
        test: /\.(vert|frag)$/,
        use: 'raw-loader'
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
    new Webpack.DefinePlugin({
      WEBGL_RENDERER: false,
      CANVAS_RENDERER: true,
    }), 
    new Webpack.HotModuleReplacementPlugin(),
    /**
     * we need to ignore the typings generated
     * because it slows down webpack compilation
     */
    new Webpack.WatchIgnorePlugin([
      /css\.d\.ts$/
    ]),
  ], 
  externals: {
    "react": "React",
    "react-dom": "ReactDOM", 
    "prop-types": "PropTypes", 
    "react-router-dom": "ReactRouterDOM", 
    "react-router" : "ReactRouter",
    // "rxjs":"rxjs"
  }
};
