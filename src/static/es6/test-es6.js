/*
	ES6 新增常用属性测试
 */

// 1、arrow function
const f = () => {
	console.log(123);
};

// 2、Promise    IOS safari>=8 Android>=4.4.4
const ajax = () => {
	return new Promise(res => {
		setTimeout(() => {
			res();
		}, 1000);
	});
};

// 3、解构赋值
const obj = {
	a: 1,
	b: 'str',
	c: true
};
const [a, b] = obj;

// 4、模板字符串
const s = 'world!';
const str1 = `hello ${s}`;

// 5、函数默认参数
const f1 = (
	a = 1,
	b = 2
) => {
	console.log(a, b);
};
f(2);

// 6、rest参数  ...  只能作为最后一个参数
const fu = (...value) => {
	console.log(value);
};
fu(1, 2, 3, 4);

// 7、数组扩展
// Array.from 对象转数组(有length属性的对象都行)
const arrayLike = {
	'0': 'a',
	'1': 'b',
	'2': 'c',
	length: 3
};
console.log(Array.from(arrayLike));
// 可解决中文算两个长度bug
function countSymbols(string) {
	return Array.from(string).length;
};
console.log('风之化身.length=', countSymbols('风之化身')); //4
// Array.of  将所传参数转为数组
Array.of(3, 11, 8); // [3, 11, 8]

// 数组实例方法includes,findIndex
const b1 = [1, 5, 10, 15].findIndex((value, index, arr) => {
	return value > 9;
});

const c = [1, 5, 10, 15].includes(5);
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
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
};
async function asyncPrint(value, ms) {
	await timeout(ms); //这里是阻塞的
	console.log(value);
};
asyncPrint('hello world', 5000); //这里非阻塞
console.log('你好啊');