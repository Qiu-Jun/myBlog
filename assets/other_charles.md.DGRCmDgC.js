import{j as i,b as e,c as t,a7 as r}from"./chunks/framework.DyWoERse.js";const a="/blog_build/imgs/other/charles/proxy_setting.png",o="/blog_build/imgs/other/charles/proxy_mobile1.jpeg",s="/blog_build/imgs/other/charles/proxy_mobile2.jpeg",c="/blog_build/imgs/other/charles/proxy_charles_ca.jpg",h="/blog_build/imgs/other/charles/proxy_charles_ssl.jpg",p="/blog_build/imgs/other/charles/proxy_mobile_download.jpeg",n="/blog_build/imgs/other/charles/proxy_setting_desc_install.jpeg",g="/blog_build/imgs/other/charles/proxy_mobile_cer_open.jpeg",P=JSON.parse('{"title":"charles(v4.6.2)抓包配置(Mac)","description":"","frontmatter":{"title":"charles(v4.6.2)抓包配置(Mac)","date":"2023-02-05 23:30:00","sidebar":true,"categories":["其他"],"publish":true},"headers":[],"relativePath":"other/charles.md","filePath":"other/charles.md","lastUpdated":1728575878000}'),_={name:"other/charles.md"};function m(d,l,u,b,x,f){return e(),t("div",null,l[0]||(l[0]=[r('<h3 id="配置代理" tabindex="-1">配置代理 <a class="header-anchor" href="#配置代理" aria-label="Permalink to &quot;配置代理&quot;">​</a></h3><p>菜单栏Proxy&gt;Proxy Settings配置 <img src="'+a+'" alt=""></p><p>打开任意网页，这时候就可以在charles看到代理了(但此时只有http是正常的，https需要完成下面的ssl配置)</p><h3 id="获取本地的ip" tabindex="-1">获取本地的ip <a class="header-anchor" href="#获取本地的ip" aria-label="Permalink to &quot;获取本地的ip&quot;">​</a></h3><ul><li>terminal.app <ul><li>通过终端输入命令ifconfig可以查看</li></ul></li><li>charles <ul><li>菜单栏Help&gt;Local IP Address</li></ul></li></ul><h3 id="手机代理" tabindex="-1">手机代理 <a class="header-anchor" href="#手机代理" aria-label="Permalink to &quot;手机代理&quot;">​</a></h3><ul><li>把手机连接到同个局域网</li><li>找到wifi设置 <img src="'+o+'" alt=""></li><li>找到http代理如下配置 <img src="'+s+'" alt=""></li><li>手机打开应用可以看到代理的请求了(但此时只有http是正常的，https需要完成下面的ssl配置)</li></ul><h3 id="ssl配置" tabindex="-1">SSL配置 <a class="header-anchor" href="#ssl配置" aria-label="Permalink to &quot;SSL配置&quot;">​</a></h3><ul><li>pc端 <ul><li>菜单栏Help&gt;SSL Proxying&gt;install Charles Root Certificate</li><li>安装完后在钥匙串访问找到charles proxy的证书双击查看，在信任下按如下设置 <img src="'+c+'" alt=""></li><li>然后在菜单栏Proxy&gt;SSL Proxying Settings配置,add把host和port都设置为*(所有的) <img src="'+h+'" alt=""></li><li>pc端代理完成</li></ul></li><li>mobile(IPhone) <ul><li>菜单栏Help&gt;SSL Proxying&gt;install Charles Root Certificate on a Mobile Device or Remote Browser</li><li>用Safari访问<code>http://chls.pro/ssl</code>,出现如下图片选择允许 <img src="'+p+'" alt=""></li><li>在iphone设置中查看已下载的描述文件安装 <img src="'+n+'" alt=""></li><li>安装完之后在关于本机找到证书信任设置，把Charles Proxy打开 <ul><li><img src="'+g+'" alt=""></li></ul></li><li>mobile代理配置完成</li></ul></li></ul>',9)]))}const S=i(_,[["render",m]]);export{P as __pageData,S as default};
