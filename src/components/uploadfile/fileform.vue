<template>
    <my-scontainer style="box-shadow:none;">
        <el-row class="scontainer">
            <el-form label-width="100px" :model="allInfo" :rules="rules" ref="fileform">
                <el-form-item label="类型：">
                    <span class="el-input__inner"
                          v-for="(item,index) in coursetypelist"
                          :key="index"
                          v-show="coursetype == item.num">{{item.seType}}
                    </span>
                    </el-form-item>
                    <el-form-item label="名称：" prop="name">
                    <el-input
                        v-model="allInfo.name"
                        placeholder="请输入名称"
                        maxlength="30"
                        @input="handelNameNum($event)"
                    >
                        <span slot="suffix" class="nameNum">{{nameNum +'/30'}}</span>
                    </el-input>
                    </el-form-item>
                    <el-form-item label="章：" prop="cname" required>
                    <el-select v-model="allInfo.cname" placeholder="章名称" @change="clearSubdirectory">
                        <el-option
                        v-for="item in chapterlist"
                        :key="item.id"
                        :label="item.cname"
                        :value="item.id"
                        ></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="节：" prop="sname">
                    <el-select v-model="allInfo.sname" placeholder="节名称" @focus="selectSname">
                        <el-option
                        v-for="item in chapterlist01"
                        :key="item.id"
                        :label="item.cname"
                        :value="item.id"
                        ></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="知识点：" v-if="$route.query.groupCourse != 1">
                    <el-select v-model="allInfo.tname" placeholder="知识点名称" @focus="selectTname">
                        <el-option
                        v-for="item in chapterlist02"
                        :key="item.id"
                        :label="item.cname"
                        :value="item.id"
                        ></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="简介：" prop="desc" v-if=" !isShowOrHide">
                    <el-input
                        v-model="allInfo.desc"
                        placeholder="请输入简介"
                        maxlength="30"
                        @input="handelintroNum($event)"
                    >
                        <span slot="suffix" clas="introNum">{{introNum + '/30'}}</span>
                    </el-input>
                    </el-form-item>
                    <el-form-item label="说明：" prop="content" v-if=" !isShowOrHide">
                    <el-input
                        v-model="allInfo.content"
                        placeholder="请输入说明"
                        maxlength="60"
                        @input="handelExplainNum($event)"
                    >
                        <span slot="suffix" class="explainNum">{{explainNum + '/60'}}</span>
                    </el-input>
                    </el-form-item>
                    <el-form-item label="上传封面：" v-if="coursetype != 5 && coursetype != 7" class="min-height">
                    <uploadonlyimg @getimgname="getimgname" :imginfosquare="true" :imgSrc.sync="imgSrc"></uploadonlyimg>
                    </el-form-item>
                    <el-form-item style="text-align:left;">
                    <el-button type="primary" @click="submitForm('allInfo')" :disabled="checkDisabled">确定</el-button>
                    </el-form-item>
                </el-form>
                <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
                    <span>
                    <span>上传成功</span>
                    <span>
                        {{time}}s后将跳转到
                        <router-link :to="{path:'/myresources/index'}">资源展示</router-link>或请点击
                        <router-link
                        :to="{path:'/upload',query:{siteTitle: '上传资源', type: this.$route.query.type}}"
                        @click.native="flush"
                        >继续上传</router-link>
                    </span>
                    </span>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialo0gVisible = false">取 消</el-button>
                    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
                <el-dialog title="提示" :visible.sync="centerDialogVisible01" width="30%" center>
                    <span>
                    <span>上传失败</span>
                    <span>{{time}}s后将跳转到上传资源页面继续上传</span>
                    </span>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible01 = false">取 消</el-button>
                    <el-button type="primary" @click="centerDialogVisible01 = false">确 定</el-button>
                    </span>
                </el-dialog>
        </el-row>
    </my-scontainer>
