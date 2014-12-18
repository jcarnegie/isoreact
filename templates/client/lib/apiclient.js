var r       = require("ramda");
var config  = require("../../lib/config");
var request = require("superagent");
var Promise = require("es6-promise").Promise;

var apiUrl = function(path) {
    return env.config().api.base + path;
};

var get = function(path, prop) {
    return new Promise(function(resolve, reject) {
        request.get(apiUrl(path), function(err, res) {
            if (err) return reject(err);
            resolve(res.body);
        });
    });
};

var getPosts = function(context) {
    offset = context.query.offset || 0;
    count  = context.query.count || 10;
    var path = "/api/posts?offset=" + offset + "&count=" + count;
    return get(path);
};

var getPost = function(context) {
    var id = context.params.id;
    return get("/api/post/" + id);
};

module.exports = {
    getPosts: getPosts,
    getPost: getPost
};