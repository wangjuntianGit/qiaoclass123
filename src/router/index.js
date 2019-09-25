import Vue from 'vue'
import Router from 'vue-router'
import layout from '../components/layout/layout'
// import personal from '../components/personalcenter/personal'

Vue.use(Router)

export default new Router({
  base: '/',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/login')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/components/register')
    },
    {
      path: '/usercontract',
      name: 'usercontract',
      component: () => import('@/components/usercontract')
    },
    {
      path: '/siteresources',
      name: 'siteresources',
      component: layout,
      children: [
        {
          path: 'index',
          name: 'siteresources',
          meta: {
            active: 1,
            title: '网站资源'
          },
          component: () => import('@/components/resources/siteResources')
        }
      ]
    },
    {
      path: '/myresources',
      name: 'myresources',
      component: layout,
      children: [
        {
          path: 'index',
          name: 'myresources',
          meta: {
            active: 2,
            title: '我的资源'
          },
          component: () => import('@/components/resources/myResources')
        }
      ]
    },
    {
      path: '/shareresources',
      name: 'shareresources',
      component: layout,
      children: [
        {
          path: 'index',
          name: 'shareresources',
          meta: {
            active: 3,
            title: '共享资源'
          },
          component: () => import('@/components/resources/shareResources')
        }
      ]
    },
    {
      path: '/pptdetail',
      name: 'pptdetail',
      component: () => import('@/components/pptcontent/pptdetail')
    },
    {
      path: '/upload',
      name: 'upload',
      //   component: () => import('@/components/uploadfile/upload')
      component: resolve => require(['@/components/uploadfile/upload'], resolve)
    },
    {
      path: '/createfile',
      name: 'createfile',
      //   component: () => import('@/components/uploadfile/createfile')
      component: resolve => require(['@/components/uploadfile/createfile'], resolve)
    },
    {
      path: '/guide',
      name: 'guide',
      component: () => import('@/components/guide/guide')
    },
    {
      path: '/movie',
      name: 'movie',
      component: () => import('@/components/movie/movie')
    },
    {
      path: '/gif',
      name: 'gif',
      component: () => import('@/components/gif/gif')
    },
    {
      path: '/microCourse',
      name: 'microCourse',
      component: () => import('@/components/movie/microCourse')
    },
    {
      path: '/image',
      name: 'image',
      component: () => import('@/components/gif/image')
    },
    // {
    //   path: '/personal',
    //   redirect: '/personal/setting'
    // },
    {
      path: '/personal',
      name: 'personal',
      component: () => import('@/components/personalcenter/personal'),
      children: [
        {
          path: 'setting',
          name: 'setting',
          meta: {
            active: 0,
            title: '个人设置'
          },
          component: () => import('@/components/personalcenter/setting')
        },
        {
          path: 'drafts',
          name: 'drafts',
          meta: {
            active: 1,
            title: '草稿箱'
          },
          component: () => import('@/components/personalcenter/drafts')
        }
      ]

    },
    {
      path: '*',
      name: 'notFound',
      component: () => import('@/components/common/notFound')
    }
  ]
})
