var gulp = require('gulp');
var deploy = require('gulp-gh-pages')
var tasklisting = require('gulp-task-listing');

gulp.task('deploy', function() {
  return gulp.src("./public/**/*")
    .pipe(deploy())
});

gulp.task('help', tasklisting);
gulp.task('default', ['help']);
