const gulp = require('gulp'),
	config = require('../../../config/config.js'),
	gulpIf = require('gulp-if'),
	gulpSmushit = require('gulp-smushit');

gulp.task('imgMin', function() {
	return gulp.src(config.src + 'static/img/*.{jpg,png}')
		.pipe(gulpIf(config.isImgOptmize, gulpSmushit({
			verbose: true
		})))
		.pipe(gulp.dest(config.temp + 'static/img'));
});