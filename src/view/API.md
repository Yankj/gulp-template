[TOC]
<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css">
<script src="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
## 概述

> 名词约定：
>从搜狐新闻客户端"狐友"角度看，按照H5的宿主环境，可以分为"狐友内"和"狐友外"（狐友外包括新闻客户端webview以及端外浏览器）两部分。
>以下文档中的狐友内和狐友外均按此处解释理解。


- 本JS-SDK仅供狐友内webview中展现的h5页面使用
- 如需在狐友外使用sohusns相关native交互接口(如站外呼起等业务)，请手动做协议跳转，文档参见 http://wiki.sohu-inc.com/pages/viewpage.action?pageId=17996744 
- 相关方法调用可能会因为sdk更新不及时导致和上述链接中的二代协议功能不是很一致，以上述链接中的二代协议为准。
- 更多维护，@柳学峰 qq:1140215489

### 引入方式

当前最新版本 1.0.9

引入sohusns.js,支持直接加载和标准AMD/CMD模式加载。
SDK地址：http://sns_wf.cdn.sohusce.com/js-sdk/sohusns/x.x.x/sohusns.js(x.x.x请使用最新版本号)
Demo地址：http://fe.w.sohu.com/sns-webview/sdk/demo/index.html 
（本demo并未穷尽所有交互，@测试同学可以根据接口文档编写用例做充分测试）

### webview版本识别
js可以通过 _navigator.userAgent_ 获取"搜狐新闻客户端"以及"狐友内部通信协议"版本号，判断当前环境执行不同的逻辑。

注：SohuSNS/2.4.1为狐友内部通信协议版本号（非sohusns.js的）

```javascript
    //ios 客户端5.3.0 狐友内部通信协议2.4.1 举例
    Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12F70 SohuNews/5.3.0 SohuSNS/2.4.1
```

### 字段声明
- 未标记"必传"字样的，都是可选字段
- sid，如不传，默认"x"
- cb，即callback，接收两个参数：sid为调用时传的sid，res为native的返回值
- 以下各接口字段，不需要做urlencode处理（单独声明除外）

### 白名单限制
安全角度考虑，只有域名符合以下规则的h5页面，才可以调用sohusns中js和native交互相关的接口。
注：含主域及其子域

```javascript
    *.w.sohu.com
    *.t.sohu.com
    *.mail.sohu.com
```

### 开发调试帮助

#### 模拟userInfo数据 - devData[属性]

因为相关方法只有在页面的宿主容器为狐友webview的时候才可用，需要native做回调处理的一些方法，在PC浏览器模拟器上不会触发回调，增大了开发调试的复杂性。
为解决这个问题，特别针对需要回调的方法，现提供了一个`devData`字段。这里以 _sohusns.getUserInfo_ 为例，使用demo如下：

```javascript
    sohusns.getUserInfo({
        cb: function(sid, res) {
            doSomething();
        },
        devData: 
        {
          "avatar": "http://sucimg.itc.cn/avatarimg/s_20000010_1479286483597_c175",
          "cid": "NjE1ODYwNDI0OTUzMTMzMDU4Mw==",
          "gid": "01010111060001d62e74b2708a1cdb0e9d262e8fd02942",
          "header": {//该字段为native鉴权使用 因h5鉴权需要 特全部透传出来
            "Accept": "*/*",
            "Idfa": "FA0D1A7D-50A9-447D-8DC8-7BE65345AED7",
            "S-CID": "NjE1ODYwNDI0OTUzMTMzMDU4Mw==",
            "S-DV": "iPhone 6",
            "S-HW": "667.000000,375.000000",
            "S-LL": "116.319359,39.982150",
            "S-MAC": "02:00:00:00:00:00",
            "S-NW": "WIFI",
            "S-OS": "iOS 10.3.1",
            "S-PID": "177463116630690176",
            "S-PPID": "OGI-_T2UG4RD0IWNE1JNLNIRT1IO@wechat.sohu.com",
            "S-SESN": "CiBmZWQ4ZjZlZWE1YTM0ZDc5OGNkZmRjZjVmNjgxYTNhYRC2vpWRvysbCwgAEwgBEAoYtoTejb8rIICsgf7F9/amAygAFAwcIyQ=",
            "S-TID": "A236E270-8B72-4F50-9E51-151D61EBB322",
            "S-TO": "CU",
            "S-VD": "Apple",
            "S-VS": "5.9.0",
            "User-Agent": "ios",
            "gid": "01010111060001d62e74b2708a1cdb0e9d262e8fd02942",
            "pid": "6181284820556361807",
            "token": "8d6f88dc9ed50fbd4443918fb7134f7d"
          },
          "isPhoneBind": "2",
          "mobile": "",
          "p1": "TmpFMU9EWXdOREkwT1RVek1UTXpNRFU0TXc9PQ==",
          "pid": "6181284820556361807",
          "ppid": "OGI-_T2UG4RD0IWNE1JNLNIRT1IO@wechat.sohu.com",
          "suid": "177463116630690176",
          "token": "8d6f88dc9ed50fbd4443918fb7134f7d",
          "userId": "OGI-_T2UG4RD0IWNE1JNLNIRT1IO@wechat.sohu.com",
          "userName": "狐友1002340"
        }
    });

```
_devData_ 字段设置上模拟数据之后，在PC浏览器模拟器（Windows和mac平台）中运行时，会即时自动触发回调 _cb(sid,devData)_ 。
注：虽然狐友webview环境中不会处理此字段，但是因为devData可能涉及隐私，所以上线的时候最好注掉

