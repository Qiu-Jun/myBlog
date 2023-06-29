---
title: 做题
date: 2022-01-28
sidebar: false
categories:
    - 前端
tags:
    - 面试
    - Javascript
publish: false
---

+ 输出系列
```javascript
// 第一题
function f(data) {
    if(data === {age: 18}) {
        console.log('A');
    } else if(data == {age: 18}) {
        console.log('C');
    } else {
        console.log('C');
    };
};
const d = {age: 18};
f(d); // C

// 第二题
console.log(1);
const p = new Promise((resolve) => {
    console.log(2);
    resolve()
    console.log(3);
})
p.then(() => {
    console.log(4);
})
console.log(5);
// 1,2,3,5,4

// 第三题
function foo() {
    var i = 0; // 这里不是逗号
    j = 0;
    return function() {
        console.log(i ++);
        console.log(j ++);
    };
};
var a = foo();
var b = f00();
a(); // 0 0
b(); // 0 1
a(); // 1 2
a(); // 2 3
```

+ 给定一个整数数组nums和一个整数目标值 target，请你在该数组中找出和为目标值target的那两个整数，并返回它们的数组下标。
> el: nums = [2,7,11,15], target = 9  输出：[0,1]
```javascript
function twoSum(nums, target) {
    let maps = new Map();
    for(let i = 0; i < nums.length; i ++) {
        const cut_val = target - nums[i];
        if(maps.has(cut_val)) return [maps.get(cut_val), i];
        maps.set(nums[i], i);
    }
};
```

+ 在一个数组中，右边的数字减去它左边的数字得到一个或者多个差值，输出差值最大是的数字组合(减数和被减数)
> el: 在数组[4, 14, 2, 7, 11, 13, 1, 9, 5]中, 最大差值为11， 输出13,2
```javascript
// 非最优解
const arr = [4, 14, 2, 7, 11, 13, 1, 9, 5];
function fn(arr) {
    const cache = new Map();
    const len = arr.length - 1;
    let r = 0;
    let l = 0;
    let d = 0;
    for(let i = len, j = 0; i > j; i --) {
        for(let k = i - 1, h = 0; k >= h; k --)  {
            r = arr[i];
            l = arr[k];
            if(r - l > d) {
                d = r - l;
                cache.set(d, `${r},${l}`);
            };
        };
    };
    return cache.get(d);
};
```
