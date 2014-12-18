var React = require("react");

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <p><img src={ this.props.src } /></p>
                <p>
                    { this.props.children }
                </p>
            </div>
        );
    }
});
