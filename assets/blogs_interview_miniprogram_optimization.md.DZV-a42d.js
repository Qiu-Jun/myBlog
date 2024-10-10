import{j as a,b as i,c as t,aa as l,aL as e,aM as o}from"./chunks/framework.AdhoujnV.js";const b=JSON.parse('{"title":"说说提高微信小程序的应用速度的手段有哪些？","description":"","frontmatter":{"title":"说说提高微信小程序的应用速度的手段有哪些？","date":"2022-01-20T00:00:00.000Z","categories":["前端","小程序"],"tags":["前端","小程序"],"publish":false},"headers":[],"relativePath":"blogs/interview/miniprogram/optimization.md","filePath":"blogs/interview/miniprogram/optimization.md","lastUpdated":1728576684000}'),r={name:"blogs/interview/miniprogram/optimization.md"},s=l('<h2 id="小程序启动" tabindex="-1">小程序启动 <a class="header-anchor" href="#小程序启动" aria-label="Permalink to &quot;小程序启动&quot;">​</a></h2><p>小程序首次启动前，微信会在小程序启动前为小程序准备好通用的运行环境，如运行中的线程和一些基础库的初始化 然后才开始进入启动状态，展示一个固定的启动界面，界面内包含小程序的图标、名称和加载提示图标。此时，微信会在背后完成几项工作：</p><ul><li>下载小程序代码包</li><li>加载小程序代码包</li><li>初始化小程序首页</li></ul><p>下载到的小程序代码包不是小程序的源代码，而是编译、压缩、打包之后的代码包 整体流程如下图：</p><p><img src="'+e+'" alt=""></p><h2 id="优化手段" tabindex="-1">优化手段 <a class="header-anchor" href="#优化手段" aria-label="Permalink to &quot;优化手段&quot;">​</a></h2><p>围绕上图小程序的启动流程， 我们可以从加载、渲染两个纬度进行切入：</p><h4 id="加载" tabindex="-1">加载 <a class="header-anchor" href="#加载" aria-label="Permalink to &quot;加载&quot;">​</a></h4><p>提升体验最直接的方法是控制小程序包的大小，常见手段有如下：</p><ul><li>代码包的体积压缩可以通过勾选开发者工具中“上传代码时，压缩代码”选项</li><li>及时清理无用的代码和资源文件</li><li>减少资源包中的图片等资源的数量和大小（理论上除了小icon，其他图片资源从网络下载），图片资源压缩率有限</li></ul><p>并且可以采取分包加载的操作，将用户访问率高的页面放在主包里，将访问率低的页面放入子包里，按需加载</p><p>当用户点击到子包的目录时，还是有一个代码包下载的过程，这会感觉到明显的卡顿，所以子包也不建议拆的太大，当然我们可以采用子包预加载技术，并不需要等到用户点击到子包页面后在下载子包</p><p><img src="'+o+'" alt=""></p><h4 id="渲染" tabindex="-1">渲染 <a class="header-anchor" href="#渲染" aria-label="Permalink to &quot;渲染&quot;">​</a></h4><ul><li>关于微信小程序首屏渲染优化的手段如下： <ul><li>请求可以在页面onLoad就加载，不需要等页面ready后在异步请求数据</li><li>尽量减少不必要的https请求，可使用 getStorageSync() 及 setStorageSync() 方法将数据存储在本地</li><li>可以在前置页面将一些有用的字段带到当前页，进行首次渲染（列表页的某些数据--&gt; 详情页），没有数据的模块可以进行骨架屏的占位</li></ul></li><li>在微信小程序中，提高页面的多次渲染效率主要在于正确使用<code>setData</code>： <ul><li>不要过于频繁调用setData，应考虑将多次setData合并成一次setData调用</li><li>数据通信的性能与数据量正相关，因而如果有一些数据字段不在界面中展示且数据结构比较复杂或包含长字符串，则不应使用<code>setData</code>来设置这些数据</li><li>与界面渲染无关的数据最好不要设置在data中，可以考虑设置在page对象的其他字段下</li></ul></li><li>对于一些独立的模块我们尽可能抽离出来，这是因为自定义组件的更新并不会影响页面上其他元素的更新</li><li>各个组件也将具有各自独立的逻辑空间。每个组件都分别拥有自己的独立的数据、<code>setData</code>调用</li></ul><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p><strong>小程序启动加载性能</strong>：</p><ul><li>控制代码包的大小</li><li>分包加载</li><li>首屏体验（预请求，利用缓存，避免白屏，及时反馈</li></ul><p><strong>小程序渲染性能</strong>：</p><ul><li>避免不当的使用setData</li><li>使用自定义组件</li></ul>',20),n=[s];function p(c,d,h,u,_,m){return i(),t("div",null,n)}const f=a(r,[["render",p]]);export{b as __pageData,f as default};
