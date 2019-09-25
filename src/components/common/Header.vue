<template>
  <div class="headerBox">
    <el-header class="header">
      <el-row style="flex" class="top header" type="flex" justify="space-between">
        <el-col class="goBack">
          <i class="el-icon-arrow-left goBack" title="返回" @click="goBack()"></i>
        </el-col>
        <el-col :span="20" class="title">{{title}}</el-col>
        <el-col :span="2">
          <el-button
            v-if="editStatus == true && editStatuspptSaveDraft == true"
            class="editBut"
            round
            @click="pptSaveInterval()"
          >保存草稿</el-button>
        </el-col>
        <el-col class="setMargin" :span="2">
          <el-button v-if="editStatus == true" @click="onAllEdit()" class="editBut" round>完成编辑</el-button>
        </el-col>
        <el-col :span="2" v-if="editStatus == false" style="text-align:right;">
          <el-button @click="onEdit()" class="editBut" round>编辑</el-button>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>
<script>
import {
  fetchPptSaveInterval,
  fetchPptSaveEdit,
  fetchDetailUpdinfo,
  fetchPptSee
} from '../../api/index'
export default {
  name: 'Header',
  props: [
    'title',
    'status',
    'pptSaveDraft',
    'saveDrafts',
    'desc',
    'content',
    'cid',
    'ppt_author_id'
  ],
  data () {
    return {
      editStatus: this.status,
      editStatuspptSaveDraft: this.pptSaveDraft,
      sendId: ''
    }
  },
  mounted () {
    if (this.$route.query.isPptEdit) {
      this.isPptDetail = !this.$route.query.isPptEdit
      this.editStatus = true
      //   this.edit.status = true
    }
    this.isShowEdit()
  },
  methods: {
    // 导学案,微课，视频，GIF，图片  判断是否为从列表的编辑按钮进入
    isShowEdit () {
      const isGuideEdit = this.$route.query.isGuideEdit
      const isMovieEdit = this.$route.query.isMovieEdit
      const isGifEdit = this.$route.query.isGifEdit
      const isMicroCourseEdit = this.$route.query.isMicroCourseEdit
      const isImageEdit = this.$route.query.isImageEdit
      if (
        isGuideEdit == true ||
        isMovieEdit == true ||
        isGifEdit == true ||
        isMicroCourseEdit == true ||
        isImageEdit == true
      ) {
        this.editStatus = true
        // this.edit.status = true
      }
    },

    onEdit () {
      this.editStatus = !this.editStatus
      // 触发父组件的方法
      this.$emit('onEdit', this.editStatus)
      if (this.editStatus == false) {
        this.$router.push({
          name: 'pptdetail',
          query: {
            ptid: this.$route.query.ptid,
            type: this.$route.query.type,
            isPptEdit: 1
          }
        })
      }
    },
    onSaveInterval (callbck) {
      let isDrafts = this.$route.query.is_drafts
        ? this.$route.query.is_drafts
        : 1
      return new Promise((resolve, reject) => {
        let params = {
          cid: this.$route.query.ptid,
          desc: this.desc,
          content: this.content,
          is_drafts: isDrafts,
          diy_menu: JSON.stringify(this.saveDrafts),
          ppt_author_id: this.ppt_author_id,
          ver: ''
        }
        fetchPptSaveInterval(params)
          .then(res => {
            console.log('保存草稿成功')
            this.$emit('removeStorage')
            resolve()
          })
          .catch(err => {
            console.log(err)
            reject()
          })
      })
    },
    // ppt编辑 保存草稿
    pptSaveInterval () {
      if (this.$route.query.is_drafts == 2) {
        this.onSaveInterval()
      } else {
        this.onSaveInterval().then(() => {
          this.$router.push({
            name: 'pptdetail',
            query: {
              ptid: this.$route.query.ptid,
              type: this.$route.query.type,
              isPptEdit: 1,
              saveDraft: 1
            }
          })
        })
      }
    },
    // 完成编辑
    onAllEdit () {
      let type = this.$route.query.type
      let isDrafts = this.$route.query.is_drafts ? this.$route.query.is_drafts : 1
      // 课件详情
      if (type == 1) {
        console.log('this.saveDrafts', this.saveDrafts)
        let params = {
          cid: this.$route.query.ptid,
          desc: this.desc,
          content: this.content,
          is_drafts: isDrafts,
          is_edit: '1',
          diy_menu: JSON.stringify(this.saveDrafts)
        }
        fetchPptSaveEdit(params)
          .then(res => {
            this.sendId = res.data.data.cid
            sessionStorage.setItem('sendDataToParent', this.sendId)
            this.$router.push({
              name: 'createfile',
              query: {
                siteTitle: '编辑资源',
                ptid: this.$route.query.ptid,
                type: this.$route.query.type,
                saveDraft: 1,
                is_edit: 1
              }
            })
          })
          .catch(err => {
            console.log(err)
          })
        // 其他详情编辑接口
      } else {
        fetchDetailUpdinfo({
          cid: this.$route.query.ptid,
          desc: this.desc,
          content: this.content
        })
          .then(res => {
            if (res.data.status === 1) {
              console.log('完成编辑')
              // let newId = res.data.data.cid
              this.$router.push({
                name: 'createfile',
                query: {
                  siteTitle: '编辑资源',
                  ptid: this.$route.query.ptid,

                  type: this.$route.query.type,
                  saveDraft: 1,
                  is_edit: 1
                }
              })
            }
          })
          .catch(err => {
            console.log('err', err)
          })
      }
    },
    goBack () {
      this.$emit('showOrhidePptImg')
      this.$emit('clearSaveDrafFunction')
      this.goBackToPpt()
    },
    // 点击保存草稿后，点击回退按钮后，跳转到PPT详情   张翠翠修改bug264  2019-09-25 方案和张明讨论一致
    goBackToPpt () {
      if (this.$route.query.isPptEdit === 1 && this.$route.query.saveDraft === 1) {
        this.$router.go(-2)
      } else {
        this.$router.go(-1)
      }
    }
  },
  computed: {
    count () {
      return this.$store.state.common.count
    }
  }
}
</script>
<style lang='scss'>

.headerBox {
  .header {
    background: #31bc90;
    .top {
      width: 100%;
      height: 60px;
      background: #31bc90;
      line-height: 60px;
      .goBack {
        font-size: 20px;
        color: #fff;
        width: 6px;
        margin-right: 20px;
        cursor: pointer;
      }
      .title {
        color: #ffffff;
        font-size: 18px;
        line-height: 60px;
        text-align: left;
      }
      .editBut {
        background: rgba(245, 245, 245, 1);
        border-radius: 5px;
        color: #7c7c7c;
        padding: 8px 23px;
        :hover {
          color: #7c7c7c;
        }
        :active {
          border-color: #7c7c7c;
        }
      }
      .setMargin{
        margin: 0 15px;
      }
    }
  }
}
</style>
