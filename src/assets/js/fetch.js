import axios from 'axios'
import Auth from '../../services/auth'
import router from '../../router/index'
import qs from 'qs'

// import { Message } from 'element-ui'
// import store from "src/store";
// import { getToken } from 'src/utils/auth'

// 创建axios实例
const service = axios.create({
  // baseURL: store.state.baseUrl, // api的base_url
  timeout: 10000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (Auth.authenticated() || Auth.getLocalData("setting.userToken")) {
      let token = Auth.getToken()|| Auth.getLocalData("setting.userToken");
      config.headers.common['Authorization'] = `Basic ${token}`
    }
    return config
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 清除token,跳转到登录
          error.message = '未授权，请重新登录'
          Auth.logout()
          router.push({
            path: '/login'
          })
          break
        case 403:
          // 清除token,跳转到登录
          error.message = '拒绝访问'
          Auth.logout()
          router.push({
            path: '/login'
          })
          break
      }
    } else {
      error.message = '连接到服务器失败'
    }
    return Promise.reject(error.request.data)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 清除token,跳转到登录
          Auth.logout()
          router.push({
            path: '/login'
          })
          break
        case 403:
          // 清除token,跳转到登录
          Auth.logout()
          router.push({
            path: '/login'
          })
          break
        case 404:
          // 清除token,跳转到登录
        //   Auth.logout()
          error.message = '请求错误,未找到该资源'
          router.push({
            path: '/notFound'
          })
          break
      }
    } else {
      error.message = '连接到服务器失败'
    }
    return Promise.reject(error.response.data)
  }
)

export default service
