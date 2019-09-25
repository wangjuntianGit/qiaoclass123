<template>
  <div class="drafts">
    <el-row v-if="list.length>0" class="draftsContent">
      <el-col :span="8" class="draftsItem" v-for="(item,index) in list" :key="index" >
        <el-row class="content" >
          <el-row class="img">
            <img :src="item.cover" @click="showDraftsDetails(item.id)"  />
          </el-row>
          <el-row class="title" :title="item.name">{{item.name}}</el-row>
          <el-row class="time">
             <el-col :span="10" v-if='item.user_name !=""'>作者:{{item.user_name}}</el-col>
            <el-col :span="10" v-else>ID:{{item.user_id}}</el-col>
            <el-col :span="14" style="text-align: right;">{{item.add_time}}</el-col>
          </el-row>
          <el-row class="count">
            <el-col :span="6">
              <i class="el-icon-view" title="浏览量"></i>
              {{item.view_count}}
            </el-col>
            <el-col :span="6">
              <i class="el-icon-video-play" title="使用量"></i>
              {{item.use_count}}
            </el-col>
            <!-- <el-col :span="6">
	                    	<i class="el-icon-chat-dot-square" title="评论量"></i>
	                    	{{item.useCount}}
            </el-col>-->
            <el-col :span="12" style="text-align:right;">
              <el-dropdown @command="command" style="width:20px">
                <span class="el-dropdown-link">
                  <i class="el-icon-more" style="transform:rotate(90deg);"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <!-- <el-dropdown-item :command="{name:'submit',data:item}">提交</el-dropdown-item> -->
                  <el-dropdown-item :command="{name:'edit',data:item}">编辑</el-dropdown-item>
                  <el-dropdown-item :command="{name:'rename',data:item}">重命名</el-dropdown-item>
                  <el-dropdown-item :command="{name:'del',data:item}">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-row>
         <div class="hoverCard" v-if="item.is_convert_status == 0" >
            <p class="hoverCardTxt">资源正在转码中，请您稍后访问</p>
        </div>
      </el-col>
    </el-row>
    <el-row v-else style="text-align: center;line-height: 40px;color:#999">~暂无数据~</el-row>
    <el-row class="draftsPage">
      <el-pagination background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[9,18]"
        :page-size="pageCount"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-row>
    <!-- 提交 -->
    <el-dialog title="提交" :visible.sync="submitView" width="30%" center id="submitView">
      <span>提交资源后将上线在我的资源中</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitView = false">取 消</el-button>
        <el-button type="primary" @click="submitOk">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 重命名 -->
    <el-dialog title="重命名" :visible.sync="renameView" width="30%" center id="submitView">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="renameView = false">取 消</el-button>
        <el-button type="primary" @click="renameOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除可见 -->
    <el-dialog title="删除" :visible.sync="delView" width="30%" center id="submitView">
      <span class="delname">删除后将不能恢复,确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delView = false">取 消</el-button>
        <el-button type="primary" @click="delOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import personal from '../../api/personal.js'
