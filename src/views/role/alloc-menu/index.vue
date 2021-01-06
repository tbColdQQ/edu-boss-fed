<template>
  <el-card class="box-card">
    <el-tree
      style="margin-bottom: 20px"
      :data="menus"
      :props="defaultProps"
      show-checkbox
      node-key="id"
      :default-checked-keys="checkedKeys"
      default-expand-all
      ref="tree">
    </el-tree>
    <el-button type="primary" @click="onSubmit">保存</el-button>
    <el-button @click="onReset">清空</el-button>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getMenuNodeList, getRoleMenus, allocatedRoleMenus } from '@/services/menu'
import { Tree } from 'element-ui'

export default Vue.extend({
  name: 'AllocMenuIndex',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      menus: [],
      checkedKeys: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      }
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
        this.getCheckedKeys(data.data)
      }
    },
    getCheckedKeys (menus: any) {
      menus.forEach((item: any) => {
        if (item.selected) {
          this.checkedKeys = [...this.checkedKeys, item.id] as any
        }
        if (item.subMenuList) {
          this.getCheckedKeys(item.subMenuList)
        }
      })
    },
    async onSubmit () {
      const { data } = await allocatedRoleMenus({
        roleId: this.roleId,
        menuIdList: (this.$refs.tree as Tree).getCheckedKeys()
      })
      if (data.code === '000000') {
        this.$router.back()
        this.$message.success('保存成功')
      } else {
        this.$message.error(data.mesg)
      }
    },
    onReset () {
      (this.$refs.tree as Tree).setCheckedKeys([])
    }
  }
})
</script>

<style lang="scss" scoped>
.box-card {
  min-height: 90%;
}
</style>
