import{_ as t,o as i,c as r,j as e,a,I as d,w as n,a6 as o,D as c}from"./chunks/framework.Bna9RZrE.js";const J=JSON.parse('{"title":"模块化","description":"","frontmatter":{"title":"模块化","date":"2022-01-28 15:10:00","sidebar":true,"categories":["前端"],"tags":["Javascript"],"publish":false},"headers":[],"relativePath":"blogs/interview/module.md","filePath":"blogs/interview/module.md","lastUpdated":1732882103000}'),s={name:"blogs/interview/module.md"},m=o("",20),h=e("li",null,"没有并行加载机制",-1),u=o("",4);function p(_,b,q,S,f,C){const l=c("font");return i(),r("div",{"data-pagefind-body":!0},[m,e("ul",null,[h,e("li",null,[a("由于CommonJS是同步加载模块，这对于服务器端是很不好的，因为所有的模块都放在本地硬盘。等待模块时间就是硬盘读取文件时间，很小。但是，对于浏览器而言，它需要从服务器加载模块，涉及到网速，代理等原因，一旦等待时间过长，浏览器处于”假死”状态。"),d(l,{color:"e54d42"},{default:n(()=>[a("所以浏览器端不是很适合Common.Js")]),_:1})])]),u])}const P=t(s,[["render",p]]);export{J as __pageData,P as default};