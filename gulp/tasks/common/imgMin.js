const gulp = require('gulp'),
	config = require('../../../config/config.js'),
	gulpSmushit = require('gulp-smushit');

gulp.task('imgMin', function() {
	return gulp.src(config.src + 'static/img/*.{jpg,png}')
		.pipe(gulpSmushit({
			verbose: true
		}))
		.pipe(gulp.dest(config.temp + 'static/img'));
});