let gulp = require('gulp'),
	config = require('../../config.js'),
	babel = require('gulp-babel');

gulp.task('ES6', function() {
	return gulp.src([config.src + 'static/es6/**/*', '!' + config.src + 'static/es6/**/*.min.js'])
		.pipe(babel({
			presets: [
				['env', {
					"targets": {
						"safari": 10
					},
					"modules": false,
					"useBuiltIns": true,
					"debug": true
				}]
			]
			// plugins: ['transform-runtime']
		}))
		.pipe(gulp.dest(config.src + 'static/js'))
});