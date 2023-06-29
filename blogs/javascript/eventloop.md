---
title: EventLoop
date: '2022-02-04 20:10:00'
sidebar: auto
categories:
    - 前端
tags:
    - 前端
publish: true
---

### 关于javascript
javascript是一门单线程语言，在最新的HTML5中提出了Web-Worker，但javascript是单线程这一核心仍未改变。所以一切javascript版的"多线程"都是用单线程模拟出来的，一切javascript多线程都是纸老虎！

### javascript事件循环
既然js是单线程，那就像只有一个窗口的银行，客户需要排队一个一个办理业务，同理js任务也要一个一个顺序执行。如果一个任务耗时过长，那么后一个任务也必须等着。那么问题来了，假如我们想浏览新闻，但是新闻包含的超清图片加载很慢，难道我们的网页要一直卡着直到图片完全显示出来？因此聪明的程序员将任务分为两类：
+ 同步任务
+ 异步任务

<!-- ![](/imgs/eventloop/eventloop1.awebp) -->

导图要表达的内容用文字来表述的话：

+ 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table并注册函数
+ 当指定的事情完成时，Event Table会将这个函数移入Event Queue
+ 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行
+ 上述过程会不断重复，也就是常说的Event Loop(事件循环)

我们不禁要问了，那怎么知道主线程执行栈为空啊？js引擎存在monitoring process进程，会持续不断的检查主线程执行栈是否为空，一旦为空，就会去Event Queue那里检查是否有等待被调用的函数。
说了这么多文字，不如直接一段代码更直白：
```javascript
let data = [];
$.ajax({
    url:www.javascript.com,
    data:data,
    success:() => {
        console.log('发送成功!');
    }
})
console.log('代码执行结束');
```
上面是一段简易的ajax请求代码：
+ ajax进入Event Table，注册回调函数success
+ 执行console.log('代码执行结束')
+ ajax事件完成，回调函数success进入Event Queue
+ 主线程从Event Queue读取回调函数success并执行

相信通过上面的文字和代码，你已经对js的执行顺序有了初步了解。接下来我们来研究进阶话题：setTimeout。

### 事件循环，宏任务，微任务的关系
+ macro-task(宏任务)：包括整体代码script，setTimeout，setInterval
+ micro-task(微任务)：Promise，process.nextTick

不同类型的任务会进入对应的Event Queue，比如setTimeout和setInterval会进入相同的Event Queue。

事件循环的顺序，决定js代码的执行顺序。进入整体代码(宏任务)后，开始第一次循环。接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务。听起来有点绕，我们用文章最开始的一段代码说明：
```javascript
setTimeout(function() {
    console.log('setTimeout');
})

new Promise(function(resolve) {
    console.log('promise');
}).then(function() {
    console.log('then');
})

console.log('console');
```
+ 这段代码作为宏任务，进入主线程
+ 先遇到setTimeout，那么将其回调函数注册后分发到宏任务Event Queue(注册过程与上同，下文不再描述)
+ 接下来遇到了Promise，new Promise立即执行，then函数分发到微任务Event Queue
+ 遇到console.log()，立即执行
+ 好啦，整体代码script作为第一个宏任务执行结束，看看有哪些微任务？我们发现了then在微任务Event Queue里面，执行
+ 第一轮事件循环结束了，我们开始第二轮循环，当然要从宏任务Event Queue开始。我们发现了宏任务Event Queue中setTimeout对应的回调函数，立即执行
+ 结束

事件循环，宏任务，微任务的关系如图所示：
<!-- ![](/imgs/eventloop/eventloop2.awebp) -->

我们来分析一段较复杂的代码，看看你是否真的掌握了js的执行机制：
```javascript
console.log('1');

setTimeout(function() {
    console.log('2');
    new Promise(function(resolve) {
        console.log('3');
        resolve();
    }).then(function() {
        console.log('4')
    })
})
new Promise(function(resolve) {
    console.log('5');
    resolve();
}).then(function() {
    console.log('6')
})

setTimeout(function() {
    console.log('8');
    new Promise(function(resolve) {
        console.log('9');
        resolve();
    }).then(function() {
        console.log('10')
    })
})
// 1 5 6 2 3 4 8 9 10
```
第一轮事件循环流程分析如下:
+ 整体script作为第一个宏任务进入主线程，遇到console.log，输出1
+ 遇到setTimeout，其回调函数被分发到宏任务Event Queue中。我们暂且记为setTimeout1
+ 遇到Promise，new Promise直接执行，输出5。then被分发到微任务Event Queue中。我们记为then1
+ 又遇到了setTimeout，其回调函数被分发到宏任务Event Queue中，我们记为setTimeout2

|  宏任务Event Queue  |  微任务Event Queue  |
|   ----   |        ----        |
|  setTimeout1   |  then1 |
|  setTimeout2 |   |

+ 上表是第一轮事件循环宏任务结束时各Event Queue的情况，此时已经输出了1和5
+ 我们发现了then1微任务
+ 执行then1，输出6

第一轮事件循环正式结束，这一轮的结果是输出1,5,6。那么第二轮时间循环从setTimeout1宏任务开始：
+ 首先输出2。new Promise立即执行输出3，then也分发到微任务Event Queue中，记为then2

|  宏任务Event Queue  |  微任务Event Queue  |
|   ----   |        ----        |
|  setTimeout2   |  then2 | 

+ 第二轮事件循环宏任务结束，我们发现有then2微任务可以执行
+ 输出4
+ 第二轮事件循环结束，第二轮输出2,3,4
+ 第三轮事件循环开始，此时只剩setTimeout2了，执行
+ 直接输出8
+ 直接执行new Promise，输出9
+ 将then分发到微任务Event Queue中，记为then3
  
|  宏任务Event Queue  |  微任务Event Queue  |
|   ----   |        ----        |
|   |  then3 | 

+ 第三轮事件循环宏任务执行结束，执行微任务then3，输出10
+ 第三轮事件循环结束，第三轮输出8，9，10

[转载](https://juejin.cn/post/6844903512845860872)