var webpack = require("webpack");
var path    = require("path");
var axis    = require("axis-css");
var jeet    = require("jeet");
var rupture = require("rupture");

module.exports = [{
    name: "client",

    entry: "./app/client.coffee",

    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "dist",
        filename: "client.js"
    },

    module: {
        preLoaders: [
            { test: /.coffee$/, loader: "coffee", exclude: "node_modules" }
        ],

        loaders: [
            { test: /.json$/, loader: "json", exclude: "node_modules" },
            { test: /.cjsx$/, loader: "coffee!cjsx", exclude: "node_modules" },
            { test: /.scss$/, loader: "style-loader!css-loader!sass-loader" },
            { test: /.styl$/, loader: "style-loader!css-loader!stylus-loader", exclude: "node_modules" }
        ]
    },

    // stylus libraries
    stylus: { use: [axis(), jeet(), rupture()] }
}, {
    // ** for reference: https://github.com/webpack/react-webpack-server-side-example/blob/master/webpack.config.js
    name: "server",

    entry: "./app/server.coffee",

    target: "node",

    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "dist",
        filename: "server.js",
        libraryTarget: "commonjs2"
    },

    externals: /^[a-z\-0-9]+$/,

    module: {
        preLoaders: [
            { test: /.coffee$/, loader: "coffee", exclude: "node_modules" }
        ],

        loaders: [
            { test: /.json$/, loader: "json", exclude: "node_modules" },
            { test: /.jsx$/,  loader: "jsx", exclude: "node_modules" },
            { test: /.cjsx$/, loader: "coffee!cjsx", exclude: "node_modules" },
            { test: /.scss$/, loader: "style-loader!css-loader!sass-loader" },
            { test: /.styl$/, loader: "style-loader!css-loader!stylus-loader", exclude: "node_modules" },
            { test: /.ejs$/,  loader: "ejs-loader", exclude: "node_modules" }
        ]
    }
}];