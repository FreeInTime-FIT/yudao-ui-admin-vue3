<script setup lang="ts">
import * as echarts from 'echarts'
import screenConfig from '@/views/screen/config/echart.json'
import centerBg from '@/views/screen/assets/realtime_fork/image.png'

echarts.registerTheme('screen', screenConfig);

defineOptions({
  name: 'ScreenDataRealtime',
})

// 碳排放统计数据
const carbonStats = ref({
  newEnergyGeneration: 19800, // kWh
  carbonReduction: 10.625, // 吨
  equivalentTrees: 664, // 颗
  carbonCredits: 19.8 // 个
})

// 建筑能耗排名数据
const buildingEnergyRanking = ref([
  { name: '行政楼', value: 2140, unit: 'kWh' },
  { name: '生产车间A', value: 1867, unit: 'kWh' },
  { name: '生产车间B', value: 1768, unit: 'kWh' },
  { name: '仓储中心', value: 1432, unit: 'kWh' },
  { name: '研发中心', value: 1245, unit: 'kWh' }
])

// 图表引用
const powerCurveChart = ref<HTMLDivElement>()
const weeklyComparisonChart = ref<HTMLDivElement>()
const powerConsumptionChart = ref<HTMLDivElement>()
const electricityAnalysisChart = ref<HTMLDivElement>()

// CSV数据状态
const csvData = ref<Array<{
  编号: number
  金刚石负荷功率: number
  玄武岩负荷功率: number
  单位: string
}>>([])
const isLoadingData = ref(false)

// 读取和解析CSV数据
async function loadCSVData() {
  if (isLoadingData.value || csvData.value.length > 0) return
  
  try {
    isLoadingData.value = true
    const response = await fetch('/data.csv')
    const csvText = await response.text()
    
    // 解析CSV数据
    const lines = csvText.split('\n').filter(line => line.trim())
    const headers = lines[0].split(',')
    
    const data = []
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',')
      if (values.length >= 4) {
        data.push({
          编号: parseInt(values[0]) || i - 1,
          金刚石负荷功率: parseFloat(values[1]) || 0,
          玄武岩负荷功率: parseFloat(values[2]) || 0,
          单位: values[3]?.trim() || 'kW'
        })
      }
    }
    
    csvData.value = data
    console.log(`成功加载 ${data.length} 条数据`)
  } catch (error) {
    console.error('加载CSV数据失败:', error)
    // 如果加载失败，使用默认数据
    csvData.value = []
  } finally {
    isLoadingData.value = false
  }
}

// 数据缓存
const chartDataCache = ref<any>(null)

// 获取图表显示数据（采样处理大数据集）
function getChartData() {
  // 如果有缓存且数据未变化，直接返回缓存
  if (chartDataCache.value && csvData.value.length > 0) {
    return chartDataCache.value
  }
  
  if (csvData.value.length === 0) {
    // 默认数据作为后备
    const defaultData = {
      xAxisData: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
      diamondData: [120, 180, 250, 300, 280, 320, 290, 200],
      basaltData: [80, 120, 160, 200, 180, 220, 190, 140]
    }
    chartDataCache.value = defaultData
    return defaultData
  }
  
  const dataLength = csvData.value.length
  let sampledData = csvData.value
  
  // 智能采样：根据数据量动态调整采样策略
  let maxPoints = 200 // 最大显示点数
  if (dataLength > maxPoints) {
    const step = Math.ceil(dataLength / maxPoints)
    sampledData = csvData.value.filter((_, index) => index % step === 0)
  }
  
  // 生成时间轴标签（更智能的时间分布）
  const xAxisData = sampledData.map((_, index) => {
    if (sampledData.length <= 24) {
      // 少于24个点时，按小时显示
      const hour = Math.floor((index * 24) / sampledData.length)
      return `${hour.toString().padStart(2, '0')}:00`
    } else {
      // 多于24个点时，显示序号
      const originalIndex = Math.floor((index * dataLength) / sampledData.length)
      return `#${originalIndex}`
    }
  })
  
  const result = {
    xAxisData,
    diamondData: sampledData.map(item => item.金刚石负荷功率),
    basaltData: sampledData.map(item => item.玄武岩负荷功率),
    totalPoints: dataLength,
    sampledPoints: sampledData.length
  }
  
  // 缓存结果
  chartDataCache.value = result
  return result
}

