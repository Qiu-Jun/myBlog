---
title: React Hook - useCallback
date: '2024-11-18 18:00:00'
sidebar: true
categories:
  - React
tags:
  - React
publish: false
---

## 概念解释
> 作用是“勾住”组件属性中某些处理函数，创建这些函数对应在react原型链上的变量引用。useCallback第2个参数是处理函数中的依赖变量，只有当依赖变量发生改变时才会重新修改并创建新的一份处理函数

#### useCallback是来解决什么问题的？
> useCallback是通过获取函数在react原型链上的引用，当即将重新渲染时，用旧值的引用去替换旧值，配合React.memo，达到“阻止组件不必要的重新渲染”。

> 详细解释：<br />
useCallback可以将组件的某些处理函数挂载到react底层原型链上，并返回该处理函数的引用，当组件每次即将要重新渲染时，确保props中该处理函数为同一函数(因为是同一对象引用，所以===运算结果一定为true)，跳过本次无意义的重新渲染，达到提高组件性能的目的。当然前提是该组件在导出时使用了React.memo()。

#### useCallback函数源码
```ts
export function useCallback<T>(
  callback: T,
  deps: Array<mixed> | void | null,
): T {
  const dispatcher = resolveDispatcher();
  return dispatcher.useCallback(callback, deps);
}
```

## 基本用法
> useCallback(callback,deps)函数通常传入2个参数，第1个参数为我们定义的一个“处理函数”，通常为一个箭头函数。第2个参数为该处理函数中存在的依赖变量，请注意凡是处理函数中有的数据变量都需要放入deps中。如果处理函数没有任何依赖变量，可以传入一个空数组[]。

#### useCallback使用示例
+ 若我们有一个自定组件<Button>，代码如下：
```tsx
import React from 'react'
function Button({label,clickHandler}) {
    //为了方便我们查看该子组件是否被重新渲染，这里增加一行console.log代码
    console.log(`rendering ... ${label}`);
    return <button onClick={clickHandler}>{label}</button>;
}
export default React.memo(Button); //使用React.memo()包裹住要导出的组件
```

+ 现在，我们要实现一个组件，功能如下：
    - 组件内部有2个变量age，salary
    - 有2个自定义组件Button，点击之后分别可以修改age，salary值

+ 若我们不使用useCallback，代码示例如下：
```tsx
import React,{useState,useCallback,useEffect} from 'react';
import Button from './button';

function Mybutton() {
  const [age,setAge] = useState(34);
  const [salary,setSalary] = useState(7000);

  useEffect(() => {
    document.title = `Hooks - ${Math.floor(Math.random()*100)}`;
  });

  const clickHandler01 = () => {
    setAge(age+1);
  };

  const clickHandler02 = () => {
    setSalary(salary+1);
  };

  return (
    <div>
        {age} - {salary}
        <Button label='Bt01' clickHandler={clickHandler01}></Button>
        <Button label='Bt02' clickHandler={clickHandler02}></Button>
    </div>
  )
}

// 实际运行中你会发现，无论点击哪个按钮，都会收到：
// rendering ... Bt01
// rendering ... Bt02

// 你只是点击操作了其中一个按钮，另外一个按钮也要跟着重新渲染一次，试想一下如果该组件中有100个子组件都要跟着重新渲染，那真的是性能浪费。
```

+ useCallback，代码示例如下：
```tsx
import React,{useState,useCallback,useEffect} from 'react';
import Button from './button';

function Mybutton() {
  const [age,setAge] = useState(34);
  const [salary,setSalary] = useState(7000);

  useEffect(() => {
    document.title = `Hooks - ${Math.floor(Math.random()*100)}`;
  });

  //使用useCallback()包裹住原来的处理函数
  const clickHandler01 = useCallback(() => {
    setAge(age+1);
  },[age]);

  //使用useCallback()包裹住原来的处理函数
  const clickHandler02 = useCallback(() => {
    setSalary(salary+1);
  },[salary]);

  return (
    <div>
        {age} - {salary}
        <Button label='Bt01' clickHandler={clickHandler01}></Button>
        <Button label='Bt02' clickHandler={clickHandler02}></Button>
    </div>
  )
}
// 修改后的代码，实际运行就会发现，当点击某个按钮时，仅仅是当前按钮重新做了一次渲染，另外一个按钮则没有重新渲染，而是直接使用上一次渲染结果。

// 使用useCallback减少子组件没有必要的渲染目的达成。

// useCallback用法很简单，就是包裹住原本的处理函数。关键点在于你要理解useCallback背后的机理，才能知道在什么情况下可以使用useCallback。否则很容易滥用 useCallback，反而造成性能的浪费。
```