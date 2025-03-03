---
title: Parcel——零配置打包工具
date: '2023-01-01 14:42:59'
sidebar: true
categories:
    - 工具
tags:
    - Parcel
publish: true
---

### 什么的Parcel
**Parcel**是一个可用于构建网站前端应用（如React, Vue）和npm包（如React组件库）构建工具。与**Webpack**、**Vite**等相比，它的好处了开箱即用

### Parcel的使用
+ 安装parcel
```bash
yarn add parcel -D // or npm install parcel -D
```

+ 例子目录以及例子html
```
+ src
    + assets
        + css
            style.css
    + main
        index.js
    + index.html
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./assets/css/style.css" />
</head>
<body>
    <script src="./main/index.js" type="module"></script>
</body>
</html>
```

+ 设置运行命令
```json
// 在package.json的scripts添加开发和打包命令
"scripts": {
    "dev": "parcel src/index.html",
    "build": "parcel src/index.html"
}
```

### 总结
+ 优点
    - Parcel能做到无配置
    - Parcel内置了常见场景的构建方案及其依赖，无需再安装各种依赖
    - Parcel能以HTML为入口，自动检测和打包依赖资源
    - Parcel默认支持模块热替换，真正的开箱即用
+ 缺点
    - 不支持SourceMap：在开发模式下，Parcel也不会输出SourceMap，目前只能去调试可读性极低的代码
    - 不支持剔除无效代码(TreeShaking)：很多时候我们只用到了库中的一个函数，结果Parcel把整个库都打包了进来
    - 一些依赖会让Parcel出错：当你的项目依赖了一些Npm上的模块时，有些Npm模块会让Parcel运行错误