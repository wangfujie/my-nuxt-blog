# Mr · 王的个人博客

> my blog by nuxt.js

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

# 部署前准备
1. 安装pm2进程:    npm install pm2 -g
2. 部署前先编译项目 npm install

# 部署启动
1. npm run build
2. pm2 start npm -- run start
3. pm2 list

# 重启
pm2 start xxx       #启动服务器
pm2 list            #查看运行状态
pm2 logs            #查看日志
pm2 restart xxx     #重启应用
pm2 stop xxx        #停止应用