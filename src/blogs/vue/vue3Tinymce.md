---
title: Vue3使用tinymce以及自定义pdf解析插件
date: 2023-08-26
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
import 'tinymce/models/dom' // 引入dom模块。从 Tinymce6，开始必须有此模块导入
import 'tinymce/themes/silver' //默认主题
import 'tinymce/icons/default' //引入编辑器图标icon，不引入则不显示对应图标
import 'tinymce/plugins/link' //超链接
import 'tinymce/plugins/code' //编辑源码
import 'tinymce/plugins/table' //表格
import 'tinymce/plugins/lists' //列表插件
import 'tinymce/plugins/advlist' //高级列表
import 'tinymce/plugins/wordcount' //字数统计
import 'tinymce/plugins/anchor' //锚点
import 'tinymce/plugins/autolink' //自动链接
import { pdfPlugin, uploadImg, uploadVideo } from './utils/plugins'

// 自定义插件
tinymce.PluginManager.add('pdfPlugin', pdfPlugin)

const content = ref('')
const init = {
    height: 500,
    language: 'zh-Hans',
    language_url: '/tinymce/langs/zh-Hans.js', // 这里设置注意部署后的路径
    skin_url:  '/tinymce/skins/ui/oxide', //皮肤 这里设置注意部署后的路径
    content_css: '/tinymce/skins/content/default/content.css', // 这里设置注意部署后的路径
    content_style: 'body{font-size:14px;font-family:Microsoft YaHei,微软雅黑,宋体,Arial,Helvetica,sans-serif;line-height:1.5}img {max-width:100%;}',
    menubar: 'file edit view insert format tools table cfile help',
    menu: {
        file: { title: 'File', items: 'newdocument | preview | export | deleteallconversations' },
        edit: { title: 'Edit', items: 'undo redo restoredraft | cut copy | selectall | searchreplace' },
        view: {
            title: 'View',
            items: 'code | visualaid visualchars visualblocks | preview fullscreen | showcomments'
        },
        insert: {
            title: 'Insert',
            items:
                // image media
                'link addcomment pageembed template codesample inserttable | charmap emoticons | pagebreak nonbreaking anchor tableofcontents | insertdatetime'
        },
        format: {
            title: 'Format',
            items:
                'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat'
        },
        tools: { title: 'Tools', items: 'a11ycheck code wordcount' },
        table: {
            title: 'Table',
            items: 'inserttable | cell row column | advtablesort | tableprops deletetable'
        },
        cfile: {
            title: '上传',
            items: 'pdfPlugin uploadImg uploadVideo'
        }
    },
    toolbar:
        'fontselect fontsizeselect link lineheight forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | image media quicklink h2 h3 blockquote table numlist bullist | preview  undo redo',
    plugins: 'link code table lists wordcount preview pdfPlugin uploadImg uploadVideo',
    menubar: false, // 隐藏菜单栏
    statusbar: true, // 是否显示底部状态栏
    line_height_formats: '1 1.2 1.4 1.6 2', //行高
    font_size_formats: '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px', //字体大小
    font_family_formats:
        '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
    images_file_types: 'jpeg,jpg,png,gif,bmp',
    placeholder: '请输入内容',
    branding: false, //tiny技术支持信息是否显示
    statusbar: false, //最下方的元素路径和字数统计那一栏是否显示
    init_instance_callback: (editor) => { // 初始化完成
        console.log('初始化完成：', editor)
    }
}

onMounted(() => {
    tinymce.init({})
})
onUnmounted(() => {
  tinymce.remove()
})
</script>
```

## 自定义PDF解析插件
plugins.ts
```typescript
import tinymce from 'tinymce/tinymce'
import { uploadFileByBase64 } from '@/api/infra/file'
import Pdf2Image from './pdf2img.js'
import { file2Blob } from '@/utils/file'

function createInput(accept: string) {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', accept)
    return input
}

function concatContent(addContent = '', wrap = true) {
    const activeEditor = tinymce.activeEditor
    const char = wrap ? '\n' : ''
    activeEditor?.insertContent([addContent].join(char))
}

const CANVASDPI = 72
const PDFDPI = 96
const SCALE = 2

