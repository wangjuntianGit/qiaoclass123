// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router/index'
import store from './store'
import qs from 'qs'
import './assets/css/vars.scss'
import './assets/css/common.scss'
import './assets/iconfont/iconfont.css'
import './assets/js/siteConfig'
import 'babel-polyfill'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import settingVal from './config/setting'
import Router from 'vue-router'
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
Vue.use(VideoPlayer)

Vue.use(Vuex)
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
    inline: false,
    button: true,
    navbar: false,
    title: false,
    toolbar: false,
    tooltip: false,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: false,
    transition: true,
    fullscreen: false,
    keyboard: false
  }
})
/*  const routerPush = Router.prototype.push
     Router.prototype.push = function push(location) {
      return routerPush.call(this, location).catch(error=> error)
  }*/

Vue.component('my-container', {
  template: `
    <el-row>
        <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4">&nbsp;</el-col>
        <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16">
            <slot></slot>
        </el-col>
        <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4">&nbsp;</el-col>
    </el-row>
    `
})
Vue.component('my-scontainer', {
  template: `
      <el-row>
          <el-col :xs="0" :sm="3" :md="4" :lg="5" :xl="6">&nbsp;</el-col>
          <el-col :xs="20" :sm="18" :md="16" :lg="14" :xl="12">
              <slot></slot>
          </el-col>
          <el-col :xs="0" :sm="3" :md="4" :lg="5" :xl="6">&nbsp;</el-col>
      </el-row>
      `
})
Vue.prototype.$qs = qs
Vue.prototype.$host = settingVal.remoteHost
Vue.prototype.$sdcr = settingVal.sdcr

Vue.use(ElementUI)
// Vue.use(VueRouter)

// Vue.prototype.$http = http

// Vue.config.productionTip = false

// const router = new VueRouter({
//   mode: 'hash',
//   base: __dirname,
//   routes: [
//     {
//       path: '/login',
//       component: Login
//     }
//   ]
// })

// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth && !Auth.authenticated()) {
//     next({
//       path: '/login',
//       query: {redirect: to.fullPath}
//     })
//   } else {
//     next()
//   }
// })

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// export default router
