<template>
     <div class="uploadonly">
        <el-row class="uploadbtn" type="flex" justify="center">
            <el-col :span="14" v-if="coursetype == '1'|| coursetype == '3'">
               <el-upload
                     v-loading="loading"
                     element-loading-text="玩命上传中，请稍后！"
                     element-loading-spinner="el-icon-loading"
                     element-loading-background="rgba(0, 0, 0, 0.8)"
                    class="upload-demo"
                    accept="application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    action="action"
                    :limit="1"
                     :on-remove = "handleRemove"
                    :on-exceed="handleExceed"
                    :on-change="beforeUpdate"
                    :before-upload="beforePptUpload"
                     :http-request="fnUploadRequest"
                     :drag = "dragFlag"  >
<!--                    <span>将文件拖拽到此处或</span>-->
                    <el-button size="small" :type="btnType">{{btnText}}</el-button>
<!--                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                </el-upload>
            </el-col>
            <!-- application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document -->
            <el-col :span="14" v-if="coursetype == '2'">
              <el-upload
                v-loading="loading"
                element-loading-text="玩命上传中，请稍后！"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                class="upload-demo"
                accept="application/pdf"
                action="action"
                :limit="1"
                :on-exceed="handleExceed"
                :on-remove = "handleRemove"
                :on-change="beforeUpdate"
                :before-upload="beforeDocUpload"
                :http-request="fnUploadRequest"
                drag>
                <!--                    <span>将文件拖拽到此处或</span>-->
                <el-button size="small" :type="btnType">{{btnText}}</el-button>
                <!--                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </el-col>
            <el-col :span="14" v-if="coursetype == '4' || coursetype == '6'">
               <el-upload
                   v-loading="loading"
                   element-loading-text="玩命上传中，请稍后！"
                   element-loading-spinner="el-icon-loading"
                   element-loading-background="rgba(0, 0, 0, 0.8)"
                    class="upload-demo"
                    accept="video/mp4"
                    action="action"
                    :limit="1"
                    :on-exceed="handleExceed"
                   :on-remove = "handleRemove"
                   :on-change ="beforeUpdate"
                   :before-upload="beforeVideoUpload"
                    :http-request="fnUploadRequest"
                    drag>
<!--                    <span>将文件拖拽到此处或</span>-->
                 <el-button size="small" :type="btnType">{{btnText}}</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
            </el-col>
            <el-col :span="14" v-if="coursetype == '5'">
               <el-upload
                   v-loading="loading"
                   element-loading-text="玩命上传中，请稍后！"
                   element-loading-spinner="el-icon-loading"
                   element-loading-background="rgba(0, 0, 0, 0.8)"
                    class="upload-demo"
                    accept="image/gif"
                    action="action"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :on-change ="beforeUpdate"
                   :on-remove = "handleRemove"
                    :before-upload="beforeGifUpload"
                    :http-request="fnUploadRequest"
                    :on-success = "handleSuccess"
                     drag>
<!--                    <span>将文件拖拽到此处或</span>-->
                 <el-button size="small" :type="btnType">{{btnText}}</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文 件，且不超过500kb</div> -->
                </el-upload>
            </el-col>
            <el-col :span="14" v-if="coursetype == '7'">
               <el-upload
                   v-loading="loading"
                   element-loading-text="玩命上传中，请稍后！"
                   element-loading-spinner="el-icon-loading"
                   element-loading-background="rgba(0, 0, 0, 0.8)"
                    class="upload-demo"
                    accept="image/jpeg,image/jpg,image/png"
                    action="action"
                    :limit="1"
                   :on-remove = "handleRemove"
                    :on-exceed="handleExceed"
                    :on-change ="beforeUpdate"
                    :before-upload="beforeImageUpload"
                    :http-request="fnUploadRequest"
                    drag>
<!--                    <span>将文件拖拽到此处或</span>-->
                 <el-button size="small" :type="btnType">{{btnText}}</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文 件，且不超过500kb</div> -->
                </el-upload>
            </el-col>
        </el-row>

    </div>
</template>
<script src="https://gosspublic.alicdn.com/aliyun-oss-sdk-4.4.4.min.js"></script>
<script>
import store from '../../store'
import {fileOssParams} from '../../api/index'
//导入中央控制JS 实现兄弟组件之间传值
import bus from '../../event'

