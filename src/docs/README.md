<h1 align="center">HUI<h1/>

## 它是什么
> 基于狐友3.0UI的前端UI组件库

## 快速开始
    
### 字号
 
### 按钮
   #### 块按钮 
   <button type="button" class="u-btn1">按钮</button>
    
   
   #### 线按钮 
   <button type="button" class="u-line-btn1">按钮</button>
 
### loading
     <svg class="svg-loading" width="100%" height="100%" viewBox="0 0 100 100">
        <circle class="c1" cx="50" cy="50" r="20"
                fill="none"
                stroke-width="5"
                stroke-dasharray="101.4 130"
                stroke-dashoffset="0"
                stroke="#b1b1b1"/>
        <circle class="c2" cx="50" cy="50" r="20"
                fill="none"
                stroke-width="5"
                stroke-dasharray="15.6 130"
                stroke-dashoffset="29"
                stroke="#c7c7c7"/>
     </svg>
            
  你可以自己包一层容器，例如下面包一个页面居中的loading
    
   #### 页面居中的loading
    <div class="u-loading">
        <svg class="svg-loading" width="100%" height="100%" viewBox="0 0 100 100">
            <circle class="c1" cx="50" cy="50" r="20"
                    fill="none"
                    stroke-width="5"
                    stroke-dasharray="101.4 130"
                    stroke-dashoffset="0"
                    stroke="#b1b1b1"/>
            <circle class="c2" cx="50" cy="50" r="20"
                    fill="none"
                    stroke-width="5"
                    stroke-dasharray="15.6 130"
                    stroke-dashoffset="29"
                    stroke="#c7c7c7"/>
        </svg>
    </div>
    
<div class="u-loading" style="position: relative;transform: none;">
    <svg class="svg-loading" width="100%" height="100%" viewBox="0 0 100 100">
        <circle class="c1" cx="50" cy="50" r="20"
                fill="none"
                stroke-width="5"
                stroke-dasharray="101.4 130"
                stroke-dashoffset="0"
                stroke="#b1b1b1"/>
        <circle class="c2" cx="50" cy="50" r="20"
                fill="none"
                stroke-width="5"
                stroke-dasharray="15.6 130"
                stroke-dashoffset="29"
                stroke="#c7c7c7"/>
    </svg>
</div>

依赖以下样式：

````
.u-loading{
  width: 1.26rem;
  height: 1.26rem;
  border-radius: 8px;
  background-color: rgba(241, 241, 241, 0.8);

  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
}

.svg-loading{
  animation: rotate 1.832s linear 0s infinite;
  circle{
    &.c1{
      animation: long 1.832s cubic-bezier(0.18, 0, 0.58, 1)  0s infinite;
    }
    &.c2{
      animation: short 1.832s cubic-bezier(0.18, 0, 0.58, 1)  0s infinite;
    }
  }
}

@keyframes long {
  0% {
    stroke-dasharray: 101.4 130;
  }
  50% {
    stroke-dasharray: 26 130;
  }
  100% {
    stroke-dasharray: 101.4 130;
  }
}
@keyframes short {
  0% {
    stroke-dasharray: 15.6 130;
    stroke-dashoffset: 29;
  }
  50% {
    stroke-dasharray: 5.2 130;
    stroke-dashoffset: 8;
  }
  100% {
    stroke-dasharray: 15.6 130;
    stroke-dashoffset: 29;
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(720deg);
  }
}
```


### 下拉刷新/上拉加载







## 更新日志
 
## 更多帮助
   - @严焜杰(kunjieyan@sohu-inc.com)
   - @柳学峰(xuefengliu@sohu-inc.com)
