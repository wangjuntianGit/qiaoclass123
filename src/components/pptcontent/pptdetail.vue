<template>
  <div class="pptdetail">
    <div class="topbox">
        <Header class="topHeader_detailPptTop"
          @onEdit="onEdit"
          :status="edit.status"
          :title="ppt_base.name"
          :pptSaveDraft="edit.pptSaveDraft"
          :saveDrafts="saveDrafts"
          :desc="ppt_base.desc"
          :content="ppt_base.content"
          :ppt_author_id="ppt_base.user_id"
          ref="header"
          @showOrhidePptImg="showOrhidePptImg"
          @clearSaveDrafFunction = "clearSaveDrafFunction"
        ></Header>
    </div>
    <div class="commentPptBox">
        <div class="ppt" >
          <el-row>
            <el-col :span="4">
              <div class="menu pptMenu">
                <div v-if="!isPptDetail" class=" checkallli">
                  <span>全选</span>
                  <span class="checkallbox">
                    <input
                      type="checkbox"
                      class="menucheckbox"
                      v-model="checkAll"
                      @change="handleCheckAllLi()"
                    />
                  </span>
                </div>
                <ul class="firstlevel" ref="menuList">
                  <!-- <draggable
                    :list="menuContent"
                    class="list-group"
                    ghost-class="ghost"
                    :disabled="isPptDetail"
                    :move="onDragItem"
                    @start="isDragging = true"
                    @end="isDragging = false"
                    handle=".dragLi"
                  > -->
                    <li
                      v-for="(item,index) in menuContent"
                      :key="item.uuid"
                      :data="index"
                      :class="{'actived': currentindex === index, 'dragLi': editMenuItem.uuid !== item.uuid}"
                      class="ullisty"
                    >
                      <!-- 详情 -->
                      <div class="libox" v-if="isPptDetail" :title="item.name" @click="selectLi(index)" >
                        <span ref="editItem" class="edititem" :title="item.name"  >{{item.name}}</span>
                      </div>
                      <!-- 编辑 -->
                      <div class="libox" v-if="!isPptDetail" @click="selectLi(index)">
                        <span ref="editItem" class="edititem" :title="item.name">{{item.name}}</span>
                        <input
                          ref="inputMenu"
                          type="text"
                          class="inputMenu"
                          v-model="inputModel"
                          @blur="inputSub(index, item)"
                        />
                        <div class="check-item-option">
                          <el-dropdown class="el-dropdown-wapper" size="small">
                            <span class="el-dropdown-link">
                              <i class="el-icon-more" style="transform: rotate(90deg)"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item
                                style="font-size: 12px"
                                @click.native="editLi(item, index)"
                              >编辑</el-dropdown-item>
                              <el-dropdown-item
                                style="font-size: 12px ;display: none"
                                @click.native="onAddItem(index)"
                              >新增</el-dropdown-item>
                              <el-dropdown-item
                                style="font-size: 12px;display: none"
                                @click.native="delLi(item)"
                              >删除</el-dropdown-item>
                            </el-dropdown-menu>
                          </el-dropdown>
                          <input
                            type="checkbox"
                            class="menucheckbox licheckbox"
                            :value="item.uuid"
                            v-model="checkedItems"
                            @change="handleLi($event, index,item.uuid)"
                          />
                        </div>
                      </div>
                    </li>
                  <!-- </draggable> -->
                </ul>
              </div>
            </el-col>
            <el-col :span="16" style="padding:0 10px;" class="mainContent">
              <div>
                <Intro :status="edit.status" :intro="ppt_base"></Intro>
              </div>
              <div class="right">
                <div class="ppt-wapper">
                  <div class="canvas"></div>
                  <div v-if="!isPptDetail">
                    <div
                      class="ppt-badge"
                      :class="{'ppt-badge-active': menuContent.length > 0 &&
                            checkedItems.indexOf(menuContent[currentindex].uuid) !== -1}"
                    >已加入</div>
                  </div>
                </div>
                <div class="pptcanvas_page">
                  <el-row type="flex" justify="space-around">
                    <el-col
                      :span="7"
                      class="fontLine"
                      :title= "menuContent.length > 0 ? menuContent[currentindex].name : ''"
                    >{{menuContent.length > 0 ? menuContent[currentindex].name : ''}}</el-col>
                    <el-col :span="7" style="text-align:center">
                      <i class="el-icon-caret-left" @click="prevBtn"></i>
                      <span>第{{cpage}}页，共{{tpage}}页</span>
                      <i class="el-icon-caret-right" @click="nextBtn"></i>
                    </el-col>
                    <el-col :span="7" style="text-align:right">
                      <i
                        class="iconfont xxm-quanpingzuidahua btn-fullscreen"
                        @click="cfullScreen"
                      >全屏</i>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div v-if="isPptDetail">
                <div>
                  <author :author="ppt_base"></author>
                </div>
                <div></div>
              </div>
              <div v-if="!isPptDetail">
                <div class="insert-media-wapper">
                  <div class="media-item">
                    <img :src="pptImageUrl" class="media-image" />
                    <h4 class="media-title">课件</h4>
                    <div class="media-subtitle">共有：95</div>
