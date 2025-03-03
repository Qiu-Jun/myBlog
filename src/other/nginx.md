---
title: Nginx基本操作
date: '2022-05-21 17:26:59'
sidebar: true
categories:
    - 其他
tags:
    - Nginx
    - 其他
publish: true
---


## 基础命令
```bash
# 检查配置文件是否有语法错误 
nginx -t -c path/default.conf
# 热加载，重新加载配置文件 
nginx -s reload
# 快速关闭
nginx -s stop
# 等待工作进程处理完成后关闭 
nginx -s quit
```

## location匹配
### 路径匹配符
+ = 表示精确匹配
+ ^~ 表示uri以某个常规字符串开头,大多情况下用来匹配url路径，nginx不对url做编码，因此请求为/static/20%/aa，可以被规则^~ /static/ /aa匹配到（注意是空格）。
+ ~ 正则匹配(区分大小写)
+ ~* 正则匹配(不区分大小写)
+ !~ 区分大小写不匹配
+ !~* 不区分大小写不匹配
+ / 任何请求都会匹配
### 符号优先级
首先匹配 =，其次匹配^~, 其次是按文件中顺序的正则匹配，最后是交给 / 通用匹配。当有匹配成功时候，停止匹配，按当前匹配规则处理请求。`（精准匹配>模糊匹配>通用匹配）`
### 匹配例子
```bash
location  = / {
  # 精确匹配 / ，主机名后面不能带任何字符串
  [ 规则 A ] 
}

location  / {
  # 因为所有的地址都以 / 开头，所以这条规则将匹配到所有请求
  # 但是正则和最长字符串会优先匹配
  [ 规则 B ] 
}

location /documents/ {
  # 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索
  # 只有后面的正则表达式没有匹配到时，这一条才会采用这一条
  [ 规则 C ] 
}

location ~ /documents/Abc {
  # 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索
  # 只有后面的正则表达式没有匹配到时，这一条才会采用这一条
  [ 规则 D ] 
}

location ^~ /images/ {
  # 匹配任何以 /images/ 开头的地址，匹配符合以后，停止往下搜索正则，采用这一条。
  [ 规则 E ] 
}

location ~* \.(gif|jpg|jpeg)$ {
  # 匹配所有以 gif,jpg或jpeg 结尾的请求
  # 然而，所有请求 /images/ 下的图片会被 [规则 E] 处理，因为 ^~ 优先级更高
  [ 规则 F ] 
}

location /images/ {
  # 字符匹配到 /images/，继续往下，会发现 ^~ 存在
  [ 规则 G ] 
}

location /images/abc {
  # 最长字符匹配到 /images/abc，继续往下，会发现 ^~ 存在
  [ 规则 H ] 
}

location ~ /images/abc/ {
  # 只有去掉 [规则 E] 才有效：先最长匹配 [规则 H] 开头的地址，继续往下搜索，匹配到这一条正则，采用
  [ 规则 I ] 
}
```

## 正向代理和反向代理
+ 正向代理
    - `正向代理`，意思是一个位于客户端和原始服务器(origin server)之间的服务器，为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标(原始服务器)，然后代理向原始服务器转交请求并将获得的内容返回给客户端
    - `正向代理`是为客户端服务的，客户端可以根据`正向代理`访问到它本身无法访问到的服务器资源
    - `正向代理`对客户端是透明的，对服务端是非透明的，即服务端并不知道自己收到的是来自代理的访问还是来自真实客户端的访问
+ 反向代理
    - 概念：`反向代理`（Reverse Proxy）方式是指以代理服务器来接受internet上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给internet上请求连接的客户端，此时代理服务器对外就表现为一个`反向代理`服务器
    - `反向代理`是为服务端服务的，`反向代理`可以帮助服务器接收来自客户端的请求，帮助服务器做请求转发，负载均衡等
    - `反向代理`对服务端是透明的，对客户端是非透明的，即客户端并不知道自己访问的是代理服务器，而服务器知道`反向代理`在为他服务

## 负载均衡
### nginx的负载均衡有4种模式
+ 轮询（默认）: 每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除
+ weight: 指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的情况
+ ip_hash: 每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题
+ fair（第三方）: 按后端服务器的响应时间来分配请求，响应时间短的优先分配    
+ url_hash（第三方）
#### 例子
```bash
# 默认轮询 第一个请求过来访问第一个server，第二个请求来访问第二个server，依次轮着
upstream webname {
    server 192.168.0.1:8080;
    server 192.168.0.2:8080;
}

# weight：权重大的被访问的概率就大，访问2次server1，访问一次server2
upstream webname {
    server 192.168.0.1:8080 weight 2;
    server 192.168.0.2:8080 weight 1;
}

# ip_hash：同一个ip过来的都会到同一台server上
upstream webname {
    ip_hash;
    server 192.168.0.1:8080;
    server 192.168.0.2:8080;
}

# 设置某一个节点为backup，那么一般情况下所有请求都访问server1，当server1挂掉或者忙的的时候才会访问server2。设置某个节点为down，那么这个server不参与负载
upstream webname {
    server 192.168.0.1:8080;
    server 192.168.0.2:8080 backup;
    server 192.168.0.3:8080 down;
}
server{
    listen 80;
    server_name webname;
    location / {
        proxy_pass http://webname;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 常用配置
### vue-router history模式的问题
```bash
location / {
    try_files $uri $uri/ /index.html;
}
```
### mp4视频播放匹配
```bash
location ~* \.mp4$ {
    root D:\test\video; #这里是你的视频的存放目录
}
```
### 禁止文件缓存
```bash
location ~* \.(js|css|png|jpg|gif)$ {
    add_header Cache-Control no-store;
}
```
### 静态文件压缩
```bash
server {
    # 开启gzip 压缩
    gzip on;
    # 设置gzip所需的http协议最低版本 （HTTP/1.1, HTTP/1.0）
    gzip_http_version 1.1;
    # 设置压缩级别，压缩级别越高压缩时间越长  （1-9）
    gzip_comp_level 4;
    # 设置压缩的最小字节数， 页面Content-Length获取
    gzip_min_length 1000;
    # 设置压缩文件的类型  （text/html)
    gzip_types text/plain application/javascript text/css;
}
```
### 指定定错误页面
```bash
# 根据状态码，返回对于的错误页面
error_page 500 502 503 504 /50x.html;
location = /50x.html {
    root /source/error_page;
}
```
### nginx解决跨域的原理
```bash
server {
    listen    8080;
    server_name www.qiujune.top

    ##  用户访问 http://www.qiujune.top，则反向代理到 https://www.baidu.com;
    location / {
        proxy_pass  https://www.baidu.com;
        proxy_redirect     off;
        proxy_set_header   Host             $host;        # 传递域名
        proxy_set_header   X-Real-IP        $remote_addr; # 传递ip
        proxy_set_header   X-Scheme         $scheme;      # 传递协议
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
    }
}
```

[参考](https://www.cnblogs.com/dreamanddead/p/how-uri-match-location-rule-in-nginx.html)