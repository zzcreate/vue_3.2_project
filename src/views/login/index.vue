<template>
  <div class="login-container">
    <!-- 登录表单 -->
    <el-form
      ref="loginForm"
      :model="form"
      class="login-form"
      :rules="loginFormRules"
    >
      <!-- 表单标题 -->
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
      </div>
      <!-- 表单项 -->
      <el-form-item prop="username">
        <svg-icon
          icon="user"
          class="svg-container"
        />
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item prop="password">
        <svg-icon
          icon="password"
          class="svg-container"
        />
        <el-input v-model="form.password" />
      </el-form-item>
      <!-- 登录按钮 -->
      <el-button
        type="primary"
        class="login-button"
        @click="handleLogin"
      >{{ $t('login.btnTitle') }}</el-button>
    </el-form>
  </div>
</template>

<script setup>
// import router from '@/router'
import { ref } from 'vue'
// import { loginAPI } from '@/api/index'
import { useStore } from 'vuex'

const store = useStore()

// 表单绑定的数据对象
const form = ref({
  username: 'admin',
  password: '123456'
})

// 表单验证规则
const loginFormRules = ref({
  username: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 11, message: 'Length should be 3 to 11', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 6, max: 18, message: 'Length should be 6 to 18', trigger: 'blur' }
  ]
})

// 表单引用
const loginForm = ref(null)
// 点击登录按钮
const handleLogin = () => {
  loginForm.value.validate(async valid => {
    if (valid) {
      // const data = await loginAPI(form.value)
      // console.log(data)
      // router.replace('/')
      // console.log(store)
      // 派发vuex actions
      store.dispatch('app/login', form.value)
    } else {
      return false
    }
  })
}

</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }

    ::v-deep .el-input__wrapper {
      width: 100%;
      background-color: transparent;
      padding: 0;
      box-shadow: none;
    }

    .login-button {
      width: 100%;
      box-sizing: border-box;
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    // position: absolute;
    // right: 10px;
    // top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
