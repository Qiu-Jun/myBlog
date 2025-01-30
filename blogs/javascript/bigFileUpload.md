---
title: 大文件上传
date: 2023-05-13 15:00:00
sidebar: true
categories:
    - Javascript
    - Node
tags:
    - Javascript
    - Node
publish: true
---

#### 读取文件并切片
```html
<template>
    <div>
        <input type="file" @change="handleFileChange" />
        <button @click="handleUpload">上传</button>
    </div>
</template>

<script setup>
import axios from 'axios'

const SIZE = 10 * 1024 * 1024 // 10M
let files = null
let chunkList = null

const handleFileChange = (e) => {
    const filesList = e.target.files
    if (filesList && filesList.length) {
        files = filesList[0]
        chunkList = createChunk(filesList[0])
    }
}

const handleUpload = () => {
    const uploadList = chunkList.map(({file}, index) => ({
        file,
        size: file.size,
        percent: 0,
        chunkName: `${files.name}-${index}`,
        fileName: files.name,
        index,
        type: files.type
    }))
    uploadFile(uploadList)
}

/**
 *
 * @param file 大文件
 * @param size 切片的大小  10 * 1024 * 1024 = 10M
 */
function createChunk(file, size = SIZE) {
    //两个形参：file是大文件，size是切片的大小
    const _chunkList = []
    let cur = 0
    while (cur < file.size) {
        _chunkList.push({
            file: file.slice(cur, cur + size) //使用slice()进行切片
        })
        cur += size
    }
    return _chunkList
}


async function uploadFile(list) {
    const requestList = list.map(({file,fileName,index,chunkName}) => {
        const formData = new FormData() // 创建表单类型数据
        formData.append('file', file)//该文件
        formData.append('fileName', fileName)//文件名
        formData.append('chunkName', chunkName)//切片名
        return {formData,index}
    })
    console.log(requestList)
    requestList.map(({formData,index}) => axiosRequest({
        method: 'post',
        url: 'http://localhost:3001/upload',//请求接口，要与后端一一一对应
        data: formData
    })
           .then(res => {
               console.log(res);
               //显示每个切片上传进度
               let p = document.createElement('p')
            p.innerHTML = `${list[index].chunkName}--${res.data.message}`
            document.getElementById('progress').appendChild(p)
           })
    )
    await Promise.all(requestList)//保证所有的切片都已经传输完毕
    merge(files.size, files.name)
}

// 通知后端去做切片合并
function merge(size, fileName) {
    axiosRequest({
        url: 'http://localhost:3001/merge',//后端合并请求
        data: JSON.stringify({
            size,
            fileName
        }),
    })
}


function axiosRequest({url,data}) {
    return new Promise((resolve, reject) => {
        const config = {//设置请求头
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        //默认是post请求，可更改
        axios.post(url, data, config).then((res) => {
            resolve(res)
        })
    })
}
</script>
```

#### Node
```Javascript
const http = require('http')
const multiparty = require('multiparty')
const path = require('path')
const fse = require('fs-extra')
const server = http.createServer()
const UPLOAD_DIR = path.resolve(__dirname, '.', 'fileCache')// 读取根目录，创建一个文件夹qiepian存放切片
server.on('request', async (req, res) => {
    // 处理跨域问题，允许所有的请求头和请求源
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    if (req.url === '/upload') { //前端访问的地址正确
        const multipart = new multiparty.Form() // 解析FormData对象
        try {
            multipart.parse(req, async (err, fields, files) => {
                if (err) { //解析失败
                    return res.end({
                        code: 1
                    })
                }
                // console.log('fields=', fields);
                // console.log('files=', files);
                
                const [file] = files.file
                const [fileName] = fields.fileName
                const [chunkName] = fields.chunkName
                const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-chunks`)//在qiepian文件夹创建一个新的文件夹，存放接收到的所有切片
                if (!fse.existsSync(chunkDir)) { //文件夹不存在，新建该文件夹
                    await fse.mkdirs(chunkDir)
                }
                // 把切片移动进chunkDir
                await fse.move(file.path, `${chunkDir}/${chunkName}`)
                res.end(JSON.stringify({ //向前端输出
                    code: 0,
                    message: '切片上传成功'
                }))
            })
        } catch (error) {
            console.log(error)
        }
    }

    if (req.url === '/merge') { // 该去合并切片了
        const data = await resolvePost(req)
        const {
            fileName,
            size
        } = data
        const filePath = path.resolve(UPLOAD_DIR, fileName)//获取切片路径
        const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-chunks`) 
        await mergeFileChunk(filePath, fileName, size)
        if (fse.existsSync(chunkDir)) {
            fse.removeSync(chunkDir)
        }
        res.end(JSON.stringify({
            code: 0,
            message: 'ok'
        }))
    }

})
server.listen(3001, () => {
    console.log('服务已启动');
})
// 合并
async function mergeFileChunk(filePath, fileName, size) {
    const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-chunks`)
    let chunkPaths = await fse.readdir(chunkDir)
    chunkPaths.sort((a, b) => a.split('-')[1] - b.split('-')[1])
    const arr = chunkPaths.map((chunkPath, index) => {
        return pipeStream(
            path.resolve(chunkDir, chunkPath),
            // 在指定的位置创建可写流
            fse.createWriteStream(filePath, {
                start: index * size,
                end: (index + 1) * size
            })
        )
    })
    await Promise.all(arr)//保证所有的切片都被读取
}
// 将切片转换成流进行合并
function pipeStream(path, writeStream) {
    return new Promise(resolve => {
        // 创建可读流，读取所有切片
        const readStream = fse.createReadStream(path)
        readStream.on('end', () => {
            fse.unlinkSync(path)// 读取完毕后，删除已经读取过的切片路径
            resolve()
        })
        readStream.pipe(writeStream)//将可读流流入可写流
    })
}
// 解析POST请求传递的参数
function resolvePost(req) {
    // 解析参数
    return new Promise(resolve => {
        let chunk = ''
        req.on('data', data => { //req接收到了前端的数据
            chunk += data //将接收到的所有参数进行拼接
        })
        req.on('end', () => {
            resolve(JSON.parse(chunk))//将字符串转为JSON对象
        })
    })
}

```