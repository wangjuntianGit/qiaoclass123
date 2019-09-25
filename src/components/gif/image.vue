<template>
  <div class="image">
      <div class="topBox">
          <Header  class="topHeader_detailTop"
            @onEdit="onEdit"
            :status="edit.status"
            :title="detailList.name"
            :desc="detailList.desc"
            :content="detailList.content"
          ></Header>
      </div>
      <div class="commentBox">
            <el-main style="border-radius:8px;">
              <div class="box">
                <!-- 简介说明 -->
                <Intro :status="edit.status" :intro="detailList"></Intro>
                <!-- gif -->
                <div class="gif-box">
                  <div class="img">
                    <viewer>
                      <img :src="detailList.file_src" alt />
                    </viewer>
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
  name: 'gif',
  data () {
    return {
      commemtText: '',
      detailList: [],
      edit: {
        status: false
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
  methods: {
    getMovieDetail: function () {
      pptdetail({ id: this.$route.query.ptid })
        .then(res => {
          if (res.data.status == 1) {
            this.detailList = res.data.data
            console.log(this.detailList)
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    onEdit (e) {
      this.edit.status = e
      //   this.updataPptdetail()
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
      const isImageEdit = this.$route.query.isImageEdit
      if (isImageEdit == true) {
        this.editStatus = true
        this.edit.status = true
      }
    }
  }
}
</script>
<style scoped lang='scss'>
@import url(../../assets/iconfont/iconfont.css);
//使用scss重构样式
.image {
    .el-main {
    margin-top: 20px;
    box-shadow: 0px 5px 12px 0px rgba(126, 151, 143, 0.2);
    background: #fff;
    padding: 0 20px 109px 20px !important;
    .box {
        background: #fff;
        padding-top: 20px;
        .gif-box {
        max-width: 1000;
        background: #f0f6f5;
        position: relative;
        .img {
            background: #f0f6f5;
            height: 100%;
            img {
            width: 100%;
            cursor: pointer;
            max-height: 517.5px;
            }
        }
        .complete {
            height: 25px;
            line-height: 25px;
            background: #f0f6f5;
            i:hover {
            font-size: 25px;
            }
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
  .fullBox {
    text-align: center;
    position: relative;
    display: none;
    width: 80%;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
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
}
</style>
