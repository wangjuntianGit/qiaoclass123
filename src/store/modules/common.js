
// initial state
// shape: [{ id, quantity }]
const state = {
  // baseUrl: 'http://www.qiaoclass.com/service/web',
  // baseUrl: 'http://192.168.0.11:8088/service/web',
  // baseUrl: 'http://www.qiaoclass.com/service/web',
  baseUrl: 'http://api.qiaoclass.com/service/web',
  ptid: '',
  myInfo: '',
  coursetype: '',
  formFileName: '',
  avatorImgUrl: '',
  avatorImgUrlBack: '',
  // 本地测试是会有跨域问题，打包app时要打开。
  // baseUrl: 'http://192.168.3.145:8088/web'
  // baseUrl: 'http://192.168.0.28/web',
  avatorImgSrc: '',
  // 分享的状态
  isShare: '',
  // 设置版本id状态
  versionId: '',
  // 菜单数据列表状态
  selectListStatus: '',
  // 定义一个网站资源/我的资源/共享资源的状态变量
  setSiteTypeNum: '',
  setScanImgUrl: '',
  userName: '',
  selectMask: false
}

// mutations
const mutations = {
  shareStatu (state, type) {
    state.isShare = type
  },
  ptid (state, ptid) {
    state.ptid = ptid
    localStorage.setItem('watchStorage', state.ptid)
  },
  coursetype (state, coursetype) {
    state.coursetype = coursetype
  },
  BaseUrl (state, baseUrl) {
    state.baseUrl = baseUrl
    localStorage.setItem('baseUrl', baseUrl)
  },
  myInfo (state, value) {
    state.myInfo = value
    sessionStorage.setItem('myInfo', JSON.stringify(state.myInfo))
  },
  code (state, code) {
    state.code = code
  },
  formFileName (state, formFileName) {
    state.formFileName = formFileName
    console.log('state.formFileName', state.formFileName)
  },
  avatorImgUrl (state, avatorImgUrl) {
    state.avatorImgUrl = avatorImgUrl
    sessionStorage.setItem('avatorImgUrl', state.avatorImgUrl)
    console.log('state.avatorImgUrl==', state.avatorImgUrl)
  },
  avatorImgUrl_mutation (state, avatorImgUrl) {
    state.avatorImgUrl = avatorImgUrl
    console.log('state.avatorImgUrl==', state.avatorImgUrl)
  },
  avatorImgUrlBack (state, avatorImgUrlBack) {
    state.avatorImgUrlBack = avatorImgUrlBack
    console.log('state.avatorImgUrlBack', state.avatorImgUrlBack)
  },
  //  获取图片地址的方法
  changeImgSrc (state, src) {
    state.avatorImgSrc = src

    console.log('state.avatorImgSrc', state.avatorImgSrc)
  },
  // 修改版本的状态
  changeVersionId (state, id) {
    state.versionId = id
  },
  // 修改菜单数据列表状态
  changeSelectListStatus (state, data) {
    state.selectListStatus = data
    sessionStorage.setItem('statusCode', data)
    //  缓存本条数据  用于在提交页面菜单显示对应的章节 showChapterData 对应章节数据
    sessionStorage.setItem('showChapterData', data)
  },
  // 修改网站资源/我的资源/共享资源的状态变量
  changeSiteTypeNum (state, num) {
    state.setSiteTypeNum = num
  },
  // 上传视频后，截取封面，实现封面预览
  scanImgUrl (state, src) {
    state.scanImgUrl = src
    console.log('state.scanImgUrl', state.scanImgUrl)
  },
  changeUserName (state, uname) {
    state.userName = uname
  },
  selectMask (state, data) {
    state.selectMask = data
  }
}

const actions = {
  setPtId ({ state, commit }, item) {
    commit('ptid', item) // 提交state
  },
  setMyInfo ({ state, commit }, item) {
    commit('myInfo', item)
  },
  setCourseType ({ state, commit }, item) {
    commit('coursetype', item)
  },
  setFormFileName ({ state, commit }, item) {
    commit('formFileName', item)
  },
  setCode ({ state, commit }, item) {
    commit('setCode', item)
  },
  setAvatorImgUrl ({ state, commit }, item) {
    commit('avatorImgUrl', item)
  },
  setAvatorImgUrlBack ({ state, commit }, item) {
    commit('avatorImgUrlBack', item)
  },
  setImgSrc ({state, commit }, src) {
    commit('changeImgSrc', src)
  },
  setShare ({state, commit}, type) {
    commit('shareStatu', type)
  },
  // 异步提交版本状态
  setVersionId ({state, commit}, id) {
    commit('changeVersionId', id)
  },
  //  异步提交列表数据状态
  setSelectListStatus ({state, commit}, data) {
    commit('changeSelectListStatus', data)
  },
  // 异步提交网站资源/我的资源/共享资源的状态变量
  setSiteTypeNum ({state, commit}, num) {
    commit('changeSiteTypeNum', num)
  },
  setScanImgUrl ({state, commit}, item) {
    commit('scanImgUrl', item)
  },
  setUserName ({state, commit}, uname) {
    commit('changeUserName', uname)
  },
  //
  setSelectMask ({state, commit}, data) {
    commit('selectMask', data)
  }

}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
