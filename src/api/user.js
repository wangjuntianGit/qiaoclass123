import fetch from '../assets/js/fetch.js'
import store from '../store/modules/common'

const baseURL = store.state.baseUrl
// const baseURL = ''

export default {
  mockdata (params) {
    return fetch({
      method: 'post',
      baseURL,
      url: '/data/index',
      data: {
        params
      }
    })
  },
  getLogin (params) {
    return fetch({
      method: 'post',
      baseURL,
      url: 'api/login',
      data: {
        params
      }
    })
  },
  getRegister (params) {
    return fetch({
      method: 'post',
      baseURL,
      url: 'api/regist',
      data: {
        params
      }
    })
  },

  getCode (params) {
    return fetch({
      method: 'post',
      baseURL,
      // url: '/fsy/phone/getCode.action',
      url: '/api/code',
      data: {
        params
      }
    })
  },
  resetPassword (params) {
    return fetch({
      method: 'post',
      baseURL,
      url: '/api/resetpwd',
      data: {
        params
      }
    })
  }
}
