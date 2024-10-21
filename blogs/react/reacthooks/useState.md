---
title: React Hook - useState
date: '2024-11-17 18:00:00'
sidebar: true
categories:
  - React
tags:
  - React
publish: false
---

## 简单使用
> useState(value)函数会返回一个数组，该数组包含2个元素：第1个元素为我们定义的变量，第2个元素为修改该变量对应的函数名称

代码形式：
```ts
const [variable,setVariable] = useState(value);
//....
setVariable(newValue);//修改variable的值
```

## 高级用法
#### 恢复默认值
> 组件需求：实现一个计数器，有3个按钮，点击后分别实现：恢复默认值、点击+1、点击-1
```ts
import React, { useState } from 'react';

function Component() {
  const initCount = 0;
  const [count, setCount] = useState(initCount);

  return <div>
    {count}
    <button onClick={() => {setCount(initCount)}}>init</button>
    <button onClick={() => {setCount(count+1)}}>+1</button>
    <button onClick={() => {setCount(count-1)}}>-1</button>
  </div>
}
```

#### 解决数据异步
```ts
/**
 * error 无论for循环执行几次，最终实际结果都将是仅仅执行一次 +1
 * 因为类组件中setState赋值过程是异步的
 */
for(let i=0; i<3; i++){
  setCount(count+1);
}

// 方法一
let num = count;
for(let i=0; i<3; i++){
  num +=1;
}
setCount(num);

// 方法二
for(let i=0; i<3; i++){
  setCount(prevData => {return prevData+1});
  //可以简化为 setCount(prevData => prevData+1);
}
```
#### 数据类型为Objcet的修改方法
```ts
const [person, setPerson] = useState({name:'puxiao', age:34});

// error
console.log(person);//{name:'puxiao',age:34}
setPerson({age:18});
console.log(person);//{age:18}

// 方法
setPerson({...person,age:18});
```
#### 数据类型为Array的修改方法
> 与Object一样
```ts
import React, { useState } from 'react';

function Component() {

  const [str, setStr] = useState('');
  const [arr, setArr] = useState(['react', 'Koa']);

  const inputChangeHandler = (eve) => {
    setStr(eve.target.value);
  }

  const addHeadHandler = (eve) => {
    setArr([str,...arr]);//添加至头
    setStr('');
  }

  const addEndHandler = (eve) => {
    setArr([...arr, str]);//添加至尾
    setStr('');
  }

  const delHeadHandler = (eve) => {
    let new_arr = [...arr];
    new_arr.shift();//从头删除1项目
    setArr(new_arr);
  }

  const delEndHandler = (eve) => {
    let new_arr = [...arr];
    new_arr.pop();//从尾删除1项目
    setArr(new_arr);
  }

  const delByIndex = (eve) => {
    let index = eve.target.attributes.index.value;
    let new_arr = [...arr];
    new_arr.splice(index,1);//删除当前项
    setArr(new_arr);
  }

  return <div>
    <input type='text' value={str} onChange={inputChangeHandler} />
    <button onClick={addHeadHandler} >添加至头</button>
    <button onClick={addEndHandler} >添加至尾</button>
    <button onClick={delHeadHandler} >从头删除1项</button>
    <button onClick={delEndHandler} >从尾删除1项</button>
    <ul>
        {arr.map(
            (item, index) => {
                return <li key={`item${index}`}>学习{index} -  {item}
                    <span index={index} onClick={delByIndex} style={{ cursor: 'pointer' }}>删除</span>
                </li>
            }
        )}
    </ul>
  </div>
}
```

#### 性能优化
> 通过 setXxx 设置新值，但是如果新值和当前值完全一样，那么会引发React重新渲染吗？
> 通过React官方文档可以知道，当使用 setXxx 赋值时，Hook会使用Object.is()来对比当前值和新值，结果为true则不渲染，结果为flash就会重新渲染。
```ts
let str='a';
Object.is(str,'a'); //true

let str='18';
Object.is(str,18); //str为String类型，18为Number类型，因此结果为false

let obj={name:'a'};
Object.is(obj,{name:'a'}); //false
//虽然obj和{name:'a'}字面上相同，但是obj==={name:'a'}为false，并且在Object.is()运算下认为两者不是同一个对象
//事实上他们确实不是同一个对象，他们各自占用了一份内存

let obj={name:'a'};
let a=obj;
let b=obj;
Object.is(a,b); //因为a和b都指向obj，因此结果为true
```

由上面测试可以看出：
+ 对于简单类型的值，例如String、Number 新旧值一样的情况下是不会引起重新渲染的；
+ 对于复杂类型的值，即使新旧值 “看上去是一样的” 也会引起重新渲染。除非新旧值指向同一个对象，或者可以说成新旧值分别是同一个对象的引用；

采用复杂类型的值不是不可以用，很多场景下都需要用到，但是请记得上面的测试结果。

为了可能存在的性能问题，如果可以，最好避免使用复杂类型的值。