import Vue from 'vue'
import App from './App.vue'
// import Router from './router/router'
import VueRouter from 'vue-router'
import Home from './components/tempfile/Home'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/Home',
      component: Home
    }
  ]
});

Vue.config.productionTip = false
Vue.use(VueRouter);

// Vue.use(Router);
// 定义一下全局的指令可以定义成下面形式
Vue.directive('focus', {
    inserted (el) {
        // 自定义指令要做的事
        el.focus();
    }
});
new Vue({
  router,
  render: h => h(App),
  // Router
}).$mount('#app')
