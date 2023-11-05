---
title: git 日常工作维护
date: 2022-02-13
sidebar: true
categories:
    - 工具
tags:
    - Git
publish: true
---

## 日常提交
```bash
# 开发前切换到自己的分支开发，开发完再合并到master提交
# 在主分支签出自己的分支
git checkout -b yourBranchName

# 检查文件状态
git status

# 添加需要提交的文件 .代表全部
git add .

# 设置commit
git commit -am 'write something'

# 提交
# 把你的分支提交到远程
git push -u origin branchName
# 如果你不想把自己分支提交到线上
# 假设master是主分支
git checkout master
git rebase yourBranchName
# 或者用merge，merge会多一个合并的commit
git merge yourBranchName
# yourBranchName分支会合并到master，会有yourBranchName分支提交信息，最后一条提交与yourBranchName分支一致。
git merge yourBranchName --no-commit
# yourBranchName分支会合并到master，没有yourBranchName分支提交信息，需要自行git commit。
git merge yourBranchName --squash
# 提交master 别像上面用-f force会覆盖的
git push origin master

# 修改未push的commit
git commit --amend

# 修改remote地址
git remote set-url origin XXX
```

## 常用操作
+ 临时忽略提交文件
```bash
# 忽略
git update-index --assume-unchanged filePath
# 取消忽略
git update-index --no-assume-unchanged filePath
```
+ rm
```bash
# 删除暂存区或分支上的文件, 同时工作区也不需要这个文件了
git rm file_path
# 需要删除暂存区或分支上的文件, 但本地又需要使用, 只是不希望这个文件被版本控制
git rm --cached file_path
```
+ 重命名远程分支
```bash
git branch -m oldName newName
```
+ 回退提交
```bash
# 查看commitid
git log
# reset --hard 工作区和暂存区的内容都被抹掉
# 回退到上一次提交
git reset --hard HEAD^
# 彻底回退到某个版本
git reset --hard commitid 
# 将本地的状态回退到和远程的一样
git reset –-hard origin/master  
# 直接覆盖提交
# 如果提示分支保护，则去设置分支保护去掉，覆盖完再设置回来
git push -f
```

## 打tag
```bash
# 给某个commit打tag
# -a是指定tag名字，-m是指定说明信息 commit_id 提交的commit记录id
git tag -a v1.0.0 -m '第一个版本' commit_id

# 查看v1.0.0这个tag的相关信息
git show v1.0.1

# 删除tag(本地)
git tag -d v1.0.0
# 推送tag
git push origin v1.0.0
# 如果在本地删除了v1.0.0, 远程也需要做出相应修改的话,则
git push origin :refs/tags/v1.0.0
```

## 清除git中的账号密码缓存
```bash
# 清除全局的凭据缓存
git config --global --unset credential.helper
# 清除当前仓库的凭据缓存
git config --unset credential.helper
# 卸载凭据管理器(从系统移除)
git credential-manager uninstall
```

## 配置相关
```bash
# 查看全局配置信息
git config --global --list

# 查看当前仓库的配置信息
git config --list
```

## 提交规范
+ feat：提交新功能
+ fix：修复了bug
+ docs：只修改了文档
+ style：调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）
+ refactor：代码重构，既没修复bug也没有添加新功能
+ perf：性能优化，提高性能的代码更改
+ test：添加或修改代码测试
+ chore：对构建流程或辅助工具和依赖库（如文档生成等）的更改
