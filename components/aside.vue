<template>
    <aside class="right_aside">
        <div class="aside_box">
            <h2 class="hometitle">关于</h2>
            <div style="padding: 8px;">
                <!-- <p>博主：{{ aboutMeInfo.myName }}</p> -->
                <!-- <p>简介：{{ aboutMeInfo.aboutMe }}</p> -->
                <el-row >
                    <el-col :span="12">
                        <el-image src="/images/qrcode_wechat.jpg" style="width: 150px; height: 150px" fit="cover"></el-image>
                    </el-col>
                    <el-col :span="12" style="margin-top: 10px;line-height: 45px; color: #sadas;">
                        <b>{{ aboutMeInfo.myName }}</b>
                        <p><b>已运行：{{ runTime }}</b></p>
                        <b><span>访问：{{ aboutMeInfo.browseTotal }}</span></b>
                    </el-col>
                    
                </el-row>
                
                <el-divider></el-divider>
                <el-row style="text-align: center;">
                    <el-col :span="8">
                        <a href="https://github.com/wangfujie" target="_blank"><el-image src="/images/about/github.png" style="width: 35px; height: 35px" fit="contain"></el-image></a>
                    </el-col>
                    <el-col :span="8">
                        <a href="https://blog.csdn.net/a7847" target="_blank"><el-image src="/images/about/csdn.png" style="width: 35px; height: 35px" fit="contain"></el-image></a>
                    </el-col>
                    <el-col :span="8">
                        <a href="https://weibo.com/2664230685/profile" target="_blank"><el-image src="/images/about/weibo.png" style="width: 35px; height: 35px" fit="contain"></el-image></a>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="aside_box">
            <h2 class="hometitle">推荐</h2>
            <ul class="news">
                <li v-for="(recommend, index) in recommendList" :key="index">
                    <nuxt-link :to="'/detail/' + recommend.uuid" :title="recommend.treatiseTitle">{{ recommend.treatiseTitle }}</nuxt-link>
                </li>
            </ul>
        </div>
        <div class="aside_box">
            <h2 class="hometitle">标签云</h2>
            <ul class="cloud">
                <nuxt-link v-for="(tag, index) in tagList" :key="index" :to="'/tags/tags?tagName=' + tag.tagName" target="_blank" >{{ tag.tagName }}</nuxt-link>
            </ul>
        </div>
        <div class="aside_box">
            <h2 class="hometitle">阅读排行</h2>
            <ul class="news">
                <li v-for="(ranking, index) in readRanking" :key="index" >
                    <nuxt-link :to="'/detail/' + ranking.uuid" :title="ranking.treatiseTitle">{{ ranking.treatiseTitle }}</nuxt-link>
                </li>
            </ul>
        </div>
        <div class="aside_box">
            <h2 class="hometitle">友情链接</h2>
            <ul class="links">
                <li v-for="(link, index) in friendLinks" :key="index" >
                    <a :href="link.linkUrl" :title="link.linkTitle" target="_blank">{{ link.linkTitle }}</a>
                </li>
            </ul>
        </div>
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
        this.timer = setInterval(function() {
            self.runTime = self.comsys.timeFn(self.aboutMeInfo.domainTime);
        }, 1000);
    },
    beforeDestroy(){
        if(this.timer){
            clearInterval(this.timer);
        }
    }
}
</script>