let gulp = require('gulp'),
	config = require('./config/config.js'),
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

if (env !== 'dev') {
	console.log('\n\n/***********************    打包开始，当前环境为：' + chalk.blue.bold(env) + '    ***********************/' + '\n');
}
gulp.task('build', function(cb) { //默认不放 CDN
	runSequence(['delDist', 'eslint', 'ES6', 'imgMin', 'fileInclude'], ['sass'], ['cssSprite'], ['px2rem'], ['usemin', 'sceConfig', 'copyStaticToDist'], ['revision'], ['cdnPre'], ['delRedundant'], ['zip'], function() {

		console.log('● 前端项目已发布到' + config.dist);
		if (cdn === 'true') console.log('○ 静态资源zip请上传至：' + config.cdnPath);
		console.log('○ sce zip请上传至：' + config.sce.manageUrl + config.sce[env].appId);
		console.log('● sce前端服务host：' + config.sce[env].sceHost);
		console.log('\n\n/***********************    打包结束，当前环境为：' + chalk.blue.bold(env) + '    ***********************/' + '\n');
	});
})

gulp.task('dev', function(cb) {
	runSequence(['delDist','fileInclude', 'eslint', 'ES6', 'imgMin'], ['sass'], ['cssSprite'], ['px2rem'], ['dev-server'], cb);
});