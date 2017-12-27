let gulp = require('gulp'),
	config = require('../../../config/config.js'),
	sass = require('gulp-sass'),
	// postCss = require('gulp-postcss'),
	uncss = require('gulp-uncss'), //删除多余css
	autoprefixer = require('gulp-autoprefixer'),
	plumber = require('gulp-plumber'), //错误自启动
	newer = require('gulp-newer'), //增量更新
	logger = require('gulp-logger'); //打印增量内容

let errorHandler = require('../../util.js');

gulp.task('sass', function() {
	return gulp.src(config.src + "/static/scss/*.scss")
		.pipe(plumber(errorHandler))
		.pipe(autoprefixer())
		.pipe(sass())
		.pipe(uncss({
			html: [config.src + 'view/**/*.html']
		}))
		.pipe(newer(config.src + "/static/css"))
		.pipe(logger({
			showChange: true
		}))
		.pipe(gulp.dest(config.temp + "/static/css"))
});