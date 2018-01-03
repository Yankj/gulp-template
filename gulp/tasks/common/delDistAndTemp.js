let gulp = require('gulp'),
	config = require('../../../config/config.js'),
	del = require('del');

gulp.task('delDist', function(cb) {
	del(config.dist);
	cb();
});