#!/usr/bin/env node
("use strict");
console.log("cool");
var program = require("commander");
var fs = require("fs");
var path = require("path");
const Webpack = require("webpack");
let pkg = require(path.join(__dirname, "..", "package.json"));

program.version(pkg.version);
program.option(
  "-c --config <webpack-config>",
  "additional webpack configuration"
);

program
  .command("dev")
  .description("starts in dev mode")
  .action(function(cmd, options) {
    console.log("Starting dev server...");
    // buildReact.dev();
    
    const WebpackDevServer = require("webpack-dev-server");
    const webpackConfig = require(path.join(
      __dirname,
      "..",
      "webpack.config.dev"
    ));
    // webpackConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:8080");
    const compiler = Webpack(webpackConfig);
    // if we want to override settings
    const devServerOptions = Object.assign({}, webpackConfig.devServer, {
      stats: {
        colors: true
      }
    });
    const server = new WebpackDevServer(compiler, devServerOptions);
    // server.listen(8080, "127.0.0.1", () => {
    server.listen(8080, "0.0.0.0", () => {
      console.log("Starting server on http://localhost:8080");
    });
  });

program
  .command("prod")
  .description("building typescript proj")
  .action(function(cmd, options) {
    
    
    // const WebpackDevServer = require("webpack-dev-server");
    const webpackConfig = require(path.join(
      __dirname,
      "..",
      "webpack.config.prod"
    ));
    Webpack(webpackConfig, function(err, stats) {
      if (err || stats.hasErrors()) {
        // Handle errors here
        const info = stats.toJson();
        console.error(info.errors);
      } else {
        console.log(
          "build successful",
          stats.toString({
            // ...
            // Add console colors
            colors: true
          })
        );
      }
    });
  });

program.parse(process.argv);
