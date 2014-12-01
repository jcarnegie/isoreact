var should       = require("chai").should();
var react        = require("react");
var isoreact     = require("../lib/isoreact");
var CommentSync  = require("./fixtures/comment-sync");
var CommentAsync = require("./fixtures/comment-async");
var PageAsync    = require("./fixtures/page-async");

describe("isoreact", function() {
    it("should render synchronous components", function(done) {
        var comment = react.createFactory(CommentSync);
        isoreact.renderToString(comment, function(markup) {
            markup.should.match(/bar/);
            markup.should.match(/\/user\/someuserid/);
            done();
        });
    });

    it("should render asynchronous component", function(done) {
       var comment = react.createFactory(CommentAsync);
        isoreact.renderToString(comment, function(markup) {
            markup.should.match(/bar/);
            markup.should.match(/\/user\/someuserid/);
            done();
        }); 
    });

    it("should render nested asynchronous components", function(done) {
        var page = react.createFactory(PageAsync);
        isoreact.renderToString(page, function(markup) {
            markup.should.match(/h1.*>B<\/h1>/);
            markup.should.match(/bar/);
            markup.should.match(/\/user\/someuserid/);
            done();
        }); 
    });
});