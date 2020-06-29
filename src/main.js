import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import qs from "qs";
// import { from } from "core-js/fn/array";



Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$qs = qs;
//将axios添加到vue的原型中
Vue.prototype.$axios = axios;

router.beforeEach((to,from,next) =>{
  if (to.meta.requireAuth) {
    if (store.state.user.username) {
      next()
    } else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
