<template>
  <div class="advert-create">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        {{ isEdit ? '编辑广告' : '添加广告' }}
      </div>
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="广告名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="广告位置" prop="spaceId">
          <el-select v-model="form.spaceId" placeholder="请选择广告位置">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in spaceList"
              :key="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上线/下线" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="广告图片" prop="img">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :before-upload="handleBeforeUpload"
            :http-request="handleUpload">
              <img v-if="form.img"
                class="avatar"
                :src="form.img"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-tag type="info">建议尺寸：230*300px，JPG、PNG格式，图片小于150K</el-tag>
        </el-form-item>
        <el-form-item label="广告链接" prop="link">
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <el-form-item label="广告备注" prop="text">
          <el-input type="textarea" v-model="form.text"></el-input>
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
import { getAllSpaces, saveOrUpdate, getAdById, getAdList } from '@/services/advert'
import { uploadImg } from '@/services/upload'
import { Form } from 'element-ui'
import moment from 'moment'

export default Vue.extend({
  name: 'AdvertCreateOrEdit',
  data () {
    return {
      form: {
        spaceId: -1,
        name: '',
        link: '',
        img: '',
        text: '',
        startTime: '',
        endTime: '',
        status: false,
        startTimeFormatString: '',
        endTimeFormatString: '',
        priority: 1,
        htmlContent: null,
        keyword: null
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入广告名称',
            trigger: 'blur'
          }
        ],
        startTime: [
          {
            required: true,
            message: '请选择开始时间',
            trigger: 'blur'
          }
        ],
        endTime: [
          {
            required: true,
            message: '请选择结束时间',
            trigger: 'blur'
          }
        ],
        link: [
          {
            required: true,
            message: '请输入广告链接',
            trigger: 'blur'
          }
        ]
      },
      spaceList: [],
      isEdit: false
    }
  },
  created () {
    if (this.$route.params.id) {
      this.isEdit = true
    }
    this.loadAdvertInfo()
    this.loadAllSapces()
  },
  methods: {
    async loadAdvertInfo () {
      const { data } = await getAdById(this.$route.params.id || -1)
      if (data.state === 1) {
        if (data.content) {
          this.form = data.content
        }
      }
    },
    async loadAllSapces () {
      const { data } = await getAllSpaces()
      if (data.state === 1) {
        this.spaceList = data.content
      }
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
    },
    handleBeforeUpload (file: any) {
      const isJPG = file.type === 'image/jpeg'
      const isLtm = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传的图片只能是 JPG 格式！')
      }
      if (!isLtm) {
        this.$message.error('上传的图片大小不能超过 2MB！')
      }
      return isJPG && isLtm
    },
    async handleUpload (options: any) {
      const fd = new FormData()
      fd.append('file', options.file)
      const { data } = await uploadImg(fd)
      if (data.state === 1) {
        this.form.img = data.content.name
      }
    },
    onSubmit () {
      (this.$refs.form as Form).validate(async (valid: any) => {
        if (valid) {
          this.form.startTimeFormatString = moment(this.form.startTime).format('YYYY-MM-DD hh:mm:ss')
          this.form.endTimeFormatString = moment(this.form.startTime).format('YYYY-MM-DD hh:mm:ss')
          const { data } = await saveOrUpdate(this.form)
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
.advert-create {
  text-align: left;
}
.box-card {
  padding: 0 20% 0 5%;
}
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
