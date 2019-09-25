<template>
    <div>
          <div style='background:#31BC90;' class='topbox'>
                <my-container style="box-shadow:0px 5px 12px 0px rgba(126,151,143,0.2);">
                    <Header @onEdit="onEdit" :title='dfd' @sendDataToParent = "sendDataToParent"></Header>
                </my-container>
                <div style='background:#f5f5f5;'>
                    <my-container>
                        <div class="fileformpadding" style="box-shadow:0px 5px 12px 0px rgba(126,151,143,0.2);margin-top:20px;">
                            <h3>资源信息</h3>
                            <el-divider></el-divider>
                            <fileform :coursetype="type" :cid="cid" :is_edit="is_edit"></fileform>
                        </div>
                    </my-container>
                </div>
          </div>
    </div>
</template>
<script>
import fileform from './fileform'
import layoutTitle from '../layout/layoutTitle'
import Header from '@/components/common/Header'
export default {
  name: 'createfile',
  components: {
    fileform,
    layoutTitle,
    Header
  },
  data () {
    return {
      siteTitle: '',
      type: '',
      dfd: '资源信息',
      cid: '',
      is_edit: '',
      edit: {
        status: false
      }
    }
  },
  created: function () {
    this.cid = this.$route.query.ptid
    this.is_edit = this.$route.query.is_edit
  },
  mounted () {
    this.siteTitle = this.$route.query.siteTitle
    this.type = this.$route.query.type
    var screen_h = document.documentElement.clientHeight || document.body.clientHeight
    var filefor = document.getElementsByClassName('fileformpadding')[0]
    filefor.style.height = screen_h - 100 + 'px'
    this.sendDataToParent()
  },
  methods: {
    onEdit (e) {
      this.edit.status = e
      this.isPptDetail = !e
    },
    sendDataToParent (data) {
      console.log(data)
    }
  }
}
</script>
<style lang="scss">
  .scontainer{
    margin-top:16px;
  }
  .el-select{
    width:100%;
  }
  .pptinputselect input[type="file"]{
    width:100px;
    height: 40px;
    border-radius: 6px;
    border:1px solid #ccc;
  }
  .pptimg{
    height: 140px;
    margin-right:40px;
    background: #e7f2ee url(../../assets/image/icons/ppticon.png) no-repeat center center;
    background-size: 40px;
  }
  .scontainer .el-col:first-child{
    text-align: center;
  }
  .scontainer .el-col:last-child{
    text-align: left;
  }
  .fileformpadding{
      background: #fff;
      padding:20px 100px 80px 100px;
      h3{
          color:$sitecolor
      }
  }
</style>
