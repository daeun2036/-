- [Node](./README.md)
- [알아두어야 할 자바스크립트](./JavaScript.md)
- 노드 기능
    - [실행](./Node.md) 
    - [노드 내장 객체](./Objects.md)  
    - [노드 내장 모듈](./Module.md)  
    - [파일 시스템](./FileSystem.md)
- npm   
- [Express](./Express.md)   

# npm

> Node Package Manager의 약자로 125만개(2020년 5월 기준)에 달하는 패키지가 등록되어 있다.       

npm의 대체자로 yarn이 존재.(페이스북이 내놓은 패키지 매니저)    
React나 React Native같은 페이스북 진영의 프레임워크를 사용할 때 종종 사용       

## Package

`package.json` 파일에서 설치한 패키지의 버전을 관리한다

### 1. 패키지 버전 관리

***
- package.json 파일 생성
~~~console
$ npm init
~~~
- 프로젝트 폴더 이름 ≠ package name
- 나중에 package.json을 직접 수정할 수 있음 

- package.json
    ~~~json
    {
      "name": "npmtest",
      "version": "0.0.1",
      "description": "hello package.json",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "ZeroCho",
      "license": "ISC"
    }
    ~~~

    - name : package name 저장
    - version : 패키지의 버전
    - main : entry point 즉, js 실행 파일 진입점(보통 module.exports를 하는 파일 지정)
    - repository : git repository 주소
    - keywords : npm 공식 홈페이지에서 패키지를 쉽게 찾을 수 있게 함
    - license : 해당 패키지의 라이센스
    - script : npm 명령어 저장
        - 실행

            ~~~console
            $ npm run test
            ~~~

        - start 명령어  
            node `[파일명]`을 저장해두고 콘솔창에 다음 명령어로 실행

            ~~~console
            $ npm start
            ~~~

        - start나 test같은 스크립트는 run을 붙이지 않아도 실행 가능

### 2. 설치 

***
~~~console
$ npm install [패키지1] [패키지2] [...]
~~~
- package.json파일에 기록(dependencies 속성)
- node_modules 폴더에 해당 패키지가 의존하는 다른 패키지들 자동 설치
        
    <img src="https://thebook.io/img/080229/215.jpg">   

- 전역 설치
    ~~~console
    $ npm install --global [패키지]
    ~~~
    - 리눅스나 맥에서는 전역 설치 시에 관리자 권한이 필요하므로 sudo를 앞에 붙여야 함

- package.json파일만 존재한다면 npm install로 언제든지 다시 설치 가능

### 3. nodemon 패키지

***
소스 코드가 바뀔 때마다 자동으로 노드를 재실행

### 4. 넘버링

***
- SemVer(Semantic Versioning) 방식을 따름     
    <img src="https://thebook.io/img/080229/219.jpg" height = 200 width = 400>
- `^`
    - minor 버전까지만 설치 또는 업데이트
    - minor버전까지는 하위 호환이 보장되기 때문에 가장 많이 사용됨
- `~`
    - patch 버전까지만 설치 또는 업데이트   

### 5. 배포

***
- npm 계정 로그인
    ~~~console
    $ npm adduser
    ~~~
- 배포하기
    ~~~console
    $ npm publish
    ~~~
- 확인하기
    ~~~console
    $ npm info [패키지]
    ~~~
- 삭제하기
    ~~~console
    $ npm unpublish [패키지] --force
    ~~~


## 기타 npm 명령어

### 1. outdated

***
업데이트할 수 있는 패키지 확인  
~~~console
$ npm outdated
~~~ 

<img src="https://thebook.io/img/080229/220.jpg" height = 100 width = 400>      

- Current와 Wanted가 다르면 업데이트가 필요한 경우
- Latest는 해당 패키지의 최신 버전

### 2. update

***
Wanted에 적힌 버전으로 업데이트
~~~console
$ npm update
~~~
- package.json에 적힌 버전 범위와 다르면 설치되지 않음

### 3. search

***
npm의 패키지 검색
~~~console
$ npm search [검색어]
~~~
- npm 공식 사이트가 더 편리

### 4. version

***
package.json의 버전을 올려줌
~~~console
$ npm version [버전]
~~~

### 5. deprecate

***
해당 패키지를 설치할 때 경고 메시지를 띄우게 함
~~~console
$ npm deprecate [패키지명] [버전] [메시지]
~~~
- 자신의 패키지에만 이 명령어를 적용할 수 있음
