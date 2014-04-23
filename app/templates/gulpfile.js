'use strict';
var gulp = require('gulp');
var useref = require('gulp-useref');

gulp.task('useref', function() {
    return gulp.src('app/*.html')
        .pipe(useref.assets())
        .pipe(useref.restore())
        .pipe(useref())
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', function() {

    gulp.start('useref');
});
