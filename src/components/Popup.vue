<template>
    <div class="selectBox" v-if="ismask">
        <h3>已选课件（{{submitPptList.length}}）</h3>
        <ul class="groupKeyBtn" v-if="submitPptList.length>0">
            <li v-for="(item,index) in submitPptList" :key="index">
                <span class="groupKeyTxt">{{item.ptname}}</span>
                <span>
                    <i class="el-icon-top"  @click="groupKeyBtn($event,item.cid ,index,'top')"></i>
                    <i class="el-icon-bottom"  @click="groupKeyBtn($event,item.cid ,index,'bottom')"></i>
                    <i class="el-icon-delete"  @click="groupKeyBtn($event,item.cid ,index,'del')"></i>
                </span>
            </li>
        </ul>
        <p v-else>最多选择5个课件组合</p>
        <div class="groupCourse">
            <el-button size="mini" round @click="groupCourse()" :class="{'clickBtnGroup':submitPptList.length>=2}" :disabled="submitPptList.length<2">点击组课</el-button>
        </div>
    </div>
</template>

<script>
import {fetchGroupCourse } from '../api/index'

export default {
  name: 'Popup',
  props: {
    ismask: {
      type: Boolean,
      required: false
    },
    submitPptList: {
      type: Array,
      required: []
    },
    ptIdToLists: {
      type: Array,
      required: []
    }
  },
  data () {
    return {
    }
  },
  methods: {
    groupKeyBtn (event, ptid, index, type) {
      let swapItems = function (arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0]
        return arr
      }
      event.preventDefault()
      var parent = $(event.target).parent().parent() // li
      var parents = $(event.target).parents('.groupKeyBtn') // ul
      var len = parents.children().length
      if (type == 'top' && parent.index() == 0) {
        this.$message({
          message: '已经置顶！'
        })
        return false
      } else if (type == 'bottom' && parent.index() == len - 1) {
        this.$message({
          message: '已经置底！'
        })
        return false
      }
      switch (type) {
        case 'top':
          swapItems(this.submitPptList, index, index - 1)
          break
        case 'bottom':
          swapItems(this.submitPptList, index, index + 1)
          break
        case 'del':
          let cid = this.submitPptList[index].cid
          this.$emit('callback', index, cid)
          break
      }
      console.log('this.submitPptList', this.submitPptList)
    },
    groupCourse () {
      this.submitPptList.map((item, index) => {
        this.$set(item, 'sort', index + 1)
      })
      console.log('this.submitPptList', this.submitPptList)
      let firstPtid = this.submitPptList[0].cid
      localStorage.setItem('submitPptList', JSON.stringify(this.submitPptList))
      fetchGroupCourse({'diy_group': JSON.stringify(this.submitPptList)})
        .then(res => {
          if (res.data.status == 1) {
            this.$router.push({name: 'createfile', query: {siteTitle: '编辑资源', ptid: firstPtid, type: 1, 'saveDraft': 1, groupCourse: 1, group_id: res.data.data.group_id}})
            this.$store.dispatch('common/setSelectMask', false)
            localStorage.removeItem('submitPptList')
          }
          this.$message({
            message: res.data.info,
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err)
        })
    }

  }
}
</script>
<style lang="scss">
    .selectBox{
            width: 220px;
        height: 260px;
        margin: 0 auto;
        background: rgba(49, 188, 144, 0.7);
        position: fixed;
        top: 200px;
        right: 5px;
        text-align: center;
        color: #fff;
        border-radius: 8px;
        font-size: 12px;
        z-index: 10000;

     ul{margin:0 10px;}
      .clickBtnGroup{background: rgba(255,168,59,1);color:#fff;border-color:#FFA83B;}
      ul li{height: 28px;line-height: 28px;}
     ul li span{display: inline-block;vertical-align:middle;}
      ul li span:first-child{width:67%; width: 67%;
    display: inline-block;
    text-align: left;
    }
      ul li span:last-child{width:30%;
     }
      ul li:first-child span:last-child{
        & i:nth-child(1)::before{
            color:#ddd;
        }
     }

      ul li:last-child span:last-child{
        & i:nth-child(2)::before{
            color:#ddd;
        }
     }
      p {text-align: center;}
      h3{
        color: #fff;text-align: center;font-weight: 400;letter-spacing: 2px;font-size: 16px;margin:16px auto;
    }
      .groupKeyTxt{overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
      .groupCourse{position: absolute;bottom:20px;width:100%;text-align: center;}
      .groupCourse .el-button{letter-spacing: 2px;}
       .groupKeyBtn i{cursor: pointer;}
    }
</style>
