<template>
    <div>
      <Header/>
      <div>
        <div class="blank"></div>
        <Aside/>
        <main>
            <div class="place">
                <h1 id="categoryList">
                    <a v-for="category in categoryList" :key="category" @click="changeCategroy(category.id)" :id="category.tagId">{{ category.categoryName }}</a>
                </h1>
            </div>
            <div class="bloglist">
                <ul id="treatise-list">
                    <li v-for="treatise in treatiseList" :key="treatise">
                        <h2><a :href="'/knowledge/treatise-detail?uuid=' + treatise.uuid" :title="treatise.treatiseTitle">{{ treatise.treatiseTitle }}</a></h2>
                        <p class="blogtext">{{ treatise.treatisePreview }}</p>
                        <p class="bloginfo">
                            <span>{{ (treatise.source == 1 ? '原创' : '转载') }}</span>
                            <span>{{ treatise.createTime }}</span>
                            <span>[<a :href="'/knowledge/knowledge?categoryId='+ treatise.fId + '&thisCategory=' + treatise.categoryId">{{ treatise.categoryName }}</a>]</span>
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
    name:'knowledgeVue',
    components: {
        Header,
        Footer,
        Aside
    },
    data() {
        return {
            categoryFid:'',
            categoryList:[],
            treatiseList:[],
            search:{
                categoryId:'',
                keyWord:'',
                total:0,
                currentPage:1,
                pageSize:10
            }
        }
    },
    methods:{
        //获取分类
        getCategoryList(selectCategory){
            var self = this;
            axios.get("/blogCategory/getCategoryList", {params: {"categoryId":self.categoryFid}}).then((res) => {
                if (res.data.code == 200) {
                    res.data.data.list.forEach(item => {
                        if (selectCategory == item.id){
                            item['tagId'] = "thisCategory";
                        }else {
                            item['tagId'] = "";
                        }
                    });
                    self.categoryList = res.data.data.list;
                }
            });
        },
        //获取文章列表
        getTreatiseList(currentPage) {
            this.search.currentPage = currentPage;
            var self = this;
            axios.get("/blogTreatise/list", {params: self.search}).then((res) => {
                if (res.data.code == 200){
                    self.treatiseList = res.data.data.page.records;
                    self.search.total = res.data.data.page.total;
                    self.search.currentPage = res.data.data.page.current;
                }
            });
        },
        changeCategroy(selectCategory){
            this.getCategoryList(selectCategory);
            this.search.categoryId = selectCategory;
            this.getTreatiseList(1);
        }
    },
    created: function () {
        var categoryId = this.$route.query.categoryId;
        if(categoryId){
            this.categoryFid = categoryId;
        }
        var thisCategoryId = this.$route.query.thisCategory;
        this.search.categoryId = thisCategoryId;
        //获取分类信息
        this.getCategoryList(thisCategoryId);
        //获取第一页文章
        this.getTreatiseList(1);
    },
    mounted() {
        
    }
}

</script>
