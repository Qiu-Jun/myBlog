import{_ as t,o as e,c as l,a6 as i}from"./chunks/framework.Bna9RZrE.js";const P=JSON.parse('{"title":"Http篇","description":"","frontmatter":{"title":"Http篇","date":"2022-01-20T00:00:00.000Z","sidebar":true,"categories":["前端"],"tags":["面试"],"publish":false},"headers":[],"relativePath":"blogs/interview/http.md","filePath":"blogs/interview/http.md","lastUpdated":1732882103000}'),a={name:"blogs/interview/http.md"},r=i('<h2 id="tcp和udp的区别" tabindex="-1">tcp和udp的区别 <a class="header-anchor" href="#tcp和udp的区别" aria-label="Permalink to &quot;tcp和udp的区别&quot;">​</a></h2><table tabindex="0"><thead><tr><th style="text-align:left;"></th><th style="text-align:center;">TCP</th><th style="text-align:center;">UDP</th></tr></thead><tbody><tr><td style="text-align:left;">是否连接</td><td style="text-align:center;">面向连接</td><td style="text-align:center;">无连接</td></tr><tr><td style="text-align:left;">是否可靠</td><td style="text-align:center;">可靠</td><td style="text-align:center;">不可靠</td></tr><tr><td style="text-align:left;">连接对象个数</td><td style="text-align:center;">只能一对一通信</td><td style="text-align:center;">支持一对一、一对多、多对一，多对多交互通信</td></tr><tr><td style="text-align:left;">传输方式</td><td style="text-align:center;">面向字节流</td><td style="text-align:center;">面向报文</td></tr><tr><td style="text-align:left;">首部开销</td><td style="text-align:center;">首部开销比较大，最小20个字节，最大60</td><td style="text-align:center;">首部开销小，仅8个字节</td></tr><tr><td style="text-align:left;">使用场景</td><td style="text-align:center;">适用于可靠传输的应用,如文件</td><td style="text-align:center;">适用于实时应用，如视频会议</td></tr></tbody></table><h2 id="什么是http-http和https的区别" tabindex="-1">什么是HTTP? HTTP和HTTPS的区别? <a class="header-anchor" href="#什么是http-http和https的区别" aria-label="Permalink to &quot;什么是HTTP? HTTP和HTTPS的区别?&quot;">​</a></h2><h3 id="http" tabindex="-1">HTTP <a class="header-anchor" href="#http" aria-label="Permalink to &quot;HTTP&quot;">​</a></h3><p>HTTP (HyperText Transfer Protocol)，即超文本运输协议，是实现网络通信的一种规范</p><ul><li>支持客户/服务器模式</li><li>简单快速：客户向服务器请求服务时，只需传送请求方法和路径。由于HTTP协议简单，使得HTTP服务器的程序规模小，因而通信速度很快</li><li>灵活：HTTP允许传输任意类型的数据对象。正在传输的类型由Content-Type加以标记</li><li>无连接：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间</li><li>无状态：HTTP协议无法根据之前的状态进行本次的请求处理</li></ul><h3 id="https" tabindex="-1">HTTPS <a class="header-anchor" href="#https" aria-label="Permalink to &quot;HTTPS&quot;">​</a></h3><p>为了保证这些隐私数据能加密传输，让HTTP运行安全的SSL/TLS协议上，即 HTTPS = HTTP + SSL/TLS，通过 SSL证书来验证服务器的身份，并为浏览器和服务器之间的通信进行加密</p><h3 id="区别" tabindex="-1">区别 <a class="header-anchor" href="#区别" aria-label="Permalink to &quot;区别&quot;">​</a></h3><ul><li>HTTPS是HTTP协议的安全版本，HTTP协议的数据传输是明文的，是不安全的，HTTPS使用了SSL/TLS协议进行了加密处理，相对更安全</li><li>HTTP 和 HTTPS 使用连接方式不同，默认端口也不一样，HTTP是80，HTTPS是443</li><li>HTTPS 由于需要设计加密以及多次握手，性能方面不如 HTTP</li><li>HTTPS需要SSL，SSL 证书需要钱，功能越强大的证书费用越高</li></ul><h2 id="http1-0、http1-1和http2-0的区别" tabindex="-1">HTTP1.0、HTTP1.1和HTTP2.0的区别 <a class="header-anchor" href="#http1-0、http1-1和http2-0的区别" aria-label="Permalink to &quot;HTTP1.0、HTTP1.1和HTTP2.0的区别&quot;">​</a></h2><h3 id="http1-0" tabindex="-1">HTTP1.0 <a class="header-anchor" href="#http1-0" aria-label="Permalink to &quot;HTTP1.0&quot;">​</a></h3><ul><li>浏览器与服务器只保持短暂的连接，浏览器的每次请求都需要与服务器建立一个TCP连接</li></ul><h3 id="http1-1" tabindex="-1">HTTP1.1 <a class="header-anchor" href="#http1-1" aria-label="Permalink to &quot;HTTP1.1&quot;">​</a></h3><ul><li>引入了持久连接，即TCP连接默认不关闭，可以被多个请求复用</li><li>在同一个TCP连接里面，客户端可以同时发送多个请求</li><li>虽然允许复用TCP连接，但是同一个TCP连接里面，所有的数据通信是按次序进行的，服务器只有处理完一个请求，才会接着处理下一个请求。如果前面的处理特别慢，后面就会有许多请求排队等着</li><li>新增了一些请求方法</li><li>新增了一些请求头和响应头</li></ul><h3 id="http2-0" tabindex="-1">HTTP2.0 <a class="header-anchor" href="#http2-0" aria-label="Permalink to &quot;HTTP2.0&quot;">​</a></h3><ul><li>采用二进制格式而非文本格式</li><li>完全多路复用，而非有序并阻塞的、只需一个连接即可实现并行</li><li>使用报头压缩，降低开销</li><li>服务器推送</li></ul><h2 id="get和post的区别" tabindex="-1">GET和POST的区别 <a class="header-anchor" href="#get和post的区别" aria-label="Permalink to &quot;GET和POST的区别&quot;">​</a></h2><table tabindex="0"><thead><tr><th style="text-align:left;"></th><th style="text-align:center;">GET</th><th style="text-align:center;">POST</th></tr></thead><tbody><tr><td style="text-align:left;">后退按钮/刷新</td><td style="text-align:center;">无害</td><td style="text-align:center;">数据会被重新提交（浏览器应该告知用户数据会被重新提交）</td></tr><tr><td style="text-align:left;">书签</td><td style="text-align:center;">可收藏为书签</td><td style="text-align:center;">不可收藏为书签</td></tr><tr><td style="text-align:left;">缓存</td><td style="text-align:center;">能被缓存</td><td style="text-align:center;">不能缓存</td></tr><tr><td style="text-align:left;">历史</td><td style="text-align:center;">参数保留在浏览器历史中</td><td style="text-align:center;">参数不会保存在浏览器历史中</td></tr><tr><td style="text-align:left;">对数据长度的限制</td><td style="text-align:center;">当发送数据时，GET 方法向 URL 添加数据；URL 的长度是受限制的（URL 的最大长度是 2048 个字符）</td><td style="text-align:center;">无限制</td></tr><tr><td style="text-align:left;">对数据类型的限制</td><td style="text-align:center;">只允许<strong>ASCII</strong>字符</td><td style="text-align:center;">没有限制。也允许二进制数据</td></tr><tr><td style="text-align:left;">安全性</td><td style="text-align:center;">与 POST 相比，GET 的安全性较差，因为所发送的数据是 URL 的一部分。在发送密码或其他敏感信息时绝不要使用 GET</td><td style="text-align:center;">POST 比 GET 更安全，因为参数不会被保存在浏览器历史或 web 服务器日志中</td></tr><tr><td style="text-align:left;">可见性</td><td style="text-align:center;">数据在 URL 中对所有人都是可见的</td><td style="text-align:center;">数据不会显示在 URL 中</td></tr></tbody></table><h2 id="地址栏从输入到页面渲染发生了什么" tabindex="-1">地址栏从输入到页面渲染发生了什么 <a class="header-anchor" href="#地址栏从输入到页面渲染发生了什么" aria-label="Permalink to &quot;地址栏从输入到页面渲染发生了什么&quot;">​</a></h2><ul><li>URL解析</li><li>DNS查询</li><li>TCP连接: 三次握手 <ul><li>客户端给服务端发一个<strong>SYN</strong>报文，并指明客户端的初始化序列号 ISN(c)，此时客户端处于<strong>SYNSENT</strong>状态</li><li>服务器收到客户端的<strong>SYN</strong>报文之后，会以自己的<strong>SYN</strong>报文作为应答，为了确认客户端的<strong>SYN</strong>将客户端的 ISN+1作为ACK的值，此时服务器处于<strong>SYNRCVD</strong>的状态</li><li>客户端收到<strong>SYN</strong>报文之后，会发送一个<strong>ACK</strong>报文，值为服务器的ISN+1。此时客户端处于<strong>ESTABLISHED</strong>状态。服务器收到<strong>ACK</strong>报文之后，也处于<strong>ESTABLISHED</strong>状态，此时，双方已建立起了连接</li></ul><div>![](/imgs/interview/connet_on.png)</div></li><li>HTTP请求</li><li>响应请求</li><li>页面渲染 <ul><li>根据HTML解析出DOM tree <ul><li>DOM tree解析的过程是一个深度优先遍历</li><li>构建DOM tree的过程中，若遇到script标签，则DOM tree的构建会暂停，直至脚本执行完毕</li></ul></li><li>根据CSS解析生成CSS tree <ul><li>解析CSS tree时js执行将暂停，直至CSS tree就绪</li><li>浏览器在CSS tree生成之前不会进行渲染</li></ul></li><li>结合DOM tree和CSS tree，生成render tree <ul><li>DOM 树和 CSS 规则树全部准备好了以后，浏览器才会开始构建渲染树</li><li>精简 CSS 并可以加快 CSS 规则树的构建，从而加快页面相应速度</li></ul></li><li>根据render tree计算每一个节点的信息 <ul><li>布局：通过渲染树中渲染对象的信息，计算出每一个渲染对象的位置和尺寸</li><li>回流：在布局完成后，发现了某个部分发生了变化影响了布局，那就需要倒回去重新渲染</li></ul></li><li>根据计算好的信息绘制页面 <ul><li>绘制阶段，系统会遍历呈现树，并调用呈现器的“paint”方法，将呈现器的内容显示在屏幕上</li><li>重绘：某个元素的背景颜色，文字颜色等，不影响元素周围或内部布局的属性，将只会引起浏览器的重绘。</li><li>回流：某个元素的尺寸发生了变化，则需重新计算渲染树，重新渲染</li></ul></li></ul></li><li>断开连接: 四次挥手 <ul><li>客户端发送一个<strong>FIN</strong>报文，报文中会指定一个序列号。此时客户端处于<strong>FIN_WAIT1</strong>状态，停止发送数据，等待服务端的确认</li><li>服务端收到<strong>FIN</strong>之后，会发送<strong>ACK</strong>报文，且把客户端的序列号值+1作为<strong>ACK</strong>报文的序列号值，表明已经收到客户端的报文了，此时服务端处于<strong>CLOSE_WAIT</strong>状态</li><li>如果服务端也想断开连接了，和客户端的第一次挥手一样，发给<strong>FIN</strong>报文，且指定一个序列号。此时服务端处于<strong>LAST_ACK</strong>的状态</li><li>客户端收到<strong>FIN</strong>之后，一样发送一个<strong>ACK</strong>报文作为应答，且把服务端的序列号值 +1 作为自己<strong>ACK</strong>报文的序列号值，此时客户端处于<strong>TIME_WAIT</strong>状态。需要过一阵子以确保服务端收到自己的<strong>ACK</strong>报文之后才会进入<strong>CLOSED</strong>状态，服务端收到 ACK 报文之后，就处于关闭连接了，处于<strong>CLOSED</strong>状态</li></ul><div>![](/imgs/interview/connet_off.png)</div></li></ul><h3 id="为什么不是两次握手" tabindex="-1">为什么不是两次握手？ <a class="header-anchor" href="#为什么不是两次握手" aria-label="Permalink to &quot;为什么不是两次握手？&quot;">​</a></h3><p>如果是两次握手，发送端可以确定自己发送的信息能对方能收到，也能确定对方发的包自己能收到，但接收端只能确定对方发的包自己能收到 无法确定自己发的包对方能收到，并且两次握手的话, 客户端有可能因为网络阻塞等原因会发送多个请求报文，延时到达的请求又会与服务器建立连接，浪费掉许多服务器的资源</p><h2 id="说说对websocket的理解以及应用场景" tabindex="-1">说说对websocket的理解以及应用场景 <a class="header-anchor" href="#说说对websocket的理解以及应用场景" aria-label="Permalink to &quot;说说对websocket的理解以及应用场景&quot;">​</a></h2><blockquote><p>WebSocket，是一种网络传输协议，位于OSI模型的应用层。可在单个TCP连接上进行全双工通信，能更好的节省服务器资源和带宽并达到实时通迅</p><blockquote><p>客户端和服务器只需要完成一次握手，两者之间就可以创建持久性的连接，并进行双向数据传输</p></blockquote></blockquote><h3 id="特点" tabindex="-1">特点 <a class="header-anchor" href="#特点" aria-label="Permalink to &quot;特点&quot;">​</a></h3><ul><li>全双工：通信允许数据在两个方向上同时传输，它在能力上相当于两个单工通信方式的结合</li><li>二进制帧：采用了二进制帧结构，语法、语义与 HTTP 完全不兼容，相比http/2，WebSocket更侧重于“实时通信”，而HTTP/2 更侧重于提高传输效率，所以两者的帧结构也有很大的区别</li><li>协议名：引入ws和wss分别代表明文和密文的websocket协议，且默认端口使用80或443，几乎与http一致</li></ul><h3 id="优点" tabindex="-1">优点 <a class="header-anchor" href="#优点" aria-label="Permalink to &quot;优点&quot;">​</a></h3><ul><li>较少的控制开销：数据包头部协议较小，不同于http每次请求需要携带完整的头部</li><li>更强的实时性：相对于HTTP请求需要等待客户端发起请求服务端才能响应，延迟明显更少</li><li>保持创连接状态：创建通信后，可省略状态信息，不同于HTTP每次请求需要携带身份验证</li><li>更好的二进制支持：定义了二进制帧，更好处理二进制内容</li><li>支持扩展：用户可以扩展websocket协议、实现部分自定义的子协议</li><li>更好的压缩效果：Websocket在适当的扩展支持下，可以沿用之前内容的上下文，在传递类似的数据时，可以显著地提高压缩率</li></ul><h3 id="应用场景" tabindex="-1">应用场景 <a class="header-anchor" href="#应用场景" aria-label="Permalink to &quot;应用场景&quot;">​</a></h3><ul><li>弹幕</li><li>媒体聊天</li><li>协同编辑</li><li>实况/实时更新</li></ul><h2 id="说说强缓存和协商缓存的区别" tabindex="-1">说说强缓存和协商缓存的区别 <a class="header-anchor" href="#说说强缓存和协商缓存的区别" aria-label="Permalink to &quot;说说强缓存和协商缓存的区别&quot;">​</a></h2><h3 id="强缓存" tabindex="-1">强缓存 <a class="header-anchor" href="#强缓存" aria-label="Permalink to &quot;强缓存&quot;">​</a></h3><blockquote><p>直接从本地副本比对读取，不去请求服务器，返回的状态码是 200</p></blockquote><h3 id="协商缓存" tabindex="-1">协商缓存 <a class="header-anchor" href="#协商缓存" aria-label="Permalink to &quot;协商缓存&quot;">​</a></h3><blockquote><p>会去服务器比对，若没改变才直接读取本地缓存，返回的状态码是 304</p></blockquote>',36),n=[r];function o(s,d,h,T,c,g){return e(),l("div",{"data-pagefind-body":!0},n)}const S=t(a,[["render",o]]);export{P as __pageData,S as default};