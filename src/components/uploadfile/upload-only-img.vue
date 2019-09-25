<template>
  <div>
<!--    上传封面-->
    <div class="avatar-uploader" v-if="imginfosquare">
      <el-upload
        class="imginfosquare"
        ref="upload"
        action="action"
        :on-exceed="handleExceed"
        accept="image/jpeg,image/jpg,image/png"
        :before-upload="onBeforeUpload"
        :show-file-list="false"
        :http-request="fnUploadRequest"
        drag
      >
        <img v-if="scanImgUrl" :src="scanImgUrl" class="avatar" />
        <img v-else :src="imageUrl" class="avatar" />
        <div slot="tip" class="el-upload__tip">
          上传须知：只能上传jpg/png/jpeg文件，且不超过5MB
        </div>
      </el-upload>
    </div>
    <div
      class="avatar_imginfocircle"
      @mouseover="mouseOver"
      @mouseleave="mouseLeave"
    >
    <!--上传头像组件-->
      <el-upload
        v-if="imginfocircle"
        class="imginfocircle"
        ref="upload"
        action="action"
        :on-exceed="handleExceed"
        accept="image/jpeg,image/jpg,image/png"
        :before-upload="onBeforeUpload"
        :on-change="fileChange"
        :on-success="onSuccessUpload"
        :show-file-list="false"
        :http-request="fnUploadRequest"
        drag
      >
        <img v-if="avatar_image" :src="avatar_image" class="avatar" />
        <div class="avator_hover" v-if="isavator_hover">
            修改头像
        </div>
      </el-upload>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import wordCover from '../../assets/image/pdf_cover.png' // 导入静态图片文件
import pptCover from '../../assets/image/ppt-cover.png'
import videoCover from '../../assets/image/video-cover.png'
import gifCover from '../../assets/image/gif-cover.png'
import profileDefault from '../../assets/image/profile_default.png'
import bus from '../../event'
export default {
  name: 'uploadOnlyImg',
  props: ['imginfosquare', 'imginfocircle', 'imgSrc'],
  data () {
    return {
      imageUrl: '',
      uploadFileLength: 0,
      uploadFileSuccess: 0,
      uploadFileNames: [],
      uploadFileName: [],
      fileList: [],
      files: 10,
      uploadHeaders: {
        authorization: ''
      },
      disabled: false,
      isavator_hover: false,
      avatar_image: profileDefault,
      scanImgUrl: ''
    }
  },
  // 计算属性，获取用户上传的头像路径
  computed: {
    ...mapState({
      imgUrl: state => state.common.avatorImgSrc
    //   scanImgUrl: state => state.common.avatorImgSrc
    })

  },
  watch: {
    imgSrc: {
      handler (val) {
        this.avatar_image = val
        // 封面图回显
        this.imageUrl = this.imgSrc ? this.imgSrc : videoCover
      },
      immediate: true
    }

  },
  mounted () {
    // 根据URL中type值不同  设置设置不同的封面
    if (this.$route.query.type == 2) {
      this.imageUrl = wordCover
    } else if (this.$route.query.type == 1 || this.$route.query.type == 3) {
      this.imageUrl = pptCover
    } else if (this.$route.query.type == 4 || this.$route.query.type == 6) {
      this.getFileName()
    } else if (this.$route.query.type == 5) {
      this.imageUrl = gifCover
    }

    this.avatar_image = this.imgUrl
  },
  methods: {
    getFileName: function () {
      bus.$on('videoCover', (data) => {
        console.log('videoCover', data)
        this.imageUrl = data
      })
    },

    ...mapMutations('common', ['avatorImgUrl_mutation']),

    time (time = +new Date()) {
      let date = new Date(time + 8 * 3600 * 1000) // 增加8小时
      return date
        .toJSON()
        .substr(0, 10)
        .replace('T', ' ')
        .replace(/-/g, '')
    },
    randomString (len) {
      len = len || 32
      let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      let maxPos = chars.length
      let pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    },
    async fnUploadRequest (option) {
      try {
        let client = new OSS({
          region: 'oss-cn-qingdao',
          accessKeyId: 'LTAIrrC5vPheSNgv',
          accessKeySecret: 'lWdIBxb71Dt8j1pcMtfdXXcozbK7Do',
          bucket: 'xxm-common'
        })
        let file = option.file
        const point = file.name.lastIndexOf('.')
        let suffix = file.name.substr(point)
        let fileName = file.name.substr(0, point)
        let date = this.time()
        let randStr = this.randomString(18)
        let fileNames = `${date}/${randStr}${suffix}`
        try {
          let result = await client.multipartUpload(fileNames, file, {
          })
          this.$emit('getimgname', result.name)
          this.avatar_image = 'http://' + result.bucket + '.oss-cn-qingdao.aliyuncs.com/' + result.name
          this.imageUrl = 'http://' + result.bucket + '.oss-cn-qingdao.aliyuncs.com/' + result.name
          this.avatorImgUrl_mutation(result.res.requestUrls[0])
          // this.$store.dispatch('common/setAvatorImgUrl', this.imageUrl)
          this.$store.dispatch('common/setAvatorImgUrlBack', fileNames)
          this.isavator_hover = false

          this.$emit('update:imgSrc', this.imageUrl)
        } catch (e) {
          // 捕获超时异常
          if (e.code === 'ConnectionTimeoutError') {
            console.log('Woops,超时啦!')
          }
          console.log(e)
        }
      } catch (error) {
        console.error(error)
      }
    },
    /**
     * @description [fnUploadSuccess 文件上传成功的函数]
     * @author   shanshuizinong
     * @return   {null}  [没有返回]
     */
    async fnUploadSuccess () {
      // TODO
    },
    onBeforeUpload (file) {
      const isIMAGE = (file.type === 'image/jpeg') || (file.type === 'image/jpg') || (file.type === 'image/png')
      const isLt1M = file.size / 1024 / 1024 < 5

      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 5MB!')
      }
      this.isavator_hover = false
      return isIMAGE && isLt1M
    },
    fileChange (file) {
      this.isavator_hover = false
    },
    onSuccessUpload () {
      this.isavator_hover = false
    },
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    mouseOver: function () {
      this.isavator_hover = true
    },
    mouseLeave: function () {
      this.isavator_hover = false
    }
  }

}
</script>
<style lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 246px;
    height: 140px;
    line-height: 140px;
    text-align: center;
  }
  .imginfosquare .avatar,
  .avatar-uploader .el-upload-dragger {
    width: 246px !important;
    height: 140px;
    line-height: 140px;
    display: block;
  }
  .avatar_imginfocircle {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin: 10px auto 50px;
    .imginfocircle {
      width: 120px;
      height: 120px;
      background: #ccc;
      border-radius: 50%;
      margin: auto;
      margin-bottom: 60px;
      position: relative;
      overflow: hidden;
      .el-upload-dragger {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
        &:hover {
        }
      }
    }
    .avator_hover {
      position: absolute;
      top: 0;
      left: 0;
      width: 120px;
      height: 120px;
      line-height: 120px;
      background:rgba($color:#000, $alpha: 0.6);
      color: #fff;
      border-radius: 50%;
  }
  }
</style>
