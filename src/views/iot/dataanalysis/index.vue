<template>
  <div class="data-analysis-container">
    <!-- 左侧选择区 -->
    <div class="left-panel">
      <el-form :model="formState" label-position="top">
        <!-- 项目选择 -->
        <el-form-item label="选择项目">
          <el-select
            v-model="formState.projectId"
            placeholder="请选择项目"
            @change="handleProjectChange"
            style="width: 100%"
          >
            <el-option
              v-for="item in projectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <!-- 设备选择 -->
        <el-form-item label="设备">
          <el-select
            v-model="formState.deviceId"
            placeholder="设备"
            :disabled="!formState.projectId"
            @change="handleDeviceChange"
            style="width: 100%"
          >
            <el-option
              v-for="item in deviceList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <!-- 字段多选 -->
        <el-form-item label="选择字段">
          <el-select
            v-model="formState.fields"
            multiple
            filterable
            placeholder="请选择字段"
            :disabled="!formState.deviceId"
            style="width: 100%"
          >
            <el-option
              v-for="field in fieldList"
              :key="field.id"
              :label="field.name"
              :value="field.id"
            />
          </el-select>
        </el-form-item>

        <!-- 添加批量输入按钮 -->
        <el-form-item>
          <el-button 
            type="primary" 
            @click="openBatchInput" 
            :disabled="!formState.deviceId"
            style="width: 100%"
          >
            批量输入字段
          </el-button>
        </el-form-item>

        <!-- 时间选择 -->
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="formState.timeRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="x"
            style="width: 100%"
          />
        </el-form-item>

        <!-- 查询按钮 -->
        <el-form-item>
          <el-button type="primary" @click="handleQuery" :loading="loading" style="width: 100%">
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 右侧图表区 -->
    <div class="right-panel">
      <div class="chart-container" ref="chartRef">
        <div id="dataChart" style="width: 100%; height: 500px"></div>
      </div>
      <div class="chart-actions">
        <el-button type="primary" @click="downloadChart" style="margin-right: 10px">下载图表</el-button>
        <el-button type="primary" @click="downloadCSV">下载CSV</el-button>
      </div>
    </div>

    <!-- 添加批量输入对话框 -->
    <el-dialog
      v-model="batchInputVisible"
      title="批量输入字段"
      width="500px"
    >
      <el-form>
        <el-form-item label="输入字段列表">
          <el-input
            v-model="batchInputText"
            type="textarea"
            :rows="4"
            placeholder="请输入或粘贴字段列表，用空格分隔，如：1#342 1#343 1#344"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="batchInputVisible = false">取消</el-button>
          <el-button type="primary" @click="handleBatchInput">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {ref, reactive, onMounted} from 'vue'
import * as echarts from 'echarts'
import type {EChartsOption} from 'echarts'
import {ElMessage} from 'element-plus'
import { getProjectInfoList } from '@/services/services/ProjectInfoController'
import { columns, dataList } from '@/services/services/IotDeviceRealTimeController'

// 表单数据
const formState = reactive({
  projectId: undefined,
  deviceId: undefined,
  fields: [] as string[],
  timeRange: [] as string[],
})

// 数据列表
const projectList = ref<any[]>([])
const deviceList = ref<any[]>([])
const fieldList = ref([])
const loading = ref(false)

// echarts实例
let chartInstance: echarts.ECharts | null = null

// 批量输入相关
const batchInputVisible = ref(false)
const batchInputText = ref('')

// 初始化图表
const initChart = () => {
  const chartDom = document.getElementById('dataChart')
  if (chartDom) {
    chartInstance = echarts.init(chartDom)
  }
}

// 获取项目列表
const fetchProjectList = async () => {
  try {
    const res = await getProjectInfoList()
    if (res.code === 0 && res.data) {
      projectList.value = res.data.list.map(item => ({
        id: item.id,
        name: item.name,
        deviceName: item.platformInfo?.deviceName,
        platformInfo: item.platformInfo // 保存整个platformInfo对象
      }))
    } else {
      ElMessage.error(res.msg || '获取项目列表失败')
    }
  } catch (error) {
    console.error('获取项目列表失败:', error)
    ElMessage.error('获取项目列表失败')
  }
}

