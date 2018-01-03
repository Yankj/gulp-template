let gulp = require('gulp'),
	config = require('../../../config/config.js');

gulp.task('copyStaticToDist', function() {
	return gulp.src([config.temp + 'static/img/**'], {
			base: config.temp
		})
		.pipe(gulp.dest(config.dist + 'sce/app/'))
})