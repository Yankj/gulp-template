let gulp = require('gulp'),
	requireDir = require('require-dir'),
	chalk = require('chalk'),
	runSequence = require('run-sequence');

let {
	NODE_ENV: env,
	CDN: cdn
} = process.env;

// 递归引入gulp/tasks目录下的文件
requireDir('./gulp/tasks', {
	recurse: true
});

gulp.task('build', function(cb) { //默认不放 CDN
	console.log('\n\n/***********************    打包开始，当前环境为：' + chalk.blue.bold(env) + '    ***********************/' + '\n');
	runSequence(['delDest', 'sass', 'eslint', 'ES6'], ['cssSprite'], ['usemin', 'sceConfig', 'copyStatic'], ['revision'], ['cdnPre'], ['zip'], cb);
})

gulp.task('dev', function(cb) {
	runSequence(['sass', 'eslint', 'ES6'], ['cssSprite', 'dev-server'], cb);
});