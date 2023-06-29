---
title: Javascript基础
date: 2022-01-20
sidebar: true
categories:
    - 前端
tags:
    - Javascript
publish: false
---
<!-- 
[[toc]] -->

## javascript的基本数据类型(送分题)
javascript的基本数据类型有string, number, undefined, null, boolean, symmbol, bigInt
<!-- ~~22~~ -->

## null和undefined区别
+ 相同点：**undefined**和**null**都是基本数据类型
+ 不同点：
    - **undefined**代表的含义是未定义，**null**代表的含义是空对象。一般变量声明了但还没有定义的时候会返回**undefined**，**null**主要用于赋值给一些可能会返回对象的变量，作为初始化。
    - **undefined**在 JavaScript 中不是一个保留字，不怕死的话可以用来命名变量
    - typeof 进行判断时，Null 类型化会返回 “object”，这是一个历史遗留的问题。
    ```javascript
    typeof null; // 'object'
    typeof undefined; // 'undefined'
    null == undefined; // true
    null === undefined; // false
    ```

## 谈谈对闭包的理解和作用
### 什么闭包？
`闭包指有权访问另一个函数作用域中的变量的函数`
### 产生闭包的条件
函数执行后返回一个内部函数，并被外部变量所引用.(内部函数持有被执行函数作用域的变量)
### 闭包原理
函数执行分成两个阶段(预编译阶段和执行阶段)。
+ 在预编译阶段，如果发现内部函数使用了外部函数的变量，则会在内存中创建一个**闭包**对象并保存对应变量值，如果已存在**闭包**，则只需要增加对应属性值即可。
+ 执行完后，函数执行上下文会被销毁，函数对“闭包”对象的引用也会被销毁，但其内部函数还持用该“闭包”的引用，所以内部函数可以继续使用**外部函数**中的变量

利用了函数作用域链的特性，一个函数内部定义的函数会将包含外部函数的活动对象添加到它的作用域链中，函数执行完毕，其执行作用域链销毁，但因内部函数的作用域链仍然在引用这个活动对象，所以其活动对象不会被销毁，直到内部函数被销毁后才被销毁。
### 优点
1. 可以从内部函数访问外部函数的作用域中的变量，且访问到的变量长期驻扎在内存中，可供之后使用
2. 避免变量污染全局
3. 把变量存到独立的作用域，作为私有成员存在
### 缺点
1. 对内存消耗有负面影响。因内部函数保存了对外部变量的引用，导致无法被垃圾回收，增大内存使用量，所以使用不当会导致内存泄漏
2. 对处理速度具有负面影响。闭包的层级决定了引用的外部变量在查找时经过的作用域链长度
3. 可能获取到意外的值(captured value)

## 谈谈你对js原型和原型链理解
原型：每个对象都有__proto__属性，该属性指向构造函数的原型对象——prototype<br />
原型链：js以原型链的形式，保证函数或对象中的方法、属性可以让向下传递，按照面向对象的说法，这就是继承，当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。原型链的尽头一般来说都是`Object.prototype` => `null`所以这就是我们新建的对象为什么能够使用`toString()`等方法的原因。

## 作用域、作用域链
+ 作用域
> 作用域负责收集和维护由所有声明的标识符(变量)组成的一系列查询，并实施一套非常严格的规则，确定当前执行的代码对这些标识符的访问权限
+ 作用域链
> 作用域链是从当前作用域开始一层一层往上寻找某个变量，直到找到全局作用域还是没有找到，就放弃，这一层一层的关系就是作用域链

## this
+ 全局中的this指向
> 全局环境中，this指向全局对象（视宿主环境而定，浏览器是window，Node是global）
+ 函数中的this
    - 作为普通函数调用：严格模式下，this是**undefined**,非严格模式下，，this指向全局对象
    - 作为方法调用：this指向所属对象
    - 作为构造函数调用：this指向实例化的对象
    - 通过call, apply和bind调用：指向传入的第一个参数，如果没有传，那么严格模式下this是**undefined**, 非严格模式下指向全局对象