#### 显示最终调用协议串 - devTip[属性]

任何一个方法中，添加参数  _devTip:1_ ，即可在页面顶部显示最终调用native的协议。再次单击会消失。
举例：

```javascript
    sohusns.toast({
        devTip:1,
        type:0,
        text:"操作失败"
    }); 
```

#### 在sns中打开-openInSNSWebview[方法]

js 调用 _sohusns.openInSNSWebview();_ 可以做到通过客户端首页扫码或者三方扫码工具打开h5的时候，程序自动跳转到狐友的webview中。

## 基础UI

### title标题栏
控制native标题栏显隐，改变title。

```javascript
    sohusns.title({
        isShow:1,//必传 1显示，0隐藏
        title:"xxx"//isShow为1时必传,如不传默认为document.title
    }); 
```

### confirm确认框
调用native确认框

```javascript
    sohusns.confirm({
        title:"确定要xx吗？", //必传
        ok:"是的", //默认 "确定"
        cancel:"算了",//默认 "取消"
        sid:"xx",
        cb:function(sid,res){//必传
        }
    })
res:

    {       
        "status": "1"   //1用户按确定键，0用户按取消键 
    }
```

### toast操作提示
调用native操作提示。分成功和失败两种。
注：Android中，如果系统"悬浮窗"权限未打开会导致native调用无效，目前js库的兼容方案是Android下用h5的Toast提示。（动效待优化）

```javascript
    sohusns.toast({
        type:0,//必传 1为成功，0为失败
        text:"操作成功/失败"//必传
    }); 
```
## 浏览器相关
### 新窗口打开页面

```javascript
    sohusns.goto({
        "url": "http://www.sohu.com",//必传
        "title": "iam title",//不传即不显示标题栏
        "closeCallback":"refresh" //关闭时刷新（timeline or home页）
    });
```
### 关闭当前窗口

```javascript
    sohusns.close();
```
注：通过setTimeout()先打开新native页面，再关掉自己的话，在ios里会关闭掉新页面

### 返回SNS根页面
关闭所有页面并返回狐友Tab根页面

```javascript
    sohusns.backToRoot();
```
## 获取native数据

### 用户信息

```javascript
    sohusns.getUserInfo({
        sid:"xx",
        cb:function(sid,res){//必传
        }
    }); 
```

res:

     参见 “开发调试” - “模拟userInfo数据” - “devData”的取值

说明：

- 未登录时，除 _gid_ _p1_ _cid_ _isPhoneBind_ 外，其余均为""（iOS v5.7.4+）
- 建议依据userId是否为""来判断是否已登录

### 网络状态
包括当前网络状态及运营商代码。

```javascript
    sohusns.getNetWorkStatus({
        sid:"xx",
        cb:function(sid,res){//必传
        }
    }); 
res:

    {
        "S-TO":"运营商 代码", //CM-移动 CU-联通 CT-电信 未插卡-""
        "S-NW":"(234)G/WIFI"   //无网为""(可通过这个判断是否断网)
    }
```

### 夜间模式
获取当前客户端设置是否为夜间模式(新闻客户端绝大多数页面展现都支持日间和页面模式)。

```javascript
    sohusns.nightMode();
res:

    true or false (bool)
```
备注：

- 夜间模式下，在新窗口中打开h5页面的时候，url中会被native自动追加上参数"mode=1"（当前窗口内继续load其他页面不会被追加此参数，需要自己利用本地存储维护）。
- 如需在sohusns.js加载前，判断是否为夜间模式，可以自行根据"mode=1"来判断。（无mode参数或者mode=其他值时均为日间）

