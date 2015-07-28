var gulp = require('gulp');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');

gulp.task('default', function() {
  return gulp.src('src/*.jsx')
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('dist'))
    .on('error', function(err){ console.log(err.message); });
});

gulp.watch('src/*.jsx', ['default']);
