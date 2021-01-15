<template>
  <div class="lession">
    <el-form :model="lession" :rules="rules" ref="form" label-width="120px">
      <el-form-item label="课程名称" prop="courseName">
        <el-input v-model="lession.courseName" disabled></el-input>
      </el-form-item>
      <el-form-item label="章节名称" prop="sectionName">
        <el-input v-model="lession.sectionName" disabled></el-input>
      </el-form-item>
      <el-form-item label="课时名称" prop="theme">
        <el-input v-model="lession.theme"></el-input>
      </el-form-item>
      <el-form-item label="时长" prop="duration">
        <el-input type="number" v-model="lession.duration">
          <template slot="append">分钟</template>
        </el-input>
      </el-form-item>
      <el-form-item label="是否开放试听" prop="isFree">
        <el-switch
          v-model="lession.isFree"
          :active-value="true"
          :inactive-value="false"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="章节排序">
        <el-input type="number" v-model="lession.orderNum">
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
import { Form } from 'element-ui'
import Vue from 'vue'
import { getLessionByLessionId, saveOrUpdateLession } from '@/services/course-section'

export default Vue.extend({
  name: 'CreateOrEditLession',
  props: {
    isEdit: {
      type: Boolean,
      required: true
    },
    sectionId: {
      type: [String, Number],
      required: true
    },
    courseId: {
      type: [String, Number],
      required: true
    },
    courseName: {
      type: String,
      required: true
    },
    sectionName: {
      type: String,
      required: true
    },
    lessionId: {
      type: [String, Number]
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
            required: true
          }
        ],
        theme: [
          {
            required: true,
            message: '请填写课时名称',
            trigger: 'blur'
          }
        ],
        duration: [
          {
            required: true,
            message: '请填写课时时长',
            trigger: 'blur'
          }
        ],
        isFree: [
          {
            required: true
          }
        ]
      },
      lession: {
        courseId: this.courseId,
        courseName: this.courseName,
        sectionName: '',
        sectionId: this.sectionId,
        isFree: true,
        duration: 0,
        orderNum: 0,
        status: 0
      }
    }
  },
  created () {
    if (this.isEdit) {
      this.loadLession()
    }
  },
  methods: {
    async loadLession () {
      const { data } = await getLessionByLessionId(this.lessionId)
      if (data.code === '000000') {
        this.lession = data.data
        this.lession.sectionName = this.sectionName
        this.lession.courseName = this.courseName
      }
    },
    onCancel () {
      this.$emit('success')
    },
    onSubmit () {
      (this.$refs.form as Form).validate(async (valid: boolean) => {
        if (valid) {
          this.lession.duration = Number(this.lession.duration)
          const { data } = await saveOrUpdateLession(this.lession)
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
.lession {
  text-align: left;
}
</style>
