/**
 * @jsx React.DOM
 */
var React = require("react");

module.exports = React.createClass({
    render: function() {
        return (
            <html>
                <head>
                    <meta charset="UTF-8">
                    <title>{ this.props.title }</title>
                    <script>
                        var $rootId = "{ this.props.rootId }";
                        var $reqId = "{ this.props.reqId }";
                        var $state = { this.props.state };
                    </script>
                    <script src="/js/app.js"></script>
                </head>
                <body>
                    { this.props.page }
                </body>
            </html>
        );
    }
});