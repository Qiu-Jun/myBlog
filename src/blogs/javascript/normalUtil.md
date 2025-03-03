---
title: 常用方法、正则汇总
date: 2022-10-05 18:10:00
sidebar: true
categories:
    - 前端
tags:
    - 前端
publish: true
---

## 常用方法
### 动态加载js
::: details Code
```javascript
/**
 * @desc 动态加载js文件
 * @param { String } url js文件地址
 * @param { Function } cb 回调函数
 */
function loadJs(url, cb) {
    const script = document.createElement('script');
    let done = false;
    if (!url) {
        return;
    }
    script.type = 'text/javascript';
    script.src = url + '?v=' + appVersion || '';
    script.onload = script.onreadystatechange = function () {
        if (!done && (!script.readyState || script.readyState == 'loaded' || script.readyState == 'complete')) {
            done = true;
            script.onload = script.onreadystatechange = null;
            cb && typeof cb === 'function' && cb();
        }
    };
    return document.body.appendChild(script);
}
```
:::

### 动态插入css
::: details Code
```javascript
/**
 * @desc 动态插入css文件
 * @param { String } css文件路径
 */
function loadCss(url) {
    const _head = document.head || document.getElementsByTagName('head')[0];
    const _link = document.createElement('link');
    _link.rel = 'stylesheet';
    _link.href = url + '?=' + appVersion || '';
    return _head.appendChild(_link);
}
```
:::

### 16进制颜色值转RGB
::: details Code
```javascript
/**
 * @desc 16进制颜色值转RGB
 * @param { String } hex 16进制颜色字符串
 * @return { String } RGB颜色字符串
 */
function hexToRGB(hex) {
    const hexx = hex.replace('#', '0x')
    const r = hexx >> 16
    const g = hexx >> 8 & 0xff
    const b = hexx & 0xff
    return `rgb(${r}, ${g}, ${b})`
}
```
:::

### RGB颜色转16进制颜色
::: details Code
```javascript
/**
 * @desc RGB颜色转16进制颜色
 * @param { String } rgb RGB进制颜色字符串
 * @return { String } 16进制颜色字符串
 */
function RGBToHex(rgb) {
    const rgbArr = rgb.split(/[^\d]+/)
    const color = rgbArr[1]<<16 | rgbArr[2]<<8 | rgbArr[3]
    return `#${color.toString(16)}`
}
```
:::
## 正则
### email(邮箱)
```Javascript
const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
reg.test('1601745371@qq.com') // true
```

### 身份证(1代，2代)
```Javascript
const reg = /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/
```

### 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线组合
```Javascript
const reg = /^[a-zA-Z]\w{4,15}$/
```