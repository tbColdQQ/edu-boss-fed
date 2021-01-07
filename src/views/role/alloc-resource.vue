<template>
  <div class="alloc-resource">
    <el-card>
      <div
        class="box"
        v-for="(resource, index) in resources"
        :key="resource.id"
      >
        <el-row class="row row1">
          <el-checkbox
            :indeterminate="resource.indeterminate"
            v-model="resource.checkAll"
            @change="val => handleCheckAllChange(val, index)"
          >{{resource.name}}</el-checkbox>
        </el-row>
        <el-row class="row row2">
          <el-checkbox-group
            v-model="resource.checkedKeys"
            @change="val => handleCheckedResourcesChange(val, index)">
            <el-checkbox
              v-for="subResource in resource.resourceList"
              :label="subResource.id"
              :key="subResource.id"
              style="width: 33%;margin: 6px auto"
            >{{subResource.name}}</el-checkbox>
          </el-checkbox-group>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getRoleResources } from '@/services/resource'
const cityOptions: string[] = ['上海', '北京', '广州', '深圳']
export default Vue.extend({
  name: 'AllocResourceIndex',
  props: {
    roleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      resources: [],
      checkAllList: [],
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true
    }
  },
  created () {
    this.loadResources()
  },
  methods: {
    async loadResources () {
      const { data } = await getRoleResources(this.roleId)
      if (data.code === '000000') {
        data.data.forEach((item: any) => {
          if (!item.resourceList) {
            item.resourceList = []
            item.indeterminate = false
            item.checkAll = false
            item.checkedKeys = []
          } else {
            item.indeterminate = item.resourceList.filter((a: any) => a.selected).length > 0
            item.checkAll = item.resourceList.filter((a: any) => a.selected).length === item.resourceList.length
            item.checkedKeys = item.resourceList.filter((a: any) => a.selected).map((a: any) => {
              return a.id
            })
          }
        })
        console.log('data.data--->', data.data)
        this.resources = data.data
      } else {
        this.$message.error(data.mesg)
      }
    },
    handleCheckAllChange (val: string[], index: number) {
      console.log('handleCheckAllChange--->', val, index)
      // this.checkedCities = val ? cityOptions : []
      // this.isIndeterminate = false
    },
    handleCheckedResourcesChange (value: string[], index: number) {
      console.log('handleCheckedResourcesChange--->', value, index)
      // const checkedCount: number = value.length
      // this.checkAll = checkedCount === this.cities.length
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    }
  }
})
</script>

<style lang="scss" scoped>
.alloc-resource {
  text-align: left;
}
.box {
  border-top: 1px solid #dcdfe6;
  .row {
    padding: 20px;
    border-left: 1px solid #dcdfe6;
    border-right: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
  }
  .row1 {
    background: rgba(242, 246, 252, 1);
  }
}

</style>
