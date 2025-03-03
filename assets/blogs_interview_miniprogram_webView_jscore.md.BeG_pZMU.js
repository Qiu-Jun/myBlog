import{_ as i,c as a,o,a5 as t}from"./chunks/framework.PZKd_Vnq.js";const r="/myBlog/imgs/interview/4e322e50-3722-11ec-8e64-91fdec0f05a1.png",l="/myBlog/imgs/interview/5948ed10-3722-11ec-a752-75723a64e8f5.png",p="/myBlog/imgs/interview/61f9f670-3722-11ec-a752-75723a64e8f5.png",c="/myBlog/imgs/interview/6cb798b0-3722-11ec-a752-75723a64e8f5.png",s="/myBlog/imgs/interview/968c8510-3722-11ec-a752-75723a64e8f5.png",f=JSON.parse('{"title":"说说微信小程序的实现原理？","description":"","frontmatter":{"title":"说说微信小程序的实现原理？","date":"2022-01-20T00:00:00.000Z","categories":["前端","小程序"],"tags":["前端","小程序"],"publish":false},"headers":[],"relativePath":"blogs/interview/miniprogram/webView_jscore.md","filePath":"blogs/interview/miniprogram/webView_jscore.md","lastUpdated":1740981322000}'),n={name:"blogs/interview/miniprogram/webView_jscore.md"};function d(m,e,_,g,b,u){return o(),a("div",{"data-pagefind-body":!0},e[0]||(e[0]=[t('<h2 id="原理" tabindex="-1">原理 <a class="header-anchor" href="#原理" aria-label="Permalink to &quot;原理&quot;">​</a></h2><p>网页开发，渲染线程和脚本是互斥的，这也是为什么长时间的脚本运行可能会导致页面失去响应的原因，本质就是我们常说的 <code>JS</code> 是单线程的 而在小程序中，选择了 <code>Hybrid</code> 的渲染方式，将视图层和逻辑层是分开的，双线程同时运行</p><p><img src="'+r+'" alt=""></p><ul><li>渲染层：界面渲染相关的任务全都在渲染层线程里执行 <ul><li>ios: WKWebview</li><li>安卓: 定制内核</li></ul></li><li>逻辑层：逻辑层线程运行JS脚本 <ul><li>ios：JSCore</li><li>安卓：V8</li></ul></li></ul><h2 id="通信" tabindex="-1">通信 <a class="header-anchor" href="#通信" aria-label="Permalink to &quot;通信&quot;">​</a></h2><p>小程序在渲染层，宿主环境会把<code>wxml</code>转化成对应的<code>JS</code>对象</p><p>在逻辑层发生数据变更的时候，通过宿主环境提供的<code>setData</code>方法把数据从逻辑层传递到渲染层，再经过对比前后差异，把差异应用在原来的<code>Dom</code>树上，渲染出正确的视图</p><p><img src="'+l+'" alt=""></p><p>当视图存在交互的时候，例如用户点击你界面上某个按钮，这类反馈应该通知给开发者的逻辑层，需要将对应的处理状态呈现给用户</p><p>对于事件的分发处理，微信进行了特殊的处理，将所有的事件拦截后，丢到逻辑层交给<code>JavaScript</code>进行处理</p><p><img src="'+p+'" alt=""></p><p>由于小程序是基于双线程的，也就是任何在视图层和逻辑层之间的数据传递都是线程间的通信，会有一定的延时，因此在小程序中，页面更新成了异步操作</p><p>异步会使得各部分的运行时序变得复杂一些，比如在渲染首屏的时候，逻辑层与渲染层会同时开始初始化工作，但是渲染层需要有逻辑层的数据才能把界面渲染出来</p><p>如果渲染层初始化工作较快完成，就要等逻辑层的指令才能进行下一步工作</p><p>因此逻辑层与渲染层需要有一定的机制保证时序正确，在每个小程序页面的生命周期中，存在着若干次页面数据通信</p><p><img src="'+c+'" alt=""></p><h2 id="运行机制" tabindex="-1">运行机制 <a class="header-anchor" href="#运行机制" aria-label="Permalink to &quot;运行机制&quot;">​</a></h2><p>小程序启动运行两种情况：</p><ul><li>冷启动（重新开始）：用户首次打开或者小程序被微信主动销毁后再次打开的情况，此时小程序需要重新加载启动，即为冷启动</li><li>热启动：用户已经打开过小程序，然后在一定时间内再次打开该小程序，此时无需重新启动，只需要将后台态的小程序切换到前台，这个过程就是热启动</li></ul><h4 id="需要注意" tabindex="-1">需要注意： <a class="header-anchor" href="#需要注意" aria-label="Permalink to &quot;需要注意：&quot;">​</a></h4><blockquote><p>1.小程序没有重启的概念<br> 2.当小程序进入后台，客户端会维持一段时间的运行状态，超过一定时间后会被微信主动销毁<br> 3.短时间内收到系统两次以上内存警告，也会对小程序进行销毁，这也就为什么一旦页面内存溢出，页面会奔溃的本质原因了</p></blockquote><p><img src="'+s+'" alt=""></p><p>开发者在后台发布新版本之后，无法立刻影响到所有现网用户，但最差情况下，也在发布之后 24 小时之内下发新版本信息到用户 每次冷启动时，都会检查是否有更新版本，如果发现有新版本，将会异步下载新版本的代码包，并同时用客户端本地的包进行启动，即新版本的小程序需要等下一次冷启动才会应用上</p>',23)]))}const w=i(n,[["render",d]]);export{f as __pageData,w as default};
