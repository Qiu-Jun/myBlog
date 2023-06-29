---
title: 自动化
date: 2022-08-10 10:28:00
sidebar: true
categories:
    - 前端
    - 工具
tags:
    - 面试
    - 自动化部署
publish: true
---

## CI/CD是什么
`CI/CD`（Continuous Intergration/Continuous Delpoy），持续集成/持续部署，或者持续集成/持续交付（Continuous Delivery），是一种在开发阶段引入自动化来频繁交付应用的方法。从前端的角度看，CICD的流程中涉及：
+ CI：当代码仓库代码发生变更，就会自动对代码进行测试和构建，反馈运行结果
+ CD：持续交付是在持续集成的基础上，可以将集成后的代码依次部署到测试环境、予发布环境、生产环境等中

## 构建/部署
前后端分离的开发模式中，前端项目经常会使用框架进行开发，经由 Webpack（或者其他构建工具） 打包后的SPA应用（代码），本质上都是静态资源，只需要把它们都放到 站点的静态资源目录下，配好相关的路径，即可完成部署

### Github + Jenkins
![](/imgs/interview/cicd-git_jk.png)
### Github Actions
![](/imgs/interview/cicd-git_action.png)