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
      <div class="btn-group">
        <el-button type="primary" style="margin-right: 50px" @click="onSubmit">保存</el-button>
        <el-button @click="onReset">重置</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getRoleResources, allocateRoleResources } from '@/services/resource'
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
      checkAll: false
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
            item.checkAll = item.resourceList.filter((a: any) => a.selected).length === item.resourceList.length
            item.checkedKeys = item.resourceList.filter((a: any) => a.selected).map((a: any) => {
              return a.id
            })
            if (item.checkedKeys.length > 0 && item.checkedKeys.length < item.resourceList.length) {
              item.indeterminate = true
            } else {
              item.indeterminate = false
            }
          }
        })
        this.resources = data.data
      } else {
        this.$message.error(data.mesg)
      }
    },
    handleCheckAllChange (val: boolean, index: number) {
      (this.resources[index] as any).checkedKeys = [] as never
      (this.resources[index] as any).checkAll = val
      if ((this.resources[index] as any).resourceList) {
        (this.resources[index] as any).resourceList.forEach((item: any) => {
          item.selected = val as never
          if (val) {
            (this.resources[index] as any).checkedKeys = [...(this.resources[index] as any).checkedKeys, item.id]
          }
        })
      }
      (this.resources[index] as any).indeterminate = false
    },
    handleCheckedResourcesChange (value: [], index: number) {
      if (value.length === 0) {
        (this.resources[index] as any).checkAll = false as never
        (this.resources[index] as any).indeterminate = false
      } else {
        (this.resources[index] as any).indeterminate = true
        if ((this.resources[index] as any).resourceList.length === value.length) {
          (this.resources[index] as any).checkAll = true as never
          (this.resources[index] as any).indeterminate = false
        }
      }
      (this.resources[index] as any).checkedKeys = value
    },
    async onSubmit () {
      let resourceIdList: [] = []
      this.resources.forEach((resource: any) => {
        resourceIdList = resourceIdList.concat(resource.checkedKeys) as never
      })
      const { data } = await allocateRoleResources({
        roleId: this.roleId,
        resourceIdList
      })
      if (data.code === '000000') {
        this.$message.success('操作成功')
        this.$router.push({
          name: 'role'
        })
      } else {
        this.$message.error(data.mesg)
      }
    },
    onReset () {
      this.resources.forEach((resource: any) => {
        resource.checkedKeys = []
        resource.checkAll = false
        resource.inheritAttrs = false
      })
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
.btn-group {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
</style>
