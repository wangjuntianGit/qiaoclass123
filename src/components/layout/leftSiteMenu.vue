<template>
    <div class="bodyleft">
      <div class="left-top">
        <div class="search" v-bind:class="[isMask?'v_dis':'']">
          <el-select class="search"
                     name="gradeid"
                     data-type="grade"
                     id="grade"
                     v-model="selected.gradeid"
                     @change="getSubjectItems()"
          >
            <el-option
              v-for="(item, index) in grades"
              :value="item.gradeid"
              :label="item.gradename"
              :key="item.gradeid"
              v-cloak
            ></el-option>
          </el-select>
          <el-select class="search"
                     name="subjectid"
                     data-type="subject"
                     id="subject"
                       v-model="selected.subjectid"
                     @change="getVersionlist()"
          >
            <el-option
              v-for="(item, index) in subjects"
              :value="item.subjectid"
              :label="item.subjectname"
              :key="item.subjectid"
              v-cloak
            ></el-option>
          </el-select>
          <!-- 版本 -->
          <el-select class="search"
                     name="versionid"
                     data-type="version"
                     id="version"
                     v-model="selected.versionid"
                     @change="selecTypeList()"
          >
            <el-option
              v-for="item in versionsList"
              :value="item.versionid"
              :label="item.versionname"
              :key="item.versionid"
              v-cloak
            ></el-option>
          </el-select>
          <!-- 必选修 -->
          <el-select class="search"
                     name="selectid"
                     data-type="selectype"
                     id="selectype"
                     v-model="selected.selectid"
                     @change="pptLeveList()"
          >
            <el-option
              v-for="item in selectList"
              :value="item.selectid"
              :label="item.selectype"
              :key="item.selectid"
              v-cloak
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="left-bottom">
        <div id="warp">
          <el-tree
            ref="menuTree"
            :data="pptLevelList"
            node-key="id"
            :highlight-current="isHighlight"
            :default-expanded-keys="defaultxpandedkeys"
            :props="defaultProps"
            accordion
            @node-click="handleNodeClick">
                <span class="span-ellipsis" slot-scope="{ node, data }">
                    <span :title="node.label">{{ node.label }}</span>
                </span>
          </el-tree>
        </div>
      </div>
    </div>
