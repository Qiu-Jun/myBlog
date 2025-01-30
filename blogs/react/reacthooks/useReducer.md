---
title: React Hook - useReducer
date: 2024-11-18
sidebar: true
categories:
  - React
tags:
  - React
publish: false
---

## 概念解释
> 作用是“勾住”某些自定义数据对应的dispatch所引发的数据更改事件。useReducer可以替代useState，实现更为复杂逻辑的数据修改

#### useReducer是来解决什么问题的？
> useReducer是useState的升级版(实际上应该是原始版)，可以实现复杂逻辑修改，而不是像useState那样只是直接赋值修改

补充说明：<br />
1、在React源码中，实际上useState就是由useReducer实现的，所以useReducer准确来说是useState的原始版。<br />
2、无论哪一个Hook函数，本质上都是通过事件驱动来实现视图层更新的。

#### useReducer函数源码
```ts
//备注：源码采用TypeScript编写，如果不懂TS代码，阅读起来稍显困难
export function useReducer<S, I, A>(
  reducer: (S, A) => S,
  initialArg: I,
  init?: I => S,
): [S, Dispatch<A>] {
  const dispatcher = resolveDispatcher();
  return dispatcher.useReducer(reducer, initialArg, init);
}
```

## 基本用法
> useReducer(reducer,initialValue)函数通常传入2个参数，第1个参数为我们定义的一个“由dispatch引发的数据修改处理函数”，第2个参数为自定义数据的默认值，useReducer函数会返回自定义变量的引用和该自定义变量对应的“dispatch”

示例代码：
```tsx
import React, { useReducer } from 'react'; //引入useReducer
//定义好“事件处理函数” reducer
function reducer(state, action) {
  switch (action) {
    case 'xx':
        return xxxx;
    case 'xx':
        return xxxx;
    default:
        return xxxx;
  }
}

function Component(){
  //声明一个变量xxx，以及对应修改xxx的dispatch
  //将事件处理函数reducer和默认值initialValue作为参数传递给useReducer
  const [xxx, dispatch] = useReducer(reducer, initialValue); 

  //若想获取xxx的值，直接使用xxx即可
  
  //若想修改xxx的值，通过dispatch来修改
  dispatch('xx');
}

//请注意，上述代码中的action只是最基础的字符串形式，事实上action可以是多属性的object，这样可以自定义更多属性和更多参数值
//例如 action 可以是 {type:'xx',param:xxx}
```

#### useReducer使用示例1
举例：若某React组件内部有一个变量count，默认值为0，有3个button，点击之后分别可以修改count的值。3个按钮具体的功能为：第1个button点击之后count+1，第2个button点击之后count -1，第3个button点击之后 count x 2 (翻倍)。

若使用useState来实现，那肯定没问题，每个button点击之后分别运算得到对应的新值，将该值直接通过setCount赋予给count。

若使用useReducer来实现相同功能，代码示例如下：

```tsx
import React, { useReducer } from 'react';

function reducer(state,action){
  switch(action){
    case 'add':
        return state + 1;
    case 'sub':
        return state - 1;
    case 'mul':
        return state * 2;
    default:
        console.log('what?');
        return state;
  }
}

function CountComponent() {
  const [count, dispatch] = useReducer(reducer,0);

  return <div>
    {count}
    <button onClick={() => {dispatch('add')}} >add</button>
    <button onClick={() => {dispatch('sub')}} >sub</button>
    <button onClick={() => {dispatch('mul')}} >mul</button>
  </div>;
}
```

#### useReducer使用示例2
举例：在示例1中对count 执行的修改，数值变动都是固定的，即 +1、-1、x 2。假设我们希望按钮点击之后，能够自主控制增加多少、减多少、或乘以几，这个效果该怎么实现呢？

很简单，我们将dispatch('xxx')中的xxx由字符串改为obj，obj可以携带更多属性作为参数传给reducer。 比如之前对 "加"的命令 dispatch('add')，修改为 dispatch({type:'add',param:2})。 reducer可以通过action.type来区分是哪种命令、通过action.param来获取对应的参数。

为了简化代码，我们将在点击按钮后，随机产生一个数字，并将该数字作为 param 的值，传递给reducer。

修改后的代码为：
```tsx
import React, { useReducer } from 'react';

function reducer(state,action){
  //根据action.type来判断该执行哪种修改
  switch(action.type){
    case 'add':
      //count 最终加多少，取决于 action.param 的值
      return state + action.param;
    case 'sub':
      return state - action.param;
    case 'mul':
      return state * action.param;
    default:
      console.log('what?');
      return state;
  }
}

function getRandom(){
  return Math.floor(Math.random()*10);
}

function CountComponent() {
  const [count, dispatch] = useReducer(reducer,0);

  return <div>
    {count}
    <button onClick={() => {dispatch({type:'add',param:getRandom()})}} >add</button>
    <button onClick={() => {dispatch({type:'sub',param:getRandom()})}} >sub</button>
    <button onClick={() => {dispatch({type:'mul',param:getRandom()})}} >mul</button>
  </div>;
}
```

## 高级用法

#### 使用useReducer来管理复杂类型的数据
举例，若某组件内通过ajax请求数据，获取最新一条站内短信文字，需要组件显示整个ajax过程及结果：<br />
1、当ajax开始请求时，界面显示“loading...”；<br />
2、当ajax请求发生错误时，界面显示“wrong!”;<br />
3、当ajax请求成功获取数据时，界面显示获取到的数据内容；<br />

