let gulp = require('gulp'),
	config = require('../../../config/config.js'),
	gulpPx2remPlugin = require('gulp-px2rem-plugin');

gulp.task('px2rem', function() {
	return gulp.src(config.temp + 'static/css/main.css')
		// .pipe(px2rem())
		.pipe(gulpPx2remPlugin({
			'width_design': 750,
			'valid_num': 2,
			'pieces': 10,
			'ignore_px': [1, 2],
			// 'ignore_selector': ['.class1']
		})).pipe(gulp.dest(config.temp + 'static/css'));
});