</template>
<script>
import {
  fetchLeftSiteMenu,
  fetchGrades,
  fetchSubjectItems,
  fetchVersionlist,
  fetchSelecTypeList
} from '../../api/index'
import $ from 'jquery'
export default {
  name: 'leftSiteMenu',
  data () {
    return {
      selectList: [],
      pptLevelListQuery: {
        gradeid: '',
        subjectid: '',
        versionid: '',
        selectid: ''
      },
      defaultxpandedkeys: [],
      isHighlight: true,
      chapter: [],
      section: [],
      // 选修
      sectionList: [],
      ppt: [],
      pptList: [],
      subjects: {},
      grades: {},
      sectionid: '',
      selected: { subjectid: '', gradeid: '', versionid: '', selectid: '' },
      // 版本
      versionsList: [],
      ptIdToList: [],
      ptIdToLists: [],
      filterText: '',
      pptLevelList: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      ptid: '',
      currTreeId: []
    }
  },
  created: function () {
    this.currTreeId = sessionStorage.getItem('lastTreeId') ? sessionStorage.getItem('lastTreeId').split(',') : ''
    this.getGrades()
    this.defaultxpandedkeys = []
    if (this.currTreeId && this.currTreeId.length) {
      this.defaultxpandedkeys.push(this.currTreeId[4])// 当前菜单节点
      Object.keys(this.pptLevelListQuery).forEach((item, index) => {
        this.selected[item] = this.currTreeId[index]
      })
    }
  },
  mounted () {
    const bit = sessionStorage.getItem('watchStorage')
    this.$refs.menuTree.setCurrentKey(1)
    this.$refs.menuTree.setCheckedNodes([{
      id: 1,
      label: ''
    }])
  },
  computed: {
    isMask () {
      return this.$store.state.common.selectMask
    }
  },
  methods: {
    handleNodeClick (data) {
      this.$store.dispatch('common/setPtId', data.id) // 没有用mapActions
      sessionStorage.setItem('lastTreeId', [this.selected.gradeid, this.selected.subjectid,
        this.selected.versionid, this.selected.selectid, data.id].join(','))
    },
    dofirstMenu () {
      this.dropSwift($(this), '.d-firstDrop')
    },
    dosecondMenu () {
      this.dropSwift($(this), '.d-secondDrop')
    },
    showNo () {},
    // 找到li子节点
    dropSwift (dom, drop) {
      dom.next().slideToggle()
      //   dom.parent().siblings().find('.icon-chevron-up').removeClass('iconRotate')
      dom.parent().siblings().find(drop).slideUp()
      //   var iconChevron = dom.find('.icon-chevron-up')
      //   if (iconChevron.hasClass('iconRotate')) {
      //     iconChevron.removeClass('iconRotate')
      //   } else {
      //     iconChevron.addClass('iconRotate')
      //   }
    },
    getGrades () {
      fetchGrades()
        .then(res => {
          if (res.data.status === 1) {
            if (res.data.data.length == 0) {
              this.selected.gradeid = ''
              this.selected.subjectid = ''
              this.selected.versionid = ''
              this.selected.selectid = ''
            } else {
              this.grades = res.data.data
              let gradeid = res.data.data[0].gradeid
              this.selected.gradeid = this.currTreeId ? this.currTreeId[0] : gradeid
              this.getSubjectItems()
            }
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    getSubjectItems (gradeid) {
      fetchSubjectItems({ gradeid: this.selected.gradeid })
        .then(res => {
          if (res.data.status === 1) {
            if (res.data.data.length == 0) {
              this.selected.subjectid = ''
              this.selected.versionid = ''
              this.selected.selectid = ''
            } else {
              this.subjects = res.data.data
              let subjectid = res.data.data[0].subjectid
              this.selected.subjectid = this.currTreeId ? this.currTreeId[1] : subjectid
              this.getVersionlist()
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 版本下拉列表接口 人教版
    getVersionlist (subjectid) {
      fetchVersionlist({ subjectid: this.selected.subjectid })
        .then(res => {
          if (res.data.status === 1) {
            if (res.data.data.length == 0) {
              this.selected.versionid = ''
              this.selected.selectid = ''
            } else {
              this.versionsList = res.data.data
              let versionid = res.data.data[0].versionid
              this.selected.versionid = this.currTreeId ? this.currTreeId[2] : versionid
              this.selecTypeList()
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 调取必选修下拉列表接口
    selecTypeList (versionid) {
      sessionStorage.setItem('lastTreeId', [this.selected.gradeid, this.selected.subjectid,
        this.selected.versionid, this.selected.selectid].join(','))
      fetchSelecTypeList({ versionid: this.selected.versionid })
        .then(res => {
          if (res.data.status === 1) {
            if (res.data.data.length == 0) {
              this.selected.selectid = ''
            } else {
              this.selectList = res.data.data
              let selectid = res.data.data[0].selectid
              this.selected.selectid = this.currTreeId ? this.currTreeId[3] : selectid
              this.pptLeveList()
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    pptLeveList () {
      localStorage.removeItem('watchStorage')
      sessionStorage.removeItem('lastTreeId')
      this.$store.dispatch('common/setSelectListStatus', this.selected.selectid)
      this.pptLevelListQuery.gradeid = this.selected.gradeid
      this.pptLevelListQuery.subjectid = this.selected.subjectid
      this.pptLevelListQuery.versionid = this.selected.versionid
      this.pptLevelListQuery.selectid = this.selected.selectid
      this.$store.dispatch('common/setVersionId', this.pptLevelListQuery.selectid)
      fetchLeftSiteMenu(this.pptLevelListQuery).then(res => {
        if (res.data.status == 1) {
          this.pptLevelList = res.data.data

          this.$nextTick(() => {
            this.$refs.menuTree.setCurrentKey(this.currTreeId[4])
          })
        }
      })
    }
  }
}
</script>
<style scoped>
  .el-select-dropdown__item{
    text-align: center!important;
  }
  .bodyleft .left-top.el-select-dropdown__item.selected {
    color: #31bc90!important;
    font-weight: 400!important;
    text-align: center!important;
  }
  .bodyleft .left-top {
    width: 100%;
    height: 50px;
    border-radius: 8px;
    background: #31bc90;
    box-shadow: #ced2d1 0px 0px 10px 0px;
  }
  .bodyleft .left-top .search {
    font-size: 12px;
    height: 100%;
    width: 100%;
    margin:0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
  .bodyleft .left-top .search select option {
    background: #fff;
    color: #555;
  }
  .bodyleft .left-top >>>  .el-select[data-type='grade']  {
    padding-left: 0px;
    padding-right: 0px;
  }
  .bodyleft .left-top >>>  .el-select[data-type='subject'] {
    padding-right: 0px;
  }
  .bodyleft .left-top >>>  .el-select[data-type='selectype'] {
    padding-right: 10px;
  }
  .bodyleft .left-top >>>  .el-select[data-type='selectype']>.el-input{
      width:80px;
  }
  .bodyleft .left-top >>>  .el-select[data-type='version'] .el-input__inner{
    padding-right: 18px;
  }
  .bodyleft .left-top >>>  .el-select .el-input__inner {
    background: #31bc90;
    border: none;
    font-size: 14px;
    color: #fff;
    padding-right: 20px;
    padding-left: 10px;
    text-align: right;
  }
  .left-bottom {
    width: 100%;
    flex: 1;
    border-radius: 8px;
    margin-top: 9px;
    padding: 12px;
    box-sizing: border-box;
    text-align: left;
    background: #fff;
    box-shadow: #ced2d1 0px 0px 10px 0px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .left-bottom ul {
    padding: 0;
    list-style: none;
  }
  .left-bottom ul li {
    line-height: 28px;
    padding-left: 10px;
    font-size: 14px;
    cursor: pointer;
  }
  .left-bottom ul li span {
    cursor: pointer;
  }
  .left-bottom .chapter-title {
    font-size: 14px;
    font-weight: 600;
    height: 28px;
    line-height: 28px;
  }
  .left-bottom .show-close {
    width: 15px;
    height: 15px;
    line-height: 15px;
    text-align: center;
    display: inline-block;
    margin-right: 5px;
    font-size: 20px;
    color: #31bc90;
    font-weight: 200;
    border: 1px solid #31bc90;
    border-radius: 100%;
  }
  .left-bottom::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  /*滚动条凹槽的颜色，还可以设置边框属性*/
  .left-bottom::-webkit-scrollbar-track-piece {
    background-color: #fff;
  }
  /*滚动条的宽度*/
  .left-bottom::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    border-radius: 12px;
  }
  /*滚动条的设置*/
  .left-bottom::-webkit-scrollbar-thumb {
    background-color: #dddddd;
    background-clip: padding-box;
    min-height: 28px;
    border-radius: 10px;
  }
  .left-bottom::-webkit-scrollbar-thumb:hover {
    background-color: #bbb;
  }

  .bodyleft{
    width: 300px!important;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    margin-right: 20px;
  }
  .bodyleft .el-input__icon {
    width: 14px;
    color: #fff;
  }
  .bodyleft >>> .el-tree-node__content:hover {
    color:#31bc90;
    background-color: #f5f5f5;
  }
  .bodyleft >>> .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: #f5f5f5;
    color:#31bc90;
    font-weight: 600;

  }
  .bodyleft >>> .el-tree-node__label{
    width:100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
  }
  .bodyleft >>> .el-tree-node {margin-bottom:7px;}
  .bodyleft >>> .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{background-color:#fff;color:#31bc90;}
  .bodyleft >>> .el-select-dropdown__item.selected{color:#31bc90;}
  .el-select-dropdown__item.selected{
    color: #31bc90!important;
    font-weight: 400!important;
    text-align: center!important;
  }
  .bodyleft .v_dis {
    position: relative;
  }
  .bodyleft .v_dis:before {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: hsla(0,0%,86.7%,.6);
    z-index: 200;
    cursor: no-drop;
  }
</style>
