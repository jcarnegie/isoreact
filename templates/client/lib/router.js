var r           = require("ramda");
var react       = require("react");
var urlUtil     = require("url");
var querystring = require("querystring");

/**
 * [makeRouteRegexp description]
 * @param  {[type]} routeUrl [description]
 * @return {[type]}          [description]
 */
var makeRouteRegexp = function(routeUrl) {
    return new RegExp("^" + routeUrl.replace(/:[^\/]+/g, "([^\/]+)") + "$");
};

var getRouteParamNames = function(routeUrl) {
    var matches = routeUrl.match(/(:[^\/]+)/g);
    if (matches === null) return [];

    var removeLeadingColon = function(s) { return s.replace(/^:/, ""); };
    var removeColons = r.map(removeLeadingColon);
    return removeColons(matches);
};

/**
 * [create description]
 * @return {[type]} [description]
 */
var create = function() {
    return {
        routes: []
    }
};

/**
 * [add description]
 * @param {[type]}   routes    [description]
 * @param {[type]}   routeUrl  [description]
 * @param {[type]}   component [description]
 * @param {Function} fn        [description]
 */
var add = function(routes, routeUrl, component, fn) {
    var copy = r.cloneDeep(routes);

    copy.routes.push({
        matcher: makeRouteRegexp(routeUrl),
        paramNames: getRouteParamNames(routeUrl),
        routeUrl: routeUrl,
        component: component,
        fn: fn
    });

    return copy;
};

/**
 * [find description]
 * @param  {[type]} routes [description]
 * @param  {[type]} path   [description]
 * @return {[type]}        [description]
 */
var find = function(routes, path) {
    var matches = function(route) {
        return path.match(route.matcher);
    };

    return r.find(matches, routes.routes);
}

/**
 * [match description]
 * @param  {[type]} routes [description]
 * @param  {[type]} path   [description]
 * @return {[type]}        [description]
 */
var match = function(routes, path) {
    var route = find(routes, path);

    if (route) {
        var matches = path.match(route.matcher);
        var params = r.zipObj(route.paramNames, r.tail(matches));
        route.fn(route, params);
    }

    return route;
};

/**
 * [description]
 * @param  {[type]} containerSelector [description]
 * @param  {[type]} component)        {               return reactPageActionWithState(null, containerSelector, component);} [description]
 * @return {[type]}                   [description]
 */
var reactPageAction = r.curry(function(containerSelector, layout, component) {
    return reactPageActionWithState(null, containerSelector, layout, component);
});

/**
 * [description]
 * @param  {[type]} state             [description]
 * @param  {[type]} containerSelector [description]
 * @param  {Object} component)        {               return function(route, params) {         var context [description]
 * @return {[type]}                   [description]
 */
var reactPageActionWithState = r.curry(function(state, containerSelector, layout, component) {
    return function(route, params) {
        var context = {
            params: params,
            query: querystring.parse(window.location.search),
            state: state || {}
        };

        react.withContext(context, function() {
            var props = {
                body: react.createFactory(component),
                $context: context
            };
            var element    = react.createFactory(layout);
            var domElement = document.querySelector(containerSelector);
            react.render(element(props), domElement);
        });
    }
});

/**
 * [description]
 * @param  {[type]} pageActionFn [description]
 * @param  {[type]} routes       [description]
 * @param  {[type]} route)       {               var path [description]
 * @return {[type]}              [description]
 */
var configureRoute = r.curry(function(pageActionFn, defaultLayout, routes, route) {
    var path      = r.get("path", route);
    var component = r.get("component", route);
    var layout    = r.get("layout", route) || defaultLayout;
    return add(routes, path, component, pageActionFn(layout, component)); 
});

/**
 * [description]
 * @param  {[type]} routes          [description]
 * @param  {[type]} e)              {                                                               if (e.target.localName ! [description]
 * @param  {[type]} route.pageTitle ||            document.title [description]
 * @param  {[type]} path);                                                     }} [description]
 * @return {[type]}                 [description]
 */
var handleClicks = r.curry(function(routes, e) {
    // ignore clicks to elements other than <a>'s
    if (e.target.localName !== "a") return;

    var parsedUrl = urlUtil.parse(e.target.href);
    var path = parsedUrl.pathname + (parsedUrl.search || "");

    var route = null;
    if (route = match(routes, path)) {
        e.preventDefault();
        e.stopPropagation();
        history.pushState({}, route.pageTitle || document.title, path);
    }
});

/**
 * [description]
 * @param  {[type]} routes [description]
 * @param  {[type]} e)     {               var parsedUrl [description]
 * @return {[type]}        [description]
 */
var handlePopState = r.curry(function(routes, e) {
    var parsedUrl = urlUtil.parse(window.location.href);
    var path = parsedUrl.pathname + (parsedUrl.search || "");
    match(routes, path);
});

/**
 * [description]
 * @param  {[type]} routes            [description]
 * @param  {[type]} containerSelector [description]
 * @param  {[type]} url               [description]
 * @param  {[type]} e)                {               var parsedUrl [description]
 * @return {[type]}                   [description]
 */
var init = r.curry(function(routes, containerSelector, url, e) {
    var parsedUrl = urlUtil.parse(url);
    var path = parsedUrl.pathname + (parsedUrl.search || "");
    var route = find(routes, path);

    if (route) {
        var matches = path.match(route.matcher);
        var params  = r.zipObj(route.paramNames, r.tail(matches));
        var state   = (typeof $state === "object") ? $state : {};
        var action  = reactPageActionWithState(state, containerSelector, path);
        action(route, params);
    }
});

/**
 * [exports description]
 * @type {Object}
 */
module.exports = {
    create: create,
    add: add,
    match: match,
    init: init,
    reactPageAction: reactPageAction,
    configureRoute: configureRoute,
    handleClicks: handleClicks,
    handlePopState: handlePopState
}