import "assets/css/index.scss";
import "assets/css/reset.scss";
import Vue from "vue";
import App from "./App.vue";
import VSnow from "./v-snow";
Vue.use(VSnow);
new Vue({
  el: "#app",
  render: h => h(App)
});
