<template>
    <main>
        <div class="place">
            <el-row>
                <el-col class="categoryList" :span="spanSize" v-for="(category, index) in categoryList" :key="index" :id="category.tagId">
                    <a @click="changeCategroy(category.id)" >{{ category.categoryName }}</a>
                </el-col>
            </el-row>
        </div>
        <div class="bloglist">
            <ul id="treatise-list">
                <li v-for="(treatise, index) in treatiseList" :key="index">
                    <h2><nuxt-link :to="'/detail/' + treatise.uuid" :title="treatise.treatiseTitle">{{ treatise.treatiseTitle }}</nuxt-link></h2>
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
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
import Aside from '~/components/aside.vue'
// import axios from 'axios';

export default {
    layout: 'blog',
    name:'resourcesVue',
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
            },
            spanSize: "6"
        }
    },
    methods:{
        //获取分类
        getCategoryList(selectCategory){
            var self = this;
            this.$axios.get("/blog/blogCategory/getCategoryList", {params: {"categoryId":self.categoryFid}}).then((res) => {
                if (res.data.code == 200) {
                    res.data.data.list.forEach(item => {
                        if (selectCategory == item.id){
                            item['tagId'] = "thisCategory";
                            //设置选中类名称为标题
                            this.comsys.setTheTitle("分类:" + item.categoryName);
                        }else {
                            item['tagId'] = "";
                        }
                    });
                    self.categoryList = res.data.data.list;
                    self.spanSize = Math.floor(24 / self.categoryList.length);
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
                }else if(res.data.code == 404){
                    self.treatiseList = [];
                    self.search.total = 0;
                    self.search.currentPage = 0;
                }
            });
        },
        changeCategroy(selectCategory){
            this.getCategoryList(selectCategory);
            this.search.categoryId = selectCategory;
            this.getTreatiseList(1);
        }
    },
    mounted: function () {
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
    head() {
        return {
            title: this.comsys.getBlogTitle("资源分类")
        };
    }
}

</script>
