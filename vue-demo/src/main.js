import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import request from './configs/request';
import moment from 'moment';
import BigJs from 'big.js';
import CanIUse from '@/components/CanIUse';
import './plugins/ant-design-vue.js';
import '@/configs/GlobalStyle.css';
import element from "./plugins/element.js"
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(element)

Vue.config.productionTip = false;

Vue.component('can-i-use', CanIUse);

Vue.prototype.$request = request;
Vue.prototype.$moment = moment;
Vue.prototype.$BigJs = BigJs;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
