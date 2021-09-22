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
    - [미들웨어](./Middleware.md)
    - [라우터](./Router.md)
    - req,res 객체

## req,res 객체

- Express의 req, res 객체는 http 모듈의 req, res객체를 확장한 것  
- 기존 http 모듈의 메서드 및 Express가 추가한 메서드나 속성 사용  
- 메서드 체이닝 지원
    ~~~js
    res
    .status(201)
    .cookie('test', 'test')
    .redirect('/admin');
    ~~~

### 1. req 객체

***
- req.app : req객체를 통해 app객체에 접근 가능
    ~~~js
    req.app.get('port');
    ~~~
- req.body : body-parser 미들웨어가 만드는 요청의 본문을 해석한 객체
- req.cookies : cookie-parser 미들웨어가 만드는 요청의 쿠키를 해석한 객체
- req.ip : 요청의 ip 주소 저장
- req.params : 라우티 매개변수에 대한 정보가 담긴 객체
- req.query : 쿼리스트링에 대한 정보가 담긴 객체
- req.signedCookies : 서명된 쿠키들은 req.cookies대신 여기에 담김
- req.get(헤더 이름) : 헤더 값을 가져오고 싶을 때 사용하는 메서드


### 2. res 객체

***
- res.app : res객체를 통해 app객체에 접근
- res.cookie(키, 값, 옵션) : 쿠키를 설정하는 메서드
- res.clearCookie(키, 값, 옵션) : 쿠키를 제거하는 메서드
- res.end() : 데이터 없이 응답을 보냄
- res.json(JSON) : JSON 형식의 응답을 보냄
- res.redirect(주소) : 리다이렉트할 주소와 함께 응답을 보냄
- res.render(뷰, 데이터) : 템플릿 엔진을 렌더링해서 응답할 때 사용하는 메서드
- res.send(데이터) : 데이터(문자열,HTML,버퍼,객체,배열 등)와 함께 응답을 보냄
- res.sendFile(경로) : 경로에 위치한 파일을 응답
- res.set(헤더, 값) : 응답의 헤더를 설정
- res. status(코드) : 응답 시의 HTTP 상태 코드 지정
