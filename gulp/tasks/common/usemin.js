let gulp = require('gulp'),
	config = require('../../config.js'),
	cleanCSS = require('gulp-clean-css'),
	htmlmin = require('gulp-htmlmin'),
	uglify = require('gulp-uglify'),
	revAll = require('gulp-rev-all'),
	usemin = require('gulp-usemin'),
	plumber = require('gulp-plumber'), //错误自启动
	newer = require('gulp-newer'), //增量更新
	logger = require('gulp-logger'); //打印增量内容

let errorHandler = require('../../util.js');
gulp.task('usemin', function() { //
	return gulp.src([
			config.src + 'view/ink-share.html'
		], {
			base: config.src
		})
		.pipe(usemin({
			css: [
				cleanCSS(),
				revAll.revision({
					hashLength: 4
				})
			],
			js: [
				plumber(errorHandler),
				uglify({
					compress: {
						drop_console: true
					}
				}),
				revAll.revision({
					hashLength: 4
				})
			],
			html: [
				plumber(errorHandler),
				htmlmin({
					collapseWhitespace: true,
					removeComments: true
				})
			]
		}))
		.pipe(gulp.dest(config.dest + 'sce/app'));
});