// 刷新图表数据
function refreshChartData() {
  chartDataCache.value = null
  if (powerCurveChart.value) {
    createPowerCurveChart()
  }
}

// 创建功率曲线图表
function createPowerCurveChart() {
  if (!powerCurveChart.value) return
  const chart = echarts.init(powerCurveChart.value, 'screen')
  
  // 获取真实数据
  const chartData = getChartData()
  
  const option = {
    backgroundColor: 'transparent',
    title: {
      text: '金刚石及玄武岩运行功率曲线',
      left: 'center',
      top: 10,
      textStyle: { color: '#fff', fontSize: 16 }
    },
    grid: { left: 60, right: 30, top: 50, bottom: 40 },
    xAxis: {
      type: 'category',
      data: chartData.xAxisData,
      axisLine: { lineStyle: { color: '#345' } },
      axisLabel: { color: '#fff' }
    },
    yAxis: {
      type: 'value',
      name: 'kW',
      nameTextStyle: { color: '#fff' },
      axisLine: { lineStyle: { color: '#345' } },
      axisLabel: { color: '#fff' },
      splitLine: { lineStyle: { color: '#024a8a' } }
    },
    legend: {
      top: 30,
      right: 20,
      textStyle: { color: '#fff' }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#248FDA',
      textStyle: { color: '#fff' },
      formatter: function(params: any) {
        let result = `时间: ${params[0].axisValue}<br/>`
        params.forEach((item: any) => {
          result += `${item.seriesName}: ${item.value} kW<br/>`
        })
        return result
      }
    },
    series: [
      {
        name: '金刚石',
        type: 'line',
        smooth: true,
        lineStyle: { color: '#FFD84D', width: 2 },
        itemStyle: { color: '#FFD84D' },
        data: chartData.diamondData
      },
      {
        name: '玄武岩',
        type: 'line',
        smooth: true,
        lineStyle: { color: '#4FC3FF', width: 2 },
        itemStyle: { color: '#4FC3FF' },
        data: chartData.basaltData
      }
    ]
  }
  
  chart.setOption(option)
  
  // 窗口大小改变时重新渲染
  window.addEventListener('resize', () => {
    chart.resize()
  })
}

// 生成近7日模拟数据
function generateWeeklyData() {
  const today = new Date()
  const dates = []
  const yesterdayData = []
  const todayData = []
  
  // 生成近7日的日期
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    dates.push(date.toISOString().split('T')[0])
    
    // 生成模拟数据，基础值在1500-2500之间，加上随机波动
    const baseValue = 1800 + Math.random() * 700
    yesterdayData.push(Math.round(baseValue + (Math.random() - 0.5) * 400))
    todayData.push(Math.round(baseValue + (Math.random() - 0.5) * 400))
  }
  
  return { dates, yesterdayData, todayData }
}

