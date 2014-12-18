/**
 * @jsx React.DOM
 */
var React = require("react");

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <h1><a href="/">Home</a></h1>
                <form onSubmit={ this.onSubmit }>
                    <h1>Sign Up</h1>
                    <div>
                        <label>Name</label>
                        <input type="name" placeholder="name" />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" placeholder="Email" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" placeholder="Password" />
                    </div>
                </form>
            </div>
        );
    },

    onSubmit: function() {
        console.log("submitted!!!");
        return false;
    }
});