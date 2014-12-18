/**
 * @jsx React.DOM
 */
var React      = require("react");

module.exports = React.createClass({

    render: function() {
        var url = "/users/" + this.props.user.id;
        return (
            <div>
                <a href={ url }>
                    { this.props.user.name }
                    <Level1 />
                </a>
            </div>
        );
    }

});
