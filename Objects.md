- [Node](./README.md)
- [알아두어야 할 자바스크립트](./JavaScript.md)
- 노드 기능
    - [실행](./Node.md)
    - 노드 내장 객체 
    - [노드 내장 모듈](./Module.md)  
    - [파일 시스템](./FileSystem.md)
- [npm](./npm.md) 
- Express 
    - [서버](./Express.md)  
    - [미들웨어](./Middleware.md)
    - [라우터](./Router.md)
    - [req,res 객체](./req-res.md)

## 노드 내장 객체

### 1. global
***
- 전역 객체(브라우저의 window와 같다)
- 전역 객체이므로 파일 간에 간단한 데이터를 공유할 때 사용하기도 하지만 지양하는 방법   
- globalA.js
~~~js
module.exports = () => global.message;
~~~

- globalB.js
~~~js
const A = require('./globalA');

global.message = 'hello';
console.log(A());
~~~

### 2. console
***
- global 객체 안에 존재
- 디버깅을 위해 사용
    - console.time(레이블) : time과 timeEnd 사이의 시간 측정
    - console.log(내용) : 내용을 콘솔에 표시
    - console.error(에러 내용) : 에러를 콘솔에 표시
    - console.table(배열) : 배열의 요소를 객체 리터럴에 넣으면, 객체의 속성들이 테이블 형식으로 표현
    ~~~js
    console.table([{ name: '제로', birth: 1994 }, { name: 'hero', birth: 1988}]);
    ~~~
    - console.dir(객체,옵션) : 객체를 콘솔에 표시
    ~~~js
    console.dir(obj, { colors: false, depth: 2 });
    // obj : 표시할 객체
    // { } : 옵션
    ~~~
    - console.trace(레이블) : 에러가 어디서 발생했는지 추적

### 3. 타이머
***
- global 객체 안에 존재
    - setTimeout(콜백 함수, 밀리초) : 주어진 시간 이후 콜백 함수 실행
    - setInterval(콜백 함수, 밀리초) : 주어진 시간마다 콜백 함수 반복 실행
    - setImmediate(콜백 함수) : 콜백 함수 즉시 실행
- 타이머 함수들은 모두 아이디를 반환하므로, 아이디를 사용하여 타이머를 취소할 수 있다.
~~~js
const timeout = setTimeout(() => {
    console.log('1.5초 후 실행');
  }, 1500);
  
  const interval = setInterval(() => {
    console.log('1초마다 실행');
  }, 1000);
  
  const timeout2 = setTimeout(() => {
    console.log('실행되지 않습니다');
  }, 3000);
  
  setTimeout(() => {
    clearTimeout(timeout2);
    clearInterval(interval);
  }, 2500);
  
  const immediate = setImmediate(() => {
    console.log('즉시 실행');
  });
  
  const immediate2 = setImmediate(() => {
    console.log('실행되지 않습니다');
  });
  
  clearImmediate(immediate2);
~~~

<img src="https://thebook.io/img/080229/102.jpg" hight = 150px width=200px>

### 4. __filename, __dirname
***
- 현재 파일명과 경로
- filename.js
~~~js
console.log(__filename);
console.log(__dirname);
~~~

- 결과
~~~console
$ node filename
/home/rde/node/Beginning/filename.js
/home/rde/node/Beginning
~~~

### 5. module, exports, require
***
- module.exports와 exports는 같은 객체를 참조
<img src="https://thebook.io/img/080229/104.jpg" height=50px width=300px>

~~~js
console.log(modue.exports === exports) // true
~~~
- exports를 사용할 때는 `객체`만 사용가능(속성명과 속성값 필요)
- exports에 다른 값을 대입하면 객체의 참조 관계가 끊겨 더 이상 모듈로 기능하지 않음.
- 한 모듈에 exports 객체와 module.exports를 동시에 사용하지 않는 것이 좋다.

- require, module.exports는 파일의 어느 위치에서나 사용 가능
- require은 함수이자 객체
    - require.cache : 파일명과 각 파일의 모듈 객체가 존재
    - require.main : 노드 실행 시 첫 모듈
- 한 번 require한 파일은 require.cache에 저장되므로 다음 번에는 새로 불러오지 않고 cache에 있는 것을 재사용

### 6. process
***

- 현재 실행되고 있는 노드 프로세스에 대한 정보  
- 기본
~~~
$ node
> process.version 
'v12.22.2' // 설치된 노드의 버전
> process.arch 
'x64' // 프로세서 아키텍처 정보
> process.platform 
'linux' // 운영체제 플랫폼 정보
> process.pid 
3693 // 현재 프로세스 ID
> process.uptime() 
57.163836 // 프로세스가 시작된 후 흐른 시간(s)
> process.execPath 
'/usr/bin/node' // 노드의 경로
> process.cwd() 
'/home/rde/node/Beginning' // 현재 프로세스가 실행되는 위치
> process.cpuUsage() 
{ user: 625000, system: 187500 } // 현재 cpu 사용량
~~~
- 그 외
    - process.env
        - 시스템 환경 변수 (UV_THREADPOOL_SIZE, NODE_OPTIONS ...)
        - 임의로 환경 변수 저장 가능
        - 서버나 DB의 pw와 각종 API 키들을 process.env의 속성으로 대체
        ~~~js
        const secretID = process.env.SECRET_ID; 
        const secretCode = process.env.SECRET_CODE;
        ~~~
    - process.nextTick(콜백)
        - 이벤트 루프가 netTick의 콜백 함수를 우선으로 처리하게 함
        ~~~
        nextTick > setImmediate > setTimeout
        ~~~
        - resolve된 Promise도 다른 콜백들보다 우선시 되기에 process.nextTick와 Promise를 마이크로태스크(microtask)라고 부름
    - process.exit(코드)
        - 실행 중인 노드 process 종료
        - 인수로 코드 번호 대체 (0 : 정상 종료, 1 : 비정상 종료)
        ~~~js
        let i = 1;
        setInterval(() => {
            if (i === 5) {
                console.log('종료!');
                process.exit();
            }
            console.log(i);
            i += 1;
        }, 1000);
        ~~~