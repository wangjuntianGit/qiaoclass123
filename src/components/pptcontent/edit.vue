<template>
  <div class="pptedit">
    <header class="header">
      <div class="title">{{pptBase.name}}</div>
      <div class="actions">
        <el-button plain size="mini">保存草稿</el-button>
        <el-button plain size="mini">完成编辑</el-button>
      </div>
    </header>
    <section class="main-content">
      <el-row style="height: 100%">
        <el-col :span="4" style="height: 100%">
          <aside class="left-menu">
            <div class="check-all">
              <span style="color: #31bc90">全选</span>
              <el-checkbox :indeterminate="isIndeterminate"
                           v-model="checkAll"
                           @change="handleCheckAllChange"></el-checkbox>
            </div>
            <article style="height: calc(100% - 25px)">
              <ul class="check-group">
                <draggable
                  :list="dataList"
                  class="list-group"
                  ghost-class="ghost"
                  :move="dragItem"
                  @start="dragging = true"
                  @end="dragging = false"
                >
                  <li class="check-item" v-for="(item,index) in dataList" :key="index" :data="item.label">
                    <span class="label"
                          @click="handleItemSelected($event, item)"
                    >
                      {{item.label}}
                    </span>
                    <div class="check-item-option">
                      <el-dropdown class="el-dropdown-wapper" size="small">
                        <span class="el-dropdown-link">
                          <i class="el-icon-more" style="transform: rotate(90deg)"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item style="font-size: 12px">编辑</el-dropdown-item>
                          <el-dropdown-item style="font-size: 12px">新增</el-dropdown-item>
                          <el-dropdown-item style="font-size: 12px">删除</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                      <el-checkbox v-model="item.value"
                                   @change="handleItemChecked($event, item)"></el-checkbox>
                    </div>
                  </li>
                </draggable>
              </ul>
            </article>
          </aside>
        </el-col>
        <el-col :span="16">
          <main class="edit-content">
            <div class="desc">
              <el-row class="desc-wapper">
                <h5 class="desc-label">简介：</h5>
                <div class="desc-content">
                  如果抛体运动的初速度是沿水平方向的，物体所做的运动叫平抛运动。
                </div>
              </el-row>
              <el-row class="desc-wapper" style="margin-top: 8px">
                <h5 class="desc-label">说明：</h5>
                <div class="desc-content">
                  物体以一定的初速度沿坚直向上方向抛出，只在重力作用下所做的运动。 坚直上抛的上升过程和下落过程具有对称性。
                  下落过程是上升过程的逆过程，所以物体在通过同一位置时，上升速度与下落速度等大反向；物体在通过同一段高过的过程中，上升时间与下落时间相等。
                </div>
              </el-row>
            </div>
            <div class="ppt-container">
              <div class="canvas" style="height: 400px"></div>
            </div>
            <div class="ppt-pagination">
              <el-row type="flex" justify="space-around">
                <el-col :span="7" >{{pptTitleDesc}}</el-col>
                <el-col :span="7" style="text-align:center">
                  <i class="el-icon-caret-left" @click="prevBtn"></i>
                  <span>第{{cpage}}页，共{{tpage}}页</span>
                  <i class="el-icon-caret-right" @click="nextBtn"></i>
                </el-col>
                <el-col :span="7" style="text-align:right">
                  <!-- <el-link :underline="false">备注</el-link> -->
                  <i class="iconfont xxm-quanpingzuidahua btn-fullscreen" @click="cfullScreen">全屏</i>
                </el-col>
              </el-row>
            </div>
            <div class="insert-media-wapper">
              <div class="media-item">PPT</div>
              <div class="media-item">文档</div>
              <div class="media-item">视频</div>
              <div class="media-item">GIF</div>
            </div>
          </main>
        </el-col>
        <el-col :span="4" style="height: 100%">
          <aside class="right-menu">
            <div class="myPptCount">我的课件（共{{dataList.filter(data => data.value).length}}页）</div>
            <ul class="thumb-group">
              <li class="thumb-item" v-for="(item,index) in thumbList" :key="index">
                <div class="image" :style="{'background-image': 'url(' + item.imgUrl + ')'}"></div>
                <div class="thumb-mask">
                  <i class="el-icon-top" @click="moveUp($event, item)"></i>
                  <i class="el-icon-bottom" @click="moveDown($event, item)"></i>
                  <i class="el-icon-circle-plus-outline"></i>
                  <i class="el-icon-remove-outline"></i>
                </div>
              </li>
            </ul>
          </aside>
        </el-col>
      </el-row>
    </section>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
