---
title: 代码规范化管理
date: 2022-02-13
sidebar: true
categories:
    - 前端
tags:
    - 前端
    - 代码规范
publish: true
---

:::tip
总结一些常用规范。EditorConfig + Prettier + ESLint 实现代码规范化.<br />
[代码规范参考文章](https://juejin.cn/post/6844903652096770055)
:::

## 命名规范
+ JS
    - 变量
        + 驼峰
        + 描述相关内容
        + 禁止使用保留字
        ```javascript
        const myScholl = '我的学校'
        const names = []
        ```
    - 常量
        + 大写
        + 下划线组合
        + 注释常量内容，方便后者一眼就了解到常量用途
        ```javascript
        // 订单状态
        const ORDER_STATUS = {}
        const COUNT = 10
        ```
    - 方法
        + 驼峰
        + 操作+动作+名词
        + 配合防抖和节流适当使用
        ```javascript
        // 初始化 => init or initXxx
        const init = () => {}
        const initDetail = () => {}
        // 执行事件 => handleXxx
        const handleCreate = () => {}
        // 监听 => onXxx
        const onScroll = () => {}

        // 常用动词(参考摘要文章里的动词，个人不怎么喜欢)
        ```
+ Vue组件(官方文档推荐及使用遵循规则)
    - PascalCase (单词首字母大写命名)是最通用的声明约定
    - kebab-case (短横线分隔命名) 是最通用的使用约定
    - 组件名应该始终是多个单词的，根组件 App 除外
    - 有意义的名词、简短、具有可读性
    - 命名遵循 PascalCase 约定
        + 公用组件以 El (公司名缩写简称) 开头，如（ElTable）
        + 页面内部组件以组件模块名简写为开头，Item 为结尾，如（StaffBenchToChargeItem，StaffBenchAppNotArrItem）
    - 使用遵循 kebab-case 约定
        + 在页面中使用组件需要前后闭合，并以短线分隔，如（<el-table></el-table>）
    - 导入及注册组件时，遵循 PascalCase 约定
    - 必须符合自定义元素规范: 切勿使用保留字
+ 页面目录
    - 尽量是名词,且使用驼峰命名法
    - 开头的单词就是所属模块名字
    ```javascript
    + home // home页面
        + components // 组件
            + homeList // 组件
                + homeListItem.vue // 组件颗粒
                + index.vue // 组件入口
        + modules // 抽离逻辑
            + xxModule.js
        + index.vue  // home页面入口
    + category // 分类页面
        + index.vue // 入口
    ```
+ CSS
    - 通用规范
        + 统一使用"-"连字符
        + 省略值为0时的单位
        + CSS可以做到，就不要使用JS
        + 适当缩写值，提高可读性，特殊情况除外

## eslint + Prettier
### editorConfig 配置
> 同一项目的多个开发人员维护一致的编码风格[EditorConfig](https://editorconfig.org/)

+ 在根目录新建.editorconfig
```bash
# 表示是最顶层的 EditorConfig 配置文件
root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 4 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```
+ vscode插件 EditorConfig for VS Code

### Prettier 配置
> Prettier 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。

+ 安装
```bash
yarn add prettier -D // or npm install prettier -D
```
+ .根目录下创建.prettierrc文件
```json
{
    "useTabs": false,
    "tabWidth": 4,
    "printWidth": 100,
    "singleQuote": true,
    "trailingComma": "none",
    "bracketSpacing": true,
    "semi": false
}
```
+ Prettier 命令来格式化代码
```bash
# 格式化所有文件（. 表示所有文件）
npx prettier --write .
```
+ vscode使用Prettier配置需要下载插件 Prettier - Code formatter

### Eslint配置
> ESLint 是一款用于查找并报告代码中问题的工具，并且支持部分问题自动修复。其核心是通过对代码解析得到的 AST（Abstract Syntax Tree 抽象语法树）进行模式匹配，来分析代码达到检查代码质量和风格问题的能力。
+ 安装初始化
```bash
yarn i eslint -D
npx eslint --init
// 选择 Airbnb 风格
```
+ 根目录创建并配置.eslintrc.js
```javascript
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        // 'plugin:vue/essential', 非vue3用这个
        'plugin:vue/vue3-essential',
        'airbnb-base',
        'plugin:prettier/recommended' // 添加 prettier 插件
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['vue'],
    rules: {}
}
```
+ vscode配置文件保存时自动执行eslint --fix命令格式化
```json
// settings.json
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
 }
```

### 解决 Prettier 和 ESLint 的冲突
```bash
yarn i eslint-plugin-prettier eslint-config-prettier -D
```
.eslintrc.js 添加 prettier 插件
```js
module.exports = {
    ...
    extends: [
    // 'plugin:vue/essential', 非vue3用这个
        'plugin:vue/vue3-essential',
        'airbnb-base',
        'plugin:prettier/recommended' // 添加 prettier 插件
    ]
    ...
}
```


## 集成husky和lint-staged
+ 安装插件
```bash
yarn add husky lint-staged -D
npx husky-init // 会在根目录生成.husky文件夹
```
+ 在package.json配置lint-staged
```json
"lint-staged": {
    "*.{vue,js}": "eslint --fix"
}
```

+ 修改 .husky/pre-commit 
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

+ 提交代码就会先 eslint --fix

## prettier 常用

```json
"printWidth": 100, // 超过最大值换行
"tabWidth": 4, // 缩进字节数,默认为2
"useTabs": false, // 缩进不使用tab，使用空格
"semi": true, // 句尾添加分号
"singleQuote": true, // 使用单引号代替双引号
"proseWrap": "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
"arrowParens": "avoid", //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号，always：总是有括号
"bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
"disableLanguages": ["vue"], // 不格式化vue文件，vue文件的格式化单独设置
"endOfLine": "auto", // 结尾是 \n \r \n\r auto
"eslintIntegration": false, //不让prettier使用eslint的代码格式进行校验
"htmlWhitespaceSensitivity": "ignore",
"ignorePath": ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
"jsxBracketSameLine": false, // 在jsx中把'>' 是否单独放一行
"jsxSingleQuote": false, // 在jsx中使用单引号代替双引号
"parser": "babylon", // 格式化的解析器，默认是babylon
"requireConfig": false, // Require a 'prettierconfig' to format prettier
"stylelintIntegration": false, //不让prettier使用stylelint的代码格式进行校验
"trailingComma": "es5", // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
"tslintIntegration": false // 不让prettier使用tslint的代码格式进行校验
```