---
title: Homebrew安装慢的问题
date: '2022-05-19 12:56:00'
sidebar: false
categories:
    - 其他
tags:
    - Homebrew
    - 其他
publish: true
---

### 替换brew.git仓库地址
```bash
cd "$(brew --repo)"
git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git
```

### 替换homebrew-core.git仓库地址
```bash
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git
```

### 替换homebrew-bottles访问地址
```bash
echo $SHELL
```
#### zsh终端操作方式
```bash
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.zshrc
source ~/.zshrc
```
#### bash终端操作方式
```bash
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.bash_profile
source ~/.bash_profile
```
#### 还原配置
```bash
cd "$(brew --repo)"
git remote set-url origin https://github.com/Homebrew/brew.git
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://github.com/Homebrew/homebrew-core.git
```
#### zhs还原
```bash
vi ~/.zshrc
# 删除HOMEBREW_BOTTLE_DOMAIN
source ~/.zshrc
```
#### bash还原
```bash
vi ~/.bash_profile
# 删除HOMEBREW_BOTTLE_DOMAIN
source ~/.bash_profile
```