import SPpt from '../../../static/utils/pptcontent/script/webppt.js'
import Header from '@/components/common/Header'
import Intro from '@/components/common/Intro'
import comment from '../../components/common/Comment'
import desccom from '../../components/common/Intro'
import author from '../../components/common/Author'
import $ from 'jquery'
import {fetchPptDetail, fetchPptDetailFromDrafts, returnSource, fetchMenuLists, fetchMenuEdit, fetchDetailUpdinfo, fetchPptSaveEdit} from '../../api/index'

const dataList = [
  {label: '本章目录', value: true},
  {label: '本节目录', value: false},
  {label: '学校目标', value: false},
  {label: '知识拓扑', value: false}
]
const thumbList = [
  { imgUrl: '//gw.alicdn.com/img/bao/uploaded/i1/3547003890/O1CN01iY9NZ11ebfE8O8zov_!!3547003890.jpg_320x320.jpg_.webp' },
  { imgUrl: '//gw.alicdn.com/img/bao/uploaded/i1/3547003890/O1CN01iY9NZ11ebfE8O8zov_!!3547003890.jpg_320x320.jpg_.webp' },
  { imgUrl: '//gw.alicdn.com/img/bao/uploaded/i1/3547003890/O1CN01iY9NZ11ebfE8O8zov_!!3547003890.jpg_320x320.jpg_.webp' },
  { imgUrl: '//gw.alicdn.com/img/bao/uploaded/i1/3547003890/O1CN01iY9NZ11ebfE8O8zov_!!3547003890.jpg_320x320.jpg_.webp' },
  { imgUrl: '//gw.alicdn.com/img/bao/uploaded/i1/3547003890/O1CN01iY9NZ11ebfE8O8zov_!!3547003890.jpg_320x320.jpg_.webp' }
]
export default {
  name: 'pptdetail',
  components: {
    draggable,
    comment,
    desccom,
    Header,
    Intro,
    author
  },
  data () {
    return ({
      checkAll: false,
      isIndeterminate: false,
      dataList,
      thumbList,
      pptBase: {},
      pptTitleDesc: '平抛运动及其性质',
      cpage: 1,
      tpage: 10
    })
  },
  mounted () {
    let _this = this
    this.web = new SPpt({
      container: $('.canvas'),
      objectContainer: $('.ppt ul.object'),
      pageContainer: $('.main-content ul.page'),
      thumbWidth: 211,
      onPageChange: (oldPage, nowPage) => {
        _this.cpage = nowPage
        let name = this.menuContent[nowPage - 1].name
        this.selectLi(nowPage - 1, name)
      }
    })
    $('.canvas').on('mousedown', (e) => {
      this.nextBtn()
    })
  },
  created () {
    this.getPptdetail()
  },
  methods: {
    getPptdetail: function () {
      fetchPptDetail({'id': this.$route.query.ptid})
        .then(res => {
          if (res.data.status === 1) {
            const pptDetail = res.data.data
            this.pptBase = pptDetail.ppt_base
            this.pptJson = pptDetail.ppt_json

            console.log(this.pptJson)

            // this.pptDataList = res.data.data
            // this.ppt_base = this.pptDataList.ppt_base
            // this.ppt_json = this.pptDataList.ppt_json
            this.showPpt(this.pptJson)
            const viewvalue = $('.ppt svg').attr('viewbox')
            $('.ppt svg').removeAttr('viewbox')
            document.getElementsByTagName('svg')[0].setAttribute('viewBox0000', viewvalue)
            this.tpage = this.web.getPageMax()
            this.cpage = this.web.getPage()
            // this.getMenuLists()
          }
        })
        .catch(err => {
          console.log('err', err)
          this.$message.error('服务器开小差了，请刷新页面重试~')
        })
    },
    showPpt (json) {
      $('.ppt ul.docment li div').empty()
      $('.ppt ul.object').empty()
      const w = json.ppt.info.layoutWidth
      const scale = json.ppt.info.layoutHeight / w
      var h = $('.canvas').width() * scale
      $('.canvas').height(h)

      this.web.load({
        data: json.ppt,
        resource: json.resource
      })
    },
    handleCheckAllChange (val) {
      this.dataList = this.dataList.map(data => ({ ...data, value: val }))
    },
    handleItemChecked (val, item) {
      this.dataList = this.dataList.map(data => data.label === item.label ? ({ ...data, value: val }) : data)
      const checkedList = this.dataList.filter(data => data.value)
      this.checkAll = checkedList.length === this.dataList.length
      this.isIndeterminate = checkedList.length > 0 && !this.checkAll
    },
    handleItemSelected (e, item) {
      $('.check-group li').removeClass('active')
      const itemNode = $('.check-group').find(`li[data=${item.label}]`)
      itemNode.addClass('active')

    },
    selectLi (index, name) {
      this.isactived = true
      this.currentindex = index
      this.web.pageTo(index + 1)
      $('.ppt ul.page li:first-child').css('border', '1px solid #fff')
      $('.ppt ul.page li').removeClass('h')
      let lidataindex = $('ul.page li')
      for (let i = 0; i < lidataindex.length; i++) {
        let a = lidataindex[i]
        if ($(a).attr('data-index') == index) {
          $(a).addClass('h')
        }
      }
      this.pptTitleDesc = name
    },
    dragItem (e) {
      window.console.log('Future index: ' + e.draggedContext.futureIndex)
    },
    moveUp (e, item) {
      console.log('move up ..', item)
    },
    moveDown (e, item) {
      console.log('move down ..', item)
    },
    cfullScreen () {
      screenfull && screenfull.request()
      var _scale = $('.fullscreen').height() / $('.fullscreen').width()

      var w = $('.canvas').width()
      var h = $('.canvas').height()
      $('.fullscreen').append($('.canvas').css({
        'width': w,
        'height': h,
        'transform': 'scale(' + ($('.fullscreen').width() / w) + ',' + ($('.fullscreen').width() / w) + ')'
      })).css({
        'display': 'flex'
      })
      //   })
      this.ofullScreen()
    },
    ofullScreen () {
      $('.btn-exit-fullscreen').on('click', function () {
        // aaa && aaa.exit()
        screenfull && screenfull.exit()
        $('.fullscreen').hide()
        $('.ppt .right').append($('.canvas').css({
          'transform': '',
          'width': ''
        }))
        // this.web.reload()
      })
    },
    keydown (e) {
      document.addEventListener('keydown', (e) => {
        switch (e.keyCode) {
          case 37:	// 上和左
          case 38:
            this.prevBtn()
            break;
          case 39:	// 下和右
          case 40:
            this.nextBtn()
            break;
          case 27:	// ESC键  用于全屏时恢复正常
            console.log('exit')
            screenfull && screenfull.exit()
            // $('.btn-exit-fullscreen').click()
            $('.fullscreen').hide()
            $('.ppt .right').append($('.canvas').css({
              'transform': '',
              'width': ''
            }))
            break;
        }
      })
    },
    prevBtn () {
      const page = this.web.getPage()
      if (page <= 1) {
        new Toast('当前第一页').show()
        return
      }
      this.web.pageTo(page - 1)
      this.cpage = this.web.getPage()
    },
    nextBtn () {
      const page = this.web.getPage()
      if (page >= this.web.getPageMax()) {
        new Toast('当前最后一页').show()
        return
      }
      this.web.pageTo(page + 1)
      this.cpage = this.web.getPage()
    }
  }
}

</script>
<style>
  @import url(../../assets/css/pptedit.css);

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
</style>
