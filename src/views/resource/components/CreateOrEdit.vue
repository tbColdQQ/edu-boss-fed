<template>
  <div>
    <el-form :model="form">
      <el-form-item label="资源名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="资源路径" :label-width="formLabelWidth">
        <el-input v-model="form.url" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="资源分类" :label-width="formLabelWidth">
        <el-select v-model="form.categoryId" placeholder="请选择资源分类" clearable="">
          <el-option
            v-for="item in categories"
            :label="item.name"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
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
import { getResourceDetail, saveOrUpdate } from '@/services/resource'

export default Vue.extend({
  name: 'ResourceCreateOrEdit',
  props: {
    categories: {
      type: Array
    },
    isEdit: {
      type: Boolean,
      required: true
    },
    resourceId: {
      type: Number
    }
  },
  data () {
    return {
      form: {
        name: '',
        url: '',
        description: '',
        categoryId: null
      },
      formLabelWidth: '120px'
    }
  },
  async created () {
    if (this.resourceId) {
      const { data } = await getResourceDetail(this.resourceId)
      if (data.code === '000000') {
        this.form = data.data
      } else {
        this.$message.error('资源信息不存在')
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
