---
title: 数组去重
date: '2022-01-20 08:00:00'
sidebar: true
categories:
    - 前端
tags:
    - 前端
publish: false
---

## ES6中的Set去重
```javascript
function unique(arr) {
    if (!Array.isArray(arr)) return
    // return [...new Set(arr)]
    return Array.from(new Set(arr));
}
```

## 双层for循环
```javascript
function unique(arr){
    if (!Array.isArray(arr)) return
    const arrLen = arr.length    
    for(let i = 0; i < arrLen; i++){
        for(let j = i+1; j < arrLen; j++){
            if(arr[i] === arr[j]){
                //第一个等同于第二个，splice方法删除第二个
                arr.splice(j, 1)
                j-- 
            }
        }
    }
    return arr
}
```

## 利用indexOf去重
```javascript
function unique(arr) {
    if (!Array.isArray(arr)) return
    const array = [];
    for (let i = 0; i < arr.length; i++) {
        if (array .indexOf(arr[i]) === -1) {
            array .push(arr[i])
        }
    }
    return array;
}
```

## 利用sort()
```javascript
function unique(arr) {
    if (!Array.isArray(arr)) return
    arr = arr.sort()
    const arrry= [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i-1]) {
            arrry.push(arr[i])
        }
    }
    return arrry
}
```

## 利用includes
```javascript
function unique(arr) {
    if (!Array.isArray(arr)) return
    const array =[];
    for(let i = 0; i < arr.length; i++) {
        if( !array.includes( arr[i]) ) {
            //includes 检测数组是否有某个值
            array.push(arr[i]);
        }
    }
    return array
}
```

## 利用hasOwnProperty
> 利用hasOwnProperty 判断是否存在对象属性
```javascript
function unique(arr) {
    const obj = {};
    return arr.filter(function(item, index, arr){
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
}
```