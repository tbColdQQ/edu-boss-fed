<template>
  <el-card class="box-card">
    <el-tree
      :data="data"
      :props="defaultProps"
      show-checkbox
      check-on-click-node
      @check-change="handleCheckChange">
    </el-tree>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AllocMenuIndex',
  data () {
    return {
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      roleId: this.$route.query.roleId
    }
  },
  created () {
    console.log(this.roleId)
  },
  methods: {
    handleCheckChange (data: any, checked: boolean, indeterminate: boolean) {
      console.log(data, checked, indeterminate)
    }
  }
})
</script>

<style lang="scss" scoped>
.box-card {
  min-height: 100%;
}
</style>
