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
            <div>
                <div>{ this.props.text }</div>
                <div>{ this.state.foo }</div>
                <a href="/user/someuserid">{this.props.username}</a>
            </div>
        );
    }

});