<template>
  <Dialog title="API密钥管理" v-model="dialogVisible" width="1000px">
    <div class="mb-4">
      <el-button type="primary" @click="handleCreate">
        <Icon icon="ep:plus" />
        新增API密钥
      </el-button>
    </div>

    <el-table v-loading="loading" :data="list" stripe>
      <el-table-column label="配置名称" prop="remark" min-width="150" />
      <el-table-column label="API密钥" prop="appKey" min-width="300" show-overflow-tooltip>
        <template #default="scope">
          <div class="flex items-center">
            <span v-if="!scope.row.showKey" class="text-gray-400">••••••••••••••••</span>
            <span v-else class="font-mono text-xs break-all max-w-full" style="word-break: break-all; white-space: normal;">{{ scope.row.appKey }}</span>
            <el-button 
              type="text" 
              size="small" 
              @click="toggleKeyVisibility(scope.row)"
              class="ml-2"
            >
              <Icon :icon="scope.row.showKey ? 'ep:hide' : 'ep:view'" />
            </el-button>
            <el-button 
              type="text" 
              size="small" 
              @click="copyToClipboard(scope.row.appKey)"
              class="ml-1"
            >
              <Icon icon="ep:copy-document" />
            </el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Secret密钥" prop="appSecret" min-width="350" show-overflow-tooltip>
        <template #default="scope">
          <div class="flex items-center">
            <span v-if="!scope.row.showSecret" class="text-gray-400">••••••••••••••••</span>
            <span v-else class="font-mono text-xs break-all max-w-full" style="word-break: break-all; white-space: normal;">{{ scope.row.appSecret }}</span>
            <el-button 
              type="text" 
              size="small" 
              @click="toggleSecretVisibility(scope.row)"
              class="ml-2"
            >
              <Icon :icon="scope.row.showSecret ? 'ep:hide' : 'ep:view'" />
            </el-button>
            <el-button 
              type="text" 
              size="small" 
              @click="copyToClipboard(scope.row.appSecret)"
              class="ml-1"
            >
              <Icon icon="ep:copy-document" />
            </el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" width="100">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.COMMON_STATUS" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" width="180" :formatter="dateFormatter" />
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="scope">
          <el-button 
            type="primary" 
            link 
            @click="handleUpdate(scope.row)"
          >
            编辑
          </el-button>
          <el-button 
            type="warning" 
            link 
            @click="handleRegenerate(scope.row)"
          >
            重新生成
          </el-button>
          <el-button 
            type="danger" 
            link 
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑对话框 -->
    <Dialog title="API密钥配置" v-model="formVisible" width="600px">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px">
        <el-form-item label="配置名称" prop="remark">
          <el-input 
            v-model="formData.remark" 
            type="textarea" 
            :rows="3"
            placeholder="请输入配置名称" 
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="0">启用</el-radio>
            <el-radio :label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="formVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm" :loading="formLoading">确定</el-button>
      </template>
    </Dialog>
  </Dialog>
</template>

<script lang="ts" setup>
import { DICT_TYPE } from '@/utils/dict'
import { dateFormatter } from '@/utils/formatTime'
import * as UserApiConfigApi from '@/services/services/UserApiConfigController'

defineOptions({ name: 'UserApiKeyForm' })

const message = useMessage()

const dialogVisible = ref(false)
const loading = ref(false)
const list = ref<any[]>([])
const currentUserId = ref<number>()

const formVisible = ref(false)
const formLoading = ref(false)
const formRef = ref()
const formData = ref<any>({
  id: undefined,
  userId: undefined,
  appKey: '',
  appSecret: '',
  status: 0,
  remark: ''
})

const formRules = reactive({
  
})

/** 打开弹窗 */
const open = async (userId: number) => {
  currentUserId.value = userId
  dialogVisible.value = true
  await getList()
}

/** 获取列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await UserApiConfigApi.getUserApiConfigPage({
      userId: currentUserId.value?.toString(),
      pageNo: '1',
      pageSize: '100'
    })
    list.value = data.data?.list?.map(item => ({
      ...item,
      showKey: false,
      showSecret: false
    })) || []
  } finally {
    loading.value = false
  }
}

/** 切换API密钥显示 */
const toggleKeyVisibility = (row) => {
  row.showKey = !row.showKey
}

/** 切换Secret密钥显示 */
const toggleSecretVisibility = (row) => {
  row.showSecret = !row.showSecret
}

/** 复制到剪贴板 */
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    message.success('复制成功')
  } catch {
    message.error('复制失败')
  }
}

/** 新增 */
const handleCreate = () => {
  formData.value = {
    id: undefined,
    userId: currentUserId.value!,
    appKey: '',
    appSecret: '',
    status: 0,
    remark: ''
  }
  formVisible.value = true
}

/** 编辑 */
const handleUpdate = async (row) => {
  const data = await UserApiConfigApi.getUserApiConfig({ id: row.id })
  formData.value = { ...data.data }
  formVisible.value = true
}

/** 提交表单 */
const submitForm = async () => {
  const valid = await formRef.value?.validate()
  if (!valid) return

  formLoading.value = true
  try {
    if (formData.value.id) {
      await UserApiConfigApi.updateUserApiConfig(formData.value)
      message.success('修改成功')
    } else {
      await UserApiConfigApi.createUserApiConfig(formData.value)
      message.success('新增成功')
    }
    formVisible.value = false
    await getList()
  } finally {
    formLoading.value = false
  }
}

/** 重新生成密钥 */
const handleRegenerate = async (row) => {
  try {
    await message.confirm('确认要重新生成API密钥吗？重新生成后原密钥将失效！')
    await UserApiConfigApi.regenerateApiKeys({ id: row.id })
    message.success('重新生成成功')
    await getList()
  } catch {}
}

/** 删除 */
const handleDelete = async (row) => {
  try {
    await message.delConfirm()
    await UserApiConfigApi.deleteUserApiConfig({ id: row.id })
    message.success('删除成功')
    await getList()
  } catch {}
}

defineExpose({ open })
</script>
