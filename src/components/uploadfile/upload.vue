<template>
    <div>
        <layoutTitle :siteTitle="siteTitle"></layoutTitle>
        <my-container>
            <div class="fileformpadding" style="box-shadow:0px 5px 12px 0px rgba(126,151,143,0.2);">
                <h3>选择资源</h3>
                <el-divider></el-divider>
                <div class="mar_width">
                    <uploadonly @getfilename="getfilename" :coursetype="type"></uploadonly>
                    <el-row class="uploadinfo el-upload__tip" slot="tip"  type="flex" justify="center">
                        <el-col :span="12">
                            <div>上传须知：</div>
                            <div v-if="type == '1'">
                                <p>1、支持格式： .ppt .pptx </p>
                                <p>2、文件上传规则： 单个文件最大支持100MB</p>
                            </div>
                            <div v-else-if="type == '2'">
                                <p>1、支持格式：.pdf</p>
                                <p>2、文件上传规则： 单个文件最大支持100MB</p>
                            </div>
                            <div v-else-if="type == '3'">
                                <p>1、支持格式：.ppt .pptx </p>
                                <p>2、文件上传规则： 单个文件最大支持100MB</p>
                            </div>
                            <div v-else-if="type == '4'">
                                <p>1、支持格式：.mp4</p>
                                <p>2、文件上传规则： 单个文件最大支持500MB</p>
                            </div>
                            <div v-else-if="type == '5'">
                                <p>1、支持格式：.gif</p>
                                <p>2、文件上传规则： 单个文件最大支持100MB</p>
                            </div>
                            <div v-else-if="type == '6'">
                                <p>1、支持格式：.mp4</p>
                                <p>2、文件上传规则： 单个文件最大支持500MB</p>
                            </div>
                            <div v-else-if="type == '7'">
                                <p>1、支持格式：.png .jpg .jpeg</p>
                                <p>2、文件上传规则： 单个文件最大支持100MB</p>
                            </div>
                            <!-- <p>3、为保障您的权益，上传资料时请先查阅 <router-link :to="{path:'/login'}">上传说明</router-link> </p> -->
                        </el-col>
                    </el-row>
                 </div>
                <h3>资源信息</h3>
                <el-divider></el-divider>
                <fileform :coursetype="type" :filename="filename"></fileform>
            </div>
        </my-container>
    </div>
</template>
<script>
import fileform from './fileform'
import layoutTitle from '../layout/layoutTitle'
import uploadonly from './upload-only'

export default {
  name: 'upload',
  components: {
    fileform,
    layoutTitle,
    uploadonly
  },
  data () {
    return {
      siteTitle: '',
      type: '',
      filename: ''
    }
  },
  mounted () {
    this.siteTitle = this.$route.query.siteTitle
    this.type = this.$route.query.type
  },
  methods: {
    getfilename (filename) {
      this.filename = filename
      console.log('this.filename', this.filename)
    }
  },
}

</script>
<style lang="scss">
  .uploadinfo{
    text-align: left;
  }
  .uploadbtn{
    margin:16px auto;
  }
  #container{
    text-align: left;
  }
  .fileformpadding{
      margin-top: 0px;
      background: #fff;
      padding:20px 100px 80px 100px;
      margin-bottom: 20px;
      h3{
          color:$sitecolor
      }
      .mar_width{width:70%;margin:0 auto;}
      .el-upload-dragger{
          line-height: 180px
      }
  }
</style>
