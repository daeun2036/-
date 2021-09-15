const {odd,even} = require('./var'); //모듈 경로

function checkOddOrEven(num){
    if(num%2) return odd; //홀수
    return even; //짝수
}

module.exports = checkOddOrEven;