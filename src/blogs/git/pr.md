---
title: 如何给开源项目提pr
date: 2022-01-23
sidebar: false
categories:
    - 工具
tags:
    - Git
publish: false
---

+ fork开源项目
+ clone fork下来的仓库到本地
+ 修改代码(我一般用sourcetree提交)
```bash
// 创建分支 
git checkout -b ''
git add filename
git commit -m ''
git push origin branchname
```
+ 获取更新提交
> 先更新最新的代码<br />**rebase**形成的是一条线，会把你当前的几个commit，放到最新commit的后面<br />**merge**会把公共分支和你当前的commit按照提交时间合并在一起，形成一个新的commit提交， git pull = fetch + merge

```bash
// 设置upstream为开源地址
git remote add upstream 开源地址
// 获取更新
git fetch upstream
// 合并更新
git rebase upstream/master
// 冲突 => 修改冲突后的文件， git add 冲突文件 commit
git rebase --continue
```
+ 创建pr
> 打开fork的项目新建pull request