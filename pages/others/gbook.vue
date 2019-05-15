<template>
    <main>
        <div class="address">您现在的位置是：<nuxt-link to="/">网站首页</nuxt-link>><nuxt-link to="/others/gbook">留言</nuxt-link></div>
        <div class="gbinfos" id="leaveMessage">
        <div v-for="(message, index) in messages" :key="index">
            <div class="fb">
            <ul :style="'background: url(/images/head/head_' + message.headImgNum + '.png) no-repeat top 2px left 5px;'">
                <p class="fbtime"><span>{{ message.createTime }}</span>{{ message.fanName }}</p>
                <pre class="fbinfo">{{ message.messageContent }}</pre>
            </ul>
            </div>
            <div class="replyDiv" v-if="message.reply != null">
            <ul>
                <p id="reply"><span style="color: #FF0000;">回复: </span>{{ message.reply }}</p>
            </ul>
            </div>
        </div>
        <el-pagination style="margin-top: 15px;"
            background
            layout="prev, pager, next"
            @current-change="getMessageList"
            :current-page.sync="search.currentPage"
            :page-size="search.pageSize"
            :total="search.total">
        </el-pagination>
        </div>
        <div>
            <el-form :model="blogLeaveMessage" :rules="rules" ref="blogLeaveMessage" class="demo-ruleForm">
                <p> <strong>来说点儿什么吧...</strong></p>
                <el-form-item label="您的姓名:" prop="fanName">
                    <el-input v-model="blogLeaveMessage.fanName"></el-input>
                </el-form-item>
                <el-form-item label="联系邮箱:" prop="contactMail">
                    <el-input v-model="blogLeaveMessage.contactMail"></el-input>
                </el-form-item>
                <el-form-item label="留言内容:" prop="messageContent">
                    <el-input type="textarea" v-model="blogLeaveMessage.messageContent" cols="60" rows="12"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitLeaveMessage('blogLeaveMessage')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    layout: 'blog',
    name:'gbookVue',
    data() {
        return {
            search:{
                total:0,
                currentPage:1,
                pageSize:10
            },
            messages:[],
            blogLeaveMessage:{},
            rules: {
                fanName: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                contactMail: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                messageContent: [
                    { required: true, message: '请输入留言', trigger: 'blur' },
                    { min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        getMessageList(pageNum) {
            var self = this;
            axios.get("/blog/blogLeaveMessage/list", {params: self.search}).then((res) => {
                if (res.data.code == 200) {
                    self.messages = res.data.data.page.records;
                    self.search.total = res.data.data.page.total;
                    self.search.currentPage = res.data.data.page.current;
                }
            });
        },
        submitLeaveMessage (blogLeaveMessage) {
            var self = this;
            this.$refs[blogLeaveMessage].validate((valid) => {
                if (valid) {
                    axios.post("/blog/blogLeaveMessage/save", this.blogLeaveMessage).then((res) => {
                        if (res.data.code == 200) {
                            self.blogLeaveMessage = {};
                            self.getMessageList(1);
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            
        }
    },
    created: function () {
        this.getMessageList(1);
    },
    mounted() {
        
    }
}

</script>
