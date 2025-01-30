---
title: React Hook - useMemo
date: 2024-11-18
sidebar: true
categories:
  - React
tags:
  - React
publish: false
---

## 概念解释
> 作用是“勾住”组件中某些处理函数的返回值，创建这些返回值对应在react原型链上的索引。当组件重新渲染时，需要再次用到这些函数返回值，此时不再重新执行一遍运算，而是直接使用之前运算过的返回值。useMemo第2个参数是处理函数的变量依赖，只有当处理函数依赖的变量发生改变时才会重新计算并保存一次函数返回结果。

#### useMemo是来解决什么问题的？
> useMemo的目的是“减少组件重新渲染时不必要的函数计算”。<br />
useMemo可以将某些函数的计算结果(返回值)挂载到react底层原型链上，并返回该函数返回值的索引。当组件重新渲染时，如果useMemo依赖的数据变量未发生变化，那么直接使用原型链上保存的该函数计算结果，跳过本次无意义的重新计算，达到提高组件性能的目的。

补充说明：
+ useMemo并不需要子组件必须使用React.memo
+ “不必要的函数计算”中的函数计算必须是有一定复杂度的，例如需要1000个for循环才能计算出的某个值。如果计算量本身很简单，例如1+2，那完全没有必要使用useMemo，就直接每次重新计算一遍也无所谓。

#### useMemo函数源码
```ts
export function useMemo<T>(
  create: () => T,
  deps: Array<mixed> | void | null,
): T {
  const dispatcher = resolveDispatcher();
  return dispatcher.useMemo(create, deps);
}
```

## 基本用法
> useMemo(create,deps)函数通常传入2个参数，第1个参数为我们定义的一个“包含复杂计算且有返回值的函数”，第2个参数为该处理函数中存在的依赖变量，请注意凡是处理函数中有的数据变量都需要放入deps中。如果处理函数没有任何依赖变量，可以传入一个空数组[]。

注意：
+ useMemo只是理论上帮你进行组件计算性能优化，但是react并不能保证100%都是按照你的预期来执行的。比如说当你的网页处于离屏(休眠、挂起)等状态时，react底层原型链也许就会释放(删除)之前保存的函数返回值。等到下次网页重新被唤醒时，重新计算一次。
+ 关于useMemo第2个参数，和useCallback一样，也许在未来版本中react会智能识别，不需要要我们再手工传入。


代码形式：
```ts
const xxxValue = useMemo(() => {
    let result = xxxxx;
    //经过复杂的计算后
    return result;
}, [xx]);

// 1、使用useMemo()将计算函数包裹住，将计算函数中使用到的数据变量作为作为第2个参数。
// 2、计算函数体内，把计算结果以 return 形式返回出去。
// 3、xxxValue 为该函数返回值在react原型链上的引用。
```

#### useMemo使用示例
举例：若某React组件内部有2个number类型的变量num，random，有2个button，点击之后分别可以修改num，random的值。 与此同时，该组件中还要求显示出num范围内的所有质数个数总和。

补充说明：加入random纯粹是为了引发组件重新渲染，方便我们查看到useMemo是否启了作用。

需求分析：
+ 显示出num范围内的所有质数个数总和，这个就是本组件中的“复杂的计算”。
+ 只要num的值未发生变化，质数总数是固定的，那么我们应该避免每次重新渲染时都需要计算一遍。
+ useMemo函数，就是帮我们解决这个问题。

```tsx
import React,{useState,useMemo} from 'react'

function UseMemo() {
  const [num,setNum] = useState(2020);
  const [random,setRandom] = useState(0);

  //通过useMemo将函数内的计算结果(返回值)保存到react底层原型链上
  //totalPrimes为react底层原型链上该函数计算结果的引用
  const totalPrimes = useMemo(() => {
    console.log('begin....'); //这里添加一个console.log，方便验证在重新渲染时是否重新执行了一遍计算

    let total = 0; //声明质数总和对应的变量

    //以下为计算num范围内所有质数个数总和的计算代码，不需要认真阅读，只需要知道这是一段“比较复杂的计算代码”即可
    for(let i = 1; i<=num; i++){
        let boo = true;
        for(let j = 2; j<i; j++){
            if(i % j === 0){
                boo = false;
                break;
            }
        }
        if(boo && i!==1){
            total ++;
        }
    }
    //复杂的计算代码到此结束

    return total;//将质数总和作为返回值return出去
  }, [num]);

  const clickHandler01 = () => {
    setNum(num+1);
  }

  const clickHandler02 = () => {
    setRandom(Math.floor(Math.random()*100)); //修改random的值导致整个组件重新渲染
  }

  return (
    <div>
        {num} - {totalPrimes} - {random}
        <button onClick={clickHandler01}>num + 1</button>
        <button onClick={clickHandler02}>random</button>
    </div>
  )
}

export default UseMemo;

// 实际运行就会发现：
// 1、点击修改random的值会引发组件重新渲染，但是{totalPrimes}对应的计算函数却不需要重新计算一遍。
// 2、点击修改num的值，{totalPrimes}对应的计算函数肯定会重新执行一遍，因为num是该计算函数的依赖。
```