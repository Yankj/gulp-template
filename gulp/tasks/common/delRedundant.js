let gulp = require('gulp'),
	config = require('../../../config/config.js'),
	del = require('del');

gulp.task('delRedundant', function() {
	return del([config.dist + 'sce/app/static/img/*.{png,jpg}', '!' + config.dist + 'sce/app/static/img/*.*.{png,jpg}']);
});