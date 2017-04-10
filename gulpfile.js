var gulp = require("gulp");
var sourcemaps = require('gulp-sourcemaps');
var gulpTs = require("gulp-typescript");
var tslint = require("gulp-tslint");


var tsProject = gulpTs.createProject("tsconfig.json");

gulp.task("build-ts", function () {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("app"));
});

gulp.task("watch-ts", () => {
    gulp.watch("./src/**/*.ts", ["build-ts"]);
});

gulp.task("tslint", () => {
    gulp.src("./src/**/*.ts")
        .pipe(tslint({
            formatter: "verbose",
            configuration: "tslint.json"
        }))
        .pipe(tslint.report())
});