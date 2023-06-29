---
title: H5开发问题记录
date: '2022-07-28 12:56:00'
sidebar: auto
categories:
    - 前端
tags:
    - H5
publish: true
---
## HTML相关
### 调用系统的某些功能
> 使用`<a>`能快速调用移动设备的电话/短信/邮件三大通讯功能，使用`<input>`能快速调用移动设备的的图库/文件<br />
这些功能方便了页面与系统的交互，关键在于调用格式一定要准确，否则会被移动端浏览器忽略
```html
<!-- 拨号 -->
<a href="tel:10086">打电话给: 10000</a>

<!-- 发送短信 -->
<a href="sms:10086">发短信给: 10000</a>

<!-- 发送邮件 -->
<a href="mailto:839626987@qq.com">发邮件给：1601745371@qq.com</a>

<!-- 选择照片或者拍摄照片 -->
<input type="file" accept="image/*">

<!-- 选择视频或者拍摄视频 -->
<input type="file" accept="video/*">

<!-- 多选 -->
<input type="file" multiple>
```

### 忽略自动识别
> 有些移动端浏览器会自动将数字字母符号识别为电话/邮箱并将其渲染成上述调用系统功能里的`<a>`。虽然很方便却有可能违背需求
```html
<!-- 忽略浏览器自动识别数字为电话号码 -->
<meta name="format-detection" content="telephone=no">

<!-- 忽略浏览器自动识别邮箱账号 -->
<meta name="format-detection" content="email=no">

<!-- 忽略自动识别电话和邮箱 -->
<meta name="format-detection" content="telephone=no, email=no">
```

### 弹出数字键盘
```html
<!-- 有"#" "*"符号输入 -->
<input type="tel">

<!-- 纯数字 -->
<input pattern="\d*">

<!-- 适合输入验证码等纯数字格式 -->
<input type="number" pattern="\d*">
<!-- 安卓跟IOS的表现形式应该不一样，大家可以自己试试。当运用了正则pattern后，就不用关注input的类型了 -->
```

### 禁止页面缩放
> 在智能手机的普及下，很多网站都具备`桌面端`和`移动端`两种浏览版本，因此无需双击缩放查看页面。禁止页面缩放可保障`移动端浏览器`能无遗漏地展现页面所有布局
```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, minimum-scale=1, maximum-scale=1">
```

### 禁止页面缓存
> `Cache-Control`指定请求和响应遵循的缓存机制，不想使用浏览器缓存可以禁止
```html
<meta http-equiv="Cache-Control" content="no-cache">
```

### 禁止`input`首字母大写
> 有时在输入框里输入文本会默认开启首字母大写纠正，就是输入首字母小写会被自动纠正成大写。直接声明`autocapitalize=off`关闭首字母大写功能和`autocorrect=off`关闭纠正功能
```html
<input autocapitalize="off" autocorrect="off" />
```


### 让:active有效，让:hover无效
> 有些元素的`:active`可能会无效，而元素的`:hover`在点击后会一直处于点击状态，需点击其他位置才能解除点击状态
```html
<!-- 给<body>注册一个空的touchstart事件可将两种状态反转 -->
<body ontouchstart></body>
```

### 针对Safari配置
> 贴一些`Safari`较零散且少用的配置
```html
<!-- 设置Safari全屏，在iOS7+无效 -->
<meta name="apple-mobile-web-app-capable" content="yes">

<!-- 改变Safari状态栏样式，可选default/black/black-translucent，需在上述全屏模式下才有效 -->
<meta name="apple-mobile-web-app-status-bar-style" content="black">

<!-- 添加页面启动占位图 -->
<link rel="apple-touch-startup-image" href="pig.jpg" media="(device-width: 375px)">

<!-- 保存网站到桌面时添加图标 -->
<link rel="apple-touch-icon" sizes="76x76" href="pig.jpg">

<!-- 保存网站到桌面时添加图标且清除默认光泽 -->
<link rel="apple-touch-icon-precomposed" href="pig.jpg">
```
### 针对其他浏览器配置
> 贴一些其他浏览器较零散且少用的配置，主要是常用的`QQ浏览器`、`UC浏览器`和`360浏览器`。从网易MTL的测试数据得知，新版的`QQ浏览器`和`UC浏览器`已不支持以下`<meta>`声明了
```html
<!-- 强制QQ浏览器竖屏 -->
<meta name="x5-orientation" content="portrait">

<!-- 强制QQ浏览器全屏 -->
<meta name="x5-fullscreen" content="true">

<!-- 开启QQ浏览器应用模式 -->
<meta name="x5-page-mode" content="app">

<!-- 强制UC浏览器竖屏 -->
<meta name="screen-orientation" content="portrait">

<!-- 强制UC浏览器全屏 -->
<meta name="full-screen" content="yes">

<!-- 开启UC浏览器应用模式 -->
<meta name="browsermode" content="application">

<!-- 开启360浏览器极速模式 -->
<meta name="renderer" content="webkit">
```

