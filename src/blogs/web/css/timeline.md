---
title: CSS实现时间轴
date: 2022-04-17
sidebar: 'auto'
categories:
    - 前端
    - Css
tags:
    - Css
publish: true
---

+ HTML
```html
<div class="time-wrap clearfix">
    <div class="time-left">
        <div class="time-content">111</div>
    </div>
    <div class="time-right">
        <div class="time-content">
            <div>11</div>
            <div>11</div>
            <div>11</div>
            <div>11</div>
            <div>11</div>
            <div>11</div>
        </div>
    </div>
</div>
```

+ css
```css
.clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: ' ';
    clear: both;
    height: 0;
}

.time-wrap {
    width: 804px;
    height: 700px;
    margin: 0 auto;
}
.time-wrap .time-left,
.time-wrap .time-right {
    position: relative;
    width: 400px;
}
.time-wrap .time-left {
    float: left;
    border-right: 4px solid #b1bbf9;
}
.time-wrap .time-right {
    float: right;
    border-left: 4px solid #b1bbf9;
}
.time-wrap .time-left::before,
.time-wrap .time-right::before {
    position: absolute;
    right: -9px;
    top: 50%;
    transform: translateY(-50%);
    display: inline-block;
    content: '';
    width: 9px;
    height: 10px;
    border: 2px solid #b1bbf9;
    border-radius: 50%;
    background-color: #fff;
}
.time-wrap .time-left::before {
    right: -9px;
}
.time-wrap .time-right::before {
    left: -9px;
}
.time-wrap .time-left::after,
.time-wrap .time-right::after {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: inline-block;
    content: '';
    width: 0;
    height: 0;
}
.time-wrap .time-left::after {
    right: 10px;
    border-top: 10px solid transparent;
    border-left: 12px solid #fff;
    border-bottom: 10px solid transparent;
}
.time-wrap .time-right::after {
    left: 10px;
    border-top: 10px solid transparent;
    border-right: 12px solid #fff;
    border-bottom: 10px solid transparent;
}
.time-wrap .time-left .time-content,
.time-wrap .time-right .time-content {
    box-sizing: border-box;
    padding: 16px;
    border-radius: 12px;
    background-color: #fff;
}
.time-wrap .time-left .time-content {
    margin-right: 20px;
}
.time-wrap .time-right .time-content {
    margin-left: 20px;
}
```
