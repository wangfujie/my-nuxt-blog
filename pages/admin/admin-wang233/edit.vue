<template>
    <div style="margin: 0 10px;">
        <el-form :model="treatiseInfo" :rules="rules" ref="blogLeaveMessage" class="demo-ruleForm">     
            <el-form-item label="">
               <h3 class="infoTitle">{{ treatiseInfo.treatiseTitle }}</h3>
            </el-form-item>
            <el-form-item>
                <mavon-editor ref='md' :ishlj="true" v-model="treatiseInfo.markdownContent" @change="changeData"/>
            </el-form-item>
            <el-form-item style="text-align: center;">
                <el-button type="primary" @click="updateTreatiseBody">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            treatiseInfo:{}
        };
    },
    computed:{
        // 文章内容符号转码
        treatiseBody() {
            return this.unescape(this.treatiseInfo.treatiseBody);
        }
    },
    methods:{
        changeData(value, render){
            //获取html格式内容
            this.treatiseInfo.treatiseBody = render;
        },
         // 符号转码
        unescape(html) {
            return html
                .replace(html ? /&(?!#?\w+;)/g : /&/g, "&amp;")
                .replace(/&amp;/g, "&")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&nbsp;/g, " ");
        },
        //查询详情
        getTreatiseDetail(treatiseUuid) {
            var self = this;
            axios.get("/blog/blogTreatise/info/" + treatiseUuid).then((res) => {
                if (res.data.code == 200) {
                    var tags = res.data.data.object.tags;
                    if (tags){
                        res.data.data.object.tagsList = tags.split(",");
                    }
                    self.treatiseInfo = res.data.data.object;
                }
            });
        },
        updateTreatiseBody:function () {
            axios.post("/blog/blogTreatise/update", this.treatiseInfo).then((res) => {
                if (res.data.code == 200) {
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
    }
}
</script>
