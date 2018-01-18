/*
 * loading动画
 * 依赖：
 * zepto/jquery
 * 参数：
 * boxSlct //loading动画的base父容器 默认 'body'
 * demo：
 * new Loading({boxSlct:"body"}).show().go();
 */


;
const Loading = (function() {   
    function  Loading(opt) { //构造函数
        if (opt) $.extend(this, opt);
            
    }    
    Loading.prototype = { //类方法
        boxSlct: 'body',//loading 基准父容器选择器
        $box:null,//同时支持传入$box  优先级最高
        $ele: null,
        style:"",
        isShow:false,
        isGo:false,
        // html: '\
        //     <div class="u-loading"><svg class="svg-loading" width="100%" height="100%" viewBox="0 0 100 100">\
        //            <circle class="c1" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-dasharray="101.4 130" stroke-dashoffset="0" stroke="#b1b1b1"/>\
        //            <circle class="c2" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-dasharray="15.6 130" stroke-dashoffset="29" stroke="#c7c7c7"/>\
        //     </div></svg>\
        html: '<div class="u-pulldown-loading"><img style="width: 100%;height: 100%" src="/static/img/loading.svg"/></div>',
        init: function() {
            var me=this;
            if(!me.$ele){
                var spn=$(me.html);
                me.$box= me.$box || $(me.boxSlct);
                me.$box.append(spn);
                me.$ele=spn;
                spn.attr("style",me.style);
                spn.addClass("hidden");
            }
            return me;
        },
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
            // me.$ele = $('.spinner[flag="' + me.flag + '"]'); 
            // $(".spinner").attr("flag", me.flag);
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
    return Loading
})();

window.Loading = Loading;