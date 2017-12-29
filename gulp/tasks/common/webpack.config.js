const HtmlCriticalPlugin = require("html-critical-webpack-plugin");
const path = require('path');
module.export = {
	entry: {
		app: path.join(path.resolve(__dirname), '../../dist/sce/app/view/index.html')
	},
	output: {
		path: path.join(path.resolve(__dirname), '../../dist/sce/app'),
		filename: 'a.html'
	},
	plugins: [
		new HtmlCriticalPlugin({
			base: path.join(path.resolve(__dirname), '../../dist/sce/app'),
			src: 'view/index.html',
			dest: 'index.html',
			inline: true,
			minify: true,
			extract: true,
			width: 375,
			height: 565,
			penthouse: {
				blockJSRequests: false,
			}
		})
	]
};