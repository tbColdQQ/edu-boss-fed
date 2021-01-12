<template>
  <div class="advert-space-create">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        {{ isEdit ? '编辑广告位' : '添加广告位' }}
      </div>
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="广告位名称" prop="name">
          <el-input focus v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button v-if="!isEdit" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getSpaceById, spaceSaveOrUpdate } from '@/services/advert'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'AdvertSpaceCreateOrEdit',
  data () {
    return {
      form: {
        name: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入广告位名称',
            trigger: 'blur'
          }
        ]
      },
      isEdit: false
    }
  },
  created () {
    if (this.$route.params.id) {
      this.isEdit = true
    }
    this.loadAdvertSpaceInfo()
  },
  methods: {
    async loadAdvertSpaceInfo () {
      const { data } = await getSpaceById(this.$route.params.id || -1)
      if (data.state === 1) {
        if (data.content) {
          this.form = data.content
        }
      }
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
    },
    onSubmit () {
      (this.$refs.form as Form).validate(async (valid: any) => {
        if (valid) {
          const { data } = await spaceSaveOrUpdate(this.form)
          if (data.state === 1) {
            this.$message.success('提交成功')
            this.$router.back()
          }
        } else {
          this.$message.error('表单校验失败')
          return false
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.advert-space-create {
  text-align: left;
}
.box-card {
  padding: 0 20% 0 5%;
}

</style>
