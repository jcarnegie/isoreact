var r     = require("ramda");
var react = require("react");

var setServerRoute = function(app, route) {
    var method = r.head(route);
    var args   = r.tail(route);
    app[method].apply(app, args);
    return app;
};

var setServerRoutes = function(app, routes) {
    return r.reduce(setServerRoute, app, routes);
};

var reactRouteHandler = function(layout, pageComponent, asyncStateFn) {
    return function(req, res) {
        var requestContext = {
            req: req,
            res: res,
            params: req.params,
            query: req.query
        };

        asyncStateFn(requestContext).then(function(state) {
            var renderContext = {
                reqId: req._id,
                state: state
            };

            var element   = react.createFactory(pageComponent);
            var container = react.withContext(renderContext, function() { return element(); });
            var markup    = react.renderToString(container);
            var html      = layout({
                reqId: req._id,
                // Todo: is this needed?
                rootId: markup.match(/data-reactid="([^"]+)"/)[1],
                state: JSON.stringify(state),
                body: markup,
                title: ""
            });

            res.send(html);
        });
    }
};

// configure client routes
var setClientRoute = r.curry(function(layout, app, route) {
    var path          = r.get("path", route);
    var pageComponent = r.get("component", route);
    var asyncStateFn  = r.get("state", route) || function(context, done) { done({}); };
    app.get(path, reactRouteHandler(layout, pageComponent, asyncStateFn));
    return app;
});

var setClientRoutes = function(app, routes, layout) {
    return r.reduce(setClientRoute(layout), app, routes);
};

module.exports = {
    setClientRoutes: setClientRoutes,
    setServerRoutes: setServerRoutes
};