
var react = require("react");
var r     = require("ramda");
var ReactInstanceHandles = require("react/lib/ReactInstanceHandles");
var ReactMarkupChecksum = require("react/lib/ReactMarkupChecksum");
var ReactServerRenderingTransaction = require("react/lib/ReactServerRenderingTransaction");
var instantiateReactComponent = require("react/lib/instantiateReactComponent");

var context = null;

var contexts = {
    BEFORE_ASYNC: "before-async",
    AFTER_ASYNC: "after-async"
};

var renderStates = {};

// Todo: generate a guid instead
var _renderId = function() {
    return Math.floor((Math.random() * 1000000) + 1).toString();
};

var mixin = {
    contextTypes: { renderId: react.PropTypes.string },

    _elementId: function() {
        return this._rootNodeID + '__' + this._mountDepth;
    },

    getInitialState: function() {
        var renderId  = this.context.renderId;
        var elementId = this._elementId();
        var context   = renderStates[renderId].context;
        var states    = renderStates[renderId].states;

        console.log("elementId: " + elementId);

        if (context === contexts.BEFORE_ASYNC) {
            if (this.getInitialStateAsync) {
                // let the framework know we're starting an async call
                renderStates[renderId].startAsyncCall();

                this.getInitialStateAsync(function(state) {
                    // save the state
                    states[elementId] = state;
                    // let the renderer know we're done
                    renderStates[renderId].completeAsyncCall();
                });
            }
            return {};
        } else if (context === contexts.AFTER_ASYNC) {
            return states[elementId] || {};
        } else {
            console.trace(this.displayName + ": Unknown context!");
            // throw new Error("Unknown context");
        }
    }
};

module.exports = {

    _renderToString: function(element, done) {
        var start = (new Date()).getTime();
        var renderId = _renderId();

        // We need this to set the context to be passed down to all of the
        // components in the hierarchy
        var container = react.withContext({ renderId: renderId }, function() {
            return element();
        });

        // setup state for this render
        renderStates[renderId] = {
            context: contexts.BEFORE_ASYNC,
            states: {},
            asyncCallsCount: 0,
            asyncOutstandingCount: 0,
            startAsyncCall: function() { ++this.asyncCallsCount; ++this.asyncOutstandingCount; },
            completeAsyncCall: function() {
                if (--this.asyncOutstandingCount === 0) {
                    // async is done, do the 2nd render so markup reflects async state
                    this.context = contexts.AFTER_ASYNC;
                    console.log("second render");
                    markup = react.renderToString(container);
                    done(markup, r.cloneObj(this.states));
                    // clean up
                    delete renderStates[renderId];

                    var finish = (new Date()).getTime();
                    console.log("finished in " + (finish - start).toString() + "ms");
                }
            }
        };

        console.log("first render");
        react.renderToString(container);
    },

    renderToString: function(element, done) {
        var transaction;

        try {
            var start = (new Date()).getTime();
            var renderId = _renderId();

            // We need this to set the context to be passed down to all of the
            // components in the hierarchy
            var container = react.withContext({ renderId: renderId }, function() {
                return element();
            });

            var id = ReactInstanceHandles.createReactRootID();

            // setup state for this render
            renderStates[renderId] = {
                context: contexts.BEFORE_ASYNC,
                states: {},
                asyncCallsCount: 0,
                asyncOutstandingCount: 0,
                startAsyncCall: function() { ++this.asyncCallsCount; ++this.asyncOutstandingCount; },
                completeAsyncCall: function() {
                    if (--this.asyncOutstandingCount === 0) {
                        // async is done, do the 2nd render so markup reflects async state
                        this.context = contexts.AFTER_ASYNC;
                        console.log("second render");
                        transaction = ReactServerRenderingTransaction.getPooled(false);
                        var markup = transaction.perform(function() {
                            var componentInstance = instantiateReactComponent(container, null);
                            var markup = componentInstance.mountComponent(id, transaction, 0);
                            return ReactMarkupChecksum.addChecksumToMarkup(markup);
                        }, null);
                        done(markup, r.cloneObj(this.states));
                        // clean up
                        delete renderStates[renderId];

                        var finish = (new Date()).getTime();
                        console.log("finished in " + (finish - start).toString() + "ms");
                    }
                }
            };

            transaction = ReactServerRenderingTransaction.getPooled(false);
            transaction.perform(function() {
                var componentInstance = instantiateReactComponent(container, null);
                var markup = componentInstance.mountComponent(id, transaction, 0);
            }, null);
        } finally {
            ReactServerRenderingTransaction.release(transaction);
        }
    },

    mixin: mixin
}