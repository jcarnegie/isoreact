/*
 * @jsx React.DOM
 */
var React = require("react");
var Comment = require("./comment-async");
var isoreact = require("../../lib/isoreact");

 module.exports = React.createClass({

    displayName: "page",

    mixins: [isoreact.mixin],

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
            <div>
                <h1>{ this.state.asyncTest }</h1>
                <Comment text="blah"/>
            </div>
        );
    }

});