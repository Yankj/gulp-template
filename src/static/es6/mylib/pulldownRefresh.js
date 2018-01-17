/*
 * 下拉刷新
 * 
 * js依赖：
 * - zepto/jquery
 * - Loading.js
 * 
 * DOM依赖：
 * .pulldown-ui
 * 
 * 必传参数：
 * - bodySlct //下拉刷新列表容器 默认 '.list'
 * - uiBoxSlct //下拉效果容器（列表容器的兄弟节点） 默认".pulldown-ui"
 * 
 * 更多参数/方法，参见：PullDownRefresh.prototype
 * 
 * demo：
 * var pullDownRefresh = new PullDownRefresh({bodySlct:".list",uiBoxSlct:".pulldown-ui"});
 * pullDownRefresh.init();
 */
import Helper from '../common/util.js'

;
const PullDownRefresh = (function() {  
    "use strict"

    function PullDownRefresh(opt) { //构造函数
        if (opt) $.extend(this, opt);
    }    
    PullDownRefresh.prototype = { //类方法
        gesture_start_y: 0,
        gesture_start_scroll_y: 0,
        gesture_prev_scroll_y: 0,
        gesture_prev_y: 0,
        isTouch: false,
        y0: 0,
        yMax: 300,//最大可拉高度
        yTrigger:106,//最小可触发高度
        loadingHolderHeight:88,//loading动画占据高度
        arrowHeight:40,//箭头的UI高度
        arrowMarginBottom:26,//箭头距离列表body的固定margin
        showRate: 0, //当前拉下的UI占比
        speedRate: 0.8, //手指下滑位移/ddUI
        scrollSlct: null,//滚动区域容器 非必传
        uiBoxSlct: ".pulldown-ui",
        bodySlct: ".list",
        tip_pull: "",//下拉刷新
        tip_release: "",//松开刷新
        tip_loading: "",//正在更新
        // pullArrow
        triggerFn: function() {},
        init: function() {
            var me = this;
            me.uiInit();
            me.eventInit();
        },
        uiInit: function() {
            var me = this;
            me.triggerRate= me.yTrigger/me.yMax; //下拉到rate%时 松开会触发刷新 
            me.scrollBox = me.scrollSlct ? $(me.scrollSlct)[0] : (document.scrollingElement || document.body); //oppo vivo个傻逼不支持 scrollingElement
            me.$body = $(me.bodySlct);
            me.$uiBox = $(me.uiBoxSlct);
            me.$uiBox.addClass("hidden");
            me.$effectBox = $('<div class="effect-box flex-y center-center hidden"><div class="loading-box"></div><div class="pull-arrow-box"></div><div class="tip">' + me.tip_pull + '</div></div>');
            me.$uiBox.append(me.$effectBox);
            me.$ui_loadingBox = me.$effectBox.find(".loading-box");
            me.$ui_pullArrowBox = me.$effectBox.find(".pull-arrow-box");
            me.$ui_tip = me.$effectBox.find(".tip");
            console.log(111);
            me.effect_loading = new Loading({ "$box": me.$ui_loadingBox, "style": "margin:0;" });
            console.log(222);
            me.effect_pullArrow = new PullArrow({ "$box": me.$ui_pullArrowBox });
        },
        eventInit: function() {
            var me = this;
            // me.$body.on("touchcancel", function(e) {
            //     
            // });
            me.$body.on("touchstart", function(e) { //me.$body
                me.isTouch = true;
                // console.log(e.changedTouches[0].clientY);
                me.gesture_start_y = e.changedTouches[0].clientY;
                me.gesture_start_scroll_y = me.scrollBox.scrollTop;
                me.y0 = e.changedTouches[0].clientY - (me.showRate * me.yMax / me.speedRate); // ;
                me.$uiBox.removeClass("hidden");
                me.$effectBox.removeClass("hidden");
                // me.effect_loading.init();
                me.effect_pullArrow.show();

            }).on("touchend touchcancel", function(e) {
                // console.log("touchend"+Date.now());
                // $(".title").html('end'+me.scrollBox.scrollTop);
                if (me.scrollBox.scrollTop > 0) {
                    me.$uiBox.addClass("hidden");
                    me.$effectBox.addClass("hidden");
                    return;
                }
                if (!me.isTouch) return;
                me.isTouch = false;
                if (me.showRate >= me.triggerRate) { //触发刷新
                    me.pullArrowUIHide();
                    if (!me.effect_loading.isGo) {
                        me.effect_loading.show().go();

                        
                        me.$ui_tip.html(me.tip_loading);
                        // $(".tab.on").html("touchend"+ navigator.onLine);

                        // 安卓下拉刷新时网络判断导致页面错误 目前的版本5.9.0尚未解决
                        if(Helper.ua.android){
                            me.triggerFn();
                        }else{
                            //新闻客户端 狐友webview内判断网络用
                            if (window.sohusns) sohusns.getNetWorkStatus({
                                cb: function(sid, res) { //必传
                                    if (res["S-NW"] == "") { //断网
                                        sohusns.toast({
                                            type: 0, //必传 1为成功，0为失败
                                            text: "请检查网络连接" //必传
                                        });
                                    } else {
                                        me.triggerFn();
                                    }
                                },
                                devData: {
                                    "S-TO": "CU", //CM-移动 CU-联通 CT-电信 未插卡-""
                                    "S-NW": "WIFI" //无网为""(可通过这个判断是否断网)
                                }
                            });
                        }


                        // if (navigator.onLine) { //vivo个傻逼 断网了也是true
                        //     me.triggerFn();
                        // } else { //断网Toast提示
                        //     if (window.sohusns) sohusns.toast({
                        //         type: 0, //必传 1为成功，0为失败
                        //         text: "请检查网络连接" //必传
                        //     });
                        // }

                    }
                    // me.pullLoadingUIHide(1000); //这里日后可能要优化  目前的实现比较粗暴 释放之后立即出发刷新，一定延时后就干掉动画
                } else {
                    me.pullArrowUICancel();
                }
            }).on("touchmove", function(e) {
                var nowY = e.changedTouches[0].clientY;

                if (me.scrollBox.scrollTop > 0) {
                    // $(".tab.on").html(1.3);
                    me.y0 = nowY;
                    me.gesture_prev_scroll_y = me.scrollBox.scrollTop;
                    return;
                }
                if (me.scrollBox.scrollTop < 0) { //这个不好使 干不掉回弹
                    // $(".tab.on").html(1.4);
                    e.preventDefault();
                    return false;
                }
                if (!me.isTouch) return;
                var yc = (nowY - me.y0) * me.speedRate,
                    yMax = me.yMax;
                if (yc <= 0) return;
                if (yc > yMax) yc = yMax;
                me.showRate = yc / yMax;
                // console.log(me.showRate,me.effect_loading.$ele);
                // me.effect_loading.$ele.css({
                //     transform: 'scale(' + me.showRate + ')'
                // });
                // $(".tab.on").html(me.showRate * me.yMax);
                // console.log(me.showRate * me.yMax/100)
                me.$body.css({
                    'transform': 'translate3d(0px,' + (me.showRate * me.yMax/100) + 'rem, 0px)'
                    ,'-webkit-transform': 'translate3d(0px,' + (me.showRate * me.yMax/100) + 'rem, 0px)'
                });
                // var pullArrowMargin=me.yMax*me.showRate-me.arrowHeight;
                me.$ui_pullArrowBox.css({
                    "margin-top":(me.yMax*me.showRate-me.arrowHeight-me.arrowMarginBottom)/100+"rem"
                });
                if (!me.effect_loading.isShow) {
                    if (me.showRate >= me.triggerRate) {
                        me.$ui_tip.html(me.tip_release);
                        me.effect_pullArrow.go();
                    } else {
                        me.$ui_tip.html(me.tip_pull);
                    }
                }
                me.gesture_prev_y = nowY;
                me.gesture_prev_scroll_y = me.scrollBox.scrollTop;
                e.preventDefault();
                // $(".users").html(Date.now());
                return false;

            })
        },
        pullArrowUIHide: function(delay) {
            var me = this;
            if (!delay) delay = 0;

            // var y = me.yMax * me.showRate;
            var hideTime=250;//隐藏掉的动画 完成时间

            var delayHideTimer=setTimeout(function() {
                // 列表主体下拉
                me.$body.css({
                    'transition': 'all '+hideTime+'ms linear'
                    ,'-webkit-transition': 'all '+hideTime+'ms linear'
                    ,'transform': 'translate3d(0px,'+me.loadingHolderHeight/100+'rem, 0px)'
                    ,'-webkit-transform': 'translate3d(0px,'+me.loadingHolderHeight/100+'rem, 0px)'
                });
                //箭头下拉
                var arrowHideTime=125;
                me.$ui_pullArrowBox.css({
                    'transition': 'all '+arrowHideTime+'ms linear'
                    ,'-webkit-transition': 'all '+arrowHideTime+'ms linear'
                    ,'margin-top': (me.loadingHolderHeight-me.arrowHeight-me.arrowMarginBottom)*(hideTime/arrowHideTime)/100+"rem"
                    ,'transform': 'scale(0)'
                });


                var hideTimer=setTimeout(function(){
                    me.$body.css({'transition':''});
                    me.showRate = me.loadingHolderHeight/me.yMax;
                    me.$ui_pullArrowBox.css({'transition':'','transform':'none'});
                    me.effect_pullArrow.hide();
                    me.$ui_tip.html(me.tip_pull);
                    clearTimeout(hideTimer);
                },hideTime);
                clearTimeout(delayHideTimer);
            }, delay);
        },
        pullArrowUICancel: function(delay) {
            var me = this;
            if (!delay) delay = 0;
            me.showRate = 0;
            var hideTime=250;//隐藏掉的动画 完成时间

            var delayHideTimer=setTimeout(function() {
                // 列表主体下拉
                me.$body.css({
                    'transition': 'all '+hideTime+'ms linear'
                    ,'-webkit-transition': 'all '+hideTime+'ms linear'
                    ,'transform': 'translate3d(0px,0px, 0px)'
                    ,'-webkit-transform': 'translate3d(0px,0px, 0px)'
                });
                //箭头下拉
                me.$ui_pullArrowBox.css({
                    'transition': 'all '+hideTime+'ms linear'
                    ,'-webkit-transition': 'all '+hideTime+'ms linear'
                    ,'margin-top': (me.yMax*me.showRate-me.arrowHeight-me.arrowMarginBottom)/100+"rem"
                });

                var hideTimer=setTimeout(function(){
                    
                    me.$uiBox.addClass("hidden");
                    me.$effectBox.addClass("hidden");
                    me.$body.css({'transition':''});
                    me.$ui_pullArrowBox.css({'transition':'','transform':'none'});
                    me.effect_pullArrow.hide();
                    me.$ui_tip.html(me.tip_pull);
                    clearTimeout(hideTimer);
                },hideTime);
                clearTimeout(delayHideTimer);
            }, delay);
        },
        pullLoadingUIHide: function(delay) {
            var me = this;
            me.$body.css({'transition':''});
            if (!delay) delay = 0;
            var hideTime=250;//隐藏掉的动画 完成时间

            // var delayHideTimer=setTimeout(function() {
            //     // 页面主体下拉
            //     me.$body.css({
            //         'transition': 'all '+hideTime+'ms linear'
            //         ,'-webkit-transition': 'all '+hideTime+'ms linear'
            //         ,'transform': 'translate3d(0px,0rem, 0px)'
            //         ,'-webkit-transform': 'translate3d(0px,0rem, 0px)'
            //         // ,'-webkit-transform': 'translate3d(0px,' + y + 'px, 0px)'
            //             // ,'-webkit-transform': 'translate3d(0px,' + y + 'px, 0px)'
            //     });

            //     var hideTimer=setTimeout(function(){
            //         me.$body.css({'transition':''});
            //         me.showRate = 0;
            //         me.effect_loading.hide();
            //         me.$uiBox.addClass("hidden");
            //         me.$effectBox.addClass("hidden");
            //         // me.$effectBox.addClass("hidden");
            //         // me.$ui_tip.html(me.tip_pull);
            //         clearTimeout(hideTimer);
            //     },hideTime);
            //     clearTimeout(delayHideTimer);
            // }, delay);
        }
    }

    return PullDownRefresh
})();

