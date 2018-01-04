<template>
  <header id="header" class="header">
    <top-menus></top-menus>
  </header>
</template>
<script>
import TopMenus from 'components/menu/Menu.vue'

export default {
  components: {
    TopMenus
  }
}
</script>
<style lang="stylus">
  .header
    padding: 12px 20px 0;
</style>
