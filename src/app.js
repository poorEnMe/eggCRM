import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import * as uiv from 'uiv'
import titleMixin from './util/title'
import vueCookie from 'vue-cookie';
import axios from 'axios'



Vue.prototype.$http=axios;
axios.defaults.baseURL = '/ajaxurl/welfare/gpa/';
axios.defaults.timeout=1000,
//默认的contenttype为json以及utf-8；
	axios.defaults.headers={'Content-Type': 'text/html;charset=gb2312'}
new Vue({
	el: '#app',
	render: h => h(App)
})


Vue.mixin(titleMixin);
Vue.use(vueCookie);
Vue.use(uiv)

export function createApp () {
  // 同步路由状态(route state)到 store
  sync(store, router)
  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  // 暴露 app, router 和 store。
  return {app, router, store}
}
