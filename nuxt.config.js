const pkg = require('./package');

let config = {

  mode: 'universal',

  head: {
    title: 'Mr王的个人博客',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 
        hid: 'keywords', 
        name: 'keywords', 
        content: 'Mr王,Mr·王,Mr·王的个人博客,Mr王的博客,个人博客,wwolf,blog,wang,王帅比的博客,王帅比' },
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
    'element-ui/lib/theme-chalk/index.css',
    '~assets/css/blog_all.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/element-ui',
    '~plugins/highlight',
    '~plugins/mavonEditor',
    {
      src:'~/plugins/axios'
    },
    '~plugins/commom',
    '~plugins/loading',
  ],
  loading: {
    color: '#29d'
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/google-adsense',
    '@nuxtjs/axios'
  ],

  'google-adsense': {
    id: 'ca-pub-5986732081406641'
  },

  axios: {
    proxy: true, // 开启proxy
    credentials: true
  },

  proxy: [
    [
      '/blog/', 
      { 
        // target: 'https://blog.luckfools.top', 
        target: 'http://127.0.0.1:8088', 
        changeOrigin: true,
        pathRewrite: { '^/blog' : '/blog' }  //重定向请求路径，防止路由、api路径的冲突
      }
    ]
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios', 'element-ui', 'web-storage-cache', 'moment'],
    extractCSS: true,
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}

// let css = [
//   'gitalk/dist/gitalk.css',
//   'mavon-editor/dist/highlightjs/styles/tomorrow-night-eighties.min.css',
//   'social-share.js/dist/css/share.min.css'
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