// 项目变更处理
const handleProjectChange = async (value: string) => {
  formState.deviceId = undefined
  formState.fields = []
  fieldList.value = []

  // 从已选择的项目中获取设备信息
  const selectedProject = projectList.value.find(p => p.id === value)
  if (selectedProject?.deviceName) {
    deviceList.value = [{
      id: selectedProject.deviceName,
      name: selectedProject.deviceName,
      productKey: selectedProject.platformInfo?.productKey // 保存productKey用于获取字段
    }]
    // 自动选择设备（因为只有一个）
    formState.deviceId = selectedProject.deviceName
    // 自动获取字段列表
    await handleDeviceChange(selectedProject.deviceName)
  } else {
    deviceList.value = []
    ElMessage.warning('该项目未配置设备')
  }
}

// 设备变更处理
const handleDeviceChange = async (value: string) => {
  formState.fields = []
  fieldList.value = []

  const selectedDevice = deviceList.value.find(d => d.id === value)
  if (!selectedDevice?.productKey) {
    ElMessage.warning('设备未配置productKey')
    return
  }

  try {
    const res = await columns({
      productKey: selectedDevice.productKey,
      deviceName: value
    })

    if (res.code === 0 && res.data) {
      fieldList.value = res.data.map((item: any) => ({
        id: item.column_name,
        name: item.column_name || item.column_name
      }))
    } else {
      ElMessage.error(res.msg || '获取字段列表失败')
    }
  } catch (error) {
    console.error('获取字段列表失败:', error)
    ElMessage.error('获取字段列表失败')
  }
}

