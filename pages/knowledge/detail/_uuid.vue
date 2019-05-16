<template>
    <main>
        <div class="address">
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>浏览详情</el-breadcrumb-item>
        </el-breadcrumb>
        </div>
        <div class="infoBox">
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
            <div v-html="formatEditormd(treatiseInfo.treatiseBody)" v-highlight></div>
            <p v-if="treatiseInfo.source == 2">
                转载自：
                <a target="_blank" :href="treatiseInfo.reprintUrl">{{ treatiseInfo.reprintUrl }}</a>
            </p>
            <div class="share">
                <p class="praise">
                    <a href="#2" @click="addPraiseNum"> 很赞哦！</a>
                    (<b>{{ treatiseInfo.praiseNum }}</b>)
                </p>
            </div>
            <div class="nextinfo">
                <p v-if="treatiseInfo.upBlogTreatise != null">上一篇：<nuxt-link :to="'' + treatiseInfo.upBlogTreatise.uuid">{{ treatiseInfo.upBlogTreatise.treatiseTitle }}</nuxt-link></p>
                <p v-if="treatiseInfo.upBlogTreatise == null">上一篇：<nuxt-link :to="'../knowledge?categoryId=' + treatiseInfo.fId + '&thisCategory=' + treatiseInfo.categoryId">返回列表</nuxt-link></p>

                <p v-if="treatiseInfo.downBlogTreatise != null">下一篇：<nuxt-link :to="'' + treatiseInfo.downBlogTreatise.uuid">{{ treatiseInfo.downBlogTreatise.treatiseTitle }}</nuxt-link></p>
                <p v-if="treatiseInfo.downBlogTreatise == null">下一篇：<nuxt-link :to="'../knowledge?categoryId=' + treatiseInfo.fId + '&thisCategory=' + treatiseInfo.categoryId">返回列表</nuxt-link></p>
            </div>
            <div class="news_pl">
                <h2>文章评论</h2>
                <div class="gbko">
                    <form action="" method="post" name="saypl" onsubmit="">
                        <div id="plpost">
                            <p class="saying"><span><nuxt-link to="#2">共有0条评论</nuxt-link></span>暂无评论功能...</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios';
const MarkdownIt = require("markdown-it");

export default {
    head: {
        script: [
            {src: '/ueditor/SyntaxHighlighter/shCore.js'}
        ],
        link: [
            {rel: 'stylesheet', href: '/ueditor/themes/default/css/ueditor.min.css'},
            {rel: 'stylesheet', href: '/ueditor/SyntaxHighlighter/shCoreDefault.css'},
            {rel: 'stylesheet', href: '/ueditor/themes/iframe.css'}
        ]
    },
    layout: 'blog',
    name:'treatiseDetailVue',
    data() {
        return {
            // md: new MarkdownIt(),
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
            // return this.md.render(val);
            return val;
        },
        setTitle(){
            window.document.title = this.treatiseInfo.treatiseTitle + ' - ' + this.treatiseInfo.treatisePreview;
        },
        initDatePicker : function () {
            //使代码部分高亮显示
            if(typeof(SyntaxHighlighter) == 'undefined'){
                
            }else{
                SyntaxHighlighter.all();
            }
        }
    },
    watch:{
        treatiseInfo:function(){
            //延迟加载，使代码部分高亮显示
            this.$nextTick(function () {
                this.initDatePicker();
            });
        }
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
       
    }
}

</script>
