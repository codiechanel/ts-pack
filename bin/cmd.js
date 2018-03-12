#!/usr/bin/env node
("use strict");
console.log("cool");
var program = require("commander");
var fs = require("fs");
var path = require("path");
const Webpack = require("webpack");
const build = require("../lib/build");
var serve = require("../lib/serve");
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

  program
  .command("build <dir>")
  .description("build functions")
  .action(function(cmd, options) {
    console.log("Building functions");
    build
      // .run(cmd, program.config)
      .run(cmd, null)
      .then(function(stats) {
        console.log(stats.toString({ color: true }));
      })
      .catch(function(err) {
        console.error(err);
        process.exit(1);
      });
  });
  
  program
  .command("serve <dir>")
  .description("serve and watch functions")
  .action(function(cmd, options) {
    console.log("Starting server");
    var server = serve.listen(9000);
    build.watch(cmd, program.config, function(err, stats) {
      if (err) {
        console.error(err);
        return;
      }

      stats.compilation.chunks.forEach(function(chunk) {
        server.clearCache(chunk.name);
      });

      console.log(stats.toString({ color: true }));
    });
  });  

program.parse(process.argv);
