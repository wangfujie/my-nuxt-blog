<template>
    <main>
        <div class="address">
            <el-breadcrumb style="font-size: 15px; padding: 5px 0;" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">网站首页</el-breadcrumb-item>
                <el-breadcrumb-item>关于我</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="infosbox">
            <h1 class="infotitle">关于我</h1>
            <div class="news_con">
                <p>博主：{{ aboutMeInfo.myName }}</p>
                <p>简介：{{ aboutMeInfo.aboutMe }}</p>
                <p style="color: red;">博客运行时间：{{ runTime }}</p>
                <h2>About my blog</h2>
                <p>域 名：<a :href="aboutMeInfo.blogDomainName" target="_blank" >{{ aboutMeInfo.blogDomainName }}</a> </p>
                <p>GitHub：<a href="https://github.com/wangfujie" target="_blank" >https://github.com/wangfujie</a> </p>
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
            aboutMeInfo:{},
            runTime: ''
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
