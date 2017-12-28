var gulp = require('gulp'),
	config = require('../../../config/config.js'),
	marked = require('gulp-marked');


gulp.task('markdown2html', function() {
	return gulp.src(config.src + 'view/*.md')
		.pipe(marked({
			highlight: function(code) {
				return require('highlight.js').highlightAuto(code).value;
			},
			gfm: true,
			tables: true,
			breaks: false,
			pedantic: true,
			sanitize: false,
			smartLists: true,
			smartypants: false
		}))
		.pipe(gulp.dest(config.src + 'view/'));
});