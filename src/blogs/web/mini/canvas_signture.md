---
title: 小程序电子签名(兼容canvas 2d)
date: '2023-02-03 17:00:00'
sidebar: 'auto'
categories:
    - 前端
    - 小程序
tags:
    - 小程序
    - Canvas
publish: true
---

### Usage
+ 安装
```bash
npm i wx_signture
```
+ 小程序构建npm包

+ 页面JSON
```json
{
    "pageOrientation": "landscape",
    "usingComponents": {
        "demo": "wx_signture"
    }
}
```

+ 页面WXML
```html
<!-- canvasType="2d" 是用canvas 2d , 要用旧的可以不用canvasType这个属性 -->
<view style="width: 100vw;height: 100vh; overflow: hidden;">
    <demo
        canvasType="2d"
        bind:signtureConfirm="onConfirm"
    />
</view>
```

+ 页面JS
```javascript
Page({
    onConfirm(e) {
        console.log(e)
    }
})
```


### canvas实现签名(旧版)
+ 初始化canvas
```javascript
const ctx = wx.createCanvasContext('signture')
```

+ 绘制起点和路径
```javascript
function canvasStart(ctx, target) {
    if(!ctx) throw new Error('请传入canvas对象')
    const { clientX, clientY } = target.changedTouches[0]
    ctx.moveTo(clientX, clientY)
}

function canvasMove(ctx, target) {
    if(!ctx) throw new Error('请传入canvas对象')
    const { clientX, clientY } = target.changedTouches[0]
    ctx.setStrokeStyle(canvasConfig.signtrueColor)
    ctx.setLineWidth(canvasConfig.signtrueLineWidth)
    ctx.setShadow(0, 0, 0.5, '#000000')
    ctx.setLineCap('round')
    ctx.setLineJoin('round')
    ctx.lineTo(clientX, clientY)
    ctx.stroke()
    ctx.draw(true)
    ctx.moveTo(clientX, clientY)
}
```

### 如何同时
canvas 2d的api和web的基本一致，但是和小程序旧版的canvas api不一致<br />
于是单独创建了一cavas2d的模板来处理，根据配置是否使用2d导入不同的方法到Page
```javascript
import canvas from './modules/canvas'
import canvas2d from './modules/canvas2d'

const CANVASTYPE = '' // 是否为canvas 2d  '' or '2d'
const pageData = {
    data: {
        is2d: CANVASTYPE === '2d', 
        windowInfo: null, // 窗口信息
    },

    onLoad() {}
}
function initPageData() {
    return {
        ...pageData,
        ...((CANVASTYPE && CANVASTYPE === '2d') ? canvas2d : canvas)
    }
}

Page(initPageData())
```

[github完整代码](https://github.com/Qiu-Jun/wxMiniCanvasSignture)

### 问题
`wx.canvasToTempFilePath`api在2d时需要传入canvas实例(这个canvas是query.select返回的node,不是getContext('2d'))，但是旧的不能带这个参数
```javascript
wx.canvasToTempFilePath({
    canvasId: 'signture',
    canvas: is2d ? _cavans : null,  // 这个canvas是query.select返回的node,不是getContext('2d')
    width: windowWidth,
    height: windowHeight,
    destWidth: windowWidth * pixelRatio,
    destHeight: windowHeight * pixelRatio,
    fileType: 'png',
    success: res => {
        if(res.tempFilePath) {
            wx.navigateTo({
                url: `/pages/test/test?path=${res.tempFilePath}`,
            })
        }
    },
    fail: err => console.log(err)
})
```