// 创建近7日耗能对比图
function createWeeklyComparisonChart() {
  if (!weeklyComparisonChart.value) return
  const chart = echarts.init(weeklyComparisonChart.value, 'screen')
  
  const weeklyData = generateWeeklyData()
  
  const option = {
    backgroundColor: 'transparent',
    title: {
      text: '近7日耗能对比图',
      left: 'center',
      top: 10,
      textStyle: { color: '#fff', fontSize: 16 }
    },
    grid: { left: 60, right: 30, top: 50, bottom: 60 }, // 增加底部空间
    xAxis: {
      type: 'category',
      data: weeklyData.dates,
      axisLine: { lineStyle: { color: '#345' } },
      axisLabel: { 
        color: '#fff', 
        rotate: 45,
        fontSize: 12,
        margin: 10
      }
    },
    yAxis: {
      type: 'value',
      name: 'kWh',
      nameTextStyle: { color: '#fff' },
      axisLine: { lineStyle: { color: '#345' } },
      axisLabel: { color: '#fff' },
      splitLine: { lineStyle: { color: '#024a8a' } }
    },
    legend: {
      top: 30,
      right: 20,
      textStyle: { color: '#fff' }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#248FDA',
      textStyle: { color: '#fff' },
      formatter: function(params: any) {
        let result = `日期: ${params[0].axisValue}<br/>`
        params.forEach((item: any) => {
          result += `${item.seriesName}: ${item.value} kWh<br/>`
        })
        return result
      }
    },
    series: [
      {
        name: '前一周同期',
        type: 'bar',
        itemStyle: { color: '#4FC3FF' },
        data: weeklyData.yesterdayData
      },
      {
        name: '本周',
        type: 'bar',
        itemStyle: { color: '#FFD84D' },
        data: weeklyData.todayData
      }
    ]
  }
  
  chart.setOption(option)
  
  // 窗口大小改变时重新渲染
  window.addEventListener('resize', () => {
    chart.resize()
  })
}

// 创建电力消费统计图表
function createPowerConsumptionChart() {
  if (!powerConsumptionChart.value) return
  const chart = echarts.init(powerConsumptionChart.value, 'screen')
  
  const option = {
    backgroundColor: 'transparent',
    title: {
      text: '电力消费统计',
      left: 'center',
      top: 10,
      textStyle: { color: '#fff', fontSize: 16 }
    },
    grid: { left: 60, right: 30, top: 50, bottom: 40 },
    xAxis: {
      type: 'category',
      data: Array.from({length: 24}, (_, i) => `${i.toString().padStart(2, '0')}:00`),
      axisLine: { lineStyle: { color: '#345' } },
      axisLabel: { color: '#fff' }
    },
    yAxis: {
      type: 'value',
      name: 'kW',
      nameTextStyle: { color: '#fff' },
      axisLine: { lineStyle: { color: '#345' } },
      axisLabel: { color: '#fff' },
      splitLine: { lineStyle: { color: '#024a8a' } }
    },
    legend: {
      top: 30,
      right: 20,
      textStyle: { color: '#fff' }
    },
    series: [
      {
        name: '昨日',
        type: 'line',
        smooth: true,
        lineStyle: { color: '#4FC3FF', width: 2 },
        areaStyle: { color: 'rgba(79, 195, 255, 0.3)' },
        data: [150, 120, 100, 80, 90, 110, 140, 180, 220, 250, 280, 300, 320, 310, 290, 270, 250, 230, 200, 180, 160, 140, 130, 120]
      },
      {
        name: '今日',
        type: 'line',
        smooth: true,
        lineStyle: { color: '#FFD84D', width: 2 },
        areaStyle: { color: 'rgba(255, 216, 77, 0.3)' },
        data: [140, 110, 95, 85, 100, 120, 160, 200, 240, 270, 300, 320, 340, 330, 310, 290, 270, 250, 220, 190, 170, 150, 140, 130]
      }
    ]
  }
  
  chart.setOption(option)
}

