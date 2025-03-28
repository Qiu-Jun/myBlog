---
title: PM2常用命令
date: 2024-10-12
sidebar: true
categories:
  - Node
tags:
  - Node
publish: true
---

#### 启动应用
```bash
pm2 start app.js

pm2 start bashscript.sh
pm2 start python-app.py --watch
pm2 start binary-file -- --port 1520

pm2 start app.js --name="fx67ll" 启动并命名为fx67ll，没有命名的话后续可以用id替代name
pm2 start app.js --watch 当文件变化时自动重启应用
pm2 start script.sh 启动bash脚本

# 常用参数
# Specify an app name
--name <app_name>

# Watch and Restart app when files change
--watch

# Set memory threshold for app reload
--max-memory-restart <200MB>

# Specify log file
--log <log_path>

# Pass extra arguments to the script
-- arg1 arg2 arg3

# Delay between automatic restarts
--restart-delay <delay in ms>

# Prefix logs with time
--time

# Do not auto restart app
--no-autorestart

# Specify cron for forced restart
--cron <cron_pattern>

# Attach to application log
--no-daemon
```

### 管理应用
```bash
pm2 restart all 重启所有应用程序(停止Node.js应用程序的所有进程，并重新启动它们)
pm2 restart [app-id/app-name] 重启指定应用程序(停止Node.js应用程序的所有进程，并重新启动它们)
pm2 reload app_name // 不停止Node.js应用程序的情况下重新加载代码
pm2 stop all 停止所有应用程序
pm2 stop [app-id/app-name] 停止指定应用程序
pm2 delete all 关闭并删除所有应用程序
pm2 delete [app-id/app-name] 删除指定的应用程序

pm2 reset [app-id/app-name] 重置重启数量
pm2 startup 创建开机自启动命令
pm2 save 保存当前应用列表
pm2 resurrect 重新加载保存的应用列表
pm2 update 保存进程，杀死并重启进程，一般用于更新pm2版本
```

### 列出托管应用程序
```bash
pm2 [list|ls|status]
pm2 list 查看所有启动的应用列表
pm2 show [app-id/app-name] 显示指定应用程序的所有信息
```

#### 显示日志
```bash
pm2 logs
pm2 log [app-id/app-name] 显示指定应用程序的日志信息
pm2 flush 清空所有日志文件
```

#### 基于终端的仪表板
```bash
pm2 monit
```

#### pm2.io：监控和诊断Web界面
> 基于 Web 的仪表板，带有诊断系统的跨服务器

```bash
pm2 plus
```

#### 生态系统文件
```bash
# 创建一个名为生态系统文件的配置文件来管理多个应用程序。要生成生态系统文件
pm2 ecosystem
```

```js
// ecosystem.config.js
module.exports = {
  apps : [{
    name: "app",
    script: "./app.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }, {
     name: 'worker',
     script: 'worker.js'
  }]
}
```

```bash
pm2 start ecosystem.config.js
```

#### 服务器重启时重新启动应用程序
```bash
cd /path/to/my/app
pm2 start env.js --watch --ignore-watch="node_modules"
```

#### 更新
```bash
npm install pm2@latest -g

pm2 update
```
