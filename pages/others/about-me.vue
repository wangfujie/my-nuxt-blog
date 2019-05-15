<template>
    <main>
        <div class="address">您现在的位置是：<nuxt-link to="/">首页</nuxt-link>&nbsp;>&nbsp;关于我</div>
        <div class="infosbox">
            <h1 class="infotitle">关于我</h1>
            <div class="news_con">
                <p>博主：{{ aboutMeInfo.myName }}</p>
                <p>简介：{{ aboutMeInfo.aboutMe }}</p>
                <h2>About my blog</h2>
                <p>域 名：<a :href="aboutMeInfo.blogDomainName" target="_blank" >{{ aboutMeInfo.blogDomainName }}</a> </p>
                <p>服务器：{{ aboutMeInfo.serverName }}
                <p>备案号：{{ aboutMeInfo.recordNumber }}</p>
                <p>技 术：{{ aboutMeInfo.programType }}</p>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    layout: 'blog',
    name:'aboutMeVue',
    data() {
        return {
            aboutMeInfo:{}
        }
    },
    methods:{
        initInfo:function () {
            var self = this;

            //查询关于我信息
            axios.get("/blog/blogAboutMe/info/1").then((res) => {
                if (res.data.code == 200) {
                    self.aboutMeInfo = res.data.data.object;
                }
            });
        }
    },
    created: function () {
        this.initInfo();
    },
    mounted() {
        
    }
}

</script>
