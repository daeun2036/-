# 알아두어야 할 자바스크립트

[- ES2015+](#ES2015)   
[- FrontEnd JS](#FrontEnd-JS)

## ES2015+

> 기존 JS 문법에 편리한 기능들이 많이 추가되었다.

***

### 1. const, let

- 변수 선언할 때 `var` 대신 `const`와 `let`으로 대체한다.  
- var과는 달리 `블록 스코프`를 가진다.    
- let은 값을 계속 수정할 수 있지만, const는 불가능하고 초기화 시 값이 필요하다.  

~~~js
if (true) {
  var x = 3;
}
console.log(x); // 3

if (true) {
  const y = 3;
}
console.log(y); // Uncaught ReferenceError: y is not defined
~~~

### 2. 템플릿 문자열

- 백틱 (`)을 이용해 새로운 문자열을 만들 수 있다.

~~~js
var string = num 1 + ' + ' + num2 + ' = ' + result;

const string = `${num1} + ${num2} = ${result}` ;
~~~

### 3. 객체 리터럴

- 기존 코드
~~~js
var sayNode = function() {
    console.log('Node');
};
 
var es = 'ES';
var oldObject = {
    sayJS: function(){
        console.log('JS');
    },
    sayNode: sayNode,
};
 
oldObject[es + 6] = 'Fantastic';
 
oldObject.sayNode();
oldObject.sayJS();
console.log(oldObject.ES6);
~~~
- 수정된 코드
~~~js
var sayNode = function() {
    console.log('Node');
};
 
var es = 'ES';
 
const newObject = {
    sayJS() {   // :와 function을 붙이지 않아도 가능
        console.log('JS');
    },
    sayNode,    // 중복되는 변수는 하나만 작성 가능
    [es+6]: 'Fantastic',    // 객체 속성명을 객체 리터럴 안에서 동적으로 생성 가능
};
 
newObject.sayNode();
newObject.sayJS();
console.log(newObject.ES6);
~~~

### 4. 화살표 함수

- return문을 줄일 수 있는 장점을 가진다.    
- function과 this 바인드 방식에 차이점이 존재한다.

- 기존코드
~~~js
var relationship1 = {
    name: 'kim',
    friends: ['a', 'b', 'c'],
    logFriends: function() {
        var that = this; // relationship1을 가리키는 this를 that에 저장
 
        this.friends.forEach(function(friend){
            console.log(that.name, friend);
        });
    },
};
relationship1.logFriends();
~~~

logFriends() 에서 forEach문 안에 function 선언문을 사용했다. 이로써 각자 다른 함수 스코프 this를 가지게 되므로 that이라는 변수에 this값을 미리 저장해 놓았다.

~~~js
const relationship2 = {
    name: 'kim',
    friends: ['a', 'b', 'c'],
    logFriends() {
        this.friends.forEach(friend => {
            console.log(this.name, friend);
        });
    },
};
relationship2.logFriends();
~~~

화살표 함수를 사용하여 바깥 스코프인 logFriends()의 `this를 그대로 사용이 가능`한 상황이 되었다.

### 5. 구조분해 할당
- 객체나 배열에서 속성 혹은 요소를 꺼내올 때 사용한다.
- 객체
~~~js
var candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy: function(){
        return "Hi";
    }
};
 
var getCandy = candyMachine.getCandy;
var count = candyMachine.status.count;
~~~

~~~js
const candyMachine1 = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy1() {
        return "Hi";
    }
};
 
const { getCandy1, status: { count } } = candyMachine1;

console.log(getCandy1()) // Hi
console.log(count) // 5
~~~
한 줄로 나타내는 것이 가능해졌을 뿐더러, 여러 단계 안의 속성(conut)도 가져오는 것처럼 작성이 가능해졌다.  

- 배열
~~~js
var array = ['nodejs', {}, 10, true];
var node = array[0];
var obj = array[1];
var bool = array[array.length - 1];

const array1 = ['nodejs', {}, 10, true];
const [node, obj, , bool] = array1;
~~~

### 6. 프로미스(promise)
- 콜백 함수 자체가 복잡하기 때문에 ES2015부터는 콜백 대신 API들이 프로미스 기반으로 재구성되고 있다.
- promise 객체 구조
~~~js
const condition = true; // ture면 resolve, false면 reject
 
// resolve와 reject를 매개 변수로 갖는 콜백 함수를 넣는 방식
const promise = new Promise((resolve, reject) => { // promise 객체 생성
    if (condition){
        resolve('성공');
    } else {
        reject('실패');
    }
});

// promise 변수에 then과 catch 메서드를 붙임
// resolve가 호출되면 then이 실행되고, reject가 호출되면 catch가 실행
promise 
    .then((message) => {
        console.log(message); // message에 '성공'이 들어가 log로 출력
    })
    .catch((error) => {
        console.log(error); // error에 '실패'가 들어가 log로 출력된다.
    });
~~~

### 7. async/await

***

## FrontEnd JS

### 1. AJAX
- 페이지 이동 없이 서버에 요청을 보내고 응답을 받는 기술
- jQuery나 axios같은 라이브러리를 이용해서 보냄

### 2. FormData
- HTML form태그의 데이터를 동적으로 제어
~~~js
<script>
    const formData = new FormData(); // formData 객체 생성
    formData.append('name', 'zerocho'); // 키-값 데이터 추가
    formData.append('item', 'orange');
    formData.append('item', 'melon');
    formData.has('item'); // true
    formData.has('money'); // false;
    formData.get('item'); // orange
    formData.getAll('item'); // ['orange', 'melon'];
    formData.append('test', ['hi', 'zero']);
    formData.get('test'); // hi, zero
    formData.delete('test');
    formData.get('test'); // null
    formData.set('item', 'apple'); // 키 수정
    formData.getAll('item'); // ['apple'];
</script>
~~~
- axois로 form data를 서버로 보냄
~~~js
(async () => {
  try {
    const formData = new FormData();
    formData.append('name', 'zerocho');
    formData.append('birth', 1994);
    const result = await axios.post('https://www.zerocho.com/api/post/formdata', formData); // 두 번째 인수에 data를 넣어서 보냄
    console.log(result);
    console.log(result.data);
  } catch (error) {
    console.error(error);
  }
})();
~~~
### 3. encodeURIComponent, decodeURIComponenet
- AJAX 요청 시, 주소에 한글이 들어가는 경우 한글 주소 부분을 encode함
- AJAX 요청을 보낼 때
~~~js
(async () => {
  try {
    const result = await axios.get(`https://www.zerocho.com/api/search/${encodeURIComponent('노드')}`);
    console.log(result);
    console.log(result.data); // {}
  } catch (error) {
    console.error(error);
  }
})();
~~~
- 서버 측에서 복구 할때
~~~js
decodeURIComponent('%EB%85%B8%EB%93%9C'); // 노드
~~~

### 4. data attribute & dataset
- 프런트엔드에 data를 저장하는 방법
~~~html
<ul>
  <li data-id="1" data-user-job="programmer">Zero</li>
  <li data-id="2" data-user-job="designer">Nero</li>
  <li data-id="3" data-user-job="programmer">Hero</li>
  <li data-id="4" data-user-job="ceo">Kero</li>
</ul>
<script> 
  console.log(document.querySelector('li').dataset);
  // { id: '1', userJob: 'programmer' }
  dataset.monthSalary = 1000;
  // data-month-salary="1000"
</script>
~~~
HTML 태그의 속성으로 `data-`로 시작하는 것(data attribute)을 추가한다.
data attribute를 사용하여 js로 쉽게 접근할 수 있게 한다.

