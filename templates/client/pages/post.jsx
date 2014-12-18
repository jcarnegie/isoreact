/**
 * @jsx React.DOM
 */
var r          = require("ramda");
var api        = require("../lib/apiclient");
var React      = require("react");
var isoreact   = require("isoreact");

module.exports = React.createClass({

    mixins: [isoreact.mixin],

    getInitialState: function() {
        return { post: this.props.$state.post };
    },

    loaderMarkup: function() {
        return ( <div className="loader" /> );
    },

    needsState: function() {
        return !this.state.post;
    },

    loadAsync: function () {
        var p  = api.getPost(this.context);
        this.setStateAsync("post", p).catch(function(err) {
            // do some error handling
        });
    },

    render: function() {
        return this.withLoader(function() {
            return (
                <div>
                    <a href="/">&lt;&lt; All Posts</a>
                    <div>
                        <h1>{ this.state.post.title }</h1>
                        <p>{ this.state.post.body }</p>
                    </div>
                </div>
            );
        });
    }
});