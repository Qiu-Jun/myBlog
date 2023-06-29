---
title: FFCreator——短视频制作
date: '2022-07-26 19:00:00'
sidebar: true
categories:
    - Node
tags:
    - Node
    - FFmpeg
    - UniApp
publish: false
# sticky:
#     description: '置顶'
#     type: number
#     sort type: 1
---

## 技术栈
+ Node(Eggjs)
+ FFmpeg(系统不同，安装不同，自行百度安装;window安装比较简单，mac的话用homebrew方便点[详细可以参考这篇文章](https://juejin.cn/post/7005112278706028551#heading-3)
+ UniApp(方便多平台打包)
+ FFCreator[文档](https://tnfe.github.io/FFCreator/#/guide/lite)

## 服务端

### 初始化Eggjs项目
[Eggjs使用总结](./egg.md)

### 创建model
+ User
    + userId(uuid) => String
    + nickname => String // 用户名
    + password => String // 密码
    + avatar => String // 头像
    + mobile => String // 手机号码
    + enable => Boolean // 帐号是否启用
+ Video
    + id(uuid)
### 

## 前端
### 用户登录
### 界面