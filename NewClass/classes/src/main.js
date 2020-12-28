import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import CanIUse from '@/components/CanIUse';
import "./plugins/ant-design-vue.js";
import "ant-design-vue/dist/antd.css";
import '@/configs/GlobalStyle.css';
import '@/configs/font_svg/iconfont.css'
// import '@/configs/font_svg/iconfont.js'
Vue.config.productionTip = false;
Vue.component('can-i-use', CanIUse);
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  console.log('start mock')
  worker.start();
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
