<template>
  <div>
    <el-table
      :data="adverts"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        width="100"
        label="id">
      </el-table-column>
      <el-table-column
        prop="name"
        label="广告名称">
      </el-table-column>
      <el-table-column
        prop="spaceName"
        label="广告位置">
      </el-table-column>
      <el-table-column
        label="广告图片">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.img"
            fit="contain"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="时间">
        <template slot-scope="scope">
          <div>开始时间：{{scope.row.startTimeFormatString}}</div>
          <div>到期时间：{{scope.row.endTimeFormatString}}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="上线/下线">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            active-color="#40586f"
            :inactive-value="0">
          </el-switch>
        </template>
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
import { getAdList, getAllSpaces } from '@/services/advert'

export default Vue.extend({
  name: 'AdvertList',
  data () {
    return {
      adverts: [],
      isLoading: false
    }
  },
  created () {
    this.loadAllAdverts()
  },
  methods: {
    async loadAllAdverts () {
      const { data } = await getAdList()
      if (data.state === 1) {
        const advertList: any[] = data.content
        let spaceList: any[] = []
        const res = await getAllSpaces()
        if (res.data.state === 1) {
          spaceList = res.data.content
        }
        if (spaceList.length > 0) {
          let searchData = []
          advertList.forEach((item: any) => {
            searchData = spaceList.filter((a: any) => a.id === item.spaceId)
            if (searchData.length > 0) {
              item.spaceName = searchData[0].name
            } else {
              item.spaceName = ''
            }
          })
        }
        this.adverts = advertList as never
      }
    },
    handleEdit (item: any) {
      console.log('handleEdit')
      this.$router.push({
        name: 'advert-edit',
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