<!--                    <div class="media-mask">-->
<!--                      <el-button size="mini" type="warning" style="margin-bottom: 12px">打开网站</el-button>-->
<!--                      <el-button size="mini" type="danger" style="margin-bottom: 12px">打开本地</el-button>-->
<!--                      -->
<!--                    </div>-->
                  </div>
                  <div class="media-item">
                    <img :src="docImageUrl" class="media-image" />
                    <h4 class="media-title">题库</h4>
                    <div class="media-subtitle">共有：95</div>
<!--                    <div class="media-mask">-->
<!--                      <el-button size="mini" type="warning" style="margin-bottom: 12px">打开网站</el-button>-->
<!--                      <el-button size="mini" type="danger" style="margin-bottom: 12px">打开本地</el-button>-->
<!--                      -->
<!--                    </div>-->
                  </div>
                  <div class="media-item">
                    <img :src="vedioImageUrl" class="media-image" />
                    <h4 class="media-title">视频</h4>
                    <div class="media-subtitle">共有：95</div>
<!--                    <div class="media-mask">-->
<!--                      <el-button size="mini" type="warning" style="margin-bottom: 12px">打开网站</el-button>-->
<!--                      <el-button size="mini" type="danger" style="margin-bottom: 12px">打开本地</el-button>-->
<!--                      -->
<!--                    </div>-->
                  </div>
                  <div class="media-item">
                    <img :src="gifImageUrl" class="media-image" />
                    <h4 class="media-title">GIF</h4>
                    <div class="media-subtitle">共有：95</div>
<!--                    <div class="media-mask">-->
<!--                      <el-button size="mini" type="warning" style="margin-bottom: 12px">打开网站</el-button>-->
<!--                      <el-button size="mini" type="danger" style="margin-bottom: 12px">打开本地</el-button>-->
<!--                     -->
<!--                    </div>-->
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="info leftmenu">
                <div class="tabplan">
                  <div class="myPptCon" v-if="!isPptDetail">我的课件（共{{checkedItems.length}}页）</div>
                  <ul class="page" :class="{'edit-page-wapper': !isPptDetail}"></ul>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
    </div>
    <div class="fullscreen">
      <input type="button" class="btn-exit-fullscreen" value="退出全屏" />
    </div>
    <div class="del-menu-tips-wapper">
      <el-dialog title="删除" :visible.sync="delMenuDialogVisible" width="550px" center>
        <div style="text-align: center">删除后将不能恢复，确认删除吗？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="delMenuDialogVisible = false">取 消</el-button>
          <el-button type="danger" @click="onDelItem(delMenuItem)">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import pptImage from '../../assets/image/ppt.png' // 导入静态图片文件
