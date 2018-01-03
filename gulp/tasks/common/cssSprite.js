/*
	要使用该功能，请这样做：
	1、图片必须使用background-image语法，不能写在html的img中
	2、注意修改入口文件名，这里以 main.css为入口
	3、高清图的配置可参见 https://www.npmjs.com/package/gulp-sprite-generator
 */

let gulp = require('gulp'),
	config = require('../../../config/config.js'),
	gulpSpriteGenerator = require('gulp-sprite-generator');

gulp.task('cssSprite', function() {
	var spriteOutput;

	spriteOutput = gulp.src(config.temp + 'static/css/index.css')
		.pipe(gulpSpriteGenerator({
			baseUrl: '../img',
			spriteSheetPath: '../img',
			spriteSheetName: "sprite.png",
			algorithm: 'left-right' // 竖条图 top-down  长条图 left-right 正方形图 binary-tree
		}))

	spriteOutput.css.pipe(gulp.dest(config.temp + 'static/css'));
	return spriteOutput.img.pipe(gulp.dest(config.temp + 'static/img'));
});