var fs = require("fs");
var path = require("path");
var webpack = require("webpack");

const globalModules = require("global-modules");
const ourGlobalFolder = path.join(
  globalModules,
  "./",
  "@codiechanel/simple-pack"
);

process.env.NODE_ENV = "production"

const webpackConfig = require(path.join(
    __dirname,
    "..",
    "webpack.config.prod-lambda"
  ));

  fs.readdirSync(path.join(process.cwd(), "src/lambda")).forEach(function(file) {
    if (file.match(/\.ts$/)) {
      var name = file.replace(/\.ts$/, "");
      webpackConfig.entry[name] = "./" + name;
    }
  });

  console.log('webpackConfig.entry', webpackConfig.entry)

  exports.run = function(dir, additionalConfig) {
    return new Promise(function(resolve, reject) {
      webpack(webpackConfig, function(err, stats) {
        if (err) {
          return reject(err);
        }
        resolve(stats);
      });
    });
  };
  