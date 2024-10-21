---
title: React Hook - useContext
date: '2024-11-17 18:00:00'
sidebar: true
categories:
  - React
tags:
  - React
publish: false
---

## 概念解释
> 作用是“勾住”获取由`React.createContext()`创建, `<XxxContext.Provider>`添加设置的共享数据value值。useContext可以替代`<XxxContext.Consumer>`标签，简化获取共享数据的代码

原本不同级别的组件之间传递属性值，必须逐层传递，即使中间层的组件不需要这些数据。<br />
注意：这里说的组件指React所有组件，包含类组件和函数组件。

```txt
数据层层传递增加了组件的复杂性，降低了可复用性。为了解决这个问题，我们可以使用以下方式：
1：在组件顶层或单独的模块中，由React.createContext()创建一个共享数据对象；
2：在父组件中添加共享数据对象的引用，通过且只能通过"<XxxContext.provider value={{xx:'xxx'}}></XxxContext.provider>"的形式将数据传递给子组件。请注意传值必须使用value={obj}这种形式；
3：若下一层的子组件用不到共享数据对象中的数据，则可以不做任何属性标签传递；
4：若某一层的子组件需要用到共享数据对象的数据，则可通过`<XxxContext.Consumer></XxxContext.Consumer>`获取到数据；
5: 在类组件中除了`<XxxContext.Consumer>`标签，还有另外一种获取共享数据方式：static xxx = XxxContext; 但是这种形式在函数组件中无法使用。

```

简而言之`<XxxContext.Provider>`用来添加共享数据、`<XxxContext.Consumer>`用来获取共享数据。<br />
备注：provider单词本意为供应者、consumer单词本意为消费者，刚好对应他们相对于共享数据的关系。

#### useContext是来解决什么问题的？
> useContext是`<XxxContext.Consumer>`的替代品，可以大量简化获取共享数据值的代码。

补充说明：
+ 函数组件和类组件，对于`<XxxContext.Provider>`、`<XxxContext.Consumer>`使用方式没有任何差别。
+ 你可以在函数组件中不使用useContext，继续使用`<XxxContext.Consumer>`，这都没问题。只不过使用useContext后，可以让获取共享数据相关代码简单一些。

#### useContext函数源码
```tsx
//备注：源码采用TypeScript编写，如果不懂TS代码，阅读起来稍显困难
export function useContext<T>(
  Context: ReactContext<T>,
  unstable_observedBits: number | boolean | void,): T {
  const dispatcher = resolveDispatcher();
  if (__DEV__) {
    if (unstable_observedBits !== undefined) {
      console.error(
        'useContext() second argument is reserved for future ' +
        'use in React. Passing it is not supported. ' +
        'You passed: %s.%s',
        unstable_observedBits,
        typeof unstable_observedBits === 'number' && Array.isArray(arguments[2])
        ? '\n\nDid you call array.map(useContext)? ' +
          'Calling Hooks inside a loop is not supported. ' +
          'Learn more at https://fb.me/rules-of-hooks'
        : '',
      );
  }

  // TODO: add a more generic warning for invalid values.
  if ((Context: any)._context !== undefined) {
    const realContext = (Context: any)._context;
    // Don't deduplicate because this legitimately causes bugs
    // and nobody should be using this in existing code.
    if (realContext.Consumer === Context) {
      console.error(
        'Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' +
          'removed in a future major release. Did you mean to call useContext(Context) instead?',
      );
    } else if (realContext.Provider === Context) {
      console.error(
        'Calling useContext(Context.Provider) is not supported. ' +
          'Did you mean to call useContext(Context) instead?',
      );
    }
  }
}
  return dispatcher.useContext(Context, unstable_observedBits);
}
```

## 基本用法
> useContext(context)函数可以传入1个参数，该参数为共享数据对象的实例，useContext函数会返回该共享对象实例的value值

示例代码1

```jsx
import GlobalContext from './global-context'; //引入共享数据对象

function Component(){
  const global = useContext(GlobalContext); //在函数组件中声明一个变量来代表该共享数据对象的value值

  //若想获取共享数据对象中的属性xxx的值，直接使用global.xxx即可
  return <div>
    {global.xxx}
  </div>
}

// 1、子组件(函数组件)需要先引入共享数据对象GlobalContext；
// 2、内部定义一个常量global，用来接收useContext函数返回GlobalContext的value值；
// 3、函数组件在return时，可以不使用<GlobalCount.Customer>标签，而是直接使用global.xx来获取共享数据；
// 4、请注意，这里执行的依然是单向数据流，只可以获取global.xx，不可以直接更改global.xx;
```

示例代码2
```tsx
// 若某React组件一共由3层组件嵌套而成，从外到里分别是AppComponent、MiddleComponent、ChildComponent。AppComponent需要传递数据给ChildComponent。

//global-context.js 
import React from 'react';
const GlobalContext = React.createContext(); //请注意，这里还可以给React.createContext()传入一个默认值
//例如：const GlobalContext = React.createContext({name:'Yang',age:18})
//假如<GlobalContext.Provider>中没有设置value的值，就会使用上面定义的默认值
export default GlobalContext;


//component.js
import React, { useContext } from 'react';
import 
 from './global-context';

function AppComponent() {
  //标签<GlobalContext.Provider>中向下传递数据，必须使用value这个属性，且数据必须是键值对类型的object
  //如果不添加value，那么子组件获取到的共享数据value值是React.createContext(defaultValues)中的默认值defaultValues
  return <div>
    <GlobalContext.Provider value={{name:'puxiao',age:34}}>
        <MiddleComponent />
    </GlobalContext.Provider>
  </div>
}

function MiddleComponent(){
  //MiddleComponent 不需要做任何 “属性数据传递接力”，因此降低该组件数据传递复杂性，提高组件可复用性
  return <div>
    <ChildComponent />
  </div>
}  

function ChildComponent(){
  const global = useContext(GlobalContext); //获取共享数据对象的value值
  //忘掉<GlobalContext.Consumer>标签，直接用global获取需要的值
  return <div>
    {global.name} - {global.age}
  </div>
}
```

## 高级用法

#### 同时传递多个共享数据值给1个子组件
实现以下组件需求：
+ 有2个共享数据对象 UserContext、NewsContext
+ 父组件为AppComponent、子组件为ChildComponent
+ 父组件需要同时将UserContext、NewsContext的数据同时传递给子组件

```tsx
import React,{ useContext } from 'react'

const UserContext = React.createContext();
const NewsContext = React.createContext();

function AppComponent() {
  return (
    <UserContext.Provider value={{name:'puxiao'}}>
        <NewsContext.Provider value={{title:'Hello React Hook.'}}>
            <ChildComponent />
        </NewsContext.Provider>
    </UserContext.Provider>
  )
}

function ChildComponent(){
  const user = useContext(UserContext);
  const news = useContext(NewsContext);
  return <div>
    {user.name} - {news.title}
  </div>
}
// 1、父组件同时要实现传递2个共享数据对象value值，需要使用<XxxContext.Provider value={obj}>标签进行2次嵌套。
// 2、子组件使用了useContext，他可以自由随意使用父组件传递过来的共享数据value，并不需要多次嵌套获取。
```

#### 同时将1个共享数据值传递给多个子组件
使用`<XxxContext.Provider></XxxContext.Provider>`标签将多个子组件包裹起来，即可实现。
```tsx
<XxxContext.Provider value={{name:'puxiao'}}>
    <ComponentA />
    <ComponentB />
    <ComponentC />
</XxxContext.Provider>
// 3个子组件<ComponentA />、<ComponentB />、<ComponentC />都可使用useContext获取共享数据值。
```