## 谈谈js中call,apply,bind之间的关系
+ 相同点
    - 三者都可以改变函数的this对象指向
    - 三者第一个参数都是this要指向的对象，如果如果没有这个参数或参数为undefined或null，则默认指向全局window
+ 不同点
    - 三者都可以传参，但是apply是数组，而call是参数列表，且apply和call是一次性传入参数，而bind可以分为多次传入
    bind 是返回绑定this之后的函数，便于稍后调用；apply 、call 则是立即执行

### 手写实现
```javascript
// 手写call
/**
 * 1.根据call的规则设置上下文对象(this指向)
 * 2.通过设置ctx的属性，将函数的this指向 隐式绑定 到ctx上
 * 3.通过隐式绑定执行函数并传递参数
 * 4.删除临时属性，返回函数执行结果
*/
Function.prototype.c_call = function (ctx, ...arr) {
    if(!ctx) {
        ctx = window;
    } else {
        ctx = Object(ctx);
    };
    const tempObj = Symbol('tempStorage');
    ctx[tempObj] = this; // 函数的this指向隐式绑定的ctx上
    const result = ctx[tempObj](...arr); // 通过隐式绑定执行函数并传递参数
    console.log(result)
    console.log(ctx)
    delete ctx[tempObj]; // 删除上下文对象的属性
    return result; // 返回函数的执行结果
}

// 手写apply
Function.prototype.c_apply = function(ctx) {
    if(!ctx) {
        ctx = window;
    } else {
        ctx = Object(ctx);
    };
    const tempObj = Symbol('tempStorage');
    ctx[tempObj] = this; // 函数的this指向隐式绑定的ctx上
    // 处理参数 去除第一个参数this 其它传入fn函数
    const arg = [...arguments].slice(1) // 和call参数不一样，数组
    const result = ctx[tempObj](arg) //执行fn
    delete ctx[tempObj] //删除方法
    return result
}
// 手写bind
Function.prototype.c_bind = function(ctx, ...args) {
    if(!ctx) {
        ctx = window;
    } else {
        ctx = Object(ctx);
    };
    const _this = this;
    return function fn(...innerArgs) {
        if(_this instanceof fn) {
            return new _this(...args,...innerArgs);
        }
        return _this.apply(ctx,[...args, ...innerArgs]);
    }
}
```

## 柯里化
> 柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。
```javascript
// 实现一个add函数
// add(1)(2)(3) // 6
// add(1,2,3)(4) // 10
function add() {
    let args = Array.prototype.slice.call(arguments)

    const cfn = function() {
        args.push(...arguments)
        return cfn
    }
    cfn.toString = function() {
        // args不断累加
        return args.reduce(function(pre, cur) {
            return pre + cur
        })
    }

    return cfn
}
```

## new执行过程中都干了什么？
1. 创建一个新对象
2. 将对象的原型设置为函数的prototype对象
3. 让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
4. 判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。
### 手写实现
```javascript
function myNew1() {
    const newObj = {};
    newObj.__proto__ = [...arguments][0].prototype;
    const result = [...arguments][0].apply(newObj, Array.prototype.slice.call(arguments, 1));
    console.log(newObj, result);
    return result instanceof Object ? result : newObj;
}

// 方法二: Object.create()方法是建立一个空对象，第一个参数是在原型上新建对象
function myNew2(obj, ...args) {
    const newObj = Object.create(obj.prototype);
    const result = obj.apply(newObj, args);
    console.log(newObj, result);
    return result instanceof Object ? result : newObj;
}
```

### [promise](../../blogs/javascript/promise.md)

## 防抖和节流 
### 防抖函数
> 指触发事件后在规定时间内回调函数只能执行一次，如果在规定时间内又触发了该事件，则会重新开始算规定时间在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
```javascript
function debounce(cb, wait = 1000, immediate = false) {
    if(!cb || 'function' !== typeof cb) throw new TypeError('cb不能为空或cb必须是一个函数');
    let timer = null;
    return function() {
        if(timer) clearTimeout(timer);
        if(immediate && !timer) {
            cb.apply(this, arguments);
        }
        timer = setTimeout(() => {
            cb.apply(this, arguments);
            clearTimeout(timer);
            timer = null;
        }, wait);
    }
}
```

