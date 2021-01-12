<template>
  <div>
    <el-table
      :data="list"
      border
      style="width: 100%">
      <el-table-column
        prop="spaceKey"
        label="spaceKey">
      </el-table-column>
      <el-table-column
        prop="name"
        label="广告位名称">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllSpaces } from '@/services/advert'
export default Vue.extend({
  name: 'AdvertSpaceList',
  data () {
    return {
      list: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      const { data } = await getAllSpaces()
      console.log(data)
      if (data.state === 1) {
        this.list = data.content
      }
    },
    handleEdit (item: any) {
      this.$router.push({
        name: 'advert-space-edit',
        params: {
          id: item.id
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
