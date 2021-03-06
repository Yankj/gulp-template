const gulp = require('gulp'),
	config = require('../../../config/config.js'),
	gulpEslint = require('gulp-eslint');

gulp.task('eslint', () => {
	// ESLint ignores files with "node_modules" paths. 
	// So, it's best to have gulp ignore the directory as well. 
	// Also, Be sure to return the stream from the task; 
	// Otherwise, the task may end before the stream has finished. 
	return gulp.src([config.src + 'static/es6/*.js', '!node_modules/**'])
		// eslint() attaches the lint output to the "eslint" property 
		// of the file object so it can be used by other modules. 
		.pipe(gulpEslint())
		// eslint.format() outputs the lint results to the console. 
		// Alternatively use eslint.formatEach() (see Docs). 
		.pipe(gulpEslint.format())
		// To have the process exit with an error code (1) on 
		// lint error, return the stream and pipe to failAfterError last. 
		.pipe(gulpEslint.failAfterError());
});