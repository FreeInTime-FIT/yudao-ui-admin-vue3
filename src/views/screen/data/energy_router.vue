<script setup lang="ts">
import p1 from '@/views/screen/assets/realtime_fork/energy.png'

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

// 设备1参数（动态数据）
const device1Voltage = ref<number>(randomInRange(375, 385)) // 台区电压 动态
const device1Power = ref<number>(randomInRange(590, 610)) // 台区功率 动态
const device1DcVoltage = ref<number>(randomInRange(705, 715)) // 直流端口电压 动态
const device1DcPower = ref<number>(randomInRange(135, 145)) // 直流交换功率 动态
const device1Status = '并网'

// 设备2参数（动态数据）
const device2Voltage = ref<number>(randomInRange(375, 385)) // 台区电压 动态
const device2Power = ref<number>(randomInRange(60, 68)) // 台区功率 动态
const device2DcVoltage = ref<number>(randomInRange(705, 715)) // 直流端口电压 动态
const device2DcPower = ref<number>(randomInRange(-145, -135)) // 直流交换功率 动态（负值）
const device2Status = '并网'

// 系统1参数（动态数据）
const pvPower = ref<number>(randomInRange(315, 325)) // 光伏发电功率 动态
const batteryPower = ref<number>(randomInRange(380, 395)) // 液流电池负荷功率 动态

// 系统2参数（动态数据）
const buildingLoad = ref<number>(randomInRange(62, 70)) // 综合楼负荷功率 动态
const researchLoad = ref<number>(randomInRange(48, 56)) // 科研中心负荷 动态
const diamondLoad = ref<number>(randomInRange(84, 92)) // 金刚石建筑负荷 动态

// 定时更新随机项
let timer = setInterval(() => {
  device1Voltage.value = randomInRange(375, 385)
  device1Power.value = randomInRange(590, 610)
  device1DcVoltage.value = randomInRange(705, 715)
  device1DcPower.value = randomInRange(135, 145)
  
  device2Voltage.value = randomInRange(375, 385)
  device2Power.value = randomInRange(60, 68)
  device2DcVoltage.value = randomInRange(705, 715)
  device2DcPower.value = randomInRange(-145, -135)
  
  pvPower.value = randomInRange(315, 325)
  batteryPower.value = randomInRange(380, 395)
  
  buildingLoad.value = randomInRange(62, 70)
  researchLoad.value = randomInRange(48, 56)
  diamondLoad.value = randomInRange(84, 92)
}, 2000)

onUnmounted(() => clearInterval(timer))

const menu = computed<MenuGroup[]>(() => ([
  {
    title: '设备1参数',
    items: [
      `运行状态  ${device1Status}`,
      `台区电压  ${device1Voltage.value}V`,
      `台区功率  ${device1Power.value}kW`,
      `直流端口电压  ${device1DcVoltage.value}V`,
      `直流交换功率  ${device1DcPower.value}kW`,
    ],
  },
  {
    title: '设备2参数',
    items: [
      `运行状态  ${device2Status}`,
      `台区电压  ${device2Voltage.value}V`,
      `台区功率  ${device2Power.value}kW`,
      `直流端口电压  ${device2DcVoltage.value}V`,
      `直流交换功率  ${device2DcPower.value}kW`,
    ],
  },
  {
    title: '系统1参数',
    items: [
      `光伏发电功率  ${pvPower.value}kW`,
      `液流电池负荷功率  ${batteryPower.value}kW`,
    ],
  },
  {
    title: '系统2参数',
    items: [
      `综合楼负荷功率  ${buildingLoad.value}kW`,
      `科研中心负荷  ${researchLoad.value}kW`,
      `金刚石建筑负荷  ${diamondLoad.value}kW`,
    ],
  },
]))
</script>

<template>
  <section class="er-root w-full overflow-hidden" :style="{ height: 'calc(100vh - 80px)' }">
    <div class="er-center-title">台区互联能量路由器展示</div>
    
    <!-- 四象限布局 -->
    <div class="er-grid-layout">
      <!-- 左上角：设备1参数 -->
      <div class="er-quadrant er-top-left">
        <div class="er-title px-10px py-6px mb-20px">{{ menu[0].title }}</div>
        <div class="space-y-12px">
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
        <div class="space-y-12px">
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

      <!-- 左下角：系统1参数 -->
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

      <!-- 右下角：系统2参数 -->
      <div class="er-quadrant er-bottom-right">
        <div class="er-title px-10px py-6px mb-20px">{{ menu[3].title }}</div>
        <div class="space-y-12px">
          <ElButton
            v-for="item in menu[3].items"
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
  position: relative;
  pointer-events: auto;
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

.er-bottom-right {
  grid-column: 3;
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
  max-height: 95%;
  object-fit: contain;
}

.el-button {
  margin-left: 0px !important;
  font-size: 12px;
}
</style>
