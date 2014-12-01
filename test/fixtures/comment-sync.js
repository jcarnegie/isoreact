/*
 * @jsx React.DOM
 */
var React = require("react");

module.exports = React.createClass({

    displayName: "comment",

    getInitialState: function() {
        return { foo: "bar" };
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