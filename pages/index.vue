<template>
    <div>
      <main>
        <div class="bloglist">
            <ul id="treatise-list">
                <li v-for="(item, index) in treatiseList" :key="index" >
                    <h2><nuxt-link :to="'/detail/' + item.uuid" :title="item.treatiseTitle">{{ item.treatiseTitle }}</nuxt-link></h2>
                    <p class="blogtext">{{ item.treatisePreview }}</p>
                    <p class="bloginfo">
                        <span>{{ (item.source == 1 ? '原创' : '转载') }}</span>
                        <span>{{ item.createTime }}</span>
                        <span>[<nuxt-link :to="'/knowledge/knowledge?categoryId='+ item.fId + '&thisCategory=' + item.categoryId">{{ item.categoryName }}</nuxt-link>]</span>
                        <span>阅读({{ item.readNum }})</span>
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
    </div>
</template>

<script>
import axios from 'axios';

export default {
    layout: 'blog',
    name:'index',
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
            axios.post(
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
            axios.get("/blog/blogTreatise/list", {params: self.search}).then((res) => {
                if (res.data.code == 200){
                    self.treatiseList = res.data.data.page.records;
                    self.search.total = res.data.data.page.total;
                    self.search.currentPage = res.data.data.page.current;
                    self.comsys.backToTop();
                }
            });
        }
    },
    created: function () {
        //浏览记录
        this.addRecord();
        //获取第一页文章
        this.getTreatiseList(1);
    },
    mounted() {
        
    }
}

</script>
