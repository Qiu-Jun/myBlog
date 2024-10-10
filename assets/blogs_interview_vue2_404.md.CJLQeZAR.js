import{j as i,b as a,c as n,a7 as e}from"./chunks/framework.DyWoERse.js";const r=JSON.parse('{"title":"你是怎么处理vue项目中的错误的？","description":"","frontmatter":{"title":"你是怎么处理vue项目中的错误的？","date":"2022-02-03 08:00:00","categories":["前端","Vue"],"tags":["前端","Vue"],"publish":false},"headers":[],"relativePath":"blogs/interview/vue2/404.md","filePath":"blogs/interview/vue2/404.md","lastUpdated":1728575878000}'),p={name:"blogs/interview/vue2/404.md"};function h(t,s,l,k,d,o){return a(),n("div",null,s[0]||(s[0]=[e(`<h2 id="如何部署" tabindex="-1">如何部署 <a class="header-anchor" href="#如何部署" aria-label="Permalink to &quot;如何部署&quot;">​</a></h2><p>前后端分离开发模式下，前后端是独立布署的，前端只需要将最后的构建物上传至目标服务器的<code>web</code>容器指定的静态目录下即可</p><p>我们知道<code>vue</code>项目在构建后，是生成一系列的静态文件</p><p>常规布署我们只需要将这个目录上传至目标服务器即可</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> scp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 上传</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> user为主机登录用户，host为主机外网ip,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xx为web容器静态资源路径</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">scp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dist.zip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> user@host:/xx/xx/xx</span></span></code></pre></div><p>让<code>web</code>容器跑起来，以<code>nginx</code>为例</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  listen</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  80</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  server_name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  www.xxx.com</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  location</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    index</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  /data/dist/index.html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>配置完成记得重启<code>nginx</code></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 检查配置是否正确</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nginx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 平滑重启</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nginx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> reload</span></span></code></pre></div><p>操作完后就可以在浏览器输入域名进行访问了</p><p>当然上面只是提到最简单也是最直接的一种布署方式</p><p>什么自动化，镜像，容器，流水线布署，本质也是将这套逻辑抽象，隔离，用程序来代替重复性的劳动，本文不展开</p><h2 id="_404问题" tabindex="-1">404问题 <a class="header-anchor" href="#_404问题" aria-label="Permalink to &quot;404问题&quot;">​</a></h2><p>这是一个经典的问题，相信很多同学都有遇到过，那么你知道其真正的原因吗？</p><p>我们先还原一下场景：</p><ul><li><code>vue</code>项目在本地时运行正常，但部署到服务器中，刷新页面，出现了404错误</li></ul><p>先定位一下，HTTP 404 错误意味着链接指向的资源不存在</p><p>问题在于为什么不存在？且为什么只有<code>history</code>模式下会出现这个问题？</p><h3 id="为什么history模式下有问题" tabindex="-1">为什么history模式下有问题 <a class="header-anchor" href="#为什么history模式下有问题" aria-label="Permalink to &quot;为什么history模式下有问题&quot;">​</a></h3><p><code>Vue</code>是属于单页应用（single-page application）</p><p>而<code>SPA</code>是一种网络应用程序或网站的模型，所有用户交互是通过动态重写当前页面，前面我们也看到了，不管我们应用有多少页面，构建物都只会产出一个<code>index.html</code></p><p>现在，我们回头来看一下我们的<code>nginx</code>配置</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">server {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  listen  </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">80</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  server_name  www.xxx.com;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  location </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    index  </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">data</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dist</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">index.html;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>可以根据 <code>nginx</code> 配置得出，当我们在地址栏输入 <code>www.xxx.com</code> 时，这时会打开我们 <code>dist</code> 目录下的 <code>index.html</code> 文件，然后我们在跳转路由进入到 <code>www.xxx.com/login</code></p><p>关键在这里，当我们在 <code>website.com/login</code> 页执行刷新操作，<code>nginx location</code> 是没有相关配置的，所以就会出现 404 的情况</p><h3 id="为什么hash模式下没有问题" tabindex="-1">为什么hash模式下没有问题 <a class="header-anchor" href="#为什么hash模式下没有问题" aria-label="Permalink to &quot;为什么hash模式下没有问题&quot;">​</a></h3><p><code>router hash</code> 模式我们都知道是用符号#表示的，如 <code>website.com/#/login</code>, <code>hash</code> 的值为 <code>#/login</code></p><p>它的特点在于：<code>hash</code> 虽然出现在 <code>URL</code> 中，但不会被包括在 <code>HTTP</code> 请求中，对服务端完全没有影响，因此改变 <code>hash</code> 不会重新加载页面</p><p><code>hash</code> 模式下，仅 <code>hash</code> 符号之前的内容会被包含在请求中，如 <code>website.com/#/login</code> 只有 <code>website.com</code> 会被包含在请求中 ，因此对于服务端来说，即使没有配置<code>location</code>，也不会返回404错误</p><h2 id="解决方案" tabindex="-1">解决方案 <a class="header-anchor" href="#解决方案" aria-label="Permalink to &quot;解决方案&quot;">​</a></h2><p>看到这里我相信大部分同学都能想到怎么解决问题了，</p><p>产生问题的本质是因为我们的路由是通过JS来执行视图切换的，</p><p>当我们进入到子路由时刷新页面，<code>web</code>容器没有相对应的页面此时会出现404</p><p>所以我们只需要配置将任意页面都重定向到 <code>index.html</code>，把路由交由前端处理</p><p>对<code>nginx</code>配置文件<code>.conf</code>修改，添加<code>try_files $uri $uri/ /index.html;</code></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  listen</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  80</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  server_name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  www.xxx.com</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  location</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    index</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  /data/dist/index.html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    try_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $uri $uri</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /index.html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>修改完配置文件后记得配置的更新</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nginx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> reload</span></span></code></pre></div><p>这么做以后，你的服务器就不再返回 404 错误页面，因为对于所有路径都会返回 <code>index.html</code> 文件</p><p>为了避免这种情况，你应该在 <code>Vue</code> 应用里面覆盖所有的路由情况，然后在给出一个 404 页面</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> router</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> VueRouter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  mode: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;history&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  routes: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    { path: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;*&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, component: NotFoundComponent }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><p>关于后端配置方案还有：<code>Apache</code>、<code>nodejs</code>等，思想是一致的，这里就不展开述说了</p><h2 id="参考文献" tabindex="-1">参考文献 <a class="header-anchor" href="#参考文献" aria-label="Permalink to &quot;参考文献&quot;">​</a></h2><ul><li><a href="https://juejin.cn/post/6844903872637632525" target="_blank" rel="noreferrer">https://juejin.cn/post/6844903872637632525</a></li><li><a href="https://vue-js.com/topic/5f8cf91d96b2cb0032c385c0" target="_blank" rel="noreferrer">https://vue-js.com/topic/5f8cf91d96b2cb0032c385c0</a></li></ul>`,44)]))}const E=i(p,[["render",h]]);export{r as __pageData,E as default};