如果我们使用useState来实现上述功能，伪代码如下：
```tsx
// useState
function Component() {
  const [loading,setLoading] = useState(true); //是否ajax请求中，默认为true
  const [result,setResult] = useState(''); //请求数据内容，默认为''
  const [error,setError] = useState(false); //请求是否发生错误，默认为false

  {
      //ajax请求成功
      setLoading(false);
      setResult('You have a good news!');//请注意，这是一行伪代码，只是为了演示，并不是真正ajax获取的结果
      setError(false);

      //ajax请求错误
      setLoading(false);
      setError(true);
  }

  return <div>
    {loading ? 'loading...' : result}
    {error ? 'wrong!' : null}
  </div>
}


// useReducer
const initralData = {loading: true,result: '',error: false};

const reducer = (state, action) => {
  switch (action.type) {
    case 'succes':
        return {loading:false,result:action.res,error:false}
    case 'error':
        return {loading:false,error:true}
  }
}

function Component() {
  const [state, dispatch] = useReducer(reducer, initralData);

  {
      //ajax请求成功
      dispatch({type:'succes',res:'You have a good news!'});

      //ajax请求错误
      dispatch({type:'error'});
  }

  return <div>
    {state.loading ? 'loading...' : state.result}
    {state.error ? 'wrong!' : null}
  </div>
}

// 1、为什么看上去使用useReducer后代码变得更多？
// 答：因为使用useReducer，我们将修改数据拆分为2个部分，即“抛出修改事件和事件修改处理函数”。虽然代码增多了，但是逻辑更加清晰。

// 2、为什么不使用useState，同时把它对应的变量也做成一个obj，就像useReducer的initralData那种？
// 答：单纯从1次ajax请求很难看出使用useState或useReducer的差异，但是试想一下多次且ajax返回值在结构类型上容易发生变更，那么使用useReducer这种更加利于代码阅读、功能扩展。
```

#### 使用useContext和useReducer实现操作全局共享数据

+ 试想一下，如果想实现以下组件需求：
  - 父组件中定义某变量xx；
  - 任何层级下的子组件都可以轻松获取变量xx、并且可以“修改”变量xx；

> 注意这里的修改是加引号的，因为事实上你永远无法以直接赋值的方式进行修改，永远都需要调用父级组件提供的方法来修改。

+ 需求分析
  - 激动的心，颤抖的手，忘掉Redux，拥抱 React Hook！

> 首先这个功能是类组件无法做到的，也是React 16.8版本以前根本不能实现的，今天，当你使用Hook可轻松实现类似 Redux 共享数据管理功能

+ 实现原理
    - 用 useContext 实现“获取全局数据”
    - 用 userReducer 实现“修改全局数据”

+ 代码演示
    - 假设React组件需求为：
        + 有全局数据变量count；
        + 不同层级的子组件均可获取并修改全局变量count；

```txt
+ 实现思路
    - 用React.createContext()定义一个全局数据对象；
    - 在父组件中用 userReducer 定义全局变量xx和负责抛出修事件的dispatch；
    - 在父组件之外，定义负责具体修改全局变量的处理函数reducer，根据修改xx事件类型和参数，执行修改xx的值；
    - 在父组件中用 <XxxContext.Provider value={{xx,dispathc}}> 标签把 全局共享数据和负责抛出修改xx的dispatch 暴露给子组件；
    - 在子组件中用 useContext 获取全局变量；
    - 在子组件中用 xxContext.dispatch 去抛出修改xx的事件，携带修改事件类型和参数；
```

+ 共享对象 代码如下：
```ts
import React from 'react';
const CountContext = React.createContext();
export default CountContext;
```

+ 父组件 代码如下：
```tsx
import React, { useReducer } from 'react';
import CountContext from './CountContext';
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';
import ComponentC from './ComponentC';

const initialCount = 0; //定义count的默认值

//修改count事件处理函数，根据修改参数进行处理
function reducer(state, action) {
//注意这里先判断事件类型，然后结合携带的参数param 来最终修改count
switch (action.type) {
    case 'add':
        return state + action.param;
    case 'sub':
        return state - action.param;
    case 'mul':
        return state * action.param;
    case 'reset':
        return initialCount;
    default:
        console.log('what?');
        return state;
}
}

function ParentComponent() {
  //定义全局变量count，以及负责抛出修改事件的dispatch
  const [count, dispatch] = useReducer(reducer, initialCount);

  //请注意：value={{count,dispatch} 是整个代码的核心，把将count、dispatch暴露给所有子组件
  return <CountContext.Provider value={{count,dispatch}}>
    <div>
        ParentComponent - count={count}
        <ComponentA />
        <ComponentB />
        <ComponentC />
    </div>
  </CountContext.Provider>
}

export default ParentComponent;
```
+ 子组件A 代码如下：
```tsx
import React,{ useState, useContext } from 'react';
import CountContext from './CountContext';

function CopmpoentA() {
  const [param,setParam] = useState(1);
  //引入全局共享对象，获取全局变量count，以及修改count对应的dispatch
  const countContext = useContext(CountContext);

  const inputChangeHandler = (eve) => {
    setParam(eve.target.value);
  }

  const doHandler = () => {
    //若想修改全局count，先获取count对应的修改抛出事件对象dispatch，然后通过dispatch将修改内容抛出
    //抛出的修改内容为：{type:'add',param:xxx}，即告诉count的修改事件处理函数，本次修改的类型为add，参数是param
    //这里的add和param完全是根据自己实际需求自己定义的
    countContext.dispatch({type:'add',param:Number(param)});
  }

  const resetHandler = () => {
    countContext.dispatch({type:'reset'});
  }

  return <div>
        ComponentA - count={countContext.count}
        <input type='number' value={param} onChange={inputChangeHandler} />
        <button onClick={doHandler}>add {param}</button>
        <button onClick={resetHandler}>reset</button>
    </div>
}

export default CopmpoentA;
```