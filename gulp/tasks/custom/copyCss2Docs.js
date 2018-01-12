/*
	功能：拷贝未转rem的css到文档，做demo用
 */

let gulp = require('gulp'),
    config = require('../../../config.js');

gulp.task('copyCss2Docs', function(cb) {
    console.log('正在copyCss2Docs')
    return gulp.src(config.temp + "static/css/sns3.0/sns3.0.css", {
        base: config.temp + "static/css/sns3.0/"
    })
	.pipe(gulp.dest(config.temp + "/view/docs/"))
});