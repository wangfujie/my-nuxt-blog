<template>
    <div>
      <Header/>
      <div>
        <div class="blank"></div>
        <Aside/>
        <main>
            <div class="address">您现在的位置是：<a href="/">首页</a>&nbsp;>&nbsp;<a href="#">关于我</a></div>
            <div class="infosbox">
                <h1 class="infotitle">关于我</h1>
                <div class="news_con">
                    <p>博主：{{ aboutMeInfo.myName }}</p>
                    <p>简介：{{ aboutMeInfo.aboutMe }}</p>
                    <h2>About my blog</h2>
                    <p>域 名：<a :href="aboutMeInfo.blogDomainName" target="_blank" >{{ aboutMeInfo.blogDomainName }}</a> </p>
                    <p>服务器：{{ aboutMeInfo.serverName }}<!--<a :href="aboutMeInfo.serverLink" target="_blank" style="margin-left: 15px;"><span style="color:#FF0000;"><strong>前往阿里云官网购买&gt;&gt;</strong></span></a></p>-->
                    <p>备案号：{{ aboutMeInfo.recordNumber }}</p>
                    <p>技 术：{{ aboutMeInfo.programType }}</p>
                </div>
            </div>
        </main>
        <div class="blank"></div>
      </div>
      <Footer/>
    </div>
</template>

<script>
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
import Aside from '~/components/aside.vue'
import axios from 'axios';

export default {
    name:'aboutMeVue',
    components: {
        Header,
        Footer,
        Aside
    },
    data() {
        return {
            aboutMeInfo:{}
        }
    },
    methods:{
        initInfo:function () {
            var self = this;

            //查询关于我信息
            axios.get("/blogAboutMe/info/1").then((res) => {
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
