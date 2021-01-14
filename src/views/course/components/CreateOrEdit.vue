<template>
  <div class="course-edit">
    <el-page-header @back="goBack" :content="isEdit ? '编辑课程' : '新增课程'">
    </el-page-header>
    <el-card style="margin-top: 10px">
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
            <course-image v-model="course.courseListImg" />
          </el-form-item>
          <el-form-item label="介绍封面">
            <course-image v-model="course.courseImgUrl" />
          </el-form-item>
        </div>
        <div v-show="activeStep === 2">
          <el-form-item label="售卖价格">
            <el-input type="number" placeholder="" v-model="course.discounts">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input type="number" placeholder="" v-model="course.price">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input type="number" placeholder="" v-model="course.sales">
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
              v-model="course.activityCourse"
              active-color="#13ce66"
              inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <template v-if="course.activityCourse">
            <el-form-item label="开始时间" label-width="100px">
              <el-date-picker
                v-model="course.activityCourseDTO.beginTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" label-width="100px">
              <el-date-picker
                v-model="course.activityCourseDTO.endTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价" label-width="100px">
              <el-input type="number" placeholder="" v-model="course.activityCourseDTO.amount">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存" label-width="100px">
              <el-input type="number" placeholder="" v-model="course.activityCourseDTO.stock">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </template>
        </div>
        <div v-show="activeStep === 4">
          <el-form-item label="课程详情">
            <text-editor v-model="course.courseDescriptionMarkDown" />
          </el-form-item>
          <el-form-item label="是否发布">
            <el-switch
              v-model="course.status"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSave">保存</el-button>
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
import { saveOrUpdate, getCourseById } from '@/services/course'
import CourseImage from './CourseImage.vue'
import TextEditor from '@/components/TextEditor/index.vue'

export default Vue.extend({
  name: 'CourseCreateOrEdit',
  components: {
    CourseImage,
    TextEditor
  },
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
        courseName: '',
        brief: '',
        teacherDTO: {
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
      this.getCourseDetail()
    }
  },
  methods: {
    async getCourseDetail () {
      const { data } = await getCourseById(this.$route.params.id)
      if (data.code === '000000') {
        if (!data.data.activityCourseDTO) {
          data.data.activityCourseDTO = {
            beginTime: '',
            endTime: '',
            amount: 0,
            stock: 0
          }
        }
        this.course = data.data
      }
    },
    goBack () {
      this.$router.back()
    },
    async handleSave () {
      const { data } = await saveOrUpdate(this.course)
      if (data.code === '000000') {
        this.$message.success('操作成功')
        this.$router.back()
      } else {
        this.$message.error(data.mesg)
      }
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
</style>
