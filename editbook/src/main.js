import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import Element from 'element-ui'
import 'ant-design-vue/dist/antd.css';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'

Vue.config.productionTip = false
Vue.use(Element);
Vue.use(Antd);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
