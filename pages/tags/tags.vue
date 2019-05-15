<template>
    <main>
        <div class="address">
            您现在的位置是：<nuxt-link to='/'>首页</nuxt-link>&nbsp;>&nbsp;标签信息列表&nbsp;>&nbsp;
        </div>
        <div class="bloglist">
            <ul>
                <li v-for="(treatise,index) in treatiseList" :key="index">
                    <h2><nuxt-link :to="'/knowledge/detail/' + treatise.uuid">{{ treatise.treatiseTitle }}</nuxt-link></h2>
                    <p class="blogtext">{{ treatise.treatisePreview }}</p>
                    <p class="bloginfo">
                        <span>{{ treatise.sourceName }}</span>
                        <span>{{ treatise.createTime }}</span>
                        <span>[<nuxt-link to="#2">{{ treatise.categoryName }}</nuxt-link>]</span>
                        <span>阅读({{ treatise.readNum }})</span>
                    </p>
                </li>
            </ul>
        </div>
        <!-- <div ref="pageListDiv" class="m-style pageList"></div> -->
        <el-pagination style="margin-top: 15px;"
            background
            layout="prev, pager, next"
            @current-change="getTreatiseList"
            :current-page.sync="search.currentPage"
            :page-size="search.pageSize"
            :total="search.total">
        </el-pagination>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    layout: 'blog',
    name:'tagsVue',
    data() {
        return {
            treatiseList:[],
            search:{
                tagInfo:'',
                keyWord:'',
                total:0,
                currentPage:1,
                pageSize:10
            }
        }
    },
    methods:{
        //获取文章列表
        getTreatiseList(currentPage) {
            this.search.currentPage = currentPage;
            var self = this;
            axios.get("/blog/blogTreatise/list", {params: self.search}).then((res) => {
                if (res.data.code == 200){
                    self.treatiseList = res.data.data.page.records;
                    self.search.total = res.data.data.page.total;
                    self.search.currentPage = res.data.data.page.current;
                }else if(res.data.code == 404){
                    self.treatiseList = [];
                    self.search.total = 0;
                    self.search.currentPage = 0;
                }
            });
        }
    },
    created: function () {
        var tagName = this.$route.query.tagName;
        this.search.tagInfo = tagName;
        //获取第一页文章
        this.getTreatiseList(1);
    },
    mounted() {
        
    }
}

</script>
