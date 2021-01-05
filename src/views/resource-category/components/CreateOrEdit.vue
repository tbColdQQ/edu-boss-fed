<template>
  <div>
    <el-form :model="category">
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="category.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth">
        <el-input v-model="category.sort" autocomplete="off"></el-input>
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
import { saveOrUpdate } from '@/services/resource-category'

export default Vue.extend({
  name: 'ResourceCategoryCreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      required: true
    },
    category: {
      type: Object
    }
  },
  data () {
    return {
      formLabelWidth: '120px'
    }
  },
  methods: {
    async onSubmit () {
      const { data } = await saveOrUpdate(this.category)
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
