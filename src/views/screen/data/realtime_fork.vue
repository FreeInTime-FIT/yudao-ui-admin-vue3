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

// 创建功率曲线图表
function createPowerCurveChart() {
  if (!powerCurveChart.value) return
  const chart = echarts.init(powerCurveChart.value, 'screen')
  
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
      data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
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
        name: '金刚石',
        type: 'line',
        smooth: true,
        lineStyle: { color: '#FFD84D', width: 2 },
        data: [120, 180, 250, 300, 280, 320, 290, 200]
      },
      {
        name: '玄武岩',
        type: 'line',
        smooth: true,
        lineStyle: { color: '#4FC3FF', width: 2 },
        data: [80, 120, 160, 200, 180, 220, 190, 140]
      }
    ]
  }
  
  chart.setOption(option)
}

// 创建近7日耗能对比图
function createWeeklyComparisonChart() {
  if (!weeklyComparisonChart.value) return
  const chart = echarts.init(weeklyComparisonChart.value, 'screen')
  
  const option = {
    backgroundColor: 'transparent',
    title: {
      text: '近7日耗能对比图',
      left: 'center',
      top: 10,
      textStyle: { color: '#fff', fontSize: 16 }
    },
    grid: { left: 60, right: 30, top: 50, bottom: 40 },
    xAxis: {
      type: 'category',
      data: ['2024-06-06', '2024-06-08', '2024-06-10', '2024-06-12'],
      axisLine: { lineStyle: { color: '#345' } },
      axisLabel: { color: '#fff', rotate: 45 }
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
    series: [
      {
        name: '昨日',
        type: 'bar',
        itemStyle: { color: '#4FC3FF' },
        data: [1800, 2400, 1400, 1600]
      },
      {
        name: '今日',
        type: 'bar',
        itemStyle: { color: '#FFD84D' },
        data: [2200, 2600, 1200, 2400]
      }
    ]
  }
  
  chart.setOption(option)
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

onMounted(() => {
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
        <div ref="powerCurveChart" class="w-full h-full"></div>
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
        <div ref="weeklyComparisonChart" class="w-full h-50%"></div>
        <div ref="electricityAnalysisChart" class="w-full h-50%"></div>
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
</style>
