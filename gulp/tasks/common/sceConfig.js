let gulp = require('gulp'),
	Util = require('../../util.js'),
	Replace = require('gulp-replace'),
	config = require('../../config.js');
let env = process.env.NODE_ENV;

gulp.task('sceConfig', function() {
	return gulp.src([
			config.sce.yamlPath,
			config.sce.confPath + '/**'
		], {
			base: config.sce.path
		}) //backendHost
		.pipe(Replace(/appid: \d+/, 'appid: ' + config.sce[env].appId))
		.pipe(Replace(/server_backend1/g, config.sce[env].proxyTable.backend1))
		.pipe(gulp.dest(config.dest + config.sce.path));
});