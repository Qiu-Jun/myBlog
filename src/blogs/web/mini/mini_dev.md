---
title: 小程序
date: '2022-01-15 08:00:00'
sidebar: 'auto'
categories:
    - 前端
    - 小程序
tags:
    - 小程序
publish: false
---

## 常见问题
### 域名环境配置
```javascript
const env = {
    release: 'apiUrl1', // 正式版
    trial: 'apiUrl2', // 体验版 
    develop: 'apiUrl3' // 开发版
}
export const baseUrl = env[__wxConfig.envVersion]

```
### hidden失效
+ hidden是通过改变display来控制显示和隐藏的，查看元素css是否有display属性
+ 不能设置在block标签上

### Image组件边距问题
> image添加display: block;或者display: flex;

### 设置角标失败
> 非tabBar不能操作角标,即不能调用wx.setTabBarBadge()

### 滚动穿透
```javascript
// WXML
 <view catchtouchmove="stopTouch">滚动层</view>

//JS
stopTouch(){return}
```

### input组件placeholder添加图标
![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f3f7cb0736444e2812dd6cd55c290f0~tplv-k3u1fbpfcp-watermark.awebp)
```javascript
// 首先去阿里的iconfont生成iconfont下载到项目，引入iconfont
// 网上有人直接在placeholder-class直接引用iconfont icon-xxx，我试了并不能生效。于是在placeholder里直接用unicode(注意不要直接写成字符串)

// uniapp
<textarea
    class="input-area iconfont"
    style="font-size: 28rpx;"
    :placeholder="`\ue612  说说您的使用感受，为更多小伙伴购买提供参考～`"
    maxlength="10"
    v-model="form.val"
/>

// 原生
<textarea
    class="input-area iconfont"
    style="font-size: 28rpx;"
    placeholder="{{placeholder}}"
    maxlength="10"
/>

data: {
    placeholder: '\ue612  说说您的使用感受，为更多小伙伴购买提供参考～'
}
```

## Uniapp
### 在onLaunch进行跳转导致偶尔点击事件失效
```javascript
// 用setTimeout回调执行跳转
setTimeout(() => {
    uni.navigateTo() 
    // uni.switchTab()
}, 0);
```

## 云开发
### 支付回调重复执行
由于在支付后执行的云函数没有按要求返回导致,在支付回调的云函数按要求返回即可
![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/491255b7e4f8490b88308807cd824237~tplv-k3u1fbpfcp-watermark.awebp)
```javascript
return {
    errcode: 0,
    errmsg: 'ok'
}
```

## Error
### value below was evaluated just now
> 我用的是uniapp，我在改变某个复杂的数组时，computed中遍历console.log和eval导致。