<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button
          @click="$router.push({ name: 'menu-create' })"
        >添加菜单</el-button>
      </div>
      <menu-list></menu-list>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MenuList from './components/List.vue'

export default Vue.extend({
  name: 'MenuIndex',
  components: {
    MenuList
  }
})
</script>

<style lang="scss" scoped>
.menu {
  text-align: left;
}
</style>
