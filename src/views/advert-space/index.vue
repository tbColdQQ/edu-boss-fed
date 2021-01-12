<template>
  <div class="advert-space">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button
          @click="$router.push({ name: 'advert-space-create' })"
        >添加广告位</el-button>
      </div>
      <advert-space-list></advert-space-list>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AdvertSpaceList from './components/List.vue'
export default Vue.extend({
  name: 'AdvertSpaceIndex',
  components: {
    AdvertSpaceList
  }
})
</script>

<style lang="scss" scoped>
.advert-space {
  text-align: left;
}
</style>
