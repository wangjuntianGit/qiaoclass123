<template>
  <div>
    <div class="issue-box">
      <div class="issue">
        <el-row>
          <!-- 发布 -->
          <!-- <el-col :md="3">
            <i class="el-icon-s-promotion"></i>
            <span>发布</span>
          </el-col>-->
          <!-- 收藏 -->
          <el-col :span="3">
            <span @click="collect(author.id,author.is_collect_status)">
              <!-- <i class="iconfont xxm-xihuan" :title="'收藏量'+author.coll_count" v-show='author.is_collect_status == "1"'></i> -->
              <i class="iconfont xxm-heart-copy" :title="'收藏量'+author.coll_count"></i>
            </span>

            <span>{{author.coll_count}}</span>
          </el-col>
          <!-- 下载 -->
          <el-col :span="3" v-show="isdownLoad">
            <i
              class="el-icon-download"
              :title="'下载量'+author.down_count"
              @click="download(author.id,author.file_src)"
            ></i>
            <span>{{author.down_count}}</span>
          </el-col>
          <!-- 浏览 -->
          <el-col :span="3">
            <i class="el-icon-view" :title="'浏览量'+author.view_count"></i>
            <span>{{author.view_count}}</span>
          </el-col>
          <!-- 使用量 -->
          <el-col :span="3">
            <i class="el-icon-video-play" :title="'使用量'+author.use_count"></i>
            <span>{{author.use_count}}</span>
          </el-col>
          <!-- 评论 -->
          <!-- <el-col :md="3">
            <i class="el-icon-chat-dot-square"></i>
            <span>{{author.coll_count}}</span>
          </el-col>-->
          <!-- 分享 -->
          <el-col :span="9" v-if="share == 2 ">
            <i class="el-icon-share"></i>
            <span class="share" @click="shareClick">分享</span>
          </el-col>
        </el-row>
      </div>
      <div class="author">
        <el-row>
          <el-col :span="6">
            <!-- <span>作者：{{author.nickname}}</span>             -->
            <span v-if="author.user_name != ''">作者：{{author.user_name}}</span>
            <span v-else>ID：{{author.user_id}}</span>
          </el-col>
          <el-col :span="6">
            <span>发布时间:</span>
            {{author.add_time}}
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import {
  fetchDownload,
  fetchShare,
  fetchCollect,
  sourceDownload
} from '../../api/index'
import auth from '../../services/auth'
export default {
  name: 'Author',
  props: ['author'],
  data () {
    return {
      isdownLoad: window.location.href.indexOf('guide') != -1,
      isCollect: ''
    }
  },
  created: function () {},
  mounted () {},
  methods: {
    collect (id, collectstatus) {
      fetchCollect({ ptid: id }) // 调用收藏接口
        .then(res => {
          if (res.data.status == 1) {
            // this.pptDetailShow();
          }
        })
        .catch(err => {
          console.log(err)
        })
      // 收藏次数统计
      if (collectstatus == 1) {
        // 判端只有在为收藏的状态下才将收藏量+1
        fetchPptSee({ ptid: ptid, type: 4 }).then(res => {
          if (res.data.status == 1) {
            this.pptDetailShow()
          }
        })
      }
    },
    shareClick: function () {
      fetchShare({ id: this.$route.query.ptid }).then(res => {
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
    },

    download (id, file_src) {
      sourceDownload({ id: id }) // 下载功能
        .then(res => {
          if (res.data.status == 1) {
            var file_src = res.data.data.file_src
            // var a = document.createElement("a");
            // a.setAttribute("href", "");
            // a.setAttribute("download", file_src);
            // a.click();
            var $form = $('<form method="GET"></form>')
            $form.attr('action', file_src)
            $form.appendTo($('body'))
            $form.submit()
          }
        })

      // 下载次数+1
      fetchDownload({ ptid: id, type: 2 })
        .then(res => {
          if (res.data.status == 1) {
          }
        })
        .catch(err => {
          console.log(err)
        })
      // 在详情页让下载量每次点击 +1
      this.author.down_count++
    }
  },
  computed: {
    share () {
      return (this.shareStatus = this.$store.state.common.isShare)
    }
  }
}
</script>
<style scoped>
/*@import url(../../assets/css/resource.css);*/
@import url(../../assets/iconfont/iconfont.css);
</style>
<style>
.issue-box {
  background: #f0f6f5;
  padding: 8px 10px;
  margin: 20px 0 20px;
}
.issue-box > .issue {
  color: #9c9c9c;
  font-size: 14px;
  margin-bottom: 8px;
  width: 100%;
  white-space: nowrap;
}
.issue-box > .issue .share {
  cursor: pointer;
}
.issue-box > .issue > .el-row {
  height: 19px;
  line-height: 19px;
}
.issue-box > .author {
  color: #9c9c9c;
  font-size: 14px;
  width: 100%;
  white-space: nowrap;
  text-align: left;
}
</style>
