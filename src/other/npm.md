---
title: Npm包管理命令
date: '2023-02-08 20:00:00'
sidebar: true
categories:
    - 工具
tags:
    - Npm
publish: true
---

```bash
# 查看当前镜像源
npm config get registry

# 设置淘宝镜像源
npm config set registry https://registry.npmmirror.com

# 换回时改为官方的镜像源
npm config set registry https://registry.npmjs.org

# 发布
npm publish

# 删除某个版本
npm unpublish packageName@version --force 
# 废弃某个版本 -f = --force
npm deprecate -f packageName@version 废弃这个版本
```
