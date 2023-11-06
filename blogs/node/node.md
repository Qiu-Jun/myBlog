---
title: Node
date: '2023-08-14 08:00:00'
sidebar: true
categories:
    - Node
tags:
    - Node
publish: false
---

## 创建多级文件失败
node使用**mkdirSync**创建多级文件夹回失败
```javascript
// 异步
function mkdirs(dirname, cb) {
    fs.access(dirname, function(err) {
        if(!err) {
            cb && typeof cb === 'function' && cb()
        } else {
            mkdirs(path.dirname(dirname), function() {
                fs.mkdir(dirname, function () {
                    cb && typeof cb === 'function' && cb()
                })
            })
        }
    })
}

// 同步
function mkdirsSync(dirname) {
    if(fs.existsSync(dirname)) {
        return true
    } else {
        if(mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}

```