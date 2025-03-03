---
title: Webpack项目优化
date: '2022-03-05 12:56:00'
sidebar: true
categories:
    - 工具
tags:
    - 前端
    - Webpack
publish: true
---

## 构建时间优化
### thread-loader
> 多进程打包，可以大大提高构建的速度，使用方法是将thread-loader放在比较费时间的loader之前，比如babel-loader
::: warning
由于启动项目和打包项目都需要加速，所以配置在webpack.base.js
:::
```javascript
// yarn add thread-loader -D
// webpack.base.js

{
    test: /\.js$/,
    use: [
        'thread-loader',
        'babel-loader'
    ],
}
```
### cache-loader
```javascript
// yarn add thread-loader -D
// webpack.base.js

{
    test: /\.js$/,
    use: [
        'cache-loader',
        'thread-loader',
        'babel-loader'
    ]
}
```
### 开启热更新
> 比如你修改了项目中某一个文件，会导致整个项目刷新，这非常耗时间。如果只刷新修改的这个模块，其他保持原状，那将大大提高修改代码的重新构建时间
::: warning
只用于开发中，所以配置在开发环境
:::
### exclude & include
::: warning
合理设置这两个属性，可以大大提高构建速度
:::
+ ***exclude***：不需要处理的文件
+ ***include***：需要处理的文件

```javascript
// example
{
    test: /\.js$/,
    //使用include来指定编译文件夹
    include: path.resolve(__dirname, '../src'),
    //使用exclude排除指定文件夹
    exclude: /node_modules/,
    use: [
        'babel-loader'
    ]
}
```
### 构建区分环境
> 区分环境去构建是非常重要的，我们要明确知道，开发环境时我们需要哪些配置，不需要哪些配置；而最终打包生产环境时又需要哪些配置，不需要哪些配置：
+ 开发环境：去除代码压缩、gzip、体积分析等优化的配置，大大提高构建速度
+ 生产环境：需要代码压缩、gzip、体积分析等优化的配置，大大降低最终项目打包体积

### 提升webpack版本
> webpack版本越新，打包的效果肯定更好

## 打包体积优化
### CSS代码压缩
    + css-minimizer-webpack-plugin
### JS代码压缩
    + terser-webpack-plugin
### tree-shaking
> tree-shaking简单说作用就是：只打包用到的代码，没用到的代码不打包，而webpack5默认开启tree-shaking，当打包的mode为production时，自动开启tree-shaking进行优化

### source-map类型
> source-map的作用是：方便你报错的时候能定位到错误代码的位置。它的体积不容小觑，所以对于不同环境设置不同的类型是很有必要的
+ 开发环境：精准定位错误代码的位置 => eval-cheap-module-source-map
+ 生产环境：想开启，但又不想体积太大 => nosources-source-map
  
### 打包体积分析
+ webpack-bundle-analyzer

## 用户体验优化
### 模块懒加载
> 如果不进行模块懒加载的话，最后整个项目代码都会被打包到一个js文件里，单个js文件体积非常大，那么当用户网页请求的时候，首屏加载时间会比较长，使用模块懒加载之后，大js文件会分成多个小js文件，网页加载时会按需加载，大大提升首屏加载速度

### Gzip
> 开启Gzip后，大大提高用户的页面加载速度，因为gzip的体积比原文件小很多，当然需要后端的配合，使用compression-webpack-plugin

### 小图片转base64
> 对于一些小图片，可以转base64，这样可以减少用户的http网络请求次数，提高用户的体验。webpack5中url-loader已被废弃，改用asset-module

::: right
[转自](https://juejin.cn/post/7083519723484708878)
:::