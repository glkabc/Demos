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
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: '主页',
    component: () => import('../components/HelloWorld'),
    meta: {
      title: '主页'
    }
  },
  {
    path: '/option',
    name: '我的夏季',
    component: () => import('../components/options'),
    meta: {
      title: '我的 | 我的夏季'
    }
  },
  {
    path: '/owncode',
    name: '图片展示',
    component: () => import('../components/card'),
    meta: {
      title: '我的 | 图片展示 | 我的冬季'
    }
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../components/NoFound')
  }
]

let router = new VueRouter({
  mode: 'history',
  routes
})


router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '测试页面'
  }
  next()
})

export default router

