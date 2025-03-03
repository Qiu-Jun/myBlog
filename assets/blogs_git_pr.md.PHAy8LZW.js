import{_ as i,c as a,o as t,a5 as n}from"./chunks/framework.PZKd_Vnq.js";const g=JSON.parse('{"title":"如何给开源项目提pr","description":"","frontmatter":{"title":"如何给开源项目提pr","date":"2022-01-23T00:00:00.000Z","sidebar":false,"categories":["工具"],"tags":["Git"],"publish":false},"headers":[],"relativePath":"blogs/git/pr.md","filePath":"blogs/git/pr.md","lastUpdated":1740981322000}'),l={name:"blogs/git/pr.md"};function p(h,s,e,k,F,r){return t(),a("div",{"data-pagefind-body":!0},s[0]||(s[0]=[n(`<ul><li>fork开源项目</li><li>clone fork下来的仓库到本地</li><li>修改代码(我一般用sourcetree提交)</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 创建分支</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> checkout</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -b</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;&#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> filename</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> commit</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -m</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;&#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> push</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> origin</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> branchname</span></span></code></pre></div><ul><li>获取更新提交</li></ul><blockquote><p>先更新最新的代码<br><strong>rebase</strong>形成的是一条线，会把你当前的几个commit，放到最新commit的后面<br><strong>merge</strong>会把公共分支和你当前的commit按照提交时间合并在一起，形成一个新的commit提交， git pull = fetch + merge</p></blockquote><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 设置upstream为开源地址</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> remote</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> upstream</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 开源地址</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 获取更新</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> fetch</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> upstream</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 合并更新</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rebase</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> upstream/master</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 冲突</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 修改冲突后的文件，</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 冲突文件</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> commit</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rebase</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --continue</span></span></code></pre></div><ul><li>创建pr</li></ul><blockquote><p>打开fork的项目新建pull request</p></blockquote>`,7)]))}const o=i(l,[["render",p]]);export{g as __pageData,o as default};
