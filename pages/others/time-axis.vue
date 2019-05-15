<template>
    <main>
        <div class="address">您现在的位置是：<nuxt-link to="/">首页</nuxt-link>> 时间轴</div>
        <div class="timebox">
            <ul id="timeBoxList">
                <li v-for="(item, index) in messages" :key="index">
                    <span>{{ item.createTime }}</span><i><nuxt-link :to="'../knowledge/detail/' + item.uuid">{{ item.treatiseTitle }}</nuxt-link></i>
                </li>
            </ul>
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
