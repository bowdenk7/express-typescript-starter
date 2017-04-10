var gulp = require("gulp");
var gulpTs = require("gulp-typescript");
var tsProject = gulpTs.createProject("tsconfig.json");
var sourcemaps = require('gulp-sourcemaps');

gulp.task("build-ts", function () {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("app"));
});

gulp.task("watch-ts", function() {
    gulp.watch("./src/**/*.ts", ["build-ts"]);
});