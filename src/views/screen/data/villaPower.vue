<template>
  <section class="villa-board" ref="boardRef">
    <div class="villa-canvas">
      <div class="villa-layout">
        <aside class="villa-column villa-left">
          <article class="panel-block">
            <CardHeader title="项目基本信息" />
            <div class="surface-card project-base-card" :style="{ backgroundImage: `url(${leftPanelBg})` }">
              <div class="project-main">
                <img class="project-main__icon" :src="globeIcon" alt="" />
                <div>
                  <div class="project-main__label">微电网日发电总量</div>
                  <div class="project-main__value">{{ projectBase.totalCharge }}</div>
                </div>
              </div>

              <div class="project-grid">
                <div class="project-item" v-for="item in projectStats" :key="item.label">
                  <img class="project-item__icon" :src="item.icon" alt="" />
                  <div>
                    <div class="project-item__label">{{ item.label }}</div>
                    <div class="project-item__value">{{ item.value }}</div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article class="panel-block" v-for="user in users" :key="user.name">
            <CardHeader :title="user.name" />
            <div class="user-grid">
              <div class="user-row" v-for="row in user.rows" :key="`${user.name}-${row.left.label}`">
                <div class="metric-card" :class="`panel-skin-${row.left.skin}`">
                  <div class="metric-card__bg"></div>
                  <div class="metric-card__content">
                    <div class="metric-card__icon-wrap">
                      <img class="metric-card__icon" :src="row.left.icon" alt="" />
                    </div>
                    <div class="metric-card__text">
                      <div class="metric-card__label">{{ row.left.label }}</div>
                      <div class="metric-card__value">{{ row.left.value }}</div>
                    </div>
                  </div>
                </div>
                <div class="metric-card" :class="`panel-skin-${row.right.skin}`">
                  <div class="metric-card__bg"></div>
                  <div class="metric-card__content">
                    <div class="metric-card__icon-wrap">
                      <img class="metric-card__icon" :src="row.right.icon" alt="" />
                    </div>
                    <div class="metric-card__text">
                      <div class="metric-card__label">{{ row.right.label }}</div>
                      <div class="metric-card__value">{{ row.right.value }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </aside>

        <main class="villa-column villa-center">
          <article class="panel-block">
            <CardHeader title="效益分析" />
            <div class="benefit-box">
              <div class="benefit-top">
                <div class="benefit-card" v-for="item in benefitTop" :key="item.label">
                  <img class="benefit-card__bg" :src="metricCardBg" alt="" />
                  <div class="benefit-card__content">
                    <img class="benefit-card__icon" :src="item.icon" alt="" />
                    <div>
                      <div class="benefit-card__label">{{ item.label }}</div>
                      <div class="benefit-card__value">{{ item.value }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="benefit-bottom">
                <div class="benefit-brief" v-for="item in benefitBottom" :key="item.label">
                  <img class="benefit-brief__icon" :src="item.icon" alt="" />
                  <div>
                    <div class="benefit-brief__label">{{ item.label }}</div>
                    <div class="benefit-brief__value">{{ item.value }}</div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article class="panel-block villa-scene-panel">
            <div class="villa-scene-box">
              <VillaModelViewer />
            </div>
          </article>

          <article class="panel-block">
            <CardHeader title="光伏" />
            <div class="pv-grid">
              <div class="pv-row" v-for="row in pvRows" :key="row.user">
                <div class="pv-card" :class="`panel-skin-${item.skin}`" v-for="item in row.items" :key="`${row.user}-${item.label}`">
                  <div class="pv-card__bg"></div>
                  <div class="pv-card__content">
                    <div class="pv-card__icon-wrap">
                      <img class="pv-card__icon" :src="item.icon" alt="" />
                    </div>
                    <div class="pv-card__text">
                      <div class="pv-card__label">{{ item.label }}</div>
                      <div class="pv-card__value">{{ item.value }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </main>

        <aside class="villa-column villa-right">
          <article class="panel-block">
            <CardHeader title="电网数据" />
            <div class="surface-card surface-card--plain" :style="{ backgroundImage: `url(${rightPanelBg})` }">
              <div class="grid-summary">
                <div class="grid-summary__info">
                  <div class="grid-summary__label">{{ gridSummary.label }}</div>
                  <div class="grid-summary__value">{{ gridSummary.value }}</div>
                </div>
                <img class="grid-summary__icon" :src="gridTowerIcon" alt="" />
              </div>

              <div class="phase-list">
                <div class="phase-item" v-for="phase in phaseList" :key="phase.name">
                  <div class="phase-item__name">{{ phase.name }}：</div>
                  <div class="phase-item__row">
                    <img class="phase-item__bg" :src="phasePillBg" alt="" />
                    <div class="phase-item__content">
                      <div class="phase-item__detail">{{ phase.value }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article class="panel-block">
            <CardHeader title="充电桩" />
            <div class="surface-card charge-box" :style="{ backgroundImage: `url(${rightPanelBg})` }">
              <img class="charge-box__icon" :src="chargingIcon" alt="" />
              <ul class="right-list">
                <li v-for="item in chargeList" :key="item">{{ item }}</li>
              </ul>
            </div>
          </article>

          <article class="panel-block">
            <CardHeader title="电池" />
            <div class="surface-card battery-box" :style="{ backgroundImage: `url(${rightPanelBg})` }">
              <ul class="right-list">
                <li v-for="item in batteryList" :key="item">{{ item }}</li>
              </ul>
              <img class="battery-box__icon" :src="bigBatteryIcon" alt="" />
            </div>
          </article>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { getPanelData } from '@/services/services/IotReportController'
import { useProjectStore } from '@/store/modules/project'

import CardHeader from '@/views/screen/components/CardHeader.vue'
import VillaModelViewer from '@/views/screen/components/VillaModelViewer.vue'

import metricCardBg from '@/views/screen/assets/villa_power/pics/图层 97 拷贝@2x.png'
import phasePillBg from '@/views/screen/assets/villa_power/pics/图层 99@2x.png'
import leftPanelBg from '@/views/screen/assets/villa_power/pics/图层 100@2x.png'
import rightPanelBg from '@/views/screen/assets/villa_power/pics/图层 128@2x.png'

import moneyIcon from '@/views/screen/assets/villa_power/pics/图层 103@2x.png'
import batteryPowerIcon from '@/views/screen/assets/villa_power/pics/图层 117@2x.png'
import leafSlashIcon from '@/views/screen/assets/villa_power/pics/图层 107@2x.png'
import globeIcon from '@/views/screen/assets/villa_power/pics/图层 116@2x.png'
import leafIcon from '@/views/screen/assets/villa_power/pics/图层 119@2x.png'
import plugBatteryIcon from '@/views/screen/assets/villa_power/pics/图层 120@2x.png'
import waveIcon from '@/views/screen/assets/villa_power/pics/图层 121@2x.png'
import gaugeIcon from '@/views/screen/assets/villa_power/pics/图层 90@2x.png'
import batteryOutlineIcon from '@/views/screen/assets/villa_power/pics/图层 89@2x.png'
import chargingIcon from '@/views/screen/assets/villa_power/pics/图层 91@2x.png'
import bigBatteryIcon from '@/views/screen/assets/villa_power/pics/图层 92@2x.png'
import gridTowerIcon from '@/views/screen/assets/villa_power/pics/图层 93@2x.png'
import shieldIcon from '@/views/screen/assets/villa_power/pics/图层 94@2x.png'
import smallBatteryIcon from '@/views/screen/assets/villa_power/pics/图层 123@2x.png'
import smallBatteryDarkIcon from '@/views/screen/assets/villa_power/pics/图层 127@2x.png'
import ampereBlueIcon from '@/views/screen/assets/villa_power/pics/图层 125@2x.png'
import ampereTealIcon from '@/views/screen/assets/villa_power/pics/图层 126@2x.png'

defineOptions({ name: 'ScreenDataVillaPower' })

type PanelSkin = 'blue' | 'teal'

type MetricCell = {
  label: string
  value: string
  icon: string
  skin: PanelSkin
}

type UserBlock = {
  name: string
  rows: {
    left: MetricCell
    right: MetricCell
  }[]
}

type PVBlock = {
  user: string
  items: MetricCell[]
}

type PanelData = Record<string, unknown>

const boardRef = ref<HTMLElement>()
const scale = ref(1)
const keyValue = ref<PanelData>({})
const projectStore = useProjectStore()
let refreshTimer: ReturnType<typeof setInterval> | undefined

const DESIGN_WIDTH = 1920
// 设计稿是 1920x1080，顶部系统栏约 80px，不在当前内容区域内。
const DESIGN_HEIGHT = 1000

const getRawValue = (key: string): unknown => keyValue.value[key]

const isEmptyValue = (value: unknown): boolean => {
  return value === null || value === undefined || (typeof value === 'string' && value.trim() === '')
}

const hasUnit = (value: string): boolean => {
  return /[a-zA-Z%]|分钟|小时|天|年|元|度|瓦|伏|安/.test(value)
}

const formatNumber = (value: number): string => {
  return value.toFixed(2).replace(/\.?0+$/, '')
}

const formatValue = (value: unknown, unit = '', defaultValue = '-'): string => {
  if (isEmptyValue(value)) {
    return defaultValue
  }
  const text = String(value).trim()
  if (!text) {
    return defaultValue
  }
  if (text === '-' || text.toUpperCase() === 'NULL') {
    return text
  }
  if (hasUnit(text)) {
    return text
  }
  const numericValue = Number(text)
  if (!Number.isFinite(numericValue)) {
    return unit ? `${text}${unit}` : text
  }
  return `${formatNumber(numericValue)}${unit}`
}

const getText = (key: string, defaultValue = '-'): string => {
  return formatValue(getRawValue(key), '', defaultValue)
}

const getValueWithUnit = (key: string, unit: string, defaultValue = '-'): string => {
  return formatValue(getRawValue(key), unit, defaultValue)
}

const formatPhaseValue = (phase: 'A' | 'B' | 'C'): string => {
  return `电流：${getValueWithUnit(`${phase}相电流`, 'A')}  电压：${getValueWithUnit(`${phase}相电压`, 'V')}  有功功率：${getValueWithUnit(`${phase}相有功功率`, 'kW')}`
}

const fetchPanelData = async () => {
  const projectId = projectStore.projectInfo?.id
  if (!projectId) {
    keyValue.value = {}
    return
  }
  try {
    const res = await getPanelData({
      key: 'villaPower',
      projectId,
    })
    keyValue.value = (res.data || {}) as PanelData
  } catch (error) {
    console.error('获取别墅看板数据失败', error)
  }
}

const projectBase = computed(() => ({
  totalCharge: getValueWithUnit('微电网日发电总量', 'kWh')
}))

const projectStats = computed<MetricCell[]>(() => [
  { label: '中压电网侧', value: getText('电压等级'), icon: batteryPowerIcon, skin: 'blue' },
  { label: '日节电量', value: getValueWithUnit('日节电量', 'kWh'), icon: leafIcon, skin: 'teal' },
  { label: '光伏容量', value: getText('光伏容量'), icon: batteryOutlineIcon, skin: 'blue' },
  { label: '储能容量', value: getText('储能容量'), icon: plugBatteryIcon, skin: 'teal' },
  { label: '直流充电桩容量', value: getText('直流充电桩容量'), icon: chargingIcon, skin: 'blue' },
  { label: '电网容量', value: getText('电网容量'), icon: gridTowerIcon, skin: 'teal' }
])

const users = computed<UserBlock[]>(() => [
  {
    name: '用户1',
    rows: [
      {
        left: { label: '光伏容量', value: getText('用户1光伏容量'), icon: smallBatteryIcon, skin: 'blue' },
        right: {
          label: '光伏实时功率',
          value: getValueWithUnit('用户1光伏实时功率', 'kW'),
          icon: waveIcon,
          skin: 'teal'
        }
      },
      {
        left: { label: '充电桩容量', value: getText('用户1充电桩容量'), icon: smallBatteryDarkIcon, skin: 'blue' },
        right: {
          label: '充电实时功率',
          value: getValueWithUnit('用户1充电实时功率', 'kW'),
          icon: ampereBlueIcon,
          skin: 'teal'
        }
      },
      {
        left: { label: '储能容量', value: getText('用户1储能容量'), icon: smallBatteryIcon, skin: 'blue' },
        right: {
          label: '储能实时功率',
          value: getValueWithUnit('用户1储能实时功率', 'kW'),
          icon: gaugeIcon,
          skin: 'teal'
        }
      }
    ]
  },
  {
    name: '用户2',
    rows: [
      {
        left: { label: '光伏容量', value: getText('用户2光伏容量'), icon: smallBatteryIcon, skin: 'blue' },
        right: {
          label: '光伏实时功率',
          value: getValueWithUnit('用户2光伏实时功率', 'kW'),
          icon: waveIcon,
          skin: 'teal'
        }
      },
      {
        left: { label: '充电桩容量', value: getText('用户2充电桩容量'), icon: smallBatteryDarkIcon, skin: 'blue' },
        right: {
          label: '充电实时功率',
          value: getValueWithUnit('用户2充电实时功率', 'kW'),
          icon: ampereTealIcon,
          skin: 'teal'
        }
      },
      {
        left: { label: '储能容量', value: getText('用户2储能容量'), icon: smallBatteryIcon, skin: 'blue' },
        right: {
          label: '储能实时功率',
          value: getValueWithUnit('用户2储能实时功率', 'kW'),
          icon: gaugeIcon,
          skin: 'teal'
        }
      }
    ]
  }
])

const benefitTop = computed(() => [
  { label: '发电量', value: getValueWithUnit('微电网日发电总量', 'kWh'), icon: batteryPowerIcon },
  { label: '节省金额', value: getValueWithUnit('节省金额', '元'), icon: moneyIcon },
  { label: '减碳量', value: getValueWithUnit('减碳量', 'kg'), icon: leafIcon }
])

const benefitBottom = computed(() => [
  { label: '当年峰谷时长', value: getText('当年停电时长'), icon: leafSlashIcon },
  { label: '供电可靠性', value: getText('供电可靠性'), icon: shieldIcon }
])

const pvRows = computed<PVBlock[]>(() => [
  {
    user: '用户1',
    items: [
      { label: '用户1发电量', value: getValueWithUnit('用户1发电量', 'kWh'), icon: smallBatteryDarkIcon, skin: 'blue' },
      { label: '用户1光伏电流', value: getValueWithUnit('用户1光伏电流', 'A'), icon: ampereTealIcon, skin: 'teal' },
      { label: '用户1光伏电压', value: getValueWithUnit('用户1光伏电压', 'V'), icon: gaugeIcon, skin: 'blue' },
      { label: '漏网光伏电压', value: getValueWithUnit('薄膜光伏电压', 'V'), icon: ampereBlueIcon, skin: 'teal' }
    ]
  },
  {
    user: '用户2',
    items: [
      { label: '用户2发电量', value: getValueWithUnit('用户2发电量', 'kWh'), icon: smallBatteryDarkIcon, skin: 'blue' },
      { label: '用户2光伏电流', value: getValueWithUnit('用户2光伏电流', 'A'), icon: ampereBlueIcon, skin: 'teal' },
      { label: '用户2光伏电压', value: getValueWithUnit('用户2光伏电压', 'V'), icon: gaugeIcon, skin: 'blue' },
      { label: '漏网光伏电流', value: getValueWithUnit('薄膜光伏电流', 'A'), icon: ampereTealIcon, skin: 'teal' }
    ]
  }
])

const gridSummary = computed(() => ({
  label: '三相总有功功率',
  value: getValueWithUnit('三相总有功功率', 'kW')
}))

const phaseList = computed(() => [
  { name: 'A相电网', value: formatPhaseValue('A') },
  { name: 'B相电网', value: formatPhaseValue('B') },
  { name: 'C相电网', value: formatPhaseValue('C') }
])

const chargeList = computed(() => [
  `充电总功率：${getValueWithUnit('充电桩功率', 'kW')}`,
  `充电电电压：${getValueWithUnit('充电桩电压', 'V')}`,
  `充电电电流：${getValueWithUnit('充电桩电流', 'A')}`,
  `充电桩功率：${getValueWithUnit('充电桩功率', 'kW')}`
])

const batteryList = computed(() => [
  `电池电压：${getValueWithUnit('电池电压', 'V')}`,
  `电池电流：${getValueWithUnit('电池电流', 'A')}`,
  `电池soc：${getValueWithUnit('电池soc', '%')}`
])

const updateScale = () => {
  if (!boardRef.value) {
    return
  }
  const { width, height } = boardRef.value.getBoundingClientRect()
  const nextScale = Math.min(width / DESIGN_WIDTH, height / DESIGN_HEIGHT)
  scale.value = Number.isFinite(nextScale) && nextScale > 0 ? nextScale : 1
}

useResizeObserver(boardRef, updateScale)

watch(
  () => projectStore.projectInfo?.id,
  () => {
    void fetchPanelData()
  },
  { immediate: true }
)

onMounted(() => {
  updateScale()
  window.addEventListener('resize', updateScale)
  refreshTimer = setInterval(() => {
    void fetchPanelData()
  }, 5000)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScale)
  if (refreshTimer) {
    clearInterval(refreshTimer)
  }
})
</script>

<style scoped lang="scss">
.villa-board {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #d7e5ff;
  background: #090f24;
}

.villa-canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1920px;
  height: 1000px;
  transform: translate(-50%, -50%) scale(v-bind(scale));
  transform-origin: center center;
}

.villa-layout {
  display: grid;
  grid-template-columns: 495px minmax(0, 1fr) 430px;
  gap: 22px;
  height: 100%;
  padding: 20px 24px;
  box-sizing: border-box;
}

.villa-column {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
}

.surface-card {
  position: relative;
  min-height: 0;
  padding: 12px;
  border: 1px solid rgba(34, 120, 203, 0.55);
  box-shadow: inset 0 0 24px rgba(18, 115, 210, 0.35);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.surface-card--plain {
  border: none;
  box-shadow: none;
}

.project-base-card {
  height: 290px;
}

.project-main {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 0 10px;
  border-bottom: 1px solid rgba(75, 166, 255, 0.4);
}

.project-main__icon {
  width: 62px;
  height: 62px;
  object-fit: contain;
}

.project-main__label {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.2;
}

.project-main__value {
  margin-top: 4px;
  color: #f2fe3f;
  font-size: 30px;
  font-weight: 700;
  font-family: 'YouSheBiaoTiHei', sans-serif;
}

.project-grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.project-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border: 1px solid rgba(48, 127, 201, 0.5);
  background: rgba(6, 36, 76, 0.7);
}

.project-item__icon {
  width: 34px;
  height: 34px;
  object-fit: contain;
}

.project-item__label {
  font-size: 12px;
  color: #9ac8ff;
}

.project-item__value {
  margin-top: 2px;
  font-size: 18px;
  font-weight: 600;
  font-family: 'YouSheBiaoTiHei', sans-serif;
  color: #40dbff;
}

.user-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.villa-left > .panel-block:not(:first-child) {
  height: calc((542px - 14px) / 2);
  display: flex;
  flex-direction: column;
}

.villa-left > .panel-block:not(:first-child) .user-grid {
  flex: 1;
  min-height: 0;
}

.user-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  flex: 1;
  min-height: 0;
}

.metric-card {
  position: relative;
  height: 100%;
  min-height: 0;
}

.metric-card__bg,
.pv-card__bg {
  position: absolute;
  inset: 0;
}

.panel-skin-blue .metric-card__bg,
.panel-skin-blue .pv-card__bg {
  border-left: 3px solid rgba(30, 188, 161, 1);
  background-color: rgba(30, 188, 161, 0.1);
}

.panel-skin-teal .metric-card__bg,
.panel-skin-teal .pv-card__bg {
  border-left: 3px solid rgba(25, 164, 255, 1);
  background-color: rgba(25, 164, 255, 0.1);
}

.metric-card__content,
.pv-card__content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100%;
  padding: 0 10px 0 5px;
  box-sizing: border-box;
}

