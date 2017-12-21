# 基于gulp的自动化构建项目模板

## 功能
+ SASS编译，错误重启，自动移除冗余CSS，增量更新
+ Babel编译，ES6支持
+ JS，CSS合并压缩
+ 静态资源(JS,CSS,Image)加MD5戳防缓存
+ Zip支持
+ 本地开发，实时刷新

## 命令行几种调用方式：
```javascript
//1、本地开发
npm run dev
//2、打测试环境包
npm run build-test                         //静态资源不放CDN
//3、打生产环境包
npm run build-product               //静态资源不放CDN
npm run build-product-cdn         //静态资源放CDN
```