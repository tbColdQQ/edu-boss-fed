<template>
  <div class="advert">
    <user-list></user-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UserList from './components/List.vue'
export default Vue.extend({
  name: 'UserIndex',
  components: {
    UserList
  }
})
</script>

<style lang="scss" scoped>

</style>
