import{j as s,b as i,c as e,a7 as l}from"./chunks/framework.DyWoERse.js";const c=JSON.parse('{"title":"Webpack项目优化","description":"","frontmatter":{"title":"Webpack项目优化","date":"2022-03-05 12:56:00","sidebar":true,"categories":["工具"],"tags":["前端","Webpack"],"publish":true},"headers":[],"relativePath":"blogs/web/webOptimize.md","filePath":"blogs/web/webOptimize.md","lastUpdated":1728575878000}'),n={name:"blogs/web/webOptimize.md"};function t(h,a,p,k,r,d){return i(),e("div",null,a[0]||(a[0]=[l(`<h2 id="构建时间优化" tabindex="-1">构建时间优化 <a class="header-anchor" href="#构建时间优化" aria-label="Permalink to &quot;构建时间优化&quot;">​</a></h2><h3 id="thread-loader" tabindex="-1">thread-loader <a class="header-anchor" href="#thread-loader" aria-label="Permalink to &quot;thread-loader&quot;">​</a></h3><blockquote><p>多进程打包，可以大大提高构建的速度，使用方法是将thread-loader放在比较费时间的loader之前，比如babel-loader</p></blockquote><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>由于启动项目和打包项目都需要加速，所以配置在webpack.base.js</p></div><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// yarn add thread-loader -D</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// webpack.base.js</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    test</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#22863A;--shiki-light-font-weight:bold;--shiki-dark:#85E89D;--shiki-dark-font-weight:bold;">\\.</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">js</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    use</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &#39;thread-loader&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &#39;babel-loader&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="cache-loader" tabindex="-1">cache-loader <a class="header-anchor" href="#cache-loader" aria-label="Permalink to &quot;cache-loader&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// yarn add thread-loader -D</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// webpack.base.js</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    test</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#22863A;--shiki-light-font-weight:bold;--shiki-dark:#85E89D;--shiki-dark-font-weight:bold;">\\.</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">js</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    use</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &#39;cache-loader&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &#39;thread-loader&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &#39;babel-loader&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="开启热更新" tabindex="-1">开启热更新 <a class="header-anchor" href="#开启热更新" aria-label="Permalink to &quot;开启热更新&quot;">​</a></h3><blockquote><p>比如你修改了项目中某一个文件，会导致整个项目刷新，这非常耗时间。如果只刷新修改的这个模块，其他保持原状，那将大大提高修改代码的重新构建时间</p></blockquote><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>只用于开发中，所以配置在开发环境</p></div><h3 id="exclude-include" tabindex="-1">exclude &amp; include <a class="header-anchor" href="#exclude-include" aria-label="Permalink to &quot;exclude &amp; include&quot;">​</a></h3><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>合理设置这两个属性，可以大大提高构建速度</p></div><ul><li><em><strong>exclude</strong></em>：不需要处理的文件</li><li><em><strong>include</strong></em>：需要处理的文件</li></ul><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// example</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    test</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#22863A;--shiki-light-font-weight:bold;--shiki-dark:#85E89D;--shiki-dark-font-weight:bold;">\\.</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">js</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //使用include来指定编译文件夹</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    include</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: path.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(__dirname, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;../src&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //使用exclude排除指定文件夹</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    exclude</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">node_modules</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    use</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &#39;babel-loader&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="构建区分环境" tabindex="-1">构建区分环境 <a class="header-anchor" href="#构建区分环境" aria-label="Permalink to &quot;构建区分环境&quot;">​</a></h3><blockquote><p>区分环境去构建是非常重要的，我们要明确知道，开发环境时我们需要哪些配置，不需要哪些配置；而最终打包生产环境时又需要哪些配置，不需要哪些配置：</p></blockquote><ul><li>开发环境：去除代码压缩、gzip、体积分析等优化的配置，大大提高构建速度</li><li>生产环境：需要代码压缩、gzip、体积分析等优化的配置，大大降低最终项目打包体积</li></ul><h3 id="提升webpack版本" tabindex="-1">提升webpack版本 <a class="header-anchor" href="#提升webpack版本" aria-label="Permalink to &quot;提升webpack版本&quot;">​</a></h3><blockquote><p>webpack版本越新，打包的效果肯定更好</p></blockquote><h2 id="打包体积优化" tabindex="-1">打包体积优化 <a class="header-anchor" href="#打包体积优化" aria-label="Permalink to &quot;打包体积优化&quot;">​</a></h2><h3 id="css代码压缩" tabindex="-1">CSS代码压缩 <a class="header-anchor" href="#css代码压缩" aria-label="Permalink to &quot;CSS代码压缩&quot;">​</a></h3><pre><code>+ css-minimizer-webpack-plugin
</code></pre><h3 id="js代码压缩" tabindex="-1">JS代码压缩 <a class="header-anchor" href="#js代码压缩" aria-label="Permalink to &quot;JS代码压缩&quot;">​</a></h3><pre><code>+ terser-webpack-plugin
</code></pre><h3 id="tree-shaking" tabindex="-1">tree-shaking <a class="header-anchor" href="#tree-shaking" aria-label="Permalink to &quot;tree-shaking&quot;">​</a></h3><blockquote><p>tree-shaking简单说作用就是：只打包用到的代码，没用到的代码不打包，而webpack5默认开启tree-shaking，当打包的mode为production时，自动开启tree-shaking进行优化</p></blockquote><h3 id="source-map类型" tabindex="-1">source-map类型 <a class="header-anchor" href="#source-map类型" aria-label="Permalink to &quot;source-map类型&quot;">​</a></h3><blockquote><p>source-map的作用是：方便你报错的时候能定位到错误代码的位置。它的体积不容小觑，所以对于不同环境设置不同的类型是很有必要的</p></blockquote><ul><li>开发环境：精准定位错误代码的位置 =&gt; eval-cheap-module-source-map</li><li>生产环境：想开启，但又不想体积太大 =&gt; nosources-source-map</li></ul><h3 id="打包体积分析" tabindex="-1">打包体积分析 <a class="header-anchor" href="#打包体积分析" aria-label="Permalink to &quot;打包体积分析&quot;">​</a></h3><ul><li>webpack-bundle-analyzer</li></ul><h2 id="用户体验优化" tabindex="-1">用户体验优化 <a class="header-anchor" href="#用户体验优化" aria-label="Permalink to &quot;用户体验优化&quot;">​</a></h2><h3 id="模块懒加载" tabindex="-1">模块懒加载 <a class="header-anchor" href="#模块懒加载" aria-label="Permalink to &quot;模块懒加载&quot;">​</a></h3><blockquote><p>如果不进行模块懒加载的话，最后整个项目代码都会被打包到一个js文件里，单个js文件体积非常大，那么当用户网页请求的时候，首屏加载时间会比较长，使用模块懒加载之后，大js文件会分成多个小js文件，网页加载时会按需加载，大大提升首屏加载速度</p></blockquote><h3 id="gzip" tabindex="-1">Gzip <a class="header-anchor" href="#gzip" aria-label="Permalink to &quot;Gzip&quot;">​</a></h3><blockquote><p>开启Gzip后，大大提高用户的页面加载速度，因为gzip的体积比原文件小很多，当然需要后端的配合，使用compression-webpack-plugin</p></blockquote><h3 id="小图片转base64" tabindex="-1">小图片转base64 <a class="header-anchor" href="#小图片转base64" aria-label="Permalink to &quot;小图片转base64&quot;">​</a></h3><blockquote><p>对于一些小图片，可以转base64，这样可以减少用户的http网络请求次数，提高用户的体验。webpack5中url-loader已被废弃，改用asset-module</p></blockquote><p>::: right <a href="https://juejin.cn/post/7083519723484708878" target="_blank" rel="noreferrer">转自</a> :::</p>`,39)]))}const b=s(n,[["render",t]]);export{c as __pageData,b as default};