import {renameDrafts, delDrafts, fetchMenuLists, fetchPptDetail} from '../../api/index'
export default {
  name: 'drafts',
  data () {
    return {
      submitView: false,
      renameView: false,
      delView: false,
      input: '',
      offset: 0, // 每页偏移量
      pageCount: 24, // 每页显示数
      currentPage: 1,
      total: 0,
      list: []
    }
  },
  methods: {
    // 获取草稿箱列表
    draftslist () {
      let params = {
        offset: this.offset,
        pageCount: this.pageCount
      }
      personal
        .draftslist(params)
        .then(res => {
          if (res.data.status == 1) {
            this.list = res.data.data
            console.log('草稿箱数据', this.list)
            this.total = res.data.totalnum
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    // 每页多少条 改变
    handleSizeChange (val) {
      this.pageCount = val
      this.offset = 0
      this.draftslist()
    },
    // 当前页码
    handleCurrentChange (val) {
      this.offset = (val - 1) * this.pageCount
      this.draftslist()
    },

    command (command) {
      this[command.name](command.data)
    },
    // 下拉菜单 提交
    submit (data) {
      console.log('提交', data)
      this.submitView = true
    },
    // 下拉菜单 提交框 确定
    submitOk () {
      console.log('确定提交')
      this.submitView = false
    },
    // 下拉菜单 编辑
    edit (data) {
      console.log('编辑', data)
      this.$router.push({name: 'pptdetail', query: {ptid: data.id, isPptEdit: 1, is_drafts: 2}})
    },
    // 下拉菜单 重命名
    rename (data) {
      console.log('重命名课件名称', data)
      this.renameView = true
      this.input = data.name
      localStorage.setItem('renameDrafts_id', data.id)
    },
    // 下拉菜单 重命名 确定
    renameOk (data) {
      console.log('重命名确定', this.input)
      this.renameView = false
      renameDrafts({'drafts_id': localStorage.getItem('renameDrafts_id'), 'drafts_name': this.input})
        .then(res => {
          if (res.data.status == 1) {
            this.$message({
              message: res.data.info,
              type: 'success',
              duration: 2000
            })
            this.draftslist()
          } else {
            this.$message({
              message: res.data.info,
              duration: 2000
            })
          }
        })
    },
    // 下拉菜单 删除
    del (data) {
      console.log('删除', data)
      this.delView = true
      localStorage.setItem('delDrafts_id', data.id)
    },
    // 下拉菜单 删除 确定
    delOk () {
      console.log('确定删除')
      this.delView = false
      delDrafts({'drafts_id': localStorage.getItem('delDrafts_id')})
        .then(res => {
          console.log('删除数据操作', res)
          if (res.data.status == 1) {
            this.$message({
              message: res.data.info,
              type: 'success',
              duration: 2000
            })
            this.draftslist()
          } else if (res.data.status == 0) {
            this.$message({
              message: res.data.info,
              duration: 2000
            })
          }
        })
    },
    // 点击草稿箱卡片跳转至对应类型的编辑页面
    showDraftsDetails (ptId) {
      this.$router.push({
        name: 'pptdetail',
        query: {ptid: ptId, isPptEdit: 1, type: 1, is_drafts: 2}
      })
    }

  },
  mounted () {
    this.draftslist()
  }
}
</script>
<style scoped lang='scss'>
.drafts {
  height: 100%;
  padding-bottom: 32px;
  position: relative;
   .el-dialog__wrapper input[type="text"]{color:#999;}
 .draftsItem {
  padding: 10px;
}
 .el-dropdown {
  color: #999;
}
 .content {
  border: 1px solid #d4d4d4;
  padding: 6px;
  border-radius: 4px;
  font-family: "MicrosoftYaHei";
  width: 100%;
  cursor: pointer;
  margin-top: 0;
  margin-bottom: 0;
}
.content .img {
  height: 150px;
  background: #ccc;
}
.content .img img {
  width: 100%;
  height: 100%;
}
.content .title {
  font-size: 14px;
  color: #222;
  text-align: center;
  padding-top: 6px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 18px;
  margin-left: 0;
}
.content .time {
  font-size: 12px;
  padding: 4px 0;
  color: #999;
  /* letter-spacing:1px; */
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  height: 100%;
  margin-left: 0;
}
.content .count {
  font-size: 14px;
  color: #999;
  margin-top: 0;
  background: #fff;
  height: 22px;
  line-height: 22px;
}
 .hoverCard{
   opacity: 0;
   border-radius: 4px;
   transition: all 0.5s;
   height: 100%;
   width:100%;
   color:#fff;
   background: rgba(0,0,0,0.7);
   position: absolute;
   top:0;
   left:0;
   z-index: 10000}
 .hoverCard:hover{opacity: 1;}
 .hoverCard .hoverCardTxt{text-align: center;margin-top: 50%;}
.el-dropdown-menu__item:hover {
  color: #31bc90;
  background: #fff;
}
#submitView{
  /*color: #ffffff;*/
}
#submitView .el-button--primary {
  background: #31bc90;
}

#submitView .el-button:hover {
  color: #31bc90;
  border-color: #31bc90;
  background-color: rgba(49, 188, 144, 0.05);
}
#submitView .el-button--primary:hover {
  color: #fff;
  border-color: #31bc90;
  background-color: #31bc90;
}
.draftsPage {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  .el-pagination {
    text-align: center;
    .el-pagination__sizes {
      .el-input__inner:hover {
        border-color: #31bc90;
      }
      .is-focus .el-input__inner {
        border-color: #31bc90;
      }
    }
    .el-pager {
      .number:hover {
        // color: #fff;
      }
      .active {
        color: #fff;
        background: #31bc90;
      }
    }
    .btn-prev:hover,
    .btn-next:hover {
      color: #31bc90;
    }
    .el-pagination__jump {
      .el-input__inner:focus {
        border-color: #31bc90;
      }
    }
  }
  .el-pager li{background:#f4f4f5;border: 1px solid #d6d6d6;border-radius: 2px; margin: 0 5px;color: #606266}
}
#submitView .el-dialog__header {
  background: #31bc90;
  height: 50px;
  padding: 0;
  line-height: 50px;
  color: #fff;
}
#submitView .el-dialog__header .el-dialog__title {
  color: #fff;
}
#submitView .el-dialog__header .el-dialog__headerbtn {
  top: 15px;
}
#submitView .el-dialog__header .el-dialog__headerbtn i {
  color: #fff;
}

#submitView .el-dialog__body {
  text-align: center;
  color: #606266;
  font-size: 14px;
}
.draftsContent {
  height: 100%;
  overflow-y: scroll;
}
.draftsContent::-webkit-scrollbar-track {
  border-radius: 10px;
}
/*滚动条凹槽的颜色，还可以设置边框属性*/
.draftsContent::-webkit-scrollbar-track-piece {
  background-color: #fff;
}
/*滚动条的宽度*/
.draftsContent::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  border-radius: 12px;
}
/*滚动条的设置*/
.draftsContent::-webkit-scrollbar-thumb {
  background-color: #dddddd;
  background-clip: padding-box;
  min-height: 28px;
  border-radius: 10px;
}
.draftsContent::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}
 .el-input__inner{color:#999;}

}
.drafts >>>.el-dialog__header {
  padding: 20px 20px 10px;
  background-color: #31bc90;

}
.drafts >>>.el-dialog__header .el-dialog__title{
  color: #ffffff !important;
}
.drafts >>>.el-dialog__headerbtn .el-dialog__close{
  color: #ffffff !important;
}
.drafts >>>.el-dialog--center .el-dialog__body{
  text-align: center!important;
}
</style>
