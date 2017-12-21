let gulp = require('gulp'),
	requireDir = require('require-dir'),
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
	runSequence(['delDest', 'sass'], ['usemin', 'sceConfig', 'copyStatic', 'copyStationery'], ['revision'], ['cdnPre'], ['zip'], cb);
})

gulp.task('dev', function(cb) {
	runSequence(['sass', 'ES6'], 'dev-server', cb);
});