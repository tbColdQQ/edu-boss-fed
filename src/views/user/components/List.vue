<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
          <el-form-item prop="phone" label="手机号">
            <el-input type="number" v-model="form.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="注册时间">
            <el-date-picker
              v-model="form.time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table border v-loading="isLoading" :data="users" style="width: 100%;margin-bottom: 20px;margin-top: 20px;">
        <el-table-column prop="id" label="用户ID" width="150"></el-table-column>
        <el-table-column prop="portrait" label="头像">
          <template slot-scope="scope">
            <el-avatar :size="30" :src="scope.row.portrait" style="border-radius: 50%;text-align: center;">
              <img src="../../../assets/null-avatar.jpg"/>
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="createTime" label="注册时间">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <i class="status"
              :title="scope.row.status==='ENABLE' ? '正常' : '禁用'"
              :class="scope.row.status==='ENABLE' ? 'status-success' : 'status-danger'">
            </i>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 'ENABLE'"
              size="mini"
              type="danger"
              @click="handleStatus(scope.row)">禁用</el-button>
            <el-button
              v-else
              size="mini"
              type="primary"
              @click="handleStatus(scope.row)">启用</el-button>
            <el-button
              size="mini"
              @click="handleAllocRoles(scope.row)">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :disabled="isLoading"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="form.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="分配角色" :before-close="handleClose" style="text-align: left;" :visible.sync="dialogFormVisible">
      <el-select style="width: 600px" v-model="selectedRoles" multiple placeholder="请选择">
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleChangeRoles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserPages, enableUser, forbidUser, allocUserRoles } from '@/services/user'
import { getAllRoles, getRolesByUserId } from '@/services/role'
import moment from 'moment'

export default Vue.extend({
  name: 'UserList',
  data () {
    return {
      users: [],
      roles: [],
      selectedRoles: [],
      form: {
        phone: '',
        startCreateTime: '',
        endCreateTime: '',
        currentPage: 1,
        pageSize: 10,
        time: ''
      },
      total: 0,
      isLoading: true,
      dialogFormVisible: false,
      userId: null,
      isEdit: false,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker: any) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker: any) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker: any) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created () {
    this.loadUsers(this.form)
    this.loadRoles()
  },
  methods: {
    async loadUsers (params: any) {
      this.isLoading = true
      const { data } = await getUserPages(params)
      if (data.code === '000000') {
        data.data.records.forEach((item: any) => {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD hh:mm:ss')
        })
        this.users = data.data.records
        this.total = data.data.total
      }
      this.isLoading = false
    },
    onSubmit () {
      if (this.form.time.length > 0) {
        this.form.startCreateTime = moment(this.form.time[0]).format()
        this.form.endCreateTime = moment(this.form.time[1]).format()
      }
      this.form.currentPage = 1
      this.loadUsers(this.form)
    },
    handleSizeChange (val: number) {
      this.form.pageSize = val
      this.form.currentPage = 1
      this.loadUsers(this.form)
    },
    handleCurrentChange (val: number) {
      this.form.currentPage = val
      this.loadUsers(this.form)
    },
    async handleStatus (item: any) {
      console.log('handleStatus')
      if (item.status === 'ENABLE') {
        const { data } = await forbidUser(item.id)
        if (data.code === '000000') {
          item.status = 'DISABLE'
        }
      } else {
        const { data } = await enableUser(item.id)
        if (data.code === '000000') {
          item.status = 'ENABLE'
        }
      }
    },
    async loadRoles () {
      const { data } = await getAllRoles()
      if (data.code === '000000') {
        this.roles = data.data
      }
    },
    async handleAllocRoles (item: any) {
      const { data } = await getRolesByUserId(item.id)
      this.userId = item.id
      if (data.code === '000000') {
        this.selectedRoles = data.data.map((item: any) => item.id)
      }
      this.dialogFormVisible = true
    },
    async handleChangeRoles () {
      const { data } = await allocUserRoles({
        userId: this.userId,
        roleIdList: this.selectedRoles
      })
      if (data.code === '000000') {
        this.$message.success('操作成功')
        this.dialogFormVisible = false
      } else {
        this.$message.error(data.mesg)
      }
    },
    handleClose () {
      this.userId = null
      this.selectedRoles = []
    }
  }
})
</script>

<style scoped lang="scss">
.box-card {
  text-align: left;
}
.dot {
  width: 14px;
  height: 14px;
  border-radius: 14px;
  cursor: pointer;
}
.red {
  background: red;
}
.green {
  background: green;
}
</style>
