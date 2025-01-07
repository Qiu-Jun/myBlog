import{_ as s,o as i,c as a,a6 as n}from"./chunks/framework.Bna9RZrE.js";const g=JSON.parse('{"title":"Vue中组件和插件有什么区别?","description":"","frontmatter":{"title":"Vue中组件和插件有什么区别?","date":"2022-02-03T00:00:00.000Z","categories":["前端","Vue"],"tags":["前端","Vue"],"publish":false},"headers":[],"relativePath":"blogs/interview/vue2/components_plugin.md","filePath":"blogs/interview/vue2/components_plugin.md","lastUpdated":1736233490000}'),e={name:"blogs/interview/vue2/components_plugin.md"},l=n(`<h2 id="组件是什么" tabindex="-1">组件是什么 <a class="header-anchor" href="#组件是什么" aria-label="Permalink to &quot;组件是什么&quot;">​</a></h2><p>回顾以前对组件的定义：</p><p>组件就是把图形、非图形的各种逻辑均抽象为一个统一的概念（组件）来实现开发的模式，在<code>Vue</code>中每一个<code>.vue</code>文件都可以视为一个组件</p><p>组件的优势</p><ul><li><p>降低整个系统的耦合度，在保持接口不变的情况下，我们可以替换不同的组件快速完成需求，例如输入框，可以替换为日历、时间、范围等组件作具体的实现</p></li><li><p>调试方便，由于整个系统是通过组件组合起来的，在出现问题的时候，可以用排除法直接移除组件，或者根据报错的组件快速定位问题，之所以能够快速定位，是因为每个组件之间低耦合，职责单一，所以逻辑会比分析整个系统要简单</p></li><li><p>提高可维护性，由于每个组件的职责单一，并且组件在系统中是被复用的，所以对代码进行优化可获得系统的整体升级</p></li></ul><h2 id="插件是什么" tabindex="-1">插件是什么 <a class="header-anchor" href="#插件是什么" aria-label="Permalink to &quot;插件是什么&quot;">​</a></h2><p>插件通常用来为 <code>Vue</code> 添加全局功能。插件的功能范围没有严格的限制——一般有下面几种：</p><ul><li>添加全局方法或者属性。如: <code>vue-custom-element</code></li><li>添加全局资源：指令/过滤器/过渡等。如 <code>vue-touch</code></li><li>通过全局混入来添加一些组件选项。如<code> vue-router</code></li><li>添加 <code>Vue</code> 实例方法，通过把它们添加到 <code>Vue.prototype</code> 上实现。</li><li>一个库，提供自己的 <code>API</code>，同时提供上面提到的一个或多个功能。如<code> vue-router</code></li></ul><h2 id="两者的区别" tabindex="-1">两者的区别 <a class="header-anchor" href="#两者的区别" aria-label="Permalink to &quot;两者的区别&quot;">​</a></h2><p>两者的区别主要表现在以下几个方面：</p><ul><li>编写形式</li><li>注册形式</li><li>使用场景</li></ul><h3 id="编写形式" tabindex="-1">编写形式 <a class="header-anchor" href="#编写形式" aria-label="Permalink to &quot;编写形式&quot;">​</a></h3><h4 id="编写组件" tabindex="-1">编写组件 <a class="header-anchor" href="#编写组件" aria-label="Permalink to &quot;编写组件&quot;">​</a></h4><p>编写一个组件，可以有很多方式，我们最常见的就是<code>vue</code>单文件的这种格式，每一个<code>.vue</code>文件我们都可以看成是一个组件</p><p><code>vue</code>文件标准格式</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{ </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>我们还可以通过<code>template</code>属性来编写一个组件，如果组件内容多，我们可以在外部定义<code>template</code>组件内容，如果组件内容并不多，我们可直接写在<code>template</code>属性上</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;testComponent&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;     // 组件显示的内容</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;component!&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;   </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Vue.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">component</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;componentA&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,{ </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    template: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;#testComponent&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    template: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`&lt;div&gt;component&lt;/div&gt;\`</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 组件内容少可以通过这种形式</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><h4 id="编写插件" tabindex="-1">编写插件 <a class="header-anchor" href="#编写插件" aria-label="Permalink to &quot;编写插件&quot;">​</a></h4><p><code>vue</code>插件的实现应该暴露一个 <code>install</code> 方法。这个方法的第一个参数是 <code>Vue</code> 构造器，第二个参数是一个可选的选项对象</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">MyPlugin.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">install</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">Vue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">options</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 1. 添加全局方法或 property</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Vue.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">myGlobalMethod</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 逻辑...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 2. 添加全局资源</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Vue.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">directive</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;my-directive&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    bind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">el</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">binding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">vnode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">oldVnode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 逻辑...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 3. 注入组件选项</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Vue.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mixin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    created</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 逻辑...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 4. 添加实例方法</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  Vue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">prototype</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$myMethod</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">methodOptions</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 逻辑...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="注册形式" tabindex="-1">注册形式 <a class="header-anchor" href="#注册形式" aria-label="Permalink to &quot;注册形式&quot;">​</a></h3><h4 id="组件注册" tabindex="-1">组件注册 <a class="header-anchor" href="#组件注册" aria-label="Permalink to &quot;组件注册&quot;">​</a></h4><p><code>vue</code>组件注册主要分为全局注册与局部注册</p><p>全局注册通过<code>Vue.component</code>方法，第一个参数为组件的名称，第二个参数为传入的配置项</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Vue.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">component</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;my-component-name&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, { </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* ... */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> })</span></span></code></pre></div><p>局部注册只需在用到的地方通过<code>components</code>属性注册一个组件</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> component1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 定义一个组件</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	components:{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		component1   </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 局部注册</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h4 id="插件注册" tabindex="-1">插件注册 <a class="header-anchor" href="#插件注册" aria-label="Permalink to &quot;插件注册&quot;">​</a></h4><p>插件的注册通过<code>Vue.use()</code>的方式进行注册（安装），第一个参数为插件的名字，第二个参数是可选择的配置项</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Vue.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">use</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(插件名字,{ </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* ... */</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} )</span></span></code></pre></div><p>注意的是：</p><p>注册插件的时候，需要在调用 <code>new Vue()</code> 启动应用之前完成</p><p><code>Vue.use</code>会自动阻止多次注册相同插件，只会注册一次</p><h3 id="使用场景" tabindex="-1">使用场景 <a class="header-anchor" href="#使用场景" aria-label="Permalink to &quot;使用场景&quot;">​</a></h3><p>具体的其实在插件是什么章节已经表述了，这里在总结一下</p><p>组件 <code>(Component)</code> 是用来构成你的 <code>App</code> 的业务模块，它的目标是 <code>App.vue</code></p><p>插件 <code>(Plugin)</code> 是用来增强你的技术栈的功能模块，它的目标是 <code>Vue</code> 本身</p><p>简单来说，插件就是指对<code>Vue</code>的功能的增强或补充</p><h2 id="参考文献" tabindex="-1">参考文献 <a class="header-anchor" href="#参考文献" aria-label="Permalink to &quot;参考文献&quot;">​</a></h2><ul><li><a href="https://vue3js.cn/docs/zh" target="_blank" rel="noreferrer">https://vue3js.cn/docs/zh</a></li></ul>`,41),t=[l];function p(h,k,d,E,r,o){return i(),a("div",{"data-pagefind-body":!0},t)}const y=s(e,[["render",p]]);export{g as __pageData,y as default};