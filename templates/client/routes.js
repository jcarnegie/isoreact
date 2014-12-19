var r       = require("ramda");
var Promise = require("es6-promise").Promise;
var api     = require("./lib/apiclient");
var Home    = require("./pages/home.jsx");
var Post    = require("./pages/post.jsx");
var Signup  = require("./pages/signup.jsx");

var loadAsProp = r.curry(function(prop, fn, context) {
    return fn(context).then(function(data) {
        var result = {};
        result[prop] = data;
        return result;
    })
});

/**
 * List of routes. Each route has these properties:
 *
 * - path
 * - component
 * - state
 * - beforeFilter
 * - afterFilter
 * - timeout
 */
module.exports = [
    {
        path: "/",
        component: Home,
        state: loadAsProp("posts", api.getPosts)
    },
    {
        path: "/signup",
        component: Signup
    },
    {
        path: "/post/:id",
        component: Post,
        state: loadAsProp("post", api.getPost)
    }
];