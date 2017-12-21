let gulp = require('gulp'),
	config = require('../../config.js');

gulp.task('copyStatic', function() {
	gulp.src(config.src + 'static/img/*')
		.pipe(gulp.dest(config.dest + 'sce/app/static/img'))
})