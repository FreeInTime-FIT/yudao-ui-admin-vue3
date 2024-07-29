<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="项目编码" prop="code">
        <el-input v-model="formData.code" placeholder="请输入项目编码" />
      </el-form-item>
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入项目名称" />
      </el-form-item>
      <el-form-item label="项目地址" prop="address">
        <el-input v-model="formData.address" placeholder="请输入项目地址" />
      </el-form-item>
      <el-form-item label="经度" prop="lng">
        <el-input v-model="formData.lng" placeholder="请输入经度" />
      </el-form-item>
      <el-form-item label="纬度" prop="lat">
        <el-input v-model="formData.lat" placeholder="请输入纬度" />
      </el-form-item>
      <el-form-item label="变压器容量" prop="transformerCapacity">
        <el-input v-model="formData.transformerCapacity" placeholder="请输入变压器容量" />
      </el-form-item>
      <el-form-item label="总负荷功率" prop="totalLoadPower">
        <el-input v-model="formData.totalLoadPower" placeholder="请输入总负荷功率" />
      </el-form-item>
      <el-form-item label="逾期寿命" prop="lifeExpectancy">
        <el-input v-model="formData.lifeExpectancy" placeholder="请输入逾期寿命" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { ProjectInfoApi, ProjectInfoVO } from '@/api/iot/projectinfo'

/** 项目信息 表单 */
defineOptions({ name: 'ProjectInfoForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  code: undefined,
  name: undefined,
  address: undefined,
  lng: undefined,
  lat: undefined,
  transformerCapacity: undefined,
  totalLoadPower: undefined,
  lifeExpectancy: undefined
})
const formRules = reactive({
  code: [{ required: true, message: '项目编码不能为空', trigger: 'blur' }]
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await ProjectInfoApi.getProjectInfo(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as ProjectInfoVO
    if (formType.value === 'create') {
      await ProjectInfoApi.createProjectInfo(data)
      message.success(t('common.createSuccess'))
    } else {
      await ProjectInfoApi.updateProjectInfo(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    code: undefined,
    name: undefined,
    address: undefined,
    lng: undefined,
    lat: undefined,
    transformerCapacity: undefined,
    totalLoadPower: undefined,
    lifeExpectancy: undefined
  }
  formRef.value?.resetFields()
}
</script>