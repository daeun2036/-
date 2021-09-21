- [Node](./README.md)
- [알아두어야 할 자바스크립트](./JavaScript.md)
- 노드 기능
    - [실행](./Node.md)  
    - [노드 내장 객체](./Objects.md)  
    - 노드 내장 모듈    
    - [파일 시스템](./FileSystem.md)
- [npm](./npm.md)   
- [Express](./Express.md)   


## 노드 내장 모듈

### 1. os
***
- 사용자 컴퓨터의 운영체제 정보를 가져옴
- 속성과 메서드
    - os.arch() : process.arch와 동일
    - os.platform() : process.platform과 동일
    - os.type() : 운영체제의 종류
    - os.uptime() : 운영체제 부팅 이후 흐르는 시간(s)
    - os.hostname() : 컴퓨터의 이름
    - os.release() : 운영체제의 버전
    - os.homedir() : 홈 디렉터리 경로
    - os.tmpdir() : 임시 파일 저장 경로
    - os.cpus() : 컴퓨터의 코어 정보
    - os.freemem() : 사용 가능한 메모리(RAM)
    - os.totalmem() : 전체 메모리 용량
    - os.constants : 각종 에러와 신호(EADDRINUSE, ECONNRESET...)

### 2. path
***
- 폴더와 파일 경로 조작
- 운영체제별로 경로 구분자가 다르다
~~~
윈도 : C:\Users\ZeroCho
POSIX : /home/zerocho
~~~
- 속성과 메서드
    - path.sep : 경로의 구분자('/' or '\')
    - path.delimiter : 환경 변수 구분자 (':' or ';')
    - path.dirname(경로) : 파일이 위치한 폴더 경로
    - path.extname(경로) : 파일의 확장자
    - path.basename(경로, 확장자) : 파일의 이름(확장자 포함) 표시
    - path.parse(경로) : 파일 경로를 root,dir,base,ext,name으로 분리
    - path.format(객체) : parse한 객체를 파일 경로로 합침
    - path.normalize(경로) : /나 \를 잘못 사용했을 때, 정상적인 경로로 변환
    - path.isAbsolute(경로) : 파일 경로가 절대경로(true)인지 상대경로(false)인지 알려줌
    - path.relative(기준경로, 비교경로) : 첫 번재에서 두 번째로 가는 방법을 알려줌
    - path.join(경로, ...) : 하나의 경로로 합침
    - path.resolve(경로, ...) : join과 비슷

    ~~~js
    path.join('/a', '/b', '/c');
    /*  
        결과 : /a/b/c
        상대경로로 처리
    */
    path.resolve('/a', '/b', '/c');
    /*  
        결과 : /b/c
        절대경로로 인색해서 앞의 경로를 무시
    */
    ~~~

### 3. url
***
- 인터넷 주소를 조작    
<img src="https://thebook.io/img/080229/119.jpg">   
- 노드의 URL을 구분하는데 있어서 `WHATWG 방식`과 `기존 노드의 url방식`이 존재
    - 둘 다 사용해도 상관은 없지만 기존 노드의 url 형식을 사용해야 할 때가 있다(host없이 pathname만 오는 경우 WHATWG 방식으로 처리x)
    - WHATWG는 search부분을 searchParams라는 객체로 반환하므로 유용
    - search는 물음표(?)로 시작하고, 그 뒤에 키=값 형식으로 데이터 전달, 여러 키가 있을 경우 &로 구분
- 속성과 메서드
    - url.parse(주소) : 주소 분해
    - url.format(객체) : 분해된 url객체를 원래 상태로 조립(WHATWG와 기존 방식 둘다 사용 가능)
    
### 4. querystring
***
- 기존 노드의 url을 사용할 때, search 부분을 사용하기 쉽게 객체로 만드는 모듈
- 속성과 메서드
    - querystring.parse(쿼리) : url의 query 부분을 js 객체로 분해
    - querystring.stringify(객체) : 분해된 query객체를 문자열로 다시 조립

### 5. crypto
***
- 단방향 암호화
    - 복호화 할 수 없음
    ~~~
    비밀번호는 복호화할 필요가 없고, DB에서 비교하면 된다.
    ~~~
    - 해시 함수
    - 속성과 메서드
        - createHash(알고리즘) : 사용할 해시 알고리즘(md5, sha1, sha256, sha512...)
        - update(문자열) : 반환할 문자열
        - digets(인코딩) : 인코딩할 알고리즘(base64,gex,latin1)
        ~~~js
        const crypto = require('crypto');

        console.log('base64:', crypto.createHash('sha512').update('비밀번호').digest('base64'));
        ~~~

- 양방향 암호화
    - 복호화 가능
    - 대칭키 암호화(같은 키로 암호,복호)
    - 속성과 메서드
        - crypto.createCipheriv(알고리즘, 키, iv) : 암호화
        - crypto.update(문자열, 인코딩, 출력 인코딩) : 암호화할 대상과 대상의 인코딩(utf8), 출력 결과물의 인코딩(base64)
        - crypto.final(출력 인코딩) : 출력 결과물의 인코딩을 넣으면 암호화 완료
        - crypto.createDecipheriv(알고리즘, 키, iv) : 복호화
        - decipher.update(문자열, 인코딩, 출력 인코딩) : 암호화된 문장, 그 문장의 인코딩(base64), 복호화할 인코딩(utf8)
        - decipher.final(출력 인코딩) : 복호화 결과물의 이코딩을 넣으면 복호화 완료
        ~~~js
        const crypto = require('crypto'); 

        const algorithm = 'aes-256-cbc'; 
        const key = 'abcdefghijklmnopqrstuvwxyz123456'; 
        const iv = '1234567890123456'; 

        const cipher = crypto.createCipheriv(algorithm, key, iv); 
        let result = cipher.update('암호화할 문장', 'utf8', 'base64'); 
        result += cipher.final('base64'); 
        console.log('암호화:', result); 

        const decipher = crypto.createDecipheriv(algorithm, key, iv); 
        let result2 = decipher.update(result, 'base64', 'utf8'); 
        result2 += decipher.final('utf8'); 
        console.log('복호화:', result2);
        ~~~

### 6. util
***
- 각종 편의 기능을 모아둔 모듈
- 계속 API가 추가되고 있으며, 가끔 deprecated되기도 함
- 속성과 메서드
    - util.deprecate : 함수가 deprecated 처리되었음을 알림
    - util.promisify : 콜백 패턴을 프로미스 패턴으로 바꿈

### 7. worker_threads
***
- 멀티 스레드
- `worker_thread.js` 참조

### 8. child-process
***
- 다른 프로그램을 실행하고 싶거나 명령어를 수행하고 싶을 때 사용
- exec는 shell에서 명령어 수행, spawn은 새로운 프로세스를 띄우면서 명령어 수행
- `exec.js` 또는 `spawn.js` 참조
### 9. 기타 모듈들
***
- assert : 값을 비교하여 프로그램이 제대로 작동하는지 테스트하는데 사용
- dns : 도메인 이름에 대한 IP주소를 얻어내는 데 사용
- net : HTTP보다 로우 레벨인 TCP나 IPC 통신을 할 때 사용
- string_decoder : 버퍼 데이터를 문자열로 바꾸는 데 사용
- tls : TLS와 SSL에 관련된 작업을 할 때 사용
- tty : 터미널과 관련된 작업을 할 때 사용
- dgram : UDP와 관련된 작업을 할 때 사용
- v8 : V8엔진에 직접 접근할 때 사용
- vm : 가상 머신에 직접 접근할 때 사용