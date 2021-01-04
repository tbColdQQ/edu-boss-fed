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
        <el-input type="textarea" v-model="form.descriptioin" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button v-if="!isEdit">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

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
  created () {
    console.log('created')
  },
  methods: {
    onSubmit () {
      console.log('onSubmit')
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
