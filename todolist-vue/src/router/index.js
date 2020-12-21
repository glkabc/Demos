import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/TodoList'
import ListItem from '../components/TodoList/ListItem'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Index'
  },
  {
    path: '/Index',
    name: 'Index',
    component: Index,
    children: [
      {
        path: '',
        redirect: 'all'
      },
      {
        path: 'all',
        name: 'AllItem',
        component: ListItem
      },
      {
        path: 'done',
        name: 'ListDone',
        component: ListItem
      },
      {
        path: 'notdone',
        name: 'ListDoneNot',
        component: ListItem
      },
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
