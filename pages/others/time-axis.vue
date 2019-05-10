<template>
    <div>
      <Header/>
      <div>
        <div class="blank"></div>
        <Aside/>
        <main>
            <div class="address">您现在的位置是：<a href="/">首页</a>> 时间轴</div>
            <div class="timebox">
                <ul id="timeBoxList">
                    <li v-for="item in messages" :key="item">
                        <span>{{ item.createTime }}</span><i><a :href="'../knowledge/treatise-detail?uuid=' + item.uuid" target="_blank">{{ item.treatiseTitle }}</a></i>
                    </li>
                </ul>
            </div>
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
    name:'timeAxisVue',
    components: {
        Header,
        Footer,
        Aside
    },
    data() {
        return {
            messages:[]
        }
    },
    methods:{
        initInfo:function () {
            var self = this;

            //查询时间轴数据
            axios.get("/blogTreatise/getTimeAxis").then((res) => {
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
