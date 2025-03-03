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
pm2 restart app_name
pm2 reload app_name
pm2 stop app_name
pm2 delete app_name
```

### 列出托管应用程序
```bash
pm2 [list|ls|status]
```

#### 显示日志
```bash
pm2 logs

# 掘较旧的日志
pm2 logs --lines 200
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