## CSS相关
### 禁止字体调整
> 旋转屏幕可能会改变字体大小，声明text-size-adjust:100%让字体大小保持不变
```css
* {
    text-size-adjust: 100%;
}
```

### 禁止长按
> 有时不想用户长按元素呼出菜单进行点链接、打电话、发邮件、保存图片或扫描二维码等操作，声明`touch-callout:none`禁止用户长按操作 <br />
> 有时不想用户复制粘贴盗文案，声明`user-select:none`禁止用户长按操作和选择复制。但`user-select:none`会让`<input>`和`<textarea>`无法输入文本，可对其声明`user-select:auto`排除在外
```css
.cancel-longPress {
    pointer-events: none; /* 微信浏览器还需附加该属性才有效 */
    user-select: none; /* 禁止长按选择文字 */
    -webkit-touch-callout: none;
}
```

### 支持弹性滚动
> 在苹果系统上非`<body>`元素的滚动操作可能会存在卡顿，但安卓系统不会出现该情况。通过声明overflow-scrolling:touch调用系统原生滚动事件优化弹性滚动，增加页面滚动的流畅度
```css
body {
    -webkit-overflow-scrolling: touch;
}
.elem {
    overflow: auto;
}
```

### 禁止滚动传播
> 与`桌面端浏览器`不一样，`移动端浏览器`有一个奇怪行为。当页面包含多个滚动区域时，滚完一个区域后若还存在滚动动量则会将这些剩余动量传播到下一个滚动区域，造成该区域也滚动起来。这种行为称为**滚动传播** <br />若不想产生这种奇怪行为可直接禁止
```css
.elem {
    overscroll-behavior: contain;
}
```

### 禁止屏幕抖动
> 对于一些突然出现滚动条的页面，可能会产生左右抖动的不良影响。在一个滚动容器里，打开弹窗就隐藏滚动条，关闭弹窗就显示滚动条，来回操作会让屏幕抖动起来。提前声明滚动容器的`padding-right`为滚动条宽度，就能有效消除这个不良影响<br />每个`移动端浏览器`的滚动条宽度都有可能不一致，甚至不一定占位置，通过以下方式能间接计算出滚动条的宽度。`100vw`为视窗宽度，`100%`为滚动容器内容宽度，相减就是滚动条宽度，妥妥的动态计算
```css
body {
    padding-right: calc(100vw - 100%);
}
```

### 禁止高亮显示
> 触摸元素会出现半透明灰色遮罩，不想要
```css
* {
    -webkit-tap-highlight-color: transparent;
}
```

### 防止动画闪动
> 在移动设备上添加动画，多数情况会出现闪屏，给动画元素的父元素构造一个3D环境就能让动画稳定运行了
```css
.trantion-prarent {
    perspective: 1000;
    backface-visibility: hidden;
    transform-style: preserve-3d;
}
```

### 美化表单外观
> 表单元素样式太丑希望自定义，`appearance:none`来帮你
```css
button,
input,
select,
textarea {
    appearance: none;
    /* 自定义样式 */
}
```

### 美化滚动占位
> 滚动条样式太丑希望自定义，`::-webkit-scrollbar-*`来帮你。记住以下三个关键词就能随机应变了
+ ::-webkit-scrollbar：滚动条整体部分
+ ::-webkit-scrollbar-track：滚动条轨道部分
+ ::-webkit-scrollbar-thumb：滚动条滑块部分
```css
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: transparent;
}
::-webkit-scrollbar-track {
    background-color: transparent;
}
::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-image: linear-gradient(135deg, #09f, #3c9);
}
```

