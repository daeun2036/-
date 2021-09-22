- [Node](./README.md)
- [알아두어야 할 자바스크립트](./JavaScript.md)
- 노드 기능
    - [실행](./Node.md) 
    - [노드 내장 객체](./Objects.md)  
    - [노드 내장 모듈](./Module.md)  
    - [파일 시스템](./FileSystem.md)
- [npm](./npm.md) 
- Express   
    - 서버  
    - [미들웨어](./Middleware.md)
    - [라우터](./Router.md)
    - [req,res 객체](./req-res.md)

# Express

> 웹 서버 프레임워크 중 하나    

## Express 서버

~~~js
const express = require('express');
const app = express(); // Express모듈 실행 후 app변수에 할당

/* 데이터 저장 */
/* app.set(키, 값) */
app.set('port', process.env.PORT || 3000); // process.env 객체의 PORT 속성값 또는 3000번 포트 사용

/* 주소에 대한 GET요청이 들어올 때 해야할 행동 지정 */
/* app.get(주소, 라우터) */
app.get('/', (req, res) => { // 둘 다 객체
  res.send('Hello, Express'); // GET / 요청 시 응답으로 문자열을 전송
});

/* 포트 연결 및 실행 */
app.listen(app.get('port'), () => { // app.get(키)로 데이터 가져오기
  console.log(app.get('port'), '번 포트에서 대기 중');
});
~~~