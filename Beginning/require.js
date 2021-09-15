// console.log('require가 가장 위에 오지 않아도 됩니다.');

// module.exports = 'please find me';

// require('./var');

// console.log('it is require.cache');
// console.log(require.cache);
// console.log('it is require.main');
// console.log(require.main===module);
// console.log(require.main.filename);

console.log('require가 가장 위에 오지 않아도 됩니다.');

module.exports = '저를 찾아보세요.';

require('./var');

console.log('require.cache입니다.');
console.log(require.cache);
console.log('require.main입니다.');
console.log(require.main === module);
console.log(require.main.filename);