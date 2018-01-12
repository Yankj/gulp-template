/*
	功能：css雪碧图
	要使用该功能，请这样做：
	1、图片必须使用background-image语法，不能写在html的img中，也不能用background语法
	2、高清图的配置可参见 https://www.npmjs.com/package/gulp-sprite-generator
 */

let gulp = require('gulp'),
    config = require('../../../config.js');

gulp.task('copyDocs', function(cb) {
    return gulp.src(config.src + "docs/**", {
        base: config.src
    })
	.pipe(gulp.dest(config.temp + "/view/"))
});