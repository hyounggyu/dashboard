'use strict'

var gulp = require('gulp');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');

var path = {
  APP: ['src/index.html', 'src/main.js', 'src/app.css'],
  JSX: 'src/*.jsx'
};

gulp.task('build_jsx', function() {
  return gulp.src(path.JSX)
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', function() {
  return gulp.src(path.APP)
    .pipe(gulp.dest('dist'));
})

gulp.task('watch', ['build_jsx', 'copy'], function() {
  gulp.watch(path.JSX, ['build_jsx']);
  gulp.watch(path.APP, ['copy']);
});

gulp.task('default', ['watch']);
