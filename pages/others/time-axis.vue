<template>
    <main>
        <div class="address">
            <el-breadcrumb style="font-size: 15px; padding: 5px 0;" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">网站首页</el-breadcrumb-item>
                <el-breadcrumb-item>时间轴</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="block">
            <el-timeline>
                <el-timeline-item v-for="(item, index) in messages" :key="index" size="large" type="primary" icon="el-icon-date">
                    <span style="font-size: 20px;">{{ item.dateMonth }}</span>
                    <el-timeline-item v-for="(blog, i) in item.blogList" :key="i" color="#38b7ea">
                        <el-card>
                            <div slot="header" class="clearfix">
                                <h3><nuxt-link :to="'/detail/' + blog.uuid">{{ blog.treatiseTitle }}</nuxt-link></h3>
                            </div>
                            <p style="margin-left:5px;">
                                <i class="el-icon-date"></i><span>{{ blog.createTime }}</span>
                                <i class="el-icon-wind-power"></i><span>{{ blog.tags }}</span>
                            </p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline-item>
            </el-timeline>
        </div>
        <!-- <div class="timebox">
            <ul id="timeBoxList">
                <li v-for="(item, index) in messages" :key="index">
                    <span>{{ item.createTime }}</span>
                    <i>
                        <nuxt-link :to="'/detail/' + item.uuid">{{ item.treatiseTitle }}</nuxt-link>
                    </i>
                </li>
            </ul>
        </div> -->
    </main>
</template>

<script>
import axios from 'axios';

export default {
    layout: 'blog',
    name:'timeAxisVue',
    data() {
        return {
            messages:[]
        }
    },
    methods:{
        initInfo:function () {
            var self = this;

            //查询时间轴数据
            axios.get("/blog/blogTreatise/getTimeAxis").then((res) => {
                if (res.data.code == 200) {
                    self.messages = res.data.data.list;
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