### 节流函数
> 当持续触发事件时，在规定时间段内只能调用一次回调函数。如果在规定时间内又触发了该事件，则什么也不做
```javascript
function throttle(cb, wait = 1000) {
    if(!cb && 'function' !== typeof cb) {
        throw new TypeError('cb不能为空或者cb必须是funciton');
    }
    let preTimeStamp = 0;
    return function() {
        let now = Date.now();
        if(now - preTimeStamp > wait) {
            preTimeStamp = now;
            cb.apply(this, arguments);
        } 
    }
}
```

## 普通函数和箭头函数的区别
+ 箭头函数是匿名函数，不能作为构造函数，不能使用new
+ 箭头函数不绑定arguments，取而代之用rest参数...解决
+ 箭头函数不绑定this，会捕获其所在的上下文的this值，作为自己的this值
+ 箭头函数通过 call() 或 apply() 方法调用一个函数时，只传入了一个参数，对 this 并没有影响
+ 箭头函数没有原型属
+ 箭头函数不能当做Generator函数,不能使用yield关键字
#### 总结：
+ 箭头函数的 this 永远指向其上下文的 this ，任何方法都改变不了其指向，如call() , bind() , apply()
+ 普通函数的this指向调用它的那个对象

## 数组去重

[`JavaScrip数组去重`](../javascript/unique.md)

## iframe的优点和缺点
+ 优点
    - 能把嵌入的页面完整地呈现出来
    - 多个页面引用同一个页面，只需要修改iframe内容
    - 解决第三方内容加载慢的问题，如图标或者广告等
+ 缺点
    - iframe会阻塞页面的onload事件
    - 会产生很多页面，不容易管理
    - iframe和主页共享连接池，而浏览器对相同域的连接是有限的，所以会影响页面的并行加载
    - iframe会增加额外的http请求
    - 不利于seo, 无法被一些搜索引擎索引到，搜索引擎爬虫不能很好地处理iframe的内容

## Vue和React的区别
+ 相同点
    - 都有组件化思想
    - 都支持服务器端渲染
    - 都有Virtual DOM（虚拟dom）
    - 数据驱动视图
    - 都有支持native的方案：**Vue**的**weex**(基本已废)、**React**的**React native**
    - 都有自己的构建工具：**Vue**的**vue-cli**、**React**的**Create React App**
+ 不同点
    - 数据流向的不同。react从诞生开始就推崇单向数据流，而Vue是双向数据流
    - 数据变化的实现原理不同。react使用的是不可变数据，而Vue使用的是可变的数据
    - 组件化通信的不同。react中我们通过使用回调函数来进行通信的，而Vue中子组件向父组件传递消息有两种方式：事件和回调函数
    - diff算法不同。react主要使用diff队列保存需要更新哪些DOM，得到patch树，再统一操作批量更新DOM。Vue 使用双向指针，边对比，边更新DOM

## 说一下web worker
在`HTML`页面中，如果在执行脚本时，页面的状态是不可相应的，直到脚本执行完成后，页面才变成可相应。`web worker`是运行在后台的js，独立于其他脚本，不会影响页面你的性能。并且通过`postMessage`将结果回传到主线程。这样在进行复杂操作的时候，就不会阻塞主线程了

## Cookie、sessionStorage、localStorage 的区别
+ 相同点
+ 不同点
    - 储存大小
        - cookie数据大小不能超过4k
        - sessionStorage和localStorage的存储比cookie大得多，可以达到5M+
    - 时效性
        - cookie设置的过期时间之前一直有效
        - localStorage永久存储，浏览器关闭后数据不丢失除非主动删除数据
        - sessionStorage数据在当前浏览器窗口关闭后自动删除
    - 通讯
        - cookie的数据会自动的传递到服务器
        - sessionStorage和localStorage数据保存在本地