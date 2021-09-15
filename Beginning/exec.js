const exec = require('child_process').exec;

var process = exec('ls');

// 성공적인 결과는 stdout에서 실패한 결과는 stdderr에서 버퍼형태로 전달
process.stdout.on('data',function(data){
    console.log(data.toString());
}); // 실행 결과

process.stderr.on('data',function(data){
    console.error(data.toString());
}); // 에러 출력