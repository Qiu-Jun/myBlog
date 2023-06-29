---
title: Electron搭建
date: 2022-10-22
sidebar: true
categories:
    - Electron
    - Vue
tags:
    - Vite
    - Vue3
    - Electron
publish: true
---

## 初始化项目
```bash
# Vite初始化一个Vue3+TS
npm create vite@latest electron-vue-app -- --template vue-ts

# 安装依赖
npm install

# 运行
npm run dev
```

## 安装Electron相关包
### electron
### electron-builder
+ 用途：主要利用electron-builder来进行打包
### electron-devtools-installer
+ 用途：主要是为了方便我们开发和调试electron.[electron-devtools-installer](https://github.com/MarshallOfSound/electron-devtools-installer)
### vite-plugin-electron
+ 用途：该包集成了`Vite`和`Electron`，比如使用它之后可以让我们方便的在渲染进程中使用`Node API`或者`Electron API`，详细使用用法可以去官网学习：[vite-plugin-electron](https://github.com/electron-vite/vite-plugin-electron)
### rimraf
+ 用途：该包主要是辅助作用，让我们快速删除某些文件和文件夹

## 初始化Electron
<p>`Electron`项目分为了主进程和渲染进程，主进程其实就是`Electron`，渲染进程就相当于`Vue`项目</p>
#### 新建主进程
> 为了方便修改代码和查看，我们在项目根目录新建主进程文件夹electron-main，然后在其目录下新建index.ts文件，编写主进程代码

```javascript
// electron-main/index.ts
import { app, BrowserWindow } from "electron"
import path from "path"

const createWindow = () => {
    const win = new BrowserWindow({
            webPreferences: {
            contextIsolation: false, // 是否开启隔离上下文
            nodeIntegration: true, // 渲染进程使用Node API
            preload: path.join(__dirname, "../electron-preload/index.js"), // 需要引用js文件
        }
    });


    // 如果打包了，渲染index.html
    if (app.isPackaged) {
        win.loadFile(path.join(__dirname, "../index.html"));
    } else {
        let url = "http://localhost:5175"; // 本地启动的vue项目路径
        win.loadURL(url);
    }
};


app.whenReady().then(() => {
    createWindow(); // 创建窗口
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});


// 关闭窗口
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
```
+ 渲染进程路径引用的是js而不是ts，因为我们的electron是不认识ts文件的
+ `app.isPackaged`主要是用来判断应用是否已经打包了，打包了我们只需要引用相对路径的html文件即可

#### 新建预加载文件
`electron`中有一个预加载的概念，也就是我们常说的`preload`，在该文件里面可以在其它脚本文件执行之前运行，它可以调用一些`Node API`<br />
在项目根目录新建`electron-preload`文件夹，然后在其目录下新建index.ts文件，编写代码

```javascript
// electron-preload/index.ts
import os from "os";
console.log("platform", os.platform());
```

## 修改tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"],
    "skipLibCheck": true
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "electron-main/**/*.ts",
    "electron-preload/**/*.ts"
  ],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## 修改vite.config.ts
虽然我们建好了`electron`的主进程文件和预加载文件，但是如果我们不做任何处理，这两个文件就和普通的脚本文件没有任何区别了。所以我们需要修改`vite.config.ts`配置文件，以此将`electron`和`vite`项目结合起来

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import * as path from "path"
import electron from "vite-plugin-electron"
import electronRenderer from "vite-plugin-electron/renderer"
import polyfillExports from "vite-plugin-electron/polyfill-exports"

export default defineConfig({
    plugins: [
		vue(),
		electron({
			main: {
			  entry: "electron-main/index.ts", // 主进程文件
			},
			preload: {
			  input: path.join(__dirname, "./electron-preload/index.ts"), // 预加载文件
			},
		}),
		electronRenderer(),
		polyfillExports(),
	],
	build: {
		emptyOutDir: false, // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录
	},
})
```
在上面的配置中，我们使用到了`vite-plugin-electron`插件，它将我们的`electron`和`vite`很好的结合了起来

## 修改package.json
+ 配置了`main`入口文件，由于`electron`还未支持ts，所以需要引用打包后的index.js文件
+ 修改了`build`命令，利用`electron-builder`进行`electron`项目的打包

```javascript
// package.json
{
    ...
    "main": "dist/electron/index.js",
    "scripts": {
        "dev": "vite",
        "build": "rimraf dist && vite build && electron-builder",
        "preview": "vite preview"
    },
    ...
}
```

## 配置electron-builder打包脚本
```javascript
// package.json
{
    ...
    "build": {
        "appId": "com.june.tool",
        "productName": "JuneTool",
        "asar": true,
        "copyright": "Copyright © 2022 JuneTool",
        "directories": {
            "output": "release/${version}"
        },
        "files": [
            "dist"
        ],
        "mac": {
            "artifactName": "${productName}_${version}.${ext}",
            "target": [
                "dmg"
            ]
        },
        "win": {
            "target": [
                {
                "target": "nsis",
                "arch": [
                    "x64"
                ]
                }
            ],
            "artifactName": "${productName}_${version}.${ext}"
        },
        "nsis": {
            "oneClick": false,
            "perMachine": false,
            "allowToChangeInstallationDirectory": true,
            "deleteAppDataOnUninstall": false
        },
        "releaseInfo": {
            "releaseNotes": "版本更新的具体内容"
        }
    },
    ...
}
```


## 主进程与渲染进程通信
为了方便我们主进程与渲染进程的通信，我们借助`vueuse`插件库中的一个插件`@vueuse/electron`来简化我们的工作，具体使用方式可以查看官网：[@vueuse/electron](https://vueuse.org/functions.html#category=%40Electron)
+ 安装@vueuse/electron
```bash
npm install @vueuse/electron
```

+ 渲染进程`App.vue`，使用示例代码如下：
```javascript
import { useIpcRenderer } from "@vueuse/electron";
const ipcRenderer = useIpcRenderer();
ipcRenderer.send("window-new", "im render"); // 向主进程通信
```

+ electron-main/index.ts中主进程监听事件
```javascript
import { app, BrowserWindow, ipcMain } from "electron";
// 监听渲染进程方法
ipcMain.on("window-new", (e: Event, data: string) => {
  console.log(data);
});
```

运行项目后，我们查看命令行控制台打印结果

[原文(小猪课堂)](https://juejin.cn/post/7102681636096966687)
