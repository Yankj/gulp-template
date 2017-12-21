let gulp = require('gulp'),
	config = require('../../config.js'),
	If = require('gulp-if'),
	Replace = require('gulp-replace');

let {
	CDN
} = process.env;
// 加MD5戳
gulp.task('cdnPre', function() { //
	return gulp.src([config.dest + 'sce/app/view/*.html'])
		.pipe(If(CDN === 'true', Replace(/"[./]*static\//g, '"' + config.cdnPath)))
		.pipe(gulp.dest(config.dest + 'sce/app'))
});