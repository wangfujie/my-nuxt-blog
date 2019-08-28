<template>
  <div class="bodyDiv">
      <Header/>
      <div>
        <Aside/>
        <nuxt />
        <BackToTop/>
      </div>
      <Gitter/>
      <Footer/>
  </div>
</template>

<script>
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
import Aside from '~/components/aside.vue'
import BackToTop from '~/components/backToTop.vue'
import Gitter from '~/components/gitter.vue'

export default {
    name: 'blog',
    components: {
        Header,
        Footer,
        Aside,
        BackToTop,
        Gitter
    }
}
</script>

<style>
.bodyDiv {
    margin: 0;
    padding: 0;
}

body {
    font: 15px "Microsoft YaHei", Arial, Helvetica, sans-serif;
    color: #333;
    background: #F1F1F1;
    line-height: 1.5;
    margin: 0;
    padding: 0;
}

.el-card__header {
    padding: 10px 20px;
}

.el-menu--horizontal>.el-menu-item,.el-menu--horizontal>.el-submenu .el-submenu__title,.el-menu--horizontal .el-menu .el-menu-item{
    font-size: 16px;
    padding-left: 30px;
}

img {
    border: 0;
    display: block
}

.news_con li, .news_con ol {
    margin: 1em;
}

.news_con pre {
    margin-bottom: 20px;
}

.news_con code {
    font-family: Consolas;
    font-size: 14px;
}

.news_con h1, .news_con h2, .news_con h3, .news_con h4, .news_con h5, .news_con h6 {
    margin-top: 20px;
    margin-bottom: 20px;
}

.news_con h2 {
    border-bottom: 1px solid;
}

.news_con blockquote {
    border-left: .5em solid #eee;
    padding: 0 2em;
    margin-left: 0;
}

a {
    text-decoration: none;
    color: #000
}

a:hover {
    text-decoration: none;
    color: #F4650E;
    transition: 0s;
}

.clear {
    clear: both;
}

.logo {
    overflow: hidden;
    clear: both;
    height: 50px;
    line-height: 50px;
    background-image: url('/images/headerbgm.gif');
}

.logo h1 {
    font-size: 26px;
    float: left;
    margin: 0;
    padding: 0;
    margin-left: 15px;
}

.logo span {
    float: left;
    margin-left: 20px
}

.sub {
    display: none;
    background: #074979;
    overflow: hidden;
    box-shadow: 0 4px 4px rgba(0, 0, 0, .04);
    width: 110px;
    z-index: 9;
}

/*aside*/
.right_aside {
    width: 340px;
    float: right;
    margin: 16px 16px 16px 0;
}

.right_aside .box-card{
    margin-bottom: 15px;
}

.right_aside .box-card .el-card__body{
    padding: 5px 0 5px 1px;
}

.aside_box {
    border: #ddd 1px solid;
    background: #fff;
    margin-bottom: 15px;
    overflow: hidden;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

.news {
    padding: 0 10px 0 10px;
    margin-top: 0;
}

.news li, .links li {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 10px;
    position: relative;
    padding-left: 10px
}

.news li:before {
    content: "";
    width: 3px;
    height: 3px;
    background: #ccc;
    position: absolute;
    top: 10px;
    left: 0;
}

.news li a {
    color: #444;
}

.news li a:hover {
    color: #F4650E;
}

.cloud {
    padding: 10px;
    overflow: hidden
}

.cloud a {
    line-height: 24px;
    height: 24px;
    display: block;
    float: left;
    padding: 3px 8px;
    color: #333;
}

.cloud a:hover {
    color: #F4650E;
}

.links {
    padding: 10px
}

.search {
    border: 1px solid #ddd;
    background: #f8f8f8;
    position: relative;
    margin-bottom: 15px;
    float: right;
}

.search input.input_submit {
    border: 0;
    background: 0;
    color: #555;
    outline: none;
    position: absolute;
    top: 10px;
    right: 8%;
    font-weight: bold;
    cursor:pointer;
}

.search input.input_text {
    border: 0;
    line-height: 36px;
    height: 36px;
    width: 72%;
    padding-left: 10px;
    outline: none;
    border-right: #ddd 1px solid;
}

.right_aside div:last-child {
    margin-bottom: 0
}

/*main*/
main {
    margin-right: 372px;
    margin-left: 16px;
}

.head_search{
    float: right; 
    padding-right: 16px;
}

.bloglist {
    width: 100%;
    overflow: hidden;
}

.bloglist ul {
    padding: 0;
}

.bloglist li {
    list-style-type:none;
    padding-bottom: 20px;
}

.bloglist li .el-card__body {
    padding: 0 17px 3px 3px;
}

.bloglist li h2 {
    font-size: 18px;
    margin-bottom: 10px;
    margin-top: 0;
}

.bloglist li h2 span {
    background: #074979;
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    color: #fff;
    width: 40px;
    height: 24px;
    font-size: 14px;
    font-weight: normal;
    text-align: center;
    line-height: 24px;
}

.bloglist .blogtext {
    margin-bottom: 10px;
    /* height: 150px; */
    overflow: hidden;
}

.bloglist .bloginfo {
    text-align: left;
    color: #A8B1BA;
}

.bloglist .bloginfo span {
    margin: 0 0 0 8px
}

.bloglist li:last-child {
    margin-bottom: 0
}

/*footer*/
.footer-p {
    width: 100%;
    background: #074979;
    color: #a5d1f1;
    text-align: center;
    padding: 8px 0;
    clear: both;
}

.footer-p a {
    color: #a5d1f1;
}

.footer-p a:hover {
    color: #fff
}

#btn_top {
    height: 30px;
    width: 35px;
    position: fixed;
    bottom: 50px;
    right: 20px;
    display: none;
    background: rgba(0,0,0,0.1) url(/images/go-top.png) no-repeat center;
    background-size: contain;
}

