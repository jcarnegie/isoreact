/**
 * @jsx React.DOM
 */
var r          = require("ramda");
var React      = require("react");
var api        = require("../lib/apiclient");
var isoreact   = require("isoreact");
var Comment    = require("../components/comment.jsx");

module.exports = React.createClass({
    mixins: [isoreact.mixin],

    getInitialState: function() {
        return {
            posts: this.props.$state.posts || [],
        };
    },

    loaderMarkup: function() {
        return ( <div className="loader" /> );
    },

    needsState: function() {
        return this.state.posts.length === 0;
    },

    loadAsync: function() {
        var p = api.getPosts(this.context);
        this.setStateAsync("posts", p);
    },

    render: function() {
        var posts = r.map(function(post) {
            var id = r.get("id", post);
            var title = r.get("title", post);

            return (
                <li key={ id }>
                    <p><a href={ "/post/" + id }>{ title }</a></p>
                </li>
            );
        }, this.state.posts);

        var contents = null;

        return this.withLoader(function() {
            return (
                <div>
                    <h1>Posts</h1>
                    <hr />
                    <ul>{ posts }</ul>
                </div>
            );
        });
    }
});