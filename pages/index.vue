<template>
    <div>
      <Header/>
      <div>
        <div class="blank"></div>
        <aside>
            <div class="newsbox">
                <h2 class="hometitle">推荐</h2>
                <ul class="news">
                    <li v-for="recommend in recommendList" :key="recommend">
                        <a :href="'/knowledge/treatise-detail.html?uuid=' + recommend.uuid" :title="recommend.treatiseTitle">{{ recommend.treatiseTitle }}</a>
                    </li>
                </ul>
            </div>
            <div class="search">
                <input name="keyboard" ref="keyboard" class="input_text" placeholder="请输入关键字词" type="text">
                <input @click="searchTreatise" name="Submit" class="input_submit" value="搜索" type="submit">
            </div>
            <div class="newsbox">
                <h2 class="hometitle">标签云</h2>
                <ul class="cloud">
                    <a v-for="tag in tagList" :key="tag" :href="'/tags/tags.html?tagName=' + tag.tagName" target="_blank" >{{ tag.tagName }}</a>
                </ul>
            </div>
            <div class="newsbox">
                <h2 class="hometitle">阅读排行</h2>
                <ul class="news">
                    <li v-for="ranking in readRanking" :key="ranking" ><a :href="'/knowledge/treatise-detail.html?uuid=' + ranking.uuid" :title="ranking.treatiseTitle">{{ ranking.treatiseTitle }}</a></li>
                </ul>
            </div>
            <div class="newsbox">
                <h2 class="hometitle">友情链接</h2>
                <ul class="links">
                    <li v-for="link in friendLinks" :key="link" ><a :href="link.linkUrl" :title="link.linkTitle" target="_blank">{{ link.linkTitle }}</a></li>
                </ul>
            </div>
        </aside>
        <main>
            <div class="bloglist">
                <ul id="treatise-list">
                    <li v-for="treatise in treatiseList" :key="treatise" >
                        <h2><a :href="'/knowledge/treatise-detail.html?uuid=' + treatise.uuid" :title="treatise.treatiseTitle">{{ treatise.treatiseTitle }}</a></h2>
                        <p class="blogtext">{{ treatise.treatisePreview }}</p>
                        <p class="bloginfo">
                            <span>{{ (treatise.source == 1 ? '原创' : '转载') }}</span>
                            <span>{{ treatise.createTime }}</span>
                            <span>[<a :href="'/knowledge/knowledge.html?categoryId='+ treatise.fId + '&thisCategory=' + treatise.categoryId">{{ treatise.categoryName }}</a>]</span>
                            <span>阅读({{ treatise.readNum }})</span>
                        </p>
                    </li>
                </ul>
            </div>
            <div ref="pageListDiv" class="m-style pageList"></div>
        </main>
        <div class="blank"></div>
      </div>
      <Footer/>
    </div>
</template>

<script>
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
import axios from 'axios';

export default {
  components: {
    Header,
    Footer
  },
  data() {
        return {
          headMenu:[],
          recommendList:[],
          tagList:[],
          readRanking:[],
          friendLinks:[],
          treatiseList:[]
        }
  },
  methods:{
        initInfo:function () {
            var self = this;

            // 推荐
            axios.get("/api/blogTreatise/getRecommend").then((res) => {
                if (res.data.code == 200){
                      self.recommendList = res.data.data.list;
                }
            });
          
            //标签云
            axios.get("/api/blogTags/getShowTags").then((res) => {
                if (res.data.code == 200){
                      self.tagList = res.data.data.list;
                }
            });

            //阅读排行，10条
            axios.get("/api/blogTreatise/getReadRanking",{"currentPage":1,"pageSize":10}).then((res) => {
                if (res.data.code == 200){
                      self.readRanking = res.data.data.page.records;
                }
            });

            // 友情链接查询
            axios.get("/api/blogFriendlyLinks/list",{"currentPage":1,"pageSize":5}).then((res) => {
                if (res.data.code == 200){
                      self.friendLinks = res.data.data.page.records;
                }
            });

            //增加网站浏览记录
            // axios.post("/api/blogLogRecord/addRecord",{"recordType":3}).then((res) => {
            //     if (res.data.code == 200){
            //         console.log(value.code);
            //     }
            // });
            
        },
        //获取文章列表
        getTreatiseList:function (pageNum,keyWord) {
            var self = this;
            if (pageNum == 1){
                self.treatiseList = [];
            }
            axios.get("/api/blogTreatise/list",{"currentPage":pageNum,"pageSize":8,"keyWord":keyWord}).then((res) => {
                if (res.data.code == 200){
                        // self.$refs.pageListDiv.pagination({
                        //     pageCount: res.data.data.page.pages,
                        //     current: res.data.data.page.current,
                        //     coping: true,
                        //     homePage: '首页',
                        //     endPage: '末页',
                        //     prevContent: '上页',
                        //     nextContent: '下页',
                        //     callback: function (api) {
                        //         self.getTreatiseList(api.getCurrent(),keyWord);
                        //         $('html , body').animate({scrollTop: 0},'slow');
                        //     }
                        // });
                        self.treatiseList = res.data.data.page.records;
                    }
            });
        },
        //点击搜索
        searchTreatise:function(){
            var keyWord = this.$refs.keyWord.value;
            vueThis.getTreatiseList(1, keyWord);
            $('html,body').animate({ scrollTop: 0 }, 500);
        }
    },
    created: function () {
        //获取公共部分数据初始数据
        this.initInfo();
        //获取第一页文章
        this.getTreatiseList(1);
    },
    mounted() {
        
    }
}

</script>

<style>

</style>
