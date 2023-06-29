---
title: 工程化
date: 2022-01-28 15:10:00
sidebar: true
categories:
    - 前端
    - 工具
tags:
    - 前端
    - Javascript
publish: false
---

:::tip
前端工程化是使用软件工程的技术和方法来进行前端的开发流程、技术、工具、经验等规范化、标准化，其主要目的为了提高效率和降低成本，即提高开发过程中的开发效率，减少不必要的重复工作时间，而前端工程本质上是软件工程的一种，因此我们应该从软件工程的角度来研究前端工程。
:::

## Webpack
### webpack的构建流程是什么?
+ 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
+ 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
+ 确定入口：根据配置中的 entry 找出所有的入口文件；
+ 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
+ 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
+ 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
+ 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

### webpack的核心概念
+ Entry：入口，Webpack执行构建的第一步将从Entry开始，告诉webpack要使用哪个模块作为构建项目的起点，默认为./src/index.js
+ output ：出口，webpack在哪里输出它打包好的代码以及如何命名，默认为./dist
+ Module：模块，在Webpack里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的Entry开始递归找出所有依赖的模块
+ Chunk：代码块，一个Chunk由多个模块组合而成，用于代码合并与分割
+ Loader：模块转换器，用于把模块原内容按照需求转换成新内容
+ Plugin：扩展插件，在Webpack构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件的发生，在特定时机做对应的事情

### 什么是bundle，什么是chunk，什么是module
+ bundle：webpack打包出来的文件
+ chunk：webpack在进行模块依赖分析的时，代码分割出来的代码块
+ module：开发中的单个模块

### Loader机制的作用是什么？
webpack默认只能打包js文件，配置里的module.rules数组配置了一组规则，告诉 Webpack 在遇到哪些文件时使用哪些 Loader 去加载和转换打包成js。
> 注意：<br />
use属性的值需要是一个由 Loader 名称组成的数组，Loader 的执行顺序是由后到前的；
每一个 Loader 都可以通过 URL querystring 的方式传入参数，例如css-loader?minimize中的minimize告诉css-loader要开启 CSS 压缩。

### 常用loader
+ css-loader: 读取 合并CSS 文件
+ style-loader: 把 CSS 内容注入到 JavaScript 里
+ sass-loader: 解析sass文件（安装sass-loader，node-sass）
+ postcss-loader: 自动添加浏览器兼容前缀（postcss.config配置）
+ url-loader: 将文件转换为base64 URI
+ vue-loader: 处理vue文件

### configureWebpack与chainWebpack区别
> configureWebpack和chainWebpack的作用相同，唯一的区别就是它们修改webpack配置的方式不同：
>> + configureWebpack的底层是webpack-merge，来修改默认的webpack配置。该对象将会被webpack-merge合并入最终的webpack配置
>> + chainWebpack的底层是webpack-chain。通过链式编程的形式，来修改默认的webpack配置

### 说说webpack的热更新原理是什么？
![](/imgs/interview/webpack-hot-update.png)
#### 图片解读
+ Webpack Compile：将JS源代码编译成bundle.js
+ HMR Server：用来将热更新的文件输出给HMR Runtime
+ Bundle Server：静态资源文件服务器，提供文件访问路径
+ HMR Runtime：socket服务器，会被注入到浏览器，更新文件的变化
+ bundle.js：构建输出的文件
+ 在HMR Runtime和HMR Server之间建立websocket，即图上4号线，用于实时更新文件变化

#### 原理
+ 通过`webpack-dev-server`创建两个服务器：提供静态资源的服务（express）和Socket服务
+ express server负责直接提供静态资源的服务（打包后的资源直接被浏览器请求和解析）
+ socket server是一个`websocket`的长连接，双方可以通信
+ 当`socket server`监听到对应的模块发生变化时，会生成两个文件.json（manifest文件）和.js文件（update chunk）
+ 通过长连接，socket server 可以直接将这两个文件主动发送给客户端（浏览器）
浏览器拿到两个新的文件后，通过HMR runtime机制，加载这两个文件，并且针对修改的模块进行更新
## Vite

