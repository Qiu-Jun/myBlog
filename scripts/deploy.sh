#!/bin/sh
###
 # @Author: June
 # @Description: 
 # @Date: 2023-11-06 01:48:03
 # @LastEditors: June
 # @LastEditTime: 2023-11-07 02:23:36
### 
curPath='/Users/june/Desktop/my_blog'
outPath='/Users/june/Desktop/blog_build'

# read -p '请输入操作:' input

if [ $1 = 'cur' ]; then
    cd $curPath
    echo '开始提交仓库'
    git add .
    git commit -am "deploy by June at `date '+%Y-%m-%d %H:%M:%S'`"
    git push origin master
    echo '提交完成'
elif [ $1 = 'build' ]; then
    # 执行打包
    pnpm build
    # 复制文件
    cp -r -f ./.vitepress/dist/ $outPath
    echo '打包完成';

    cd $outPath
    git add .
    git commit -am "deploy by June at `date '+%Y-%m-%d %H:%M:%S'`"
    git push -f origin main
    echo '提交完成';
else
    exit 1
fi
