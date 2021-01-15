<template>
  <div>
    <div class="card-head">
      <el-page-header @back="goBack" :content="course.courseName"></el-page-header>
      <el-button type="primary" icon="el-icon-plus" @click="handleCreate">添加阶段</el-button>
    </div>
    <el-tree
      style="margin-top: 20px;min-height: 80vh"
      :data="sections"
      :props="defaultProps"
      draggable
      :allow-drop="handleAllowDrop"
      @node-drop="handleSort"
    >
      <div slot-scope="{ node, data }" class="inner">
        <span>{{node.label}}</span>
        <span class="actions" v-if="data.sectionName">
          <el-button type="default" @click="() => handleSectionEdit(data.id)">编辑</el-button>
          <el-button type="primary" @click="() => handleCreateLession(data)">添加课时</el-button>
          <el-select v-model="data.status" @change="() => handleSectionChangeStatus(data)" style="width: 90px;margin-left: 10px">
            <el-option label="已隐藏" :value="0"></el-option>
            <el-option label="待更新" :value="1"></el-option>
            <el-option label="已更新" :value="2"></el-option>
          </el-select>
        </span>
        <span class="actions" v-else>
          <el-button type="default" @click="() => handleEditLession(data)">编辑</el-button>
          <el-button type="success">上传视频</el-button>
          <el-button type="default">状态</el-button>
        </span>
      </div>
    </el-tree>
    <el-dialog :title="isEdit ? '编辑课程' : '新建课程'" :visible.sync="dialogFormVisible">
      <create-or-edit-section v-if="dialogFormVisible" :section-id="sectionId" @success="onSuccess" :course-id="courseId" :is-edit="isEdit" :course-name="course.courseName" />
    </el-dialog>
    <el-dialog :title="isLessionEdit ? '编辑课时' : '新建课时'" :visible.sync="lessionVisible">
      <create-or-edit-lession v-if="lessionVisible" :section-id="sectionId" @success="onSuccess" :course-id="courseId" :is-edit="isLessionEdit" :section-name="sectionName" :course-name="course.courseName" :lession-id="lessionId" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEditSection from './components/CreateOrEditSection.vue'
import CreateOrEditLession from './components/CreateOrEditLession.vue'
import { getCourseById } from '@/services/course'
import { getSectionAndLesson, saveOrUpdateSection, saveOrUpdateLession, getLessionByLessionId } from '@/services/course-section'

export default Vue.extend({
  name: 'SectionIndex',
  components: {
    CreateOrEditSection,
    CreateOrEditLession
  },
  props: {
    courseId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      isEdit: false,
      dialogFormVisible: false,
      isLessionEdit: false,
      lessionVisible: false,
      course: {
        courseName: ''
      },
      defaultProps: {
        children: 'lessonDTOS',
        label: (data: any) => {
          return data.sectionName || data.theme
        }
      },
      sections: [],
      sectionId: null,
      sectionName: '',
      lessionId: null
    }
  },
  created () {
    this.loadCourse()
    this.loadSections()
  },
  methods: {
    async loadCourse () {
      const { data } = await getCourseById(this.courseId)
      if (data.code === '000000') {
        this.course = data.data
      }
    },
    async loadSections () {
      const { data } = await getSectionAndLesson(this.courseId)
      console.log(data)
      if (data.code === '000000') {
        this.sections = data.data
      }
    },
    goBack () {
      this.$router.back()
    },
    handleNodeClick (data: any) {
      console.log(data)
    },
    handleAllowDrop (draggingNode: any, dropNode: any, type: any) {
      return draggingNode.data.sectionId === dropNode.data.sectionId && type !== 'inner'
    },
    async handleSort (dragNode: any, dropNode: any, type: any, event: any) {
      try {
        await Promise.all(dropNode.parent.childNodes.map((item: any, index: number) => {
          if (dragNode.data.lessonDTOS) {
            return saveOrUpdateSection({
              id: item.data.id,
              orderNum: index + 1
            })
          } else {
            return saveOrUpdateLession({
              id: item.data.id,
              orderNum: index + 1
            })
          }
        }))
        this.$message.success('排序成功')
      } catch (err) {
        this.$message.error('排序失败')
      }
    },
    handleCreate () {
      this.dialogFormVisible = true
      this.isEdit = false
    },
    handleSectionEdit (sectionId: string | number) {
      this.dialogFormVisible = true
      this.isEdit = true
      this.sectionId = sectionId as any
    },
    onSuccess () {
      this.dialogFormVisible = false
      this.lessionVisible = false
      this.loadSections()
      this.sectionId = null
      this.lessionId = null
      this.sectionName = ''
    },
    async handleSectionChangeStatus (item: any) {
      const { data } = await saveOrUpdateSection({
        id: item.id,
        status: item.status
      })
      if (data.code === '000000') {
        this.$message.success('状态修改成功')
      } else {
        this.$message.error('状态修改失败')
      }
      this.loadSections()
    },
    handleCreateLession (section: any) {
      this.sectionId = section.id
      this.lessionVisible = true
      this.isLessionEdit = false
    },
    handleEditLession (lession: any) {
      this.sectionId = lession.sectionId
      this.sectionName = (this.sections.filter((item: any) => item.id === lession.sectionId)[0] as any).sectionName
      this.lessionId = lession.id
      this.lessionVisible = true
      this.isLessionEdit = true
    }
  }
})
</script>

<style scoped lang="scss">
.card-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
::v-deep .el-tree-node__content {
  height: auto;
}
.inner {
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ebeef5;
}
</style>
