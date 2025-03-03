---
title: html2canvas库使用记录
date: 2025-11-01 
categories:
    - 前端
    - Vue
tags:
    - 前端
    - Vue
publish: true
---

> 记录html2canvas使用时遇到的问题

## 图片跨域处理
```javascript
html2canvas(dom,{
	useCORS: true
})
```

## 清晰度处理
```javascript
html2canvas(dom,{
	scale: 2, // 放大 不会影响分辨率
    dpi: 3 // 处理模糊问题
})
```

## html2canvas的background-clip:text修复
> html2canvas不支持background-clip:text, [使用此修改源码后的文件](/public/js/html2canvas.min.js)， 版本v1.4.1