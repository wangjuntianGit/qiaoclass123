<template>
<div class='personal'>
		<div style="background:#fff;">
             <my-container style="box-shadow:0px 5px 12px 0px rgba(126,151,143,0.2);">
               <v-header></v-header>
            </my-container>
        </div>
        <div style="background:#f5f5f5;" class="personalBottom">
                    <el-container class="personal-el-container">
                        <div class="personal-aside">
                        		<div class="info">
                        			<el-row class="avatarBox">
                                        <!-- <img :src="infossss.avator" v-if="infossss.avator">
                        				<img :src= info.avatar v-else> -->
                                        <img :src="info.avatar?info.avatar:require('../../assets/image/profile_default.png')" alt="个人头像">

                        			</el-row>
                        			<el-row class="phone">{{info.mobile}}</el-row>
                        			<el-row class="infoId">ID: {{info.uid}}</el-row>

                        		</div>
                        		<div class="personalMenu">
                        			<div class="menuContent">
                        				<div class="menuItem">
                        					<!-- <img src="../../assets/image/setting.png" alt=""> -->
                        					<router-link to='/personal/setting'>
                                    			个人设置
                                			</router-link>
                        				</div>
                        				<div class="menuItem">
                        					<!-- <img src="../../assets/image/drafts.png" alt=""> -->
                        					<router-link to='/personal/drafts'>
                                    			草稿箱
                                			</router-link>
                        				</div>
                        			</div>
                        		</div>
                        	</div>
                        	<div class="personal-main">
                        		<router-view></router-view>
                        	</div>
                    </el-container>

        </div>
</div>
</template>
<script>
import VHeader from '../layout/siteHeader'
import personal from '../../api/personal.js'
import { mapState } from 'vuex'
import { setTimeout } from 'timers'
import profileDefault from '../../assets/image/profile_default.png'
export default{
  name: 'personal',
  components: {
    VHeader
  },
  data () {
    return {
      infossss: {
        avator: profileDefault
      },
      info: {
        avatar: ''
      }
    }
  },
  computed: {
    //   aaaavatorImgUrl 为监听的属性名，实质为一个方法
    ...mapState('common', ['avatorImgUrl'])
  },
  watch: {
    aaaavatorImgUrl (val) {
      console.log('val==============', val)
      this.$nextTick(() => {
        setTimeout(() => {
          this.infossss.avator = val
          console.log('this.infossss.avator', this.infossss.avator)
        }, 0)
      })
    }
  },
  methods: {
    getProfile () {
      let params = {}
      personal.getProfile(params).then(res => {
        console.log(1111)
        if (res.data.status == 1) {
          this.info = Object.assign(res.data.data, {})
          // 向vuex提交头像地址
          this.$store.dispatch('common/setImgSrc', this.info.avatar)
          console.log(this.info)
          this.infossss.avator = this.info.avatar
        }
      }).catch(err => {
        console.log('err', err)
      })
    }
  },
  mounted () {
    this.getProfile()
    var cHeight = document.documentElement.clientHeight || document.body.clientHeight
	    let personalBottom = document.getElementsByClassName('personal-el-container')[0]
	    personalBottom.style.height = (cHeight - 60) + 'px'
  }
}
</script>
<style scoped>
	html,body,#app{
		height: 100%;
	}
	.personal-el-container{
		width: 1100px;
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		padding: 20px 0px;
		margin: 0 auto
	}
	.personal-aside{
		height: 100%;
		display: flex;
		flex-flow: column nowrap;
		width: 25%;
	}
	.personal-aside .info{
		background: #fff;
		border-radius:8px;
		padding:30px;
		height: 270px;
		box-shadow: #ced2d1 0px 0px 10px 0px;
		/*display: -webkit-box;
		display: -moz-box;
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flexbox;
		display: flex;
		flex-direction: column;
		align-self: center;
		justify-content: space-around;*/

	}
	.personal-aside .info>div{
		margin:auto;
		text-align: center;
	}
	.personal-aside .info .avatarBox{
		width: 80px;
		height: 80px;
		margin-bottom: 10px;
	}
	.personal-aside .info .avatarBox img{
		width: 80px;
		height: 80px;
	}
	.personal-aside .info .phone{
		color:#343837;
		font-size: 16px;
		letter-spacing:2px;
		padding:6px 0;
		font-family: "MicrosoftYaHei";
	}
	.personal-aside .info .infoId{
		color:#555555;
		font-size: 14px;
		letter-spacing:2px;
		padding:10px 0;
		font-family: "MicrosoftYaHei";
	}
	.personal-aside .info .fansFollow{
		font-size: 18px;
		color:#343837;
	}
	.personal-aside .info .fansFollow .fans>div:nth-child(2),.follow>div:nth-child(2){
		padding-top:4px;
		color:#999;
		font-size: 12px;
	}
	.personal-aside .personalMenu{
		padding-top:10px;
		height: calc(100% - 248px);
	}
	.personal-aside .personalMenu .menuContent{
		background: #fff;
		border-radius:8px;
		overflow-y: auto;
		height: 100%;
		box-shadow: #ced2d1 0px 0px 10px 0px;
	}
	.menuContent::-webkit-scrollbar-track {
		border-radius: 10px;
	}
	/*滚动条凹槽的颜色，还可以设置边框属性*/
	.menuContent::-webkit-scrollbar-track-piece{
		background-color:#fff;
	}
	/*滚动条的宽度*/
	.menuContent::-webkit-scrollbar{
		width:5px;height:5px;border-radius: 12px;
	}
	/*滚动条的设置*/
	.menuContent::-webkit-scrollbar-thumb{
		background-color:#dddddd;
		background-clip:padding-box;
		min-height:28px;
		border-radius: 10px;
	}
	.menuContent::-webkit-scrollbar-thumb:hover{
		background-color:#bbb;
	}
	.personal-aside .personalMenu .menuContent .menuItem{
		padding:16px 30px;
		display: -webkit-box;
		display: -moz-box;
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flexbox;
		display: flex;
		align-items: center;
	}
	.personal-aside .personalMenu .menuContent .menuItem img{
		margin-right:10px;
	}
	.personal-aside .personalMenu .menuContent .menuItem a{
		color:#999;
		text-decoration:none;
		font-size: 16px;
		font-weight: bold;
		font-family: "MicrosoftYaHei-Bold";
	}
	.personal-aside .personalMenu .menuContent .menuItem .router-link-exact-active{
		color:#31BC90;
		text-decoration:none;
	}
	.personal-main{
		flex: 1;
		background: #fff;
		border-radius:8px;
		height: 100%;
		overflow-y: auto;
		padding:20px 10px;
		box-sizing: border-box;
		box-shadow: #ced2d1 0px 0px 10px 0px;
		margin-left: 20px;
	}
	.personal-main::-webkit-scrollbar-track {
		border-radius: 10px;
	}
	/*滚动条凹槽的颜色，还可以设置边框属性*/
	.personal-main::-webkit-scrollbar-track-piece{
		background-color:#fff;
	}
	/*滚动条的宽度*/
	.personal-main::-webkit-scrollbar{
		width:5px;height:5px;border-radius: 12px;
	}
	/*滚动条的设置*/
	.personal-main::-webkit-scrollbar-thumb{
		background-color:#dddddd;
		background-clip:padding-box;
		min-height:28px;
		border-radius: 10px;
	}
	.personal-main::-webkit-scrollbar-thumb:hover{
		background-color:#bbb;
	}
.personal .el-main{margin-bottom: 0;}
</style>
