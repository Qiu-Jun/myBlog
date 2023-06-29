---
title: Node——Egg
date: '2022-04-28 01:08:00'
sidebar: true
categories:
    - Node
tags:
    - Node
    - Egg
publish: true
---

:::tip
Eggjs是阿里基于koa封装的一个企业级框架，用过koa可以很快上手。
:::

## 创建Egg项目
```bash
mkdir demo && cd demo
npm init egg --type=simple
npm install
npm run dev
```

## 数据库(请先确保本地是否安装好对应的数据库)
### Mongodb
```javascript
// 安装egg-mongoose
npm install egg-mongoose
// config/plugin.js
module.exports = {
    mongoose: { 
        enable: true, 
        package: 'egg-mongoose'
    }
}
// config.default.js 配置mongodb
config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/ffvideo',
      options: {},
    },
};
// app/model 测试创建集合
module.exports = app => {
    const { mongoose } = app;
    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        user_id: { type: String, unique: true },
        user_name: { type: String },
    })
    return mongoose.model('User', UserSchema, 'user')
}
// 到这里集合就创建成功了，mongodb compass(安装mongodb自带)可以看到新建的user集合了
```
### MySql(waiting,目前暂时用mongodb)
