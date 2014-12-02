/*
 * @jsx React.DOM
 */
var React = require("react");
var Comment = require("./comment-async");
var isoreact = require("../../lib/isoreact");

 module.exports = React.createClass({

    displayName: "page",

    mixins: [isoreact.mixin],

    getInitialState: isoreact.async(function(done) {
        setTimeout(function() {
            done({ asyncTest: "B" });
        });

        return { test: "A" };
    }),

    // getInitialStateAsync: function(done) {
    //     setTimeout(function() {
    //         done({ asyncTest: "B" });
    //     });
    // },

    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("h1", null,  this.state.asyncTest), 
                React.createElement(Comment, {text: "blah"})
            )
        );
    }

});