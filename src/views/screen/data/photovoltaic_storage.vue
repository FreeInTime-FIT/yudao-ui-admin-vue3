<script setup lang="ts">
import p1 from '@/views/screen/assets/realtime_fork/photovoltaic_storage.png'

defineOptions({ name: 'EnergyRouterView' })

interface MenuGroup {
  title: string
  items: string[]
}

// 随机数据状态
function randomInRange(min: number, max: number, digits = 0): number {
  const v = Math.random() * (max - min) + min
  const p = Math.pow(10, digits)
  return Math.round(v * p) / p
}

const activePowerKw = ref<number>(randomInRange(240, 280))
const acPort1VoltageV = ref<number>(randomInRange(370, 390))
const acPort2VoltageV = ref<number>(randomInRange(370, 390))
const dcInnerVoltageV = ref<number>(680)
const pvPeakKw = ref<number>(360)
const pvDcVoltageV = ref<number>(680)
const pvEfficiency = ref<number>(97)
const batteryVoltageV = ref<number>(680)
const batteryCurrentA = ref<number>(randomInRange(70, 85))
const batterySoc = ref<number>(95)
const dcOutV = ref<number>(0)
const dcOutA = ref<number>(0)
const chargerTotalKWh = ref<number>(516)
const loadJgsKw = ref<number>(590)
const loadXwyKw = ref<number>(460)

// 定时更新随机项
let timer = setInterval(() => {
  activePowerKw.value = randomInRange(240, 280)
  acPort1VoltageV.value = randomInRange(370, 390)
  acPort2VoltageV.value = randomInRange(370, 390)
  batteryCurrentA.value = randomInRange(70, 85)
}, 2000)

onUnmounted(() => clearInterval(timer))

const menu = computed<MenuGroup[]>(() => ([
  {
    title: '控制参数',
    items: [
      '控制模式设定  并网模式',
      `有功功率给定  ${activePowerKw.value}kW`,
      `交流端口1电压  ${acPort1VoltageV.value}V`,
      `交流端口2电压  ${acPort2VoltageV.value}V`,
      `直流内部电压  ${dcInnerVoltageV.value}V`,
    ],
  },
  {
    title: '光伏参数',
    items: [
      `峰值功率  ${pvPeakKw.value}kW`,
      `直流电压  ${pvDcVoltageV.value}V`,
      `最大效率  ${pvEfficiency.value}%`,
    ],
  },
  {
    title: '储能电池参数',
    items: [
      `电池组电压  ${batteryVoltageV.value}V`,
      `电池组电流  ${batteryCurrentA.value}A`,
      `电池组SOC  ${batterySoc.value}%`,
    ],
  },
  {
    title: '充电桩参数',
    items: [
      `直流输出电压  ${dcOutV.value}V`,
      `直流输出电流  ${dcOutA.value}A`,
      `充电桩输出总量  ${chargerTotalKWh.value}kWh`,
    ],
  },
  {
    title: '负荷参数',
    items: [
      `金刚石负荷功率  ${loadJgsKw.value}kW`,
      `玄武岩负荷功率  ${loadXwyKw.value}kW`,
    ],
  },
]))
</script>

<template>
  <section class="er-root w-full overflow-hidden" :style="{ height: 'calc(100vh - 80px)' }">
    <div class="er-center-title">光储充能量路由器展示</div>
    <div class="h-full grid grid-cols-[27%_73%] gap-24px">
      <!-- 左侧参数列表（与 zkt.vue 风格一致） -->
      <aside class="h-full flex flex-col">
        <div class="flex-1 overflow-y-auto pr-8px">
          <div v-for="group in menu" :key="group.title" class="mb-8px">
            <div class="er-title px-10px py-6px mb-28px">{{ group.title }}</div>
            <div class="space-y-8px">
              <ElButton
                v-for="item in group.items"
                :key="item"
                class="w-100% justify-between !bg-transparent !text-white !border-1 !border-#2b4b7e hover:!bg-#0b122a"
              >
                <span class="truncate text-left">{{ item.split('  ')[0] }}</span>
                <span class="color-#FFD84D pl-8px fw-600">{{ item.split('  ')[1] }}</span>
              </ElButton>
            </div>
          </div>
        </div>
      </aside>

      <!-- 右侧整图占位（由图片替代复杂连线与元件） -->
      <aside class="h-full pr-20px mr-20px">
        <div class="w-full h-full shadow-bg flex items-center justify-center">
          <img :src="p1" class="max-w-full max-h-full object-contain" alt="台区互联能量路由器展示图" />
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped lang="scss">
.er-root{

  position: relative;
}
.er-center-title{
  position: absolute;
  left: 50%;
  top: 6px;
  transform: translateX(-50%);
  font-size: 30px;
  font-weight: 600;
}
.er-title{
  border-left: 3px solid #248FDA;
  font-weight: bold;
}
.shadow-bg{
  padding: 12px;
  
}
.el-button{
  margin-left: 0px !important;
}
</style>


