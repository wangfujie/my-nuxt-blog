<template>
    <div style="margin-top: 10px;">
        <el-form :model="treatiseInfo" :rules="rules" ref="blogLeaveMessage" class="demo-ruleForm" label-width="80px">
            <el-form-item label="文章标题">
               <el-input v-model="treatiseInfo.treatiseTitle" placeholder="请输入文章标题"></el-input>
            </el-form-item>
            <el-row>
                <el-col span="5">
                    <el-form-item label="所属类型">
                        <el-select v-model="treatiseInfo.categoryId" placeholder="请选择分类">
                            <el-option v-for="(category, index) in categoryList" :key="index" :value="category.id" :selected="category.selected" :label="category.categoryName" ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col span="8">
                    <el-form-item label="是否推荐">
                        <el-switch v-model="treatiseInfo.recommend" ></el-switch>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="标签选择">
                <el-checkbox v-for="(tag, index) in tagsList" :key="index" ref="tags" :label="tag.tagName" :checked="tag.checked" border></el-checkbox>
            </el-form-item>

            <el-row>
                <el-col span="3">
                    <el-form-item label="文章来源">
                        <el-select v-model="treatiseInfo.source" placeholder="请选择来源">
                            <el-option value="1" label="原创"></el-option>
                            <el-option value="2" label="转载"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col span="8">
                    <el-form-item label="来源地">
                        <el-input v-model="treatiseInfo.reprintFrom"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="13">
                    <el-form-item label="来源url">
                        <el-input v-model="treatiseInfo.reprintUrl"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        
            <el-form-item label="预览内容">
                <el-input type="textarea" v-model="treatiseInfo.treatisePreview" placeholder="请输入预览内容"></el-input>
            </el-form-item>

            <el-form-item label="文章正文">
                <mavon-editor ref='md' :ishlj="true" v-model="treatiseInfo.markdownContent" @imgAdd="$imgAdd" @change="changeData"/>
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
            categoryList:[],
            tagsList:[],
            treatiseInfo:{}
        }
    },
    computed:{
        // 文章内容符号转码
        treatiseBody() {
            return this.unescape(this.treatiseInfo.treatiseBody);
        }
    },
    methods:{
        initInfo(){

        },
        $imgAdd(pos, $file){
            var self = this;
            // 第一步.将图片上传到服务器.
            var formdata = new FormData();
            formdata.append('image', $file);
            axios({
                url: '/uploadImage',
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then((result) => {
                // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                /**
                 * $vm 指为mavonEditor实例，可以通过如下两种方式获取
                 * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
                 * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
                 */
                self.$refs.md.$img2Url(pos, result.data);
            });
        },
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
        editInfo(treatiseUuid) {
            var self = this;
            axios.get("/blogTreatise/info/" + treatiseUuid).then((res) => {
                if (res.data.code == 200) {
                    var tags = res.data.data.object.tags;
                    if (tags){
                        res.data.data.object.tagsList = tags.split(",");
                    }
                    self.treatiseInfo = res.data.data.object;
                    //处理回填推荐数据
                    self.treatiseInfo.recommend = res.data.data.object.recommend == 1 ? true : false;
                    //回填下来列表和多选标签数据
                    self.loadCategory(res.data.data.object.categoryId);
                    self.loadTagList(res.data.data.object.tags);
                }
            });
        },
        loadCategory (categoryId) {
            var self = this;
            axios.get("/blogCategory/getCategoryList").then((res) => {
                if (res.data.code == 200) {
                   if (categoryId){
                        res.data.data.list.forEach(function(key){
                            if (key.id == categoryId){
                                key.selected = true;
                            }
                        })
                    }
                    self.categoryList = res.data.data.list;
                }
            });
        },
        loadTagList (tags) {
            var self = this;
            axios.get("/blogTags/getList").then((res) => {
                if (res.data.code == 200) {
                   if (tags){
                        res.data.data.list.forEach(function(key){
                            if (tags.search(key.tagName) != -1) {
                                key.checked = true;
                            }
                        })
                    }
                    self.tagsList = res.data.data.list;
                }
            });
        },
        updateTreatiseBody:function () {
            //处理是否推荐数据
            this.treatiseInfo.recommend = this.treatiseInfo.recommend ? 1 : 0;
            //获取标签多选数据
            var tagsArr = [];
            this.$refs.tags.forEach(function(key){
                console.log(key.label + "==>" + key.model);
                if(key.model){
                    tagsArr.push(key.label);
                }
            });
            this.treatiseInfo.tags = tagsArr.join(",");
            // console.log(this.treatiseInfo)
            axios.post("/blogTreatise/insertOrUpdate", this.treatiseInfo).then((res) => {
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
            this.editInfo(uuid);
        }else {
            //初始化数据,加载分类
            this.loadCategory();
            //加载标签多选数据
            this.loadTagList();
        }
    }
}
</script>
