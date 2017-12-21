"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// arrow function
// let f = () => {
// 	console.log(123);
// }

// Promise IOS safari>=8 Android>=4.4.4
var ajax = function ajax() {
	return new _promise2.default(function (res) {
		setTimeout(function () {
			res();
		}, 1000);
	});
};

// 解构赋值
// const obj = {
// 	a: 1,
// 	b: 'str',
// 	c: true
// };

// let [a, b] = obj;