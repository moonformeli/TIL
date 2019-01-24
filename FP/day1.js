/**
 *
 *  가장 간단한 별찍기부터 작성해보자.
 *  절차형 먼저 작성하고 함수형으로 다시 작성해보자.
 *
 */

/**
 *  절차형
 */
const STAR = '\u2605';
const SPACE = '\u2800';

const star = l => {
    for (let i = 1; i <= l; i++) {
        let str = '';
        for (let j = 1; j <= l - i; j++) {
            str += SPACE;
        }
        for (let j = 1; j <= 2 * i - 1; j++) {
            str += STAR;
        }
        console.log(str);
    }
};

/**
 *  함수형
 *
 */

const STAR = '\u2605';
const SPACE = '\u2800';
const print = str => console.log(str);
const concat = args => args.join('');
const rep = ch => n => ch.repeat(n);
const loop = n => [...new Array(n + 1).keys()].slice(1);
const fp_star = l => {
    const spaces = rep(SPACE);
    const stars = rep(STAR);
    loop(l).forEach(i => print(concat([spaces(l - i), stars(2 * i - 1)])));
};

/**
 *  결과는 같았다.
 *  함수형 프로그래밍은 확실히 함수의 합성이 들어가면 알아보기가 힘든거같다.
 *  익숙해지는 날이 오겠지.
 */
