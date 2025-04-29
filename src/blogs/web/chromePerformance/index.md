---
title: Chrome DevTools Performance 功能详解
date: '2025-04-24 12:56:00'
sidebar: true
categories:
    - 前端
tags:
    - 前端
publish: true
---

> [转载, 点击查看原文](https://juejin.cn/post/7112544960934576136)

## 简介
本文整理介绍 Chrome DevTools Performance 面板的所有功能，以便使用其分析页面加载时/运行时性能，找出性能瓶颈。

#### 功能面板概览
![image](./imgs/panel.awebp)

+ 控制面板（红色区域）：控制性能分析相关功能的配置。
+ 概览面板（蓝色区域）：主要性能项目的图形化预览。可选择录制的某一个片段，默认为完整的录制片段。
+ 视图面板（绿色区域）：展示`概览面板`中选择的片段的其他指标数据。点击此面板中的内容可进行选择。
+ 详情面板（黄色区域）：展示`视图面板`中选择内容的详情。其中 `Summary` 选项卡为点选内容的数据总览，不同的点击项目展示的条目有所区别。而 `Bottom-up`、`Call tree`、`Event log` 选项卡主要与主线程活动相关，会在【Main】中做详细介绍。
 - ![image](./imgs/summary1.awebp)
 - ![image](./imgs/summary2.awebp)
+ 搜索框（黑色区域）：按 Command+F (Mac) 或 Control+F（Windows、Linux）打开底部的搜索框，可对 【Main】 中火焰图中的活动进行搜索。

#### 控制面板
