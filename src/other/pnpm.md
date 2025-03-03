---
title: Pnpm包管理命令
date: '2023-04-16 20:00:00'
sidebar: true
categories:
    - 工具
tags:
    - Pnpm
publish: true
---

### Normal bash

```bash
# 获取当前配置的镜像地址
pnpm get registry

# 设置新的镜像地址
pnpm set registry https://registry.npmmirror.com

# (可选)修改默认安装包的仓库位置
pnpm config set store-dir E:/pnpm_node_modules

# 安装全部依赖
pnpm install

# 安装指定包
# -D指devDependencies -w表示在workspace的根目录下安装而不是当前的目录
pnpm add packageName -Dw
# --filter/-F 具体包目录名/包的name/正则匹配包名/匹配目录 command
pnpm --filter packages/xxx add vue

#  移除指定包 其他参数同add
pnpm remove packageName -Dw

# 升级版本
pnpm add -g pnpm to update
```

### Error
#### win下使用pnpm或者yarn报错
```bash
# 使用管理员CMD执行下面命令然后选All
set-ExecutionPolicy RemoteSigned
```
