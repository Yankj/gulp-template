let gulp = require('gulp'),
	config = require('../../../config/config.js'),
	gulpRevAll = require('gulp-rev-all');

let {
	CDN
} = process.env;
// 加MD5戳
gulp.task('revision', function() { //
	return gulp.src([config.dist + 'sce/app/static/img/**', config.dist + 'sce/app/view/*.html'], {
			base: config.dist + 'sce/app'
		})
		.pipe(gulpRevAll.revision({
			dontRenameFile: [/.*\.html/],
			hashLength: 4
		}))
		// .pipe(If(CDN === 'true', Replace(/"[./]*static\//g, '"' + config.cdnPath)))
		.pipe(gulp.dest(config.dist + 'sce/app'))
});