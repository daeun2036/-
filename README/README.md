- Node
- [알아두어야 할 자바스크립트](./JavaScript.md)
- 노드 기능
    - [실행](./Node.md) 
    - [노드 내장 객체](./Objects.md)  
    - [노드 내장 모듈](./Module.md)  
    - [파일 시스템](./FileSystem.md)

## Node

> Node.jsⓇ는 Chrome V8 Javascript 엔진으로 빌드된 Javascript 런타임입니다. 


## 배경

1. 기존 js 프로그램은 웹 브라우저 위에서만 실행 가능 했음
2. 브라우저 외의 환경에서는 js 실행 속도 문제 때문에 좋은 결과 x
3. V8 엔진 출시 후 속도 해결(오픈 소스로 코드 공개)
4. V8 엔진 기반으로 Node Project 시작

<img src="https://thebook.io/img/080229/027_1.jpg" height = 200px width=250px>

## 특성
libuv 라이브러리는 노드의 특성인 이벤트 기반, 논 블로킹 I/O 모델을 구현


### 1. 이벤트 기반
***
- 이벤트 기반(event-driven)이란 이벤트가 발생할 때 미리 지정해둔 작업을 수행하는 방식을 의미      
- 즉, 이벤트 기반 시스템에서는 특정 이벤트가 발생할 때 무엇을 할지 미리 등록해두고, 이를 `이벤트 리스너`에 `콜백 함수`를 등록.  
- 이후 이벤트가 발생하면 리스너에 등록해둔 콜백 함수를 호출하며 이벤트가 끝난 후 노드는 다음 이벤트가 발생할 때까지 대기    
<img src="https://thebook.io/img/080229/027_2.jpg" height=250px witdh=300px>
***


### 2. 이벤트 루프
***
- 이벤트 루프(event loop)는 여러 이벤트가 동시에 발생했을 때 `어떤 순서로 콜백 함수를 호출할지를 이벤트 루프가 판단`.   
- 노드는 이벤트가 종료될 때까지 이벤트 처리를 위한 작업을 반복 하므로 루프(loop)라고 부른다.
~~~js
function first() {
  second();
  console.log('첫 번째');
}
function second() {
  third();
  console.log('두 번째');
}
function third() {
  console.log('세 번째');
}
first();
~~~
<img src="https://thebook.io/img/080229/028.jpg" height=200px witdh=250px>

- 비동기
~~~js
function run() {
  console.log('3초 후 실행');
}
console.log('시작');
setTimeout(run, 3000);
console.log('끝');
~~~

- 이벤트 루프
 - 백그라운드 : timer나 이벤트 리스터들이 대기하는 곳(여러 작업 동시 실행 가능)
- 태스크 큐 : 이벤트 발생 후, 백그라운드에서 태스크 큐로 콜백 함수를 보냄
<img src="https://thebook.io/img/080229/030.jpg" height=200px witdh=250px>
<img src="https://thebook.io/img/080229/031_1.jpg" height=200px witdh=250px>
<img src="https://thebook.io/img/080229/031_2.jpg" height=200px witdh=250px>

### 3. 논블로킹 I/O
***     
- 파일 시스템 접근, 네트워크를 통한 요청 작업은 I/O의 일종이며 이러한 작업을 할 때 노드는 논 브로킹 방식으로 처리한다.   
-  논 블로킹이란 이전 작업이 완료될 때까지 대기하지 않고 다음 작업을 수행하는 것을 의미한다. 반대로 블로킹은 이전 작업이 끝나야만 다음 작업을 수행한다.
<img src="https://thebook.io/img/080229/032_1.jpg" height=200px witdh=250px>

- 블로킹 방식
~~~js
function longRunningTask() {
  // 오래 걸리는 작업
  console.log('작업 끝');
}

console.log('시작');
longRunningTask();
console.log('다음 작업');
~~~

- 논 블로킹 방식
~~~js
function longRunningTask() {
  // 오래 걸리는 작업
  console.log('작업 끝');
}
console.log('시작');
setTimeout(longRunningTask, 0);
console.log('다음 작업');
~~~


### 4. 싱글 스레드
***
- 자바스크립트 코드는 동시에 실행될 수 없는데 그 이유는 노드가 싱글 스레드 기반이기 때문     
- `노드는 싱글스레드, 논 블로킹 모델`로, 싱글 스레드가 혼자서 일을 처리하지만 들어온 요청 순서가 아닌 논블로킹 방식으로 이전 작업이 완료될 때까지 대기하지 않고 다음 작업을 수행.


### 5. 서버로서의 노드
***
- 노드 서버 또한 `싱글 스레드`, `논블로킹` 모델 사용    
- 싱글 스레드여서 멀티 스레드보다 컴퓨터 자원을 적게 사용한다는 장점이 있지만, CPU 코어를 하나밖에 사용하지 못한다는 단점 존재  
- I/O작업이 많은 서버로 적합하지만 CPU작업이 많은 서버로는 부적합
- `웹 서버`가 내장
- 자바스크립트 사용
- JSON 형식과 쉽게 호환
- `개수는 많지만 크기는 작은 데이터를 실시간으로 주고 받는 데 적합` (실시간 채팅, 주식차트, JSON데이터를 제공하는 API서버)


### 6. 서버 외의 노드
***
- 웹, 모바일, 데스크톱 애플리케이션 개발에도 사용
- 웹 프레임워크 (Angular, React, Vue 등)
- 모바일 개발 도구 (React Native)
- 데스크톱 개발 도구 (Electron)