#btn_top:hover{
    cursor: pointer;
}

/*list*/
.place {
    overflow: hidden;
    background: #fff;
    margin: 15px 0 5px 0;
    border: #ddd 1px solid;
    padding: 5px 10px
}

.place .categoryList {
    font-size: 16px;
    font-weight: normal;
    /* text-align: center; */
}

.place .categoryList a:hover {
    cursor: pointer;
}

.place .categoryList a:hover {
    position: relative
}

.place .categoryList a:hover:after {
    position: absolute;
    width: 100%;
    height: 3px;
    background: #4c9dd8;
    content: "";
    bottom: -5px;
    left: 0
}

#thisCategory a {
    color: #222;
    position: relative
}

#thisCategory a:after {
    position: absolute;
    width: 100%;
    height: 3px;
    background: #4c9dd8;
    content: "";
    bottom: -5px;
    left: 0
}

.place span {
    float: right;
    font-size: 14px;
}

.place span a {
    padding: 0 5px
}

.address {
    overflow: hidden;
    background: #fff;
    margin: 10px 15px;
    border: #ddd 1px solid;
    padding: 5px 10px;
}

.address a {
    padding: 0 5px;
}

/* .archivesTimeLine {
    margin: 10px 15px;
} */

.news_about {
    color: #888888;
    border: 1px solid #F3F3F3;
    padding: 10px;
    margin: 20px auto 15px auto;
    line-height: 23px;
    background: none repeat 0 0 #F6F6F6;
}

.news_about strong {
    color: #38485A;
    font-weight: 400 !important;
    font-size: 13px;
    padding-right: 8px;
}

.tags a {
    background: #074979;
    padding: 3px 8px;
    margin: 0 5px 0 0;
    color: #fff;
    transition: 1s
}

.tags a:hover {
    background: #F4650E;
    padding: 3px 8px;
    margin: 0 5px 0 0;
    color: #FFF;
    transition: 0.5s
}

.tags {
    margin: 10px 0;
}

.diggit {
    width: 160px;
    margin: auto;
    background: #E2523A;
    color: #fff;
    box-shadow: 1px 2px 6px 0px rgba(0, 0, 0, .2);
    border-radius: 3px;
    line-height: 40px;
    text-align: center;
}

.diggit a {
    color: #fff;
}

.nextinfo {
    line-height: 24px;
    width: 100%;
    overflow: hidden;
    margin: 10px 0;
}

.nextinfo p {
    padding: 4px 0;
}

.nextinfo p a,i {
    color: #2479cc;
}

.news_pl h2 {
    border-bottom: #000 2px solid;
    line-height: 40px;
    font-size: 14px;
    color: #000;
}

/*pinglun*/
.news_pl {
    overflow: hidden;
}

.saying {
    line-height: 30px;
    color: #a9a6a6;
}

.saying span {
    float: right
}

.saying span a {
    color: #de1513;
}

