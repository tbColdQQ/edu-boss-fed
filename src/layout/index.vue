<template>
  <el-container>
    <el-aside :width="$store.state.isCollapse ? '64px' : '200px'">
      <app-aside></app-aside>
    </el-aside>
    <el-container>
      <el-header>
        <app-header></app-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AppAside from './conponents/app-aside.vue'
import AppHeader from './conponents/app-header.vue'
export default Vue.extend({
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  }
})
</script>

<style lang="scss" scoped>
.el-container {
  min-height: 100vh;
  min-width: 980px;
}
.el-aside {
  background: #d3dce6;
}
.el-header {
  background: #b3c0d1;
  padding: 0;
  margin: 0;
}
.el-main {
  background: #e9eef3;
}
</style>
