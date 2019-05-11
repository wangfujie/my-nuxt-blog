<template>
    <aside>
        <div class="newsbox">
            <h2 class="hometitle">推荐</h2>
            <ul class="news">
                <li v-for="recommend in recommendList" :key="recommend">
                    <nuxt-link :to="'/knowledge/treatise-detail?uuid=' + recommend.uuid" :title="recommend.treatiseTitle">{{ recommend.treatiseTitle }}</nuxt-link>
                </li>
            </ul>
        </div>
        <div class="newsbox">
            <h2 class="hometitle">标签云</h2>
            <ul class="cloud">
                <nuxt-link v-for="tag in tagList" :key="tag" :to="'/tags/tags?tagName=' + tag.tagName" target="_blank" >{{ tag.tagName }}</nuxt-link>
            </ul>
        </div>
        <div class="newsbox">
            <h2 class="hometitle">阅读排行</h2>
            <ul class="news">
                <li v-for="ranking in readRanking" :key="ranking" ><nuxt-link :to="'/knowledge/treatise-detail?uuid=' + ranking.uuid" :title="ranking.treatiseTitle">{{ ranking.treatiseTitle }}</nuxt-link></li>
            </ul>
        </div>
        <div class="newsbox">
            <h2 class="hometitle">友情链接</h2>
            <ul class="links">
                <li v-for="link in friendLinks" :key="link" ><nuxt-link :to="link.linkUrl" :title="link.linkTitle" target="_blank">{{ link.linkTitle }}</nuxt-link></li>
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
            axios.get("/api/blogTreatise/getRecommend").then((res) => {
                if (res.data.code == 200){
                    self.recommendList = res.data.data.list;
                }
            });
        
            //标签云
            axios.get("/api/blogTags/getShowTags").then((res) => {
                if (res.data.code == 200){
                    self.tagList = res.data.data.list;
                }
            });

            //阅读排行，10条
            axios.get("/api/blogTreatise/getReadRanking").then((res) => {
                if (res.data.code == 200){
                    self.readRanking = res.data.data.page.records;
                }
            });

            // 友情链接查询
            axios.get("/api/blogFriendlyLinks/list").then((res) => {
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