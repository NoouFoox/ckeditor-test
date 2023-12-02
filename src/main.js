import Vue from "vue";
import SpeedEdit from "ckeditor5-speed-vue2";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import Print from "vue-print-nb";
// Global instruction
Vue.use(Print);
Vue.use(Antd);
import App from "./App.vue";
Vue.config.productionTip = false;
Vue.use(SpeedEdit);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
