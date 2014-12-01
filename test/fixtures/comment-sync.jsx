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
            <div>
                <div>{ this.props.text }</div>
                <div>{ this.state.foo }</div>
                <a href="/user/someuserid">{this.props.username}</a>
            </div>
        );
    }

});