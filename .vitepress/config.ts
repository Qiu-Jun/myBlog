/*
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-06-25 15:54:36
 * @LastEditors: June 1601745371@qq.com
 * @LastEditTime: 2024-04-11 16:04:26
 */
import { getThemeConfig, defineConfig } from '@sugarat/theme/node'

const blogTheme = getThemeConfig({
  // 文章默认作者
  author: 'June',
  // 看板娘
  oml2d: {
    mobileDisplay: true,
    dockedPosition: 'right',
    models: [
      {
        "path": "https://model.oml2d.com/HK416-1-normal/model.json",
        "position": [-100, 20],
        "scale": 0.08,
        "stageStyle": {
          "height": 450
        }
      },
      {
        "path": "https://model.oml2d.com/Pio/model.json",
        "scale": 0.4,
        "position": [-100, 20],
        "stageStyle": {
          "height": 300
        }
      },
      {
        path: 'https://registry.npmmirror.com/oml2d-models/latest/files/models/Senko_Normals/senko.model3.json'
      }
    ]
  },
  // 友链 
  friend: {
    list: [
      {
        nickname: '俊逸的博客',
        des: '一枚主职Java、副职前端的程序猿',
        avatar:
          'https://lijunyi2.github.io/blog/logo.png',
        url: 'https://lijunyi2.github.io/blog'
      },
      {
        nickname: '小徒弟',
        des: '',
        avatar:
          'https://wohu-weixi.gitee.io/blog_build/avatar.jpg',
        url: 'https://wohu-weixi.gitee.io/blog_build'
      },
      {
        nickname: '东咸',
        des: '杭州彭于晏分晏',
        avatar:
          '',
        url: 'https://zhao_juchang.gitee.io/zjc-vite-press'
      },
    ],
    random: false,
    limit: 3
  },
  recommend: {
    showSelf: true
  },
  // 开启离线的全文搜索支持（如构建报错可注释下面的配置再次尝试）
  search: 'pagefind',
  footer: {
    message: 'June Blog',
    copyright:
      'MIT Licensed | June ',
    // icpRecord: {
    //   name: '备案号',
    //   link: 'https://beian.miit.gov.cn/'
    // }
  },
})

const basePath = '/blog_build/'

export default defineConfig({
  base: basePath,
  extends: blogTheme,
  lang: 'zh-cn',
  title: 'June',
  description: '面对恐惧最好的办法就是面对恐惧!',
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
      {
        text: "Node",
        items: [
          { text: "Nestjs", link: "/blogs/node/nest" },
        ]
      },
      // {
      //   text: "前端",
      //   items: [
      //     { text: "面试", link: "/blogs/interview/index" },
      //     { text: "小程序", link: "/blogs/web/mini/README" },
      //   ],
      // },
      // {
      //   text: "Python",
      //   link: "/blogs/python"
      // },
      {
        text: "我的作品",
        items: [
          { text: "参与的开源", link: "/products/github" },
          { text: "工作作品", link: "/products/works" },
        ]
      },
      {
        text: '关于我',
        link: '/other/about'
      }
    ]
  }
})
