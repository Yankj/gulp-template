let config = {
	src: 'app/',
	startPath: '/view/ink-share.html', //自行修改
	dest: 'dist/',
	cdnPath: '//ink_wf.cdn.sohusce.com/club-h5/', //自行修改
	sce: {
		manageUrl: '//console.sce.sohuno.com/apps/versions?appid=',
		path: 'sce/',
		yamlPath: 'sce/app.yaml',
		appPath: 'sce/app/',
		confPath: 'sce/conf/',
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