<template>
  <div class="header">
    <div style="display: flex; align-items: center">
      <i
        @click="changeCollapse"
        :class="$store.state.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        style="font-size: 20px;cursor: pointer"
      ></i>
      <el-breadcrumb separator="/" style="margin-left: 10px">
        <el-breadcrumb-item
          :key="index"
          v-for="(item, index) in breadcrumbs"
        >
          <a v-if="item.level === 1" :href='item.path'>{{item.name}}</a>
          <span v-else>{{item.name}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown>
      <el-avatar :size="30" :src="userInfo.portrait" @error="errorHandler" style="border-radius: 50%;text-align: center;">
        <img src="../../assets/default-avatar.png"/>
      </el-avatar>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item divided @click.native="handleLogout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserInfo } from '@/services/user'

export default Vue.extend({
  name: 'AppHeader',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    breadcrumbs () {
      return this.$store.state.breadcrumbs
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.content
    },
    errorHandler () {
      console.log('---')
    },
    handleLogout () {
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('setUser', null)
        this.$router.push({
          name: 'login'
        })
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    changeCollapse () {
      this.$store.commit('changeCollapse', !this.$store.state.isCollapse)
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  background: #f8f9fb;
  padding: 0 20px;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>
