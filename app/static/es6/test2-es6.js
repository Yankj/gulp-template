// 字符串扩展 includes,startWith,endWidth,模板字符串
let str = 'ink-club-test-h5/';
console.log(str.includes('ink-club-test'));
console.log(str.startsWith('ink'));
console.log(str.endsWith('h5/'));
// 模板字符串
// let s = 'world!';
// let str1 = `hello ${s}`;

// // 函数默认参数
// const f = (
// 	a = 1,
// 	b = 2
// ) => {
// 	console.log(a, b);
// }
// f(2);

// // rest参数  ...  只能作为最后一个参数
// const fu = (...value) => {
// 	console.log(value);
// }
// fu(1, 2, 3, 4);

// // 数组扩展
// Array.from 对象转数组(有length属性的对象都行)
let arrayLike = {
	'0': 'a',
	'1': 'b',
	'2': 'c',
	length: 3
};
console.log(Array.from(arrayLike));
// // 可解决中文算两个长度bug
// function countSymbols(string) {
// 	return Array.from(string).length;
// }
// console.log('风之化身.length=', countSymbols('风之化身'));
// // Array.of  将所传参数转为数组
// // Array.of(3, 11, 8) // [3, 11, 8]

// // 数组实例方法includes,findIndex
// let b = [1, 5, 10, 15].findIndex((value, index, arr) => {
// 	return value > 9;
// })

// let c = [1, 5, 10, 15].includes(5)
// console.log(b, c); // 2 true

// // 对象扩展
// // Object.is 与===基本一致，除了+0===-0  NaN===NaN
// console.log(+0 === -0) //true
// console.log(NaN === NaN) // false
// console.log(Object.is(+0, -0)) // false
// console.log(Object.is(NaN, NaN)) // true

// // Object.assign  对象的合并 浅拷贝，属性合并
// // 用途：1、给对象添加属性方法；2、设置默认值；3、对象合并


// // 异步函数

// function timeout(ms) {
// 	return new Promise((resolve) => {
// 		setTimeout(resolve, ms);
// 	});
// }

// async function asyncPrint(value, ms) {
// 	await timeout(ms); //这里是阻塞的
// 	console.log(value);
// }

// asyncPrint('hello world', 5000); //这里非阻塞

// console.log('你好啊');