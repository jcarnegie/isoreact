var r            = require("ramda");
var env          = require("./env");
var react        = require("react");
var clientrouter = require("./clientrouter");
var serverroutes = require("./serverroutes");

var mixin = {
    /**
     *
     */
    contextTypes: {
        reqId: react.PropTypes.string,
        state: react.PropTypes.object,
        params: react.PropTypes.object,
        query: react.PropTypes.object
    },

    childContextTypes: {
        reqId: react.PropTypes.string,
        state: react.PropTypes.object,
        params: react.PropTypes.object,
        query: react.PropTypes.object
    },

    getChildContext: function() {
        return this.props.$context;
    },

    getInitialState: function() {
        this.props.$state = this.context.state;
        return {};
    },

    componentDidMount: function() {
        if (this.needsState && this.needsState() && this.loadAsync) {
            this.loadAsync();
        }
    },

    setStateAsync: function(prop, promise) {
        var propGiven = (arguments.length > 1);

        if (!propGiven) promise = prop;

        var success = function(data) {
            if (!this.isMounted()) return {};
            var state = {};

            if (propGiven) {
                state[prop] = data;    
            } else {
                state = data;
            }

            this.setState(state);
        }.bind(this);

        var error = function(err) {
            return (this.isMounted()) ? err : null;
        }.bind(this);

        return promise.then(success, error);
    },

    withLoader: function(renderFn) {
        if (this.needsState && this.needsState()) {
            return this.loaderMarkup();
        } else {
            return renderFn.bind(this)();
        }    
    }
};

module.exports = {
    env: env,
    mixin: mixin,
    clientrouter: clientrouter,
    serverroutes: serverroutes
};