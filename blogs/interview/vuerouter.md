---
title: Vue面试题——Vue Router
date: '2022-03-20 16:00:00'
sidebar: true
categories:
    - 前端
    - Vue
tags:
    - Vue
publish: false
---

## 路由有几种模式？说说它们的区别？
+ `hash`: 兼容所有浏览器，包括不支持`HTML5 History Api`的浏览器，例http://www.abc.com/#/index，hash值为#/index， hash的改变会触发`hashchange`事件，通过监听`hashchange`事件来完成操作实现前端路由。`hash`值变化不会让浏览器向服务器请求
```javascript
// 监听hash变化，点击浏览器的前进后退会触发
window.addEventListener('hashchange', function(event){ 
    let newURL = event.newURL; // hash 改变后的新 url
    let oldURL = event.oldURL; // hash 改变前的旧 url
},false)
```
+ `history`：兼容能支持`HTML5 History Api`的浏览器，依赖`HTML5 History API`来实现前端路由。没有#，路由地址跟正常的url一样，但是初次访问或者刷新都会向服务器请求，如果没有请求到对应的资源就会返回404，所以路由地址匹配不到任何静态资源，则应该返回同一个index.html 页面，需要在nginx中配置
+ `abstract`: 支持所有`JavaScript`运行环境，如`Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式

## 说说你对router-link的了解
+ `<router-link>`是Vue-Router的内置组件，在具有路由功能的应用中作为声明式的导航使用
+ `<router-link>`有8个props，其作用是：
    - `to`：必填，表示目标路由的链接。当被点击后，内部会立刻把to的值传到`router.push()`，所以这个值可以是一个字符串或者是描述目标位置的对象
    ```xml
    <router-link to="home">Home</router-link>
    <router-link :to="'home'">Home</router-link>
    <router-link :to="{ path: 'home' }">Home</router-link>
    <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
    <router-link :to="{ path: 'user', query: { userId: 123 }}">User</router-link>
    
    <!-- 注意path存在时params不起作用，只能用query -->
    ```
    - `replace`：默认值为false，若设置的话，当点击时，会调用`router.replace()`而不是`router.push()`，于是导航后不会留下`history`记录
    - `append`：设置后，则在当前 (相对) 路径前添加基路径
    - `tag`：让`<router-link>`渲染成tag设置的标签，如tag:'li',渲染结果为`<li>foo</li>`
    - `active-class`：默认值为`router-link-active`,设置链接激活时使用的CSS类名。默认值可以通过路由的构造选项`linkActiveClass`来全局配置
    - `exact-active-class`：默认值为`router-link-exact-active`,设置链接被精确匹配的时候应该激活的`class`。默认值可以通过路由构造函数选项 `linkExactActiveClass`进行全局配置的
    - `exact`：是否精确匹配，默认为false
    ```xml
    <!-- 这个链接只会在地址为 / 的时候被激活 -->
    <router-link to="/" exact></router-link>
    ```
    - `event`：声明可以用来触发导航的事件。可以是一个字符串或是一个包含字符串的数组，默认是click


## 讲一下完整的导航守卫流程
+ 导航被触发
+ 在失活的组件里调用离开守卫`beforeRouteLeave(to,from,next)`
+ 调用全局的`beforeEach((to,from,next) => {})`守卫
+ 在重用的组件里调用`beforeRouteUpdate(to,from,next)`守卫
+ 在路由配置里调用`beforeEnter(to,from,next)`路由独享的守卫
+ 解析异步路由组件
+ 在被激活的组件里调用`beforeRouteEnter(to,from,next)`
+ 在所有组件内守卫和异步路由组件被解析之后调用全局的`beforeResolve((to,from,next) => {})`解析守卫
+ 导航被确认
+ 调用全局的`afterEach((to,from) => {})`钩子
+ 触发`DOM`更新
+ 用创建好的实例调用`beforeRouteEnter`守卫中传给`next`的回调函数

::: warning
`afterEach`钩子中不可以使用`next()`
:::

## 讲一下导航守卫的三个参数的含义
+ `to`：即将要进入的目标路由对象
+  `from`：当前导航正要离开的路由对象
+  `next`：函数，必须调用，不然路由跳转不过去
    - `next()`：进入下一个路由
    - `next(false)`：中断当前的导航
    - `next('/')或next({ path: '/' })`: 跳转到其他路由，当前导航被中断，进行新的一个导航

## 全局导航守卫有哪些？
+ `router.beforeEach`：全局前置守卫
+ `router.beforeResolve`：全局解析守卫
+ `router.afterEach`：全局后置钩子

## 什么是路由独享的守卫，怎么使用？
***beforeEnter守卫***
```javascript
const router = new VueRouter({
    routes: [
        {
            path: '/test',
            component: TEST,
            beforeEnter: (to, from, next) => {
                // ...
            }
        }
    ]
})
```

## 在组件内使用的导航守卫有哪些？怎么使用？
+ `beforeRouteLeave`：在失活的组件里调用离开守卫
+ `beforeRouteUpdate`：在重用的组件里调用,比如包含`<router-view />`的组件
+ `beforeRouteEnter`：在进入对应路由的组件创建前调用
```javascript
beforeRouteLeave(to, from, next) {
    //...
},
beforeRouteUpdate(to, from, next) {
    //...
},
beforeRouteEnter(to, from, next) {
    //...
},
```
::: warning
在beforeRouteEnter导航守卫中不可以用this, 因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建<br />
可以通过传一个回调给next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数
```javascript
beforeRouteEnter(to, from, next) {
    next(vm => {
        console.log(vm)
    })
}
```
:::

## 怎么在组件中监听路由参数的变化？
有两种方法可以监听路由参数的变化，但是只能用在包含`<router-view />`的组件内
+ watch
```javascript
watch: {
    '$route'(to, from) {
        //这里监听
    }
}
```
+ beforeRouteUpdate
```javascript
beforeRouteUpdate (to, from, next) {
    //这里监听
}
```

## 如何获取路由传过来的参数？
路由有三种传参方式，获取方式各不相同
+ `meta`：路由元信息，写在routes配置文件中
```javascript
{
    path: '/home',
    name: 'home',
    component: load('home'),
    meta: {
        title: '首页'
    }
}
// 获取方式`this.$route.meta.title`获取
```
+ query
```javascript
this.$route.push({
    path:'/home',
    query:{
        userId:123
    }
})
// 浏览器地址：http://localhost:8036/home?userId=123 获取方式：this.$route.query.userId
```
+ params
```javascript
{
    path: '/home/:userId',
    name: 'home',
    component: load('home'),
    meta: {
        title: '首页'
    },
}
this.$router.push({ name: 'home', params: { userId: 123 } })
// 注意用params传参，只能用命名的路由（用name访问），如果用path，params不起作用。 this.$router.push({ path: '/home', params: { userId: 123 }})不生效
// 获取方式：this.$route.params.userId
```

## 如果vue-router使用history模式，部署时要注意什么
要注意404的问题，因为在`history`模式下，只是动态的通过js操作`window.history`来改变浏览器地址栏里的路径，并没有发起http请求，当直接在浏览器里输入这个地址的时候，就一定要对服务器发起`http`请求，但是这个目标在服务器上又不存在，所以会返回404
```bash
# 在Ngnix中将所有请求都转发到index.html上
location / {
    try_files  $uri $uri/ @router index index.html;
}
location @router {
    rewrite ^.*$ /index.html last;
}
```

## route和router有什么区别？
route是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数。 而router是“路由实例对象”，包括了路由的跳转方法，钩子函数等

## Vue路由怎么跳转打开新窗口？
```javascript
const obj = {
    path: xxx,//路由地址
    query: {
       mid: data.id//可以带参数
    }
};
const {href} = this.$router.resolve(obj)
window.open(href, '_blank')
```

## 说说active-class是哪个组件的属性？
`<router-link/>`组件的属性，设置链接激活时使用的`CSS`类名。默认值可以通过路由的构造选项`linkActiveClass`来全局配置