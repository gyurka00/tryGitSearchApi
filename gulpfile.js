'use strict';

var batch = require('gulp-batch');
var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

gulp.task('watch', function () {

  console.log('I am watching you');

  watch('./public/style/scss/**/*.scss', batch(function (events, done) {
    gulp.start('sass', done);
  }));
});

gulp.task('sass', function () {
  return gulp.src('./public/style/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/style/'));
});
