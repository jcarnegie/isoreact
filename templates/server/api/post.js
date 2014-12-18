var r = require("ramda");

var posts = [
    { id: 0, title: "post 0", body: "this is a post about a woman walking down the street..."},
    { id: 1, title: "post 1", body: "this is a post about a man walking down the street..."},
    { id: 2, title: "post 2", body: "this is a post about a girl walking down the street..."},
    { id: 3, title: "post 3", body: "this is a post about a boy walking down the street..."},
    { id: 4, title: "post 4", body: "this is a post about a baby strolling down the street..."},
    { id: 5, title: "post 5", body: "this is a post about a skateboarder surfing down the street..."},
    { id: 6, title: "post 6", body: "this is a post about a grandpa slowly strutting down the street..."},
    { id: 7, title: "post 7", body: "this is a post about a grandma wheeling down the street..."},
    { id: 8, title: "post 8", body: "this is a post about a test of your will..."},
    { id: 9, title: "post 9", body: "this is a post about a tragedy..."},
    { id: 10, title: "post 10", body: "this is a post about a triumph..."},
    { id: 11, title: "post 11", body: "this is a post about a school on the hill..."},
    { id: 12, title: "post 12", body: "this is a post about people on the train..."},
    { id: 13, title: "post 13", body: "this is a post about a girl looking at her phone..."},
    { id: 14, title: "post 14", body: "this is a post about a family dynasty..."},
    { id: 15, title: "post 15", body: "this is a post about a community's outrage..."},
    { id: 16, title: "post 16", body: "this is a post about a cat with two legs..."},
    { id: 17, title: "post 17", body: "this is a post about a dog that forgot how to bark..."},
    { id: 18, title: "post 18", body: "this is a post about a nose that couldn't smell..."},
    { id: 19, title: "post 19", body: "this is a post about a deer in the headlights..."}
];


module.exports = {
    list: function(req, res) {
        var offset = req.query.offset || 0;
        var count  = Math.min(req.query.count || 10, 10);
        setTimeout(function() {
            res.send(posts.slice(offset, offset + count));
        }, 1000);
    },

    get: function(req, res) {
        var id   = parseInt(req.params.id);
        var post = r.find(r.propEq("id", id), posts);
        setTimeout(function() {
            res.send(post);
        }, 1000);
    },

    create: function(req, res) {
        res.send("created...!");
    },

    update: function(req, res) {
        res.send("updated...!");
    }
};