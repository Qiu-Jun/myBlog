/*
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-06-25 15:54:36
 * @LastEditors: June
 * @LastEditTime: 2023-06-28 22:05:15
 */
import { getThemeConfig, defineConfig } from '@sugarat/theme/node'

const blogTheme = getThemeConfig({
  // 文章默认作者
  author: 'June',
  // 友链
  friend: [
    {
      nickname: '俊逸的博客',
      des: '一枚主职Java、副职前端的程序猿',
      avatar:
        'https://lijunyi2.github.io/blog/logo.png',
      url: 'https://lijunyi2.github.io/blog'
    }
  ],
  recommend: {
    showSelf: true
  },
  // 开启离线的全文搜索支持（如构建报错可注释下面的配置再次尝试）
  search: 'pagefind',
  popover: {
    title: '公告',
    body: [
      {
        type: 'text',
        content: 'vuepress迁移vitepree 🎉🎉'
      },
      { type: 'text', content: '可能存在部分问题，如发现问题请到gitee提交issue,谢谢' },
      // {
      //   type: 'image',
      //   src: 'https://img.cdn.sugarat.top/mdImg/MTYxNTAxODc2NTIxMA==615018765210'
      // },
      {
        type: 'button',
        content: 'gitee',
        link: 'https://gitee.com/juneqiu/blog_build/issues'
      }
    ],
    duration: 0
  }
})

const basePath = '/blog_build/'

export default defineConfig({
  base: basePath,
  extends: blogTheme,
  lang: 'zh-cn',
  title: 'June',
  description: '穷其道者，归处亦同。',
  vite: {
    optimizeDeps: {
      include: ['element-plus'],
      exclude: ['@sugarat/theme']
    },
  },
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: `${basePath}favicon.ico`, type: 'image/png' }],
    [
      'link',
      {
        rel: 'alternate icon',
        href:  `${basePath}favicon.ico`,
        type: 'image/png',
        sizes: '16x16'
      }
    ],
    ['meta', { name: 'author', content: 'June' }],
    ['link', { rel: 'mask-icon', href: `${basePath}favicon.ico`, color: '#ffffff' }],
    [
      'link',
      { rel: 'apple-touch-icon', href: `${basePath}favicon.ico`, sizes: '180x180' }
    ],
  ],
  lastUpdated: true,
  themeConfig: {
    lastUpdatedText: '上次更新于',
    footer: {
      message: '自定义底部内容',
      copyright:
        'MIT Licensed | <a target="_blank" href="#"> June </a>'
    },
    logo: '/avatar.jpeg',
    // editLink: {
    //   pattern:
    //     'https://github.com/ATQQ/sugar-blog/tree/master/packages/blogpress/:path',
    //   text: '去 GitHub 上编辑内容'
    // },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/Qiu-Jun'
      }
    ],
    nav: [
      {
        text: "面试",
          link: "/blogs/interview/index"
      },
      // {
      //   text: "前端",
      //   items: [
      //     { text: "面试", link: "/blogs/interview/index" },
      //     { text: "小程序", link: "/blogs/web/mini/README" },
      //   ],
      // },
      // {
      //   text: "Node",
      //   link: "/blogs/node"
      // },
      // {
      //   text: "Python",
      //   link: "/blogs/python"
      // },
      {
        text: '关于我',
        link: '/other/about'
      }
    ]
  }
})
