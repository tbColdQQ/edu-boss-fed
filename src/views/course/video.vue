<template>
  <div class="course-video">
    <el-form label-width="80px">
      <el-form-item label="课程">
        <el-input v-model="courseName" disabled></el-input>
      </el-form-item>
      <el-form-item label="课时">
        <el-input v-model="theme" disabled></el-input>
      </el-form-item>
      <el-form-item label="视频上传">
        <input ref="video-file" type="file" />
      </el-form-item>
      <el-form-item label="封面上传">
        <input ref="image-file" type="file" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleUpload">开始上传</el-button>
        <el-button @click="onCancel">返回</el-button>
      </el-form-item>
      <el-form-item>
        <p>视频上传中: {{ uploadPercent }}%</p>
        <p v-if="isUploadSuccess">视频转码中: {{ isTransCodeSuccess ? '完成' : '正在处理，请稍后。。。'}}</p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getAliyunImageUploadAddressAndAuth,
  getAliyunVideoUploadAddressAndAuth,
  getAliyunTransCode,
  getAliyunTransCodePercent
} from '@/services/aliyun-upload'

export default Vue.extend({
  name: 'CourseVideo',
  data () {
    return {
      uploader: null,
      imageUrl: '',
      videoId: null,
      uploadPercent: 0,
      isUploadSuccess: false,
      isTransCodeSuccess: false,
      courseName: '',
      theme: ''
    }
  },
  computed: {
    video () {
      return this.$refs['video-file']
    },
    image () {
      return this.$refs['image-file']
    }
  },
  created () {
    this.courseName = this.$route.query.courseName as any
    this.theme = this.$route.query.theme as any
    this.initUploader()
  },
  methods: {
    initUploader () {
      this.uploader = new window.AliyunUpload.Vod({
        userId: '1618139964448548',
        region: '',
        partSize: 1048576,
        parallel: 5,
        retryCount: 3,
        retryDuration: 2,
        onUploadstarted: async (uploadInfo: any) => {
          console.log('onUploadstarted--->', uploadInfo)
          let uploadAddressAndAuth
          if (uploadInfo.isImage) {
            const { data } = await getAliyunImageUploadAddressAndAuth()
            if (data.code === '000000') {
              this.imageUrl = data.data.imageUrl
              uploadAddressAndAuth = data.data
            }
          } else {
            const { data } = await getAliyunVideoUploadAddressAndAuth({
              fileName: uploadInfo.file.name,
              imageUrl: this.imageUrl
            })
            if (data.code === '000000') {
              uploadAddressAndAuth = data.data
              this.videoId = uploadAddressAndAuth.videoId
            }
          }
          (this.uploader as any).setUploadAuthAndAddress(
            uploadInfo,
            uploadAddressAndAuth.uploadAuth,
            uploadAddressAndAuth.uploadAddress,
            uploadAddressAndAuth.imageId || uploadAddressAndAuth.videoId
          )
        },
        onUploadSucceed: (uploadInfo: any) => {
          console.log('onUploadSucceed--->', uploadInfo)
        },
        onUploadFailed: (uploadInfo: any, code: any, message: any) => {
          console.log('onUploadFailed--->', uploadInfo, code, message)
        },
        onUploadProgress: (uploadInfo: any, totalSize: number, loadedPercent: number) => {
          console.log('onUploadProgress--->', uploadInfo, totalSize, loadedPercent)
          if (!uploadInfo.isImage) {
            this.uploadPercent = Math.floor(loadedPercent * 100)
          }
        },
        onUploadTokenExpired: (uploadInfo: any) => {
          console.log('onUploadTokenExpired--->', uploadInfo)
        },
        onUploadEnd: async (uploadInfo: any) => {
          console.log('onUploadEnd--->', uploadInfo)
          this.isUploadSuccess = true
          const { data } = await getAliyunTransCode({
            lessonId: this.$route.query.lessonId,
            fileName: (this.video as any).files[0].name,
            fileId: this.videoId,
            coverImageUrl: this.imageUrl
          })
          console.log(data)
          const timer = setInterval(async () => {
            const { data } = await getAliyunTransCodePercent(this.$route.query.lessonId)
            console.log(data)
            if (data.data === 100) {
              this.isTransCodeSuccess = true
              console.log('转码成功')
              window.clearInterval(timer)
            }
          }, 3000)
        }
      })
    },
    handleUpload () {
      this.isUploadSuccess = false
      this.isTransCodeSuccess = false
      this.uploadPercent = 0
      const videoFile = (this.video as any).files[0]
      const imageFile = (this.image as any).files[0]
      const uploader = this.uploader as any
      uploader.addFile(imageFile, null, null, null, '{"Vod":{}}')
      uploader.addFile(videoFile, null, null, null, '{"Vod":{}}')
      uploader.startUpload()
    },
    onCancel () {
      this.$router.back()
    }
  }
})
</script>

<style scoped lang="scss">
.course-video {
  width: 40%;
  margin: 0 auto;
  text-align: left;
}
</style>
