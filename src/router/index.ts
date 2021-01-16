import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/course/index.vue')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue')
      },
      {
        path: '/advert/create',
        name: 'advert-create',
        component: () => import(/* webpackChunkName: 'advert-create' */ '@/views/advert/components/CreateOrEdit.vue')
      },
      {
        path: '/advert/:id/edit',
        name: 'advert-edit',
        component: () => import(/* webpackChunkName: 'advert-edot' */ '@/views/advert/components/CreateOrEdit.vue')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue')
      },
      {
        path: '/advert-space/create',
        name: 'advert-space-create',
        component: () => import(/* webpackChunkName: 'advert-space-create' */ '@/views/advert-space/components/CreateOrEdit.vue')
      },
      {
        path: '/advert-space/:id/edit',
        name: 'advert-space-edit',
        component: () => import(/* webpackChunkName: 'advert-space-edit' */ '@/views/advert-space/components/CreateOrEdit.vue')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue')
      },
      {
        path: '/course/create',
        name: 'course-create',
        component: () => import(/* webpackChunkName: 'course-create' */ '@/views/course/components/CreateOrEdit.vue')
      },
      {
        path: '/course/:id/edit',
        name: 'course-edit',
        component: () => import(/* webpackChunkName: 'course-edit' */ '@/views/course/components/CreateOrEdit.vue')
      },
      {
        path: '/course/:courseId/section',
        name: 'course-section',
        props: true,
        component: () => import(/* webpackChunkName: 'course-section' */ '@/views/course/section.vue')
      },
      {
        path: '/course/:courseId/video',
        name: 'course-video',
        props: true,
        component: () => import(/* webpackChunkName: 'course-video' */ '@/views/course/video.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue')
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-create' */ '@/views/menu/create.vue')
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-edit' */ '@/views/menu/edit.vue')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue')
      },
      {
        path: '/resourceCategory',
        name: 'resourceCategory',
        component: () => import(/* webpackChunkName: 'resourceCategory' */ '@/views/resource-category/index.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue')
      },
      {
        path: '/allocMenu/:roleId',
        name: 'allocMenu',
        props: true,
        component: () => import(/* webpackChunkName: 'allocMenu' */ '@/views/role/alloc-menu/index.vue')
      },
      {
        path: '/role/:roleId/alloc-resource',
        name: 'allocResource',
        props: true,
        component: () => import(/* webpackChunkName: 'allocResource' */ '@/views/role/alloc-resource.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

const initBreadcrumb = (to: any) => {
  const temp = [{
    name: 'Home',
    path: '/',
    level: 1
  }]
  switch (to.name) {
    case 'advert':
      temp.push({
        name: '广告管理',
        path: to.fullPath,
        level: 2
      })
      break
    case 'advert-create':
      temp.push({
        name: '新建广告',
        path: to.fullPath,
        level: 2
      })
      break
    case 'advert-edit':
      temp.push({
        name: '编辑广告',
        path: to.fullPath,
        level: 2
      })
      break
    case 'advert-space':
      temp.push({
        name: '广告位管理',
        path: to.fullPath,
        level: 2
      })
      break
    case 'advert-space-create':
      temp.push({
        name: '新增广告位',
        path: to.fullPath,
        level: 2
      })
      break
    case 'advert-space-edit':
      temp.push({
        name: '编辑广告位',
        path: to.fullPath,
        level: 2
      })
      break
    case 'course':
      temp.push({
        name: '课程管理',
        path: to.fullPath,
        level: 2
      })
      break
    case 'course-create':
      temp.push({
        name: '新增课程',
        path: to.fullPath,
        level: 2
      })
      break
    case 'course-edit':
      temp.push({
        name: '编辑课程',
        path: to.fullPath,
        level: 2
      })
      break
    case 'course-section':
      temp.push({
        name: '课程管理',
        path: '/course',
        level: 1
      })
      temp.push({
        name: '课程结构',
        path: to.fullPath,
        level: 2
      })
      break
    case 'course-video':
      temp.push({
        name: '上传视频',
        path: to.fullPath,
        level: 2
      })
      break
    case 'user':
      temp.push({
        name: '用户管理',
        path: to.fullPath,
        level: 2
      })
      break
    case 'menu':
      temp.push({
        name: '菜单管理',
        path: to.fullPath,
        level: 2
      })
      break
    case 'menu-create':
      temp.push({
        name: '新建菜单',
        path: to.fullPath,
        level: 2
      })
      break
    case 'menu-edit':
      temp.push({
        name: '编辑菜单',
        path: to.fullPath,
        level: 2
      })
      break
    case 'resource':
      temp.push({
        name: '资源管理',
        path: to.fullPath,
        level: 2
      })
      break
    case 'resourceCategory':
      temp.push({
        name: '资源分类',
        path: to.fullPath,
        level: 2
      })
      break
    case 'role':
      temp.push({
        name: '角色管理',
        path: to.fullPath,
        level: 2
      })
      break
    case 'allocMenu':
      temp.push({
        name: '分配菜单',
        path: to.fullPath,
        level: 2
      })
      break
    case 'allocResource':
      temp.push({
        name: '分配资源',
        path: to.fullPath,
        level: 2
      })
      break
  }
  store.commit('setBreadcrumbs', temp)
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      initBreadcrumb(to)
      next()
    }
  } else {
    initBreadcrumb(to)
    next()
  }
})

export default router
