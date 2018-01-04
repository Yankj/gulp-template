let gulp = require('gulp'),
	Util = require('../../util.js'),
	config = require('../../../config/config.js'),
	browserSync = require('browser-sync').create(),
	httpProxyMiddleware = require('http-proxy-middleware');

let env = process.env.NODE_ENV,
	serverPath = env == 'product' ? config.dist : config.temp;

gulp.task('dev-server', function(cb) {
	let need_proxy_url = ['/ink_club'];
	let proxy1 = httpProxyMiddleware(need_proxy_url, {
		target: 'http://' + config.sce[env].proxyTable.backend1, //注意http(https)
		changeOrigin: true,
		headers: {
			host: config.sce[env].proxyTable.backend1,
			origin: 'http://' + config.sce[env].proxyTable.backend1
		}
	});
	//禁止开发server的缓存
	let proxyNoCache = function(req, res, next) {
		res.setHeader('CacheControl', 'no-cache');
		res.setHeader('Pragma', 'no-cache');
		res.setHeader('Expires', '-1');
		res.setHeader('ETag', Date.now()); //禁止304
		next();
	}
	browserSync.init({
		server: {
			baseDir: serverPath
		},
		host: config.devHost, //hosts文件设置代理到开发机IP server种cookie用
		open: "external", //
		startPath: config.startPath,
		// port: 80,
		middleware: [proxy1, proxyNoCache]
	});
	gulp.watch(config.src + "/static/scss/*.scss", ['sass'], ['px2rem']);
	gulp.watch(config.src + "/static/es6/**/*.js", ['ES6']);
	gulp.watch(config.src + "/static/img/**", ['imgMin']);
	gulp.watch([config.src + "/static/js/**",
		config.temp + "/static/css/**",
		config.temp + "/static/img/**",
		config.temp + "/**/*.html"
	]).on('change', browserSync.reload);
})