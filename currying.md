# currying 함수의 이해

* ### currying 함수란 무엇인가?
[wiki](https://en.wikipedia.org/wiki/Currying)의 따른 currying 함수의 정의는 다음과 같다. 
> currying is the technique of translating the evaluation of 
a function that takes multiple arguments into evaluating a sequence of functions,
 each with a single argument.
 
_currying 함수는 여러 개의 인자를 받는 함수를 단일 인자를 받는 함수의 연속적인 연결형태로 변환하는 기술이다._

예를 들어 다음과 같은 함수가 있다면,
```javascript
const sum = (a, b, c, d) => a + b + c + d;
// sum(1, 2, 3, 4) == 10
```

currying 함수는 이 함수를 단일 인자로 받는 함수의 연속으로 풀어주는 형태라고 할 수 있다.
```javascript
const sum = a => b => c => d => a + b + c + d;
// sum(1)(2)(3)(4) == 10
```

currying의 단순 개념 자체는 어려운 것이 아니지만 함수형 프로그래밍을 이해하려면 반드시 알고 있어야 하는 개념이다.