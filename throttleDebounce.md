#### throttle과 debounce의 이해

* #### throttle<br>
어떤 이벤트를 동시에 너무 많이 실행을 시키지 못하도록 제어하는 기법으로, 주로 ```<a>```태그의 ```onClick```속성에 걸거나
 API호출을 하는 ```<button>```에 건다. 다음과 같은 형식으로 사용할 수 있다.
 
```javascript
const throttled = (delay, fn) => {
    let lastCall = 0;
    return (...args) => {
        let context = this;
        let current = new Date().getTime();
        
        if (current - lastCall < delay) {
            return;
        }
        lastCall = current;
        
        return fn.apply(context, ...args);
    };
};

const handleClick = throttled(2000, () => { console.log('clicked') });
const btn = document.getElementById('btn');
btn.addEventListener('click', handleClick);
```
throttle을 ```setTimeout```을 이용해 구현하는 방법도 있으나 개인적으로 나는 아래와 같은 이유로 선호하지 않는다.
* ```clearTimeout```을 같이 관리해줘야한다. [W3C Timers](https://www.w3.org/TR/2011/WD-html5-20110525/timers.html#dom-windowtimers-settimeout)에 따르면 
```setTimeout```은 ```timerId```라는 양의 정수 값을 리턴하고 *list of active timeouts*에 넣어 관리한다. 즉 ```clearTimeout```을 
사용할 때도 마찬가지로 *list of active timeouts*를 순회하면서 ```timerId```에 맞는 핸들러를 찾을 것이기 때문에 ```throttled```이 실행될 때마다
O(n)의 시간복잡도를 요구하게 된다. 물론 O(n)은 O(1)인 HashMap, O(logn)인 트리 탐색다음으로 좋~~다고 해야하나~~은 알고리즘이기 때문에
크게 상관은 없을 것이다. 그리고 ```if (current - lastCall < delay)``` 연산 또한 매번 실행될 것이기 때문에 연산 속도면에선 엄청 큰 차이는 없을 것으로 보인다. 
* 그러나 ```setTimeout```을 사용해 ```throttled```을 구현하는 순간 ```async```의 특성을 띠게 될 것이다. 그렇다 나는 단순히 ```async```를 원하지 않는 것이다. ~~비동기로 쓰지도 않을건데 왜?~~

* #### debounce<br>
위의 ```throttle```은 메소드를 처음 실행시키고 원하는 시간동안은 연속적으로 같은 메소드가 실행되지 못하도록 막아주는 역할을 했다면, 
```debounce```는 