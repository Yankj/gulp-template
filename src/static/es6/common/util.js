/****
 *  -------------------------
 *  utils （V1.0）
 *  Author: 搜狐社交产品中心FE
 *  Help: yankunjie
 *  -------------------------
 * */

const Util = (() => {
    const ua = navigator.userAgent;
    const Util = {

        /***
         * 判断当前ua
         * **/

        ua: {
            pcdev: navigator.platform == "Win32",//开发模式(暂认为windows pc为开发)
            mobile: !!ua.match(/(iPhone|iPad|iPod|iOS|android)/i),
            ios: ua.match(/OS ([\d_]+) like Mac OS X/),//版本格式9_1
            android: ua.match(/Android ([\d.]+)/),
            uc: ua.match(/UCBrowser[\/\s]?([\w\.]+)/i),
            samsung: ua.match(/SamsungBrowser\/([\d.]+)/),
            sohunews: ua.match(/SohuNews\/([\d.]+)/),
            sohusns: ua.match(/SohuSNS\/([\d.]+)/),
            weibo: ua.match(/__weibo__([\d.]+)/), // 新浪微博
            weixin: ua.match(/MicroMessenger\/([\d.]+)/), // 微信
            qq: ua.match(/QQ\/([\d.]+)/) // qq
        },

        /***
         * @param1 序列化的参数   a=1&b=2
         * @param2 需要获取的key   a
         * return  value    1
         * */

        getQS (search, name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = decodeURIComponent(search).match(reg);
            if (r !== null) return r[2];
            return null;
        },

        /***
         * @param 序列化的参数   a=1&b=2
         * return  {a:1,b:2}
         * */

        getParams (search) {
            var object = {}, kvArr = [];
            if (!search)  return object;
            var arr = search.split("&");
            if (arr.length) {
                for (var i = 0; i < arr.length; i++) {
                    kvArr = arr[i].split("=");
                    if (kvArr.length === 2) {
                        object[kvArr[0]] = kvArr[1];
                    }
                }
            }
            return object;
        },

        /**
         * 向url中追加参数并返回
         * @key 参数名
         * @val 值
         * */

        getUrlAfterAppend (key, val) {
            var searchStr = location.search, url = location.href;
            if (new RegExp("([?]|&)" + key + "=*([^&]*)(&|$)").test(url)) {//已有此参数
                url = url.replace(new RegExp("([?]|&)" + key + "=*([^&]*)(&|$)"), "$1" + key + "=" + val + "$3");
            } else {
                url += (searchStr.slice(0, 1) == "?" ? "&" : "?") + key + "=" + val;
            }
            return url;
        },

        /**
         * 将获取到的html模板字符串中 自动转义的字符 取消转移
         * 比如>被转&gt;
         * */

        htmlDecode (str) {
            var s = "";
            if (str.length === 0) return "";
            s = str.replace(/&amp;/g, "&");
            s = s.replace(/&lt;/g, "<");
            s = s.replace(/&gt;/g, ">");
            s = s.replace(/&nbsp;/g, " ");
            s = s.replace(/&#39;/g, "\'");
            s = s.replace(/&quot;/g, "\"");
            // s = s.replace(/<br>/g, "\n");

            return s;
        },

        /***
         * 节流函数
         * @method  需要节流后执行的方法
         * @context 方法执行时的作用域
         * @args    方法执行时的参数
         * */

        throttle (method, context, args) {
            clearTimeout(method.tId);
            method.tId = setTimeout(function () {
                method.call(context, args);
            }, 300);
        }

    }

    return Util
})()

export default Util
