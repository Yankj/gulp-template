// arrow function
// let f = () => {
// 	console.log(123);
// }

// Promise IOS safari>=8 Android>=4.4.4
let ajax = () => {
	return new Promise(res => {
		setTimeout(() => {
			res()
		}, 1000);
	})
}

// 解构赋值
// const obj = {
// 	a: 1,
// 	b: 'str',
// 	c: true
// };

// let [a, b] = obj;