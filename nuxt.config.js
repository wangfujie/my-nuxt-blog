const pkg = require('./package')


let config = {

  env:{
    baseUrl: process.env.baseUrl
  },

  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Mr · 王的个人博客',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 
        hid: 'keywords', 
        name: 'keywords', 
        content: 'Mr王,Mr·王,Mr · 王的个人博客,Mr王的博客,个人博客,wwolf,blog,wang' },
      { 
        hid: 'description', 
        name: 'description', 
        content: '记录日常学习和分享的个人博客，专注于java学习开发，学习任重而道远，路漫漫其修远兮，吾将上下而求索。' 
      }, 
      {
        property: 'og:locale',
        content: 'zh_CN'
      },
      {
        property: 'og:type',
        content: 'website',
      }, 
      {
        property: 'twitter:card',
        content: 'summary'
      },
      {
        property: 'twitter:site',
        content: '@wwolfwang'
      },
      {
        property: 'twitter:creator',
        content: '@wwolfwang'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/images/logo.png' }
    ],
    script: []
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '~plugins/highlight',
    '~plugins/mavonEditor',
    {
      src:'~/plugins/axios'
    },
    '@/plugins/commom'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy' //添加proxy模块
  ],

  axios: {
    proxy: true, // 开启proxy
    credentials: true
  },

  proxy: [
    [
      '/blog', 
      { 
        target: 'https://blog.wwolf.wang', 
        // target: 'http://127.0.0.1:8088', 
        changeOrigin: true,
        pathRewrite: { '^/blog' : '/blog' }  //重定向请求路径，防止路由、api路径的冲突
      }
    ]
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}

// let css = [
//   '/editor/highlightjs/styles/github.min.css',
//   '/editor/markdown/github-markdown.min.css',
//   '/editor/katex/katex.min.css'
// ]

// css.map(href => {
//   config.head.link.push({
//     rel: "stylesheet",
//     href: href
//   })
// });

// let script = [
//   "//cdn.bootcss.com/jquery/3.2.1/jquery.min.js",
//   "/editor/highlightjs/highlight.min.js",
//   // "/editor/katex/katex.min.js"
// ]

// script.map(src => {
//   config.head.script.push({
//     type: "text/javascript",
//     src: src
//   })
// });

module.exports = config;