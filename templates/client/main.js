
require("./assets/app.styl");

var r           = require("ramda");
var react       = require("react");
var isoreact    = require("isoreact");
var routesList  = require("./routes");
var urlUtil     = require("url");
var querystring = require("querystring");
var layout      = require("./layouts/app.jsx");
var router      = require("isoreact/lib/clientrouter")(react);

var selector   = "body";
var pageAction = router.reactPageAction(selector);

// setup routing
var routes = r.reduce(router.configureRoute(pageAction, layout), router.create(), routesList);

// route clicks
// todo: explore if this will be a performance issue - do we need to hook all
//       <a>'s on the page instead?
document.addEventListener("click", router.handleClicks(routes));

// popstate stuff (back button, etc)
window.onpopstate = router.handlePopState(routes);

// init
document.addEventListener("DOMContentLoaded", router.init(routes, selector, window.location.href, layout));