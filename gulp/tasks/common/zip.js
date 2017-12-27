let gulp = require('gulp'),
	config = require('../../../config/config.js'),
	runSequence = require('run-sequence'),
	zip = require('gulp-zip');

let {
	CDN: cdn,
	NODE_ENV: env
} = process.env;

gulp.task('zip', function(cb) {
	if (cdn === 'false') {
		runSequence('zip-all', cb);
	} else {
		runSequence('zip-sce', 'zip-static', cb);
	}
});

gulp.task('zip-all', function() {
	let zip_name = 'sce_' + config.sce[env].appId + '.zip';
	return gulp.src([config.dist + 'sce/**/*'])
		.pipe(zip(zip_name))
		.pipe(gulp.dest(config.dist));
});

gulp.task('zip-static', function() {
	let cdn_project_name = 'toCDN_' + config.cdnPath.replace(/.+\.com\//, "").replace(/\//g, "") + ".zip";
	return gulp.src(config.dist + 'sce/app/static/**')
		.pipe(zip(cdn_project_name))
		.pipe(gulp.dest(config.dist));
});

gulp.task('zip-sce', function() {
	let zip_name = 'sce_' + config.sce[env].appId + '.zip';
	return gulp.src([config.dist + 'sce/**', '!' + config.dist + 'sce/app/static/**'])
		.pipe(zip(zip_name))
		.pipe(gulp.dest(config.dist));
});