let gulp = require('gulp'),
	config = require('../../../config.js'),
	gulpPx2remPlugin = require('gulp-px2rem-plugin');

gulp.task('px2rem', function() {
	console.log('px2rem')
	return gulp.src(config.temp + 'static/css/**/*.css')
		// .pipe(px2rem())
		.pipe(gulpPx2remPlugin({
			'width_design': 750,//设计稿宽度。默认值640
			'valid_num': 2,//生成rem后的小数位数。默认值4
			'pieces': 7.5,//将整屏切份。默认为10，相当于10rem = width_design(设计稿宽度)
			'ignore_px': [1, 2],//让部分px不在转换成rem。默认为空数组
			// 'ignore_selector': ['.class1'] //让部分选择器不在转换为rem。默认为空数组
		})).pipe(gulp.dest(config.temp + 'static/css'));
});