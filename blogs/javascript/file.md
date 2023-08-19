---
title: File、Blob、Base64、Hex格式转换
date: '2023-08-20'
categories:
    - 前端
tags:
    - 前端
publish: true
---

## File
通过用户选择文件后从`input[type=file]`元素中获取的一个文件对象

|   属性   |       描述          |
|   ----   |        ----        |
|  name   |  文件的名称，不包括路径 |
|  size  |  文件的大小（字节） |
|  type     |  文件的类型（MIME）如 'image/png'、'text/plain'等 |
|  lastModified     |  文件最后的修改时间（Date） |

## Blob
Blob(Binary large object)：二进制大型对象<br />
blob常常用是数据库用来存储二进制文件的字段类型，如(图片、音频、视频、文档等)

## Base64
一种基于64个可打印字符来表示二进制数据的方法，用于在文本协议中传递二进制数据

## 十六进制Hex
十六进制编码（base16），将字节数据中的每4个bit使用数字(0-9)、字母(A-F)共16个字符数等效表示。其中一个字节有8个bit，所以一个字节会被编码成2个hex字符

## file 转 blob
文件流转blob
```javascript
/**
 * file转blob
 * @param file   {File} 文件
 * @returns blob {Blob} blob
 */

function file2Blob (file) {
    return window.URL.createObjectURL(file)
}

```

## blob 转 file
blob转file
```javascript
/**
 * blob转file
 * @param blob       {Blob}   blob
 * @param fileName   {String} 文件名
 * @param mimeType   {String} 文件类型
 * @returns file     {File}   文件
 */

function blob2File (blob, fileName, mimeType) {
    const file = new File([blob], fileName, { type: mimeType })
    return file
}
```

mimeType有如常见类型: 
+ image/jpeg：jpeg格式的图片
+ image/jpg：jpg格式的图片
+ image/png：png格式的图片
+ image/gif：gif格式的图片
+ audio/mpeg: mp3格式的音频文件
+ video/mp4：mp4格式的视频文件
+ application/pdf：pdf文档
+ application/json：json数据
+ text/plain：纯文本文件
+ text/html：html文档

## file 转 base64
文件流转base64
```javascript
/**
 * file转base64
 * @param file       {File}    文件
 * @returns promise  {Promise} 返回base64
 */
 
function file2Base64 (file) {
    return new Promise((resolve, reject) => {
        // 使用FileReader对象异步读取文件的内容
        const reader = new FileReader()
        let readerResult = ''
        
        // 开始读取
        reader.readAsDataURL(file)
        
        // 操作完成时触发
        reader.onload = function () {
            readerResult = reader.result
        }
        
        // 读取操作发生错误时触发
        reader.onerror = function (error) {
            reject(error)
        }
        
        // 读取操作结束时触发（要么成功、要么失败）
        reader.onloadend = function () {
            resolve(readerResult)
        }
    })
}
```

## base64 转 file
base64 转 文件流，先获取文件的类型和后缀，然后通过base64字符串转blob，最后用new File创建一个File文件流对象
```javascript
/**
 * base64转file
 * @param base64     {String} base64
 * @param fileName   {String} 文件名 
 * @returns file     {File}   文件
 */
 
function base642File (base64, fileName = 'file') {
    const arr = base64.split(',')
    
    // 文件类型
    const mime = arr[0].match(/:(.*?);/)[1]
    
    // 文件后缀
    const suffix = mime.split('/')[1]
    
    // base64解码
    const bstr = atob(arr[1])
    
    let n = bstr.length
    
    // 一个8位无符号整型数组
    let u8arr = new Unit8Array(n)
    
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    
    return new File([u8arr], `${fileName}.${suffix}`, {
        type: mime
    })
}

```

## base64 转 hex
base64 转 hex（十六进制），先使用atob函数将base64字符串解码成二进制数据，再通过toString(16)转成十六进制
```javascript
/**
 * base64转hex
 * @param base64     {String} base64 
 * @returns hex      {String} hex十六进制
 */
 
function base2ToHex (base64) {
    const arr = base64.split(',')
    
    // 对base64编码的字符串进行解码
    const raw = atob(arr[1])
    
    let HEX = ''
    
    for (let i = 0; i < raw.length; i++) {
        // charCodeAt()得到二进制，二进制通过toString(16)转成十六进制
        const _hex = raw.charCodeAt(i).toString(16)
        HEX += (_hex.length === 2 ? _hex : '0' + _hex)
    }
    return HEX.toUpperCase()
}
```

## hex 转 file
```javascript
/**
 * base64转hex
 * @param hex          {String} hex十六进制 
 * @param fileName     {String} 文件名 
 * @param mimeType     {String} 文件类型
 * @returns hex        {String} hex十六进制
 */
 
function hex2File (hexString, fileName, mimeType) {
    // 将十六进制字符串转成字节数组
    const bytes = hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16))
    
    // 从字节数组创建一个Blob对象
    const blob = new Blob([new UintBArray(bytes)], { type: mimeType })
    
    // 从Blob创建一个File对象
    const file = new File([blob], fileName, { type: mimeType })
    
    return file
}
```