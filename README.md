## HUUI
> 基于狐友3.0UI的前端UI组件库

### 简要说明

#### 项目启动及打包
打包脚本基于`gulp-template-fe`项目;
项目启动，打包相关说明请看`gulp-template-fe.md`;
```javascript
//0、安装依赖
npm install
//1、本地开发
npm run dev
//2、打测试环境包
npm run build-test                   //静态资源不放CDN
```
sce项目名称`huui-test`

#### 文档撰写
文档基于`docsify`，你只需编写markdown文件，编写`src/docs/README.md`即可。

本地访问`localhost:3000/view/docs/#/`即可查看文档

sce上的服务地址`http://huui-test.sce.sohuno.com/view/docs/#/`

如需添加新的页面，可在`src/docs/`下添加其他markdown文件:
> 例如建一个test.md，则可以`http://localhost:3000/view/docs/#/test`访问

[更多关于docsify>>](https://docsify.js.org/#/)


### 目录结构
```html
├─config.js
├─gulp-template-fe.md
├─gulpfile.js
├─package.json
├─README.md
├─src
|  ├─view
|  |  ├─index.html
|  |  ├─loading.html
|  |  └pull-to-refresh.html
|  ├─static
|  |   ├─template
|  |   |    ├─common
|  |   |    |   ├─head.html
|  |   |    |   └vconsole.html
|  |   ├─scss                                 //包含项目所有scss，_开头的用来引用 不会编译
|  |   |  ├─index.scss
|  |   |  ├─_base.scss
|  |   |  ├─_common.scss
|  |   |  ├─_const.scss
|  |   |  ├─sns3.0
|  |   |  |   ├─sns3.0.scss
|  |   |  |   ├─_extends.scss                 //用来继承的类，从extends目录引入    
|  |   |  |   ├─_loading.scss                    
|  |   |  |   ├─_mixins.scss                  //用来调用的混合，从mixins目录引入 
|  |   |  |   ├─_pulldown.scss                //下拉刷新相关的css
|  |   |  |   ├─_variables.scss               //sns3.0的 变量
|  |   |  |   ├─mixins
|  |   |  |   |   ├─_button.scss
|  |   |  |   |   ├─_transition.scss
|  |   |  |   |   └_utils.scss
|  |   |  |   ├─extends
|  |   |  |   |    ├─_button.scss
|  |   |  |   |    └_utils.scss
|  |   ├─img
|  |   |  ├─favicon.ico
|  |   |  └loading.svg
|  |   ├─es6
|  |   |  ├─mylib
|  |   |  |   ├─loading.js
|  |   |  |   └pulldownRefresh.js
|  |   |  ├─lib
|  |   |  |  ├─doT.min.js
|  |   |  |  ├─vconsole-elements.min.js
|  |   |  |  ├─vconsole-resources.min.js
|  |   |  |  ├─vconsole.min.js
|  |   |  |  └zepto.min.js
|  |   |  ├─common
|  |   |  |   └util.js                          //工具库
|  ├─docs                                       //相关文档，只需编写README.md即可
|  |  ├─.nojekyll
|  |  ├─index.html
|  |  ├─README.md                               //文档markdown文件
|  |  ├─themes
|  |  |   ├─vue-fix.css
|  |  |   └vue.css
```