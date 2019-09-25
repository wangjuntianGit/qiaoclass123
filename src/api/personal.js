import fetch from '../assets/js/fetch.js'
import store from '../store/modules/common'
const baseURL = store.state.baseUrl
export default {
  // 获取用户信息
  getProfile (params) {
    return fetch({
      method: 'post',
      baseURL,
      url: '/ucenter/service/profile',
      data: {
        		params
      		}
    })
  },
  // 修改用户信息
  updprofile (params) {
    return fetch({
      method: 'post',
      baseURL,
      url: '/ucenter/service/updprofile',
      data: {
        		params
      		}
    })
  },
  // 获取草稿箱列表
  draftslist (params) {
    return fetch({
      method: 'post',
      baseURL,
      url: '/ucenter/service/draftslist',
      data: {
        		params
      		}
    })
  }
}
