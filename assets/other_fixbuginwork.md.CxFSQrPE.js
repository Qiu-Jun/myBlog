import{_ as o,c as a,o as t,a5 as l}from"./chunks/framework.PZKd_Vnq.js";const d="/myBlog/imgs/other/other1.jpeg",c="/myBlog/imgs/other/other2.png",b=JSON.parse('{"title":"如何解决工作上第三方库无法满足工作需求的问题","description":"","frontmatter":{"title":"如何解决工作上第三方库无法满足工作需求的问题","date":"2022-09-17 12:26:59","sidebar":true,"categories":["其他"],"tags":["其他"],"publish":true},"headers":[],"relativePath":"other/fixbuginwork.md","filePath":"other/fixbuginwork.md","lastUpdated":1740981322000}'),i={name:"other/fixbuginwork.md"};function r(s,e,u,n,m,g){return t(),a("div",{"data-pagefind-body":!0},e[0]||(e[0]=[l('<div class="tip custom-block"><p class="custom-block-title">TIP</p><p>工作中，经常会遇到一些第三方库很符合业务，但又无法满足一些特殊的需求，重新去写一个完全符合业务要求的库又太浪费时间.下面我通过最近工作中遇到的问题举例如何解决</p></div><h2 id="解决问题的方法" tabindex="-1">解决问题的方法 <a class="header-anchor" href="#解决问题的方法" aria-label="Permalink to &quot;解决问题的方法&quot;">​</a></h2><ul><li>patch-package(推荐，但是这里不用这个方法)</li><li>第三方库满足日常需求，并且需要在此基础上扩展，自行维护。思考特殊需求是否能够实现，能实现而第三方库又很符合，那么就把第三方库源码clone下来分析和实践</li></ul><h2 id="举例" tabindex="-1">举例 <a class="header-anchor" href="#举例" aria-label="Permalink to &quot;举例&quot;">​</a></h2><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>问题描述：最近公司有拖拽相关的业务，用到的技术的<code>vuedraggable</code>,但是vuedraggble这个组件库无法实现ui设计图的一些细节效果，如下图，拖拽时，跟随随便的dom的width无法减小。尝试了设置fallbackClass，但是当我把宽度缩小时那么就可能会错位<br><img src="'+d+'" alt=""></p></div><ul><li>思考：只要我拿到鼠标按下时的坐标，和那个跟随鼠标拖动的dom的宽度就可以处理好这个问题,这个dom的x坐标(这个坐标从父元素开始计算) = 鼠标按下时的x坐标 - <code>vuedraggable</code>这个dom距离浏览器左边的距离 - 跟随鼠标拖动的dom的宽度(为了方便直接传参到<code>vuedraggable</code>，<code>vuedraggable</code>在实例化<code>sortable</code>时把参数带入)的一半</li><li>尝试<code>vuedraggble</code>配置无果后，我决定把<code>vuedraggle</code>clone到本地</li><li>看了一下<code>vuedraggle</code>这个库的源码基于<code>sortable</code>这个拖拽库</li><li>然后我又把<code>sortable</code>这个库clone下来</li><li>因为问题定位在坐标错误，所以我直接把问题定位在鼠标按下事件，直接搜索<code>mousedown</code>，找到<code>_onTapStart</code>方法，我打印了<code>fallbackOffset</code>的x坐标，发现这个坐标的x的0，不是距离浏览器左边的距离，父元素开始算</li><li>于是我想只要拿到这个距离父元素的距离 - 跟随鼠标拖动的dom的宽度，那么就可以实现了</li><li>问题解决，为了方便你可以自己搭建私有仓库，也可以直接放源代码文件在项目直接用</li></ul><p><img src="'+c+'" alt=""></p><details class="details custom-block"><summary>总结</summary><p>遇到解决不了的问题，不要急着说实现不了，这样会让你在领导眼里减分。可以先看看库的源码，在学习大佬代码的同时解决问题。</p></details>',8)]))}const _=o(i,[["render",r]]);export{b as __pageData,_ as default};
