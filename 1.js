
const array = [{age: 20}, {age: 30}, {age: 40}];

const find = array.find(item => item.age === 30);

find.age = 31;

console.log(array);