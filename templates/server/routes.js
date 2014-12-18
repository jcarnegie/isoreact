
var user = require("./api/user");
var post = require("./api/post");

module.exports = [
    ["post", "/api/user", user.create],
    ["put", "/api/user/:id", user.update],
    ["get", "/api/posts", post.list],
    ["get", "/api/post/:id", post.get]
];
