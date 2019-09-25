<template>
    <div class="pptdetail">
      <div style='background:#31BC90' class='topbox'>
            <my-container>
                <el-row type="flex" justify="sapce-between" class="pptdetail_header">
                    <el-col :span="16" class="ppttitle">
                        {{ppt_base.name}}
                    </el-col>
                    <el-col :span="2" :offset="6"  style="text-align:right;">
                    <el-button class="editBut">编辑</el-button>

                    </el-col>
                </el-row>
                <div class="pptmain">
                    <pptMain @sendPptBase="receivePptBase">
                    </pptMain>

                    <div class="">
                        <desccom :intro='ppt_base' ></desccom>
                    </div>
                    <!-- 这里使用$refs,触发子组件的show方法，子组件方法中可以打印到父组件传入的值，注意这里传入json对象 -->
                    <div class="pptother">
                        <author :author="ppt_base" ref="authorShow"></author>
                    </div>
                    <div>
                        <comment></comment>
                    </div>
                </div>
            </my-container>
        </div>
    </div>
</template>
<script>
import comment from '../../components/common/Comment'
import desccom from '../../components/common/Intro'
import author from '../../components/common/Author'
import pptMain from './ppt'

export default {
  name: 'pptdetail',
  components: {
    comment,
    desccom,
    author,
    pptMain
  },
  data () {
    return {
      ppt_base: '',
      intro: ''
    }
  },
  methods: {
    receivePptBase (data) {
      if (data) {
        this.ppt_base = data
      }
      console.log('ppt_base', this.ppt_base)
      this.$refs.authorShow.show()
    }
  }
}
</script>
<style lang="scss">
.pptdetail{
    .pptmain{

    }
}
</style>
