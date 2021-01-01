<template>
  <div id="app">
    <h1>拉勾教育</h1>
    <router-view />
    <el-row>
      <el-button>test</el-button>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface Foo {
  a: string
  b: number
}

export default Vue.extend({
  name: 'App'
})
</script>

<style lang="scss" scoped>
// @import "~@/styles/variables.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
