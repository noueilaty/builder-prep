let gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('styles', function(){
  return gulp
    .src('./sass/**/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./'));
});

gulp.task('sass', function(){
  gulp.watch('./sass/**/*.scss', ['styles']);
});
