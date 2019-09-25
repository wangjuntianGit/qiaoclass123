<template>
  <div class="microCourse">
      <div class="topBox">
        <Header class="topHeader_detailTop"
        @onEdit="onEdit"
        :status="edit.status"
        :title="detailList.name"
        :desc="detailList.desc"
        :content="detailList.content"
        ></Header>
        </div>
    <div style="background:#f5f5f5;" class="commentBox">
          <el-main style="margin-top:20px;border-radius:8px;">
            <div class="box">
              <!-- 简介说明 -->
              <Intro :status="edit.status" :intro="detailList"></Intro>
              <!-- 视频 -->
              <div class="videoBoxs" style="min-height:517px;">
                <div class="video-box" v-if="reFresh">
                  <video-player
                    class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions"
                    @ready="playerReadied"
                  ></video-player>
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
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
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
export default {
  name: 'movie',
  data () {
    return {
      detailList: '',
      reFresh: true,
      edit: {
        status: false
      },
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: '',
            src:
              'http://xxm-common.oss-cn-qingdao.aliyuncs.com/20190906/fH7HD8JwPD4H3tnWRK.mp4' // url地址
          }
        ],
        poster: '', // 你的封面地址
        //  width: document.getElementsByClassName('videoBox'), //播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      }
    }
  },
  created: function () {
    this.getMovieDetail()
  },
  mounted: function () {
    this.isShowEdit()
  },
  components: {
    Header,
    Intro,
    Author,
    Comment
  },
  watch: {},
  methods: {
    playerReadied (player) {
      document
        .getElementsByClassName('vjs-big-play-button')[0]
        .setAttribute('title', '')
      document
        .getElementsByClassName('vjs-fullscreen-control')[0]
        .setAttribute('title', '全屏')
      document.querySelector(".vjs-fullscreen-control[title='Pause']")
      console.log(
        '元素',
        document.querySelector(".vjs-play-control[title='Pause']")
      )
    },
    getMovieDetail: function () {
      pptdetail({ id: this.$route.query.ptid })
        .then(res => {
          if (res.data.status == 1) {
            this.detailList = res.data.data
            console.log('this.detailList', this.detailList)
            document.getElementsByTagName(
              'video'
            )[0].src = this.detailList.file_src
            console.log(
              '视频地址',
              document.getElementsByTagName('video')[0].src
            )
          }
        })
        .catch(err => {
          console.log('err', err)
        })
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
    },
    // 判断是不是点击编辑按钮
    isShowEdit () {
      const isMicroCourseEdit = this.$route.query.isMicroCourseEdit
      if (isMicroCourseEdit == true) {
        this.editStatus = true
        this.edit.status = true
      }
    }
  }
}
</script>
<style scoped lang='scss'>
@import url(../../assets/iconfont/iconfont.css);
// sass重构样式
.microCourse {
    width: 100%;
    margin: 0 auto;
    .el-main {
      margin-top: 20px;
      background: #fff;
      padding: 0 20px 40px 20px !important;
      .box {
        background: #fff;
        padding-top: 20px;
        .videoBoxs {
          min-height: 517px;
          .video-box {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

  .el-button--primary {
    background-color: #31bc90;
    border-color: #31bc90;
  }
  .el-header {
    background: #31bc90;
  }
}
</style>
