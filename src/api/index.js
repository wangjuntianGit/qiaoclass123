import fetch from '../assets/js/fetch.js'
import store from '../store/modules/common'
// const url = 'dev/devices/'
// console.log("store.state.baseUrl is " + store.state.baseUrl);
// fetch.defaults.baseURL = store.state.baseUrl

const baseURL = store.state.baseUrl
// console.log(baseURL)
// const baseURL = ''

// 资源类别组课件
export function fetchGroupCourse (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'apippt/groupcourse',
    data: {params}
  })
}

// ppt编辑页面完成编辑方法
export function fetchPptSaveEdit (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'apippt/savediy',
    data: {params}
  })
}

// ppt编辑页面保存草稿
export function fetchPptSaveInterval (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'apippt/savedrafts',
    data: {params}
  })
}

// 左侧目录修改
export function fetchMenuEdit (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'apippt/updmenuname',
    data: {params}
  })
}

// 左侧目录数据
export function fetchMenuLists (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'apippt/getmenu',
    data: {params}
  })
}

// 分享
export function fetchShare (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: '/course/share',
    data: {
      params
    }
  })
}

export function pptdetail (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'course/detail',
    data: {params}
  })
}
export function fetchSubmitForm (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'course/uploadres',
    data: {params}
  })
}

// 封装获取章列表的接口

export function fetchChapterSelect (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'course/chapterselect',
    data: {params}
  })
}
export function fetchCourseType (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'course/coursewaretype',
    data: {params}
  })
}

export function fetchPptDetailFromDrafts (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'apippt/getdrafts',
    data: {params}
  })
}
// 请求ppt详情数据接口封装
export function fetchPptDetail (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'course/pptdetail',
    data: {params}
  })
}

export function fetchDetail (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'course/detail',
    data: {params}
  })
}
// 8.10_LY修改pptDetail desc content start
export function fetchDetailUpdinfo (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: '/course/updcourse',
    data: {params}
  })
}
// end
export function fetchLeftSiteMenu (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'api/levelist',
    data: {
      params
    }
  })
}

export function fetchPptSee (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'api/statis',
    data: {
      params
    }
  })
}

export function fetchPptScan (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'api/statis',
    data: {
      params
    }
  })
}

export function fetchDownload (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'api/statis',
    data: {
      params
    }
  })
}
export function sourceDownload (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: '/course/download',
    data: {
      params
    }
  })
}

export function fetchCollect (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'api/collect',
    data: {
      params
    }
  })
}

export function fetchPptRename (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'api/updatename',
    data: {
      params
    }
  })
}

export function fetchDelPpt (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'api/deletecourse',
    data: {
      params
    }
  })
}

export function fetchSources (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'api/courseware',
    data: {
      params
    }
  })
}

export function fetchGrades (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'api/gradelist',
    data: {
      params
    }
  })
}

export function fetchSubjectItems (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'api/subjectlist',
    data: {
      params
    }
  })
}

export function fetchVersionlist (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'api/versionlist',
    data: {
      params
    }
  })
}
export function fetchSelecTypeList (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: 'api/selectypelist',
    data: {
      params
    }
  })
}

// 草稿箱数据重命名
export function renameDrafts (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: '/ucenter/service/renamedrafts',
    data: {params}
  })
}

// 删除草稿箱数据
export function delDrafts (params) {
  return fetch({
    method: 'post',
    baseURL,
    url: '/ucenter/service/deletedrafts',
    data: {params}
  })
}
