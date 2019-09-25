<template>

<div class="v_content_box">
    <div class="bodyright myresource">
    <div class="screenSort">
      <el-row type="flex" justify="left">
        <div class="fl fen">分类：</div>
        <el-radio-group
          v-model="selectTim"
          v-for="(item,index) in selectpptLists"
          :key="item.num"
          :value="item.num"
          :disabled="ismask"
          @change="changeInput(index,item.seType)"
          size="medium"
          v-cloak
        >
          <el-radio-button :label="item.num">{{item.seType}}</el-radio-button>
        </el-radio-group>
      </el-row>
    </div>
    <div>
      <el-row type="flex" justify="left" class="sort_new">
        <span @click="sortInput(item)" :class="{'sortclick':item.isCurr}" v-for="(item,index) in sortpptLists" :key="index">
          {{item.seType}}
          <i class="el-icon-top" v-show="item.desc && item.num!=0"></i>
          <i class="el-icon-bottom" v-show="!item.desc && item.num!=0"></i>
        </span>
      </el-row>
    </div>
    <!-- 备课资源列表 -->
    <div class="listbox">
      <div class="listbox_i">
        <div class="list-search">
          <el-row type="flex" justify="space-between">
            <el-col :span="4">
                <button  v-if="selectTim == '1'" class="selectPptBtn" @click="selectPptBtn()" v-text="selectPptBtnText"></button>
            </el-col>
            <el-col :span="8">
              <el-input placeholder="按名称搜索" v-model="listSearch" @keyup.enter.native="keysearch">
                <el-button slot="append" icon="el-icon-search" @click="keysearch" class="elbutton"></el-button>
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-col :span="10" class="usize" >
                <span v-show="siteType == '2' && selectTim !='0'">
                  <el-button type="text"  :disabled="ismask" @click="uploadfile()">
                    <i class="iconfont xxm-shangchuan" ></i>
                    上传
                  </el-button>
                </span>
              </el-col>
            </el-col>
          </el-row>
        </div>
        <div id="boxbox" style="overflow-y:scroll;">
          <el-row :gutter="20" v-if="istotalnum">
            <el-col :span="8" v-for="(item,index) in ptIdToLists" :key="index" v-cloak>
              <div class="ptcontent">
                <el-card shadow="hover">
                  <div class="share">
                    <el-row>
                      <el-col :span="6">
                        <span @click="collect(item.ptid,item.collectstatus)">
                          <i
                            v-show="item.collectstatus==0"
                            class="collect iconfont xxm-xihuan"
                            title='未收藏'
                          ></i>
                          <i
                            v-show="item.collectstatus ==1"
                            class="iconfont xxm-heart-copy"
                          title='取消收藏'
                          ></i>
                        </span>
                        <span>{{item.coll_count}}</span>
                      </el-col>
                      <el-col :span="12">
                        <span>
                          <i
                            v-show="selectTim ==='2' || '0' &&  item.type === '2' "
                            class="iconfont xxm-xiazai"
                            :title="'下载量'+item.down_count"
                            @click="download(item)"
                          ></i>
                          <span v-show="selectTim ==='2' || '0' &&  item.type === '2'">{{item.down_count}}</span>
                        </span>
                      </el-col>
                      <el-col :span="6" style="text-align:right;">
                        <span v-show="siteType == '2'" class="dia_span">
                          <i class="iconfont xxm-fenxiang" title="分享" @click="share(item.ptid)"></i>
                          <el-dialog
                            title="分享"
                            :visible.sync="shareDialogVisible"
                            width="30%"
                            center
                          >
                            <span>点击确认则分享到共享资源</span>
                            <span slot="footer" class="dialog-footer dia_span">
                              <el-button @click="shareDialogVisible = false">取 消</el-button>
                              <el-button type="primary" @click="shareConfirm">确 定</el-button>
                            </span>
                          </el-dialog>
                        </span>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="imgwrap listCardType">
                      <div class="listCardTypeContent">
                            <div>{{selectpptLists.filter(itemv => {
                                return itemv.num == item.type
                            })[0].seType}}</div>
                      </div>
                    <el-row>
                      <div class="imgbox" @click="pptSee(item.ptid,item.type,item.is_convert_status)"
                           :style="'background-image:url('+imgurlList[item.type]+');background-size: cover;background-position: 50%;}'">
                        <img :src="item.cover || imgurlList[item.type]" width="100%" height="100%"/>
                      </div>
                    </el-row>
                  </div>
                  <div class="pttxt">
                    <el-row type="flex" justify="center" class="ptname">
                      <el-col :span="20" class="pt">
                        <a @click="pptSee(item.ptid,item.type)" :title="item.ptname">{{item.ptname}}</a>
                      </el-col>
                    </el-row>
                    <div class="author">
                      <el-row type="flex" justify="space-between">
                        <el-col :span="10" v-if='item.user_name !=""'>作者：{{item.user_name}}</el-col>
                        <el-col :span="10" v-else>ID：{{item.user_id}}</el-col>

                        <el-col :span="14" style="text-align:right;">{{item.add_time}}</el-col>
                      </el-row>
                    </div>
                    <el-row type="flex" justify="left" class="countindex">
                      <el-col :span="6">
                        <i class="el-icon-view" :title="'浏览量'+item.view_count"></i>
                        <span class="scanCount">{{item.view_count}}</span>
                      </el-col>
                      <el-col :span="6">
                        <i class="el-icon-video-play" :title="'使用量'+item.use_count"></i>
                        <span class="useCount">{{item.use_count}}</span>
                      </el-col>
                      <el-col :span="12" style="text-align:right;" v-show="siteType == '2'">
                        <el-dropdown>
                          <span class="el-dropdown-link">
                            <i
                              class="el-icon-more el-icon--right"
                              style="transform:rotate(90deg);color:#999;"
                            ></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                              @click.native="((val)=>{pptedit(item.ptid,item.ptname,index,item.type,item.is_convert_status)})"
                            >编辑</el-dropdown-item>
                            <el-dropdown-item
                              @click.native="((val)=>{pptrename(item.ptid,item.ptname,index)})"
                            >重命名</el-dropdown-item>
                            <el-dropdown-item
                              @click.native="((val)=>{delppt(item.ptid,item.ptname,index)})"
                            >删除</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
                <div class="el-card-mask" v-if="ismask && item.is_convert_status == 1">
                  <div class="click-mask" @click="selectPptMask($event,index,item.ptid,item.ptname)">
                    <input  type="checkbox" :aaa="'check_id_'+item.ptid" :value="index" :ref="'check_id_'+item.ptid">
                  </div>
                </div>
                 <div class="hoverCard" v-if="item.is_convert_status == 0 && (item.type==1 || item.type==3)" >
                    <p class="hoverCardTxt">资源正在转码中，请您稍后刷新访问</p>
                </div>
              </div>
              <el-dialog
                title="重命名课件"
                :visible.sync="dialogVisible"
                width="30%"
                center
                :close-on-click-modal = "false"
                :before-close="handleClose"
              >
                <input type="text" v-model="rename" class="updateptname" />
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false"  class="btnStyle">取 消</el-button>
                  <el-button type="primary" @click="pptrenameConfirm">确 定</el-button>
                </span>
              </el-dialog>
              <el-dialog
                title="删除"
                :visible="deldialogVisible"
                width="30%"
                center
                :before-close="delhandleClose"
                :close-on-click-modal = "false"
              >
                <span class="delname">删除后将不能恢复,确定删除吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="deldialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="delpptConfirm(item.ptid)">确 定</el-button>
                </span>
              </el-dialog>
            </el-col>
          </el-row>
          <el-row v-if="!istotalnum" class="nodata">{{msg}}</el-row>
        </div>
      </div>

      <el-row type="flex" justify="center">
            <el-pagination  background layout="total, prev, pager, next"
                            :total="totalnum"
                            :page-size="pagesize"
                            :current-page.sync="currentPagev"
                            @current-change = "handleCurrentChange"

            ></el-pagination>
      </el-row>
    </div>
  </div>
      <!--进入组件弹出层-->
        <Popup :ismask="ismask" :ptIdToLists="ptIdToLists" :submitPptList="submitPptList" @callback="v_callback"/>
