<template>
  <div class="aside">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      collapse-transition
      mode="vertical"
      router
    >
      <div class="logo" @click="$router.push({
        name: 'home'
      })">
        <img src="../../assets/logo.png"  class="logo-img"/>
        <div v-if="!isCollapse" class="logo-text">Edu Boss</div>
      </div>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-lock"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/role">
          <i class="el-icon-lock"></i>
          <span slot="title">角色管理</span>
        </el-menu-item>
        <el-menu-item index="/menu">
          <i class="el-icon-menu"></i>
          <span slot="title">菜单管理</span>
        </el-menu-item>
        <el-menu-item index="/resource">
          <i class="el-icon-lock"></i>
          <span slot="title">资源管理</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/course">
        <i class="el-icon-film"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-document"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>广告管理</span>
        </template>
        <el-menu-item index="/advert">
          <i class="el-icon-setting"></i>
          <span slot="title">广告列表</span>
        </el-menu-item>
        <el-menu-item index="/advert-space">
          <i class="el-icon-setting"></i>
          <span slot="title">广告位列表</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppAside',
  computed: {
    isCollapse () {
      return this.$store.state.isCollapse
    }
  },
  methods: {
    handleOpen (key: string, keyPath: string): void {
      console.log(key, keyPath)
    },
    handleClose (key: string, keyPath: string): void {
      console.log(key, keyPath)
    }
  }
})
</script>

<style lang="scss" scoped>
.el-menu {
  min-height: 100vh;
  background: #f8f9fb;
  border-right: 0;
}
.el-submenu, .el-menu-item {
  text-align: left;
}
.logo {
  height: 50px;
  background: #f8f9fb;
  cursor: pointer;
}
.logo-img {
  margin-top: 10px;
  display: inline-block;
  width: 30px;
  vertical-align: middle;
}
.logo-text {
  display: inline-block;
  text-align: left;
  font-size: 20px;
  font-family: system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
  font-weight: 700;
  vertical-align: middle;
  margin-top: 10px;
  margin-left: 10px;
}
</style>
