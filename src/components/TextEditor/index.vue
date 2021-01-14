<template>
  <div ref="editor"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import { uploadImg } from '@/services/course'
import E from 'wangeditor'

export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.initEditor()
  },
  methods: {
    initEditor () {
      const editor = new E(this.$refs.editor as any)
      editor.config.onchange = (value: string) => {
        this.$emit('input', value)
      }
      editor.create()
      setTimeout(() => {
        editor.txt.html(this.value)
      }, 500)

      editor.config.customUploadImg = async (resultFiles: any, insertImgFn: any) => {
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await uploadImg(fd)
        if (data.code === '000000') {
          insertImgFn(data.data.name)
        }
      }
    }
  }
})
</script>

<style scoped lang="scss">

</style>
