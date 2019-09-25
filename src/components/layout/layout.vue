<template>
        <div class="layout_box">
            <div style="box-shadow:0px 5px 12px 0px rgba(126,151,143,0.2);margin-bottom:20px;background:white">
                <v-header/>
            </div>
            <div class="container_box" ref="main_box" :style=style>
                <div style="width:320px;height:100%">
                  <leftSiteMenu/>
                </div>
                <router-view class="review_box"/>
            </div>
        </div>
</template>
<script>
import VHeader from './siteHeader'
import VFooter from './siteFooter'
import leftSiteMenu from './leftSiteMenu'
export default {
  name: 'layout',
  components: {
    VHeader,
    VFooter,
    leftSiteMenu
  },
  data () {
    return {
      style:{
        height:'',
        width:'100%',
        marginBottom:'20px'
      }
    }
  },
  mounted(){
    this.getHeight()
  },
  methods:{
    getHeight(){
      var _self=this;
      if(!this.$refs.main_box) return ;
      this.style.height=this.$refs.main_box.clientHeight+'px'
      window.onresize=()=>{
         if(!this.$refs.main_box) return ;
        _self.style.height=this.$refs.main_box.clientHeight+'px'
      }
    }
  }
}
</script>
<style lang="scss">
@import url(../../assets/iconfont/iconfont.css);
.layout_box{
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column nowrap;
  overflow: hidden;
}
.container_box{
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
}
.review_box{
  width: 100%;
  height: 100%;
}
</style>
