let gulp = require('gulp'),
	Util = require('../../util.js'),
	gulpReplace = require('gulp-replace'),
	config = require('../../../config/config.js');
let env = process.env.NODE_ENV;

gulp.task('sceConfig', function() {
	return gulp.src([
			config.sce.yamlPath,
			config.sce.confPath + '/**'
		], {
			base: config.sce.path
		}) //backendHost
		.pipe(gulpReplace(/appid: \d+/, 'appid: ' + config.sce[env].appId))
		.pipe(gulpReplace(/server_backend1/g, config.sce[env].proxyTable.backend1))
		.pipe(gulp.dest(config.dist + 'sce/'));
});