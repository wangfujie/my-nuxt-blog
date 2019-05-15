<template>
    <aside>
        <div class="newsbox">
            <h2 class="hometitle">推荐</h2>
            <ul class="news">
                <li v-for="(recommend, index) in recommendList" :key="index">
                    <nuxt-link :to="'/knowledge/treatise-detail?uuid=' + recommend.uuid" :title="recommend.treatiseTitle">{{ recommend.treatiseTitle }}</nuxt-link>
                </li>
            </ul>
        </div>
        <div class="newsbox">
            <h2 class="hometitle">标签云</h2>
            <ul class="cloud">
                <nuxt-link v-for="(tag, index) in tagList" :key="index" :to="'/tags/tags?tagName=' + tag.tagName" target="_blank" >{{ tag.tagName }}</nuxt-link>
            </ul>
        </div>
        <div class="newsbox">
            <h2 class="hometitle">阅读排行</h2>
            <ul class="news">
                <li v-for="(ranking, index) in readRanking" :key="index" >
                    <nuxt-link :to="'/knowledge/treatise-detail?uuid=' + ranking.uuid" :title="ranking.treatiseTitle">{{ ranking.treatiseTitle }}</nuxt-link>
                </li>
            </ul>
        </div>
        <div class="newsbox">
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
            friendLinks:[]
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
        }
    },
    created: function () {
        //获取侧边栏部分的数据
        this.initInfo();
    }
}
</script>