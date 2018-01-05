import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from 'views/Home.vue'
import Login from 'views/login.vue'
import Register from 'views/register'


Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  linkActiveClass: 'active',
  base: __dirname,
  routes: [{
    path: '/',
    component: Login
  },{
    path: '/index',
    component: Home
  }, {
    path: '/login',
    component: Login
  },{
    path: '/register',
    component: Register
  }
  ]
})

export default router
