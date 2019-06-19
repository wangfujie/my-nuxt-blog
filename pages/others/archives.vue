<template>
    <main>
        <div class="address">
            <el-breadcrumb style="font-size: 15px; padding: 5px 0;" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>归档</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="block">
            <el-timeline>
                <el-timeline-item v-for="(item, index) in messages" :key="index" :size='item.type == 1 ? "large":no' 
                :icon='item.type == 1 ? "el-icon-date":n'
                 color="#38b7ea">
                    <span v-if='item.type == 1' style="font-size: 20px;">{{ item.dateMonth }}({{ item.number }})</span>
                    <el-card v-if="item.type == 2">
                        <div slot="header" class="clearfix">
                            <h3><nuxt-link :to="'/detail/' + item.blogTreatise.uuid">{{ item.blogTreatise.treatiseTitle }}</nuxt-link></h3>
                        </div>
                        <div>
                            {{ item.blogTreatise.treatisePreview }}
                        </div>
                        <div class="archives-card">
                            <label><i class="el-icon-date"></i><span>{{ item.blogTreatise.createTime }}</span></label>
                            <label><i class="el-icon-wind-power"></i><span>{{ item.blogTreatise.categoryName }}</span></label>
                            <label><i class="el-icon-collection-tag"></i><span>{{ item.blogTreatise.tags }}</span></label>
                            <label><i class="el-icon-reading"></i><span>{{ item.blogTreatise.readNum }}</span></label>
                        </div>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
            <el-pagination style="margin-top: 15px;"
                background
                layout="prev, pager, next"
                @current-change="initInfo"
                :current-page.sync="search.currentPage"
                :page-size="search.pageSize"
                :total="search.total">
            </el-pagination>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    layout: 'blog',
    name:'timeAxisVue',
    data() {
        return {
            messages:[],
            search:{
                total:0,
                currentPage:1,
                pageSize:10
            }
        }
    },
    methods:{
        initInfo:function (currentPage) {
            this.search.currentPage = currentPage;
            var self = this;

            //查询归档数据
            axios.get("/blog/blogTreatise/getTimeAxis", {params: self.search}).then((res) => {
                if (res.data.code == 200){
                    self.messages = res.data.data.page.records;
                    self.search.total = res.data.data.page.total;
                    self.search.currentPage = res.data.data.page.current;
                    self.comsys.backToTop();
                }
            });
            // axios.get("/blog/blogTreatise/getTimeAxis").then((res) => {
            //     if (res.data.code == 200) {
            //         self.messages = res.data.data.list;
            //     }
            // });
        }
    },
    created: function () {
        this.initInfo();
    },
    mounted() {
        
    }
}

</script>
