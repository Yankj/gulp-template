let config = {
	src: 'src/',
	temp: 'temp/',
	dist: 'dist/',
    devHost: '',//dev.w.sohu.com
	startPath: '/view/index.html', //自行修改
	buryPointSwitch: false, //是否埋点
	isImgOptmize: false, //是否开启图片压缩
	cdnPath: '//ink_wf.cdn.sohusce.com/club-h5/', //自行修改
	sce: {
		manageUrl: '//console.sce.sohuno.com/apps/versions?appid=',
		path: 'config/sce/',
		yamlPath: 'config/sce/app.yaml',
		appPath: 'config/sce/app/',
		confPath: 'config/sce/conf/',
		dev: {
			proxyTable: {
				backend1: 'ink-club-test.sce.sohuno.com', //自行修改
			}
		},
		test: {
			appId: 918901818, //自行修改
			appToken: '3f592aea565b2b738e11d9ee6eacf485', //自行修改
			sceHost: '//ink-club-test.sce.sohuno.com', //自行修改
			proxyTable: {
				backend1: 'ink-club-test.sce.sohuno.com', //自行修改
			}
		},
		product: {
			appId: 589712534, //自行修改
			appToken: 'd737b9d40351f68b28b065dd7fd57aa3', //自行修改
			sceHost: '//ink-club.sce.sohuno.com', //自行修改
			proxyTable: {
				backend1: 'ink-club.sce.sohuno.com', //自行修改
			}
		}
	}
}

module.exports = config