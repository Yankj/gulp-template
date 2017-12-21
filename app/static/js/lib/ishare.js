;(function (factory) {
  window.iShare = factory(window.Zepto || window.jQuery);
})(function ($) {

  var WECHAT_APP_ID = 'wx28b768f133d71388';

  function loadScript(url, callback) {
    var node = document.createElement("script");
    node.style.display = "none";
    node.src = url;
    var a = function () {
      node && node.readyState && "loaded" != node.readyState && "complete" != node.readyState || (node.onload = node.onreadystatechange = node.onerror = null, node.src = "", node.parentNode.removeChild(node), node = null, callback && "function" == typeof callback && callback())
    };
    node.onload = node.onerror = node.onreadystatechange = a, document.getElementsByTagName("body")[0].appendChild(node);
  }

  function initWXShare(config) {
    if (!(navigator.userAgent.match(/MicroMessenger/i))) {
      return;
    }
    loadScript('//res.wx.qq.com/open/js/jweixin-1.2.0.js', function () {
      $.ajax({
        type: "GET",
        url: '//wechat-public.sohusce.com/generate-sign?url=' + location.href,
        success: function (res) {
          var data = res.data;

          wx.config({
            debug: false,
            appId: WECHAT_APP_ID,
            timestamp: data.timestamp,
            nonceStr: data.noncestr,
            signature: data.signature,
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
          });

          wx.error(function () { });

          wx.ready(function () {
            var cfg = {
              title: config.title,
              desc: config.summary,
              link: config.url,
              imgUrl: config.pic,
              type: '',
              dataUrl: '',
              success: function () {
                config.success && 'function' === typeof config.success && config.success();
              },
              cancel: function () {
                config.cancel && 'function' === typeof config.cancel && config.cancel();
              },
            };
            wx.onMenuShareAppMessage(cfg);
            wx.onMenuShareQQ(cfg);
            wx.onMenuShareQZone(cfg);
            if (config.timelineTitle && 'string' === typeof config.timelineTitle) {
              wx.onMenuShareTimeline({
                title: config.timelineTitle,
                desc: config.timelineTitle,
                link: config.url,
                imgUrl: config.pic,
                success: function () {
                  config.success && 'function' === typeof config.success && config.success();
                },
                cancel: function () {
                  config.cancel && 'function' === typeof config.cancel && config.cancel();
                },
              });
            } else {
              wx.onMenuShareTimeline(cfg);
            }
          });
        }
      });
    });
  }

  function initQQShare(config) {
    //QQ端内分享 http://open.mobile.qq.com/api/mqq/index#api:setShareInfo
    if (!(navigator.userAgent.match(/QQ\/([\d.]+)/))) {
      return;
    }
    var tpl = '';
    tpl += '<meta itemprop="name" content="' + config.title + '"/>';
    tpl += '<meta itemprop="image" content="' + config.pic + '" />';
    tpl += '<meta name="description" itemprop="description" content="' + config.summary + '" />';
    document.title += config.title;

    $('head').append(tpl);

    loadScript('//open.mobile.qq.com/sdk/qqapi.js', function () {
      var info = {
        title: config.title,
        desc: config.summary,
        share_url: config.url,  // 不进行传递，默认使用当前页面的URL
        image_url: config.pic
      };
      function doQQShare() {
        try {
          if (config.callback) {
            window.mqq.ui.setOnShareHandler(function (type) {
              if (type == 3 && config.timelineTitle) {
                info.title = config.timelineTitle;
              } else {
                info.title = config.title;
              }
              info.share_type = type;
              info.back = true;
              window.mqq.ui.shareMessage(info, function (result) {
                if (result.retCode === 0) {
                  config.callback && config.callback.call(this, result);
                }
              });
            });
          } else {
            window.mqq.data.setShareInfo(info);
          }
        } catch (e) {
        }
      }
      doQQShare();
    });
  }

  /**
   * config = {
   *  title: string,
   *  summary: string, // // 分享内容
   *  url: string,
   *  pic: string,
   *  timelineTitle: string // 如果存在该字段，默认覆盖 config.title（仅朋友圈，因朋友圈内只显示标题）
   * }
   * 
   * @param {any} config 
   */

  function initShare(config) {
    initWXShare(config);
    initQQShare(config);
  }

  return {

    setWechatAppID: function (id) {
      WECHAT_APP_ID = id;
      return this;
    },

    initShare: function (config) {
      initShare(config || {
        title: '搜狐墨客－优质图文排版工具',
        summary: '立即下载搜狐墨客户端',
        url: location.href,
        pic: 'https://ink_wf.cdn.sohusce.com/h5/img/icon-share.png',
      });
      return this;
    }
    
  };
});