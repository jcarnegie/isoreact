/**
 * @jsx React.DOM
 */
var React = require("react");

module.exports = React.createClass({
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