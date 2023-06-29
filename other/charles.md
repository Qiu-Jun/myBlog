---
title: charles(v4.6.2)抓包配置(Mac)
date: '2023-02-05 23:30:00'
sidebar: true
categories:
    - 其他
publish: true
---

### 配置代理
菜单栏Proxy>Proxy Settings配置
![](/imgs/other/charles/proxy_setting.png)

打开任意网页，这时候就可以在charles看到代理了(但此时只有http是正常的，https需要完成下面的ssl配置)

### 获取本地的ip
+ terminal.app
    - 通过终端输入命令ifconfig可以查看
+ charles
    - 菜单栏Help>Local IP Address

### 手机代理
+ 把手机连接到同个局域网
+ 找到wifi设置
    ![](/imgs/other/charles/proxy_mobile1.jpeg)
+ 找到http代理如下配置
    ![](/imgs/other/charles/proxy_mobile2.jpeg)
+ 手机打开应用可以看到代理的请求了(但此时只有http是正常的，https需要完成下面的ssl配置)

### SSL配置
+ pc端
    - 菜单栏Help>SSL Proxying>install Charles Root Certificate
    - 安装完后在钥匙串访问找到charles proxy的证书双击查看，在信任下按如下设置
        ![](/imgs/other/charles/proxy_charles_ca.jpg)
    - 然后在菜单栏Proxy>SSL Proxying Settings配置,add把host和port都设置为*(所有的)
        ![](/imgs/other/charles/proxy_charles_ssl.jpg)
    - pc端代理完成
+ mobile(IPhone)
    - 菜单栏Help>SSL Proxying>install Charles Root Certificate on a Mobile Device or Remote Browser
    - 用Safari访问`http://chls.pro/ssl`,出现如下图片选择允许
        ![](/imgs/other/charles/proxy_mobile_download.jpeg)
    - 在iphone设置中查看已下载的描述文件安装
        ![](/imgs/other/charles/proxy_setting_desc_install.jpeg)
    - 安装完之后在关于本机找到证书信任设置，把Charles Proxy打开
        - ![](/imgs/other/charles/proxy_mobile_cer_open.jpeg)
    - mobile代理配置完成