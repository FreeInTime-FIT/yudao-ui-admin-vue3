<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="设备编号" prop="deviceCode">
        <el-input v-model="formData.deviceCode" placeholder="请输入设备编号"/>
      </el-form-item>
      <el-form-item label="项目编号" prop="projectCode">
        <el-select v-model="formData.projectId" placeholder="请输入项目编号">
          <el-option
            v-for="item in projectList"
            :key="item.id"
            :value="item.id"
            :label="item.code"
           />
          </el-select>
      </el-form-item>
      <el-form-item label="变压器容量(kVA)" prop="transformerCapacity">
        <el-input v-model="formData.transformerCapacity" placeholder="请输入变压器容量(kVA)"/>
      </el-form-item>
      <el-form-item label="负荷功率(kW)" prop="loadPower">
        <el-input v-model="formData.loadPower" placeholder="请输入负荷功率(kW)"/>
      </el-form-item>
      <el-form-item label="储能类型" prop="energyStorageType">
        <el-input v-model="formData.energyStorageType" placeholder="请输入储能类型"/>
      </el-form-item>
      <el-form-item label="储能容量(kWh)" prop="energyStorageCapacity">
        <el-input v-model="formData.energyStorageCapacity" placeholder="请输入储能容量(kWh)"/>
      </el-form-item>
      <el-form-item label="额定功率(kW)" prop="ratedPower">
        <el-input v-model="formData.ratedPower" placeholder="请输入额定功率(kW)"/>
      </el-form-item>
      <el-form-item label="电池类型" prop="batteryType">
        <el-input v-model="formData.batteryType" placeholder="请输入电池类型"/>
      </el-form-item>
      <el-form-item label="电池电压范围(V)" prop="batteryVoltageRange">
        <el-input v-model="formData.batteryVoltageRange" placeholder="请输入电池电压范围(V)"/>
      </el-form-item>
      <el-form-item label="放电深度(%)" prop="dischargeDepth">
        <el-input v-model="formData.dischargeDepth" placeholder="请输入放电深度(%)"/>
      </el-form-item>
      <el-form-item label="循环寿命(次)" prop="cycleLife">
        <el-input v-model="formData.cycleLife" placeholder="请输入循环寿命(次)"/>
      </el-form-item>
      <el-form-item label="充放电速率(C)" prop="chargeDischargeRate">
        <el-input v-model="formData.chargeDischargeRate" placeholder="请输入充放电速率(C)"/>
      </el-form-item>
      <el-form-item label="预期寿命(年)" prop="expectedLifespan">
        <el-input v-model="formData.expectedLifespan" placeholder="请输入预期寿命(年)"/>
      </el-form-item>
      <el-form-item label="温度范围(°C)" prop="temperatureRange">
        <el-input v-model="formData.temperatureRange" placeholder="请输入温度范围(°C)"/>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输入备注"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import {DeviceManagementApi, DeviceManagementVO} from '@/api/iot/devicemanagement'
import {ProjectInfoApi, ProjectInfoVO} from "@/api/iot/projectinfo";

/** 设备管理 表单 */
defineOptions({name: 'DeviceManagementForm'})

const {t} = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  deviceCode: undefined,
  projectId: undefined,
  transformerCapacity: undefined,
  loadPower: undefined,
  energyStorageType: undefined,
  energyStorageCapacity: undefined,
  ratedPower: undefined,
  batteryType: undefined,
  batteryVoltageRange: undefined,
  dischargeDepth: undefined,
  cycleLife: undefined,
  chargeDischargeRate: undefined,
  expectedLifespan: undefined,
  temperatureRange: undefined,
  remark: undefined
})
const formRules = reactive({
  deviceCode: [{required: true, message: '设备编号不能为空', trigger: 'blur'}],
  projectId: [{required: true, message: '项目不能为空', trigger: 'blur'}]
})
const projectList = ref<ProjectInfoVO[]>([]) // 列表的数据

const formRef = ref() // 表单 Ref
const getProjectList = async () => {
  const data = await ProjectInfoApi.getProjectInfoPage({
    pageSize: 100
  })
  projectList.value = data.list
}

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
      formData.value = await DeviceManagementApi.getDeviceManagement(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({open}) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as DeviceManagementVO
    if (formType.value === 'create') {
      await DeviceManagementApi.createDeviceManagement(data)
      message.success(t('common.createSuccess'))
    } else {
      await DeviceManagementApi.updateDeviceManagement(data)
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
    deviceCode: undefined,
    projectCode: undefined,
    transformerCapacity: undefined,
    loadPower: undefined,
    energyStorageType: undefined,
    energyStorageCapacity: undefined,
    ratedPower: undefined,
    batteryType: undefined,
    batteryVoltageRange: undefined,
    dischargeDepth: undefined,
    cycleLife: undefined,
    chargeDischargeRate: undefined,
    expectedLifespan: undefined,
    temperatureRange: undefined,
    remark: undefined
  }
  formRef.value?.resetFields()
}
onMounted(() => {
  getProjectList()
})
</script>