## 调用native功能
### share分享
调用native分享。
可以分享到微博微信qq等主流平台，支持：纯图片分享、隐藏特定平台、统计分享数据。
注：如果是夜间模式下把当前页面url分享出去，需要注意把"mode=1"滤掉

```javascript
    sohusns.newsbrige({
        newsFlag:"share",//必传
        title:"shareTitle",
        link:encodeURIComponent("http://m.sohu.com"),//必须encode，如果分享到狐友后期望用狐友webview而不是news webview打开的话，需要在url中附加参数&url_source_type=112
        content:"shareContent",
        description:"shareDescription",//一般业务里content和description是同一个
        pics:encodeURIComponent("https://sns_wf.cdn.sohusce.com/annual-huyou/logo/share.png"), //必须encode. 只传此字段时 为纯图片分享;其他情形下为分享出去的卡片的缩略图
        hideShareIcons:"moments,weChat,sohu,sina,qqZone,qq,alipay,lifeCircle,copyLink", //隐藏特定平台（细节咨询新闻客户端native同学）
        referId :new Date().getTime(), //设置唯一值 分享到狐友timeline时不要做展现去重
        sourceType :112 //sns活动专用值 http://wiki.sohu-inc.com/pages/viewpage.action?pageId=17404957（这儿需要再验证下 112  113 似乎没什么用）
        logstaisType:"sns_myHome" //统计分享数据（这个似乎没怎么用）, sns_feed/sns_profile/sns_myHome
    });
```

### 登录
调用native登录。登录成功或失败后，native会返回webview and 调用js回调。

```javascript
    sohusns.login({
        isHalf:true,//是否是半屏登录
        halfTitle: "一键登录，留下你的态度" //半屏登录的title
        sid:"xx",
        channelId:"",
        url:encodeURIComponent(location.href),
        cb:function(sid,res){//必传
        }
     });
res:

    {       
        "status": 1, //1登陆成功， 0登陆失败 
    }
```

### 绑定手机号
调用native绑定手机号。绑定成功或失败后，native会返回webview and 调用js回调。

```javascript
    sohusns.bindPhone({
        sid:"xx",
        cb:function(sid,res){//必传
        }
     });
res:

    {       
        "status":"1"   //1成功，0失败，2不确定（非搜狐账号Android中会返回2）
        "mobile":"" //成功后返回手机号  否则返回""
    }
```
### 图片预览
调用native图片预览，支持：laoding动效、缩放&&拖动预览。

```javascript
    sohusns.imgPreview({
        url:"http://pic77.nipic.com/file/20150907/18292444_110309622000_2.jpg",//必传 大图url
        thumbnail:"iVBORw0KGgoAAAANSUhEUgAAACcAAAAlCAIAAABOCWdpAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA2SURBVFhH7c0xEQAgDAAxhHSsf2d4QMUz5S57zp39z1qz1qw1a81as9asNWvNWrPWrDVra%2FYBvj%2BhApfQ0a0AAAAASUVORK5CYII="//缩略图的base64字符串
    });
```
注：src为url的img，可以通过 _canvas.toDataURL_ 来转换为base64

- 此方法需要满足页面和img资源同域；
- 若为跨域，需要server对img的response设置"Access-Control-Allow-Origin",且前端img对象的crossOrigin="anonymous" (demo有示例)

### 截屏
调用native截屏

```javascript
    sohusns.screenshot({
            "startY": 0, //HTML滚动截屏的top起点坐标
            "endY": endY, //HTML滚动截屏的top终点坐标
            "uploadHost": "https://sns-api-test2.sohusce.com",
            "uploadPath": "/v5/upload/uploadShareProfile",
            "uploadUrl": "https://sns-api-test2.sohusce.com/v5/upload/uploadShareProfile",
            "appendHeader": { //截屏图片上传时，除native request原有的一坨header外，需要追加的自定义header， 由业务js传递 
                "X-token1": "1234",
                "X-token2": "5678"
            },
            "fileKeyName": "file",
            "appendParams": {
                "S-PID": me.model.all['userId'],
                "file": true
            }),
            cb:function(sid,res){
            
            }
    })
```

### 调起profile头部背景图编辑

```javascript
    sohusns.openProfileBgEdit({
        cb:function(sid,res){
            
        }
    });
```
### 切换H5页面全屏显示（预计2017年12月大版上）  

```javascript
     sohusns.changeFullScreenMode({
        "isFullScreen": 1/0
    })
    //字段说明, 1:全屏模式，状态栏透明、标题栏及底部栏隐藏，webview全屏显示
    //字段说明, 0:非全屏模式，恢复为默认模式，底部栏显示，标题栏按照默认逻辑显示，状态栏及webview按既有规则显示
```

