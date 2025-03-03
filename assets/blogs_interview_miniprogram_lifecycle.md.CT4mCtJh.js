import{_ as a,c as e,o as i,a5 as d}from"./chunks/framework.PZKd_Vnq.js";const k=JSON.parse('{"title":"说说微信小程序的生命周期函数有哪些？","description":"","frontmatter":{"title":"说说微信小程序的生命周期函数有哪些？","date":"2022-01-20T00:00:00.000Z","categories":["前端","小程序"],"tags":["前端","小程序"],"publish":false},"headers":[],"relativePath":"blogs/interview/miniprogram/lifecycle.md","filePath":"blogs/interview/miniprogram/lifecycle.md","lastUpdated":1740981322000}'),s={name:"blogs/interview/miniprogram/lifecycle.md"};function n(l,t,o,h,r,p){return i(),e("div",{"data-pagefind-body":!0},t[0]||(t[0]=[d(`<h2 id="生命周期" tabindex="-1">生命周期 <a class="header-anchor" href="#生命周期" aria-label="Permalink to &quot;生命周期&quot;">​</a></h2><p>跟<code>vue</code>、<code>react</code>框架一样，微信小程序框架也存在生命周期，实质也是一堆会在特定时期执行的函数</p><p>小程序中，生命周期主要分成了三部分：</p><ul><li>应用的生命周期</li><li>页面的生命周期</li><li>组件的生命周期</li></ul><h4 id="应用的生命周期" tabindex="-1">应用的生命周期 <a class="header-anchor" href="#应用的生命周期" aria-label="Permalink to &quot;应用的生命周期&quot;">​</a></h4><p>小程序的生命周期函数是在<code>app.js</code>里面调用的，通过<code>App(Object)</code>函数用来注册一个小程序，指定其小程序的生命周期回调</p><table tabindex="0"><thead><tr><th>生命周期</th><th>说明</th></tr></thead><tbody><tr><td>onLaunch</td><td>小程序初始化完成时触发，全局只触发一次</td></tr><tr><td>onShow</td><td>小程序启动，或从后台进入前台显示时触发</td></tr><tr><td>onHide</td><td>小程序从前台进入后台时触发</td></tr><tr><td>onError</td><td>小程序发生脚本错误或 API 调用报错时触发</td></tr><tr><td>onPageNotFound</td><td>小程序要打开的页面不存在时触发</td></tr><tr><td>onUnhandledRejection()</td><td>小程序有未处理的 Promise 拒绝时触发</td></tr><tr><td>onThemeChange</td><td>系统切换主题时触发</td></tr></tbody></table><h4 id="页面的生命周期" tabindex="-1">页面的生命周期 <a class="header-anchor" href="#页面的生命周期" aria-label="Permalink to &quot;页面的生命周期&quot;">​</a></h4><p>页面生命周期函数就是当你每进入/切换到一个新的页面的时候，就会调用的生命周期函数，同样通过<code>App(Object)</code>函数用来注册一个页面</p><table tabindex="0"><thead><tr><th>生命周期</th><th>说明</th><th>作用</th></tr></thead><tbody><tr><td>onLoad</td><td>生命周期回调—监听页面加载</td><td>发送请求获取数据</td></tr><tr><td>onShow</td><td>生命周期回调—监听页面显示</td><td>请求数据</td></tr><tr><td>onReady</td><td>生命周期回调—监听页面初次渲染完成</td><td>获取页面元素（少用）</td></tr><tr><td>onHide</td><td>生命周期回调—监听页面隐藏</td><td>终止任务，如定时器或者播放音乐</td></tr><tr><td>onUnload</td><td>生命周期回调—监听页面卸载</td><td>终止任务</td></tr></tbody></table><h4 id="组件的生命周期" tabindex="-1">组件的生命周期 <a class="header-anchor" href="#组件的生命周期" aria-label="Permalink to &quot;组件的生命周期&quot;">​</a></h4><p>组件的生命周期，指的是组件自身的一些函数，这些函数在特殊的时间点或遇到一些特殊的框架事件时被自动触发，通过<code>Component(Object)</code>进行注册组件</p><table tabindex="0"><thead><tr><th>生命周期</th><th>说明</th></tr></thead><tbody><tr><td>created</td><td>生命周期回调—监听页面加载</td></tr><tr><td>attached</td><td>生命周期回调—监听页面显示</td></tr><tr><td>ready</td><td>生命周期回调—监听页面初次渲染完成</td></tr><tr><td>moved</td><td>生命周期回调—监听页面隐藏</td></tr><tr><td>detached</td><td>生命周期回调—监听页面卸载</td></tr><tr><td>error</td><td>每当组件方法抛出错误时执行</td></tr></tbody></table><p>注意的是：</p><ul><li>组件实例刚刚被创建好时， created 生命周期被触发，此时，组件数据 this.data 就是在 Component 构造器中定义的数据 data ， 此时不能调用 setData</li><li>在组件完全初始化完毕、进入页面节点树后， attached 生命周期被触发。此时， this.data 已被初始化为组件的当前值。这个生命周期很有用，绝大多数初始化工作可以在这个时机进行</li><li>在组件离开页面节点树后， detached 生命周期被触发。退出一个页面时，如果组件还在页面节点树中，则 detached 会被触发</li></ul><p>还有一些特殊的生命周期，它们并非与组件有很强的关联，但有时组件需要获知，以便组件内部处理，这样的生命周期称为“组件所在页面的生命周期”，在 <code>pageLifetimes</code> 定义段中定义，如下：</p><table tabindex="0"><thead><tr><th>生命周期</th><th>说明</th></tr></thead><tbody><tr><td>show</td><td>组件所在的页面被展示时执行</td></tr><tr><td>hide</td><td>组件所在的页面被隐藏时执行</td></tr></tbody></table><p>代码如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Component</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  pageLifetimes: {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    show</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 页面被展示</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    hide</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 页面被隐藏</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><h2 id="执行过程" tabindex="-1">执行过程 <a class="header-anchor" href="#执行过程" aria-label="Permalink to &quot;执行过程&quot;">​</a></h2><h4 id="应用的生命周期-1" tabindex="-1">应用的生命周期 <a class="header-anchor" href="#应用的生命周期-1" aria-label="Permalink to &quot;应用的生命周期&quot;">​</a></h4><p>小程序的生命周期函数是在<code>app.js</code>里面调用的，通过<code>App(Object)</code>函数用来注册一个小程序，指定其小程序的生命周期回调</p><ul><li>⽤户⾸次打开⼩程序，触发 onLaunch（全局只触发⼀次）</li><li>⼩程序初始化完成后，触发onShow⽅法，监听⼩程序显示</li><li>⼩程序从前台进⼊后台，触发 onHide⽅法</li><li>⼩程序从后台进⼊前台显示，触发 onShow⽅法</li><li>⼩程序后台运⾏⼀定时间，或系统资源占⽤过⾼，会被销毁</li></ul><h4 id="页面的生命周期-1" tabindex="-1">页面的生命周期 <a class="header-anchor" href="#页面的生命周期-1" aria-label="Permalink to &quot;页面的生命周期&quot;">​</a></h4><p>页面生命周期函数就是当你每进入/切换到一个新的页面的时候，就会调用的生命周期函数，同样通过<code>App(Object)</code>函数用来注册一个页面</p><ul><li>⼩程序注册完成后，加载⻚⾯，触发onLoad⽅法</li><li>⻚⾯载⼊后触发onShow⽅法，显示⻚⾯</li><li>⾸次显示⻚⾯，会触发onReady⽅法，渲染⻚⾯元素和样式，⼀个⻚⾯只会调⽤⼀次</li><li>当⼩程序后台运⾏或跳转到其他⻚⾯时，触发onHide⽅法</li><li>当⼩程序有后台进⼊到前台运⾏或重新进⼊⻚⾯时，触发onShow⽅法</li><li>当使⽤重定向⽅法 wx.redirectTo() 或关闭当前⻚返回上⼀⻚wx.navigateBack()，触发onUnload</li></ul><p>当存在也应用生命周期和页面周期的时候，相关的执行顺序如下：</p><ul><li><p>打开小程序：(App)onLaunch --&gt; (App)onShow --&gt; (Pages)onLoad --&gt; (Pages)onShow --&gt; (pages)onReady</p></li><li><p>进入下一个页面：(Pages)onHide --&gt; (Next)onLoad --&gt; (Next)onShow --&gt; (Next)onReady</p></li><li><p>返回上一个页面：(curr)onUnload --&gt; (pre)onShow</p></li><li><p>离开小程序：(App)onHide</p></li><li><p>再次进入：小程序未销毁 --&gt; (App)onShow(执行上面的顺序），小程序被销毁，（App)onLaunch重新开始执行.</p></li></ul>`,28)]))}const g=a(s,[["render",n]]);export{k as __pageData,g as default};
