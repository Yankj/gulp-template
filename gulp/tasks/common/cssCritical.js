let gulp = require('gulp'),
	config = require('../../../config/config.js'),
	critical = require('critical');

gulp.task('critical', function(cb) {
	critical.generate({
		inline: true,
		base: config.dist + 'sce/app/view/',
		src: 'index.html',
		dest: config.dist + 'sce/app/view/',
		minify: true
	}, cb);
});