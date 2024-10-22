---
title: React Hook - useLayoutEffect
date: '2024-11-18 18:00:00'
sidebar: true
categories:
  - React
tags:
  - React
publish: false
---

## 概念解释
> 作用是“勾住”挂载或重新渲染完成这2个组件生命周期函数。useLayoutEffect使用方法、所传参数和useEffect完全相同。

他们的不同点在于，你可以把useLayoutEffect等同于componentDidMount、componentDidUpdate，因为他们调用阶段是相同的。而useEffect是在componentDidMount、componentDidUpdate调用之后才会触发的。

也就是说，当组件所有DOM都渲染完成后，同步调用useLayoutEffect，然后再调用useEffect。

`useLayoutEffect永远要比useEffect先触发完成。`

#### 那通常在useLayoutEffect阶段我们可以做什么呢？
答：在触发useLayoutEffect阶段时，页面全部DOM已经渲染完成，此时可以获取当前页面所有信息，包括页面显示布局等，你可以根据需求修改调整页面。

请注意，useLayoutEffect对页面的某些修改调整可能会触发组件重新渲染。如果是对DOM进行一些样式调整是不会触发重新渲染的，这点和useEffect是相同的。

在react官方文档中，明确表示只有在useEffect不能满足你组件需求的情况下，才应该考虑使用useLayoutEffect。 官方推荐优先使用useEffect。

#### useLayoutEffect是来解决什么问题的？
useLayoutEffect的作用是“当页面挂载或渲染完成时，再给你一次机会对页面进行修改”。

如果你选择使用useLayoutEffect，对页面进行了修改，更改样式不会引发重新渲染，但是修改变量则会触发再次渲染。<br />
如果你不使用useLayoutEffect，那么之后就应该调用useEffect。

补充说明：
+ 优先使用useEffect，useEffect无法满足需求时再考虑使用useLayoutEffect。
+ useLayoutEffect先触发，useEffect后触发。
+ useEffect和useLayoutEffect在服务器端渲染时，都不行，需要寻求别的解决方案。

#### useLayoutEffect使用示例
```tsx
import React,{useState,useEffect,useLayoutEffect} from 'react'

function LayoutEffect() {
  const [count,setCount] = useState(0);

  useEffect(() => {
    console.log('useEffect...');
  },[count]);

  useLayoutEffect(() => {
    console.log('useLayoutEffect...');
  },[count]);

  return (
    <div>
        {count}
        <button onClick={() => {setCount(count+1)}}>Click</button>
    </div>
  )
}
export default LayoutEffect

// 实际运行：
// 无论是首次挂载，还是重新渲染，console面板中，输出顺序都是
// useLayoutEffect...
// useEffect...

// 也就确认，先执行useLayoutEffect，后执行useEffect。
```