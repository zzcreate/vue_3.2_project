<template>
  <!-- 对话框 在组件上使用v-mode 子组件不是输入类型  用自定义发射事件和model-value绑定属性（v-model 是v-bind:value @input更新value，value属性和input事件 是使用在输入框上，非输入框用model-value作为属性绑定，用update:modelValue 发射事件 -->
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="40%"
    @close="handleClose"
  >
    <!-- 表单 -->
    <el-form
      :model="form"
      label-width="100px"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item
        :label="$t('dialog.username')"
        prop='username'
      >
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item
        :label="$t('dialog.password')"
        prop="password"
        v-if="dialogTitle === $t('dialog.addTitle')"
      >
        <el-input
          v-model="form.password"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item
        :label="$t('dialog.email')"
        prop="email"
      >
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item
        :label="$t('dialog.mobile')"
        prop="mobile"
      >
        <el-input v-model="form.mobile" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="handleClose">{{ $t('dialog.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
        >{{ $t('dialog.confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, defineProps, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { addUserAPI, editUserAPI } from '@/api/users'
import { ElMessage } from 'element-plus'

const i18n = useI18n()

// 定义props
const props = defineProps({
  dialogVisible: Boolean,
  dialogTitle: {
    type: String,
    required: true
  },
  dialogFormValue: {
    type: Object,
    default: () => { }
  }
})
// 发射事件
const emits = defineEmits(['update:modelValue', 'refreshUserList'])

// 对话框数据
const form = ref({
  username: '',
  password: '',
  email: '',
  mobile: ''
})
// 表单引用
const formRef = ref(null)

// 表单校验规则
const rules = ref({
  username: [
    { required: true, message: i18n.t('dialog.usernameText1'), trigger: 'blur' },
    { min: 3, max: 11, message: i18n.t('dialog.usernameText2'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: i18n.t('dialog.passwordText1'), trigger: 'blur' },
    { min: 6, max: 18, message: i18n.t('dialog.passwordText2'), trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: i18n.t('dialog.emailText'), trigger: ['blur', 'change'] }
  ],
  mobile: [
    { pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/, message: i18n.t('dialog.mobileText'), trigger: 'blur' }
  ]
})

// 关闭对话框 清空数据
const handleClose = () => {
  emits('update:modelValue', false)
  formRef.value.resetFields()
}

// 将父组件传递来的数据给对话框表单
watch(() => props.dialogFormValue, () => {
  // console.log(props.dialogFormValue, 1111)
  form.value = props.dialogFormValue
}, { deep: true, immediate: true })

// 确定按钮 验证   处理添加或者编辑用户
const handleConfirm = () => {
  formRef.value.validate(async valid => {
    if (valid) {
      if (props.dialogTitle === i18n.t('dialog.addTitle')) {
        await addUserAPI(form.value)
        ElMessage({
          message: i18n.t('message.addSuccess'),
          type: 'success'
        })
      } else {
        await await editUserAPI(form.value)
        ElMessage({
          message: i18n.t('message.updeteSuccess'),
          type: 'success'
        })
      }
      emits('refreshUserList')
      formRef.value.resetFields()
      handleClose()
    } else {
      return false
    }
  })
}
</script>
