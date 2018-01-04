import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from 'views/Home.vue'
import login from 'views/login.vue'



Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  linkActiveClass: 'active',
  base: __dirname,
  routes: [{
    path: '/',
    component: login
  },{
    path: '/index',
    component: Home
  }, {
    path: '/login',
    component: login
  }]
})

export default router
