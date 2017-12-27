const gulp = require('gulp'),
	config = require('../../../config/config.js'),
	smushit = require('gulp-smushit');

gulp.task('imgMin', function() {
	return gulp.src(config.src + 'static/img/*.{jpg,png}')
		.pipe(smushit({
			verbose: true
		}))
		.pipe(gulp.dest(config.temp + 'static/img'));
});