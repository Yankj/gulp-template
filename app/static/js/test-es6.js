var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var asyncPrint = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value, ms) {
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return timeout(ms);

					case 2:
						//这里是阻塞的
						console.log(value);

					case 3:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function asyncPrint(_x3, _x4) {
		return _ref.apply(this, arguments);
	};
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*
	ES6 新增常用属性测试
 */

// 1、arrow function
var f = function f() {
	console.log(123);
};

// 2、Promise    IOS safari>=8 Android>=4.4.4
var ajax = function ajax() {
	return new Promise(function (res) {
		setTimeout(function () {
			res();
		}, 1000);
	});
};

// 3、解构赋值
var obj = {
	a: 1,
	b: 'str',
	c: true
};

var _obj = _slicedToArray(obj, 2),
    a = _obj[0],
    b = _obj[1];

// 4、模板字符串


var s = 'world!';
var str1 = 'hello ' + s;

// 5、函数默认参数
var f1 = function f1() {
	var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

	console.log(a, b);
};
f(2);

// 6、rest参数  ...  只能作为最后一个参数
var fu = function fu() {
	for (var _len = arguments.length, value = Array(_len), _key = 0; _key < _len; _key++) {
		value[_key] = arguments[_key];
	}

	console.log(value);
};
fu(1, 2, 3, 4);

// 7、数组扩展
// Array.from 对象转数组(有length属性的对象都行)
var arrayLike = {
	'0': 'a',
	'1': 'b',
	'2': 'c',
	length: 3
};
console.log(Array.from(arrayLike));
// 可解决中文算两个长度bug
function countSymbols(string) {
	return Array.from(string).length;
}
console.log('风之化身.length=', countSymbols('风之化身')); //4
// Array.of  将所传参数转为数组
Array.of(3, 11, 8); // [3, 11, 8]

// 数组实例方法includes,findIndex
var b1 = [1, 5, 10, 15].findIndex(function (value, index, arr) {
	return value > 9;
});

var c = [1, 5, 10, 15].includes(5);
console.log(b1, c); // 2 true

// 8、对象扩展
// Object.is 与===基本一致，除了+0===-0  NaN===NaN
console.log(+0 === -0); //true
console.log(NaN === NaN); // false
console.log(Object.is(+0, -0)); // false
console.log(Object.is(NaN, NaN)); // true

// Object.assign  对象的合并 浅拷贝，属性合并
// 用途：1、给对象添加属性方法；2、设置默认值；3、对象合并


// 9、异步函数
function timeout(ms) {
	return new Promise(function (resolve) {
		setTimeout(resolve, ms);
	});
}

asyncPrint('hello world', 5000); //这里非阻塞
console.log('你好啊');