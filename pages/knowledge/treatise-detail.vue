<template>
    <div>
      <Header/>
      <div>
        <div class="blank"></div>
        <Aside/>
        <main>
            <div class="address">您现在的位置是：
                <nuxt-link to="/">首页</nuxt-link>
                &nbsp;>&nbsp;
                <nuxt-link to="#">浏览详情</nuxt-link>
            </div>
            <div class="infoBox">
                <h1 class="infoTitle">{{ treatiseInfo.treatiseTitle }}</h1>
                <p class="blogInfo">
                    <span>{{ treatiseInfo.sourceName }}</span>
                    <span>{{ treatiseInfo.createTime }}</span>
                    <span>{{ treatiseInfo.categoryName }}</span>
                    <span>阅读(<b>{{ treatiseInfo.readNum }}</b>)</span>
                </p>
                <div class="tags" id="the_tags" v-if="treatiseInfo.tags != null">
                    <a href="#2" v-for="tag in treatiseInfo.tagsList" :key="tag">{{ tag }}</a>
                </div>
                <div class="news_about">
                    <strong>简介</strong>
                    {{ treatiseInfo.treatisePreview }}
                </div>
                <div v-html="formatEditormd(treatiseInfo.treatiseBody)" v-highlight></div>
                <p v-if="treatiseInfo.source == 2">
                    转载自：
                    <nuxt-link target="_blank" :to="treatiseInfo.reprintUrl">{{ treatiseInfo.reprintUrl }}</nuxt-link>
                </p>
                <div class="share">
                    <p class="praise">
                        <a href="#2" @click="addPraiseNum"> 很赞哦！</a>
                        (<b>{{ treatiseInfo.praiseNum }}</b>)
                    </p>
                </div>
                <div class="nextinfo">
                    <p v-if="treatiseInfo.upBlogTreatise != null">上一篇：<nuxt-link :to="'treatise-detail?uuid=' + treatiseInfo.upBlogTreatise.uuid">{{ treatiseInfo.upBlogTreatise.treatiseTitle }}</nuxt-link></p>
                    <p v-if="treatiseInfo.upBlogTreatise == null">上一篇：<nuxt-link :to="'knowledge?categoryId=' + treatiseInfo.fId + '&thisCategory=' + treatiseInfo.categoryId">返回列表</nuxt-link></p>

                    <p v-if="treatiseInfo.downBlogTreatise != null">下一篇：<nuxt-link :to="'treatise-detail?uuid=' + treatiseInfo.downBlogTreatise.uuid">{{ treatiseInfo.downBlogTreatise.treatiseTitle }}</nuxt-link></p>
                    <p v-if="treatiseInfo.downBlogTreatise == null">下一篇：<nuxt-link :to="'knowledge?categoryId=' + treatiseInfo.fId + '&thisCategory=' + treatiseInfo.categoryId">返回列表</nuxt-link></p>
                </div>
                <div class="news_pl">
                    <h2>文章评论</h2>
                    <div class="gbko">
                        <form action="" method="post" name="saypl" onsubmit="">
                            <div id="plpost">
                                <p class="saying"><span><nuxt-link to="#2">共有0条评论</nuxt-link></span>暂无评论功能...</p>
                            </div>
                        </form>
                    </div>
                </div>
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
const MarkdownIt = require("markdown-it");

export default {
    name:'treatiseDetailVue',
    components: {
        Header,
        Footer,
        Aside
    },
    data() {
        return {
            md: new MarkdownIt(),
            treatiseInfo:{}
        }
    },
    methods:{
        //查询详情
        getTreatiseDetail(treatiseUuid) {
            var self = this;
            axios.get("/api/blogTreatise/info/" + treatiseUuid).then((res) => {
                if (res.data.code == 200) {
                    var tags = res.data.data.object.tags;
                    if (tags){
                        res.data.data.object.tagsList = tags.split(",");
                    }
                    self.treatiseInfo = res.data.data.object;
                }
            });
        },
        addPraiseNum() {
            var self = this;
            axios.post(
                    "/api/blogLogRecord/addRecord", 
                    {"recordType": 1, "treatiseUuid":self.treatiseInfo.uuid}
                ).then((res) => {
                if (res.data.code == 200) {
                    self.treatiseInfo.praiseNum = self.treatiseInfo.praiseNum + 1;
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                }else {
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    });
                }
            }).fail((val) => {
                this.$message.error('您点的太快了！不能太快哦！');
            });
        },
        formatEditormd(val) {
            return this.md.render(val);
        },
        initDatePicker() {
            //使代码部分高亮显示
            // SyntaxHighlighter.all();
        }
    },
    watch:{
        treatiseInfo:function(){
            //延迟加载，使代码部分高亮显示
            this.$nextTick(function () {
                this.initDatePicker();
            });
        }
    },
    created: function () {
        var uuid = this.$route.query.uuid;
        //如果传有主键uuid，则加载详情数据
        if (uuid){
            //初始化数据
            this.getTreatiseDetail(uuid);
        }
    },
    mounted() {
        
    }
}

</script>
