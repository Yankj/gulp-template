# gulp-template-fe
> 基于gulp的自动化构建项目模板

## 功能
+ SASS编译，错误自重启，移除冗余CSS，增量更新
+ Babel编译，ES6支持
+ eslint检查
+ CSS雪碧图
+ 图片压缩
+ 文件组合(file-include)
+ 统一 npm scripts 脚本命令
+ HTML、JS、CSS合并压缩，JS自动defer
+ 静态资源(JS,CSS,Image)加MD5戳防缓存
+ Zip支持
+ 本地开发，实时刷新
+ 更多...(提取关键CSS，CSS异步加载等)

## 注意点
+ uncss无法监听到js文件中动态添加的类名，所以当js文件操作了类名A，同时不希望uncss删掉A，需要在uncss中配置ignore选项，如：

```javascript
gulp.task('default', function () {
    return gulp.src('styles/**/*.scss')
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(uncss({
            html: ['index.html', 'posts/**/*.html', 'http://example.com'],
            ignore:['.A']
        }))
        .pipe(nano())
        .pipe(gulp.dest('./out'));
});
```
+ 本模板默认只有js、css、img三种静态资源，如需添加新资源，如font等，请修改copyStaticToTemp和copyStaticToDist任务

## 使用方式：
```javascript
//0、安装依赖
npm install
//1、本地开发
npm run dev
//2、打测试环境包
npm run build-test                         //静态资源不放CDN
//3、打生产环境包
npm run build-product               //静态资源不放CDN
npm run build-product-cdn         //静态资源放CDN
```

## 维护须知
+ 新增gulp任务时，引入的插件名请遵循驼峰式结构，且使用gulp插件的全称形式，如gulp-rev-all，应该取名

```javascript
let gulpRevAll=require('gulp-rev-all');// 不要这样 revAll=require('gulp-rev-all');
```

## Else
- sns分支在@冯银超同学的基础上做了些改动以适应sns业务
 
## Help
@冯银超(yinchaofeng@sohu-inc.com)
@严焜杰(kunjieyan@sohu-inc.com)
