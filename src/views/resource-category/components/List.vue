<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>资源分类</h3>
      </div>
      <el-row>
        <el-button type="primary" @click="handleCreate">添加</el-button>
      </el-row>
      <el-table border v-loading="isLoading" :data="categories" style="width: 100%;margin-bottom: 20px;margin-top: 20px;">
        <el-table-column type="index" label="编号" width="100"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="createdTime" label="创建时间"></el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
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
    </el-card>
    <el-dialog :title="isEdit ? '编辑资源分类' : '创建资源分类'" :visible.sync="dialogFormVisible">
      <resource-category-create-or-edit v-if="dialogFormVisible" @success="onSuccess" :category="category" :is-edit="isEdit" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ResourceCategoryCreateOrEdit from './CreateOrEdit.vue'
import { getResourceCategories, deleteCategory } from '@/services/resource-category'

export default Vue.extend({
  name: 'ResourceCategoryList',
  components: {
    ResourceCategoryCreateOrEdit
  },
  data () {
    return {
      categories: [],
      isLoading: true,
      dialogFormVisible: false,
      resourceCategoryId: null,
      isEdit: false,
      category: {}
    }
  },
  created () {
    this.loadResourceCategories()
  },
  methods: {
    async loadResourceCategories () {
      this.isLoading = true
      const { data } = await getResourceCategories()
      if (data.code === '000000') {
        this.categories = data.data
      }
      this.isLoading = false
    },
    onSubmit () {
      this.loadResourceCategories()
    },
    handleCreate () {
      this.dialogFormVisible = true
      this.category = {
        name: '',
        sort: null
      }
      this.isEdit = false
    },
    handleEdit (item: any) {
      this.dialogFormVisible = true
      this.category = item
      this.isEdit = true
    },
    handleDelete (item: any) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => {
          const { data } = await deleteCategory(item.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadResourceCategories()
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    onSuccess () {
      this.dialogFormVisible = false
      this.loadResourceCategories()
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
