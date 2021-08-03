import Vue from "vue";
import axios from "axios";
// import echarts from "echarts";
const echarts = require("echarts");

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  }
}).$mount("#app");
