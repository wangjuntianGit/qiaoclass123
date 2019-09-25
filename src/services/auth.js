/**
 * 用户登录状态
 */
import setting from '../config/setting'

export default{
  login (data) {
    console.log('setting.userToken', data)
    sessionStorage.setItem('setting.userToken', data);
    localStorage.setItem('setting.userToken', data)
  },
  // 用户登录状态
  authenticated () {
    let t = sessionStorage.getItem('setting.userToken')
    return t && t.length > 0
  },
  getToken () {
    return sessionStorage.getItem('setting.userToken')
  },
  getLocalData (name) {
    return localStorage.getItem(name)
  },
  logout () {
    sessionStorage.setItem('setting.userToken', '')
    sessionStorage.setItem('myInfo', '')
    localStorage.removeItem('setting.userToken')
  }
}
