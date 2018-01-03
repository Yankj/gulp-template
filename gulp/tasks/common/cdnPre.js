let gulp = require('gulp'),
	config = require('../../../config/config.js'),
	gulpIf = require('gulp-if'),
	gulpReplace = require('gulp-replace');

let {
	CDN
} = process.env;
// 加MD5戳
gulp.task('cdnPre', function() { //
	return gulp.src(config.dist + 'sce/app/view/*.html', {
			base: config.dist + 'sce/app'
		})
		.pipe(gulpIf(CDN === 'true', gulpReplace(/"[./]*static\//g, '"' + config.cdnPath)))
		.pipe(gulp.dest(config.dist + 'sce/app'))
});