<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
          <el-form-item prop="courseName" label="课程名称">
            <el-input v-model="form.courseName" placeholder="请输入课程名称"></el-input>
          </el-form-item>
          <el-form-item prop="status" label="状态">
            <el-select v-model="form.status">
              <el-option label="全部" value=""></el-option>
              <el-option label="上架" value="1"></el-option>
              <el-option label="下架" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询</el-button>
          </el-form-item>
        </el-form>
        <el-button icon="el-icon-plus" type="primary" style="height: 40px" @click="$router.push({name: 'course-create'})">
          新建课程
        </el-button>
      </div>
      <el-table border v-loading="isLoading" :data="courses" style="width: 100%;margin-bottom: 20px;margin-top: 20px;">
        <el-table-column prop="id" label="ID" width="150"></el-table-column>
        <el-table-column prop="courseName" label="课程名称"></el-table-column>
        <el-table-column prop="price" label="价格">
          <template slot-scope="scope">
            ¥ {{scope.row.price}}
          </template>
        </el-table-column>
        <el-table-column prop="sortNum" label="排序"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <i class="status"
              :title="scope.row.status===1 ? '上架' : '下架'"
              :class="scope.row.status===0 ? 'status-success' : 'status-danger'">
            </i>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 1"
              size="mini"
              type="danger"
              @click="handleStatus(scope.row)">下架</el-button>
            <el-button
              v-else
              size="mini"
              type="primary"
              @click="handleStatus(scope.row)">上架</el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              @click="handleManagerContent(scope.row)">内容管理</el-button>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getQueryCourses, changeState } from '@/services/course'

export default Vue.extend({
  name: 'CourseList',
  data () {
    return {
      form: {
        courseName: '',
        status: '',
        currentPage: 1,
        pageSize: 10
      },
      total: 0,
      courses: [],
      isLoading: false
    }
  },
  created () {
    this.loadData(this.form)
  },
  methods: {
    async loadData (params: any) {
      const { data } = await getQueryCourses(params)
      console.log(data)
      if (data.code === '000000') {
        this.courses = data.data.records
        this.total = data.data.total
      }
    },
    onSubmit () {
      this.form.currentPage = 1
      this.loadData(this.form)
    },
    handleSizeChange (val: number) {
      this.form.pageSize = val
      this.form.currentPage = 1
      this.loadData(this.form)
    },
    handleCurrentChange (val: number) {
      this.form.currentPage = val
      this.loadData(this.form)
    },
    async handleStatus (item: any) {
      console.log('handleStatus')
      if (item.status === 1) {
        const { data } = await changeState({
          courseId: item.id,
          status: 0
        })
        if (data.code === '000000') {
          item.status = 0
        }
      } else {
        const { data } = await changeState({
          courseId: item.id,
          status: 1
        })
        if (data.code === '000000') {
          item.status = 1
        }
      }
    },
    handleEdit (item: any) {
      this.$router.push({
        name: 'course-edit',
        params: {
          id: item.id
        }
      })
    }
  }
})
</script>

<style scoped lang="scss">
.clearfix {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
