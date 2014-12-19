/**
 * Functions for working with Express routes 
 * and linking them with react rendering.
 *
 * @module
 */
var r     = require("ramda");
var react = require("react");


/**
 * Adds a route to the express router.
 *
 * Not Pure
 *
 * @function
 * @param {object} app - An Express app object.
 * @param {array} route - A route tuple in the form [method, path, handlerFn].
 */
var setServerRoute = function(app, route) {
    var method = r.head(route);
    var args   = r.tail(route);
    app[method].apply(app, args);
    return app;
};

/**
 * Adds a list of server route tuples to the express router.
 *
 * Not Pure
 *
 * @function
 * @param {object} app - An Express app object.
 * @param {array} routes - A list of route tuples in the form [[method, path, handlerFn],...].
 */
var setServerRoutes = function(app, routes) {
    return r.reduce(setServerRoute, app, routes);
};

/**
 * Renders a layout page along with a react component tree. Calls the
 * asyncStateFn before rendering so the component tree has all the data it
 * needs to render correctly.
 *
 * Not Pure
 * 
 * @param  {function} layout - Compiled mustache template.
 * @param  {function} pageComponent - React page component to be rendered.
 * @param  {function} asyncStateFn - Async function called to fetch state for page component. Should return a promise.
 * @return {promise}
 */
var reactRouteHandler = function(htmlComponent, layoutComponent, pageComponent, asyncStateFn) {
    return function(req, res) {
        var requestContext = {
            req: req,
            res: res,
            params: req.params,
            query: req.query
        };

        return asyncStateFn(requestContext).then(function(state) {
            var renderContext = {
                reqId: req._id,
                state: state
            };

            // render the page with the layout
            var element     = react.createFactory(layoutComponent);            
            var props       = { body: pageComponent };
            var container   = react.withContext(renderContext, function() { return element(props); });
            var markup      = react.renderToString(container);

            // render the shell/skeleton
            var htmlElement = react.createFactory(htmlComponent);
            var html        = react.renderToStaticMarkup(htmlElement({
                body: markup,
                state: JSON.stringify(state)
            }));

            // var html      = htmlTemplate({
            //     reqId: req._id,
            //     // Todo: is this needed?
            //     rootId: markup.match(/data-reactid="([^"]+)"/)[1],
            //     state: JSON.stringify(state),
            //     body: markup,
            //     title: ""
            // });

            res.send(html);
        });
    }
};

/**
 * Adds a reactRouteHandler function to the express app.
 *
 * Curried
 * Not Pure
 * 
 * @param  {function} layout - Compiled mustache template.
 * @param  {object} app - An Express app object.
 * @param  {object} route - client route object with these keys: path, component, state
 * @return {object} The Express app object
 */
var setClientRoute = r.curry(function(htmlComponent, defaultLayout, app, route) {
    var path            = r.get("path", route);
    var layoutComponent = r.get("layout", route) || defaultLayout;
    var pageComponent   = r.get("component", route);
    var asyncStateFn    = r.get("state", route) || function(context, done) { done({}); };
    app.get(path, reactRouteHandler(htmlComponent, layoutComponent, pageComponent, asyncStateFn));
    return app; 
});

/**
 * Adds a list of client route objects to the express router.
 *
 * Not Pure
 *
 * @function
 * @param  {object} app - An Express app object.
 * @param  {array} routes - client routes list
 * @param  {function} layout - Compiled mustache template.
 * @returns {object} The Express app object
 */
var setClientRoutes = function(app, routes, html, layout) {
    return r.reduce(setClientRoute(html, layout), app, routes);
};

/**
 * serverroutes exports
 * @type {Object}
 */
module.exports = {
    setClientRoutes: setClientRoutes,
    setServerRoutes: setServerRoutes
};