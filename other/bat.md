---
title: window bat脚本
date: '2022-10-20 17:26:59'
sidebar: true
categories:
    - 其他
publish: true
---

## 执行请求
备注：用于wx_loves定时任务处理，可以利用这个方法进行执行shell脚本
```bat
CHCP 65001
@echo off
echo ********脚本执行中*******
curl -X POST http://127.0.0.1:7001/sendNotify
echo ********脚本执行结束*******
echo 脚本执行完成，随便按结束
pause
```

## 关机重启
```bat
CHCP 65001
@echo off
echo ***脚本执行中***
set /p bol=输入1关机，输入2重启
if  %bol% == 1 (
    shutdown -s -t 0
) else (
    shutdown -r -t 0
)
echo ***脚本执行结束***
```