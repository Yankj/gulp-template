let gulp = require('gulp'),
	config = require('../../../config/config.js'),
	gulpSass = require('gulp-sass'),
	// postCss = require('gulp-postcss'),
	gulpUncss = require('gulp-uncss'), //删除多余css
	gulpAutoprefixer = require('gulp-autoprefixer'),
	gulpPlumber = require('gulp-plumber'), //错误自启动
	gulpNewer = require('gulp-newer'), //增量更新
	gulpLogger = require('gulp-logger'); //打印增量内容

let errorHandler = require('../../util.js');

gulp.task('sass', function() {
	return gulp.src(config.src + "/static/scss/*.scss")
		.pipe(gulpPlumber(errorHandler))
		.pipe(gulpAutoprefixer())
		.pipe(gulpSass())
		.pipe(gulpUncss({
			html: [config.temp + 'view/**/*.html'],
			ignore: ['.test']
		}))
		.pipe(gulpNewer(config.temp + "/static/css"))
		.pipe(gulpLogger({
			showChange: true
		}))
		.pipe(gulp.dest(config.temp + "/static/css"))
});