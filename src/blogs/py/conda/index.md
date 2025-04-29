---
title: python conda 常用命令
date: '2025-04-228 12:56:00'
sidebar: true
categories:
    - python
tags:
    - python
publish: true
---

## caonda常用命令

#### 查看conda版本
```bash
conda --version
```

#### 查看conda的环境配置
```bash
conda config --show
```

#### 设置镜像

##### 清华镜像
```bash
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
#设置bioconda
conda config --add channels bioconda
conda config --add channels conda-forge
#设置搜索时显示通道地址
conda config --set show_channel_urls yes
```

#### 中科大镜像
```bash
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/menpo/
conda config --set show_channel_urls yes
```

####

#### 更新conda
将conda自身更新到最新版本，it is recommended to always keep conda updated to the latest version.  

```bash
conda update conda
```

#### 更新Anaconda整体
将整个Anaconda都更新到确保稳定性和兼容性的最新版本

```bash
conda update Anaconda
```

#### 创建虚拟环境
```bash
conda create -n env_name python=3.8
# 这表示创建python版本为3.8、名字为env_name的虚拟环境。
# 创建后，env_name文件可以在Anaconda安装目录envs文件下找到。在不指定python版本时，自动创建基于最新python版本的虚拟环境.      
```

#### 查看有哪些虚拟环境
```bash
conda env list
conda info -e
conda info --envs
```

#### 激活虚拟环境
```bash
conda activate env_name
```

#### 退出虚拟环境
```bash
conda deactivate env_name
```

#### 删除虚拟环境
+  执行以下命令可以将该指定虚拟环境及其中所安装的包都删除
```bash
conda remove --name env_name --all
```

+  如果只删除虚拟环境中的某个或者某些包则是
```bash
conda remove --name env_name  package_name
```
