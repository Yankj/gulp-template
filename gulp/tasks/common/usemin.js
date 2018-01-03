let gulp = require('gulp'),
	config = require('../../../config/config.js'),
	gulpCleanCSS = require('gulp-clean-css'),
	gulphHtmlmin = require('gulp-htmlmin'),
	gulpUglify = require('gulp-uglify'),
	gulpRevAll = require('gulp-rev-all'),
	gulpUsemin = require('gulp-usemin'),
	gulpPlumber = require('gulp-plumber'); //错误自启动

let errorHandler = require('../../util.js');
gulp.task('usemin', function() { //
	return gulp.src(config.temp + 'view/index.html', {
			base: config.temp
		})
		.pipe(gulpUsemin({
			css: [
				gulpCleanCSS(),
				gulpRevAll.revision({
					hashLength: 4
				})
			],
			js: [
				gulpPlumber(errorHandler),
				gulpUglify({
					compress: {
						drop_console: true
					},
					jsAttributes: {
						defer: true
					}
				}),
				gulpRevAll.revision({
					hashLength: 4
				})
			],
			html: [
				gulpPlumber(errorHandler),
				gulphHtmlmin({
					collapseWhitespace: true,
					removeComments: true,
					minifyJS: true,
					minifyCSS: true
				})
			]
		}))
		.pipe(gulp.dest(config.dist + 'sce/app'));
});