</template>
<script>
import uploadonlyimg from './upload-only-img'
import { fetchCourseType, fetchChapterSelect, fetchSubmitForm, fetchDetail } from '../../api/index'
// 导入中央控制JS 实现兄弟组件之间传值
import bus from '../../event'
// import { setTimeout } from 'timers'
import { mapState } from 'vuex'
export default {
  name: 'fileform',
  props: {
    // coursetype: {
    //   type: ''
    // },
    filename: {
      type: ''
    },
    cid: {
      type: String,
      default: null
    },
    is_edit: {
      type: Number,
      default: null
    }
  },
  components: {
    uploadonlyimg
  },
  data () {
    return {
      nameNumLength: '',
      nameNum: 30,
      introNum: 30,
      explainNum: 60,
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { max: 40, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        cname: [{ required: true, message: '请选择章名称', trigger: 'change' }],
        desc: [{ required: true, message: '请输入简介', trigger: 'blur' }],
        content: [{ required: true, message: '请输入说明', trigger: 'blur' }]
      },
      time: '',
      timer1: '',
      centerDialogVisible: false,
      centerDialogVisible01: false,
      allInfo: {
        name: '',
        cname: '',
        sname: '',
        tname: '',
        desc: '',
        content: '',
        type: '',
        sid: ''
      },
      imgname: '',
      options: {},
      coursetypelist: [],
      chapterlist: [],
      chapterlist01: [],
      chapterlist02: [],
      coursetype: this.$route.query.type,
      //  监听变化所用
      count: 1,
      //  判断是否显示隐藏简介 说明 字段
      isShowOrHide: !!this.$route.query.saveDraft,
      checkDisabled: false,
      imgSrc: '',
      allInfo_item: {} // 谁都不要动，要动就找我——你们的烈哥
    }
  },
  computed: {
    ...mapState({
      setformFileName: state => state.common.formFileName
    })
  },
  watch: {
    setformFileName (formFileName) {
      this.allInfo.name = this.setformFileName
    },
    $route (to, from) {
      this.$router.go(0)
    }
  },
  created () {
    this.getcoursetype()
    this.getchapterselect()
    clearInterval(this.timer1)
    this.timer1 = null
    clearInterval(this.timer2)
    this.timer2 = null
  },
  mounted () {
    // location.reload()
    this.getFileName()
    // 获取章的列表数据
    this.selectCname()
    // 数据回显的方法
    if (this.isShowOrHide) {
      this.echoData()
    }
    console.log('长度', this.nameNumLength)
  },
  updated () {

  },
  destroyed () {
    clearInterval(this.timer1)
    this.timer1 = null
    clearInterval(this.timer2)
    this.timer2 = null
  },
  methods: {
    handelExplainNum (e) {
      this.explainNum = 60 - e.length
    },
    handelintroNum (e) {
      this.introNum = 30 - e.length
    },
    handelNameNum (e) {
      this.nameNum = 30 - e.length
      $(document).unbind('keydown')
    },
    // 接收传送文件名称的方法
    getFileName: function () {
      bus.$on('uploadFileName', data => {
        this.allInfo.name = data
        console.log('okokok', this.allInfo.name)
      })
    },
    flush () {
      this.$router.go(0)
    },
    getimgname (imgname) {
      console.log('this.imgname', this.imgname)
      this.imgname = imgname
    },
    getcoursetype () {
      fetchCourseType()
        .then(res => {
          this.coursetypelist = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getchapterselect () {
      let vid = sessionStorage.getItem('showChapterData')
      const sendData = {
        pid: 0,
        vid: vid
      }
      fetchChapterSelect(sendData)
        .then(res => {
          this.chapterlist = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 章目录发生改变的时候   对应的节 知识点 先清空
    clearSubdirectory () {
      this.allInfo.sname = ''
      this.allInfo.tname = ''
      // 节目录没有选择 知识点是不允许选择的
      this.chapterlist02 = []
    },
    // 获取章的fun
    /**
     * pid
     * vid 教材版本对应的id 如必修1 id为1
     * @param item
     */
    selectCname (item) {
      let vid = sessionStorage.getItem('showChapterData')
      const sendData = {
        pid: 0,
        vid: vid
      }
      this.allInfo.sname = ''
      this.allInfo.tname = ''
      fetchChapterSelect(sendData)
        .then(res => {
          this.chapterlist = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取节的fun
    selectSname () {
      let vid = sessionStorage.getItem('showChapterData')
      const sendData = {
        pid: this.allInfo.cname,
        vid: vid
      }
      if (this.allInfo.cname) {
        this.allInfo.tname = ''
        fetchChapterSelect(sendData)
          .then(res => {
            this.chapterlist01 = res.data.data
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    // 获取知识点的fun
    selectTname (item) {
      let vid = sessionStorage.getItem('showChapterData')
      const sendData = {
        pid: this.allInfo.sname,
        vid: vid
      }
      if (this.allInfo.sname) {
        fetchChapterSelect(sendData)
          .then(res => {
            this.chapterlist02 = res.data.data
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    // 数据回显章的的fun
    echoData () {
      let sendId = { id: sessionStorage.getItem('sendDataToParent') || this.cid}
      let vid = sessionStorage.getItem('showChapterData')
      fetchDetail(sendId)
        .then(res => {
          this.allInfo_item = res.data.data
          // 名称回显
          this.allInfo.name = res.data.data.name
          this.nameNumLength = (res.data.data.name).length
          this.nameNum = 30 - this.nameNumLength
          // 章 数据回显
          if (res.data.data.level_one == 0) {
            this.allInfo.cname = ''
          } else {
            this.allInfo.cname = res.data.data.level_one
          }
          // 封面图回显
          this.imgSrc = res.data.data.cover
          // 节 数据回显
          this.getSectionData(
            res.data.data.level_one,
            vid,
            res.data.data.level_two
          )
          if (!this.$route.query.groupCourse) {
          // 知识点 数据回显
            this.getPointData(
              res.data.data.level_two,
              vid,
              res.data.data.level_three
            )
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    /**
     * 获取节 知识点封装方法
     * @param sendId 传递的id
     * @param vid 选修必修id
     * @param level 对应的返回id
     */
    getSectionData (sendId, vid, level) {
      const sendData = {
        pid: sendId,
        vid: vid
      }
      fetchChapterSelect(sendData)
        .then(res => {
          this.chapterlist01 = res.data.data
          this.allInfo.sname = level || ''
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取知识点的方法
    getPointData (sendId, vid, level) {
      const sendData = {
        pid: sendId,
        vid: vid
      }
      fetchChapterSelect(sendData)
        .then(res => {
          this.chapterlist02 = res.data.data
          this.allInfo.tname = level || ''
        })
        .catch(err => {
          console.log(err)
        })
    },
    submitForm (fileform) {
      let sendDataToParent = sessionStorage.getItem('sendDataToParent')
      if (!this.isShowOrHide) {
        let updateSuccess = sessionStorage.getItem('updateSuccess')
        let fileUpdateIng = sessionStorage.getItem('fileUpdateIng')
        // 没有上传相关文件  不允许点击确定按钮
        if (fileUpdateIng == '2') {
          this.$message.warning('上传正在文件中，请稍后!')
          // this.checkDisabled = true
          return false
          // 文件未上传成功，不能提交数据
        } else if (updateSuccess == null || !this.filename) {
          this.$message.warning('请上传文件!')
          return false
        }
      }
      let sid = this.allInfo.tname || this.allInfo.sname || this.allInfo.cname
      // 重组给后台发送的Json串
      let sendDataToService = new Object()
          sendDataToService.type = this.coursetype || this.allInfo_item.type
          sendDataToService.name = this.allInfo.name
          sendDataToService.sid = sid
          sendDataToService.cover = this.imgSrc
          sendDataToService.content  =this.allInfo.content || this.allInfo_item.content
          sendDataToService.desc = this.allInfo.desc || this.allInfo_item.desc
          sendDataToService.file_src = this.filename
          sendDataToService.groupType = 1  // 1 ：组课件
          sendDataToService.group_id = this.$route.query.group_id
          sendDataToService.is_edit = this.is_edit
          sendDataToService.cid = sendDataToParent ? sendDataToParent : this.$route.query.ptid
      if (!this.isShowOrHide || this.$route.query.group_id) {
        delete sendDataToService['cid']
      }
      if ( !this.$route.query.group_id) {
        delete sendDataToService['groupType']
      }
      this.$refs.fileform.validate(valid => {
        if (valid) {
          fetchSubmitForm(sendDataToService)
            .then(res => {
              if (res.data.status == 1) {
                sessionStorage.removeItem('updateSuccess')
                sessionStorage.removeItem('fileUpdateIng')
                sessionStorage.removeItem('sendDataToParent')
                this.checkDisabled = true
                if (this.$route.query.ptid == undefined) {
                  // 创建和上传，需要弹框
                  this.centerDialogVisible = true
                  this.timer()
                } else {
                  // 编辑页面，不显示弹框，直接跳转到资源展示
                  this.centerDialogVisible = false
                  this.$router.push({ path: 'myresources/index' })
                }
                this.$store.dispatch('common/setSelectMask', false)
                localStorage.removeItem('submitPptList')
              }
            })
            .catch(err => {
              this.centerDialogVisible01 = true
              console.log(err)
              const TIME_COUNT = 3
              if (!this.time) {
                this.time = TIME_COUNT
                this.timer2 = setInterval(() => {
                  if (this.time > 1 && this.time <= TIME_COUNT) {
                    this.time--
                  } else {
                    this.$router.go(0)
                    clearInterval(this.timer2)
                    this.timer2 = null
                  }
                }, 1000)
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    timer () {
      const TIME_COUNT = 3
      if (!this.time) {
        this.time = TIME_COUNT
        this.timer1 = setInterval(() => {
          if (this.time > 1 && this.time <= TIME_COUNT) {
            this.time--
          } else {
            this.$router.push({ path: '/myresources/index' })
            clearInterval(this.timer1)
            this.timer1 = null
          }
        }, 1000)
      }
    }
  }
}
</script>
<style lang="scss">
  .scontainer {
    margin-top: 16px;
  }
  .el-select {
    width: 100%;
  }
  .scontainer {
    .el-input.is-active .el-input__inner,
    .el-input__inner:focus,
    .el-input.is-focus .el-input__inner {
      border-color: $sitecolor;
      outline: 0;
    }
    .el-col:first-child {
      text-align: center;
    }
    .el-col:last-child {
      text-align: left;
    }
    .el-input__inner {
      background: #fff !important;
      border: 1px solid #d4d4d4;
      padding-right: 40px;
    }
    .el-select-dropdown__item.selected {
      color: #31bc90 !important;
      font-weight: 400 !important;
      text-align: center !important;
    }
    .min-height {
      height: 200px;
    }
    .el-select .el-input .el-select__caret {
      color: #c0c4cc;
    }
  }
</style>
