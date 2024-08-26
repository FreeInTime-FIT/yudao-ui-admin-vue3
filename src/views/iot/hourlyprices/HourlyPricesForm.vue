<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="年月" prop="month">
        <el-date-picker
          v-model="formData.month"
          value-format="YYYY-MM"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label="项目" prop="projectId">
        <el-select v-model="formData.projectId" placeholder="请输入项目编号">
          <el-option
            v-for="item in projectList"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="1" prop="price01">
        <el-input v-model="formData.price01" placeholder="请输入第1小时的价格" type="number"/>
      </el-form-item>
      <el-form-item label="2" prop="price02">
        <el-input v-model="formData.price02" placeholder="请输入第2小时的价格" type="number"/>
      </el-form-item>
      <el-form-item label="3" prop="price03">
        <el-input v-model="formData.price03" placeholder="请输入第3小时的价格" type="number"/>
      </el-form-item>
      <el-form-item label="4" prop="price04">
        <el-input v-model="formData.price04" placeholder="请输入第4小时的价格" type="number"/>
      </el-form-item>
      <el-form-item label="5" prop="price05">
        <el-input v-model="formData.price05" placeholder="请输入第5小时的价格" type="number"/>
      </el-form-item>
      <el-form-item label="6" prop="price06">
        <el-input v-model="formData.price06" placeholder="请输入第6小时的价格" type="number"/>
      </el-form-item>
      <el-form-item label="7" prop="price07">
        <el-input v-model="formData.price07" placeholder="请输入第7小时的价格" type="number"/>
      </el-form-item>
      <el-form-item label="8" prop="price08">
        <el-input v-model="formData.price08" placeholder="请输入第8小时的价格" type="number"/>
      </el-form-item>
      <el-form-item label="9" prop="price09">
        <el-input v-model="formData.price09" placeholder="请输入第9小时的价格" type="number"/>
      </el-form-item>
      <el-form-item label="10" prop="price10">
        <el-input v-model="formData.price10" placeholder="请输入第10小时的价格" type="number"/>
      </el-form-item>
      <el-form-item label="11" prop="price11">
        <el-input v-model="formData.price11" placeholder="请输入第11小时的价格" type="number"/>
      </el-form-item>
      <el-form-item label="12" prop="price12">
        <el-input v-model="formData.price12" placeholder="请输入第12小时的价格" type="number"/>
      </el-form-item>
      <el-form-item label="13" prop="price13">
        <el-input v-model="formData.price13" placeholder="请输入第13小时的价格" type="number"/>
      </el-form-item>
      <el-form-item label="14" prop="price14">
        <el-input v-model="formData.price14" placeholder="请输入第14小时的价格" type="number"/>
      </el-form-item>
      <el-form-item label="15" prop="price15">
        <el-input v-model="formData.price15" placeholder="请输入第15小时的价格" type="number"/>
      </el-form-item>
      <el-form-item label="16" prop="price16">
        <el-input v-model="formData.price16" placeholder="请输入第16小时的价格" type="number"/>
      </el-form-item>
      <el-form-item label="17" prop="price17">
        <el-input v-model="formData.price17" placeholder="请输入第17小时的价格" type="number"/>
      </el-form-item>
      <el-form-item label="18" prop="price18">
        <el-input v-model="formData.price18" placeholder="请输入第18小时的价格" type="number"/>
      </el-form-item>
      <el-form-item label="19" prop="price19">
        <el-input v-model="formData.price19" placeholder="请输入第19小时的价格" type="number"/>
      </el-form-item>
      <el-form-item label="20" prop="price20">
        <el-input v-model="formData.price20" placeholder="请输入第20小时的价格" type="number"/>
      </el-form-item>
      <el-form-item label="21" prop="price21">
        <el-input v-model="formData.price21" placeholder="请输入第21小时的价格" type="number"/>
      </el-form-item>
      <el-form-item label="22" prop="price22">
        <el-input v-model="formData.price22" placeholder="请输入第22小时的价格" type="number"/>
      </el-form-item>
      <el-form-item label="23" prop="price23">
        <el-input v-model="formData.price23" placeholder="请输入第23小时的价格" type="number"/>
      </el-form-item>
      <el-form-item label="24" prop="price24">
        <el-input v-model="formData.price24" placeholder="请输入第24小时的价格" type="number"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import {HourlyPricesApi, HourlyPricesVO} from '@/api/iot/hourlyprices'
import {ProjectInfoApi, ProjectInfoVO} from "@/api/iot/projectinfo";

/** 每小时的价格信息 表单 */
defineOptions({name: 'HourlyPricesForm'})

const {t} = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  month: undefined,
  projectId: undefined,
  price01: undefined,
  price02: undefined,
  price03: undefined,
  price04: undefined,
  price05: undefined,
  price06: undefined,
  price07: undefined,
  price08: undefined,
  price09: undefined,
  price10: undefined,
  price11: undefined,
  price12: undefined,
  price13: undefined,
  price14: undefined,
  price15: undefined,
  price16: undefined,
  price17: undefined,
  price18: undefined,
  price19: undefined,
  price20: undefined,
  price21: undefined,
  price22: undefined,
  price23: undefined,
  price24: undefined
})
const formRules = reactive({})
const projectList = ref<ProjectInfoVO[]>([]) // 列表的数据
const formRef = ref() // 表单 Ref
const getProjectList = async () => {
  const data = await ProjectInfoApi.getProjectInfoList()
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
      formData.value = await HourlyPricesApi.getHourlyPrices(id)
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
    const data = formData.value as unknown as HourlyPricesVO
    if (formType.value === 'create') {
      await HourlyPricesApi.createHourlyPrices(data)
      message.success(t('common.createSuccess'))
    } else {
      await HourlyPricesApi.updateHourlyPrices(data)
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
    month: undefined,
    projectId: undefined,
    price01: undefined,
    price02: undefined,
    price03: undefined,
    price04: undefined,
    price05: undefined,
    price06: undefined,
    price07: undefined,
    price08: undefined,
    price09: undefined,
    price10: undefined,
    price11: undefined,
    price12: undefined,
    price13: undefined,
    price14: undefined,
    price15: undefined,
    price16: undefined,
    price17: undefined,
    price18: undefined,
    price19: undefined,
    price20: undefined,
    price21: undefined,
    price22: undefined,
    price23: undefined,
    price24: undefined
  }
  formRef.value?.resetFields()
}
onMounted(() => {
  getProjectList()
})
</script>