### token过期(从6.0.0版本开始支持)
```javascript
    //调native完成后续页面跳转操作（退出登录，回到未登录广场，跟native token过期时一样的操作）
    sohusns.tokenInvalid();
```
### loading的显示隐藏

```javascript
    sohusns.showLoading({
                        "type":"0"  //1表示显示loadIng动画 0表示隐藏loading动画
                    });
                    
    //iOS:V5.8.4版本开始支持
    //Android：6.0.0开始支持
```
### 调起支付半屏
```javascript
     sohusns.payment({
                     cb:function (sid,res) {
                          
                     },
                     orderInfo:{
                         "from_user":"",  //转账发起人passport（需要和客户端当前账户一致）
                         "to_user":"",    //收款人passport
                         "to_user_type": 0, //用户类型， 0： 普通用户， 1：商家
                         "amt":"20.01",  //转账金额， 单位元， 保留两位小数
                         "order_id":"", //订单ID (从第三方获取)
                         "pay_title":"打赏", //支付名称（如打赏、红包等）
                         "third_party_appid":"", //申请时wallet分配给第三方的appid（从第三方获取）
                         "third_party_sign":"" //第三方签名（从第三方获取）
                     }
                 })
```
## 打开native页面

### home页
```javascript
    sohusns.openHome();
```
### 用户profile页

```javascript
    sohusns.openProfile({
        "id":"18611019389@sohu.com" //必传 用户 passportID 
    });
```
### feed详情页

```javascript
    sohusns.openFeed({
        feed_id:"128252156624010624",
        user_id:"zmttest003@sohu.com"
    });
```
### 添加关注(热门)页

```javascript
    sohusns.openAddAttention();
```
### 广场(精选)页

```javascript
    sohusns.openSquareAfterLogin();
```
### 话题详情页

```javascript
    sohusns.openTopic({
        "id":"121" //必传 话题id
    });
```
### 私信聊天页

```javascript
    sohusns.openPrivateMessage({
        avatar:"http://sucimg.itc.cn/avatarimg/s_10000001_1446030193787_c175",//必传 头像url
        user_id:"huangjingfz009@sohu.com",//必传 用户passportId
        name:"huangjingfz009"//必传 用户狐友昵称
    });
```

### 分类用户列表页

```javascript
    sohusns.openCategoryUserList({
        "categoryId":"1",//必传
        "name":"类别名"//必传 界面title展示用
    });
```

### 推荐用户列表页

```javascript
    sohusns.openRecommandUserList({
        "categoryId":"类别id", //请求接口参数 ,必传
        "name":"类别名" //界面title展示使用，必传
        "tagId":"标签id' //categoryId为1时，必传
    });
```
注：1-标签用户  其他取值，参考数据开发组@何洲 wiki

### 推荐(猜你喜欢)页

```javascript
    sohusns.openGuessYouKnow({
        template:"7",//必传 推荐feed 类别
        user_id:"18611019389@sohu.com" //必传 推荐来源用户passportId
    });
```
### 新闻专题页
本页面接口不属于正常需求，仅作协议透传测试用。

```javascript
    sohusns.newsbrige({
        newsFlag:"sub",//必传
        subId:107
    });
```
### 申请搜狐号页面

```javascript
    sohusns.openApplySohuNum({
        "statu": 1, //审核状态
        "reason": "<br>[biweiye]-[驳回]-[请您上传清晰有效的手持身份证件照片，感谢您的支持。]-[2017-02-21 15:51:34]-[123]",//驳回显示文案
        "user_id": "110791247173616640", // 申请人suid
        "isMpMedia": true/false, //是否是搜狐号
        "mpManageUrl": "http://mp.sohu.com/m/main/client/index.action"  //管理搜狐号页面h5地址
    });
```
### 用户资料编辑页

```javascript
    sohusns.openUserInfoEdit();
```
### 互关通讯录页
    
```javascript
    sohusns.openEachAddressBook();
```
### 照片选择页，完成创建图文feed功能
    
```javascript
    sohusns.openPhotoSelectForNewFeed();
```
### 消息提醒页(iOS5.9.3以上开始支持此功能)
```javascript
    sohusns.openRemindMessage({
        "isMyAttention": "0", //非必传 不传的时候默认进关注tab "1" 表示跳转到我关注tab "0"表示跳转到其他tab
        "pushType":"1",//推送类型埋点
        "snsTab":"1"
    });
```
### 私信列表页(iOS5.9.3以上开始支持此功能)

