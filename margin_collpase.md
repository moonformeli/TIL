## 마진 병합 (margin collapse)

마진 병합은 margin-top, margin-bottom 에서 일어나는 현상으로 위 아래 엘리먼트의 마진 중에서 더 큰 마진이 적용되는 현상이다.

```html

<html>
    <body>
        <div class="parent">
            <div class="child1"></div>
            <div class="child2"></div>
        </div>
    </body>
</html>

<style>
.parent {
    width: 200px;
    heigut: auto;
    border: 1px solid red;
}
.child1 {
    width: 100px;
    height: 120px;
    margin: 10px auto;
    border: 1px solid blue;
}
.child2 {
    width: 100px;
    height: 120px;
    margin: 20px auto;
    border: 1px solid blue;
}
</style>

```

위의 예시를 보면 `child1` 의 마진은 위아래 `10px`로 적용이 되어있고 `child2` 의 마진은 위아래 `20px`으로 설정되어있다. 
그러나 [CSS 공식 문서 - margin collapse](https://www.w3.org/TR/CSS2/box.html#collapsing-margins)에도 잘 정리가 되어있다.
마진 병합은 위 아래에서만 적용되고 왼쪽, 오른쪽 마진에는 적용되지 않는다. 