// 查询数据
const handleQuery = async () => {
  if (!formState.projectId || !formState.deviceId || formState.fields.length === 0 || !formState.timeRange.length) {
    ElMessage.warning('请完善查询条件')
    return
  }

  loading.value = true
  try {
    const selectedProject = projectList.value.find(p => p.id === formState.projectId)
    const res = await dataList({
      productKey: selectedProject?.platformInfo?.productKey,
      deviceName: formState.deviceId,
      columns: formState.fields,
      ts: formState.timeRange
    })

    if (res.code === 0 && res.data) {
      updateChart(res.data)
    } else {
      ElMessage.error(res.msg || '获取数据失败')
    }
  } catch (error) {
    ElMessage.error('查询数据失败')
    console.error('查询数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 更新图表
const updateChart = (data: any[]) => {
  if (!chartInstance) return

  // 先清空图表
  chartInstance.clear()

  // 处理数据格式
  const series = formState.fields.map(field => ({
    name: field,
    type: 'line',
    data: data.map(item => [
      new Date(item.ts).getTime(),
      Number(item[field]) || 0
    ])
  }))

  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      formatter: function(params: any) {
        // 格式化提示框内容
        const time = new Date(params[0].value[0]).toLocaleString()
        let result = `${time}<br/>`
        params.forEach((param: any) => {
          result += `${param.seriesName}: ${param.value[1]}<br/>`
        })
        return result
      }
    },
    legend: {
      data: formState.fields
    },
    xAxis: {
      type: 'time',
      boundaryGap: false,
      axisLabel: {
        formatter: function(value: number) {
          return new Date(value).toLocaleTimeString() // 只显示时间部分
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}'
      }
    },
    series
  }

  // 重新设置配置
  chartInstance.setOption(option, true) // 添加 true 参数，完全重置图表
}

// 下载图表
const downloadChart = () => {
  if (!chartInstance) return

  // 获取项目名称
  const selectedProject = projectList.value.find(p => p.id === formState.projectId)
  const projectName = selectedProject?.name || '未知项目'
  const deviceKey = formState.deviceId || '未知设备'

  // 格式化时间
  const formatTime = (timestamp: string) => {
    // 直接使用秒级时间戳，不需要乘以1000
    const date = new Date(Number(timestamp))
    const pad = (num: number) => num.toString().padStart(2, '0')
    return `${date.getFullYear()}年${pad(date.getMonth() + 1)}月${pad(date.getDate())}日${pad(date.getHours())}点${pad(date.getMinutes())}分`
  }

  const startTime = formatTime(formState.timeRange[0])
  const endTime = formatTime(formState.timeRange[1])

  // 生成文件名
  const fileName = `图表_${projectName}_${deviceKey}_${startTime}_${endTime}`

  const url = chartInstance.getDataURL()
  const link = document.createElement('a')
  link.download = `${fileName}.png`
  link.href = url
  link.click()
}

// 下载CSV
const downloadCSV = () => {
  if (!chartInstance) return

  // 获取当前图表数据
  const option = chartInstance.getOption()
  const series = option.series as any[]
  if (!series || !series.length) {
    ElMessage.warning('暂无数据可下载')
    return
  }

  // 格式化时间
  const formatTimeForCSV = (timestamp: number) => {
    const date = new Date(timestamp)
    const pad = (num: number) => num.toString().padStart(2, '0')
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  }

  // 构建CSV内容
  const headers = ['ts', ...formState.fields]
  const rows = [headers.join(',')]

  // 获取第一个系列的时间点
  const timePoints = series[0].data.map((item: any) => item[0])

  // 对每个时间点，收集所有系列的数据
  timePoints.forEach((time: number, index: number) => {
    const row = [formatTimeForCSV(time)] // 使用新的时间格式化函数

    // 收集每个字段在这个时间点的值
    formState.fields.forEach((field, fieldIndex) => {
      const value = series[fieldIndex].data[index][1]
      row.push(value)
    })

    rows.push(row.join(','))
  })

  // 创建Blob对象
  const csvContent = rows.join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })

  // 获取文件名（复用图表下载的命名逻辑）
  const selectedProject = projectList.value.find(p => p.id === formState.projectId)
  const projectName = selectedProject?.name || '未知项目'
  const deviceKey = formState.deviceId || '未知设备'

  const formatTime = (timestamp: string) => {
    const date = new Date(Number(timestamp))
    const pad = (num: number) => num.toString().padStart(2, '0')
    return `${date.getFullYear()}年${pad(date.getMonth() + 1)}月${pad(date.getDate())}日${pad(date.getHours())}点${pad(date.getMinutes())}分`
  }

  const startTime = formatTime(formState.timeRange[0])
  const endTime = formatTime(formState.timeRange[1])

  const fileName = `数据_${projectName}_${deviceKey}_${startTime}_${endTime}.csv`

  // 下载文件
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = fileName
  link.click()

  // 清理URL对象
  URL.revokeObjectURL(link.href)
}

// 打开批量输入对话框
const openBatchInput = () => {
  batchInputVisible.value = true
  batchInputText.value = ''
}

// 处理批量输入
const handleBatchInput = () => {
  const inputFields = batchInputText.value.trim().split(/\s+/)
  const matchedFields: string[] = []
  
  inputFields.forEach(input => {
    const field = fieldList.value.find(f => f.id === input)
    if (field) {
      matchedFields.push(field.id)
    }
  })

  if (matchedFields.length === 0) {
    ElMessage.warning('未找到匹配的字段')
  } else {
    formState.fields = matchedFields
    ElMessage.success(`已匹配 ${matchedFields.length} 个字段`)
    batchInputVisible.value = false
  }
}

// 组件挂载时初始化
onMounted(() => {
  initChart()
  fetchProjectList() // 获取项目列表
})
</script>

<style scoped>
.data-analysis-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  height: 100%;
}

.left-panel {
  width: 300px;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.right-panel {
  flex: 1;
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chart-container {
  margin-bottom: 20px;
}

.chart-actions {
  text-align: right;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