</div>
</template>
<script>
import { fetchShare, sourceDownload, fetchSources, fetchPptRename, fetchDelPpt, fetchCollect, fetchDownload, fetchPptScan, fetchPptSee } from '../../api/index'
import Popup from '../../components/Popup'
import { mapState } from 'vuex'
import wordCover from '../../assets/image/pdf_cover.png' // 导入静态图片
import pptCover from '../../assets/image/ppt-cover.png'
import videoCover from '../../assets/image/video-cover.png'
import gifCover from '../../assets/image/gif-cover.png'
import xitiCover from '../../assets/image/xiti-cover.png'
import imgCover from '../../assets/image/img-cover.png'
export default {
  name: 'siteresources',
  components: {
    Popup
  },
  data () {
    return {
      imgurlList: {'1': pptCover, '2': wordCover, '3': xitiCover, '4': videoCover, '5': gifCover, '6': videoCover, '7': imgCover},
      submitPptList: JSON.parse(localStorage.getItem('submitPptList')) || [],
      selectPptBtnText: '进入组课',
      newVal: '',
      ismask: this.$store.state.common.selectMask,
      iscreatefile: true,
      istotalnum: true,
      msg: '',
      isupload: true,
      isredheart: false,
      itemppt: {
        choosed: false
      },
      issortclick00: true,
      issortclick: false,
      issortclick01: false,
      issortclick02: false,
      issortclick03: false,
      cHeight: '',
      rename: '',
      ptid: '',
      shareid: '',
      ptidid: '',
      dialogVisible: false,
      deldialogVisible: false,
      shareDialogVisible: false,
      imageUrl: '',
      sort_time: false,
      sort_scan: false,
      sort_use: false,
      sort_save: false,
      sortType: '',
      sort_type: 'desc',
      sort_field: 0,
      listSearch: '',
      // isActive:-1,
      pptLevelListQuery: {
        subjectid: '',
        selectid: '',
        gradeid: '',
        versionid: ''
      },
      pptLevelList: [],
      chapter: [],
      section: [],
      currentPagev: 1,
      // 选修
      sectionList: [],
      ppt: [],
      pptList: [],
      subjects: {},
      grades: {},
      sectionid: this.getSelectTim,
      currentPage: 1, // 初始页
      pagesize: 24, // 每页的数据
      totalnum: 0,
      ispttxthover: false,
      selected: { subjectid: '1', gradeid: '1', versionid: '1', selectid: '1' },
      // 版本
      versionsList: [],
      ptIdToList: [],
      ptIdToLists: [],
      filterText: '',
      selectpptLists: [
        { seType: '全部', num: '0' },
        { seType: '课件', num: '1' },
        { seType: '微课', num: '6' },
        { seType: '学案', num: '2' },
        { seType: '习题', num: '3' },
        { seType: '视频', num: '4' },
        { seType: 'GIF', num: '5' },
        { seType: '图片', num: '7' }
      ],
      selectTim: localStorage.getItem('selectTimState'),
      sortpptLists: [{'seType': '不限', 'num': '0', 'isCurr': true},
        {'seType': '时间', 'num': '1', 'isCurr': false, 'desc': false},
        {'seType': '浏览量', 'num': '2', 'isCurr': false, 'desc': false},
        {'seType': '使用量', 'num': '3', 'isCurr': false, 'desc': false},
        {'seType': '收藏量', 'num': '4', 'isCurr': false, 'desc': false}],
      selectTim01: '',
      siteType: '',
      collectstatus: null,
      showPPtList: true,
      statusCode: sessionStorage.getItem('statusCode'),
      isShowPage: true
    }
  },
  computed: {
    ...mapState({
      ptidname () {
        return this.$store.state.common.ptid
      }
    }),
    getVersionId () {
      return this.$store.state.common.versionId
    },
    getDataListStatus () {
      return this.$store.state.common.selectListStatus
    },
    getUname () {
      return this.$store.state.common.userName
      console.log('用户名', this.userName)
    },
    getUname () {
      return this.$store.state.common.userName
      console.log('用户名', this.userName)
    }
  },

  watch: {

    ptidname () {
      this.currentPagev = 1
      sessionStorage.setItem('currentPage', this.currentPagev)
      this.newVal = localStorage.getItem('watchStorage')
      this.pptDetailShow()
    },
    // 监听查询列表中是否有值 调用刷新ppt列表
    getDataListStatus () {
      this.pptDetailShow()
    },
    getStatusCode () {
      console.log('33333333333', this.getStatusCode)
    },
    currentPagev (val) {
      this.pptDetailShow()
    }
  },

  created: function () {
    // this.initHeight();
    this.newVal = localStorage.getItem('watchStorage')
    localStorage.removeItem('submitPptList')
    let currentPage = Number(sessionStorage.getItem('currentPage'))
    this.pptDetailShow()
    this.currentPagev = currentPage || 1
  },
  mounted: function () {
    this.isCollect()
    this.initHeight()
    sessionStorage.removeItem('watchStorage')

    // 导航分类传值

    this.siteType = this.$route.meta.active
    // 通过dispatch改变网站资源/我的资源/共享资源的状态变量
    this.$store.dispatch('common/setSiteTypeNum', this.siteType)

    this.siteType = this.$route.meta.active

    // 向vuex中的isShare传值
    this.$store.dispatch('common/setShare', this.siteType)
    var ptcontentList = document.getElementsByClassName('.ptcontent')

    if (this.statusCode == 0) {
      this.totalnum = 0
      this.istotalnum = false
      this.msg = '~暂无数据~'
    } else {
      this.istotalnum = true
    }
  },
  methods: {
    v_callback (index, cid) {
      let checkPPtList = this.$refs['check_id_' + cid]
      this.submitPptList.splice(index, 1)
      for (var i = 0; i < this.ptIdToLists.length; i++) {
        if (this.ptIdToLists[i].ptid == cid) {
          checkPPtList[0].checked = false
        }
      }
    },
    selectPptMask (event, index, ptid, name) {
      event.stopPropagation()
      let thisCheckObj = this.$refs['check_id_' + ptid]
      if (this.submitPptList.length >= 5 && !thisCheckObj[0].checked) {
        this.$message({
          message: '最多选5个课件组合！'
        })
        return false
      }
      thisCheckObj[0].checked = !thisCheckObj[0].checked
      this.putlicCheck(thisCheckObj, ptid, name)
    },
    putlicCheck (thisCheckObj, ptid, name) {
      if (thisCheckObj[0].checked) {
        this.submitPptList.push({'cid': ptid, 'ptname': name})
      } else {
        for (var i = 0; i < this.submitPptList.length; i++) {
          if (this.submitPptList[i].cid == ptid) {
            this.submitPptList.splice(i, 1)
          }
        }
      }
    },
    selectPptBtn () {
      this.submitPptList = []
      this.ismask = !this.ismask
      this.selectPptBtnText = this.ismask ? '退出组课' : '进入组课'
      this.$store.dispatch('common/setSelectMask', this.ismask)
    },
    share (id) {
      this.shareDialogVisible = true
      this.shareid = id
    },
    shareConfirm () {
      fetchShare({ id: this.shareid })
        .then(res => {
          if (res.data.status == 1) {
            this.$message({
              message: '分享成功',
              type: 'success'
            })
          } else if (res.data.status == 0) {
            this.$message({
              message: '你已经分享了这个资源!'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.shareDialogVisible = false
    },
    initHeight () {
      let cHeight = document.documentElement.clientHeight || document.body.clientHeight
      let lHeight = document.getElementById('boxbox')
      lHeight.style.height = cHeight - 324 + 'px'
    },
    uploadfile () {
      console.log('query', this.selectTim)
      this.$router.push({
        name: 'upload',
        query: {
          siteTitle: '上传资源',
          type: this.selectTim
        }
      })
    },
    pptDetailShow (itemppt, itemsection, ptid, ptname, index, e) {
      let lastTreeId = sessionStorage.getItem('lastTreeId') ? sessionStorage.getItem('lastTreeId').split(',') : ''
      this.sectionid = lastTreeId[4] || ''
      let params = {
        vid: this.getVersionId,
        sectionid: this.sectionid,
        type: this.selectTim, // 分类
        sort_field: this.sort_field, // 1,2,3,4
        sort_type: this.sort_type,
        offset: (this.currentPagev - 1) * this.pagesize, // 偏移量
        pageSize: this.currentPagev, // 页码
        pageCount: this.pagesize, // 每次请求个数
        is_sys: this.$route.meta.active,
        keywords: this.listSearch
      }

      this.ptIdToLists = []
      // this.totalnum = 0
      // console.log('params', params)
      // 此处传入节的id，查询出所有ppt
      fetchSources(params)
        .then(res => {
          this.ptIdToLists = []
          this.totalnum = 0
          this.msg = '~暂无数据~'
          if (res.data.status == 1) {
            if (res.data.totalnum == 0) {
              this.istotalnum = false
              this.msg = '~暂无数据~'
            } else if (res.data.totalnum > 0) {
              this.istotalnum = true
              this.ptIdToLists = res.data.data
              console.log('ppt数据', this.ptIdToLists)
              this.totalnum = res.data.totalnum
              if (this.ismask) {
                setTimeout(() => {
                  var thisList = this.ptIdToLists
                  var subList = this.submitPptList
                  console.log(thisList)
                  console.log(subList)
                  for (var i = 0; i < thisList.length; i++) {
                    for (var j = 0; j < subList.length; j++) {
                      if (thisList[i].ptid == subList[j].cid) {
                        let thisCheckObj = this.$refs['check_id_' + subList[j].cid]
                        thisCheckObj[0].checked = true
                      }
                    }
                  }
                })
              }
            }
          } else {
            this.msg = '~暂无数据~'
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    keysearch: function () {
      this.pptDetailShow()
    },
    titlebg (itemppt, index) {},
    changeInput (index) {
      // 分类
      // 需要删除之前记住的页码
      this.currentPagev = 1
      sessionStorage.setItem('currentPage', this.currentPagev)
      localStorage.setItem('selectTimState', this.selectTim)
      switch (this.selectTim) {
        case '1':
          this.iscreatefile = true
          this.isupload = true
          break
        case '2':
          this.iscreatefile = false
          this.isupload = false
          break
      }
      this.pptDetailShow()
    },
    sortInput (item) {
      this.sortpptLists.forEach(temp => {
        if (temp.num == item.num) {
          temp.isCurr = true
          temp.desc = !temp.desc
          this.sort_field = temp.num
          this.sort_type = temp.desc ? 'desc' : 'asc'
        } else {
          temp.isCurr = false
          temp.desc = false
        }
      })
      this.pptDetailShow()
    },
    pptedit (ptid, ptname, index, type, convertStatus) {
      if (convertStatus == 0) {
        this.$message({

        })
      }
      { if (this.selectTim == 0) {
        if (type == 1) {
          this.$router.push({
            name: 'pptdetail',
            query: { ptid: ptid, type: 1, isPptEdit: true}
          })
        } else if (type == 2) {
          this.$router.push({ name: 'guide', query: { ptid: ptid, type: 2, isGuideEdit: true } })
        } else if (type == 3) {
          this.$router.push({ name: 'pptdetail', query: { ptid: ptid, type: 3, isPptEdit: true } })
        } else if (type == 4) {
          this.$router.push({ name: 'movie', query: { ptid: ptid, type: 4, isMovieEdit: true } })
        } else if (type == 5) {
          this.$router.push({ name: 'gif', query: { ptid: ptid, type: 5, isGifEdit: true } })
        } else if (type == 6) {
          this.$router.push({ name: 'microCourse', query: { ptid: ptid, type: 6, isMicroCourseEdit: true } })
        } else if (type == 7) {
          this.$router.push({ name: 'image', query: { ptid: ptid, type: 7, isImageEdit: true } })
        }
        // 点击按钮跳转对应页面
      } else if (this.selectTim == 1) {
        // 课件
        this.$router.push({
          name: 'pptdetail',
          query: { ptid: ptid, type: 1, isPptEdit: true }
        })
      } else if (this.selectTim == 2) {
        // 导教案
        this.$router.push({
          name: 'guide',
          query: { ptid: ptid, type: 2, isGuideEdit: true }
        })
      } else if (this.selectTim == 3) {
        // 习题
        this.$router.push({
          name: 'pptdetail',
          query: { ptid: ptid, type: 3, isPptEdit: true }
        })
      } else if (this.selectTim == 4) {
        // 视频
        this.$router.push({
          name: 'movie',
          query: { ptid: ptid, type: 4, isMovieEdit: true }
        })
      } else if (this.selectTim == 5) {
        // gif
        this.$router.push({
          name: 'gif',
          query: { ptid: ptid, type: 5, isGifEdit: true }
        })
      } else if (this.selectTim == 6) {
        // 微课
        this.$router.push({
          name: 'microCourse',
          query: { ptid: ptid, type: 6, isMicroCourseEdit: true }
        })
      } else if (this.selectTim == 7) {
        // 图片
        this.$router.push({
          name: 'image',
          query: { ptid: ptid, type: 7, isImageEdit: true }
        })
      } }
      // 使用量+1
      fetchPptSee({ ptid: ptid, type: 3 }).then(res => {
        if (res.data.status == 1) {
          this.pptDetailShow()
        }
      })
    },
    pptrename (ptid, ptname, index) {
      this.dialogVisible = true
      this.rename = ptname
      this.ptid = ptid
    },
    handleClose (done) {
      this.dialogVisible = false
    },
    delhandleClose (done) {
      this.deldialogVisible = false
    },
    // 记住当前点击的页码
    handleCurrentChange () {
      // 记录上次点击页码
      sessionStorage.setItem('currentPage', this.currentPagev)
    },
    pptrenameConfirm (ptid, ptname) {
      console.log(this.ptid, this.rename)
      fetchPptRename({ ptid: this.ptid, ptname: this.rename, is_sys: this.$route.meta.active })
        .then(res => {
          if (res.data.status != 0) {
            this.dialogVisible = false
            this.pptDetailShow()
            this.$message({
              message: res.data.info,
              duration: 2000,
              type: 'success'
            })
          } else if (res.data.status == 0) {
            this.$message({
              message: res.data.info,
              duration: 2000
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.dialogVisible = false
    },
    delppt (ptid, ptname, index) {
      this.deldialogVisible = true
      this.ptid = ptid
    },
    delpptConfirm (ptid, ptname) {
      fetchDelPpt({ 'ptid': this.ptid, 'is_sys': this.$route.meta.active })
        .then(res => {
          console.log('删除', res)
          if (res.data.status == 1) {
            this.deldialogVisible = false
            this.pptDetailShow()
            this.$message({
              message: res.data.info,
              type: 'success',
              duration: 2000
            })
          } else if (res.data.status == 0) {
            this.$message({
              message: res.data.info,
              duration: 2000
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    isCollect () {
      var obj = document.getElementsByClassName('collect')
    },
    collect (ptid, collectstatus) {
      fetchCollect({ ptid: ptid }) // 调用收藏接口
        .then(res => {
          console.log('res', res)
          if (res.data.status == 1) {
            this.$message({
              message: res.data.info,
              type: 'success',
              duration: 2000
            })
            this.pptDetailShow()
          } else if (res.data.status == 0) {
            this.$message({
              message: res.data.info,
              duration: 2000
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleSizeChange (val) {
      // 9,18条数据点击
      this.pagesize = val
      console.log(`每页 ${val} 条`)
      this.pptDetailShow()
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    pptSee (ptid, type, convertStatus) {
      // 浏览量统计
      fetchPptSee({ ptid: ptid, type: 1 })
        .then(res => {
          if (res.data.status == 1) {
            // this.pptDetailShow()
          }
        })
        .catch(err => {
          console.log(err)
        })
      console.log('this.selectTim', this.selectTim)
      if (this.selectTim == 0) {
        if (type == 1) {
          this.$router.push({
            name: 'pptdetail',
            query: { ptid: ptid, type: 1 }
          })
        } else if (type == 2) {
          this.$router.push({ name: 'guide', query: { ptid: ptid, type: 2 } })
        } else if (type == 3) {
          this.$router.push({ name: 'pptdetail', query: { ptid: ptid, type: 3 } })
        } else if (type == 4) {
          this.$router.push({ name: 'movie', query: { ptid: ptid, type: 4 } })
        } else if (type == 5) {
          this.$router.push({ name: 'gif', query: { ptid: ptid, type: 5 } })
        } else if (type == 6) {
          this.$router.push({ name: 'microCourse', query: { ptid: ptid, type: 6 } })
        } else if (type == 7) {
          this.$router.push({ name: 'image', query: { ptid: ptid, type: 7 } })
        }
      } else if (this.selectTim == 1) {
        // 课件
        this.$router.push({
          name: 'pptdetail',
          query: { ptid: ptid, type: 1 }
        })
      } else if (this.selectTim == 2) {
        // 导教案
        this.$router.push({ name: 'guide', query: { ptid: ptid, type: 2 } })
      } else if (this.selectTim == 3) {
        // 精品题库
        this.$router.push({
          name: 'pptdetail',
          query: { ptid: ptid, type: 3 }
        })
      } else if (this.selectTim == 4) {
        // 视频
        this.$router.push({ name: 'movie', query: { ptid: ptid, type: 4 } })
      } else if (this.selectTim == 5) {
        // gif
        this.$router.push({ name: 'gif', query: { ptid: ptid, type: 5 } })
      } else if (type == 6) {
        this.$router.push({ name: 'microCourse', query: { ptid: ptid, type: 6 } })
      } else if (type == 7) {
        this.$router.push({ name: 'image', query: { ptid: ptid, type: 7 } })
      }
    },
    download (item) {
      fetchDownload({ ptid: item.ptid, type: 2 })
        .then(res => {
          if (res.data.status == 1) {
            item.down_count = Number(item.down_count) + 1

            var file_src = item.file_src
            console.log('文件地址', file_src)
            var $form = $('<form method="GET"></form>')
            $form.attr('action', file_src)
            $form.appendTo($('body'))
            $form.submit()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    pptPublish () {}
  }
}
</script>
<style >
  @import "../../assets/css/resource.css";
  @import url(../../assets/iconfont/iconfont.css);
</style>
