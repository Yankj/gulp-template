let config = {
    src: 'src/',
    temp: 'temp/',
    dist: 'dist/',
    devHost: "",
    startPath: '/view/index.html', //自行修改
    buryPointSwitch: true, //是否埋点
    isImgOptmize: false, //是否开启图片压缩
    cdnPath: '//ink_wf.cdn.sohusce.com/club-h5/', //自行修改
    sce: {
        manageUrl: 'https://console.sce.sohuno.com/apps/versions?appid=',
        dev: {
            proxyTable: {
                backend1: 'ink-club-test.sce.sohuno.com', //自行修改
                backend2: 'ink-club2-test.sce.sohuno.com'
            }
        },
        test: {
            appId: 918901818, //自行修改
            appToken: '3f592aea565b2b738e11d9ee6eacf485', //自行修改
            proxyTable: {
                backend1: 'ink-club-test.sce.sohuno.com', //自行修改
                backend2: 'ink-club2-test.sce.sohuno.com'
            }
        },
        product: {
            appId: 589712534, //自行修改
            appToken: 'd737b9d40351f68b28b065dd7fd57aa3', //自行修改
            proxyTable: {
                backend1: 'ink-club.sce.sohuno.com', //自行修改
            }
        }
    }
}
module.exports = config