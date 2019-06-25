<template>
    <main>
        <div class="address">
            您现在的位置是：<nuxt-link to='/'>首页</nuxt-link>&nbsp;>&nbsp;标签信息列表&nbsp;>&nbsp;
        </div>
        <div class="archivesTimeLine">
            <el-timeline>
                <el-timeline-item size="large" icon="el-icon-collection">
                    <span style="font-size: 20px;">{{ search.tagInfo }}</span>
                </el-timeline-item>
                <el-timeline-item v-for="(treatise, index) in treatiseList" :key="index" color="#38b7ea">
                    <el-card>
                        <div slot="header" class="clearfix">
                            <h3><nuxt-link :to="'/detail/' + treatise.uuid">{{ treatise.treatiseTitle }}</nuxt-link></h3>
                        </div>
                        <div>
                            {{ treatise.treatisePreview }}
                        </div>
                        <div class="archives-card">
                            <label><i class="el-icon-date"></i><span>{{ treatise.createTime }}</span></label>
                            <label><i class="el-icon-wind-power"></i><span>{{ treatise.categoryName }}</span></label>
                            <label><i class="el-icon-collection-tag"></i><span>{{ treatise.tags }}</span></label>
                            <label><i class="el-icon-reading"></i><span>{{ treatise.readNum }}</span></label>
                        </div>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
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
