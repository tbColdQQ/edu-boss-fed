<template>
  <div>
    <el-form :model="section" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="课程名称" prop="courseName">
        <el-input v-model="section.courseName" disabled></el-input>
      </el-form-item>
      <el-form-item label="章节名称" prop="sectionName">
        <el-input v-model="section.sectionName"></el-input>
      </el-form-item>
      <el-form-item label="章节描述">
        <el-input type="textarea" v-model="section.description"></el-input>
      </el-form-item>
      <el-form-item label="章节排序">
        <el-input type="number" v-model="section.orderNum">
          <template slot="append">数字控制排序，数字越大越靠后</template>
        </el-input>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveOrUpdateSection, getSectionBySectionId } from '@/services/course-section'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'CreateOrEditSection',
  props: {
    isEdit: {
      type: Boolean,
      required: true
    },
    sectionId: {
      type: [String, Number]
    },
    courseId: {
      type: [String, Number],
      required: true
    },
    courseName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      rules: {
        courseName: [
          {
            required: true
          }
        ],
        sectionName: [
          {
            required: true,
            message: '请填写章节名称',
            trigger: 'blur'
          }
        ]
      },
      section: {
        courseId: this.courseId,
        courseName: this.courseName,
        sectionName: '',
        description: '',
        orderNum: 0,
        status: 0
      }
    }
  },
  created () {
    if (this.isEdit) {
      this.loadSection()
    }
  },
  methods: {
    async loadSection () {
      const { data } = await getSectionBySectionId(this.sectionId)
      if (data.code === '000000') {
        this.section = data.data
        this.section.courseName = this.courseName
      }
    },
    onCancel () {
      this.$emit('success')
    },
    onSubmit () {
      (this.$refs.form as Form).validate(async (valid: boolean) => {
        if (valid) {
          const { data } = await saveOrUpdateSection(this.section)
          if (data.code === '000000') {
            this.$message.success('操作成功')
            this.$emit('success')
          } else {
            this.$message.error(data.mesg)
          }
        } else {
          this.$message.error('表单验证失败')
        }
      })
    }
  }
})
</script>

<style scoped lang="scss">

</style>
