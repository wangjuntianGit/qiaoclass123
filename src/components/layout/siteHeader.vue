<template>
  <div class="siteHeader">
      <img class="logoImage" src="../../assets/image/logo.png" alt="开窍课堂" >
      <div class="menu">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="siteresources" :disabled="isMask && !$route.path.split('/').includes('siteresources')">网站资源</el-menu-item>
          <el-menu-item index="myresources" :disabled="isMask && !$route.path.split('/').includes('myresources')">我的资源</el-menu-item>
          <el-menu-item index="shareresources" :disabled="isMask && !$route.path.split('/').includes('shareresources')">共享资源</el-menu-item>
        </el-menu>
      </div>
      <div class="user_center">
        <el-dropdown placement="bottom-start">
          <span class="el-dropdown-link">
            <img
              class="face_user"
              :src="myInfo.avatar"
              alt
            />
          </span>

          <el-dropdown-menu slot="dropdown" class="img-dropdown">
            <el-dropdown-item>ID:{{myInfo.uid}}</el-dropdown-item>
            <el-dropdown-item @click.native="setting()">个人设置</el-dropdown-item>
            <el-dropdown-item @click.native="drafts()">草稿箱</el-dropdown-item>
            <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
  </div>
</template>
<script>
import Auth from '../../services/auth'
import personal from '../../api/personal.js'
import logoImage from '../../assets/image/logo.png'
import { setTimeout } from 'timers'
import profileDefault from '../../assets/image/profile_default.png'
export default {
  name: 'vheader',
  data () {
    return {
      activeIndex: this.$route.name,
      // activeIndex: 'siteresources',
      myInfo: {
        uid: '',
        avatar: ''
      }
    }
  },
  mounted () {
    this.getProfile()
  },
  computed: {
    isMask () {
      return this.$store.state.common.selectMask
    },
    num () {
      return this.$store.state.common.setSiteTypeNum
    }
  },
  watch: {
    num () {
      if (this.num == 1) {
        this.activeIndex = 'siteresources'
      } else if (this.num == 2) {
        this.activeIndex = 'myresources'
      } else if (this.num == 3) {
        this.activeIndex = 'shareresources'
      }
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
          this.$store.dispatch('common/setMyInfo', this.info)
          this.$store.dispatch('common/setUserName', this.info.uname)
          this.myInfo.uid = this.info.uid
          if (!this.info.avatar) {
            this.myInfo.avatar = profileDefault
          } else {
            this.myInfo.avatar = this.info.avatar
          }
        }
      }).catch(err => {
        console.log('err', err)
      })
    },
    handleSelect (key, keyPath) {
      let urlStr = '/' + keyPath + '/index'
      this.$router.push(urlStr)
    },
    logout () {
      Auth.logout()
      this.$store.dispatch('common/setSelectMask', false)
      this.$router.push('/login')
      localStorage.setItem('selectTimState', 1)
    },
    setting () {
      console.log('ok')
      this.$store.dispatch('common/setSelectMask', false)
      this.$router.push('/personal/setting')
    },
    drafts () {
      this.$store.dispatch('common/setSelectMask', false)
      this.$router.push('/personal/drafts')
    },
    personal () {
      this.$router.push('/personal')
    }
  }
}
</script>
<style lang="scss">
body {
  margin: 0px;
  padding: 0;
}
.l_header {
  height: 60px;
  line-height: 60px;
}
/*修复LOGO变形*/
.logoImage{
  width: 155px;
  height: 44px;
  margin-top: 8px;
}
.user_center .face_user{
  width: 30px;
  height: 30px;
  margin-top: 15px;
}
.l_header .menuList{
  padding-left: 84px !important;
  padding-right: 50px;
}
.el-tabs--border-card > .el-tabs__content {
  padding: 0px !important;
}
.el-tabs--border-card > .el-tabs__content {
  padding: 30px;
}
.siteHeader{
  max-width: 1100px;
  min-height: 60px;
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  background:#fff;
  justify-content: space-between;
}
.siteHeader {
  .loginout {
    width: 35px;
    height: 60px;
    // line-height: 6;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      img {
        width: 35px;
        height: 35px;
        border: 1px solid #999;
        border-radius: 50% 50%;
        cursor: pinter;
      }
    }
  }
}
.img-dropdown {
  top: 40px!important;
}
.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
    background-color: #fff;
    color: #31BC90;
}
.siteHeader .el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #31bc90;
  font-weight: 700;
  color: #31bc90;
  font-size: 16px;
}
.siteHeader .el-menu--horizontal>.el-menu-item {
    float: left;
    height: 60px;
    line-height: 60px;
    margin: 0;
    border-bottom: 2px solid transparent;
    color: #555555;
    font-size: 16px;
}
.siteHeader .el-avatar.el-avatar--circle {
  border: 1px solid #9c9c9c;
}
</style>
