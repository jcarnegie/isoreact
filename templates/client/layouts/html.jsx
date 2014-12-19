/**
 * @jsx React.DOM
 */
var React = require("react");

module.exports = React.createClass({
    render: function() {
        var state = "var $state = " + this.props.state;
        return (
            <html>
                <head>
                    <meta charset="UTF-8" />
                    <title>{ this.props.title }</title>
                    <script dangerouslySetInnerHTML={{ __html: state }} />
                    <script src="/js/app.js"></script>
                </head>
                <body dangerouslySetInnerHTML={{ __html: this.props.body }} />
            </html>
        );
    }
});