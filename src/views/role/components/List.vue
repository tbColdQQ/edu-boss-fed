<template>
  <div class="role-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
          <el-form-item prop="name" label="角色名称">
            <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询</el-button>
            <el-button type="default" @click="onReset" :disabled="isLoading">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-row>
        <el-button type="primary" @click="handleCreate">添加角色</el-button>
      </el-row>
      <el-table border v-loading="isLoading" :data="roles" style="width: 100%;margin-bottom: 20px;margin-top: 20px;">
        <el-table-column type="index" label="编号" width="100"></el-table-column>
        <el-table-column prop="name" label="角色名称"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="createdTime" label="添加时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="allocMenu(scope.row)">分配菜单</el-button>
            <el-button
              size="mini"
              @click="allocResource(scope.row)">分配资源</el-button>
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
    <el-dialog :title="isEdit ? '编辑角色' : '创建角色'" :visible.sync="dialogFormVisible">
      <role-create-or-edit v-if="dialogFormVisible" @success="onSuccess" :role-id="roleId" :is-edit="isEdit" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RoleCreateOrEdit from './CreateOrEdit.vue'
import { getRolePages, deleteRole } from '@/services/role'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'RoleList',
  components: {
    RoleCreateOrEdit
  },
  data () {
    return {
      roles: [],
      form: {
        name: '',
        current: 1,
        size: 5
      },
      total: 0,
      isLoading: true,
      dialogFormVisible: false,
      roleId: null,
      isEdit: false
    }
  },
  created () {
    this.loadRoles()
  },
  methods: {
    async loadRoles () {
      this.isLoading = true
      const { data } = await getRolePages(this.form)
      if (data.code === '000000') {
        this.roles = data.data.records
        this.total = data.data.total
      }
      this.isLoading = false
    },
    onSubmit () {
      this.form.current = 1
      this.loadRoles()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1
      this.loadRoles()
    },
    handleCreate () {
      this.dialogFormVisible = true
      this.roleId = null
      this.isEdit = false
    },
    handleEdit (item: any) {
      this.dialogFormVisible = true
      this.roleId = item.id
      this.isEdit = true
    },
    handleDelete (item: any) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => {
          const { data } = await deleteRole(item.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadRoles()
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1
      this.loadRoles()
    },
    handleCurrentChange (val: number) {
      this.form.current = val
      this.loadRoles()
    },
    allocMenu (item: any) {
      this.$router.push({
        name: 'allocMenu',
        params: {
          roleId: item.id
        }
      })
    },
    allocResource (item: any) {
      this.$router.push({
        name: 'allocResource',
        params: {
          roleId: item.id
        }
      })
    },
    onSuccess () {
      this.dialogFormVisible = false
      this.loadRoles()
    }
  }
})
</script>

<style lang="scss" scoped>
  .role-list {
    text-align: left;
  }
</style>
