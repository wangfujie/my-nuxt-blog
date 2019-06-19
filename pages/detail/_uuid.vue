<template>
    <main>
        <div class="address">
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>浏览详情</el-breadcrumb-item>
        </el-breadcrumb>
        </div>
        <div class="infoBox" style="margin: 10px;">
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
        </div>
    </main>
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
const MarkdownIt = require("markdown-it");

export default {
    // head: {
    //     script: [
    //         {src: '/ueditor/SyntaxHighlighter/shCore.js'}
    //     ],
    //     link: [
    //         {rel: 'stylesheet', href: '/ueditor/themes/default/css/ueditor.min.css'},
    //         {rel: 'stylesheet', href: '/ueditor/SyntaxHighlighter/shCoreDefault.css'},
    //         {rel: 'stylesheet', href: '/ueditor/themes/iframe.css'}
    //     ]
    // },
    layout: 'blog',
    name:'treatiseDetailVue',
    data() {
        return {
            md: new MarkdownIt(),
            treatiseInfo:{}
        }
    },
    methods:{
        //查询详情
        getTreatiseDetail(treatiseUuid) {
            var self = this;
            axios.get("/blog/blogTreatise/info/" + treatiseUuid).then((res) => {
                if (res.data.code == 200) {
                    var tags = res.data.data.object.tags;
                    if (tags){
                        res.data.data.object.tagsList = tags.split(",");
                    }
                    self.treatiseInfo = res.data.data.object;
                    //设置title
                    self.setTitle();
                    //设置分享
                    self.aSocialShare();
                }
            });
        },
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
            }).fail((val) => {
                this.$message.error('您点的太快了！不能太快哦！');
            });
        },
        formatEditormd(val) {
            //return this.md.render(val);
            return val;
        },
        setTitle(){
            window.document.title = this.treatiseInfo.treatiseTitle + ' - ' + 'Mr · 王的博客';
        },
        //百度富文本的代码高亮
        initDatePicker : function () {
            //使代码部分高亮显示
            if(typeof(SyntaxHighlighter) == 'undefined'){
                
            }else{
                SyntaxHighlighter.all();
            }
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
            var title = this.treatiseInfo.treatiseTitle + ' - ' + 'Mr · 王的博客';
            var $config = {
                title: title,
                description: this.treatiseInfo.treatisePreview,
                sites: ['qzone', 'qq', 'weibo','wechat']
            }
            socialShare('#socialShare', $config);
        }
    },
    watch:{
        // treatiseInfo:function(){
        //     //延迟加载，使代码部分高亮显示
        //     this.$nextTick(function () {
        //         this.initDatePicker();
        //     });
        // }
    },
    created: function () {
        var uuid = this.$route.params.uuid;
        //如果传有主键uuid，则加载详情数据
        if (uuid){
            //初始化数据
            this.getTreatiseDetail(uuid);
        }
    },
    mounted() {
        //加载评论
        var uuid = this.$route.params.uuid;
        if (uuid){
            this.gitalkComment(uuid);
        }
    }
}

</script>