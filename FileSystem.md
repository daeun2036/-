- [Node](./README.md)
- [알아두어야 할 자바스크립트](./JavaScript.md)
- 노드 기능
    - [실행](./Node.md)  
    - [노드 내장 객체](./Objects.md)  
    - [노드 내장 모듈](./Module.md)  
    - 파일 시스템 

## 파일 시스템
- fs 모듈을 사용하여 파일 시스템에 접근
- 파일을 생성, 삭제, 읽기, 쓰기 가능    

### 1. 파일 읽기
***
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
***
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
***
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
***
<img src="https://thebook.io/img/080229/146.jpg" height=200px width=400px> 

- 노드는 파일을 읽을 때 메모리에 파일 크키만큼 공간을 마련해두고, 파일 데이터를 메모리(`buffer`)에 저장한 뒤, 사용자가 조작할 수 있도록 해준다.
- buffer 객체의 메서드
  - from(문자열) : 문자열을 버퍼로
  - toString(버퍼) : 버퍼를 문자열로
  - concat(배열) : 배열 안에 든 버퍼들을 하나로 합침
  - alloc(바이트) : 해당 크기만큼의 빈 버퍼 생성
  ~~~js
  const buffer = Buffer.from('저를 버퍼로 바꿔보세요');
  console.log('from():', buffer);
  console.log('length:', buffer.length);
  console.log('toString():', buffer.toString());

  const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')];
  const buffer2 = Buffer.concat(array);
  console.log('concat():', buffer2.toString());

  const buffer3 = Buffer.alloc(5);
  console.log('alloc():', buffer3);
  ~~~   

<img src="https://thebook.io/img/080229/147.jpg" height=200px width=400px>

- 용량이 크거나, 서버같은 환경에서는 메모리 문제로 버퍼를 작게 만들어서 여러 번에 나눠서 보내는 방식(`stream`)이 등장
~~~js
const fs = require('fs');

// createReadStream(파일 경로, 옵션 객체(highWaterMark : 버퍼 크기(byte)))
const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 });
const data = [];

// 이벤트 리스너 사용
// 파일 읽기가 시작
readStream.on('data', (chunk) => {
  data.push(chunk); // 배열에 하나씩 push
  console.log('data :', chunk, chunk.length);
});

// 파일 다 읽을 시
readStream.on('end', () => {
  console.log('end :', Buffer.concat(data).toString());
});

// 도중에 error발생 시
readStream.on('error', (err) => {
  console.log('error :', err);
});
~~~

- 파일 쓰기
~~~js
const fs = require('fs');

// createWriteStream(출력 파일명, 옵션(생략))
const writeStream = fs.createWriteStream('./writeme2.txt');
writeStream.on('finish', () => {
  console.log('파일 쓰기 완료');
});

writeStream.write('이 글을 씁니다.\n');
writeStream.write('한 번 더 씁니다.');
writeStream.end(); // finish 이벤트 발생
~~~

- 파일 복사
~~~js
const fs = require('fs').promises;

// copyFile(복사할 파일, 복사될 경로, 복사 후 콜백 함수)
fs.copyFile('readme4.txt', 'writeme4.txt')
  .then(() => {
    console.log('복사 완료');
  })
  .catch((error) => {
    console.error(error);
});
~~~

### 5. 기타 fs 메서드
- fs.access(경로, 옵션, 콜백) : 폴더나 파일에 접근할 수 있는지 체크
  - 두 번째 인수로 상수(constants를 통해 가져옴)
    - F_OK : 파일 존재 여부 체크
    - R_OK : 읽기 권한 여부 체크
    - W_OK : 쓰기 권한 여부 체크
  - 에러 발생 콜백함수
    - 파일/폴더가 없을 때의 에러코드는 ENOENT
- fs.mkdir(경로, 콜백) : 폴더 생성
  - 파일이 없으면 생성 후 아이디를 가져옴
  - 두 번째 인수로 어떤 동작을 할 것인지 설정
    - w(쓰기), r(읽기), a(기존 파일에 추가)
- fs.rename(기존 경로, 새 경로, 콜백) : 파일의 이름을 바꾸는 메서드
- fs.readdir(경로, 콜백) : 폴더 안의 내용물 확인
- fs.unlink(경로, 콜백) : 파일 지우기
- fs.rmdir(경로, 콜백) : 폴더 지우기(내부 파일을 모두 지우고 호출해야 함)

### 6. 이벤트
- events모듈을 사용하여 이벤트를 만들고 호출하고 삭제할 수 있음
~~~js
const EventEmitter = require('events');

const myEvent = new EventEmitter(); // 이벤트 객체 생성
myEvent.addListener('event1', () => {
  console.log('이벤트 1');
}); // on과 기능이 같음
myEvent.on('event2', () => {
  console.log('이벤트 2');
});
myEvent.on('event2', () => {
  console.log('이벤트 2 추가');
});
myEvent.once('event3', () => {
  console.log('이벤트 3');
}); // 한 번만 실행됨

myEvent.emit('event1'); // 이벤트 호출
myEvent.emit('event2'); // 이벤트 호출

myEvent.emit('event3'); // 이벤트 호출
myEvent.emit('event3'); // 실행 안 됨

myEvent.on('event4', () => {
  console.log('이벤트 4');
});
myEvent.removeAllListeners('event4'); // 이벤트 리스너 제거
myEvent.emit('event4'); // 호출 되기 전에 삭제했으므로 실행 안 됨

const listener = () => {
  console.log('이벤트 5');
};
myEvent.on('event5', listener);
myEvent.removeListener('event5', listener);
myEvent.emit('event5'); // 실행 안 됨

console.log(myEvent.listenerCount('event2')); // 연결 된 리스너 갯수
~~~


### 7. 예외 처리
- `try/catch`문으로 예외 처리
- Promise의 에러는 catch하지 않아도 알아서 처리하지만 되도록이면 try/catch문 활용
- try/catch문으로 처리하지 못한다면 `uncaughtException` 이벤트로 에러 로깅 후 종료
