<template>
    <div>
      <main>
        <div class="bloglist">
            <ul id="treatise-list">
                <li v-for="(item, index) in treatiseList" :key="index" >
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <h2><nuxt-link :to="'/detail/' + item.uuid" :title="item.treatiseTitle">{{ item.treatiseTitle }}</nuxt-link></h2>
                            <div style="color:#A8B1BA;margin-bottom: 10px;">{{ item.createTime }}</div>
                            <div class="blogtext">{{ item.treatisePreview }}</div>
                            <!-- <div class="blogtext" v-html="item.treatiseBody" ></div> -->
                        </div>
                        <p class="bloginfo">
                            <span>{{ (item.source == 1 ? '原创' : '转载') }}</span>
                            
                            <span>[<nuxt-link :to="'/knowledge/knowledge?categoryId='+ item.fId + '&thisCategory=' + item.categoryId">{{ item.categoryName }}</nuxt-link>]</span>
                            <span>阅读({{ item.readNum }})</span>
                            <nuxt-link class="el-button el-button--primary" :to="'/detail/' + item.uuid" style="float:right;line-height: 6px;">阅读全文</nuxt-link>
                        </p>
                    </el-card>
                </li>
            </ul>
<!-- 
            <ul id="treatise-list">
                <li v-for="(item, index) in treatiseList" :key="index" >
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <h2><nuxt-link :to="'/detail/' + item.uuid" :title="item.treatiseTitle">{{ item.treatiseTitle }}</nuxt-link></h2>
                            <div style="color:#A8B1BA;margin-bottom: 10px;">{{ item.createTime }}</div>
                            <div class="blogtext">{{ item.treatisePreview }}</div>
                        </div>
                        <p class="bloginfo">
                            <span>{{ (item.source == 1 ? '原创' : '转载') }}</span>
                            
                            <span>[<nuxt-link :to="'/knowledge/knowledge?categoryId='+ item.fId + '&thisCategory=' + item.categoryId">{{ item.categoryName }}</nuxt-link>]</span>
                            <span>阅读({{ item.readNum }})</span>
                            <nuxt-link class="el-button el-button--primary" :to="'/detail/' + item.uuid" style="float:right;line-height: 6px;">阅读全文</nuxt-link>
                        </p>
                    </el-card>
                </li>
            </ul> -->
        </div>

        <el-pagination style="margin: 10px 0;"
            background
            layout="prev, pager, next"
            @current-change="getTreatiseList"
            :current-page.sync="search.currentPage"
            :page-size="search.pageSize"
            :total="search.total">
        </el-pagination>
      </main>
    </div>
</template>

<script>
// import axios from 'axios';

export default {
    layout: 'blog',
    name:'index',
    async asyncData({ $axios }){
        let {data} = await $axios.get("/blog/blogTreatise/list");
        return {
            treatiseList: data.data.page.records,
            search:{
                total: data.data.page.total,
                currentPage: data.data.page.current
            }
        }
    },
    data() {
        return {
            treatiseList:[],
            search:{
                keyWord:'',
                total:0,
                currentPage:1,
                pageSize:10
            }
        }
    },
    methods:{
        addRecord(){
            //增加网站浏览记录
            this.$axios.post(
                    "/blog/blogLogRecord/addRecord", 
                    {"recordType": 3}
                ).then((res) => {
                if (res.data.code == 200) {
                    console.log(res.data.code);
                }
            });

        },
        //获取文章列表
        getTreatiseList(currentPage) {
            this.search.currentPage = currentPage;
            var self = this;
            this.$axios.get("/blog/blogTreatise/list", {params: self.search}).then((res) => {
                if (res.data.code == 200){
                    self.treatiseList = res.data.data.page.records;
                    self.search.total = res.data.data.page.total;
                    self.search.currentPage = res.data.data.page.current;
                    self.comsys.backToTop();
                }
            });
        }
    },
    mounted: function () {
        //浏览记录
        this.addRecord();
        //获取第一页文章
        // this.getTreatiseList(1);
    },
    head() {
        return {
            title: this.comsys.getBlogTitle("首页")
        };
    }
}

</script>
