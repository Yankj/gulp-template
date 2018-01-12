/*
	功能：js压缩
 */

let gulp = require('gulp'),
	config = require('../../../config.js'),
	gulpUglify = require('gulp-uglify');

gulp.task('jsmin', function() {
	return gulp.src([
			config.dist + 'sce/app/static/js/*.js',
			'!' + config.dist + 'sce/app/static/js/lib/*.js'
		], {
			base: config.dist + 'sce/app/'
		})
		.pipe(gulpUglify({
			compress: {
				drop_console: true
			}

		}))
		.pipe(gulp.dest(config.dist + 'sce/app'));
});