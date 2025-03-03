import{_ as a,c as l,o as i,a5 as r}from"./chunks/framework.PZKd_Vnq.js";const o="/myBlog/imgs/interview/webpack-hot-update.png",k=JSON.parse('{"title":"工程化","description":"","frontmatter":{"title":"工程化","date":"2022-01-28T15:10:00.000Z","sidebar":true,"categories":["前端","工具"],"tags":["前端","Javascript"],"publish":false},"headers":[],"relativePath":"blogs/interview/builded.md","filePath":"blogs/interview/builded.md","lastUpdated":1740981322000}'),c={name:"blogs/interview/builded.md"};function t(s,e,d,n,u,b){return i(),l("div",{"data-pagefind-body":!0},e[0]||(e[0]=[r('<div class="tip custom-block"><p class="custom-block-title">TIP</p><p>前端工程化是使用软件工程的技术和方法来进行前端的开发流程、技术、工具、经验等规范化、标准化，其主要目的为了提高效率和降低成本，即提高开发过程中的开发效率，减少不必要的重复工作时间，而前端工程本质上是软件工程的一种，因此我们应该从软件工程的角度来研究前端工程。</p></div><h2 id="webpack" tabindex="-1">Webpack <a class="header-anchor" href="#webpack" aria-label="Permalink to &quot;Webpack&quot;">​</a></h2><h3 id="webpack的构建流程是什么" tabindex="-1">webpack的构建流程是什么? <a class="header-anchor" href="#webpack的构建流程是什么" aria-label="Permalink to &quot;webpack的构建流程是什么?&quot;">​</a></h3><ul><li>初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；</li><li>开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；</li><li>确定入口：根据配置中的 entry 找出所有的入口文件；</li><li>编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；</li><li>完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；</li><li>输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；</li><li>输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统</li></ul><h3 id="webpack的核心概念" tabindex="-1">webpack的核心概念 <a class="header-anchor" href="#webpack的核心概念" aria-label="Permalink to &quot;webpack的核心概念&quot;">​</a></h3><ul><li>Entry：入口，Webpack执行构建的第一步将从Entry开始，告诉webpack要使用哪个模块作为构建项目的起点，默认为./src/index.js</li><li>output ：出口，webpack在哪里输出它打包好的代码以及如何命名，默认为./dist</li><li>Module：模块，在Webpack里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的Entry开始递归找出所有依赖的模块</li><li>Chunk：代码块，一个Chunk由多个模块组合而成，用于代码合并与分割</li><li>Loader：模块转换器，用于把模块原内容按照需求转换成新内容</li><li>Plugin：扩展插件，在Webpack构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件的发生，在特定时机做对应的事情</li></ul><h3 id="什么是bundle-什么是chunk-什么是module" tabindex="-1">什么是bundle，什么是chunk，什么是module <a class="header-anchor" href="#什么是bundle-什么是chunk-什么是module" aria-label="Permalink to &quot;什么是bundle，什么是chunk，什么是module&quot;">​</a></h3><ul><li>bundle：webpack打包出来的文件</li><li>chunk：webpack在进行模块依赖分析的时，代码分割出来的代码块</li><li>module：开发中的单个模块</li></ul><h3 id="loader机制的作用是什么" tabindex="-1">Loader机制的作用是什么？ <a class="header-anchor" href="#loader机制的作用是什么" aria-label="Permalink to &quot;Loader机制的作用是什么？&quot;">​</a></h3><p>webpack默认只能打包js文件，配置里的module.rules数组配置了一组规则，告诉 Webpack 在遇到哪些文件时使用哪些 Loader 去加载和转换打包成js。</p><blockquote><p>注意：<br> use属性的值需要是一个由 Loader 名称组成的数组，Loader 的执行顺序是由后到前的； 每一个 Loader 都可以通过 URL querystring 的方式传入参数，例如css-loader?minimize中的minimize告诉css-loader要开启 CSS 压缩。</p></blockquote><h3 id="常用loader" tabindex="-1">常用loader <a class="header-anchor" href="#常用loader" aria-label="Permalink to &quot;常用loader&quot;">​</a></h3><ul><li>css-loader: 读取 合并CSS 文件</li><li>style-loader: 把 CSS 内容注入到 JavaScript 里</li><li>sass-loader: 解析sass文件（安装sass-loader，node-sass）</li><li>postcss-loader: 自动添加浏览器兼容前缀（postcss.config配置）</li><li>url-loader: 将文件转换为base64 URI</li><li>vue-loader: 处理vue文件</li></ul><h3 id="configurewebpack与chainwebpack区别" tabindex="-1">configureWebpack与chainWebpack区别 <a class="header-anchor" href="#configurewebpack与chainwebpack区别" aria-label="Permalink to &quot;configureWebpack与chainWebpack区别&quot;">​</a></h3><blockquote><p>configureWebpack和chainWebpack的作用相同，唯一的区别就是它们修改webpack配置的方式不同：</p><blockquote><ul><li>configureWebpack的底层是webpack-merge，来修改默认的webpack配置。该对象将会被webpack-merge合并入最终的webpack配置</li><li>chainWebpack的底层是webpack-chain。通过链式编程的形式，来修改默认的webpack配置</li></ul></blockquote></blockquote><h3 id="说说webpack的热更新原理是什么" tabindex="-1">说说webpack的热更新原理是什么？ <a class="header-anchor" href="#说说webpack的热更新原理是什么" aria-label="Permalink to &quot;说说webpack的热更新原理是什么？&quot;">​</a></h3><p><img src="'+o+'" alt=""></p><h4 id="图片解读" tabindex="-1">图片解读 <a class="header-anchor" href="#图片解读" aria-label="Permalink to &quot;图片解读&quot;">​</a></h4><ul><li>Webpack Compile：将JS源代码编译成bundle.js</li><li>HMR Server：用来将热更新的文件输出给HMR Runtime</li><li>Bundle Server：静态资源文件服务器，提供文件访问路径</li><li>HMR Runtime：socket服务器，会被注入到浏览器，更新文件的变化</li><li>bundle.js：构建输出的文件</li><li>在HMR Runtime和HMR Server之间建立websocket，即图上4号线，用于实时更新文件变化</li></ul><h4 id="原理" tabindex="-1">原理 <a class="header-anchor" href="#原理" aria-label="Permalink to &quot;原理&quot;">​</a></h4><ul><li>通过<code>webpack-dev-server</code>创建两个服务器：提供静态资源的服务（express）和Socket服务</li><li>express server负责直接提供静态资源的服务（打包后的资源直接被浏览器请求和解析）</li><li>socket server是一个<code>websocket</code>的长连接，双方可以通信</li><li>当<code>socket server</code>监听到对应的模块发生变化时，会生成两个文件.json（manifest文件）和.js文件（update chunk）</li><li>通过长连接，socket server 可以直接将这两个文件主动发送给客户端（浏览器） 浏览器拿到两个新的文件后，通过HMR runtime机制，加载这两个文件，并且针对修改的模块进行更新</li></ul><h2 id="vite" tabindex="-1">Vite <a class="header-anchor" href="#vite" aria-label="Permalink to &quot;Vite&quot;">​</a></h2>',22)]))}const h=a(c,[["render",t]]);export{k as __pageData,h as default};
