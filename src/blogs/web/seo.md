---
title: 前端Seo——meta标签
date: '2022-05-18 12:56:00'
sidebar: false
categories:
    - 前端
tags:
    - Seo
publish: true
---

:::tip
关于禁止搜索引擎引用本页面和seo优化中meta标签相关知识
[原文](https://juejin.cn/post/7097368787170623496)
:::

## 禁止搜索引擎引用本页面相关的meta标签，及其用法介绍
```html
<!--
    搜索引擎，用于禁止搜索引擎索引本页内容
    谷歌、必应、雅虎都支持的 meta robots 标签如下，他们会禁止搜索引擎进行相应的操作：
    noindex：不索引本页面。
    nofollow：不跟踪本页面上的链接。
    nosnippet：不在搜索结果中显示说明文字。
    noarchive：不显示快照。
    noodp：不使用开放目录中的标题和说明。
-->
<meta name="robots" content="noindex,nofollow"/>
```

## seo优化相关的meta标签，及其用法介绍
```html
<!-- 关键词，填写网页关键词，优化SEO的重要标签 -->
<meta name="keywords" content="请输入网页关键字，例如：程序员;写代码;高薪;加班严重"/>
<!-- 声明优先使用的浏览器，例如下面是优先使用的是edge和chrome -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
<!-- 网页概述，优化SEO的重要标签 -->
<meta name="description" content="请输入网页概述，例如：知识社区，前端技术"/>
```

## 其他常见的meta标签
```html
<!-- 声明字符集，字符编码 -->
<meta charset="utf-8">
<!-- 网页作者，可以写姓名邮箱等信息 -->
<meta name="author" content="填写姓名邮箱信息，例如：Anni, 123@qq.com"/>

<!--
    添加视图窗口适配，在移动端尤为常见
    width: 设置窗口的宽度（正整数），device-width表示等于设备的宽度，
    initial-scale：网页缩放倍数初始值，
    maximum-scale：最大网页缩放倍数，
    minimum-scale：最小网页缩放倍数，
    user-scalable：no/yes，是否支持用户手动缩放网页。
 -->
<meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no">

<!-- IOS移动web，是否删除默认的苹果工具栏和菜单栏，content：no/yes。 -->
<meta name="apple-mobile-web-app-capable" content="yes"/>

<!-- IOS移动web，控制状态栏显示样式 -->
<meta name="apple-mobile-web-app-status-bar-style" content="black"/>

<!--
格式检测，例如识别类似号码的数字串自动设置为拨号连接，
识别类似邮箱的字符串并设置为点击后可自动链接邮箱发送（类似a标签的mailto功能）
当然这需要浏览器支持，比如微信内置的浏览器不支持，红米手机默认浏览器也不支持。
content：telephone，email，adress，
telephone：no/yes,是否允许检测标记手机号，并设置为拨号链接
email：no/yes,是否允许检测标记邮箱，并设置为邮箱链接，
adress：no/yes,是否允许检测标记地理位置，并设置为地图跳转链接
-->
<meta name="format-detection" content="telphone=no, email=no"/>

<!-- 浏览器内核控制，告诉浏览器启用什么内核渲染网页，这在支持不同内核的浏览器中会有用，例如360浏览器
     content：webkit/ie-comp/ie-stand,
     webkit：极速内核，
     ie-comp：ie兼容内核，
     ie-stand：ie兼容标准，
 -->
<meta name="renderer" content="webkit">

<!--
    这三个表达的实际作用是一样的：设置页面不缓存，这样设定将无法进行脱机浏览
    expires视同到期设置为content=0，从而使网页失效不缓存，
    也可以设定固定的到期时间。例如：content="Wed, 20 Jun 2022 22:33:00 GMT"。
    注意：三者的优先级小于http头的对应缓存策略设置
 -->
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">

<!--
    刷新重定向，当content只有第一个参数则是N秒后刷新当前页面，
    若包含ur地址则表示在N秒后重定向到url指向的目标地址。
    content="3;url=https://juejin.cn/"，第一个参数是刷新或重定向的秒数，第二个参数是重定向地址。
 -->
<meta http-equiv="Refresh" content="3;url=https://juejin.cn/">

<!-- QQ浏览器设置竖屏 -->
<meta name="x5-orientation" content="portrait">
<!-- QQ浏览器设置全屏 -->
<meta name="x5-fullscreen" content="true">
<!-- 启用QQ浏览器应用模式 -->
<meta name="x5-page-mode" content="app">

<!-- UC浏览器全屏显示 -->
<meta name="full-screen" content="yes">
<!-- 设置UC浏览器竖屏 -->
<meta name="screen-orientation" content="portrait">

<!-- windows phone，点击无高光 -->
<meta name="msapplication-tap-highlight" content="no">

<!-- 控制着浏览器的 DNS 预读取功能 -->
<meta http-equiv="x-dns-prefetch-control" content="off">
```