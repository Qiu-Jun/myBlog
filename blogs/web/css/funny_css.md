---
title: 有趣的css特效
date: '2022-12-14 08:00:00'
sidebar: true
categories:
    - 前端
    - Css
tags:
    - 前端
    - Css
publish: true
---

### 彩虹渐变字

::: demo
```html
<template>
    <div class="gradient-text">
        彩虹渐变字
    </div>
</template>

<style >
.gradient-text {
    color: transparent;
    background: -webkit-linear-gradient(30deg, #32c5ff 25%, #b620e0 50%, #f7b500 75%, #20e050 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: auto;
    animation: gradientText 300s infinite linear;
    -webkit-animation: gradientText 300s infinite linear;
}
@keyframes gradientText {
    0% {
        background-position: 0;
    }
    100% {
        background-position: 28000px;
    }
}
</style>
```
:::

### hover下划线
::: demo
```html
<template>
     <div class="hover-box">
        <span class="hover-span">悬浮下划线</span>
    </div>
</template>

<style>
.hover-box {
    position: relative;
    width: 80px;
}
.hover-span {
    cursor: pointer;
}
.hover-span::before {
    display: inline-block;
    position: absolute;
    bottom: -6px;
    content: '';
    height: 4px;
    background: red;
    width: 0;
    transition: width 0.36s;
}

.hover-span:hover::before {
    width: 100%;
}
</style>
```
:::