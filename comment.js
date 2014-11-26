/*
 * @jsx React.DOM
 */
 var React = require("react");
 var SSRMixin = require("./ssr").mixin;

 module.exports = React.createClass({

    displayName: "comment",

    mixins: [SSRMixin],

    getInitialState: function() {
        return {};
    },

    getInitialStateAsync: function(done) {
        setTimeout(function() {
            done({ foo: "bar" });
        });
    },

    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("div", null,  this.props.text), 
                React.createElement("div", null,  this.state.foo), 
                React.createElement("a", {href: "/user/someuserid"}, this.props.username)
            )
        );
    }

});
