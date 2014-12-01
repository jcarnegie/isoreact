var gulp  = require("gulp");
var ext   = require("gulp-ext-replace");
var react = require("gulp-react");
var mocha = require("gulp-mocha");

gulp.task("test:build", function() {
    return gulp.src("test/**/*.jsx")
        .pipe(react())
        .pipe(ext(".js"))
        .pipe(gulp.dest("test"));
});

gulp.task("test", ["test:build"], function() {
    return gulp.src("test/isoreact.test.js").pipe(mocha());
});