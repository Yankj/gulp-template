/*
	功能：本地开发服务器(自动刷新)
 */
let gulp = require('gulp'),
	config = require('../../../config.js'),
	runSequence = require('run-sequence'),
	browserSync = require('browser-sync').create(),
	httpProxyMiddleware = require('http-proxy-middleware');

let env = process.env.NODE_ENV,
	serverPath = env == 'product' ? config.dist : config.temp;

gulp.task('dev-server', function(cb) {
	// 1、后端服务代理
	let proxyArray = getProxyArray();
	// 2、启用 browserSync 服务
	browserSync.init({
		server: {
			baseDir: serverPath
		},
		host: config.devHost, //hosts文件设置代理到开发机IP server种cookie用
		open: "external", //
		startPath: config.startPath,
		// port: 80,
		middleware: proxyArray
	});
	// 3、监听src源文件变动，执行对应 task
	gulp.watch(config.src + "static/es6/**/*.js", ['ES6']);
	gulp.watch(config.src + "static/img/**", ['imgMin']);
	gulp.watch(config.src + "static/scss/**").on('change', function() {
		// runSequence(['sass'], ['uncss'], ['cssSprite'],['copyCss2Docs'], ['px2rem'], browserSync.reload);
		runSequence(['sass'], ['cssSprite'],['copyCss2Docs'], ['px2rem'], browserSync.reload);
	});
	gulp.watch(config.src + "**/*.html").on('change', function() {
		runSequence(['fileInclude'], browserSync.reload);
	});
	// 4、监听temp文件变动，实时刷新浏览器
	gulp.watch([config.temp + "static/js/**",
		config.temp + "static/img/**"
	]).on('change', browserSync.reload);
	//监听文档变动
    gulp.watch(config.src + "docs/**").on('change', function() {
        runSequence(['copyDocs'], browserSync.reload);
    });
});

let getProxyArray = function() {
	// 1、获取config.js中后端服务配置项
	let configObj = config.sce[env].proxyTable,
		array = [],
		proxy = null;
	for (var key in configObj) {
		var reg = new RegExp(key + '');
		proxy = httpProxyMiddleware('/' + key, {
			target: 'http://' + configObj[key],
			pathRewrite: function(reg) { //这里要用闭包，否则多个服务无法代理
				return function(path, req) {
					return path.replace(reg, '');
				}
			}(reg),
			changeOrigin: true,
			headers: {
				host: configObj[key],
				origin: 'http://' + configObj[key]
			}
		});
		array.push(proxy);
	}
	// 2、禁止开发server的缓存
	let proxyNoCache = function(req, res, next) {
		res.setHeader('CacheControl', 'no-cache');
		res.setHeader('Pragma', 'no-cache');
		res.setHeader('Expires', '-1');
		res.setHeader('ETag', Date.now()); //禁止304
		next();
	}
	array.push(proxyNoCache);
	return array;
}