<template>
  <div>
    <el-table
      :data="menus"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="100"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="菜单名称">
      </el-table-column>
      <el-table-column
        prop="level"
        label="菜单级数">
      </el-table-column>
      <el-table-column
        prop="icon"
        label="前端图标">
      </el-table-column>
      <el-table-column
        prop="orderNum"
        label="排序">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :disabled="isLoading"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="form.current"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="form.size"
      layout="total, sizes, prev, pager, next, jumper"

      :total="total">
    </el-pagination>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getMenuPages, deleteMenu } from '@/services/menu'

export default Vue.extend({
  name: 'MenuList',
  data () {
    return {
      menus: [],
      isLoading: false,
      form: {
        current: 1,
        size: 5
      },
      total: 0
    }
  },
  created () {
    this.loadAllMenus()
  },
  methods: {
    async loadAllMenus () {
      const { data } = await getMenuPages(this.form)
      if (data.code === '000000') {
        this.menus = data.data.records
        this.total = data.data.total
      }
    },
    handleEdit (item: any) {
      console.log('handleEdit')
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: item.id
        }
      })
    },
    handleDelete (item: any) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => {
          const { data } = await deleteMenu(item.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadAllMenus()
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1
      this.loadAllMenus()
    },
    handleCurrentChange (val: number) {
      this.form.current = val
      this.loadAllMenus()
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
