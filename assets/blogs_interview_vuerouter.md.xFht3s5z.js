import{j as i,b as a,c as n,a7 as t}from"./chunks/framework.DyWoERse.js";const o=JSON.parse('{"title":"Vue面试题——Vue Router","description":"","frontmatter":{"title":"Vue面试题——Vue Router","date":"2022-03-20 16:00:00","sidebar":true,"categories":["前端","Vue"],"tags":["Vue"],"publish":false},"headers":[],"relativePath":"blogs/interview/vuerouter.md","filePath":"blogs/interview/vuerouter.md","lastUpdated":1728575878000}'),e={name:"blogs/interview/vuerouter.md"};function l(h,s,p,k,r,d){return a(),n("div",null,s[0]||(s[0]=[t(`<h2 id="路由有几种模式-说说它们的区别" tabindex="-1">路由有几种模式？说说它们的区别？ <a class="header-anchor" href="#路由有几种模式-说说它们的区别" aria-label="Permalink to &quot;路由有几种模式？说说它们的区别？&quot;">​</a></h2><ul><li><code>hash</code>: 兼容所有浏览器，包括不支持<code>HTML5 History Api</code>的浏览器，例<a href="http://www.abc.com/#/index%EF%BC%8Chash%E5%80%BC%E4%B8%BA#/index%EF%BC%8C" target="_blank" rel="noreferrer">http://www.abc.com/#/index，hash值为#/index，</a> hash的改变会触发<code>hashchange</code>事件，通过监听<code>hashchange</code>事件来完成操作实现前端路由。<code>hash</code>值变化不会让浏览器向服务器请求</li></ul><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 监听hash变化，点击浏览器的前进后退会触发</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;hashchange&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">event</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">){ </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> newURL </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> event.newURL; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// hash 改变后的新 url</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> oldURL </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> event.oldURL; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// hash 改变前的旧 url</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">},</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><ul><li><code>history</code>：兼容能支持<code>HTML5 History Api</code>的浏览器，依赖<code>HTML5 History API</code>来实现前端路由。没有#，路由地址跟正常的url一样，但是初次访问或者刷新都会向服务器请求，如果没有请求到对应的资源就会返回404，所以路由地址匹配不到任何静态资源，则应该返回同一个index.html 页面，需要在nginx中配置</li><li><code>abstract</code>: 支持所有<code>JavaScript</code>运行环境，如\`Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式</li></ul><h2 id="说说你对router-link的了解" tabindex="-1">说说你对router-link的了解 <a class="header-anchor" href="#说说你对router-link的了解" aria-label="Permalink to &quot;说说你对router-link的了解&quot;">​</a></h2><ul><li><code>&lt;router-link&gt;</code>是Vue-Router的内置组件，在具有路由功能的应用中作为声明式的导航使用</li><li><code>&lt;router-link&gt;</code>有8个props，其作用是： <ul><li><code>to</code>：必填，表示目标路由的链接。当被点击后，内部会立刻把to的值传到<code>router.push()</code>，所以这个值可以是一个字符串或者是描述目标位置的对象</li></ul><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">router-link</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;home&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;Home&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">router-link</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">router-link</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> :to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&#39;home&#39;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;Home&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">router-link</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">router-link</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> :to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{ path: &#39;home&#39; }&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;Home&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">router-link</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">router-link</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> :to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{ name: &#39;user&#39;, params: { userId: 123 }}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;User&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">router-link</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">router-link</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> :to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{ path: &#39;user&#39;, query: { userId: 123 }}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;User&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">router-link</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">&lt;!-- 注意path存在时params不起作用，只能用query --&gt;</span></span></code></pre></div><ul><li><code>replace</code>：默认值为false，若设置的话，当点击时，会调用<code>router.replace()</code>而不是<code>router.push()</code>，于是导航后不会留下<code>history</code>记录</li><li><code>append</code>：设置后，则在当前 (相对) 路径前添加基路径</li><li><code>tag</code>：让<code>&lt;router-link&gt;</code>渲染成tag设置的标签，如tag:&#39;li&#39;,渲染结果为<code>&lt;li&gt;foo&lt;/li&gt;</code></li><li><code>active-class</code>：默认值为<code>router-link-active</code>,设置链接激活时使用的CSS类名。默认值可以通过路由的构造选项<code>linkActiveClass</code>来全局配置</li><li><code>exact-active-class</code>：默认值为<code>router-link-exact-active</code>,设置链接被精确匹配的时候应该激活的<code>class</code>。默认值可以通过路由构造函数选项 <code>linkExactActiveClass</code>进行全局配置的</li><li><code>exact</code>：是否精确匹配，默认为false</li></ul><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">&lt;!-- 这个链接只会在地址为 / 的时候被激活 --&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">router-link</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> exact&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">router-link</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><ul><li><code>event</code>：声明可以用来触发导航的事件。可以是一个字符串或是一个包含字符串的数组，默认是click</li></ul></li></ul><h2 id="讲一下完整的导航守卫流程" tabindex="-1">讲一下完整的导航守卫流程 <a class="header-anchor" href="#讲一下完整的导航守卫流程" aria-label="Permalink to &quot;讲一下完整的导航守卫流程&quot;">​</a></h2><ul><li>导航被触发</li><li>在失活的组件里调用离开守卫<code>beforeRouteLeave(to,from,next)</code></li><li>调用全局的<code>beforeEach((to,from,next) =&gt; {})</code>守卫</li><li>在重用的组件里调用<code>beforeRouteUpdate(to,from,next)</code>守卫</li><li>在路由配置里调用<code>beforeEnter(to,from,next)</code>路由独享的守卫</li><li>解析异步路由组件</li><li>在被激活的组件里调用<code>beforeRouteEnter(to,from,next)</code></li><li>在所有组件内守卫和异步路由组件被解析之后调用全局的<code>beforeResolve((to,from,next) =&gt; {})</code>解析守卫</li><li>导航被确认</li><li>调用全局的<code>afterEach((to,from) =&gt; {})</code>钩子</li><li>触发<code>DOM</code>更新</li><li>用创建好的实例调用<code>beforeRouteEnter</code>守卫中传给<code>next</code>的回调函数</li></ul><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p><code>afterEach</code>钩子中不可以使用<code>next()</code></p></div><h2 id="讲一下导航守卫的三个参数的含义" tabindex="-1">讲一下导航守卫的三个参数的含义 <a class="header-anchor" href="#讲一下导航守卫的三个参数的含义" aria-label="Permalink to &quot;讲一下导航守卫的三个参数的含义&quot;">​</a></h2><ul><li><code>to</code>：即将要进入的目标路由对象</li><li><code>from</code>：当前导航正要离开的路由对象</li><li><code>next</code>：函数，必须调用，不然路由跳转不过去 <ul><li><code>next()</code>：进入下一个路由</li><li><code>next(false)</code>：中断当前的导航</li><li><code>next(&#39;/&#39;)或next({ path: &#39;/&#39; })</code>: 跳转到其他路由，当前导航被中断，进行新的一个导航</li></ul></li></ul><h2 id="全局导航守卫有哪些" tabindex="-1">全局导航守卫有哪些？ <a class="header-anchor" href="#全局导航守卫有哪些" aria-label="Permalink to &quot;全局导航守卫有哪些？&quot;">​</a></h2><ul><li><code>router.beforeEach</code>：全局前置守卫</li><li><code>router.beforeResolve</code>：全局解析守卫</li><li><code>router.afterEach</code>：全局后置钩子</li></ul><h2 id="什么是路由独享的守卫-怎么使用" tabindex="-1">什么是路由独享的守卫，怎么使用？ <a class="header-anchor" href="#什么是路由独享的守卫-怎么使用" aria-label="Permalink to &quot;什么是路由独享的守卫，怎么使用？&quot;">​</a></h2><p><em><strong>beforeEnter守卫</strong></em></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> router</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> VueRouter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    routes: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            path: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/test&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            component: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TEST</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            beforeEnter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">next</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><h2 id="在组件内使用的导航守卫有哪些-怎么使用" tabindex="-1">在组件内使用的导航守卫有哪些？怎么使用？ <a class="header-anchor" href="#在组件内使用的导航守卫有哪些-怎么使用" aria-label="Permalink to &quot;在组件内使用的导航守卫有哪些？怎么使用？&quot;">​</a></h2><ul><li><code>beforeRouteLeave</code>：在失活的组件里调用离开守卫</li><li><code>beforeRouteUpdate</code>：在重用的组件里调用,比如包含<code>&lt;router-view /&gt;</code>的组件</li><li><code>beforeRouteEnter</code>：在进入对应路由的组件创建前调用</li></ul><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">beforeRouteLeave</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(to, from, next) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">},</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">beforeRouteUpdate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(to, from, next) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">},</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">beforeRouteEnter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(to, from, next) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">},</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>在beforeRouteEnter导航守卫中不可以用this, 因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建<br> 可以通过传一个回调给next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">beforeRouteEnter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(to, from, next) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    next</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">vm</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(vm)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div></div><h2 id="怎么在组件中监听路由参数的变化" tabindex="-1">怎么在组件中监听路由参数的变化？ <a class="header-anchor" href="#怎么在组件中监听路由参数的变化" aria-label="Permalink to &quot;怎么在组件中监听路由参数的变化？&quot;">​</a></h2><p>有两种方法可以监听路由参数的变化，但是只能用在包含<code>&lt;router-view /&gt;</code>的组件内</p><ul><li>watch</li></ul><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">watch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &#39;$route&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(to, from) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        //这里监听</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><ul><li>beforeRouteUpdate</li></ul><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">beforeRouteUpdate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (to, from, next) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //这里监听</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="如何获取路由传过来的参数" tabindex="-1">如何获取路由传过来的参数？ <a class="header-anchor" href="#如何获取路由传过来的参数" aria-label="Permalink to &quot;如何获取路由传过来的参数？&quot;">​</a></h2><p>路由有三种传参方式，获取方式各不相同</p><ul><li><code>meta</code>：路由元信息，写在routes配置文件中</li></ul><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/home&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;home&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    component</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">load</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;home&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    meta</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;首页&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 获取方式\`this.$route.meta.title\`获取</span></span></code></pre></div><ul><li>query</li></ul><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.$route.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    path:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/home&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    query:{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        userId:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">123</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 浏览器地址：http://localhost:8036/home?userId=123 获取方式：this.$route.query.userId</span></span></code></pre></div><ul><li>params</li></ul><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/home/:userId&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;home&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    component</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">load</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;home&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    meta</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;首页&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.$router.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;home&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, params: { userId: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">123</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } })</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 注意用params传参，只能用命名的路由（用name访问），如果用path，params不起作用。 this.$router.push({ path: &#39;/home&#39;, params: { userId: 123 }})不生效</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 获取方式：this.$route.params.userId</span></span></code></pre></div><h2 id="如果vue-router使用history模式-部署时要注意什么" tabindex="-1">如果vue-router使用history模式，部署时要注意什么 <a class="header-anchor" href="#如果vue-router使用history模式-部署时要注意什么" aria-label="Permalink to &quot;如果vue-router使用history模式，部署时要注意什么&quot;">​</a></h2><p>要注意404的问题，因为在<code>history</code>模式下，只是动态的通过js操作<code>window.history</code>来改变浏览器地址栏里的路径，并没有发起http请求，当直接在浏览器里输入这个地址的时候，就一定要对服务器发起<code>http</code>请求，但是这个目标在服务器上又不存在，所以会返回404</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 在Ngnix中将所有请求都转发到index.html上</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">location</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    try_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  $uri $uri</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @router</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> index</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> index.html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">location</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @router</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    rewrite</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ^.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/index.html</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> last</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="route和router有什么区别" tabindex="-1">route和router有什么区别？ <a class="header-anchor" href="#route和router有什么区别" aria-label="Permalink to &quot;route和router有什么区别？&quot;">​</a></h2><p>route是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数。 而router是“路由实例对象”，包括了路由的跳转方法，钩子函数等</p><h2 id="vue路由怎么跳转打开新窗口" tabindex="-1">Vue路由怎么跳转打开新窗口？ <a class="header-anchor" href="#vue路由怎么跳转打开新窗口" aria-label="Permalink to &quot;Vue路由怎么跳转打开新窗口？&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> obj</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    path: xxx,</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//路由地址</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    query: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       mid: data.id</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//可以带参数</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.$router.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(obj)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">open</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(href, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;_blank&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h2 id="说说active-class是哪个组件的属性" tabindex="-1">说说active-class是哪个组件的属性？ <a class="header-anchor" href="#说说active-class是哪个组件的属性" aria-label="Permalink to &quot;说说active-class是哪个组件的属性？&quot;">​</a></h2><p><code>&lt;router-link/&gt;</code>组件的属性，设置链接激活时使用的<code>CSS</code>类名。默认值可以通过路由的构造选项<code>linkActiveClass</code>来全局配置</p>`,43)]))}const c=i(e,[["render",l]]);export{o as __pageData,c as default};
