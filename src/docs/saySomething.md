# 日常记录
- 业务
  + passport（h5/PC/sdk）
  + sns(sdk、h5、后台)

- ES6

### 常见的问题/坑
  - 移动端https页面中的加载http资源可能加载不成功(去掉头，使用//)
  - 新环境工具安装，node版本6.几比较稳
  - node-sass装不上？使用淘宝镜像，
    + macOS 系统直接运行下面的命令即可：
    ``SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass``
    + 跨平台、并且直接使用 npm install 安装所有依赖的做法，
      在项目内添加一个 .npmrc 文件：
      ```
        sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
        phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
        electron_mirror=https://npm.taobao.org/mirrors/electron/
        registry=https://registry.npm.taobao.org
      ```
      这样使用 npm install 安装 node-sass、electron 和 phantomjs 时都能自动从淘宝源上下载，但是在使用 npm publish 的时候要把 registry 这一行给注释掉，否则就会发布到淘宝源上去了。
      [更多>>](https://github.com/lmk123/blog/issues/28)
  - gulp-template
  	1. 重启没clean temp
    2. 不需要编译的scss用_ 命名,//注释编译时去掉，/**/注释留下
    3. scss任务中的autoprifixer顺序与scss冲突
    4. gulp-px2rem-plugin的bug
    ```
    array_style=s_file.match(reg) || [];
    ```
  - inline-block中空白符的问题
  - mac工具
    + cmd
      1. iTerm 2
      2. ohmyzsh
  - rem文字居中的问题
    + 写死像素
    + flex
    + line-height和padding不好使
  - svg中利用stroke-dasharray、stroke-dashoffset做loading，需要深入理解前面两个属性
  - [svg中嵌入css](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/style)
  - SVG Sprite
    + https://www.w3cplus.com/svg/create-svg-sprite-sheet.html
    + http://www.uisdc.com/svg-icon-part-two
  - 文档生成
    + gitbook
    + [jsdoc](https://www.awesomes.cn/repos/NodeJS/Documentations)
    + [docusaurus](http://docusaurus.io/docs/en/installation.html)
    + [doctify](https://docsify.js.org/#/?id=docsify)
      感觉这个很好用
      > 
      ```$xslt
        npm i docsify-cli -g   //使用前先全局安装
        docsify init ./docs   //初始化
        docsify serve docs   //预览
      ```
  - [CSS3中Animation为同一个元素添加多个动画效果](https://www.cnblogs.com/qinglin/p/7794253.html)
  - fastclick为什么存在，touchstart替换click有什么问题
    >touchstart虽然替换click 或者用touchend替换click 虽然会减掉300ms的延迟
     但是如果用户只是想滚动下拉框的时候会误点 一样触发了touchstart 和touchend 进入链接 这样太糟糕了但是如果用click就不会 用户滑动的时候不会误点不会触发 
    >所以一般封装的所谓 tap 事件，都是 touchstart、touchmove、touchend 相结合，做出精细的判断，不是随便用一个事件就能轻松代替 click。
  - 深入研究一下模块化
  - 页面中的demo工具
       + codepen 
       + jsfiddle
       + jsrun
   - 服务端渲染
        + [ Nuxt.js](https://zh.nuxtjs.org/guide)
        + [vue服务端渲染](https://ssr.vuejs.org/zh/structure.html)
      

#### else
atom markdown 预览快捷键 Shift + Ctrl + M
[更多](http://es6.ruanyifeng.com/#README )
