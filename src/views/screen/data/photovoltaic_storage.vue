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

// 动态/静态数据（以图中黄色数字为准）
const activePowerKw = ref<number>(randomInRange(240, 280)) // 设备1 有功功率给定 动态
const acPortVoltageV = ref<number>(randomInRange(370, 390)) // 设备1 交流端口电压 动态（围绕380）
const dcInnerVoltageV = ref<number>(750)
const pvGenKw = ref<number>(360)
const batteryCurrentA = ref<number>(randomInRange(70, 85)) // 动态
const batterySoc = ref<number>(95)
const chargerPowerKw = ref<number>(516)
const loadJgsKw = ref<number>(590)
const loadXwyKw = ref<number>(460)
const controlMode = '并网模式'

// 设备2参数（独立动态）
const activePowerKw2 = ref<number>(randomInRange(240, 280))
const acPortVoltageV2 = ref<number>(randomInRange(370, 390))
const dcInnerVoltageV2 = ref<number>(750)
const controlMode2 = '并网模式'

// 定时更新随机项
let timer = setInterval(() => {
  activePowerKw.value = randomInRange(240, 280)
  acPortVoltageV.value = randomInRange(370, 390)
  activePowerKw2.value = randomInRange(240, 280)
  acPortVoltageV2.value = randomInRange(370, 390)
  batteryCurrentA.value = randomInRange(70, 85)
}, 2000)

onUnmounted(() => clearInterval(timer))

const menu = computed<MenuGroup[]>(() => ([
  {
    title: '设备1参数',
    items: [
      `控制模式设定  ${controlMode}`,
      `有功功率给定  ${activePowerKw.value}kW`,
      `交流端口电压  ${acPortVoltageV.value}V`,
      `直流内部电压  ${dcInnerVoltageV.value}V`,
    ],
  },
  {
    title: '设备2参数',
    items: [
      `控制模式设定  ${controlMode2}`,
      `有功功率给定  ${activePowerKw2.value}kW`,
      `交流端口电压  ${acPortVoltageV2.value}V`,
      `直流内部电压  ${dcInnerVoltageV2.value}V`,
    ],
  },
  {
    title: '系统参数',
    items: [
      `光伏发电功率  ${pvGenKw.value}kW`,
      `储能当前状态  放电`,
      `电池组电流  ${batteryCurrentA.value}A`,
      `电池组SOC  ${batterySoc.value}%`,
      `充电桩功率  ${chargerPowerKw.value}kW`,
      `金刚石负荷功率  ${loadJgsKw.value}kW`,
      `玄武岩负荷功率  ${loadXwyKw.value}kW`,
    ],
  },
]))
</script>

<template>
  <section class="er-root w-full overflow-hidden" :style="{ height: 'calc(100vh - 80px)' }">
    <div class="er-center-title">光储充能量路由器展示</div>
    
    <!-- 四象限布局 -->
    <div class="er-grid-layout">
      <!-- 左上角：设备1参数 -->
      <div class="er-quadrant er-top-left">
        <div class="er-title px-10px py-6px mb-20px">{{ menu[0].title }}</div>
        <div class="space-y-18px">
          <ElButton
            v-for="item in menu[0].items"
            :key="item"
            class="w-100% justify-between !bg-transparent !text-white !border-1 !border-#2b4b7e hover:!bg-#0b122a"
          >
            <span class="truncate text-left">{{ item.split('  ')[0] }}</span>
            <span class="color-#FFD84D pl-8px fw-600">{{ item.split('  ')[1] }}</span>
          </ElButton>
        </div>
      </div>

      <!-- 右上角：设备2参数 -->
      <div class="er-quadrant er-top-right">
        <div class="er-title px-10px py-6px mb-20px">{{ menu[1].title }}</div>
        <div class="space-y-18px">
          <ElButton
            v-for="item in menu[1].items"
            :key="item"
            class="w-100% justify-between !bg-transparent !text-white !border-1 !border-#2b4b7e hover:!bg-#0b122a"
          >
            <span class="truncate text-left">{{ item.split('  ')[0] }}</span>
            <span class="color-#FFD84D pl-8px fw-600">{{ item.split('  ')[1] }}</span>
          </ElButton>
        </div>
      </div>

      <!-- 中间：图片 -->
      <div class="er-center">
        <div class="w-full h-full shadow-bg flex items-center justify-center">
          <img :src="p1" class="er-image object-contain" alt="台区互联能量路由器展示图" />
        </div>
      </div>

      <!-- 左下角：系统参数 -->
      <div class="er-quadrant er-bottom-left">
        <div class="er-title px-10px py-6px mb-20px">{{ menu[2].title }}</div>
        <div class="space-y-12px">
          <ElButton
            v-for="item in menu[2].items"
            :key="item"
            class="w-100% justify-between !bg-transparent !text-white !border-1 !border-#2b4b7e hover:!bg-#0b122a"
          >
            <span class="truncate text-left">{{ item.split('  ')[0] }}</span>
            <span class="color-#FFD84D pl-8px fw-600">{{ item.split('  ')[1] }}</span>
          </ElButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.er-root {
  position: relative;
}

.er-center-title {
  position: absolute;
  left: 50%;
  top: 6px;
  transform: translateX(-50%);
  font-size: 30px;
  font-weight: 600;
  z-index: 10;
}

.er-grid-layout {
  height: calc(100% - 50px);
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr 2.5fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  padding: 20px;
}

.er-quadrant {
  padding: 16px;
  overflow-y: auto;
  z-index: 10;
  position: relative; /* z-index requires a positioning context */
  pointer-events: auto; /* Ensure quadrant is interactive */
}

.er-top-left {
  grid-column: 1;
  grid-row: 1;
}

.er-top-right {
  grid-column: 3;
  grid-row: 1;
}

.er-bottom-left {
  grid-column: 1;
  grid-row: 2;
}

.er-center {
  grid-column: 1 / 4;
  grid-row: 1 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  pointer-events: none;
}

.er-title {
  border-left: 3px solid #248FDA;
  font-weight: bold;
}

.shadow-bg {
  padding: 12px;
  width: 100%;
  height: 100%;
}

.er-image {
  max-width: 120%;
  max-height: 89%;
  object-fit: contain;

  margin-bottom: 117px;
}

.el-button {
  margin-left: 0px !important;
  font-size: 12px;
}
</style>


