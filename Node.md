- [Node](./README.md)
- [알아두어야 할 자바스크립트](./JavaScript.md)
- 노드 기능
    - 실행  
    - [노드 내장 객체](./Objects.md)  
    - [노드 내장 모듈](./Module.md)  
    - [파일 시스템](./FileSystem.md)
    
## 실행

### 1. REPL 사용하기
***
- 읽고(Read), 해석하고(Eval), 반환하고(Print), 종료할 때까지 반복(Loop)한다.
- 윈도에서는 cmd, 맥이나 리눅스에서는 terminal, VS Code에서는 Ctrl+`
<img src="https://thebook.io/img/080229/090.jpg" height = 250 width=300

~~~console
$ node
>
~~~
- REPL 종료하려면 Ctrl+c를 두 번 누르거나, .exit 입력

### 2. js파일 실행하기
***
- js파일을 생성한 뒤, 콘솔에 다음과 같이 입력
~~~console
$ node helloWorld
~~~
REPL로 들어가는 명령어가 node고, 노드를 통해 파일을 실행하는 명령어는 node [.js 파일 경로]

### 3. 모듈
***
- 파일 = 모듈
- 모듈로 만들어두면 여러 프로그램에 해당 모듈을 재사용할 수 있다. (함수와 유사한 개념)

- 예제 코드
~~~js
const { odd, even } = require('./var'); // require 함수로 var.js에 있는 값을 불러옴

function checkOddOrEven(num) {
  if (num % 2) { // 홀수면
    return odd;
  }
  return even;
}

module.exports = checkOddOrEven; // 함수, 객체, 변수 대입 가능
~~~
