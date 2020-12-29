import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';
import {canIUse} from '../components/CanIUse';
Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: '登录',
    component: () => import(/* webpackChunkName: "login", webpackPrefetch: true */ '../views/Login.vue'),
  },
  {
    path: '/',
    name: '工作台',
    redirect: '/courses',

    component: () => import(/* webpackChunkName: "login", webpackPrefetch: true */ '../views/Home.vue'),
  },
  {
    path: '/courses',
    name: '我的课程',
    component: () => import('../views/Courses.vue'),
    meta: {
      authCode: 'wdkc',
    },
    children: [
      {
        path: '',
        redirect: 'mycreation'
      },
      {
        path: 'mycreation',
        params: {
          type: 1
        },
        name: '我的创作',
        component: () => import('../views/writ/myCreation.vue')
      },
      {
        path: 'mycombat',
        params: {
          type: 2
        },
        name: '我的实战',
        component: () => import('../views/writ/myCreation.vue')//() => import('../views/writ/myCombat')
      }
    ]
  },
  {
    path: '/course/:courseId/classes',
    name: '课堂',
    component: () => import(/* webpackChunkName: "login", webpackPrefetch: true */ '../views/Classes.vue'),
  },
  // {
  //   path: '/course/:courseId/class/canvas',
  //   name: '新建课堂',
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "login", webpackPrefetch: true */ '../views/Canvas.vue'
  //     ),
  // },
  {
    path: '/course/:courseId/class/:classId/canvas/edit',
    name: '新建编辑课堂',
    component: () => import(/* webpackChunkName: "login", webpackPrefetch: true */ '../views/Canvas.vue'),
  },
  {
    path: '/course/:courseId/class/:classId/canvas',
    name: '查看课堂',
    component: () => import(/* webpackChunkName: "login", webpackPrefetch: true */ '../views/Canvas.vue'),
  },
  {
    path: '/course/:courseId/class/:classId/evaluation',
    name: '课堂评分',
    component: () => import(/* webpackChunkName: "login", webpackPrefetch: true */ '../views/Evaluation.vue'),
  },
  {
    path: '/noAuth',
    name: '暂无权限',
    component: () => import(/* webpackChunkName: "login", webpackPrefetch: true */ '../views/NoAuth.vue'),
  },
  {
    path: '/quality/score',
    name: '质控列表',
    component: () => import(/* webpackChunkName: "login", webpackPrefetch: true */ '../views/QualityScore.vue'),
  },
  {
    path: '/quality/preview',
    name: '质控列表预览',
    component: () => import('../views/QualityPreview.vue'),
  },
  {
    path: '/quality',
    name: '质控评分',
    component: () => import('../views/Quality.vue'),
    meta: {
      authCode: 'zkpf',
    },
  },
  {
    path: '/loginbs',
    name: '博思登录',
    component: () => import('../views/Loginbs.vue'),
  },
];
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active'
});
// 暂时注释
router.beforeEach((to, _, next) => {
  // 跳转的路由是否需要保护
    // 当前用户是否已经登录
    // if(to.meta.protected){
		if (store.state.auth.token) {
      // 当前用户是否有跳转页面的权限
      // console.log(to.meta.authCode ,'.....')
			// if (canIUse({ code: to.meta.authCode })) {
        
        if(to.path=='/login'){
          next({ name: '我的课程' });
          // this.$router.push('/courses');
        }else{
          next();
        }
			// } else {
			// 	next();
			// }
		} else {
      // next();
			if(to.path=='/login'||to.path=='/loginbs'||to.path=='/noAuth') {
            next()
          }
          else{
            next({ name: '登录' });
          }
    }	
});
export default router;
