<template>
  <el-card class="box-card">
    <el-tree
      :data="menus"
      :props="defaultProps"
      show-checkbox
      node-key="id"
      :default-checked-keys="checkedKeys"
      default-expand-all
      @check-change="handleCheckChange">
    </el-tree>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getMenuNodeList, getRoleMenus } from '@/services/menu'

export default Vue.extend({
  name: 'AllocMenuIndex',
  data () {
    return {
      menus: [],
      checkedKeys: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      roleId: this.$route.query.roleId
    }
  },
  created () {
    console.log(this.roleId)
    this.loadMenus()
    this.loadRoleMenus()
  },
  methods: {
    async loadMenus () {
      const { data } = await getMenuNodeList()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId as any)
      if (data.code === '000000') {
        console.log('data--->', data)
        this.getCheckedKeys(data.data)
      }
    },
    getCheckedKeys (menus: any) {
      menus.forEach((item: any) => {
        if (item.selected) {
          this.checkedKeys.push(item.id as never)
        }
        if (item.subMenuList) {
          this.getCheckedKeys(item.subMenuList)
        }
      })
    },
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
