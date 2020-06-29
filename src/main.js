import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import VueLazyload from "vue-lazyload";
import AwesomePicker from "vue-awesome-picker";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Loading from "./plugin/loading";
import Model from "./plugin/model";
import Toast from "./plugin/toast";

axios.defaults.baseURL = "http://api.4yue.top/index.php/";
axios.defaults.timeout = 10000;
axios.defaults.headers.appkey =
  "f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM";

axios.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.error_code === 0) {
      return res.data || "";
    } else {
      return Promise.reject(new Error(res.error_msg || "获取失败"));
    }
  },
  error => {
    console.log("error", error);
    return Promise.reject(error);
  }
);
Vue.use(VueAxios, axios);

//自定义加载插件
Vue.use(Loading);
Vue.use(Model);
Vue.use(Toast);

//年月日插件
Vue.use(AwesomePicker);
//图片加载
Vue.use(VueLazyload, {
  loading: '/images/loading-svg/loading-bars.svg'
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
