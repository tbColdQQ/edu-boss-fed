<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
          <el-form-item prop="name" label="资源名称">
            <el-input v-model="form.name" placeholder="请输入资源名称"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="资源路径">
            <el-input v-model="form.url" placeholder="请输入资源路径"></el-input>
          </el-form-item>
          <el-form-item prop="categoryId" label="资源分类">
            <el-select v-model="form.categoryId" placeholder="请选择资源分类" clearable>
              <el-option
                v-for="item in categories"
                :label="item.name"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询</el-button>
            <el-button type="default" @click="onReset" :disabled="isLoading">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-row>
        <el-button type="primary">添加</el-button>
        <el-button>资源分类</el-button>
      </el-row>
      <el-table border v-loading="isLoading" :data="resources" style="width: 100%;margin-bottom: 20px;margin-top: 20px;">
        <el-table-column type="index" label="编号" width="100"></el-table-column>
        <el-table-column prop="name" label="资源名称"></el-table-column>
        <el-table-column prop="url" label="资源路径"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
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
    </el-card>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <resource-create-or-edit :resource-id="resourceId" :is-edit="false" :categories="categories" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ResourceCreateOrEdit from './CreateOrEdit.vue'
import { getResourcePages } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'ResourceList',
  components: {
    ResourceCreateOrEdit
  },
  data () {
    return {
      resources: [],
      categories: [],
      form: {
        name: '',
        url: '',
        categoryId: null,
        current: 1,
        size: 5
      },
      total: 0,
      isLoading: true,
      dialogFormVisible: false,
      resourceId: null
    }
  },
  created () {
    this.loadResources()
    this.loadResourceCategories()
  },
  methods: {
    async loadResourceCategories () {
      const { data } = await getResourceCategories()
      if (data.code === '000000') {
        this.categories = data.data
      }
    },
    async loadResources () {
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      if (data.code === '000000') {
        this.resources = data.data.records
        this.total = data.data.total
      }
      this.isLoading = false
    },
    onSubmit () {
      this.form.current = 1
      this.loadResources()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1
      this.loadResources()
    },
    handleEdit (item: any) {
      console.log('handleEdit--->', item)
      this.dialogFormVisible = true
      this.resourceId = item.id
    },
    handleDelete (item: any) {
      console.log('handleDelete--->', item)
    },
    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1
      this.loadResources()
    },
    handleCurrentChange (val: number) {
      this.form.current = val
      this.loadResources()
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
