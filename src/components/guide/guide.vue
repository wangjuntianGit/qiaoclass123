<template>
  <div class="guide">
      <div class="topBox">
          <Header  class="topHeader_detailTop"
            @onEdit="onEdit"
            :status="edit.status"
            :title="detailList.name"
            :desc="detailList.desc"
            :content="detailList.content"
          ></Header>
      </div>
      <div class="mainBox commentBox">
            <el-main style="border-radius:8px;">
              <div class="box">
                <!-- 简介说明 -->
                <Intro :status="edit.status" :intro="detailList"></Intro>
                <!-- pdf -->
                <div class="guide-box">
                  <div class="pdfBox">
                    <pdf
                      :src="detailList.file_src"
                      @num-pages="pageCount = $event"
                      @page-loaded="currentPage = $event"
                      :page='showPage'
                    ></pdf>
                  </div>
                  <div class="controller">
                    <el-row type="flex">
                      <el-col :span="6" :offset="10">
                        <i class="el-icon-caret-left addPionter" @click="changePdfPage(0)"></i>
                        <span>{{"第"+currentPage+"页"}}，{{"共"+(pageCount?pageCount:0)+"页"}}</span>
                        <i class="el-icon-caret-right addPionter" @click="changePdfPage(1)"></i>
                      </el-col>
                      <el-col  :span="6" :offset="8">
                        <i @click="full" class="iconfont xxm-quanpingzuidahua btn-fullscreen">全屏</i>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <!-- 作者发布/分享 -->
                <Author :author="detailList"></Author>
                <!-- 评论-->
                <!-- <Comment></Comment> -->
              </div>
            </el-main>
      </div>

  </div>
</template>

<script>
import pdf from 'vue-pdf'
import fullscreen from 'vue-fullscreen'
import Vue from 'vue'

import {
  pptdetail,
  fetchLeftSiteMenu,
  fetchGrades,
  fetchSubjectItems,
  fetchVersionlist,
  fetchSelecTypeList,
  fetchDetailUpdinfo
} from '../../api/index'
import Header from '@/components/common/Header'
import Intro from '@/components/common/Intro'
import Author from '@/components/common/Author'
import Comment from '@/components/common/Comment'
import $ from 'jquery'
Vue.use(fullscreen)
var loadingTask = {}
export default {
  name: 'guide',
  components: {
    pdf,
    Header,
    Intro,
    Author,
    Comment,
    pdfURL: ''
  },
  data () {
    return {
      src: '',
      numPages: undefined,
      currentPage: 0,
      pageCount: 0,
      fullscreen: false,
      detailList: {},
      numPages: 1,
      activeIndex: 0,
      showPage: 1,
      edit: {
        status: false
      }
    }
  },
  created: function () {
    this.getGuideDetail()
  },
  mounted () {
    this.isShowEdit()
  },
  methods: {
    changePdfPage (val) {
      // 翻页
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--
        this.showPage--
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++
        this.showPage++
      }
    },

    getGuideDetail () {
      pptdetail({ id: this.$route.query.ptid })
        .then(res => {
          if (res.data.status == 1) {
            this.detailList = res.data.data
            var loadingTask = pdf.createLoadingTask(this.detailList.file_src)
            this.src = loadingTask
            this.src.then(pdf => {
              this.numPages = pdf.numPages
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 判断是否是又列表进入编辑页面  显示直接编辑功能
    isShowEdit () {
      const isGuideEdit = this.$route.query.isGuideEdit
      if (isGuideEdit == true) {
        this.editStatus = true
        this.edit.status = true
      }
    },

    full () {
      this.$fullscreen.toggle(this.$el.querySelector('.pdfBox'), {
        wrap: false,
        callback: this.fullscreenChange
      })
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    },
    exitFullscreen () {
      if (document.exitFullScreen) {
        document.exitFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (element.msExitFullscreen) {
        element.msExitFullscreen()
      }
      document.getElementsByClassName('fullBox')[0].style.display = 'none'
    },
    onEdit (e) {
      this.edit.status = e
      this.updataPptdetail()
    },
    updataPptdetail: function () {
      fetchDetailUpdinfo({
        id: this.detailList.id,
        desc: this.detailList.desc,
        content: this.detailList.content
      })
        .then(res => {
          if (res.data.status === 1) {
            console.log(res)
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    }
  }
}
</script>

<style scoped lang='scss'>
@import url(../../assets/iconfont/iconfont.css);
//使用scss修改样式
.guide {
  .mainBox {
    background: #f5f5f5;
    .el-main {
      padding: 0 20px 24px 20px !important;
      .box {
        padding-top: 20px;
        .guide-box {
          .pdfBox {
            width: 100%;
            height: 576px;
            overflow-y: scroll;
            span {
              width: 100%;
            }
          }
          .addPionter {
            cursor: pointer;
          }
          .controller {
            width: 100%;
            height: 30px;
            line-height: 30px;
            background: #f0f6f5;
          }
        }
      }
    }
  }
  .fullBox {
    text-align: center;
    position: relative;
    display: none;
    span {
      width: 80%;
    }
    .exitFullscreen {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 7px 20px;
      border-radius: 5px;
      color: #000;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.6);
      border: none;
    }
  }
  .el-main {
    padding: 40px;
    background: #fff;
    margin-top: 20px;
    box-shadow: 0px 5px 12px 0px rgba(126, 151, 143, 0.2);
  }
}
  .btn-fullscreen{
    cursor: pointer;
    margin-left: 60px;
  }
</style>
