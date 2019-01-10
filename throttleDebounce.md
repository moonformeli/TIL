# throttle과 debounce의 이해

* ### throttle<br>
어떤 이벤트를 동시에 너무 많이 실행을 시키지 못하도록 제어하는 기법으로, 주로 ```<a>```태그의 ```onClick```속성에 걸거나
 API호출을 하는 ```<button>```에 건다. 다음과 같은 형식으로 사용할 수 있다.
 
```javascript
const throttled = function(delay, fn) {
    let lastCall = 0;
    return (...args) => {
        const context = this;
        const current = new Date().getTime();
        
        if (current - lastCall < delay) {
            return;
        }
        lastCall = current;
        
        return fn.apply(context, ...args);
    };
};

const handleClick = throttled(2000, () => { console.log('throttle is invoked') });
const btn = document.getElementById('btn');
btn.addEventListener('click', handleClick);
```

다음은 ```setTimeout```을 이용해 구현하느 방법이다.
```javascript
const throttled = function(delay, fn) {
    let timeId;
    return (...args) => {
        const context = this;
        if (timeId) {
            clearTimeout(timeId);
        }
        
         timeId = setTimeout(() => {
            fn.apply(context, ...args);
            timeId = null;
        }, delay);
    };
}
```
throttle을 ```setTimeout```을 이용해 구현하는 방법도 있으나 개인적으로 나는 아래와 같은 이유로 선호하지 않는다.
* ```clearTimeout```을 같이 관리해줘야한다. [W3C Timers](https://www.w3.org/TR/2011/WD-html5-20110525/timers.html#dom-windowtimers-settimeout)에 따르면 
```setTimeout```은 ```timerId```라는 양의 정수 값을 리턴하고 *list of active timeouts*에 넣어 관리한다. 즉 ```clearTimeout```을 
사용할 때도 마찬가지로 *list of active timeouts*를 순회하면서 ```timerId```에 맞는 핸들러를 찾을 것이기 때문에 ```throttled```이 실행될 때마다
O(n)의 시간복잡도를 요구하게 된다. 물론 O(n)은 O(1)인 HashMap, O(logn)인 트리 탐색다음으로 좋~~다고 해야하나~~은 알고리즘이기 때문에
크게 상관은 없을 것이다. 그리고 ```if (current - lastCall < delay)``` 연산 또한 매번 실행될 것이기 때문에 연산 속도면에선 엄청 큰 차이는 없을 것으로 보인다. 
* 그러나 ```setTimeout```을 사용해 ```throttled```을 구현하는 순간 ```async```의 특성을 띠게 될 것이다. 그렇다 나는 단순히 ```async```를 원하지 않는 것이다. ~~비동기로 쓰지도 않을건데 왜?~~

* ### debounce<br>
위의 ```throttle```은 메소드를 처음 실행시키고 원하는 시간동안은 연속적으로 같은 메소드가 실행되지 못하도록 막아주는 역할을 했다면, 
```debounce```는 연속적인 이벤트의 발생을 완전 봉쇄하는 느낌이다. 파라미터로 넘겨준 ```delay```의 interval 이전에 이벤트가 발생하면 그 이벤트는
실행되지 않고 중복 이벤트가 발생된 시점을 기준으로 다시 카운트를 시작한다.

```javascript
const debounce = function(delay, fn) {
    let timeId;
    return (...args) => {
        const context = this;
        
        if (timeId) {
            clearTimeout(timeId);
        }
        setTimeout(() => fn.apply(context, ...args), delay);
    };
};

const handleClick = debounce(2000, () => { console.log('debounce is invoked') });
const btn = document.getElementById('btn');
btn.addEventListener('click', handleClick);
```
위의 코드를 살펴보면 ```debounce```가 실행될 때 마다 조건문을 평가한다. 즉 최초 실행 당시엔 ```timeId == undefined```이기 때문에
조건문을 통과하지 못한 상태로 ```setTimeout```을 바로 실행하고 정해진 지연 시간만큼 후에 실행되겠지만, 지연 함수가 실행되기전에 
다시 한 번 ```debounce```가 실행이 되면 closure에 의해 저장된 ```timeId```때문에 조건문을 통과하면서 타임아웃 함수를 초기화해버린다. 
그리고 다시 타임아웃을 등록한다. 즉, 지연 시간 이전에 함수를 다시 실행하면 원래 계획된 함수는 실행되지 않는 것이다.
