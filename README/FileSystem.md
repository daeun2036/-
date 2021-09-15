## 파일 시스템
- fs 모듈을 사용하여 파일 시스템에 접근
- 파일을 생성, 삭제, 읽기, 쓰기 가능    

### 1. 파일 읽기
~~~js
const fs = require('fs');

// 파일 경로 지정(콘솔 위치 기준)
fs.readFile('./readme.txt', (err, data) => { // 읽은 후 실행될 콜백 함수
  if (err) {
    throw err;
  }
  console.log(data); // readFile결과물은 buffer형식
  console.log(data.toString());
});
~~~

기본적으로 콜백 형식의 모듈이므로 프로미스 형식으로 바꿔주는 방법을 사용
~~~js
const fs = require('fs').promises;

fs.readFile('./readme.txt')
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => {
    console.error(err);
  });
~~~

### 2. 파일 생성
~~~js
const fs = require('fs').promises;

// writeFile(파일 경로, 내용)
fs.writeFile('./writeme.txt', '글이 입력됩니다')
.then(() => {
  return fs.readFile('./writeme.txt');
})
.then((data) => {
  console.log(data.toString());
})
.catch((err) => {
  console.error(err);
});
~~~

### 3. 동기 & 비동기 메서드
- 대부분의 메서드는 비동기 방식으로 처리
- fs모듈에는 동기 방식으로 처리하는 많은 메서드를 가지고 있음
~~~js
const fs = require('fs');

console.log('시작');
fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('1번', data.toString());
});
fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('2번', data.toString());
});
fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('3번', data.toString());
});
console.log('끝');
~~~
- 결과
~~~
$ node async
시작
끝
2번 저를 여러 번 읽어보세요.
3번 저를 여러 번 읽어보세요.
1번 저를 여러 번 읽어보세요.
~~~
비동기 메서드들은 백그라운드에 해당 파일을 읽으라고만 요청하고 다음 작업으로 넘어간다. 따라서 파일 읽기 요청을 세 번 보내고 '끝'을 출력한 후 읽기가 완료되면 백그라운드가 메인 스레드에 알려 등록된 콜백 함수를 실행하게 한다.

- 동기화
~~~js
const fs = require('fs');

console.log('시작');
let data = fs.readFileSync('./readme.txt'); // readFileSync 메서드 사용
console.log('1번', data.toString()); // 콜백 함수 대신 return값을 받아옴
data = fs.readFileSync('./readme.txt');
console.log('2번', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('3번', data.toString());
console.log('끝');
~~~

- 비동기 방식 & 순서 유지
~~~js
const fs = require('fs').promises;

console.log('시작');
fs.readFile('./readme.txt')
  .then((data) => {
    console.log('1번', data.toString());
    return fs.readFile('./readme.txt');
  })
  .then((data) => {
    console.log('2번', data.toString());
    return fs.readFile('./readme.txt');
  })
  .then((data) => {
    console.log('3번', data.toString());
    console.log('끝');
  })
  .catch((err) => {
    console.error(err);
  });
~~~

### 4. 버퍼와 스트림