```javascript
    sohusns.openChatList({
        "isEachFollow":"0",
        "id":"176475371250747776",
        "type":"0",
        "pushType":"1",//推送类型埋点
        "snsTab":"1"
    });
```
### 钱包（5.9.9开始支持）
```javascript
    sohusns.openWallet();
```
    
### 钱包交易记录页

```javascript
    sohusns.openTradeHistory();
```
### 分享到狐友的界面(以图片为例) 
```javascript
    sohusns.openShareSDK({
        "type":"3",
        "imageUrl":"http://pic77.nipic.com/file/20150907/18292444_110309622000_2.jpg",
        "refer_id":"",
        "topicId":"",
        "topicName":""
        "content":"分享content",
    })
```
### 跳转到群聊邀请卡详情页
```javascript
    sohusns.openInviteCard({
       "card_id":"邀请卡id，目前用msg_id代替",
       "group_id":"群id",
       "invitee_id":"受邀人id",
       "inviter_id":"邀请人id"
       })
```
### 跳转绑定银行卡页面

```javascript
    sohusns.openBindBankCard({
        cb:function(sid,res){  
     
        }
     });
```
## 传递给native数据

### push登录成功后的返回数据
未登录状态下的h5（包括但不限于未登录广场），js走server登录成功后，把response数据传给native。

```javascript
    sohusns.sendLoginResponseData({
        "appSessionToken":"641b94ac5a841c69b18e3229671aed9c","bindMobileFlag":"1","mobile":"18588821253","passport":"829529368882597888@sohu.com","secureMobileFlag":"1"
    });
```
注：data必传，如无特殊业务要求，js只做response透传给native。


### push行为日志埋点

把数据团队需要的用户行为埋点数据，push到native中，由native走上报逻辑。
相关字段参考数据团队埋点文档 http://wiki.sohu-inc.com/pages/viewpage.action?pageId=24446178 。

```javascript
    sohusns.pushBehaviorLog({
        key:"",//必传
        params:{...}//必传 如无参数，至少要传{}
    });
```
## native事件通知

### 当前webview被重新展现出来

h5打开之后，如果又调用了其他的native页面，然后在这些页面中做了数据修改，此时再返回到h5页面的时候，native会触发js的一个自定义事件。（不论数据是否修改，只要h5重新露出了，都会触发）。

为了响应这个事件，js中应该事先做好绑定，如下

```javascript
    //注册webviewReAppear
    document.addEventListener("webviewReAppear",function(e){
        tip("触发：webviewReAppear"+Date.now());
    });
```
### 当前webview被隐藏
h5页面被其他native页面盖住或者被切换其他native tab时，触发此事件。
为了响应这个事件，js中应该事先做好绑定，如下

```javascript
    //注册webviewHidden
    document.addEventListener("webviewHidden",function(e){
        tip("触发：webviewHidden"+Date.now());
    });
```
注：这个只有Android在5.8.8+做了支持，iOS未加入。

## 其他特性说明

### h5页面自动检查更新

问题：Android下狐友端内打开一个html，切到后台长时间不做操作又没有被系统内存回收时，下次打开时无法及时load到最新版本的h5页面。（ios因为内存回收较快，不做此处理）
为了解决这个问题，引入自动更新检查机制：当首次load页面和页面被重新展现的日期差>0时，页面强制reload，以便拉取最新版本代码。

如不需要此功能，需要在业务代码中手动调用以下方法：

```javascript
    sohusns.closePageAutoUpdate();
```
### 历史版本

#### 1.0.2
    
- 修复Android无参数协议调用时 有些协议会无效的情况（协议/后统一追加了{}）
- 增加Android悬浮窗权限关闭导致native toast无效的问题，顺带支持了非狐友内webview下的toast显示（Android统一走h5的toast）
- 增加Android的h5代码自动检测更新

#### 1.0.3

- sdk中新增打开申请搜狐号页面、用户资料编辑页、互关通讯录页、照片选择页完成创建图文feed功能

#### 1.0.4

- 取消callNative中小米MIX的特殊处理

#### 1.0.5

- 增加screenshot(调用native截屏)、openProfileBgEdit(调用profile头图编辑页面)

#### 1.0.6
- 增加changeFullScreenMode切换全屏显示的协议

#### 1.0.7
- 增加openRemindMessage、openChatList、openWallet、tokenInvalid、showLoading协议

#### 1.0.8
- 增加openShareSDK分享到狐友、openTradeHistory钱包交易记录、payment支付半屏协议

#### 1.0.9
- 增加openInviteCard跳转到群聊邀请卡详情页、openBindBankCard跳转到银行卡绑定页面