export default {
  name: 'uploadonly',
  data () {
    return {
      imgFlag :false,
      percent : 0,
      loading : false,
      counts : 1,
      uploadFileName : '',
      scanImgUrl:'',
      updateSuccess: '',
      dragFlag: true
    }
  },
  props: {
    coursetype: {
      type: '',
      required: true
    },
    draggable: {
      default: true
    },
    btnType: {
      default: 'primary'
    },
    btnText: {
      default: '点击上传'
    }
  },
  mounted () {
  },
  watch:{
    loading: {
      handler(newVal) {
        console.log('newVal',newVal)
        if( newVal == true){
          sessionStorage.setItem('fileUpdateIng' ,'2')
        }else{
          sessionStorage.setItem('fileUpdateIng' ,'1')
        }
      },
      immediate: true
    }

  },
  methods: {
    // 发送数据的方法 传值给其他组件上传的文件名称
    sendData: function() {
      bus.$emit("uploadFileName", this.uploadFileName);
    //   bus.$emit("videoCover", this.scanImgUrl);
    },
    time (time = +new Date()) {
      let date = new Date(time + 8 * 3600 * 1000) // 增加8小时
      return date.toJSON().substr(0, 10).replace('T', ' ').replace(/-/g, '')
    },
    randomString (len) {
      len = len || 32
      var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      var maxPos = chars.length
      var pwd = ''
      for (var i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    },
    //   上传文件被删除 触发此函数
    handleRemove (file ,fileList) {
      sessionStorage.removeItem("updateSuccess");
      this.loading = false
    },
    //文件上传成功后调用
    handleSuccess (response, file, fileList) {
      console.log(response)
    },
    beforePptUpload(file){
         const isJPG = file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        const isLt2M = file.size / 1024 / 1024 < 100;

        if (!isJPG) {
          this.$message.error('上传指定格式的文件!');
          this.loading = false
        }
        if (!isLt2M) {
          this.$message.error('上传文件不能超过100MB!');
          this.loading = false
        }
        return isJPG && isLt2M;
    },
    beforeDocUpload(file){
         const isJPG = (file.type === 'application/pdf');
        const isLt2M = file.size / 1024 / 1024 < 100;

        if (!isJPG) {
          this.$message.error('上传指定格式的文件!');
          this.loading = false
        }
        if (!isLt2M) {
          this.$message.error('上传文件不能超过100MB!');
          this.loading = false
        }
        return isJPG && isLt2M;
    },
    beforeVideoUpload(file){
        const isJPG = file.type === 'video/mp4';
        const isLt2M = file.size / 1024 / 1024 < 500;

        if (!isJPG) {
          this.$message.error('上传指定格式的文件!');
          this.loading = false
        }
        if (!isLt2M) {
          this.$message.error('上传文件不能超过500MB!');
          this.loading = false
        }
        return isJPG && isLt2M;
    },
    beforeGifUpload(file){
         const isJPG = file.type === 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 100;

        if (!isJPG) {
          this.$message.error('上传图片只能是指定图片格式!');
          this.loading = false
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 100MB!');
          this.loading = false
        }
        return isJPG && isLt2M;
    },
    beforeImageUpload(file){
         const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/jpg') || (file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 <100;

        if (!isJPG) {
          this.$message.error('上传图片只能是指定图片格式!');
          this.loading = false
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 100MB!');
          this.loading = false
        }
        return isJPG && isLt2M;
    },
    /**
     * @description [fnUploadRequest 覆盖默认的上传行为，实现自定义上传]
     * @author   shanshuizinong
     * @param    {object}   option [上传选项]
     * @return   {null}   [没有返回]
     */
    fnUploadRequest (option) {
      console.log(option)
      try {
        let client = new OSS({
          region: 'oss-cn-qingdao',
          secure: true,
          accessKeyId: 'LTAIrrC5vPheSNgv',
          accessKeySecret: 'lWdIBxb71Dt8j1pcMtfdXXcozbK7Do',
          bucket: 'xxm-common'
        })
        // let result = await client.multipartUpload('2019/', 'local-file', {
        //   progress: async function (p) {
        //     console.log('Progress: ' + p)
        //   }
        // })
        let file = option.file
        const point = file.name.lastIndexOf('.')
        let suffix = file.name.substr(point)
        let fileName = file.name.substr(0, point)
        this.uploadFileName = fileName
        this.sendData()
        this.$store.dispatch('common/setFormFileName', fileName)
        let date = this.time()
        let randStr = this.randomString(18)
        let fileNames = `${date}/${randStr}${suffix}`
        // 分片上传文件
        client.multipartUpload(fileNames, file, {

        }).then(results => {
          console.log(results)
          console.log(results.name)
          this.$emit('getfilename', results.name)
          this.imageUrl = 'http://' + results.bucket + '.oss-cn-qingdao.aliyuncs.com/' + results.name
          this.scanImgUrl = 'http://xxm-common.oss-cn-qingdao.aliyuncs.com/'+ results.name +'?x-oss-process=video/snapshot,t_6000,f_jpg,w_260'
          console.log(this.imageUrl)
          console.log("scanImgUrl视频封面显示",this.scanImgUrl)
        //   this.$store.dispatch('common/setScanImgUrl', this.scanImgUrl)
        bus.$emit("videoCover", this.scanImgUrl);
           this.$store.dispatch('common/setAvatorImgUrl', this.scanImgUrl)

          console.log('上传阿里云成功')
          this.counts++
          this.uploadScuess()
          //文件上传成功 保存一个标志
          this.updateSuccess = 1
          sessionStorage.setItem('updateSuccess',this.updateSuccess)
          //给兄弟组件传值，判断是文件是否上传成功
          this.loading = false
        }).catch((err) => {
          console.log(err)
        })
      } catch (error) {
        console.error(error)
      }
    },
    uploadScuess () {
      this.$message({
        message: "文件上传成功！",
        center: true,
        type: 'success'
      })
    },
    /**
     * @description [fnUploadSuccess 文件上传成功的函数]
     * @author   shanshuizinong
     * @return   {null}  [没有返回]
     */
    async fnUploadSuccess () {
      // TODO
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeUpdate () {
      this.loading = true
    }
  }
}
</script>
<style>
  .upload-demo .el-upload-dragger{
      line-height: 180px;
  }
  .upload-demo .el-loading-mask{
    width: 360px;
    height: 180px;
  }
  .upload-demo .el-loading-mask .el-loading-text{
    color: #ffffff !important;
  }
  .upload-demo .el-loading-mask .el-loading-spinner i {
    color: #ffff;
    font-size: 30px;
    margin-bottom: 10px;
    margin-top: -10px;
  }
</style>
