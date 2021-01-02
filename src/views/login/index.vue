<template>
  <div class="login">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="login-form" label-position="top">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" class="login-btn" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/services/user'
export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111'
      },
      loading: false,
      rules: {
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 18,
            message: '长度在6-18表字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate()
        this.loading = true
        const { data } = await login(this.form)
        if (data.state !== 1) {
          this.loading = false
          return this.$message.error(data.message)
        }
        this.loading = false
        this.$store.commit('setUser', data.content)
        this.$router.push(this.$route.query.redirect as string || '/')
        // this.$router.push({
        //   name: 'home'
        // })
        this.$message.success('登录成功')
        this.loading = false
      } catch (err) {
        console.log('登录失败', err)
        this.$message.error('登录失败')
        this.loading = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.el-form {
  text-align: left;
}
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  width: 300px;
  background: white;
  padding: 20px;
  border-radius: 5px;
}
.login-btn {
  width: 100%;
}
</style>
