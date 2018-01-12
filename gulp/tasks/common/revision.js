/*
	功能：静态资源加md5戳
 */

let gulp = require('gulp'),
	config = require('../../../config.js'),
	gulpRevAll = require('gulp-rev-all');

// 加MD5戳
gulp.task('revision', function() { //
	return gulp.src(config.dist + 'sce/app/**/*', {
			base: config.dist + 'sce/app'
		})
		.pipe(gulpRevAll.revision({
			dontRenameFile: [/.*\.html/],
			hashLength: 4
		}))
		.pipe(gulp.dest(config.dist + 'sce/app'));
});