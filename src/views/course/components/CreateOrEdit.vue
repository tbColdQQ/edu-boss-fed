<template>
  <div class="course-edit">
    <el-page-header @back="goBack" :content="isEdit ? '编辑课程' : '新增课程'">
    </el-page-header>
    <el-card>
      <div slot="header" class="clearfix">
        <el-steps :active="activeStep" simple>
          <el-step
            :icon="item.icon"
            :title="item.title"
            :key="index"
            v-for="(item, index) in steps"
            @click.native="activeStep = index"
          ></el-step>
        </el-steps>
      </div>
      <el-form label-width="80px">
        <div v-show="activeStep === 0">
          <el-form-item label="课程名称">
            <el-input placeholder="" v-model="course.courseName"></el-input>
          </el-form-item>
          <el-form-item label="课程简介">
            <el-input placeholder="" v-model="course.brief"></el-input>
          </el-form-item>
          <el-form-item label="课程概述">
            <el-input type="textarea" style="margin-bottom: 10px" placeholder="概述1" v-model="course.previewFirstField"></el-input>
            <el-input type="textarea" placeholder="概述2" v-model="course.previewSecondField"></el-input>
          </el-form-item>
          <el-form-item label="讲师姓名">
            <el-input placeholder="" v-model="course.teacherDTO.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="讲师简介">
            <el-input placeholder="" v-model="course.teacherDTO.description"></el-input>
          </el-form-item>
          <el-form-item label="课程排序">
            <el-input-number label="label" v-model="course.sortNum"></el-input-number>
          </el-form-item>
        </div>
        <div v-show="activeStep === 1">
          <el-form-item label="课程封面">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="解锁封面">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </div>
        <div v-show="activeStep === 2">
          <el-form-item label="售卖价格">
            <el-input placeholder="" v-model="course.discounts">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input placeholder="" v-model="course.price">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量" v-model="course.sales">
            <el-input placeholder="">
              <template slot="append">单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input
              type="text"
              placeholder=""
              maxlength="4"
              show-word-limit
              v-model="course.discountsTag"
            >
            </el-input>
          </el-form-item>
        </div>
        <div v-show="activeStep === 3">
          <el-form-item label="现时秒杀开关" label-width="100px">
            <el-switch
              v-model="isSeckill"
              active-color="#13ce66"
              inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <template v-if="isSeckill">
            <el-form-item label="开始时间" label-width="100px">
              <el-date-picker
                v-model="course.beginTime"
                type="datetime"
                placeholder="">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" label-width="100px">
              <el-date-picker
                v-model="course.endTime"
                type="datetime"
                placeholder="">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价" label-width="100px">
              <el-input placeholder="" v-model="course.amount">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存" label-width="100px">
              <el-input placeholder="" v-model="course.stock">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </template>
        </div>
        <div v-show="activeStep === 4">
          <el-form-item label="课程详情">
            <el-input type="textarea" v-model="course.courseDescriptionMarkDown" placeholder=""></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">保存</el-button>
          </el-form-item>
        </div>
        <el-form-item v-if="activeStep >= 0 && activeStep < 4">
          <el-button @click="activeStep++">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveOrUpdate, getCourseById, uploadImg } from '@/services/course'

export default Vue.extend({
  name: 'CourseCreateOrEdit',
  data () {
    return {
      isEdit: false,
      activeStep: 0,
      imageUrl: '',
      isSeckill: false,
      steps: [
        {
          title: '基本信息',
          icon: 'el-icon-edit'
        },
        {
          title: '课程封面',
          icon: 'el-icon-edit'
        },
        {
          title: '销售信息',
          icon: 'el-icon-edit'
        },
        {
          title: '秒杀活动',
          icon: 'el-icon-edit'
        },
        {
          title: '课程详情',
          icon: 'el-icon-edit'
        }
      ],
      course: {
        id: 0,
        courseName: '',
        brief: '',
        teacherDTO: {
          id: 0,
          courseId: 0,
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: 0,
        discounts: 0,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: 0,
        previewFirstField: '',
        previewSecondField: '',
        status: 0,
        sales: 0,
        activityCourse: true,
        activityCourseDTO: {
          id: 0,
          courseId: 0,
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        autoOnlineTime: ''
      }
    }
  },
  created () {
    if (this.$route.params.id) {
      this.isEdit = true
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    handleAvatarSuccess (res: any, file: any) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file: any) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
})
</script>

<style scoped lang="scss">
.course-edit {
  text-align: left;
}
.el-step {
  cursor: pointer;
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
