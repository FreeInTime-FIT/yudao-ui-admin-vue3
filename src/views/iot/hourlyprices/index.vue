<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="年月" prop="month">
        <el-date-picker
          v-model="queryParams.month"
          type="month"
          value-format="YYYY-MM"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
          v-model="queryParams.createTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <el-button
          type="primary"
          plain
          @click="openForm('create')"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
      <el-table-column fixed label="年月" align="center" width="120" prop="month" />
      <el-table-column fixed label="项目" align="center" width="120" prop="projectName" />
      <el-table-column label="1" align="center" prop="price01" />
      <el-table-column label="2" align="center" prop="price02" />
      <el-table-column label="3" align="center" prop="price03" />
      <el-table-column label="4" align="center" prop="price04" />
      <el-table-column label="5" align="center" prop="price05" />
      <el-table-column label="6" align="center" prop="price06" />
      <el-table-column label="7" align="center" prop="price07" />
      <el-table-column label="8" align="center" prop="price08" />
      <el-table-column label="9" align="center" prop="price09" />
      <el-table-column label="10" align="center" prop="price10" />
      <el-table-column label="11" align="center" prop="price11" />
      <el-table-column label="12" align="center" prop="price12" />
      <el-table-column label="13" align="center" prop="price13" />
      <el-table-column label="14" align="center" prop="price14" />
      <el-table-column label="15" align="center" prop="price15" />
      <el-table-column label="16" align="center" prop="price16" />
      <el-table-column label="17" align="center" prop="price17" />
      <el-table-column label="18" align="center" prop="price18" />
      <el-table-column label="19" align="center" prop="price19" />
      <el-table-column label="20" align="center" prop="price20" />
      <el-table-column label="21" align="center" prop="price21" />
      <el-table-column label="22" align="center" prop="price22" />
      <el-table-column label="23" align="center" prop="price23" />
      <el-table-column label="24" align="center" prop="price24" />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        :formatter="dateFormatter"
        width="180px"
        fixed
      />
      <el-table-column label="操作" align="center" fixed width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </ContentWrap>

  <!-- 表单弹窗：添加/修改 -->
  <HourlyPricesForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import { HourlyPricesApi, HourlyPricesVO } from '@/api/iot/hourlyprices'
import HourlyPricesForm from './HourlyPricesForm.vue'

/** 每小时的价格信息 列表 */
defineOptions({ name: 'HourlyPrices' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<HourlyPricesVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
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
  price24: undefined,
  createTime: []
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await HourlyPricesApi.getHourlyPricesPage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 添加/修改操作 */
const formRef = ref()
const openForm = (type: string, id?: number) => {
  formRef.value.open(type, id)
}

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await HourlyPricesApi.deleteHourlyPrices(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch {}
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await HourlyPricesApi.exportHourlyPrices(queryParams)
    download.excel(data, '每小时的价格信息.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>
