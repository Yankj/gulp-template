let gulp = require('gulp'),
	config = require('../../../config/config.js'),
	gulpSass = require('gulp-sass'),
	// postCss = require('gulp-postcss'),
    gulpReplace = require('gulp-replace'),
	gulpUncss = require('gulp-uncss'), //删除多余css
	gulpAutoprefixer = require('gulp-autoprefixer'),
	gulpPlumber = require('gulp-plumber'), //错误自启动
	gulpNewer = require('gulp-newer'), //增量更新
	gulpLogger = require('gulp-logger'); //打印增量内容

let errorHandler = require('../../util.js');

gulp.task('sass', function() {
	return gulp.src(config.src + "/static/scss/**/*.scss")
        // .pipe(gulpReplace(/(\@include\s+[\w-]+(\(\$[\w-]+\)\+,*)+)/g,(s,m1) => {
        //
        // }))
        .pipe(gulpReplace(/([\w-]+?\s*?\:.*\$c-.+?;)/g,function (s,m1) {
            let m1_night = m1.replace(/\$c-/g,'$c-night-');
            return m1 + '\n @at-root .night &{' + m1_night + '}\n';
			/*
			 ** 需要说明一点，例如一下情况时：
			 * 如果index.scss中引用了sns3.0，sns3.0中有颜色变量$c-black1,
			 * 上面的replace会达到sns3.0.css中有.night的效果，但index.css中无.night相关内容
			 * 故：建议sns.css直接在页面中引用
			 **/
        }))
		.pipe(gulpPlumber(errorHandler))
		.pipe(gulpSass())
        .pipe(gulpAutoprefixer())
        // .pipe(gulpUncss({
		// 	html: [config.temp + 'view/**/*.html'],
		// 	ignore: ['.test']
		// }))
		// .pipe(gulpNewer(config.temp + "/static/css"))
		.pipe(gulpLogger({
			showChange: true
		}))
		.pipe(gulp.dest(config.temp + "/static/css"))
});