/*
	功能：拷贝文档文件
 */

let gulp = require('gulp'),
    config = require('../../../config.js');

gulp.task('copyDocs', function(cb) {
    return gulp.src(config.src + "docs/**", {
        base: config.src
    })
	.pipe(gulp.dest(config.temp + "/view/"))
});