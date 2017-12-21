let gulp = require('gulp'),
	config = require('../../config.js'),
	Replace = require('gulp-replace'),
	If = require('gulp-if'),
	gulpRevAll = require('gulp-rev-all');

let {
	CDN
} = process.env;
// 加MD5戳
gulp.task('revision', function() { //
	return gulp.src([config.dest + 'sce/app/static/img/**', config.dest + 'sce/app/view/*.html'])
		.pipe(gulpRevAll.revision({
			dontRenameFile: [/.*\.html/],
			hashLength: 4
		}))
		// .pipe(If(CDN === 'true', Replace(/"[./]*static\//g, '"' + config.cdnPath)))
		.pipe(gulp.dest(config.dest + 'sce/app'))
});