.metric-card__icon-wrap,
.pv-card__icon-wrap {
  width: 52px;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.panel-skin-blue .metric-card__icon-wrap,
.panel-skin-blue .pv-card__icon-wrap {
  background-color: rgba(1, 206, 220, 0.2);
}

.panel-skin-teal .metric-card__icon-wrap,
.panel-skin-teal .pv-card__icon-wrap {
  background-color: rgba(25, 164, 255, 0.2);
}

.metric-card__icon {
  width: 34px;
  height: 34px;
  object-fit: contain;
}

.metric-card__text,
.pv-card__text {
  min-width: 0;
}

.metric-card__label,
.pv-card__label {
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.panel-skin-blue .metric-card__label,
.panel-skin-blue .pv-card__label {
  color: rgba(30, 188, 161, 1);
}

.panel-skin-teal .metric-card__label,
.panel-skin-teal .pv-card__label {
  color: rgba(25, 164, 255, 1);
}

.metric-card__value {
  margin-top: 2px;
  font-size: 22px;
  line-height: 1.15;
  font-weight: 600;
  color: #d8f6ff;
  font-family: 'YouSheBiaoTiHei', sans-serif;
}

.benefit-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.benefit-top {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.benefit-card {
  position: relative;
  min-height: 80px;
}

.benefit-card__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.benefit-card__content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100%;
  padding: 10px 12px;
  box-sizing: border-box;
}

.benefit-card__icon {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.benefit-card__label {
  font-size: 12px;
  color: #9ccfff;
}

.benefit-card__value {
  margin-top: 4px;
  font-size: 28px;
  line-height: 1.1;
  font-weight: 600;
  color: #f2fe3f;
  font-family: 'YouSheBiaoTiHei', sans-serif;
}

.benefit-bottom {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.benefit-brief {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid rgba(43, 123, 201, 0.5);
  background: rgba(9, 38, 76, 0.65);
}

.benefit-brief__icon {
  width: 34px;
  height: 34px;
  object-fit: contain;
}

.benefit-brief__label {
  font-size: 12px;
  color: #8fc6ff;
}

.benefit-brief__value {
  margin-top: 2px;
  font-size: 26px;
  line-height: 1.1;
  font-weight: 600;
  color: #f2fe3f;
  font-family: 'YouSheBiaoTiHei', sans-serif;
}

.villa-scene-panel {
  flex: 1;
  min-height: 0;
}

.villa-scene-box {
  height: 100%;
  border: 1px solid rgba(43, 127, 204, 0.55);
  box-shadow: inset 0 0 30px rgba(12, 119, 212, 0.22);
  background: rgba(5, 19, 45, 0.8);
  padding: 6px;
  box-sizing: border-box;
}

.pv-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pv-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}

.pv-card {
  position: relative;
  min-height: 82px;
}

.pv-card__icon {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.pv-card__value {
  margin-top: 2px;
  font-size: 20px;
  line-height: 1.15;
  font-weight: 600;
  color: #dff7ff;
  font-family: 'YouSheBiaoTiHei', sans-serif;
}

.grid-summary {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  margin-bottom: 12px;
}

.grid-summary__info {
  min-width: 0;
  text-align: right;
}

.grid-summary__icon {
  width: 95px;
  height: 95px;
  object-fit: contain;
}

.grid-summary__label {
  font-size: 14px;
  color: #cfe8ff;
}

.grid-summary__value {
  margin-top: 4px;
  font-size: 29px;
  line-height: 1.1;
  color: #f2fe3f;
  font-weight: 600;
  font-family: 'YouSheBiaoTiHei', sans-serif;
}

.phase-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.phase-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.phase-item__row {
  position: relative;
  width: 100%;
  min-height: 24px;
  display: flex;
  align-items: center;
}

.phase-item__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.phase-item__content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  min-height: 24px;
  padding: 0 14px;
  box-sizing: border-box;
  font-size: 13px;
  line-height: 1.2;
  color: #b6ddff;
}

.phase-item__name {
  color: #e8f7ff;
  font-weight: 600;
}

.phase-item__detail {
  white-space: nowrap;
}

.charge-box,
.battery-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 188px;
}

.charge-box__icon {
  width: 118px;
  height: 118px;
  object-fit: contain;
  margin-right: 8px;
}

.battery-box__icon {
  width: 128px;
  height: 128px;
  object-fit: contain;
  margin-left: 8px;
}

.right-list {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 13px;
  line-height: 2;
  color: #bde0ff;
}

.right-list li {
  white-space: nowrap;
}
</style>
