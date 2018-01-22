<h1 align="center">HUUI<h1/>

## 它是什么
> 基于狐友3.0UI的前端UI组件库

## 快速开始
### 文档说明
#### sns3.0.css 
使用前当然是先在页面中引入[sns3.0.css](../../static/css/sns3.0.css ":ignore")啦
##### 输出rem
sns3.0.css采用rem方案，以html的font-size为50px为基准，以750px宽的iphone6的设计稿（即2倍稿）为基准。
开发文件sns.scss中均使用px为单位，编译时自动化转rem。

以下文档中以px为单位时，除以100即为对应rem的值，sns3.0.css中以rem为单位。

##### 夜间模式
sns3.0.css已包含对应夜间模式的组件样式。
    
### 字号
 sns3.0中包含的字号(px,对应iphone6的)
 >96,44,40,36,32,30,28,26,24,22,20,18
 
 #### 使用方法
 css类名`s-fz`加字号，如`s-fz96`,`s-fz44`...
 对应字号
 >0.96rem,0.44rem....
 
### 按钮
   #### 块按钮 
```html
   <button type="button" class="u-btn1">按钮1</button>
   <button type="button" class="u-btn2">按钮2</button>
   <button type="button" class="u-btn3">按钮3</button>
   <button type="button" class="u-btn4">按钮4</button>
   <button type="button" class="u-btn5 ">按钮5</button>
   <button type="button" class="u-btn5">按钮5</button>
   <button type="button" class="u-btn6">按钮6</button>
```
  <button type="button" class="u-btn1">按钮1</button>
  <button type="button" class="u-btn2">按钮2</button>
  <button type="button" class="u-btn3">按钮3</button>
  <button type="button" class="u-btn4">按钮4</button>
  <button type="button" class="u-btn5 ">按钮5</button>
  <button type="button" class="u-btn5">按钮5</button>
  <button type="button" class="u-btn6">按钮6</button>
   
   #### 线按钮 
   ```html
    <button type="button" class="u-line-btn1">按钮</button>
    <button type="button" class="u-line-btn2">按钮2</button>
    <button type="button" class="u-line-btn3">按钮3</button>
    <button type="button" class="u-line-btn4">按钮4</button>
    <button type="button" class="u-line-btn5">按钮5</button>
    <button type="button" class="u-line-btn6">按钮6</button>
    <button type="button" class="u-line-btn7">按钮7</button>
    <button type="button" class="u-line-btn8">按钮8</button>
```
 <button type="button" class="u-line-btn1">按钮1</button>
     <button type="button" class="u-line-btn2">按钮2</button>
     <button type="button" class="u-line-btn3">按钮3</button>
     <button type="button" class="u-line-btn4">按钮4</button>
     <button type="button" class="u-line-btn5">按钮5</button>
     <button type="button" class="u-line-btn6">按钮6</button>
     <button type="button" class="u-line-btn7">按钮7</button>
     <button type="button" class="u-line-btn8">按钮8</button>
  
  #### a标签的按钮
  如果你不想使用button，想使用a标签的按钮，HUUI是支持的：
   ```html
<a class="u-btn1" role="button">a按钮</a>
<a class="u-line-btn1" role="button">a按钮</a>
``` 

#### disabled 禁用的按钮
```html
<button type="button" class="u-btn1 disabled">按钮1</button>
<button type="button" class="u-line-btn2 disabled">按钮2</button>
<a class="u-btn6 disabled" role="button">disabled</a>
```
     
### loading
  有两种引入方式：
  #### 使用svg文件引入
  只需引用[svg格式文件](../../static/img/loading.svg ":ignore 下载loading文件")，即可使用动画效果。
  
  你可以自己包一层容器，例如下面包一个页面居中的loading
<iframe width="100%" height="300" src="//jsrun.net/R6qKp/embedded/all/light/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
  #### 使用js文件引入
  引入[loading.js](../../static/js/loading.js ":ignore")，可以动态控制loading显示隐藏
  
  初始化实例：
```js
 const myLoading = new Loading({
      wrapper:".l-loading"
 });
```
然后即可调用`myLoading.show()`,`myLoading.go()`等方法
##### loading.js提供的方法

##### loading.js提供的属性


### 下拉刷新
你可以引入[pullDownRefresh.js](../../static/js/pullDownRefresh.js ":ignore")让你的容器支持下拉刷新

#### 依赖
需要引入的js依赖

    - zepto/jquery
    - Loading.js
#### 使用方法
```js
        let pullDownRefresh = new PullDownRefresh({
            wrapper: "#pullDownWrapper",//需要嵌入下拉刷新的容器 
            triggerFn: function() {
                //这里是下拉时触发的回调函数
                
                //你需要手动在适当的你需要的时机隐藏loading，调用pullDownRefresh.pullLoadingUIHide();
            }
        });

        pullDownRefresh.init();

```
    








