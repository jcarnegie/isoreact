var react = require("react");
var r     = require("ramda");
var ssr   = require("./ssr");
var Page  = require("./page");

page = react.createFactory(Page);

ssr.renderToString(page, function(markup, states) {
    console.log("markup:\n");
    console.log(markup);
    console.log("\n\nstates:\n");
    console.log(states);
});