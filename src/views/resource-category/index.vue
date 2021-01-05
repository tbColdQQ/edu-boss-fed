<template>
  <div class="resource-category">
    <resource-category-list></resource-category-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ResourceCategoryList from './components/List.vue'
export default Vue.extend({
  name: 'ResourceCategoryIndex',
  components: {
    ResourceCategoryList
  }
})
</script>

<style lang="scss" scoped>
.resource-category {
  text-align: left;
}
</style>
