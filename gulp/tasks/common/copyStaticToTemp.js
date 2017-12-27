let gulp = require('gulp'),
	config = require('../../../config/config.js');

gulp.task('copyStaticToTemp', function() {
	return gulp.src([config.src + 'view/**'], {
			base: config.src
		})
		.pipe(gulp.dest(config.temp))
})