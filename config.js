let config = {
    src: 'src/',
    temp: 'temp/',
    dist: 'dist/',
    devHost: "",
    startPath: '/view/index.html', //自行修改
    buryPointSwitch: false, //是否埋点
    isImgOptmize: false, //是否开启图片压缩
    cdnPath: '//sns_lib.cdn.sohusce.com/huui/', //自行修改
    sce: {
        manageUrl: 'https://console.sce.sohuno.com/apps/versions?appid=',
        dev: {
            proxyTable: {
                backend1: '', //自行修改
                backend2: ''
            }
        },
        test: {
            appId: 724887709, //自行修改
            appToken: '3f592aea565b2b738e11d9ee6eacf485', //自行修改
            proxyTable: {
                backend1: '', //自行修改
                backend2: ''
            }
        },
        product: {
            appId: '', //自行修改
            appToken: 'd737b9d40351f68b28b065dd7fd57aa3', //自行修改
            proxyTable: {
                backend1: '', //自行修改
            }
        }
    }
}
module.exports = config