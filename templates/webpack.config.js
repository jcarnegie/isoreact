var webpack = require("webpack");
var path    = require("path");
var axis    = require("axis-css");
var jeet    = require("jeet");
var rupture = require("rupture");

var env = function() { return process.env.NODE_ENV || "development"; }

var isDevelopment = function() { return env() === "development"; }

var envConfigPath = function() {
    return "../config/" + env() + ".json";
}

var clientPlugins = function() {
    if ( isDevelopment() ) return [];

    return [
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ];
}

module.exports = [
    {
        name:  "client",

        entry: "./client/main.js",

        output: {
            path: path.join(__dirname, "dist", "public", "js"),
            filename: "app.js",
            publicPath: "/js"
        },

        module: {
            loaders: [
                { test: /.json$/, loader: "json", exclude: "node_modules" },
                { test: /.jsx$/,  loader: "jsx", exclude: "node_modules" },
                { test: /.styl$/, loader: "style-loader!css-loader!stylus-loader", exclude: "node_modules" }
            ]
        },

        resolve: {
            alias: {
                "$envConfig": envConfigPath()
            }
        },

        // stylus libraries
        stylus: { use: [axis(), jeet(), rupture()] },

        plugins: clientPlugins()
    },
    {
        name: "server",

        entry: "./server/main.js",

        output: {
            path: path.join(__dirname, "dist", "server"),
            filename: "app.js",
            libraryTarget: "commonjs2"
        },

        devtool: "inline-source-map",

        externals: /^[a-z\-0-9]+$/,

        module: {
            loaders: [
                { test: /.json$/, loader: "json", exclude: "node_modules" },
                { test: /.jsx$/,  loader: "jsx", exclude: "node_modules" },
                { test: /.styl$/, loader: "style-loader!css-loader!stylus-loader", exclude: "node_modules" }
            ]
        },

        resolve: {
            alias: {
                "$envConfig": envConfigPath()
            }
        },

        // stylus libraries
        stylus: { use: [axis(), jeet(), rupture()] },

        node: {
            process: false
        }
    }
];