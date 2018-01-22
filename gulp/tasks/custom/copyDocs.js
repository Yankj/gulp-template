/*
	功能：拷贝文档文件
 */

let gulp = require('gulp'),
    runSequence = require('run-sequence'),
    config = require('../../../config.js');

let NODE_ENV = process.env.NODE_ENV;

gulp.task('copyDocs2temp', function(cb) {
    return gulp.src(config.src + "docs/**", {
        base: config.src
    })
        .pipe(gulp.dest(config.temp + "/view/"))
});

gulp.task('copyDocs2dist', function(cb) {
    return gulp.src(config.temp + "/view/docs/**", {
        base: config.temp
    })
        .pipe(gulp.dest(config.dist + "sce/app/"))
});

gulp.task('copyDocs', function(cb) {
    if(NODE_ENV !== "dev"){
        runSequence(['copyDocs2temp'],['copyDocs2dist'],cb);
    }else{
        runSequence(['copyDocs2temp'],cb);
    }
});