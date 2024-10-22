---
title: React Hook - useRef
date: '2024-11-18 18:00:00'
sidebar: true
categories:
  - React
tags:
  - React
publish: false
---

## 概念解释
> 作用是“勾住”某些组件挂载完成或重新渲染完成后才拥有的某些对象，并返回该对象的引用。该引用在组件整个生命周期中都固定不变，该引用并不会随着组件重新渲染而失效。

#### useRef是来解决什么问题的？
> useRef可以“获取某些组件挂载完成或重新渲染完成后才拥有的某些对象”的引用，且保证该引用在组件整个生命周期内固定不变，都能准确找到我们要找的对象。

## 基本用法
> useRef(initialValue)函数只有1个可选参数，该参数为默认“勾住”的对象。绝大多数实际的情况是，默认“勾住”的对象在JSX未编译前(组件挂载或重新渲染后)根本不存在，所以更多时候都会传一个 null 作为默认值。如果不传任何参数，那么react默认将参数设置为undefined。


#### useRef使用示例1
若我们有一个组件，该组件只有一个输入框，我们希望当该组件挂载到网页后，自动获得输入焦点。

需求分析：
+ 我们可以很轻松使用input创建出这个输入框。
+ 需要使用useRef “勾住”这个输入框，当它被挂载到网页后，通过操作原生html的方法，将焦点赋予该输入框上。

完整代码如下：
```tsx
import React,{useEffect,useRef} from 'react'

function Component() {
  //先定义一个inputRef引用变量，用于“勾住”挂载网页后的输入框
  const inputRef = useRef(null);

  useEffect(() => {
    //inputRef.current就是挂载到网页后的那个输入框，一个真实DOM，因此可以调用html中的方法focus()
    inputRef.current.focus();
  },[]);

  return <div>
      {/* 通过 ref 属性将 inputRef与该输入框进行“挂钩” */}
      <input type='text' ref={inputRef} />
    </div>
}
export default Component

// 注意：
// 1、在给组件设置 ref 属性时，只需传入 inputRef，千万不要传入 inputRef.current。
// 2、在“勾住”渲染后的真实DOM输入框后，能且只能调用原生html中该标签拥有的方法。
```

#### useRef使用示例2
若我们有一个组件，该组件的功能需求如下：
+ 组件中有一个变量count，当该组件挂载到网页后，count每秒自动 +1。
+ 组件中有一个按钮，点击按钮可以停止count自动+1。

需求分析：
+ 声明内部变量count用 useState
+ 可以在useEffect 通过setInterval创建一个计时器timer，实现count每秒自动 +1
+ 当组件卸载前，需要通过 clearInterval 将timer清除
+ 按钮点击处理函数中，也要通过 clearInterval 将timer清除

#### 不使用useRef
```tsx
import React,{useState,useEffect} from 'react'

function Component() {
  const [count,setCount] = useState(0);
  const [timer,setTimer] = useState(null); //单独声明定义timer，目的是为了让组件内所有地方都可以访问到timer

  useEffect(() => {
    //需要用setTimer()包裹住 setInterval()
    setTimer(setInterval(() => {
        setCount((prevData) => {return prevData +1});
    }, 1000));
    return () => {
      //清除掉timer
      clearInterval(timer);
    }
  },[]);

  const clickHandler = () => {
    //清除掉timer
    clearInterval(timer);
  };

  return (
    <div>
        {count}
        <button onClick={clickHandler} >stop</button>
    </div>
  )
}

export default Component
```

#### 使用useRef
```tsx
import React,{useState,useEffect,useRef} from 'react'

function Component() {
  const [count,setCount] =  useState(0);
  const timerRef = useRef(null);//先定义一个timerRef引用变量，用于“勾住”useEffect中通过setIntervale创建的计时器

  useEffect(() => {
    //将timerRef.current与setIntervale创建的计时器进行“挂钩”
    timerRef.current = setInterval(() => {
        setCount((prevData) => { return prevData +1});
    }, 1000);
    return () => {
        //通过timerRef.current，清除掉计时器
        clearInterval(timerRef.current);
    }
  },[]);

  const clickHandler = () => {
    //通过timerRef.current，清除掉计时器
    clearInterval(timerRef.current);
  };

  return (
    <div>
        {count}
        <button onClick={clickHandler} >stop</button>
    </div>
  )
}

export default Component
```

#### 两种实现方式对比
+ 两种实现方式最主要的差异地方在于 如何创建组件内对计时器的引用。
+ 两种创建引用的方式，分别是：用useState创建的timer、用useRef创建的timerRef
+ 在使用setInterval时，相对来说timerRef.current更加好用简单，结构清晰，不需要像 setTimer那样需要再多1层包裹。
+ timer更像是一种react对计时器的映射，而timerRef直接就是真实DOM中计时器的引用，timerRef能够调用更多的原生html中的JS方法和属性。

结论
+ 如果需要对渲染后的DOM节点进行操作，必须使用useRef。
+ 如果需要对渲染后才会存在的变量对象进行某些操作，建议使用useRef。