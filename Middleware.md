- [Node](./README.md)
- [알아두어야 할 자바스크립트](./JavaScript.md)
- 노드 기능
    - [실행](./Node.md) 
    - [노드 내장 객체](./Objects.md)  
    - [노드 내장 모듈](./Module.md)  
    - [파일 시스템](./FileSystem.md)
- [npm](./npm.md) 
- Express 
    - [서버](./Express.md)  
    - 미들웨어
    - [라우터](./Router.md)
    - [req,res 객체](./req-res.md)

## 미들 웨어

요청과 응답의 중간에 위치하여 해당 값들을 추가 및 조작    
~~~js
...
/* app.use(미들 웨어) */
app.use((req, res, next) => {   // req,res,next 함수를 매개변수로 가짐
    console.log('모든 요청에 다 실행됩니다.');
    next(); // 다음 미들웨어로 넘어가는 역할
});
app.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행됩니다.');
    next();
}, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});

/* 에러 처리 미들웨어 */
app.use((err, req, res, next) => { // 4개의 매개변수
    console.error(err);
    res.status(500).send(err.message); // res.status는 HTTP 상태 코드(기본값 200)
});
...
~~~
- 첫 번째 인수로 주소를 적어주지 않는 경우, 모든 요청에서 실행

<img src="https://thebook.io/img/080229/243_1.jpg">

- next() 호출로 다음 미들웨어로 넘어감
    내부적으로 next를 호출하지 않는 미들웨어(express.static)는 res.send나 res.sendFile 등의 메서드로 응답을 보내야 함
- next(err)를 통해 에러 처리 미들웨어로 넘길 수 있음

### 1. 데이터 전달

***
~~~js
app.use((req, res, next) => {
req.data = '데이터 넣기'; // req 객체 사용
next();
}, (req, res, next) => {
console.log(req.data); // 데이터 받기
next();
});
~~~
- req: 요청이 끝날 때까지만 데이터 유지   
req.sessiong: 세션이 유지되는 동안에 데이터 계속 유지   
- app.set은 Express에서 `전역적`으로 사용되지만 req객체는 요청을 보낸 `사용자 개개인`에게 귀속되므로 개인의 데이터를 전달하는 것에 적합


### 2. 미들웨어 안에 미들웨어

***
~~~js
/* 첫 번째 방법 */
app.use(morgan('dev'));
/* 두 번째 방법 */
app.use((req, res, next) => {
morgan('dev')(req, res, next);
});

/* 조건문에 따라 미들웨어 적용 */
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        morgan('combined')(req, res, next);
    } else {
        morgan('dev')(req, res, next);
    }
});
~~~

## 자주 쓰이는 미들웨어

### 1. morgan

***
~~~js
app.use(morgan('dev'));
~~~
- 인수로 dev(개발 환경) 외에 combined(배포 환경), common, short, tiny 등이 있음
- 결과  
    ~~~console
    GET / 500 12.209 ms - 139
    [HTTP 메서드] [주소] [HTTP 상태 코드] [응답 속도] - [응답 바이트]
    ~~~

### 2. static

***
정적인 파일을 제공하는 라우터 역할
~~~js
/* app.use('요청 경로', express.static('실제 경로')) */

app.use('/', express.static(path.join(__dirname, 'public')));
~~~
- 서버의 폴더 경로와 요청 경로가 다르기 때문에 외부인이 서버의 구조를 쉽게 파악할 수 없음(보안)
- 정적 파일들을 알아서 제공
- 응답으로 파일을 보내고 만약 요청 경로에 해당 파일이 없다면 next 호출

### 3. body-parser

***
데이터를 해석해 `req.body 객체`로 만들어줌
~~~js
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// false : querystring모듈 사용
// ture : qs모듈 사용

/* Raw나 Text */
const bodyParser = require('body-parser');
app.use(bodyParser.raw());
app.use(bodyParser.text());
~~~
- 보통 Form 데이터나 AJAX 요청의 데이터를 처리
- 멀티파트(이미지,동영상,파일)데이터는 `multer모듈` 사용
- JSON, URL-encoded(Form), Raw(버퍼), Text 형식의 데이터 해석 가능

### 4. cookie-parser

***
요청에 동봉된 쿠키를 해석해 `req.cookies 객체`로 만들어줌
~~~js
app.use(cookieParser(비밀키));
~~~
- 비밀 키는 cookieParser 미들웨어에 인수로 넣은 process.env.COOKIE_SECRET에 존재
- 비밀 키를 이용하여 해당 쿠키가 내 서버가 만든 쿠키임을 인증
- 쿠키는 client에서 위조하기 쉬우므로 서명을 쿠키 값 뒤에 붙임(req.cookies → req.signedCookies)
- 쿠키 생성 및 제거
    ~~~js
    /* 쿠키 생성 */
    res.cookie('name','zerocho',{ 
        /* 옵션(domain,expires,httpOnly,maxAge,path,secure 등) */
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
        secure: true,
        /* signed : true */ // 쿠키 뒤에 서명이 붙음(서명 옵션)
    });
    /* 쿠키 제거 */
    res.clearCookie('name','zerocho',{httpOnly:true, secure: ture});
    // 옵션(expires, maxAge 제외)이 정확히 일치해야 쿠키가 지워짐
    ~~~

### 5. express-session

***
세션 관리용 미들웨어, 사용자 별로 `req.session 객체`에 저장  
로그인 등의 이유로 세션을 구현 또는 특정 사용자를 위한 데이터를 임시적으로 저장할 때 사용   
~~~js
app.use(session({
    /* 세션에 대한 설정 */
  resave: false, // 세션을 다시 저장할 것인지 설정
  saveUninitialized: false, // 저장할 내역이 없더라도 다시 저장할 것인지 설정
  secret: process.env.COOKIE_SECRET, // 쿠키 서명
  /* 세선 쿠키 */
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie', // 세션 쿠키 이름(default : connect.sid)
}));
~~~
- 세션 변경,삭제 및 호출
    ~~~js
    req.session.name = 'zerocho'; // 세션 등록
    req.sessionID; // 세션 아이디 확인
    req.session.destroy(); // 세션 모두 제거
    ~~~
