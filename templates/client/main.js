
require("./assets/app.styl");

var r           = require("ramda");
var react       = require("react");
var isoreact    = require("isoreact");
var routesList  = require("./routes");
var urlUtil     = require("url");
var querystring = require("querystring");

var router1     = isoreact.clientrouter;
var router     = require("./lib/router");
var selector   = "#page";
var pageAction = router.reactPageAction(selector);

console.log(router);
console.log(JSON.stringify(router));
console.log(router1);
console.log(JSON.stringify(router1));

// setup routing
var routes = r.reduce(router.configureRoute(pageAction), router.create(), routesList);

// route clicks
// todo: explore if this will be a performance issue - do we need to hook all
//       <a>'s on the page instead?
document.addEventListener("click", router.handleClicks(routes));

// popstate stuff (back button, etc)
window.onpopstate = router.handlePopState(routes);

// init
document.onload = router.init(routes, selector, window.location.href);