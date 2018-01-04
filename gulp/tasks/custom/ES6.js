let gulp = require('gulp'),
	config = require('../../../config/config.js'),
	gulpBabel = require('gulp-babel');

let {
	NODE_ENV
} = process.env;

gulp.task('ES6', function() {
	return gulp.src([config.src + 'static/es6/**/*'])
		.pipe(gulpBabel({
			presets: [
				['env', {
					"targets": {
						browsers: ["safari>=9", "android>=6", "ios>=9"] //可取值：chrome, opera, edge, firefox, safari, ie, ios, android, node, electron.
					},
					"modules": false, //可取值"amd" | "umd" | "systemjs" | "commonjs" | false, defaults to "commonjs".
					"useBuiltIns": true, //使用'babel-polyfill'
					"debug": NODE_ENV === 'product' ? false : true
				}]
			]
			// plugins: ['transform-runtime']
		}))
		.pipe(gulp.dest(config.temp + 'static/js'))
});