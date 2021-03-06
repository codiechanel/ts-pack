const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
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
  /**
   * no effect when using webpack node api 
   */
  stats: {
    maxModules: 25,
    modules: true,
    chunkOrigins: true,
    providedExports: true,
  }, 
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
    "react": "React",
    "react-dom": "ReactDOM", 
    "prop-types": "PropTypes", 
    "react-router-dom": "ReactRouterDOM", 
    "react-router" : "ReactRouter", 
    // "rxjs":"rxjs"
   
  },
  /**
   * doesn't really decrease the bundle size
   */
  // optimization: {
	// 	minimize: true,
	// 	minimizer: [
	// 		new UglifyJsPlugin({
	// 			uglifyOptions: {
	// 				output: {
	// 					comments: false
	// 				},
	// 				compress: {
	// 					dead_code: true
	// 				}
	// 			}
	// 		})
	// 	]
	// }
};