// 创建用电情况分析图表
function createElectricityAnalysisChart() {
  if (!electricityAnalysisChart.value) return
  const chart = echarts.init(electricityAnalysisChart.value, 'screen')
  
  const option = {
    backgroundColor: 'transparent',
    title: {
      text: '金刚石及玄武岩用电情况分析',
      left: 'center',
      top: 10,
      textStyle: { color: '#fff', fontSize: 16 }
    },
    grid: [
      { left: '10%', right: '55%', top: '20%', bottom: '20%' },
      { left: '55%', right: '10%', top: '20%', bottom: '20%' }
    ],
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['25%', '50%'],
        data: [
          { value: 421.2, name: '峰时用电' },
          { value: 30.9, name: '平时用电' },
          { value: 1.9, name: '谷时用电' }
        ],
        itemStyle: {
          color: function(params: any) {
            const colors = ['#FFD84D', '#4FC3FF', '#1EBCA1']
            return colors[params.dataIndex]
          }
        },
        label: {
          show: true,
          color: '#fff',
          formatter: '{b}: {c}kWh'
        }
      },
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['75%', '50%'],
        data: [
          { value: 311.6, name: '峰时用电' },
          { value: 309.1, name: '平时用电' }
        ],
        itemStyle: {
          color: function(params: any) {
            const colors = ['#FFD84D', '#4FC3FF']
            return colors[params.dataIndex]
          }
        },
        label: {
          show: true,
          color: '#fff',
          formatter: '{b}: {c}kWh'
        }
      }
    ]
  }
  
  chart.setOption(option)
}

onMounted(async () => {
  // 先加载CSV数据
  await loadCSVData()
  
  nextTick(() => {
    createPowerCurveChart()
    createWeeklyComparisonChart()
    createPowerConsumptionChart()
    createElectricityAnalysisChart()
  })
})

</script>

<template>
  <section class="dashboard-root w-full h-[calc(100vh-80px)] overflow-hidden bg-#000">
    <!-- 主要网格布局 -->
    <div class="dashboard-grid h-full grid grid-cols-[20%_50%_30%] grid-rows-[50%_50%] gap-6px ">
      
      <!-- 左上：碳排放统计 -->
      <div class="card-container">
        <div class="card-header">碳排放统计</div>
        <div class="card-content">
          <div class="stat-item">
            <div class="stat-label">新能源发电量：</div>
            <div class="stat-value">{{ carbonStats.newEnergyGeneration }} kWh</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">碳减排量：</div>
            <div class="stat-value">{{ carbonStats.carbonReduction }} 吨</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">等效植树数：</div>
            <div class="stat-value">{{ carbonStats.equivalentTrees }} 颗</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">绿证数：</div>
            <div class="stat-value">{{ carbonStats.carbonCredits }} 个</div>
          </div>
        </div>
      </div>

      <!-- 中上：碳排放管理及能耗监测主图 -->
      <div class="card-container relative">
        <div class="card-header">碳排放管理及能耗监测</div>
        <div class="main-diagram-container relative">
          <img :src="centerBg" class="w-full h-full object-cover mt-20px ml-[-26px]" alt="微电网智能源平台" />
          <!-- 绝对定位的文字标签 -->
          <div class="absolute-text text-1">市电309kW</div>
          <div class="absolute-text text-2">光伏760kW</div>
          <div class="absolute-text text-3">新能源占比 87%</div>
          <div class="absolute-text text-4">光储充路由器360kW</div>
          <div class="absolute-text text-5">台区互联路由器270kW</div>
          <div class="absolute-text text-6">风电680kW</div>
          <div class="absolute-text text-7">负荷2379kW</div>
                </div>
              </div>

      <!-- 右上：金刚石及玄武岩运行功率曲线 -->
      <div class="card-container">
        <div v-if="isLoadingData" class="loading-container">
          <div class="loading-spinner"></div>
          <div class="loading-text">正在加载数据...</div>
        </div>
        <div v-else ref="powerCurveChart" class="w-full h-full"></div>
        
      </div>

      <!-- 左下：建筑能耗排名 -->
      <div class="card-container">
        <div class="card-header">建筑能耗排名</div>
        <div class="card-content">
          <div v-for="item in buildingEnergyRanking" :key="item.name" class="ranking-item">
            <div class="ranking-icon">
              <i class="building-icon"></i>
            </div>
            <div class="ranking-info">
              <div class="building-name">{{ item.name }}</div>
              <div class="building-value">{{ item.value }} {{ item.unit }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 中下：电力消费统计 -->
      <div class="card-container">
        <div ref="powerConsumptionChart" class="w-full h-full"></div>
          </div>

      <!-- 右上第二行：近7日耗能对比图 -->
      <div class="card-container row-span-1">
        <div ref="weeklyComparisonChart" class="w-full h-60%"></div>
        <div ref="electricityAnalysisChart" class="w-full h-40%"></div>
      </div>

    </div>
  </section>
</template>

<style scoped lang="scss">
.dashboard-root {
  background: #000;
  color: #fff;
  font-family: 'Microsoft YaHei', sans-serif;
}

.dashboard-grid {
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
}

.card-container {
  background: rgba(11, 18, 42, 0.8);
  border: 1px solid rgba(36, 143, 218, 0.3);
  border-radius: 8px;
  box-shadow: inset 0 0 20px rgba(2, 74, 138, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card-header {
  background: linear-gradient(90deg, rgba(36, 143, 218, 0.25), rgba(36, 143, 218, 0.05));
  border-left: 3px solid #248FDA;
  padding: 12px 16px;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
}

.card-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

// 碳排放统计样式
.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 8px 0;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
}

.stat-label {
  color: #ccc;
  font-size: 14px;
}

.stat-value {
  color: #FFD84D;
  font-weight: bold;
  font-size: 16px;
}

// 建筑能耗排名样式
.ranking-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 8px;
  background: rgba(36, 143, 218, 0.1);
  border-radius: 4px;
  border-left: 3px solid #4FC3FF;
}

.ranking-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(79, 195, 255, 0.2);
  border-radius: 50%;
  margin-right: 12px;
}

