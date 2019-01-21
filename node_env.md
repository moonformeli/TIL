## Node 환경

### 이벤트 큐
이벤트 큐는 비동기로 실행되는 콜백함수가 실행을 위해 쌓이는 큐다. LIFO 구조로 되어 있고 이벤트 루프에 의해 순서대로<br>
콜스택에 올라가 실행된다.

### 이벤트 루프
이벤트 큐에 등록된 함수를 차례대로 콜스택에 올려 실행이 될 수 있도록한다.

#### setTimeout
setTimeout은 등록한 콜백함수를 지정한 시간 후에 이벤트 큐에 등록하는 메소드다.

### setImmediate
setImmediate는 

## ES6 문법

* Promise / async & await<br>
ES5 시절에는 비동기로 작업을 동기처럼 처리하고 싶을 때는 상당히 번거롭고 코드의 복잡성이 올라갔다. <br>
아래는 jQuery를 이용해 비동기처리를 하는 기존 방식이다.

```javascript
function getUserName() {
    $.ajax({
        ... header ...,
        success: function(name) {
            console.log(name);
            
            $.ajax({
                ... header ...,
                success: function(location) {
                    console.log(location);
                    
                    $.ajax({
                        ... header ...,
                        success: function(age) {
                            console.log(age);
                        }
                    });
                }
            });
        }
    });
}
```
이렇게 기존의 방식으로는 하나의 비동기가 완료가 되었을 때 그 안에서 다른 비동기를 호출하는 방식으로 작업을 해왔다.<br>
하지만 이마저도 jQuery의 ajax를 이용한 덕분에 그나마 순서라도 지킬 수 있었지, setTimeout 같은 비동기 작업에는 도저히 이렇다 할 방법이 없었다.<br>

이렇게해서 나온 개념이 ES6의 Promise다. Promise는 비동기작업을 동기작업처럼 처리할 수 있도록 해주는 장치를 갖고 있다. <br>
Promise는 성공했을 때 반환해주는 *resolve*와 실패했을 때 반환해주는 *reject*가 존재한다. 

```javascript
const callAPI = url => fetch(url);

callAPI('/userName')
    .then(res => res.json())
    .then(name => {
        console.log(name);
        return callAPI('/location');
    })
    .then(res => res.json())
    .then(location => {
        console.log(location);
        return callAPI('/age');
    })
    .then(res => res.json())
    .then(age => console.log(age));
```

*fetch*는 Promise 객체를 반환하기때문에 *then()* 메소드로 이어받아 계속 작업을 진행할 수 있다. <br>
ES5와 비교하면 코드의 깊이가 일정하게 유지되고 있음을 확인할 수 있다. 그러나 아직 무언가가 지저분해 보인다. 리팩토링을 실시하자.

```javascript
const callAPI = url => {
    return fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
};

callAPI('/name')
    .then(callAPI('/location'))
    .then(callAPI('/age'));
```

이제는 코드가 훨씬 간결해지고 깔끔해졌다. 우선 *callAPI* 를 통해 Promise를 반환받아 *then()* 으로 계속 비동기 작업을 이어나가고 싶을 때,<br>
*callAPI* 에서 따로 Promise를 반환해줘야하는 상황에 놓였다. *fetch* 가 Promise를 반환하므로 그대로 리턴해주면 된다.

```javascript
let url = 'https://jsonplaceholder.typicode.com/todos/1'
```
궁금하다면 위의 주소로 테스트를 하자.

현재까지 ES5에서의 방법, ES6의 Promise를 활용한 방법을 소개했다. 다음은 ES7에 소개된 async & await을 사용한 방법이다.<br>
async & await은 기본적으로 역시 Promise를 반환하지만, 여러가지 장점으로 인해 Promise보다 더 많이 활용되고 있다.

```javascript
const callAPI = url => {
    return fetch(url).then(res => res.json()).then(data => console.log(data));
};

const getAPIData = async () => {
    await callAPI('/name');
    await callAPI('/location');
    console.log('과연 중간에 끼어들 수 있을까?');
    await callAPI('/age');
};

getAPIData();
```

최초의 jQuery를 이용한 방법과 비교하면 상당히 깔끔해진 것을 볼 수 있다.

지금까지 비동기를 동기방식처럼 특정한 순서를 지키고 싶을 때 어떻게 할 수 있을지를 간략하게 소개했다.<br>
기억해야 할 핵심은, 만약 개발환경이 ES5 이하라면 콜백 지옥에 빠지지 않도록 최대한 의미있는 메소드 분리를 이뤄놓아 코드의 깊이를 일관되게 유지시키는<br>
것이 중요하고, 개발환경이 ES6 이상이라면 Promise 객체를 반환한다는 점을 최대한 살려 코드의 가독성과 의미를 극대화시키는 쪽에 집중하도록 하자.<br>
