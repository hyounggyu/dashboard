var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

gulp.task("default", function() {
  return gulp.src("src/*.jsx")
    //.pipe(sourcemaps.init())
    .pipe(babel())
    .on('error', function(err){ console.log(err.message); })
    //.pipe(concat("app.js"))
    //.pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});

gulp.watch('src/*.jsx', ['default']);
