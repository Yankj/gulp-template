let gulp = require('gulp'),
	config = require('../../../config/config.js'),
	If = require('gulp-if'),
	Replace = require('gulp-replace');

let {
	CDN
} = process.env;
// 加MD5戳
gulp.task('cdnPre', function() { //
	return gulp.src(config.dist + 'sce/app/view/*.html', {
			base: config.dist + 'sce/app'
		})
		.pipe(If(CDN === 'true', Replace(/"[./]*static\//g, '"' + config.cdnPath)))
		.pipe(gulp.dest(config.dist + 'sce/app'))
});