/*
 * @jsx React.DOM
 */
var React = require("react");
var isoreact = require("../../lib/isoreact");

module.exports = React.createClass({

    displayName: "comment",

    mixins: [isoreact.mixin],

    getInitialState: isoreact.async(function(done) {
        setTimeout(function() {
            done({ foo: "bar" });
        });

        return {};
    }),

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