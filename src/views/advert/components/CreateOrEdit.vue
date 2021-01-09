<template>
  <div class="advert-create">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        {{ isEdit ? '编辑广告' : '添加广告' }}
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="广告名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="广告位置">
          <el-select v-model="form.spaceId" placeholder="请选择广告位置">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in parentMenuList"
              :key="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上线/下线">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="广告图片">
          <el-upload
            action="#"
            multiple="false"
            limit="1"
            list-type="picture-card"
            :auto-upload="false">
              <el-button type="primary" size="small">点击上传</el-button>
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="form.img" alt=""
                >
                <span class="el-upload-list__item-actions">
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
          </el-upload>
          <el-tag type="info" style="margin-top: 20px">建议尺寸：230*300px，JPG、PNG格式，图片小于150K</el-tag>
        </el-form-item>
        <el-form-item label="广告链接">
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <el-form-item label="广告备注">
          <el-input type="textarea" v-model="form.text"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button v-if="!isEdit">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createOrUpdateMenu, getEditMenuInfo } from '@/services/menu'

export default Vue.extend({
  name: 'CreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        spaceId: -1,
        name: '',
        link: '',
        img: '',
        text: 0,
        startTime: '',
        endTime: '',
        status: false
      },
      parentMenuList: []
    }
  },
  created () {
    this.loadMenuInfo()
  },
  methods: {
    async loadMenuInfo () {
      const { data } = await getEditMenuInfo(this.$route.params.id || -1)
      if (data.code === '000000') {
        if (data.data.menuInfo) {
          this.form = data.data.menuInfo
        }
        this.parentMenuList = data.data.parentMenuList
      }
    },
    async onSubmit () {
      const { data } = await createOrUpdateMenu(this.form)
      if (data.code === '000000') {
        this.$message.success('提交成功')
        this.$router.back()
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.advert-create {
  text-align: left;
  .box-card {
    padding: 0 20% 0 5%;
  }
}
</style>