window.PullDownRefresh = PullDownRefresh;




/*
 * pull-arrow动画
 * 依赖：
 * zepto/jquery
 * 参数：
 * boxSlct //loading动画的base父容器 默认 'body'
 * demo：
 * new PullArrow({boxSlct:"body"}).show().go();
 */


;
const PullArrow = (function() {
    function  PullArrow(opt) { //构造函数
        if (opt) $.extend(this, opt);

    }
    PullArrow.prototype = { //类方法
        boxSlct: 'body',//PullArrow 基准父容器选择器
        $box:null,//同时支持传入$box  优先级最高
        $ele: null,
        style:"",
        isShow:false,
        isGo:false,
        html: '<div class="pull-arrow"></div>',
        show: function() {
            var me=this;
            // console.log(me.$ele,me.isShow);
            if(!me.$ele){
                var spn=$(me.html);
                me.$box= me.$box || $(me.boxSlct);
                me.$box.append(spn);
                me.$ele=spn;
                spn.attr("style",me.style);
                me.isShow=true;
            }else{
                if(!me.isShow){
                    me.$ele.removeClass("hidden");
                }
            }
            me.isShow=true;
            return me;
        },
        hide: function() {
            this.stop();
            this.$ele.addClass("hidden");
            this.isShow=false;
            return this;
            // delete this;//日后可能需要优化
        },
        remove:function(){
            this.$ele.remove();
        },
        go: function() {
            this.$ele.addClass("go");
            this.isGo=true;
            return this;
        },
        stop:function () {
            this.$ele.removeClass("go");
            this.isGo=false;
            return this;
        }
    }

    return PullArrow;
})();


window.PullArrow = PullArrow;


