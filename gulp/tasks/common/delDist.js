let gulp = require('gulp'),
	config = require('../../../config/config.js'),
	del = require('del');

gulp.task('delDist', function() {
	return del(config.dist);
});