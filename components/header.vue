<template>
    <div id="headerMenu">
        <div class="logo">
            <h1><nuxt-link to="/">Mr · 王</nuxt-link></h1>
            <span>路漫漫其修远兮，吾将上下而求索。</span>
        </div>
        <nav>
            <!-- <h2 id="mnavh"><span class="navicon"></span></h2> -->
            <el-menu
                router
                class="el-menu-demo"
                mode="horizontal"
                background-color="#074979"
                text-color="#dedede"
                active-text-color="#ffd04b"
                style="padding-left: 15px;">
                <el-menu-item index="/">首页</el-menu-item>
                <template v-for="(head,index) in headMenu">
                    <el-menu-item :key="index" v-if="head.subNodeList != null && head.subNodeList.length <= 0" :index="head.linkUrl">{{ head.categoryName }}</el-menu-item>
                    <el-submenu v-else :key="index" :index="head.linkUrl">
                        <template slot="title">{{ head.categoryName }}</template>
                        <el-menu-item v-for="(subNode, index) in head.subNodeList" :key="index" :index="subNode.linkUrl">{{ subNode.categoryName }}</el-menu-item>
                    </el-submenu>
                </template>
                <div style="float: right; padding-right: 17px;">
                    <el-input v-model="keyWork" placeholder="请输入内容" clearable>
                        <el-button slot="append" icon="el-icon-search" @click="searchData()"></el-button>
                    </el-input>
                </div>
            </el-menu>
        </nav>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            keyWork:'',
            headMenu:[]
        };
    },
    methods:{
        initInfo:function () {
            var self = this;

            //获取公共头菜单列表
            axios.get("/blog/blogCategory/getBlogMenuNode").then((res) => {
                if (res.data.code == 200){
                    self.headMenu = res.data.data.list;
                }
            });
            
        },
        searchData:function(){
            let linkUrl = "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=site%3Ablog.wwolf.wang%20" + this.keyWork
            window.open(linkUrl);
        }
    },
    created: function () {
        //获取公共部分数据初始数据
        this.initInfo();
    }
}
</script>