var gulp = require("gulp");
var gulpTs = require("gulp-typescript");
var tsProject = gulpTs.createProject("tsconfig.json");

gulp.task("build-ts", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("app"));
});

gulp.task("watch-ts", function() {
    gulp.watch("./src/**/*.ts", ["build-ts"]);
});