export const pdfPlugin = (editor) => {
    return editor.ui.registry.addMenuItem('pdfPlugin', {
        text: '上传PDF',
        onAction: function () {
            const fileAccept = '.pdf'
            const input = createInput(fileAccept)
            input.click()
            input.onchange = async function () {
                const loading = ElLoading.service({
                lock: true,
                text: '文件处理中...'
                })
                // @ts-ignore
                const file = this.files[0]
                try {
                    const url = file2Blob(file)
                    const pdf2img = (await Pdf2Image.open(url)) as Pdf2Image
                    const pages = pdf2img.numPages()
                    for (let i = 1; i <= pages; i++) {
                        let c
                        const url = await pdf2img.getImageDataUrl(i, {
                            scale: (PDFDPI / CANVASDPI) * SCALE,
                            callback: ({ canvas }) => {
                                c = canvas
                            }
                        })
                        const result = await uploadFileByBase64({
                            content: url,
                            isAddWatermark: 2,
                            path: `${productTiny}/${file.name}_${i}`
                        })
                        concatContent(`<img width="${c.width / 2}" height="${c.height / 2}" data-pdf="pdf" src="${result}" ></img>`)
                    }
                    loading.close()
                } catch (error) {
                    loading.close()
                }
            }
        }
    })
}
```
pdf2img.ts
```typescript
import { ElMessage } from 'element-plus'
const errorMap = {
    'No password given': '该文件已加密，无法解析'
}
const isProd = import.meta.env.PROD
// @ts-ignore
pdfjsLib.GlobalWorkerOptions.workerSrc = isProd ? './pdfjs-dist/build/pdf.worker.js'  : '/pdfjs-dist/build/pdf.worker.js'

class Pdf2Image {
    pdfDoc: any
    constructor(pdfDoc: string) {
        this.pdfDoc = pdfDoc
    }

    static async open(url) {
        try {
            // @ts-ignore
            const pdfDoc: any = await pdfjsLib.getDocument({
                url
            }).promise
            return new Pdf2Image(pdfDoc)
        } catch (error: any) {
            ElMessage.error(errorMap[error.message] || '文件格式不正确, 检查文件是否损坏或文件名过长')
        }
    }

    // 计算缩放比例
    static calcScale(page, option) {
        if (option.scale !== undefined) return option.scale
        if (option.width === undefined || option.height === undefined) return 1.0
        const viewport = page.getViewport({ scale: 1.0 })
        return Math.min(option.width / viewport.width, option.height / viewport.height)
    }

    numPages() {
        return this.pdfDoc.numPages
    }


    /**
     * @desc 将第pageNo页的pdf转换为指定格式的图片，option用于添加一些配置;比如设置图片导出格式，设置缩放比例、执行回调函数等
     * @param { Number } pageNo
     * @param { Object } option
     */
    async getImageDataUrl(pageNo, option) {
        const page = await this.pdfDoc.getPage(pageNo)
        let scale = 1

        if (option) {
            scale = Pdf2Image.calcScale(page, option)
        }
        option = option || {}
        if (!option.image) {
            //   默认导出图片格式为jpeg
            option.image = 'jpeg'
        }
        //  指定pdf页面的视口大小
        const viewport = page.getViewport({ scale })
        const canvas = document.createElement('canvas')
        const canvasContext: any = canvas.getContext('2d')
        // 设置画布的大小
        canvas.height = viewport.height
        canvas.width = viewport.width
        // 设置画布上下文的大小, 决定了在画布上下文中绘制的图形大小
        canvasContext.height = viewport.height
        canvasContext.width = viewport.width

        const renderContext = {
            canvasContext,
            viewport
        }

        // 将pdf页面渲染为图片并返回promise
        await page.render(renderContext).promise
        // 相比原作者封装的方法，增加了一个回调函数，获取canvas的大小，对后续的图片缩放有帮助
        if (option.callback) option.callback({ canvas })
        // 将canvas导出为指定格式的图片
        switch (option.image) {
        case 'jpeg':
            return canvas.toDataURL('image/jpeg')
        case 'webp':
            return canvas.toDataURL('image/webp')
        default:
            return canvas.toDataURL()
        }
    }

    // 将整个pdf转换为指定格式的图片
    async getAllImageDataUrl(option) {
        const pages: string[] = []
        const numPages = this.numPages()
        for (let i = 1; i <= numPages; i += 1) {
            const img = await this.getImageDataUrl(i, option)
            pages.push(img)
        }
        return pages
    }
}

export default Pdf2Image
```
