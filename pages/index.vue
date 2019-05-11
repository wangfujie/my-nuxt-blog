<template>
    <div>
      <Header/>
      <div>
        <div class="blank"></div>
        <Aside/>
        <main>
            <div class="bloglist">
                <ul id="treatise-list">
                    <li v-for="treatise in treatiseList" :key="treatise" >
                        <h2><nuxt-link :to="'/knowledge/treatise-detail?uuid=' + treatise.uuid" :title="treatise.treatiseTitle">{{ treatise.treatiseTitle }}</nuxt-link></h2>
                        <p class="blogtext">{{ treatise.treatisePreview }}</p>
                        <p class="bloginfo">
                            <span>{{ (treatise.source == 1 ? '原创' : '转载') }}</span>
                            <span>{{ treatise.createTime }}</span>
                            <span>[<nuxt-link :to="'/knowledge/knowledge?categoryId='+ treatise.fId + '&thisCategory=' + treatise.categoryId">{{ treatise.categoryName }}</nuxt-link>]</span>
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
    name:'index',
    components: {
        Header,
        Footer,
        Aside
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
            axios.post(
                    "/api/blogLogRecord/addRecord", 
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
            axios.get("/api/blogTreatise/list", {params: self.search}).then((res) => {
                if (res.data.code == 200){
                    self.treatiseList = res.data.data.page.records;
                    self.search.total = res.data.data.page.total;
                    self.search.currentPage = res.data.data.page.current;
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
