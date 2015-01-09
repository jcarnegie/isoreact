var r               = require("ramda");
var react           = require("react");
var morgan          = require("morgan");
var express         = require("express");
var isoreact        = require("isoreact");
var serverroutes    = require("isoreact/lib/serverroutes");
var routeList       = require("./routes");
var clientRouteList = require("../client/routes");
var routeshelper    = require("./lib/routeshelper");
var htmlComponent   = require("../client/layouts/html.jsx");
var defaultLayout   = require("../client/layouts/app.jsx");

// create express app server
var app = express();

// logging
app.use(morgan("dev"));

// configure static directories
app.use(express.static("dist/public"));

// add your middleware here

// configure server-side api + client routes
serverroutes.setServerRoutes(app, routeList);
serverroutes.setClientRoutes(app, clientRouteList, htmlComponent, defaultLayout);

app.listen(3000, function() {
    console.log("listening on 3000");
});