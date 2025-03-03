---
title: 分片任务封装
date: 2024-01-30
sidebar: true
categories:
    - 前端
    - 优化
tags:
    - 前端
    - 优化
publish: true
---

## 分片任务封装
```javascript
 function performChunk(datas, cb, scheduler) {
    if(typeof datas === 'number') {
        datas = {
            length: datas
        }
    }
    if(datas.length === 0) return
    if(typeof window !== 'undefined' && typeof window.document !== 'undefined') {
        browserPerformChunk(datas, cb)
    } else {
        mainPerformChunk(datas, cb, scheduler)
    }
}
 function mainPerformChunk(datas, cb, scheduler) {
    let i = 0
    function run() {
        if(i >= datas.length) return
        scheduler(next => {
            while(next && i < datas.length) {
                cb(datas[i], i)
                i++
            }
        })
    }
    run()
}

function browserPerformChunk(datas, cb) {
    const scheduler = task => {
        requestIdleCallback(idle => {
            task(() => idle.timeRemaining() > 0)
        })
    }
    mainPerformChunk(datas, cb, scheduler)
}
```

## demo
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body style="height: 100vh; overflow: auto;">
    <button class="btn">测试</button>
</body>
<script>
    const btn = document.querySelector('.btn')
    const datas = new Array(10000).fill(0).map((_, i) => i)

    btn.onclick = () => {
        const handleTask = (_, i) => {
            const div = document.createElement('div')
            div.innerText = i
            document.body.appendChild(div)
        }
        const scheduler = task => {
            let timer = setTimeout(() => {
                const now  = performance.now()
                task(() => performance.now() - now <= 10)
                timer = null
            }, 1000)
        }
        performChunk(datas, handleTask, scheduler)
    }
</script>
</html>
```