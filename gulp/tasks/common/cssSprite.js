/*
	要使用该功能，请这样做：
	1、图片必须使用background的方式，不能写在html的img中
	2、确保加上background-size:cover;
	3、注意修改入口文件名，这里以 main.css为入口
	缺点：高清图
 */

let gulp = require('gulp'),
	config = require('../../config.js'),
	spriter = require('gulp-css-spriter');

gulp.task('cssSprite', function() {
	return gulp.src(config.src + 'static/css/main.css')
		.pipe(spriter({
			// The path and file name of where we will save the sprite sheet 
			'spriteSheet': config.src + 'static/img/spritesheet.png',
			// Because we don't know where you will end up saving the CSS file at this point in the pipe, 
			// we need a litle help identifying where it will be. 
			'pathToSpriteSheetFromCSS': '../img/spritesheet.png'
		}))
		.pipe(gulp.dest(config.src + 'static/css'));
});