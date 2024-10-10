import{j as t,b as i,c as r,s as e,f as a,L as d,w as n,aa as o,G as c}from"./chunks/framework.AdhoujnV.js";const J=JSON.parse('{"title":"模块化","description":"","frontmatter":{"title":"模块化","date":"2022-01-28 15:10:00","sidebar":true,"categories":["前端"],"tags":["Javascript"],"publish":false},"headers":[],"relativePath":"blogs/interview/module.md","filePath":"blogs/interview/module.md","lastUpdated":1728576684000}'),s={name:"blogs/interview/module.md"},m=o('<h2 id="amd" tabindex="-1">AMD <a class="header-anchor" href="#amd" aria-label="Permalink to &quot;AMD&quot;">​</a></h2><p><code>AMD</code>是运行在浏览器环境的一个异步模块定义规范 ，是<code>RequireJS</code>在推广过程中对模块定义的规范化产出</p><h3 id="amd规范" tabindex="-1">AMD规范 <a class="header-anchor" href="#amd规范" aria-label="Permalink to &quot;AMD规范&quot;">​</a></h3><p><code>AMD</code>推崇依赖前置，在定义模块的时候就要声明其依赖的模块</p><h3 id="优点" tabindex="-1">优点 <a class="header-anchor" href="#优点" aria-label="Permalink to &quot;优点&quot;">​</a></h3><p>用户体验好，因为没有延迟，依赖模块提前执行了</p><h2 id="cmd" tabindex="-1">CMD <a class="header-anchor" href="#cmd" aria-label="Permalink to &quot;CMD&quot;">​</a></h2><p><code>CMD</code>是一个通用模块定义规范；是<code>SeaJs</code>推广过程中对模块定义的规范化产出</p><h3 id="cmd规范" tabindex="-1">CMD规范 <a class="header-anchor" href="#cmd规范" aria-label="Permalink to &quot;CMD规范&quot;">​</a></h3><p><code>CMD</code>推崇依赖就近，只有在用到某个模块的时候才会去<code>require</code></p><h3 id="优点-1" tabindex="-1">优点 <a class="header-anchor" href="#优点-1" aria-label="Permalink to &quot;优点&quot;">​</a></h3><p>性能好，因为只有用户需要的时候才执行</p><h2 id="commonjs" tabindex="-1">CommonJS <a class="header-anchor" href="#commonjs" aria-label="Permalink to &quot;CommonJS&quot;">​</a></h2><p><code>CommonJS</code>是服务器端模块的规范，由<code>Node</code>推广使用，<code>webpack</code>也采用这种规范编写</p><h3 id="commonjs规范" tabindex="-1">CommonJS规范 <a class="header-anchor" href="#commonjs规范" aria-label="Permalink to &quot;CommonJS规范&quot;">​</a></h3><p>CommonJS模块规范主要分为三部分：模块定义、模块标识、模块引用。</p><ul><li>模块定义：module对象：在每一个模块中，module对象代表该模块自身。 export属性：module对象的一个属性，它向外提供接口。输出模块变量的最好方法是使用module.exports对象。一个单独的文件就是一个模块。每一个模块都是一个单独的作用域，也就是说，在该模块内部定义的变量，无法被其他模块读取，除非定义为global对象的属性。</li><li>模块标识：传递给require方法的参数，必须是符合小驼峰命名的字符串，或者以 . 、.. 、开头的相对路径，或者绝对路径。</li><li>模块引用：加载模块使用require(同步加载)，该方法读取一个文件并执行，返回文件内部的module.exports对象。</li></ul><h3 id="优点-2" tabindex="-1">优点 <a class="header-anchor" href="#优点-2" aria-label="Permalink to &quot;优点&quot;">​</a></h3><ul><li>CommonJS模块规范很好地解决变量污染问题，每个模块具有独立空间，互不干扰，命名空间相比之下就不太好。</li><li>CommonJS规范定义模块十分简单，接口十分简洁。</li><li>CommonJS模块规范支持引入和导出功能，这样可以顺畅地连接各个模块，实现彼此间的依赖关系</li><li>CommonJS规范的提出，主要是为了弥补JavaScript没有标准的缺陷，已达到像Python、Ruby和Java那样具备开发大型应用的基础能力，而不是停留在开发浏览器端小脚本程序的阶段</li></ul><h3 id="缺点" tabindex="-1">缺点 <a class="header-anchor" href="#缺点" aria-label="Permalink to &quot;缺点&quot;">​</a></h3>',20),h=e("li",null,"没有并行加载机制",-1),u=o('<h2 id="es6模块" tabindex="-1">ES6模块 <a class="header-anchor" href="#es6模块" aria-label="Permalink to &quot;ES6模块&quot;">​</a></h2><p>ES6的模块化设计思想是尽量静态化，使得<strong>编译时</strong>就能确定模块的依赖关系, 以及输入和输出的变量。所以说ES6是<strong>编译时加载</strong><br> 在ES6模块中自动采用<strong>严格模式</strong>。规定</p><ul><li>变量必须先声明</li><li>函数参数不能有同名属性</li><li>不能使用with</li><li>对只读属性赋值、delete不可删除属性直接报错</li><li>不可删除变量delete prop、只能删除属性delete global[prop]</li><li>eval不会再外层作用域引入变量</li><li>eval和arguments不可重新赋值</li><li>arguments不会自动反应函数参数变化</li><li>禁止this指向全局</li><li>增加保留字：static、interface、protected等。</li></ul><blockquote><p>注意：在ES6模块中，顶层this为undefined，不应该被使用。</p></blockquote>',4);function p(_,b,q,S,f,C){const l=c("font");return i(),r("div",null,[m,e("ul",null,[h,e("li",null,[a("由于CommonJS是同步加载模块，这对于服务器端是很不好的，因为所有的模块都放在本地硬盘。等待模块时间就是硬盘读取文件时间，很小。但是，对于浏览器而言，它需要从服务器加载模块，涉及到网速，代理等原因，一旦等待时间过长，浏览器处于”假死”状态。"),d(l,{color:"e54d42"},{default:n(()=>[a("所以浏览器端不是很适合Common.Js")]),_:1})])]),u])}const P=t(s,[["render",p]]);export{J as __pageData,P as default};