img#plKeyImg {
    display: inline-block;
}

.yname {
    margin: 10px 10px 10px 0
}

.yname span, .yzm span {
    padding-right: 10px;
}

.yzm {
    margin: 0 10px 10px 0
}

.gbko input[type="submit"] {
    display: block;
    background: #303030;
    color: #fff;
    border: 0;
    line-height: 30px;
    padding: 0 20px;
    border-radius: 5px;
    float: right;
}

.gbko textarea#saytext {
    width: 99%;
}

/*time*/
.timebox {
    background: #FFF;
    padding: 30px;
    border: #ddd 1px solid
}

.timebox span {
    position: relative;
    line-height: 32px;
    padding-right: 40px;
    color: #999
}

.timebox span:after {
    position: absolute;
    content: "";
    width: 2px;
    height: 40px;
    background: #e0dfdf;
    right: 18px
}

.timebox li {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.timebox li i {
    position: relative;
    font-style: normal
}

.timebox li i:before {
    content: " ";
    height: 10px;
    width: 10px;
    border: 2px solid #cccaca;
    background: #fff;
    position: absolute;
    top: 4px;
    left: -26px;
    border-radius: 50%;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -ms-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
}

.timebox li:hover i:before {
    background: #080808
}

/*留言*/
.gbinfos {
    background: #FFF;
    padding: 30px;
    border: #ddd 1px solid
}

p.fbtime {
    color: #000;
}

.fbtime span {
    float: right;
    color: #999;
    font-size: 12px;
}

.fbinfo {
    white-space:pre-wrap;
    word-wrap:break-word;
    margin: 10px 0;
}

textarea#messageContent {
    width: 100%;
}

/*

media

*/

@media only screen and (min-width: 480px) and (max-width: 767px) {
    .right_aside,.gitter-open-chat-button,.gitter-chat-embed,.head_search {
        display: none
    }

    .el-menu--horizontal>.el-menu-item,.el-menu--horizontal>.el-submenu .el-submenu__title,.el-menu--horizontal .el-menu .el-menu-item{
        font-size: 12px;
    }

    main {
        margin: 0
    }

    .gbinfos {
        padding: 10px
    }

    .bloglist li, .place, .address, .gbinfos, .timebox {
        border: none
    }

    .bloglist li h2 span {
        display: none
    }

    nav {
        height: auto;
        background: none;
        line-height: 36px
    }

    .sub {
        display: block;
        box-shadow: none;
        padding-left: 0;
        width: 100%;
        overflow: hidden;
        background: none;
        padding-bottom: 0
    }

}

@media only screen and (max-width: 479px) {
    .right_aside,.gitter-open-chat-button,.gitter-chat-embed,.head_search {
        display: none
    }

    .el-menu--horizontal>.el-menu-item,.el-menu--horizontal>.el-submenu .el-submenu__title,.el-menu--horizontal .el-menu .el-menu-item{
        font-size: 12px;
    }

    main {
        margin: 0
    }

    .gbinfos {
        padding: 10px
    }

    .bloglist li, .place, .address, .gbinfos, .timebox {
        border: none
    }

    .bloglist li h2 span {
        display: none
    }

    nav {
        height: auto;
        background: none;
        line-height: 40px
    }

    .sub {
        display: block;
        box-shadow: none;
        padding-left: 0;
        width: 100%;
        overflow: hidden;
        background: none;
        padding-bottom: 0
    }

    .address {
        font-size: 14px;
    }

    .address a {
        padding: 0 3px;
    }
}

.share {
    padding: 20px;
}

.praise {
    width: 160px;
    margin: auto;
    background: #E2523A;
    color: #fff;
    box-shadow: 1px 2px 6px 0px rgba(0, 0, 0, .2);
    border-radius: 3px;
    line-height: 40px;
    text-align: center;
}

.praise a {
    color: #fff;
}

.el-timeline {
    padding-left: 10px;
}

.el-timeline-item__node--large{
    left: -7px; 
    width: 24px; 
    height: 24px;
    background-color: #38b7ea;
}
.el-timeline-item {
    padding-bottom: 10px;
    padding-top: 10px;
}

.archives-card {
    float: right;
    margin-top: 10px;
    margin-bottom: 10px;
}

.archives-card label {
    padding-left: 10px;
}

.archives-card label span{
    padding-left: 5px;
    color: #909399;
}

.el-divider--horizontal{
    margin: 15px 0;
}
</style>