.building-icon {
  width: 20px;
  height: 20px;
  background: #4FC3FF;
  border-radius: 2px;
    position: relative;
  
  &::before {
      content: '';
      position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 6px solid #4FC3FF;
  }
}

.ranking-info {
  flex: 1;
}

.building-name {
  color: #fff;
  font-size: 14px;
  margin-bottom: 4px;
}

.building-value {
  color: #FFD84D;
  font-weight: bold;
  font-size: 16px;
}

// 主图容器样式
.main-diagram-container {
  flex: 1;
    position: relative;
  overflow: hidden;
}

// 绝对定位文字样式
.absolute-text {
      position: absolute;
  background: rgba(0, 0, 0, 0.7);
  color: #FFD84D;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  border: 1px solid rgba(255, 216, 77, 0.5);
  white-space: nowrap;
  z-index: 10;
}

// 根据图片位置调整文字位置
.text-1 { // 市电309kW
  top: 7%;
  left: 3%;
}

.text-2 { // 光伏760kW
  top: 2%;
  left: 22%;
}

.text-3 { // 新能源占比 87%
  top: 11%;
      left: 50%;
      transform: translateX(-50%);
  background: rgba(255, 0, 0, 0.8);
  color: #fff;
  border-color: rgba(255, 0, 0, 0.8);
}

.text-4 { // 光储充路由器360kW
  top: 0%;
  right: 14%;
}

.text-5 { // 台区互联路由器270kW
  top: 16%;
  right: 0%;
}

.text-6 { // 风电680kW
  bottom: 37%;
  left: 15%;
}

.text-7 { // 负荷2379kW
  bottom: 33%;
  right: 10%;
}

// 响应式调整
@media (max-width: 1600px) {
  .absolute-text {
    font-size: 12px;
    padding: 2px 6px;
  }
}

@media (max-width: 1200px) {
  .dashboard-grid {
    grid-template-columns: 25% 45% 30%;
  }
  
  .absolute-text {
    font-size: 10px;
    padding: 2px 4px;
    }
  }

// 加载状态样式
.loading-container {
    display: flex;
  flex-direction: column;
    align-items: center;
    justify-content: center;
  height: 100%;
  color: #fff;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #4FC3FF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 14px;
  color: #ccc;
}

// 数据信息显示样式
.data-info {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: #ccc;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  
  span {
    margin-right: 8px;
    
    &:last-child {
      margin-right: 0;
    }
    }
  }
</style>
