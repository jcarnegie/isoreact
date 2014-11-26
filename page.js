/*
 * @jsx React.DOM
 */
 var React = require("react");
 var Comment = require("./comment");
 var SSRMixin = require("./ssr").mixin;

 module.exports = React.createClass({

    displayName: "page",

    mixins: [SSRMixin],

    getInitialState: function() {
        return { test: "A" };
    },

    getInitialStateAsync: function(done) {
        setTimeout(function() {
            done({ asyncTest: "B" });
        });
    },

    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("h1", null,  this.state.asyncTest), 
                React.createElement(Comment, {text: "blah"})
            )
        );
    }

});
