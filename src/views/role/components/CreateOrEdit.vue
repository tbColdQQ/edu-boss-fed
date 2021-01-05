<template>
  <div>
    <el-form :model="form">
      <el-form-item label="角色名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色编码" :label-width="formLabelWidth">
        <el-input v-model="form.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.description" autocomplete="off"></el-input>
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
import { getRoleDetail, saveOrUpdate } from '@/services/role'

export default Vue.extend({
  name: 'RoleCreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      required: true
    },
    roleId: {
      type: Number || String
    }
  },
  data () {
    return {
      form: {
        name: '',
        code: '',
        description: ''
      },
      formLabelWidth: '120px'
    }
  },
  async created () {
    if (this.roleId) {
      const { data } = await getRoleDetail(this.roleId)
      if (data.code === '000000') {
        this.form = data.data
      } else {
        this.$message.error('角色信息不存在')
      }
    }
  },
  methods: {
    async onSubmit () {
      const { data } = await saveOrUpdate(this.form)
      if (data.code === '000000') {
        this.$message.success('操作成功')
        this.$emit('success')
      } else {
        this.$message.error(data.mesg)
      }
    },
    onCancel () {
      this.$emit('success')
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
