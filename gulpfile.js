var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var plumber = require('gulp-plumber');
var concat = require("gulp-concat");

gulp.task("default", function() {
  return gulp.src("src/*.jsx")
    .pipe(plumber())
    //.pipe(sourcemaps.init())
    .pipe(babel())
    //.pipe(concat("app.js"))
    //.pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"))
    .on('error', function(err){ console.log(err.message); });
});

gulp.watch('src/*.jsx', ['default']);
