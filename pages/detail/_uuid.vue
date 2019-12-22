<template>
    <section>
        <mip-cambrian site-id="1635145027048045"></mip-cambrian>
        <loading :show="loading"></loading>
        <main>
            <div class="address">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>浏览详情</el-breadcrumb-item>
            </el-breadcrumb>
            </div>
            <article class="infoBox" style="margin: 10px;">
                <h1 class="infoTitle">{{ treatiseInfo.treatiseTitle }}</h1>
                <p class="blogInfo">
                    <span>{{ treatiseInfo.sourceName }}</span>
                    <span>{{ treatiseInfo.createTime }}</span>
                    <span>{{ treatiseInfo.categoryName }}</span>
                    <span>阅读(<b>{{ treatiseInfo.readNum }}</b>)</span>
                </p>
                <div class="tags" id="the_tags" v-if="treatiseInfo.tags != null">
                    <a href="#2" v-for="(tag, index) in treatiseInfo.tagsList" :key="index">{{ tag }}</a>
                </div>
                <div class="news_about">
                    <strong>简介</strong>
                    {{ treatiseInfo.treatisePreview }}
                </div>
                <div v-html="formatEditormd(treatiseInfo.treatiseBody)" ></div>
                <!-- <div v-html="formatEditormd(treatiseInfo.treatiseBody)" v-highlight></div> -->
                <p v-if="treatiseInfo.source == 2">
                    转载自：
                    <a target="_blank" :href="treatiseInfo.reprintUrl">{{ treatiseInfo.reprintUrl }}</a>
                </p>
                <div class="share">
                    <div class="praise">
                        <a href="#2" @click="addPraiseNum"> 很赞哦！</a>
                        (<b>{{ treatiseInfo.praiseNum }}</b>)
                    </div>
                    <div id="socialShare" style="text-align: right;"></div>
                </div>
                <div class="nextinfo">
                    <el-row type="flex" class="row-bg" justify="space-between">
                        <el-col :span="18">
                            <p v-if="treatiseInfo.upBlogTreatise != null" >
                                <i class="el-icon-arrow-left"></i>
                                <nuxt-link :to="'' + treatiseInfo.upBlogTreatise.uuid">{{ treatiseInfo.upBlogTreatise.treatiseTitle }}</nuxt-link>
                            </p>
                        </el-col>
                        <el-col :span="18">
                            <p v-if="treatiseInfo.downBlogTreatise != null" style="float:right;">
                                <nuxt-link :to="'' + treatiseInfo.downBlogTreatise.uuid">{{ treatiseInfo.downBlogTreatise.treatiseTitle }}</nuxt-link>
                                <i class="el-icon-arrow-right"></i>
                            </p>
                        </el-col>
                    </el-row>
                </div>
                <div id="gitalk-container"></div>
            </article>
        </main>
    </section>
</template>
<style>
    .gt-container .gt-meta {
        height: 60px;
    }
</style>

<script>
import axios from 'axios';
import 'gitalk/dist/gitalk.css';
import 'mavon-editor/dist/highlightjs/styles/tomorrow-night-eighties.min.css';
import 'social-share.js/dist/css/share.min.css';
import 'social-share.js/dist/js/social-share.min.js';
import Gitalk from 'gitalk';
// const MarkdownIt = require("markdown-it");

export default {
       asyncData({
            params,
            error
        }) {
            return axios
            .get("/blog/blogTreatise/info/" + params.uuid)
            .then(res => {
                if (res.data.data.object == null) {
                    return error({
                        statusCode: 404,
                        message: "对不起，没有找到这个页面"
                    });
                }
                //处理标签，转数组
                var tags = res.data.data.object.tags;
                if (tags){
                    res.data.data.object.tagsList = tags.split(",");
                }
                return {
                    treatiseInfo: res.data.data.object,
                    loading: false
                };
            })
            .catch(e => {
                error({
                statusCode: 500,
                message: e.message
                });
            });
        },
    layout: 'blog',
    name:'treatiseDetailVue',
    // async asyncData({ params, $axios, error }){
    //     // let {data} = await $axios.get("/blog/blogTreatise/list");
    //     let {data} = await $axios.get("/blog/blogTreatise/info/" + params.uuid);
    //     if (data.data.object == null) {
    //         return error({
    //             statusCode: 404,
    //             message: "对不起，没有找到这个页面"
    //         });
    //     }
    //     //处理标签，转数组
    //     var tags = data.data.object.tags;
    //     if (tags){
    //         data.data.object.tagsList = tags.split(",");
    //     }
    //     return {
    //         treatiseInfo: data.data.object,
    //         loading: false
    //     }
    // },
                
    data() {
        return {
            // md: new MarkdownIt(),
            loading: true
        }
    },
    methods:{
        addPraiseNum() {
            var self = this;
            axios.post(
                    "/blog/blogLogRecord/addRecord", 
                    {"recordType": 1, "treatiseUuid":self.treatiseInfo.uuid}
                ).then((res) => {
                if (res.data.code == 200) {
                    self.treatiseInfo.praiseNum = self.treatiseInfo.praiseNum + 1;
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                }else {
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    });
                }
            });
        },
        formatEditormd(val) {
            // return this.md.render(val);
            return val;
        },
        gitalkComment: function(uuid){
            //gitalk评论
            var gitalk = new Gitalk({
                // gitalk的主要参数
                clientID: 'f23525c2dbbbc318f6e6',
                clientSecret: 'de450d38b4e67af7450d893bce46b32848899a0c',
                repo: 'blog-comment',
                owner: 'wangfujie',
                admin: ['wangfujie'],
                id: uuid,
            });
            gitalk.render("gitalk-container");
        },
        aSocialShare:function(){
            //一键分享
            var $config = {
                title: this.title,
                description: this.treatiseInfo.treatisePreview,
                sites: ['qzone', 'qq', 'weibo','wechat']
            }
            socialShare('#socialShare', $config);
        }
    },
    computed: {
        location_href() {
            return (
                (!process.server ? window.location.origin : "https://blog.wwolf.wang") +
                "/detail/" +
                this.$route.params.uuid
            );
        },
        title() {
            // return this.comsys.getBlogTitle(this.treatiseInfo.treatiseTitle);
            return this.treatiseInfo.treatiseTitle + " | Mr王的博客";
        },
        description() {
            return this.treatiseInfo.treatisePreview
                .substring(0, 150)
                .replace(/\r\n/g, "")
                .replace(/\n/g, "")
                .replace(/#+/g, ",") + "...";
        }
    },
    mounted() {
        //加载评论
        this.gitalkComment(this.$route.params.uuid);
        //设置分享
        this.aSocialShare();
    },
    head() {
        let config = {
                title: this.title,
                meta: [
                    {
                        hid: "description",
                        name: "description",
                        content: this.description
                    }
                ],
                link: [
                    {
                        rel: "canonical",
                        href: this.location_href
                    }
                ]
            };
            const og = [{
                    property: "og:type",
                    content: "article"
                },
                {
                    property: "og:title",
                    content: this.title
                },
                {
                    property: "og:description",
                    content: this.description
                },
                {
                    property: "og:url",
                    content: this.location_href
                },
                {
                    property: "og:site_name",
                    content: "Mr王的博客"
                }
            ];
            const twitter = [{
                    property: "twitter:description",
                    content: this.description
                },
                {
                    property: "twitter:title",
                    content: this.title
                }
            ];
            config.meta = config.meta.concat(og, twitter);
            return config;
    }
}
</script>