import docImage from '../../assets/image/doc.png'
import vedioImage from '../../assets/image/vedio.png'
import gifImage from '../../assets/image/gif.png'
import draggable from 'vuedraggable'
import uuid from 'uuid'
import SPpt from '../../../static/utils/pptcontent/script/webppt.js'
import Header from '@/components/common/Header'
import Intro from '@/components/common/Intro'
import comment from '../../components/common/Comment'
import desccom from '../../components/common/Intro'
import author from '../../components/common/Author'
import uploadonly from '@/components/uploadfile/upload-only'
import $ from 'jquery'
import {
  fetchPptDetail,
  fetchPptDetailFromDrafts,
  returnSource,
  fetchMenuLists,
  fetchMenuEdit,
  fetchDetailUpdinfo,
  fetchPptSaveEdit
} from '../../api/index'
// import { setTimeout } from 'timers'
export default {
  name: 'pptdetail',
  components: {
    draggable,
    comment,
    desccom,
    Header,
    Intro,
    author,
    uploadonly
  },
  data () {
    return {
      saveDrafts: [],
      isIndeterminate: true,
      checkAll: true,
      checkedItems: [],
      flag: true,
      isshow: false,
      currentindex: 0,
      menuEdit: true,
      isPptDetail: true,
      menulabel: '',
      inputModel: '',
      web: undefined,
      scale: '',
      pptDataList: [],
      ppt_base: '',
      ppt_json: [],
      cpage: '',
      tpage: '',
      menuContent: [],
      pptImageUrl: pptImage,
      docImageUrl: docImage,
      vedioImageUrl: vedioImage,
      gifImageUrl: gifImage,
      delMenuDialogVisible: false,
      delMenuItem: '',
      editMenuItem: {},
      isDragging: false,
      delayedDragging: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      edit: {
        // 编辑状态
        status: false,
        pptSaveDraft: true
      },
      noPagePpt: ''
    }
  },
  directives: {
    // 注册一个局部的自定义指令 v-focus
    focus: {
      // 指令的定义
      update: function (el) {
        // 聚焦元素
        el.querySelector('input').focus()
      }
    }
  },
  created: function () {

  },
  mounted () {
    this.pageInit()
    setTimeout(() => {
      $('.tabplan').append(`
        <div class='noPagePpt'>还未选择页面<br>
            <span>请从左侧课件中选择</span>
        </div>
        `)
    }, 500)
    this.handleCheckAllLi()
  },
  destroyed: function () {
    clearInterval(this.autoSaveTimer)

  },
  watch: {
    $route (to, from) {
      this.pageInit(true)
    },
    isDragging (newValue) {
      if (newValue) {
        this.delayedDragging = true
        return
      }
      this.$nextTick(() => {
        this.delayedDragging = false
      })
    }
  },
  methods: {
    initHeight () {
      var cHeight = document.documentElement.clientHeight || document.body.clientHeight // 窗口高度
      var tHeight = document.getElementsByClassName('topbox')[0].clientHeight // 页面头部高度
      var pptbox = document.getElementsByClassName('ppt')[0] // ppt详情内容高度
      var mainContent = document.getElementsByClassName('mainContent')[0]
      var infoMenu = document.getElementsByClassName('leftmenu')[0]
      pptbox.style.height = cHeight - tHeight - 40 + 'px'
      mainContent.style.height = pptbox.style.height
      infoMenu.style.height = pptbox.style.height
      var lHeight = document.getElementsByClassName('menu')[0]
      lHeight.style.height = pptbox.style.height
    },
    initWebPpt () {
      if (!this.web) {
        const _this = this
        this.web = new SPpt({
          container: $('.canvas'),
          objectContainer: $('.ppt ul.object'),
          pageContainer: $('.ppt ul.page'),
          thumbWidth: 211,
          onPageChange: (oldPage, nowPage) => {
            _this.cpage = nowPage
            this.selectLi(nowPage - 1)
          }
        })
      }
    },
    showPpt (json) {
      $('.ppt ul.docment li div').empty()
      $('.ppt ul.object').empty()
      var w = json.ppt.info.layoutWidth
      this.scale = json.ppt.info.layoutHeight / w
      var h = $('.canvas').width() * this.scale
      $('.canvas').height(h)

      console.log('ppt ---->', json.ppt)
      console.log('resourse --->', json.resource)
      this.web.load({
        data: json.ppt,
        resource: json.resource
      })
    },
    // 获取ppt内容
    getPptdetail: function () {
      fetchPptDetail({
        id: this.$route.query.ptid,
        is_drafts: this.$route.query.is_drafts
      })
        .then(res => {
          if (res.data.status == 1) {
            this.pptDataList = res.data.data
            this.getMenuLists()
            this.ppt_base = this.pptDataList.ppt_base
            this.ppt_json = this.pptDataList.ppt_json
            this.showPpt(this.ppt_json)
            this.tpage = this.web.getPageMax()
            this.cpage = this.web.getPage()
          } else if (res.data.status == 0) {
            this.$message({
              message: res.data.info
            })
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    // 从创建资源回退到ppt编辑页面时，读取草稿箱对应的ppt详情
    getPptdetailFromDrafts: function () {
      fetchPptDetail({ id: this.$route.query.ptid })
        .then(res => {
          if (res.data.status == 1) {
            this.pptDataList = res.data.data
            this.ppt_base = this.pptDataList.ppt_base
            this.ppt_json = this.pptDataList.ppt_json
            this.showPpt(this.ppt_json)
            this.tpage = this.web.getPageMax()
            this.cpage = this.web.getPage()
            this.getMenuLists()
            if ((this.$route.query.isPptEdit = 1)) {
              this.$router.push({
                name: 'pptdetail',
                query: {
                  ptid: this.$route.query.ptid,
                  type: this.$route.query.type,
                  isPptEdit: 1
                }
              })
              this.editStatus = !this.editStatus
              this.$emit('onEdit', this.editStatus)
            }
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    cfullScreen () {
      screenfull && screenfull.request()
      var _scale = $('.fullscreen').height() / $('.fullscreen').width()

      var w = $('.canvas').width()
      var h = $('.canvas').height()
      $('.fullscreen')
        .append(
          $('.canvas').css({
            width: w,
            height: h,
            transform:
              'scale(' +
              $('.fullscreen').width() / w +
              ',' +
              $('.fullscreen').width() / w +
              ')'
          })
        )
        .css({
          display: 'flex'
        })
      //   })
      $('.ppt-badge').css('opacity', '0')
      this.ofullScreen()
    },
    ofullScreen () {
      $('.btn-exit-fullscreen').on('click', function () {
        $('.ppt-badge').css('opacity', '1')
        screenfull && screenfull.exit()
        $('.fullscreen').hide()
        $('.ppt .right').append(
          $('.canvas').css({
            transform: '',
            width: ''
          })
        )
        // this.web.reload()
      })
    },
    keydown (e) {
      $(document).unbind('keydown').bind('keydown', e => {
        switch (e.keyCode) {
          case 37: // 上
          case 38: // 左
          case 33: // pageup
            this.prevBtn()
            break

          case 39: // 下
          case 40: // 右
          case 34: // pageDown
            this.nextBtn()
            break

          case 27: // ESC键  用于全屏时恢复正常
            console.log('exit')
            $('.ppt-badge').css('opacity', '1')
            screenfull && screenfull.exit()
            // $('.btn-exit-fullscreen').click()
            $('.fullscreen').hide()
            $('.ppt .right').append(
              $('.canvas').css({
                transform: '',
                width: ''
              })
            )
            break
        }
      })
    },
    prevBtn () {
      console.log('---------')
      var page = this.web.getPage()
      if (page <= 1) {
        new Toast('当前第一页').show()
        return
      }
      this.web.pageTo(page - 1)

      this.cpage = this.web.getPage()
    },
    nextBtn () {
      var page = this.web.getPage()
      if (page >= this.web.getPageMax()) {
        new Toast('当前最后一页').show()
        return
      }
      this.web.pageTo(page + 1)
      this.cpage = this.web.getPage()
    },
    pptEdit () {
      this.isPptDetail = false
    },
    editLi (item, index) {
      // 所有文本显示
      $('.menu .firstlevel .edititem').css('display', 'block')
      // 所有输入框隐藏
      $('.menu .firstlevel .inputMenu').css('display', 'none')

      const rootLi = $('.menu .firstlevel').find(`li[data=${index}]`)
      const editItem = rootLi.find('.edititem')
      const inputMenu = rootLi.find('.inputMenu')

      this.inputModel = item.name
      this.editMenuItem = item
      editItem.css('display', 'none')
      inputMenu.css('display', 'block')

      this.$nextTick(function () {
        // DOM 更新了
        inputMenu.focus()
        // inputMenu.select()
      })
    },
    // 编辑完目录，移出鼠标
    inputSub (index, item) {
      const rootLi = $('.menu .firstlevel').find(`li[data=${index}]`)
      const editItem = rootLi.find('.edititem')
      const inputMenu = rootLi.find('.inputMenu')

      editItem.css('display', 'block')
      inputMenu.css('display', 'none')

      const editMenuIndex = this.menuContent.indexOf(item)
      this.menuContent.splice(editMenuIndex, 1, {
        ...item,
        name: this.inputModel
      })
      this.editMenuItem = {}
    },
    // 左侧目录全选
    handleCheckAllLi () {
      if (this.checkAll) {
        this.checkedItems = this.menuContent.map(item => {
          item.is_checked = 1
          return item.uuid
        })
        this.selectLi(this.currentindex)
        if (this.$route.query.isPptEdit == 1) {
          $('.ppt ul.page li').css('display', 'block')
          $(' .tabplan .noPagePpt').css('display', 'none')
        }
      } else {
        this.checkedItems = []
        $('.ppt ul.page li').css('display', 'none')
        $('.tabplan .noPagePpt').css('display', 'block')
        this.menuContent.map(item => {
          item.is_checked = 0
        })
      }
      this.saveDrafts = this.menuContent
    },
    // 判断是不是需要隐藏提示
    showOrhidePptImg () {
      let isPptEdit = this.$route.query.isPptEdit
      let is_drafts = this.$route.query.is_drafts
      if (isPptEdit == 1 && is_drafts == undefined) {
        $('.tabplan .noPagePpt').css('display', 'none')
        $('.ppt ul.page li').css('display', 'block')
        this.checkAll = true
        this.handleCheckAllLi()
      } else if (isPptEdit == 1 && is_drafts == 2) {
        $('.tabplan .noPagePpt').css('display', 'none')
        $('.ppt ul.page li').css('display', 'block')
      } else {
        $('.tabplan .noPagePpt').css('display', 'block')
        $('.ppt ul.page li').css('display', 'none')
      }
    },
    // 左侧目录多选
    handleLi (e, index, uuid) {
      setTimeout(() => {
        let tempNum = $('.ppt ul.page li').filter(function () {
          return $(this).css('display') !== 'none'
        }).length
        if (tempNum > 0) {
          $('.tabplan .noPagePpt').css('display', 'none')
        } else {
          $('.tabplan .noPagePpt').css('display', 'block')
        }
      })

      const isChecked = e.target.checked
      this.currentindex = index
      const handleItem = this.menuContent[index]
      this.handleCheckAll()

      $('.ppt ul.page li')
        .eq(index)
        .css('display', isChecked ? 'block' : 'none')

      this.menuContent.splice(index, 1, {
        ...handleItem,
        is_checked: isChecked ? 1 : 0
      })
      this.checkedItems = this.menuContent
        .filter(_ => _.is_checked)
        .map(_ => _.uuid)
      this.saveDrafts = this.menuContent
      this.selectLi(index)
    },
    // 左侧目录数据
    getMenuLists () {
      fetchMenuLists({
        cid: this.$route.query.ptid,
        is_drafts: this.$route.query.is_drafts
      })
        .then(res => {
          if (res.data.status === 1) {
            this.handleMenuInit(res.data.data)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    selectLi (index) {
      this.currentindex = index
      this.web.pageTo(index + 1)

      const scrollContainer = $('.ppt .tabplan')
      const selectThumb = $('.ppt ul.page li').eq(index)
      const thumbHeight = selectThumb.height()
      const offsetTop = (parseInt(index) + 1) * thumbHeight
      const currentScrollTop = scrollContainer.scrollTop()

      if (
        offsetTop < currentScrollTop ||
        currentScrollTop < offsetTop - scrollContainer.height()
      ) {
        $('.ppt .tabplan').scrollTop(offsetTop - thumbHeight)
      }

      $('.ppt ul.page li:first-child').css('border', '1px solid #fff')
      $('.ppt ul.page li').removeClass('h')
      let lidataindex = $('ul.page li')
      for (let i = 0; i < lidataindex.length; i++) {
        let a = lidataindex[i]
        if ($(a).attr('data-index') == index) {
          $(a).addClass('h')
        }
      }
    },
    // ppt完成编辑
    onEdit (e) {
      this.edit.status = e
      this.isPptDetail = !e
      if (this.isPptDetail == false) {
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
    updataPptdetail () {
      fetchDetailUpdinfo({
        id: this.ppt_base.id,
        desc: this.ppt_base.desc,
        content: this.ppt_base.content
      })
        .then(res => {
          if (res.data.status === 1) {
            console.log(res)
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    pageInit (isBack) {
      const { ptid, type, isPptEdit, saveDraft, siteTitle } = this.$route.query

      if (isPptEdit) {
        this.isPptDetail = false
        this.editStatus = true
        this.edit.status = true
      } else if (!isPptEdit) {
        this.isPptDetail = true
        this.editStatus = false
        this.edit.status = false
      } else if (siteTitle) {
        this.isPptDetail = true
        this.editStatus = true
        this.edit.status = true
      }

      isBack && (this.$refs.header.editStatus = this.editStatus)

      this.initWebPpt()
      this.keydown()
      this.initHeight()

      if (!this.menuContent || !this.menuContent.length) {
        if (saveDraft) {
          // 创建资源回退到编辑页面
          this.getPptdetailFromDrafts()
        } else {
          this.getPptdetail()
        }
      } else {
        this.handleMenuInit(this.menuContent)
      }
    },
    handleMenuInit (menuContent = []) {
      if (menuContent.length > 0) {
        this.menuContent = menuContent.map(item => ({
          ...item,
          uuid: item.uuid || uuid()
        }))

        if (!this.isPptDetail) {
          this.handlePptEditInit()
        } else {
          this.handlePptDetailInit()
        }

        this.selectLi(this.currentindex)
      }
    },
    handlePptDetailInit () {
      return new Promise((resolve, reject) => {
        const pageToolNode = $('.ppt .page li .page-tool')
        pageToolNode.prev().css('display', 'none')
        pageToolNode.empty()
        pageToolNode.each((i, node) => {
          let dataIndex = $(node)
            .parent()
            .attr('data-index')
          $(node).before(`<div>第${++dataIndex}页</div>`)
        })
        resolve()
      })
    },
    handlePptEditInit () {
      const that = this
      return new Promise((resolve, reject) => {
        this.checkedItems = this.menuContent
          .filter(_ => _.is_checked)
          .map(_ => _.uuid)

        $('.ppt ul.page li').each((i, node) => {
          const dataIndex = $(node).attr('data-index')
          const dataUuid = that.menuContent[dataIndex].uuid

          if (that.checkedItems.indexOf(dataUuid) === -1) {
            $(node).css('display', 'none')
          }
        })

        this.handleCheckAll()
        this.handlePageToolInit()
        this.autoSaveDraft()
        resolve()
      })
    },
    handlePageToolInit () {
      const that = this
      const pageToolNode = $('.ppt .page li .page-tool')
      pageToolNode.prev().css('display', 'none')
      pageToolNode.empty()

      pageToolNode.each((i, node) => {
        const dataIndex = $(node)
          .parent()
          .attr('data-index')
        const dataUuid = that.menuContent[dataIndex].uuid

        $(node).append(
          `<i class="el-icon-top i-move-up" data-uuid=${dataUuid} ></i>
           <i class="el-icon-bottom i-move-down" data-uuid=${dataUuid}></i>
           <i class="el-icon-circle-plus-outline i-add" style="visibility: hidden" data-uuid=${dataUuid}></i>
           <i class="el-icon-remove-outline i-remove" data-uuid=${dataUuid}></i>
              `
        )
      })
      pageToolNode.find('.i-move-up').unbind('click').click(function (e) {
        e.stopPropagation()
        const dataUuid = $(this).attr('data-uuid')
        const dataIndex = that.checkedItems.indexOf(dataUuid)
        if (dataIndex === 0) {
          new Toast('已经是第一页').show()
          return
        }

        let destDataUuid
        $(this)
          .parent()
          .parent()
          .prevAll()
          .each((i, node) => {
            if ($(node).css('display') !== 'none') {
              destDataUuid = $(node)
                .find('.page-tool .i-move-up')
                .attr('data-uuid')
              return false
            }
          })
        that.onThumbMove(dataUuid, destDataUuid)
      })
      pageToolNode.find('.i-move-down').click(function (e) {
        e.stopPropagation()
        const dataUuid = $(this).attr('data-uuid')
        const dataIndex = that.checkedItems.indexOf(dataUuid)
        if (dataIndex === that.checkedItems.length - 1) {
          new Toast('已经是最后一页').show()
          return
        }

        let destDataUuid
        $(this)
          .parent()
          .parent()
          .nextAll()
          .each((i, node) => {
            if ($(node).css('display') !== 'none') {
              destDataUuid = $(node)
                .find('.page-tool .i-move-down')
                .attr('data-uuid')
              return false
            }
          })

        that.onThumbMove(dataUuid, destDataUuid)
      })
      pageToolNode.find('.i-add').click(function (e) {
        e.stopPropagation()
        const dataUuid = $(this).attr('data-uuid')
        const addItem = that.menuContent.find(item => item.uuid === dataUuid)
        const dataIndex = that.menuContent.indexOf(addItem)
        that.onAddItem(dataIndex)
      })
      pageToolNode.find('.i-remove').click(function (e) {
        e.stopPropagation()
        const dataUuid = $(this).attr('data-uuid')
        const movedItem = that.menuContent.find(item => item.uuid === dataUuid)
        const dataIndex = that.menuContent.indexOf(movedItem)

        $('.ppt ul.page li')
          .eq(dataIndex)
          .css('display', 'none')
        that.checkedItems = that.checkedItems.filter(uuid => uuid !== dataUuid)
        that.handleCheckAll()
        that.selectLi(dataIndex)
      })
    },
    delLi (item) {
      this.delMenuDialogVisible = true
      this.delMenuItem = item
    },
    onThumbMove (dataUuid, destDataUuid) {
      const that = this
      const movedMenu = this.menuContent.find(item => item.uuid === dataUuid)
      const srcIndex = this.menuContent.indexOf(movedMenu)
      const destMenu = this.menuContent.find(
        item => item.uuid === destDataUuid
      )
      const destIndex = this.menuContent.indexOf(destMenu)

      this.web.pageMove(srcIndex, destIndex)
      this.moveItem(srcIndex, destIndex, (newMenuContent) => {
        that.$nextTick(function () {
          that.menuContent = newMenuContent
        })
        that.selectLi(destIndex)
      })
    },
    onDelItem (item) {
      const delMenuIndex = this.menuContent.indexOf(item)
      this.menuContent.splice(delMenuIndex, 1)
      this.checkedItems = this.menuContent
        .filter(_ => _.is_checked)
        .map(_ => _.uuid)

      // 删除ppt，重新绑定pageTool里的事件
      this.web.pageRemove(delMenuIndex)
      this.handlePageToolInit()

      this.delMenuDialogVisible = false
      this.tpage = this.web.getPageMax()
      const nextSelectedMenu =
        this.currentindex >= this.menuContent.length
          ? this.menuContent.length - 1
          : delMenuIndex
      this.selectLi(nextSelectedMenu)
      this.handleCheckAll()
      this.saveDrafts = this.menuContent
    },
    onAddItem (index) {
      const emptyMenuObj = { name: '新增页面', is_checked: 1, uuid: uuid() }

      const addMenuIndex = parseInt(index) + 1
      this.menuContent.splice(addMenuIndex, 0, emptyMenuObj)
      this.checkedItems = this.menuContent
        .filter(_ => _.is_checked)
        .map(_ => _.uuid)
      console.log('index', addMenuIndex)

      // 新增ppt，重新绑定pageTool里的事件
      this.web.pageCreate()
      this.web.pageMove(0, addMenuIndex)
      this.handlePageToolInit()

      this.tpage = this.web.getPageMax()
      this.handleCheckAll()
      this.selectLi(addMenuIndex)
      this.saveDrafts = this.menuContent
    },
    onDragItem ({ relatedContext, draggedContext }) {
      const srcIndex = draggedContext.index
      const destIndex = relatedContext.index
      this.web.pageMove(srcIndex, destIndex)
      this.moveItem(srcIndex, destIndex)
    },
    moveItem (srcIndex, destIndex, callback) {
      let newArray = this.menuContent.slice(0)
      this.moveArrayItem(newArray, srcIndex, destIndex)
      newArray = newArray.map((menu, index) => ({
        ...menu,
        sort: index + 1
      }))
      this.checkedItems = newArray
        .filter(_ => _.is_checked)
        .map(_ => _.uuid)

      this.saveDrafts = newArray
      callback && callback(newArray)
    },
    moveArrayItem (array, srcIndex, destIndex) {
      if (srcIndex > destIndex) {
        array.splice(destIndex, 0, array[srcIndex])
        array.splice(srcIndex + 1, 1)
      } else {
        array.splice(destIndex + 1, 0, array[srcIndex])
        array.splice(srcIndex, 1)
      }
    },
    handleCheckAll () {
      this.checkAll = this.menuContent.length === this.checkedItems.length
    },
    autoSaveDraft () {
      const that = this
      if (that.autoSaveTimer) {
        clearInterval(this.autoSaveTimer)
      }

      this.autoSaveTimer = setInterval(() => {
        that.$refs.header.onSaveInterval()
      }, 10000)
    },
    getfilename (filename) {
      console.log(filename)
    },
    // 清楚定时器定时保存草稿的方法
    clearSaveDrafFunction () {
      if (this.autoSaveTimer) {
        clearInterval(this.autoSaveTimer)
      }
    }
  }
}
</script>
<style lang='scss'>
@import '../../assets/css/pptDetail.scss';
</style>
