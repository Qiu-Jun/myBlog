import{_ as e,c as t,o as i,a5 as c}from"./chunks/framework.PZKd_Vnq.js";const w=JSON.parse('{"title":"说说微信小程序中路由跳转的方式有哪些？区别？","description":"","frontmatter":{"title":"说说微信小程序中路由跳转的方式有哪些？区别？","date":"2022-01-20T00:00:00.000Z","categories":["前端","小程序"],"tags":["前端","小程序"],"publish":false},"headers":[],"relativePath":"blogs/interview/miniprogram/navigate.md","filePath":"blogs/interview/miniprogram/navigate.md","lastUpdated":1740981322000}'),o={name:"blogs/interview/miniprogram/navigate.md"};function r(l,a,n,d,b,h){return i(),t("div",{"data-pagefind-body":!0},a[0]||(a[0]=[c('<h2 id="有哪些" tabindex="-1">有哪些? <a class="header-anchor" href="#有哪些" aria-label="Permalink to &quot;有哪些?&quot;">​</a></h2><p>常见的微信小程序页面跳转方式有如下：</p><ul><li>wx.navigateTo(Object)</li><li>wx.redirectTo(Object)</li><li>wx.switchTab(Object)</li><li>wx.navigateBack(Object)</li><li>wx.reLaunch(Object)</li></ul><h4 id="wx-navigateto-object" tabindex="-1">wx.navigateTo(Object) <a class="header-anchor" href="#wx-navigateto-object" aria-label="Permalink to &quot;wx.navigateTo(Object)&quot;">​</a></h4><p><code>wx.navigateTo()</code>用于保留当前页面、跳转到应用内的某个页面，使用 <code>wx.navigateBack</code>可以返回到原页面</p><p>对于页面不是特别多的小程序，通常推荐使用 <code>wx.navigateTo</code>进行跳转， 以便返回原页面，以提高加载速度。当页面特别多时，则不推荐使用</p><h4 id="wx-redirectto-object" tabindex="-1">wx.redirectTo(Object) <a class="header-anchor" href="#wx-redirectto-object" aria-label="Permalink to &quot;wx.redirectTo(Object)&quot;">​</a></h4><p>重定向，当页面过多时，被保留页面会挤占微信分配给小程序的内存，或是达到微信所限制的 10 层页面栈的情况下，我们应该考虑选择 <code>wx.redirectTo</code></p><p><code>wx.redirectTo()</code>用于关闭当前页面，跳转到应用内的某个页面</p><h4 id="wx-switchtab-object" tabindex="-1">wx.switchTab(Object) <a class="header-anchor" href="#wx-switchtab-object" aria-label="Permalink to &quot;wx.switchTab(Object)&quot;">​</a></h4><p>跳转到 <code>tabBar </code>页面，并关闭其他所有非 <code>tabBar</code> 页面</p><h4 id="wx-navigateback-object" tabindex="-1">wx.navigateBack(Object) <a class="header-anchor" href="#wx-navigateback-object" aria-label="Permalink to &quot;wx.navigateBack(Object)&quot;">​</a></h4><p><code>wx.navigateBack()</code> 用于关闭当前页面，并返回上一页面或多级页面，开发者可通过 <code>getCurrentPages()</code> 获取当前的页面栈，决定需要返回几层则设置对象的<code>delta</code>属性即可</p><h4 id="wx-relaunch-object" tabindex="-1">wx.reLaunch(Object) <a class="header-anchor" href="#wx-relaunch-object" aria-label="Permalink to &quot;wx.reLaunch(Object)&quot;">​</a></h4><p>关闭所有页面，打开到应用内的某个页面，返回的时候跳到首页</p><h2 id="三、总结" tabindex="-1">三、总结 <a class="header-anchor" href="#三、总结" aria-label="Permalink to &quot;三、总结&quot;">​</a></h2><p>关于上述五种跳转方式，做下总结：</p><ul><li>navigateTo 保留当前页面，跳转到应用内的某个页面，使用 wx.navigateBack 可以返回到原页</li><li>redirectTo 关闭当前页面，跳转到应用内的某个页面</li><li>switchTab 跳转到 tabBar 页面，同时关闭其他非 tabBar 页面</li><li>navigateBack 返回上一页面</li><li>reLanch 关闭所有页面，打开到应用内的某个页面</li></ul><p>其中关于它们的页面栈的关系如下：</p><ul><li>avigateTo 新页面入栈</li><li>redirectTo 当前页面出栈，新页面入栈</li><li>navigateBack 页面不断出栈，直到目标返回页，新页面入栈</li><li>switchTab 页面全部出栈，只留下新的 Tab 页面</li><li>reLanch 页面全部出栈，只留下新的页面</li></ul>',20)]))}const x=e(o,[["render",r]]);export{w as __pageData,x as default};
