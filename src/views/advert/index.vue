<template>
  <div class="advert">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button
          @click="$router.push({ name: 'advert-create' })"
        >添加广告</el-button>
      </div>
      <advert-list></advert-list>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AdvertList from './components/List.vue'
export default Vue.extend({
  name: 'AdvertIndex',
  components: {
    AdvertList
  }
})
</script>

<style lang="scss" scoped>
.advert {
  text-align: left;
}
</style>
