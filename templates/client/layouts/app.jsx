/**
 * @jsx React.DOM
 */
var React    = require("react");
var isoreact = require("isoreact");

module.exports = React.createClass({
    mixins: [isoreact.mixin],

    render: function() {
        return (
            <div>
                <header>&#63; App</header>
                { this.props.body() }
                <footer>Copyright (c) &#63; Co.</footer>
            </div>
        );
    }
});