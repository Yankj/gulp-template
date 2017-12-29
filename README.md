# gulp-template-fe
> 基于gulp的自动化构建项目模板

## 功能
+ SASS编译，错误自重启，移除冗余CSS，增量更新
+ Babel编译，ES6支持
+ eslint检查
+ CSS雪碧图
+ 统一 npm scripts 脚本命令
+ HTML、JS、CSS合并压缩，JS自动defer
+ 静态资源(JS,CSS,Image)加MD5戳防缓存
+ Zip支持
+ 本地开发，实时刷新
+ 更多...(提取关键CSS，CSS异步加载等)

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

## Help
@冯银超(yinchaofeng@sohu-inc.com)

https://github.com/wizardforcel/markdown-simple-world/blob/master/1.md