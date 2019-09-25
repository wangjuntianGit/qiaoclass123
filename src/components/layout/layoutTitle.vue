<template>
    <div class="scontainer_title" >
         <my-container>
            <el-row type="flex" justify="space-between">
                <el-col style="width:6px;margin-right:22px;">
                    <i class="el-icon-arrow-left goBack" title="返回" @click="goBack()"></i>
                </el-col>
                <el-col  class="siteTitle">
                    {{siteTitle}}
                </el-col>
            </el-row>
        </my-container>
    </div>
</template>
<script>
export default {
  name: 'layoutTitle',
  props: {
    siteTitle: {
      type: '',
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    goBack () {
      this.editStatus = true
      this.$emit('onEdit', this.editStatus)
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="scss">
.scontainer_title{background:$sitecolor;text-align:left;height:60px;line-height:60px;color:#fff;font-size:18px;margin-bottom: 20px;}
.scontainer_title {
    box-shadow:0px 5px 12px 0px rgba(126,151,143,0.2);
    .siteTitle{
        font-size: 18px;

    }
    .goBack{
        font-size: 20px;
        cursor: pointer;
        // padding-top:22px;
    }

}
</style>
