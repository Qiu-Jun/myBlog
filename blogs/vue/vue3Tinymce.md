---
title: Vue3使用tinymce以及自定义pdf解析插件
date: '2023-08-26 09:12:00'
sidebar: true
categories:
    - Vue
tags:
    - 前端
    - Vue
    - Vue3
publish: true
---

## 安装插件
```bash
pnpm add tinymce @tinymce/tinymce-vue
```

## 引入中文语言包
[语言包地址](https://www.tiny.cloud/get-tiny/language-packages)
把语言包引入到本地，可根据需求多语言切换
```html
<template>
  <editor v-model="content" :init="init"></editor>
</template>

<script lang="ts" setup>
import tinymce from 'tinymce/tinymce';
import Editor from '@tinymce/tinymce-vue';

const content = ref('')
const init = {
    language: 'zh-Hans',
    language_url: './tinymce/langs/zh-Hans.js',
    menubar: false, // 隐藏菜单栏
    statusbar: true, // 是否显示底部状态栏
    init_instance_callback: (editor) => { // 初始化完成
        console.log('初始化完成：', editor)
    }
}

onMounted(() => {
    tinymce.init({})
})
</script>
```

## 自定义按钮
TinyMCE官方提供了`tinymce.PluginManager.add`自定义插件

## pdf解析
