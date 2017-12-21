let gulp = require('gulp'),
	config = require('../../config.js'),
	del = require('del');

gulp.task('delDest', function() {
	return del(config.dest);
});