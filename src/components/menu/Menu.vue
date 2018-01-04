<template>
  <ul class="nav nav-pills">
    <li v-for="item in menus" :class="styleClass(item)" @click="toPath(item)">
      <a href="javascript:;">{{item.text}}</a>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'menus',
  data() {
    return {
      menus: [{
        text: '登陆',
        path: '/login'
      }, {
        text: '注册',
        path: '/register'
      }]
    }
  },
  methods: {
    styleClass(item) {
      return { active: item.path === this.$route.path }
    },
    toPath(path) {
      this.$router.replace(path)
    }
  }
}
</script>
