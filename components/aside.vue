<template>
    <aside class="right_aside">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <b>关于</b>
            </div>
            <div class="text" >
                <!-- <p>博主：{{ aboutMeInfo.myName }}</p> -->
                <!-- <p>简介：{{ aboutMeInfo.aboutMe }}</p> -->
                <el-row >
                    <el-col :span="12">
                        <el-image src="/images/qrcode_wechat.jpg" style="width: 150px; height: 150px" fit="cover"></el-image>
                    </el-col>
                    <el-col :span="12" style="margin-top: 6px; color: #sadas;">
                        <b>{{ aboutMeInfo.myName }}</b>
                        <p><b>已运行：{{ runTime }}</b></p>
                        <p><b>总访问量：{{ aboutMeInfo.browseTotal }}</b></p>
                        <p><b>今日访问量：{{ aboutMeInfo.todayBrowse }}</b></p>
                    </el-col>
                </el-row>

                <el-divider></el-divider>
                <el-row style="text-align: center;">
                    <el-col :span="6">
                        <a href="https://github.com/wangfujie" target="_blank"><el-image src="/images/about/github.png" style="width: 35px; height: 35px" fit="contain"></el-image></a>
                    </el-col>
                    <el-col :span="6">
                        <a href="https://weibo.com/2664230685/profile" target="_blank"><el-image src="/images/about/weibo.png" style="width: 35px; height: 35px" fit="contain"></el-image></a>
                    </el-col>
                    <el-col :span="6">
                        <a href="https://twitter.com/wwolfwang" target="_blank"><el-image src="/images/about/twitter.png" style="width: 35px; height: 35px" fit="contain"></el-image></a>
                    </el-col>
                    <el-col :span="6">
                        <a href="https://blog.csdn.net/a7847" target="_blank"><el-image src="/images/about/csdn.png" style="width: 35px; height: 35px" fit="contain"></el-image></a>
                    </el-col>
                </el-row>
            </div>
        </el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <b>推荐</b>
            </div>
            <div class="text item">
                <ul class="news">
                    <li v-for="(recommend, index) in recommendList" :key="index">
                        <nuxt-link :to="'/detail/' + recommend.uuid" :title="recommend.treatiseTitle">{{ recommend.treatiseTitle }}</nuxt-link>
                    </li>
                </ul>
            </div>
        </el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <b>标签云</b>
            </div>
            <div class="text item">
                <ul class="cloud">
                    <nuxt-link v-for="(tag, index) in tagList" :key="index" :to="'/tags/tags?tagName=' + tag.tagName" target="_blank" >{{ tag.tagName }}</nuxt-link>
                </ul>
            </div>
            
        </el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <b>阅读排行</b>
            </div>
            <div class="text item">
                <ul class="news">
                    <li v-for="(ranking, index) in readRanking" :key="index" >
                        <nuxt-link :to="'/detail/' + ranking.uuid" :title="ranking.treatiseTitle">{{ ranking.treatiseTitle }}</nuxt-link>
                    </li>
                </ul>
            </div>
        </el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <b>友情链接</b>
            </div>
            <div class="text item">
                <ul class="links">
                    <li v-for="(link, index) in friendLinks" :key="index" >
                        <a :href="link.linkUrl" :title="link.linkTitle" target="_blank">{{ link.linkTitle }}</a>
                    </li>
                </ul>
            </div>
        </el-card>
    </aside>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            recommendList:[],
            tagList:[],
            readRanking:[],
            friendLinks:[],
            aboutMeInfo:{},
            runTime: ''
        };
    },
    methods:{
        initInfo() {
            var self = this;

            // 推荐
            axios.get("/blog/blogTreatise/getRecommend").then((res) => {
                if (res.data.code == 200){
                    self.recommendList = res.data.data.list;
                }
            });
        
            //标签云
            axios.get("/blog/blogTags/getShowTags").then((res) => {
                if (res.data.code == 200){
                    self.tagList = res.data.data.list;
                }
            });

            //阅读排行，10条
            axios.get("/blog/blogTreatise/getReadRanking").then((res) => {
                if (res.data.code == 200){
                    self.readRanking = res.data.data.page.records;
                }
            });

            // 友情链接查询
            axios.get("/blog/blogFriendlyLinks/list").then((res) => {
                if (res.data.code == 200){
                    self.friendLinks = res.data.data.page.records;
                }
            });

            //查询关于我信息
            axios.get("/blog/blogAboutMe/info/1").then((res) => {
                if (res.data.code == 200) {
                    self.aboutMeInfo = res.data.data.object;
                    self.aboutMeInfo.browseTotal = res.data.browseTotal;
                    self.aboutMeInfo.todayBrowse = res.data.todayBrowse;
                }
            });
        }
    },
    created: function () {
        //获取侧边栏部分的数据
        this.initInfo();
    },
    mounted() {
        var self = this;
        setTimeout(function() {
            self.runTime = self.comsys.timeFn(self.aboutMeInfo.domainTime);
        }, 1000);
    }
}
</script>