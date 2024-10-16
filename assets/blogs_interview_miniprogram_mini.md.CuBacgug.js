import{_ as e,o as i,c as o,a6 as l}from"./chunks/framework.Bna9RZrE.js";const h=JSON.parse('{"title":"说说你对微信小程序的理解？优缺点？","description":"","frontmatter":{"title":"说说你对微信小程序的理解？优缺点？","date":"2022-01-20T00:00:00.000Z","categories":["前端","小程序"],"tags":["前端","小程序"],"publish":false},"headers":[],"relativePath":"blogs/interview/miniprogram/mini.md","filePath":"blogs/interview/miniprogram/mini.md","lastUpdated":1729084366000}'),a={name:"blogs/interview/miniprogram/mini.md"},c=l('<h2 id="小程序是什么" tabindex="-1">小程序是什么？ <a class="header-anchor" href="#小程序是什么" aria-label="Permalink to &quot;小程序是什么？&quot;">​</a></h2><p>小程序是一种不需要下载安装即可使用的应用，它实现了应用“触手可及”的梦想，用户扫一扫或者搜一下即可打开应用 也体现了“用完即走”的理念，用户不用关心是否安装太多应用的问题。应用将无处不在，随时可用，但又无需安装卸载 注意的是，除了微信小程序，还有百度小程序、微信小程序、支付宝小程序、抖音小程序，都是每个平台自己开发的，都是有针对性平台的应用程序</p><p>⼩程序并⾮凭空冒出来的⼀个概念，当微信中的 <code>WebView</code> 逐渐成为移动 <code>Web</code>的⼀个重要⼊⼝时，微信就有相关的 <code>JS-SDK</code></p><p><code>JS-SDK</code> 解决了移动⽹⻚能⼒不⾜的问题，通过暴露微信的接⼝使得 <code>Web</code> 开发者能够拥有更多的能⼒，然⽽在更多的能⼒之外，<code>JS-SDK</code>的模式并没有解决使⽤移动⽹⻚遇到的体验不良的问题</p><p>因此需要设计⼀个⽐较好的系统，使得所有开发者在微信中都能获得⽐较好的体验：</p><ul><li>快速的加载</li><li>更强⼤的能⼒</li><li>原⽣的体验</li><li>易⽤且安全的微信数据开放</li><li>⾼效和简单的开发</li></ul><p>这些是<code>JS-SDK</code>做不到的，需要设计一个全新的小程序系统</p><p>对于小程序的开发，提供一个简单、高效的应用开发框架和丰富的组件及<code>API</code>，帮助开发者开发出具有原生体验的服务</p><p>其中相比<code>H5</code>，小程序与其的区别有如下：</p><ul><li>运⾏环境：⼩程序基于浏览器内核重构的内置解析器</li><li>系统权限：⼩程序能获得更多的系统权限，如⽹络通信状态、数据缓存能⼒等</li><li>渲染机制：⼩程序的逻辑层和渲染层是分开的</li></ul><p>小程序可以视为只能用微信打开和浏览的<code>H5</code>，小程序和网页的技术模型是一样的，用到的 <code>JavaScript</code> 语言和 <code>CSS</code> 样式也是一样的，只是网页的 <code>HTML</code> 标签被稍微修改成了 <code>WXML</code> 标签</p><p>因此可以说，小程序页面本质上就是网页</p><h2 id="优缺点" tabindex="-1">优缺点 <a class="header-anchor" href="#优缺点" aria-label="Permalink to &quot;优缺点&quot;">​</a></h2><p>优点：</p><ul><li>随搜随用，用完即走：使得小程序可以代替许多APP，或是做APP的整体嫁接，或是作为阉割版功能的承载体</li><li>流量大，易接受：小程序借助自身平台更加容易引入更多的流量</li><li>安全</li><li>开发门槛低</li><li>降低兼容性限制</li></ul><p>缺点：</p><ul><li>用户留存：及相关数据显示，小程序的平均次日留存在13%左右，但是双周留存骤降到仅有1%</li><li>体积限制：微信小程序只有2M的大小，这样导致无法开发大型一些的小程序</li><li>受控微信：比起APP，尤其是安卓版的高自由度，小程序要面对很多来自微信的限制，从功能接口，甚至到类别内容，都要接受微信的管控</li></ul>',17),d=[c];function t(r,p,n,s,_,m){return i(),o("div",{"data-pagefind-body":!0},d)}const S=e(a,[["render",t]]);export{h as __pageData,S as default};