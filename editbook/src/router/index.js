import Vue from 'vue'
import VueRouter from 'vue-router'

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}
Vue.use(VueRouter)

let routes = [
  {
    path: '',
    redirect: '/home',
    meta: {
      title: '主页',
      selected: '1'
    }
  },
  {
    path: '/home',
    name: '主页',
    component: () => import('../components/HelloWorld'),
    meta: {
      title: '主页',
      selected: '1'
    }
  },
  {
    path: '/option',
    name: '我的夏季',
    component: () => import('../components/options'),
    meta: {
      title: '我的 | 我的夏季',
      selected: '3'
    }
  },
  {
    path: '/option1',
    name: '我的夏季1',
    component: () => import('../components/options1'),
    meta: {
      title: '我的 | 我的夏季1',
      selected: '3'
    }
  },
  {
    path: '/owncode',
    name: '图片展示',
    component: () => import('../components/card'),
    meta: {
      title: '我的 | 图片展示 | 我的冬季',
      selected: '4'
    }
  },
  {
    path: '/page-show',
    name: '页面展示',
    component: () => import('../components/pageShow'),
    meta: {
      title: '我的电脑 | 页面展示',
      selected: '6'
    }
  },
  {
    path: '/test',
    name: '文本展示',
    component: () => import('../components/text'),
    meta: {
      title: '文本展示',
      selected: '5'
    }
  },
  {
    path: '/UpLoadImage',
    name: '上传图片',
    component: () => import('../components/upload')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../components/NoFound'),
    meta: {
      selected: '7'
    }
  }
]

let router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active'
})


router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '测试页面'
  }
  next()
})

export default router

