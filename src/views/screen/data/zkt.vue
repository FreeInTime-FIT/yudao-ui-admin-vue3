<script setup lang="ts">
import * as echarts from 'echarts'
import screenConfig from '@/views/screen/config/echart.json'

import p1 from '@/views/screen/assets/realtime_fork/p1.png'
import p2 from '@/views/screen/assets/realtime_fork/p2.png'
import p3 from '@/views/screen/assets/realtime_fork/p3.png'
defineOptions({ name: 'ZKTView' })

echarts.registerTheme('screen', screenConfig)

interface MenuGroup {
  title: string
  items: string[]
}

const menu: MenuGroup[] = [
  {
    title: '并网点状态',
    items: [
      '并网点电压  10.5kV',
      '电网频率  50Hz',
      '交换功率  1050kVA',
      '功率因数  0.97',
    ],
  },
  {
    title: '储能调节能力',
    items: [
      '当前状态  300 kVA/70%SOC',
      '上调能力  600 kVA',
      '下调能力  900 kVA',
    ],
  },
  {
    title: '分布式电源调节能力',
    items: [
      '当前状态  2420 kW',
      '上调能力  242 kW',
      '下调能力  2420 kW',
    ],
  },
  {
    title: '负荷可调能力',
    items: [
      '运行功率  200 kW',
      '上调能力  100 kW',
      '下调功率  300 kW',
    ],
  },
]

type ChartCfg = { title: string; series: { name: string; color: string; data: [number, number][] }[] }
const charts: ChartCfg[] = [
  {
    title: '惯量支撑功率响应',
    series: [
      { name: '频率', color: '#FFD84D', data: [[0, 1], [1, 1.05], [2, 1.1], [3, 1.06], [4, 1.03], [5, 1.02], [6, 1.02]] },
      { name: '有功功率', color: '#4FC3FF', data: [[0, 1], [1, 1.02], [2, 1.01], [3, 0.99], [4, 0.97], [6, 0.95]] },
    ],
  },
  {
    title: '一次调频功率响应',
    series: [
      { name: '频率', color: '#FFD84D', data: [[0, 1], [1, 0.98], [2, 0.97], [3, 0.97], [6, 0.97]] },
      { name: '有功功率', color: '#4FC3FF', data: [[0, 1], [1, 1.06], [2, 1.03], [3, 1.02], [4, 1.02], [6, 1.02]] },
    ],
  },
  {
    title: '电压与无功功率响应',
    series: [
      { name: '电压', color: '#FFD84D', data: [[0, 1], [6, 1]] },
      { name: '无功功率', color: '#4FC3FF', data: [[0, 0.92], [1, 0.94], [2, 0.96], [3, 0.98], [4, 0.99], [6, 1.0]] },
    ],
  },
]

const chartRefs = charts.map(() => ref<HTMLDivElement | null>(null))

function buildOption(cfg: ChartCfg): echarts.EChartsOption {
  return {
    backgroundColor: 'transparent',
    grid: { left: 40, right: 16, top: 40, bottom: 30 },
    title: {
      text: cfg.title,
      left: 'center',
      top: 4,
      textStyle: { color: '#fff', fontSize: 16 },
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0],
      axisLine: { lineStyle: { color: '#345' } },
      splitLine: { show: true, lineStyle: { color: '#024a8a' } },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#345' } },
      splitLine: { show: true, lineStyle: { color: '#024a8a' } },
    },
    legend: {
      top: 8,
      right: 10,
      textStyle: { color: '#fff' },
    },
    series: cfg.series.map(s => ({
      type: 'line',
      name: s.name,
      smooth: true,
      showSymbol: false,
      lineStyle: { color: s.color, width: 2 },
      data: s.data,
    })),
  }
}

onMounted(() => {
  chartRefs.forEach((elRef, idx) => {
    const el = elRef.value
    if (!el) return
    const instance = echarts.init(el, 'screen')
    instance.setOption(buildOption(charts[idx]))
  })
})
</script>

<template>
  <section class="zkt-root w-full overflow-hidden" :style="{ height: 'calc(100vh - 80px)' }">
    <div class="h-full grid grid-cols-[27%_46%_27%] ">
      <!-- 左侧菜单 -->
      <aside class="h-full flex flex-col">
        <div class="flex-1 overflow-y-auto pr-8px">
          <div v-for="group in menu" :key="group.title" class="mb-28px">
            <div class="zkt-title px-10px py-6px mb-18px">{{ group.title }}</div>
            <div class="space-y-20px">
              <ElButton
                v-for="item in group.items"
                :key="item"
                
                class="w-100% justify-between !bg-transparent mb-8px !text-white !border-1 !border-#2b4b7e hover:!bg-#0b122a"
              >
                <span class="truncate text-left">{{ item.split('  ')[0] }}</span>
                <span class="color-#FFD84D fw-600 pl-8px">{{ item.split('  ')[1] }}</span>
              </ElButton>
            </div>
          </div>
        </div>
      </aside>

      <!-- 中间主内容（标题 + 设备与示意图） -->
      <main class="h-full flex flex-col items-center">
        <div class="text-38px fw-600 tracking-1px mt-8px mb-10px">高速协调控制器</div>
        <div class="w-70% max-w-640px">
          <img :src="p1" class="w-full" alt="设备示意图" />
        </div>
        <div class="mt-16px px-20px text-18px leading-8 text-justify max-w-900px">
          基于自主产权的高速协调控制器，快速感知电网频率、电压变化，主动调节园区内部源、荷、储，为电网提供惯量、有功、无功功率支撑
        </div>

        <!-- 复杂流程图与框图区域使用图片占位（如后续有设计图可替换） -->
        <div class="w-92% mt-18px grid grid-cols-1 gap-16px">
          <div class="placeholder-img">
            <img :src="p2" class="w-full h-full" alt="框图占位" />
          </div>
          <div class="placeholder-img">
            <img :src="p3" class="w-full h-full " alt="框图占位" />
          </div>
          <div class="placeholder-img">
            <img :src="p3" class="w-full h-full " alt="框图占位" />
          </div>
        </div>
      </main>

      <!-- 右侧图表 -->
      <aside class="h-full flex flex-col gap-16px overflow-hidden  mr-10px">
        <div v-for="(cfg, i) in charts" :key="cfg.title" class="shadow-bg h-319px overflow-hidden">
          <div :ref="(el) => (chartRefs[i].value = el as HTMLDivElement)" class="w-full h-full"></div>
        </div>
      </aside>
    </div>
  </section>
  
</template>

<style scoped lang="scss">
.zkt-root{
  background: #000;
  color: #fff;
}
.zkt-title{
  background: linear-gradient(90deg, rgba(36,143,218,.25), rgba(36,143,218,.05));
  border-left: 3px solid #248FDA;
  font-weight: bold;
}
.placeholder-img{
  height: 22vh;
  border-radius: 8px;
  background: #0b122a;
  box-shadow: inset 0 0 20px 0px #024A8A;
  display: flex;
  align-items: center;
  justify-content: center;
}
.shadow-bg{
  
  box-shadow: inset 0 0 20px 0px #024A8A;
}
.el-button{
  margin-left: 0px !important;
}
</style>


