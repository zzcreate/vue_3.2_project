<template>
  <!-- 卡片（容器） -->
  <el-card>
    <!-- layout布局  一行 里有 一列 和两个按钮 -->
    <!-- gutter是内部col的间距 -->
    <el-row
      :gutter="20"
      class="search"
    >
      <!-- span是col占据的宽度 占据7份 -->
      <el-col :span="7">
        <!-- 一个搜索框 -->
        <el-input
          :placeholder="$t('table.placeholder')"
          clearable
          v-model="queryForm.query"
        ></el-input>
      </el-col>
      <!-- 搜索按钮 -->
      <el-button
        type="primary"
        :icon="Search"
        @click="initUserList"
      >{{ $t('table.search') }}</el-button>
      <!-- 添加用户按钮 -->
      <!-- handleDialogValue和handleDialogValue() 没括号是属性（变量--》一个函数）；有括号是表达式 行内调用函数； 不带括号 函数有形参，会默认接收事件对象；这里带上括号 -- 不传参数 -->
      <el-button
        type="primary"
        @click="handleDialogValue()"
      >{{ $t('table.adduser') }}</el-button>
    </el-row>
    <!-- 表格 显示用户数据 -->
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <!-- 表列 根据options渲染表列 label是列标题 prop是列数据 -->
      <el-table-column
        v-for="(item, index) in options"
        :key="index"
        :prop="item.prop"
        :label="$t(`table.${item.label}`)"
        :width="item.width"
      >
        <template
          v-slot="{ row }"
          v-if="item.prop === 'mg_state'"
        >
          <el-switch
            v-model="row.mg_state"
            @change="handleStateChange(row)"
          />
        </template>
        <template
          v-slot="{ row }"
          v-else-if="item.prop === 'create_time'"
        >
          {{ $filters.dateFormat(row.create_time) }}
        </template>
        <template
          v-else-if="item.prop === 'action'"
          v-slot="{ row }"
        >
          <el-button
            type="primary"
            size="small"
            :icon="Edit"
            @click="handleDialogValue(row)"
          ></el-button>
          <el-button
            type="warning"
            size="small"
            :icon="Setting"
          ></el-button>
          <el-button
            type="danger"
            size="small"
            :icon="Delete"
            @click="deleteUser(row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="footer"
      v-model:currentPage="queryForm.pagenum"
      :page-size="queryForm.pagesize"
      :page-sizes="[2, 3, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <!-- 对话框 -->
  <Dialog
    v-model="dialogVisible"
    :dialogTitle="dialogTitle"
    :dialogFormValue="dialogFormValue"
    @refreshUserList="refreshUserList"
  />
</template>

<script setup>
import { Search, Edit, Setting, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { getUserListAPI, changeUserStateAPI, deleteUserAPI } from '@/api/users.js'
import { options } from './options'
import { useI18n } from 'vue-i18n'
import Dialog from './components/Dialog'
import { isNull } from '@/utils/filters'

const i18n = useI18n()

// 请求 获取用户列表 时 需要传递的参数 也绑定在表单上
const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize: 2
})

// 表格数据
const tableData = ref([])
// 总数据数
const total = ref(0)

// 对话框 是否显示 的状态
const dialogVisible = ref(false)
// 对话框标题
const dialogTitle = ref('')
// 对话框数据
const dialogFormValue = ref({})

// 初始化用户数据  发送请求 和保存数据
const initUserList = async () => {
  const res = await getUserListAPI(queryForm.value)
  // console.log('res', res)
  tableData.value = res.users
  total.value = res.total
}

initUserList()

// 每页数改变 重新请求数据 请求第一页的
const handleSizeChange = pageSize => {
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pageSize
  initUserList()
}
// 当前页改变 用新的页数 请求数据
const handleCurrentChange = pageNum => {
  queryForm.value.pagenum = pageNum
  initUserList()
}

// 更改状态
const handleStateChange = async info => {
  await changeUserStateAPI(info.id, info.mg_state)
  ElMessage({
    message: i18n.t('message.updeteSuccess'),
    type: 'success'
  })
}

// 点击按钮 修改状态 对话框弹出 判断处理添加用户or编辑用户
const handleDialogValue = (row) => {
  // console.log('row', row, isNull(row))
  if (isNull(row)) { // isNull 返回true 添加用户
    dialogTitle.value = i18n.t('dialog.addTitle')
    dialogFormValue.value = {}
  } else {
    dialogTitle.value = i18n.t('dialog.editTitle')
    dialogFormValue.value = JSON.parse(JSON.stringify(row))
  }
  dialogVisible.value = true
}

// 点击删除按钮 删除用户
const deleteUser = (id) => {
  ElMessageBox.confirm(
    i18n.t('delete.deleteText'),
    i18n.t('delete.deleteTitle'),
    {
      confirmButtonText: i18n.t('delete.confirm'),
      cancelButtonText: i18n.t('delete.cancel'),
      type: 'warning'
    }
  )
    .then(async () => {
      await deleteUserAPI(id)
      ElMessage({
        type: 'success',
        message: i18n.t('delete.message1')
      })
      initUserList()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: i18n.t('delete.message2')
      })
    })
}

// 监听子组件事件 重新加载用户列表
const refreshUserList = () => {
  queryForm.value.pagenum = 1
  initUserList()
  // queryForm.value.pagenum = Math.ceil(total.value / queryForm.value.pagesize)
}
</script>

<style>
.search {
  margin-bottom: 20px;
}

.footer {
  padding-top: 30px;
  justify-content: flex-end;
}
</style>