### 美化输入占位
> 输入框占位文本太丑，`::-webkit-input-placeholder`来帮你
```css
input::-webkit-input-placeholder {
    color: #66f;
}
```

### 对齐输入占位
> 有强迫症的同学总会觉得输入框文本位置整体偏上，感觉未居中心里就痒痒的。桌面端浏览器里声明`line-height`等于`height`就能解决，但移动端浏览器里还是未能解决，需将`line-height`声明为`normal`才行
```css
input {
    line-height: normal;
}
```

### 修复点击无效
> 在苹果系统上有些情况下非可点击元素监听`click`事件可能会无效，针对该情况只需对不触发`click`事件的元素声明`cursor:pointer`就能解决
```css
.elem {
    cursor: pointer;
}
```

### 识别文本换行
> 多数情况会使用JS换行文本，那就真的Out了。若接口返回字段包含`\n或<br>`，千万别替换掉，可声明`white-space:pre-line`交由浏览器做断行处理
```css
* {
    white-space: pre-line;
}
```

### 开启硬件加速
> 想动画更流畅吗，开启GPU硬件加速呗
```css
.elem {
    transform: translate3d(0, 0, 0);
    /* transform: translateZ(0); */
}
```
## JS
### 解析有效日期
> 在苹果系统上解析`YYYY-MM-DD HH:mm:ss`这种日期格式会报错Invalid Date，但在安卓系统上解析这种日期格式完全无问题
```javascript
const date = "2022-07-28 12:56:00"
new Date(date.replace(/\-/g, "/"))
```

### 优化扫码识别
通常`移动端浏览器`都会配备`长按二维码图片识别`链接的功能，但长按二维码可能无法识别或错误识别。二维码表面看上去是一张图片，可二维码生成方式却五花八门，二维码生成方式有以下三种:
+ 使用`<img>`渲染
+ 使用`<svg>`渲染
+ 使用`<canvas>`渲染

从网易MTL的测试数据得知，大部分移动端浏览器只能识别`<img>`渲染的二维码，为了让全部移动端浏览器都能识别二维码，那只能使用`<img>`渲染二维码了。若使用`SVG`和`Canvas`的方式生成二维码，那就想方设法把二维码数据转换成Base64再赋值到`<img>`的src上。
::: warning
一个页面可能存在多个二维码，若长按二维码只能识别最后一个，那只能控制每个页面只存在一个二维码
:::

### 自动播放媒体
> 常见媒体元素包括音频`<audio>`和视频`<video>`，为了让用户得到更好的媒体播放体验与不盲目浪费用户流量，大部分`移动端浏览器`都明确规定不能自动播放媒体或默认屏蔽`autoplay`。为了能让媒体在页面加载完成后自动播放，只能显式声明播放
```javascript
const audio = document.getElementById("audio");
const video = document.getElementById("video");
audio.play();
video.play();
```
对于像微信浏览器这样的内置浏览器，还需监听其应用SDK加载完成才能触发上述代码，以保障`WebView`正常渲染。其他内置浏览器同理，在此不作过多介绍
```javascript
document.addEventListener("WeixinJSBridgeReady", () => {
    // 执行上述媒体自动播放代码
});
```
在苹果系统上明确规定用户交互操作开始后才能播放媒体，未得到用户响应会被`Safari`自动拦截，因此需监听用户首次触摸操作并触发媒体自动播放，而该监听仅此一次
```javascript
document.body.addEventListener("touchstart", () => {
    // 执行上述媒体自动播放代码
}, { once: true });
```

### 解决input失焦后页面没有回弹
> 一般出现在IOS设备中的微信内部浏览器，出现的条件为：
> + 页面高度过小
> + 聚焦时，页面需要往上移动的时候
> 所以一般input在页面上方或者顶部都不会出现无法回弹

<p style="color: #f34250;">解决办法为，在聚焦时，获取当前滚动条高度，然后失焦时，赋值之前获取的高度：</p>

```javascript
// <template>
//     <input type="text" @focus="focus" @blur="blur">
// </template>

export default {
    data() {
        return {
            scrollTop: 0
        }
    },
    
    methods: {
        focus() {
            this.scrollTop = document.scrollingElement.scrollTop;
        },
      
        blur() {
            document.scrollingElement.scrollTo(0, this.scrollTop);
        }
    }
}
```