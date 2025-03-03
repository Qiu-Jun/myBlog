import{_ as i,c as e,o as a,a5 as o}from"./chunks/framework.PZKd_Vnq.js";const n="/myBlog/imgs/interview/cicd-git_jk.png",r="/myBlog/imgs/interview/cicd-git_action.png",b=JSON.parse('{"title":"自动化","description":"","frontmatter":{"title":"自动化","date":"2022-08-10T10:28:00.000Z","sidebar":true,"categories":["前端","工具"],"tags":["面试","自动化部署"],"publish":true},"headers":[],"relativePath":"blogs/interview/cicd.md","filePath":"blogs/interview/cicd.md","lastUpdated":1740981322000}'),s={name:"blogs/interview/cicd.md"};function c(l,t,d,u,h,p){return a(),e("div",{"data-pagefind-body":!0},t[0]||(t[0]=[o('<h2 id="ci-cd是什么" tabindex="-1">CI/CD是什么 <a class="header-anchor" href="#ci-cd是什么" aria-label="Permalink to &quot;CI/CD是什么&quot;">​</a></h2><p><code>CI/CD</code>（Continuous Intergration/Continuous Delpoy），持续集成/持续部署，或者持续集成/持续交付（Continuous Delivery），是一种在开发阶段引入自动化来频繁交付应用的方法。从前端的角度看，CICD的流程中涉及：</p><ul><li>CI：当代码仓库代码发生变更，就会自动对代码进行测试和构建，反馈运行结果</li><li>CD：持续交付是在持续集成的基础上，可以将集成后的代码依次部署到测试环境、予发布环境、生产环境等中</li></ul><h2 id="构建-部署" tabindex="-1">构建/部署 <a class="header-anchor" href="#构建-部署" aria-label="Permalink to &quot;构建/部署&quot;">​</a></h2><p>前后端分离的开发模式中，前端项目经常会使用框架进行开发，经由 Webpack（或者其他构建工具） 打包后的SPA应用（代码），本质上都是静态资源，只需要把它们都放到 站点的静态资源目录下，配好相关的路径，即可完成部署</p><h3 id="github-jenkins" tabindex="-1">Github + Jenkins <a class="header-anchor" href="#github-jenkins" aria-label="Permalink to &quot;Github + Jenkins&quot;">​</a></h3><p><img src="'+n+'" alt=""></p><h3 id="github-actions" tabindex="-1">Github Actions <a class="header-anchor" href="#github-actions" aria-label="Permalink to &quot;Github Actions&quot;">​</a></h3><p><img src="'+r+'" alt=""></p>',9)]))}const g=i(s,[["render",c]]);export{b as __pageData,g as default};
