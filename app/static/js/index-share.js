/**
 * @Author   冯银超
 * @DateTime 2017-11-23
 * 观察者模式 && 适配器模式
 */

(function() {
	// 二次分享
	var TwiceShare = {
		init: function(title) {
			var config = {
				title: title,
				summary: '发现一篇美文，分享给爱记录爱创作的你',
				pic: 'https://ink_wf.cdn.sohusce.com/h5/img/icon-share.png?1',
				url: location.href,
				timelineTitle: title.substring(0, 47) + '-搜狐墨客',
				success: function() {
					mixpanel.track(
						"h5_shareClub_article.share", {
							articleId: Util.getQS('feed_id'),
							sharerId: Util.getQS('uid')
						}
					);
				}
			}
			iShare.initShare(config);
		}
	};
	var Util = {
		getQS: function(event) {
			var e = new RegExp("(^|&)" + event + "=([^&]*)(&|$)");
			var n = decodeURIComponent(window.location.search.substr(1)).match(e);
			return null != n ? n[2] : null
		},
		isPC: function() {
			var userAgentInfo = navigator.userAgent;
			var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
			var flag = true;
			for (var v = 0; v < Agents.length; v++) {
				if (userAgentInfo.indexOf(Agents[v]) > 0) {
					flag = false;
					break;
				}
			}
			return flag;
		},
		openLink: function(url) {
			var e = document.createEvent('MouseEvent');
			var aTag = document.createElement('a');
			e.initEvent('click', false, false);
			aTag.setAttribute('href', url);
			// document.body.appendChild(aTag); // 遇上兼容问题在放开
			aTag.dispatchEvent(e);
			aTag.remove();
		},
		formatTime: function(timeStamp) { //timeStamp是unix时间戳
			if (timeStamp) {
				var o = new Date(timeStamp * 1000);
				return o.getFullYear() + '年' + (o.getMonth() + 1) + '月' + o.getDate() + '日';
			}
		}
	};
	var Ink = {
		buildScope: function(article) {
			// 遍历content段落数组，解析全局信纸ID，全局字体大小。构造每一个段落块的css样式
			var scope = {
				title: article.meta.title,
				timeStamp: Util.formatTime(article.meta.display_time),
				scale: article.meta.articleScale,
				coverImageURL: '',
				stationeryID: '',
				globalFontSize: '',
				globalFontsID: ''
			};
			var content = article.content.map(function(data) {
				if (data.block_style) {
					data.block_style = JSON.parse(data.block_style);
				}
				var block = {
					type: 'Text',
					imageURL: '#',
					width: Number(data['block_style'] && data['block_style']['width']),
					height: Number(data['block_style'] && data['block_style']['height']),
					classList: '',
					cssText: ''
				};
				switch (data['block_type']) {
					// console.log(data);
					case 2:
						block['type'] = 'Title';
						block['imageURL'] = data['img_url'];
						scope.coverImageURL = data['img_url'] ? data['img_url'] : '#';
						scope.stationeryID = data['block_style']['stationeryID']; // 全局信纸ID，一篇文章有且只有一个 block 的 type 为 2
						scope.globalFontSize = Number(data['block_style']['globalFontSize']);
						scope.globalFontsID = Number(data['block_style']['globalFontsID']);
						break;
					case 1:
						// debugger;
						block['type'] = 'Image';
						block['imageURL'] = data['img_url'] || '#';
						block['desc'] = data['block_content'];
						break;
					default:
						block['type'] = 'Text';
						block['content'] = data['block_content'] || '';
						if (data['block_style'] && data['block_style']['isQuote']) {
							block.quoteStyle = 'height:100%;';
						}
				}
				block.classList += Ink.buildClassList(data['block_style']);
				block.cssText += Ink.computeStyle(data['block_style']);
				return block;
			});
			scope.content = content;
			return scope;
		},
		// BlockStyle
		computeStyle: function(blockStyle) {
			var cssText = '';
			var color = '';
			if (blockStyle && blockStyle['textColor']) {
				color = blockStyle['textColor'] || '';
				color = color.replace('0x', '#').replace('0X', '#');
				color = color.charAt(0) === '#' ? color : '#' + color;
				cssText += ' color: ' + color + '; ';
			}
			return cssText;
		},
		buildClassList: function(styleObject) {
			// var styleObject = JSON.parse(blockStyle);
			// console.log(styleObject);
			if (styleObject != null) {
				var classList = '';
				// debugger;
				if (styleObject['isQuote']) {
					classList += ' qute ';
				}

				if (styleObject['textAlignment']) {
					classList += ' textAlignment' + styleObject['textAlignment'] + ' ';
				}

				if (styleObject['fontSize']) {
					classList += ' fontSize' + styleObject['fontSize'] + ' ';
				}

				if (styleObject['fontsID']) {
					classList += styleObject['bold'] ?
						(' font-family' + styleObject['fontsID'] + '__bold ') :
						(' font-family' + styleObject['fontsID'] + ' ');
				}
			}
			return classList;
		},
		// 加载信纸
		loadStationery: function(selector, stationeryID) {
			var dir;
			if (!stationeryID) return;
			dir = Number(stationeryID) < 0 ? ('p' + stationeryID) : ('' + stationeryID);
			// debugger;
			$.getJSON('../static/stationery/' + dir + '/config.json', function(data) {
				var ua = navigator.userAgent;
				var wrapperBGImg = '';
				var paddingBottom;
				// console.log(data);
				//文章时间的颜色
				$('.title-box .time').css({
					"color": data['dateColor'].replace(/0x/, '#'),
				});
				//引用文字  引用线的颜色
				$('.qute .before').css({
					'background-color': data['quoteLineColor'].replace(/0x/, '#'),
				});

				if (data['header']) {
					wrapperBGImg += 'url("../static/stationery/' + dir + '/375/header.png") center 0 no-repeat,';
				}

				if (data['footer']) {
					wrapperBGImg += 'url("../static/stationery/' + dir + '/375/footer.png") center bottom no-repeat,';
				}

				if (data['middle']) {
					wrapperBGImg += 'url("../static/stationery/' + dir + '/375/middle.png") center top repeat-y';
				}

				if (ua.match("Android") || /(iPhone|iPad|iPod|iOS)/i.test(ua)) {
					paddingBottom = Number(data['footerHeight']);
				} else {
					paddingBottom = Number(data['footerHeight']) * 2;
				}

				//信纸底部留空间 设置信纸背景图
				$(selector).css({
					'padding-bottom': paddingBottom + 'px',
					'background': wrapperBGImg,
					'background-size': 'contain, contain, contain',
				});
				// console.log(data);
				// console.log(this.data);
				if (!$('.cover-img').length) {
					$(selector).css({
						'padding-top': Math.floor(Number(data['headerHeight']) * globalScale) + 'px', //Ink.metadata.articleScale
					});
				};
			})
		},
		// 加载字体
		loadTypeface: function(typeface) {
			// debugger;
			if (!typeface || 'object' !== typeof typeface) return;
			var cssText = '',
				style;
			Object.keys(typeface).forEach(function(key) {
				var f = typeface[key];
				var clazz = '.' + key + ' {font-family: "' + f['regular_name'] + '";} .' + key + '__bold {font-family: "' + f['bold_name'] + '";}';
				var bold = '@font-face {font-family: ' + f['bold_name'] + '; src: url("' + f['bold_url'] + '"); font-weight: normal; font-style: normal;}';
				var regular = '@font-face {font-family: ' + f['regular_name'] + '; src: url("' + f['regular_url'] + '"); font-weight: normal; font-style: normal;}';
				cssText += bold;
				cssText += regular;
				cssText += clazz;
			});
			if (cssText) {
				style = document.createElement('style');
				style.innerText = cssText;
				document.querySelector('head').appendChild(style);
			}
		},
		// 复制属性
		copyProp: function(from, to) {
			Object.keys(from).forEach(function(p) {
				to[p] = from[p];
			})
		},
		getFixedArticle: function(article) {
			var data_original = {};
			if (article.data.type == 1) {
				data_original = article.data.article_data;
				var metadata, articleRect, availWidth, fontInfo;
				availWidth = window.screen.availWidth || document.documentElement.clientWidth;
				articleRect = data_original['device_info'] || {
					width: 375,
					height: 667,
					scale: 2
				};
				fontInfo = data_original['font_info'];
				metadata = {
					articleRect: articleRect,
					articleScale: availWidth > 680 ? (680 / articleRect['width']) : (availWidth / articleRect['width']),
					typeface: fontInfo,
				};
				globalScale = metadata.articleScale;
				this.copyProp(metadata, data_original.meta);
				// debugger;
				data_original = this.buildScope(data_original);
				data_original.articleId = article.data.article_id || null;
			}
			data_original.userId = article.data.user_id || null;
			data_original.avatar = article.data.avatar;
			data_original.nickname = article.data.nickname;
			data_original.title = article.data.title;
			data_original.type = article.data.type;
			data_original.data = article.data;
			this.loadStationery('#ink-wrapper', data_original.stationeryID);
			// 字体的加载会阻塞界面的渲染，必须最后加载字体
			this.loadTypeface(fontInfo);
			return data_original;
		}
	};
	var Page = {
		feed_id: Util.getQS('feed_id'),
		$content: $('#content'),
		$aside: $('aside'),
		$section: $('section'),
		template: {
			author: $('#author').html(),
			h5: $('#article-h5').html(),
			pic: $('#article-pic').html(),
			err: $('#error').html()
		},
		init: function() {
			this.getArticleData(this.feed_id);
			this.watchEvent();
			this.bindEvent();
		},
		bindEvent: function() {
			// 埋点(2017/9/27新增 冯银超)
			try {
				var shareId = Util.getQS('uid');
				// 1、页面展现次数统计 
				mixpanel.track(
					"h5_shareClub_article.pv", {
						articleId: this.feed_id,
						sharerId: shareId
					}
				);
			} catch (error) {
				console.log('脚本加载出问题了' + error);
			}
			this.$content.on("click", ".top-banner div span.download", function(event) {
				// 2、顶栏立即下载点击次数
				mixpanel.track(
					"h5_shareClub_article_top.click", {
						articleId: this.feed_id,
						sharerId: shareId
					}
				);
				setTimeout(function() {
					Util.openLink('http://ink-promo.sohusce.com/itunes/?guid=52c66b09131a');
				}, 300);

			});
			this.$content.find("footer >div.download img").on("click", function(event) {
				// 3、底栏立即进入点击次数
				mixpanel.track(
					"h5_shareClub_article_bottom.click", {
						articleId: this.feed_id,
						sharerId: shareId
					}
				);
				setTimeout(function() {
					Util.openLink('http://ink-promo.sohusce.com/itunes/?guid=52c66b09131a');
				}, 300);
			});
		},
		watchEvent: function() {
			var _this = this;
			// 文章正常加载 200
			window.addEventListener('inkArticleLoaded', function(event) {
				var articleModel = _this.articleModelAdapter(event.data);
				// 以userId是否存在判断该文章是否能展示(文章不能展示时，不显示作者信息)
				if (articleModel.userId) {
					_this.render(_this.$aside, _this.template.author, articleModel);
					// type=1代表投稿为H5,否则代表投稿为图片
					if (articleModel.type == 1) {
						_this.render(_this.$section, _this.template.h5, articleModel);
					} else {
						var imgs = articleModel.data.images,
							width = 0,
							fontSize = parseInt(document.documentElement.style.fontSize),
							ratio = 1;
						_this.render(_this.$section, _this.template.pic, articleModel.data);
						if (!Util.isPC()) {
							$.each(imgs, function(index, value) {
								debugger;
								width = parseInt(value.width);
								ratio = 6.94 * fontSize / width;
								$($('#content article section .img')[index]).css("height", parseInt(value.height) * ratio);
							});
						} else {
							$.each(imgs, function(index, value) {

								width = parseInt(value.width);
								ratio = 688 / width;
								$($('#content article section .img')[index]).css("height", parseInt(value.height) * ratio)
							});
						}

					}
					console.log(articleModel);
					var title = articleModel.title + '-' + articleModel.nickname;
					TwiceShare.init(title);
				} else {
					_this.render(_this.$section, _this.template.err, {
						error: '该文章已被下架或删除'
					});
				}
			});
			// 文章被举报 403
			window.addEventListener('inkArticleForbidden', function(event) {
				_this.render(_this.$section, _this.template.err, {
					error: '该文章已被举报!'
				});
			});
			// 文章不存在 404
			window.addEventListener('inkArticleNotFound', function(event) {
				_this.render(_this.$section, _this.template.err, {
					error: '该文章不存在!'
				});
			});
			// 接口异常 500
			window.addEventListener('inkApiError', function(event) {
				_this.render(_this.$section, _this.template.err, {
					error: '文章加载失败，刷新重试!'
				});
			});
			// 请求超时 timeout
			window.addEventListener('inkApiTimeout', function(event) {
				_this.render(_this.$section, _this.template.err, {
					error: '文章加载失败，刷新重试!'
				});
			});
		},
		getArticleData: function(id) {
			$.ajax({
				url: "../backend/feeds/" + id + "/",
				type: "GET",
				dataType: "json",
				timeout: 30000,
				success: function(data) {
					switch (data.status) {
						case 200:
							var ev = new Event('inkArticleLoaded');
							ev.data = data;
							window.dispatchEvent(ev);
							break;
						case 403:
							window.dispatchEvent(new Event('inkArticleForbidden'));
							break;
						case 404:
							window.dispatchEvent(new Event('inkArticleNotFound'));
							break;
						default:
							window.dispatchEvent(new Event('inkApiError'));
					}
				},
				error: function(xhr, status) {
					console.log('接口状态：' + status);
					if (status == 'timeout') {
						window.dispatchEvent(new Event('inkApiTimeout'));
					}
				}
			});
		},
		articleModelAdapter: function(data) {
			return Ink.getFixedArticle(data);
		},
		render: function(target, tmpl, data) {
			target.html(doT.template(tmpl)(data));
		}
	};
	Page.init();
})()