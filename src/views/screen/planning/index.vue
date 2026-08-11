<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { computed, onBeforeUnmount, reactive, ref } from 'vue'
import PlanningChart from './components/PlanningChart.vue'
import {
  DEFAULT_PARAMETERS,
  HOURS,
  PLANNING_BRANCHES,
  PLANNING_NODES,
  STORAGE_PROFILES,
  baselineVoltageSeries,
  branchLoadingAt,
  estimatedLossAt,
  exclusiveDispatch,
  loadProfile,
  totalReactiveLoadMvar,
  totalRealLoadMw,
  voltageSeries,
  type Phase,
  type PlanningNode,
  type StorageProfile
} from './demoData'

defineOptions({ name: 'ScreenPlanningDemo' })

type Workbench = 'power' | 'parameters' | 'optimization' | 'strategy'

const workbenches: Array<{ id: Workbench; label: string; description: string; icon: string }> = [
  { id: 'power', label: '潮流计算', description: '节点电压与支路负载', icon: 'ep:connection' },
  { id: 'parameters', label: '规划参数', description: '投资与运行边界', icon: 'ep:setting' },
  { id: 'optimization', label: '储能配置', description: '容量与位置推荐', icon: 'ep:operation' },
  { id: 'strategy', label: '充放电策略', description: '典型日调度曲线', icon: 'ep:data-line' }
]

const phaseColors: Record<Phase, string> = {
  A: '#32b8d8',
  B: '#a7bf49',
  C: '#c28be8'
}

const activeWorkbench = ref<Workbench>('power')
const selectedHour = ref(18)
const selectedNodeId = ref(9)
const selectedStorageId = ref('ESS-14')
const selectedAreas = ref<number[]>(
  PLANNING_NODES.filter((node) => node.loadMw > 0).map((node) => node.id)
)
const flowCalculated = ref(false)
const optimizationCalculated = ref(false)
const flowRunning = ref(false)
const optimizationRunning = ref(false)
const lastCalculatedAt = ref('尚未运行')
const parameters = reactive({ ...DEFAULT_PARAMETERS })
let pendingTimer: number | undefined

const formatNumber = (value: number, digits = 2) =>
  value.toLocaleString('zh-CN', { maximumFractionDigits: digits })

const hourLabel = (hour: number) => `${String(hour).padStart(2, '0')}:00`

const nodeById = (id: number) => PLANNING_NODES.find((node) => node.id === id) as PlanningNode

const selectedNode = computed(() => nodeById(selectedNodeId.value))
const selectedProfile = computed(
  () =>
    STORAGE_PROFILES.find((profile) => profile.id === selectedStorageId.value) ||
    STORAGE_PROFILES[0]
)
const selectedDispatch = computed(() => exclusiveDispatch(selectedProfile.value))

const voltageByPhase = computed(() => ({
  A: voltageSeries(selectedNodeId.value, 'A'),
  B: voltageSeries(selectedNodeId.value, 'B'),
  C: voltageSeries(selectedNodeId.value, 'C')
}))

const selectedPhaseVoltages = computed(() =>
  (Object.keys(phaseColors) as Phase[]).map((phase) => ({
    phase,
    value: voltageByPhase.value[phase][selectedHour.value]
  }))
)

const selectedAverageVoltage = computed(
  () => selectedPhaseVoltages.value.reduce((sum, item) => sum + item.value, 0) / 3
)

const systemVoltageValues = computed(() =>
  PLANNING_NODES.flatMap((node) =>
    (Object.keys(phaseColors) as Phase[]).map(
      (phase) => voltageSeries(node.id, phase)[selectedHour.value]
    )
  )
)

const voltageMinimum = computed(() => Math.min(...systemVoltageValues.value))
const voltageMaximum = computed(() => Math.max(...systemVoltageValues.value))
const voltageViolationCount = computed(
  () =>
    systemVoltageValues.value.filter(
      (value) => value < parameters.voltageLowerLimit || value > parameters.voltageUpperLimit
    ).length
)

const branchRows = computed(() =>
  PLANNING_BRANCHES.map((branch) => {
    const loading = branchLoadingAt(branch, selectedHour.value)
    return {
      ...branch,
      loading,
      flowMw: loading * branch.ratingMw
    }
  }).sort((left, right) => right.loading - left.loading)
)

const totalLossMw = computed(() =>
  PLANNING_NODES.reduce((sum, node) => sum + estimatedLossAt(node.id, selectedHour.value), 0)
)

const activeRecommendations = computed(() =>
  STORAGE_PROFILES.filter((profile) => selectedAreas.value.includes(profile.nodeId))
)

const recommendationCapacity = computed(() =>
  activeRecommendations.value.reduce((sum, profile) => sum + profile.capacityKwh, 0)
)

const recommendationPower = computed(() =>
  activeRecommendations.value.reduce((sum, profile) => sum + profile.powerKw, 0)
)

const riskNodeIds = computed(() =>
  PLANNING_NODES.filter((node) => {
    const phases = (Object.keys(phaseColors) as Phase[]).map(
      (phase) => voltageSeries(node.id, phase)[selectedHour.value]
    )
    return phases.some(
      (value) => value < parameters.voltageLowerLimit || value > parameters.voltageUpperLimit
    )
  }).map((node) => node.id)
)

const postOptimizationRisk = computed(() =>
  Math.max(0, riskNodeIds.value.length - activeRecommendations.value.length)
)

const investmentEstimate = computed(
  () => recommendationCapacity.value * parameters.investmentCostPerKwh
)

const annualOperationCost = computed(
  () => recommendationCapacity.value * parameters.operationCostPerKwh
)

const voltageChartOption = computed<EChartsOption>(() => ({
  animationDuration: 260,
  color: [phaseColors.A, phaseColors.B, phaseColors.C],
  tooltip: { trigger: 'axis', valueFormatter: (value) => `${Number(value).toFixed(4)} pu` },
  legend: { top: 4, right: 8, textStyle: { color: '#aebbd1' } },
  grid: { left: 54, right: 24, top: 42, bottom: 38 },
  xAxis: {
    type: 'category',
    data: HOURS.map(hourLabel),
    axisLine: { lineStyle: { color: '#52627d' } },
    axisLabel: { color: '#92a2ba', interval: 2 }
  },
  yAxis: {
    type: 'value',
    min: 0.88,
    max: 1.08,
    splitNumber: 5,
    axisLabel: { color: '#92a2ba', formatter: '{value} pu' },
    splitLine: { lineStyle: { color: 'rgba(126, 151, 190, 0.14)' } }
  },
  series: (Object.keys(phaseColors) as Phase[]).map((phase) => ({
    name: `${phase}相`,
    type: 'line',
    showSymbol: false,
    smooth: 0.2,
    lineStyle: { width: 2 },
    data: voltageByPhase.value[phase],
    markLine: {
      silent: true,
      symbol: 'none',
      label: { color: '#d7deea', formatter: '{b}' },
      lineStyle: { type: 'dashed', width: 1 },
      data:
        phase === 'A'
          ? [
              {
                name: '上限',
                yAxis: parameters.voltageUpperLimit,
                lineStyle: { color: '#e36a78' }
              },
              { name: '下限', yAxis: parameters.voltageLowerLimit, lineStyle: { color: '#e4a957' } }
            ]
          : []
    }
  }))
}))

const voltageSetOption = computed<EChartsOption>(() => ({
  color: ['#48a8e8'],
  tooltip: { trigger: 'axis', valueFormatter: (value) => `${Number(value).toFixed(3)} pu` },
  grid: { left: 54, right: 24, top: 24, bottom: 38 },
  xAxis: {
    type: 'category',
    data: HOURS.map(hourLabel),
    axisLine: { lineStyle: { color: '#52627d' } },
    axisLabel: { color: '#92a2ba', interval: 2 }
  },
  yAxis: {
    type: 'value',
    min: 0.94,
    max: 1.06,
    axisLabel: { color: '#92a2ba', formatter: '{value} pu' },
    splitLine: { lineStyle: { color: 'rgba(126, 151, 190, 0.14)' } }
  },
  series: [
    {
      name: '电压设定值',
      type: 'line',
      showSymbol: false,
      areaStyle: { color: 'rgba(72, 168, 232, 0.12)' },
      lineStyle: { width: 2 },
      data: HOURS.map(() => 1)
    }
  ]
}))

const dispatchChartOption = computed<EChartsOption>(() => ({
  color: ['#3d8fea', '#e5686f'],
  tooltip: { trigger: 'axis', valueFormatter: (value) => `${Number(value).toFixed(2)} kW` },
  legend: { top: 4, right: 8, textStyle: { color: '#aebbd1' } },
  grid: { left: 58, right: 24, top: 42, bottom: 38 },
  xAxis: {
    type: 'category',
    data: HOURS.map(hourLabel),
    axisLine: { lineStyle: { color: '#52627d' } },
    axisLabel: { color: '#92a2ba', interval: 2 }
  },
  yAxis: {
    type: 'value',
    name: 'kW',
    nameTextStyle: { color: '#92a2ba' },
    axisLabel: { color: '#92a2ba' },
    splitLine: { lineStyle: { color: 'rgba(126, 151, 190, 0.14)' } }
  },
  series: [
    { name: '充电', type: 'bar', barMaxWidth: 12, data: selectedDispatch.value.charge },
    { name: '放电', type: 'bar', barMaxWidth: 12, data: selectedDispatch.value.discharge }
  ]
}))

const socChartOption = computed<EChartsOption>(() => ({
  color: ['#b686e4'],
  tooltip: { trigger: 'axis', valueFormatter: (value) => `${Number(value).toFixed(1)} kWh` },
  grid: { left: 58, right: 24, top: 28, bottom: 38 },
  xAxis: {
    type: 'category',
    data: HOURS.map(hourLabel),
    axisLine: { lineStyle: { color: '#52627d' } },
    axisLabel: { color: '#92a2ba', interval: 2 }
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: selectedProfile.value.capacityKwh,
    axisLabel: { color: '#92a2ba', formatter: '{value} kWh' },
    splitLine: { lineStyle: { color: 'rgba(126, 151, 190, 0.14)' } }
  },
  series: [
    {
      name: 'SOC',
      type: 'line',
      showSymbol: false,
      smooth: 0.22,
      lineStyle: { width: 2 },
      areaStyle: { color: 'rgba(182, 134, 228, 0.14)' },
      data: selectedProfile.value.soc
    }
  ]
}))

const comparisonChartOption = computed<EChartsOption>(() => ({
  color: ['#71829b', '#35b5d4'],
  tooltip: { trigger: 'axis', valueFormatter: (value) => `${Number(value).toFixed(4)} pu` },
  legend: { top: 4, right: 8, textStyle: { color: '#aebbd1' } },
  grid: { left: 54, right: 24, top: 42, bottom: 38 },
  xAxis: {
    type: 'category',
    data: HOURS.map(hourLabel),
    axisLine: { lineStyle: { color: '#52627d' } },
    axisLabel: { color: '#92a2ba', interval: 2 }
  },
  yAxis: {
    type: 'value',
    min: 0.88,
    max: 1.04,
    axisLabel: { color: '#92a2ba', formatter: '{value} pu' },
    splitLine: { lineStyle: { color: 'rgba(126, 151, 190, 0.14)' } }
  },
  series: [
    {
      name: '规划前',
      type: 'line',
      showSymbol: false,
      lineStyle: { width: 1.5, type: 'dashed' },
      data: baselineVoltageSeries(selectedProfile.value.nodeId, 'A')
    },
    {
      name: '规划后',
      type: 'line',
      showSymbol: false,
      smooth: 0.2,
      lineStyle: { width: 2 },
      data: voltageSeries(selectedProfile.value.nodeId, 'A')
    }
  ]
}))

const criticalScheduleRows = computed(() =>
  HOURS.map((hour) => ({
    hour,
    charge: selectedDispatch.value.charge[hour],
    discharge: selectedDispatch.value.discharge[hour],
    soc: selectedProfile.value.soc[hour]
  }))
    .sort(
      (left, right) =>
        Math.max(right.charge, right.discharge) - Math.max(left.charge, left.discharge)
    )
    .slice(0, 8)
    .sort((left, right) => left.hour - right.hour)
)

const runPowerFlow = () => {
  flowRunning.value = true
  if (pendingTimer) window.clearTimeout(pendingTimer)
  const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 420
  pendingTimer = window.setTimeout(() => {
    flowCalculated.value = true
    flowRunning.value = false
    lastCalculatedAt.value = new Date().toLocaleTimeString('zh-CN', { hour12: false })
  }, delay)
}

const runOptimization = () => {
  optimizationRunning.value = true
  if (pendingTimer) window.clearTimeout(pendingTimer)
  const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 520
  pendingTimer = window.setTimeout(() => {
    optimizationCalculated.value = true
    optimizationRunning.value = false
    lastCalculatedAt.value = new Date().toLocaleTimeString('zh-CN', { hour12: false })
  }, delay)
}

const resetParameters = () => Object.assign(parameters, DEFAULT_PARAMETERS)

const selectRiskNode = () => {
  selectedNodeId.value = riskNodeIds.value[0] || 1
}

const nodeVoltage = (nodeId: number) => {
  const values = (Object.keys(phaseColors) as Phase[]).map(
    (phase) => voltageSeries(nodeId, phase)[selectedHour.value]
  )
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

const nodeClass = (nodeId: number) => ({
  selected: nodeId === selectedNodeId.value,
  risk: riskNodeIds.value.includes(nodeId),
  storage: STORAGE_PROFILES.some((profile) => profile.nodeId === nodeId)
})

const statusText = (nodeId: number) => {
  if (!flowCalculated.value) return '待计算'
  return `${nodeVoltage(nodeId).toFixed(4)} pu`
}

onBeforeUnmount(() => {
  if (pendingTimer) window.clearTimeout(pendingTimer)
})
</script>

<template>
  <section class="planning-workspace">
    <header class="workspace-header">
      <div>
        <div class="title-line">
          <h1>台区微电网规划</h1>
        </div>
        <p>基于典型日数据的潮流校核、储能规划与运行策略展示</p>
      </div>
    </header>

    <nav class="workbench-nav" aria-label="规划工作台">
      <button
        v-for="item in workbenches"
        :key="item.id"
        type="button"
        class="workbench-tab"
        :class="{ active: activeWorkbench === item.id }"
        :aria-current="activeWorkbench === item.id ? 'page' : undefined"
        @click="activeWorkbench = item.id"
      >
        <Icon :icon="item.icon" />
        <span>
          <strong>{{ item.label }}</strong>
          <small>{{ item.description }}</small>
        </span>
      </button>
    </nav>

    <section class="metric-strip" aria-label="算例概要">
      <div class="metric-item">
        <span>网络规模</span>
        <strong>17 <small>节点</small></strong>
        <em>16 条支路</em>
      </div>
      <div class="metric-item">
        <span>总有功负荷</span>
        <strong>{{ formatNumber(totalRealLoadMw, 1) }} <small>MW</small></strong>
        <em>{{ formatNumber(totalReactiveLoadMvar, 1) }} Mvar</em>
      </div>
      <div class="metric-item">
        <span>规划储能</span>
        <strong>{{ recommendationCapacity }} <small>kWh</small></strong>
        <em>{{ recommendationPower }} kW</em>
      </div>
      <div class="metric-item">
        <span>当前时段</span>
        <strong>{{ hourLabel(selectedHour) }}</strong>
        <em>典型日 24 小时</em>
      </div>
      <div class="metric-item">
        <span>最近运行</span>
        <strong class="metric-status">{{ lastCalculatedAt }}</strong>
        <em>前端演示计算</em>
      </div>
    </section>

    <main class="workbench-content">
      <template v-if="activeWorkbench === 'power'">
        <section class="control-band" aria-label="潮流计算条件">
          <div class="control-group control-group--wide">
            <label for="planning-hour">典型日时段</label>
            <div class="range-row">
              <input
                id="planning-hour"
                v-model.number="selectedHour"
                type="range"
                min="0"
                max="23"
              />
              <output for="planning-hour">{{ hourLabel(selectedHour) }}</output>
            </div>
          </div>
          <div class="control-group">
            <label for="planning-node">分析节点</label>
            <ElSelect id="planning-node" v-model="selectedNodeId" aria-label="分析节点">
              <ElOption
                v-for="node in PLANNING_NODES"
                :key="node.id"
                :label="`节点 ${node.id}`"
                :value="node.id"
              />
            </ElSelect>
          </div>
          <div class="control-actions">
            <ElButton :loading="flowRunning" type="primary" @click="runPowerFlow">
              <Icon icon="ep:video-play" />
              运行演示计算
            </ElButton>
            <ElButton :disabled="riskNodeIds.length === 0" @click="selectRiskNode">
              <Icon icon="ep:warning" />
              定位越限
            </ElButton>
          </div>
        </section>

        <section v-if="flowCalculated" class="result-banner" role="status">
          已完成 {{ hourLabel(selectedHour) }} 潮流结果汇总，检测到
          <strong>{{ voltageViolationCount }}</strong> 个相电压越限点。
        </section>

        <div class="power-layout">
          <section class="surface-panel topology-panel">
            <header class="panel-header">
              <div>
                <span class="panel-kicker">NETWORK</span>
                <h2>台区网络拓扑</h2>
              </div>
              <div class="legend">
                <span><i class="legend-dot normal"></i>正常</span>
                <span><i class="legend-dot risk"></i>越限</span>
                <span><i class="legend-ring"></i>储能</span>
              </div>
            </header>
            <div class="topology-viewport">
              <svg viewBox="0 0 1200 380" aria-label="17 节点台区网络拓扑" role="img">
                <g class="topology-branches">
                  <line
                    v-for="branch in PLANNING_BRANCHES"
                    :key="branch.id"
                    :x1="nodeById(branch.from).x"
                    :y1="nodeById(branch.from).y"
                    :x2="nodeById(branch.to).x"
                    :y2="nodeById(branch.to).y"
                  />
                </g>
                <g
                  v-for="node in PLANNING_NODES"
                  :key="node.id"
                  class="topology-node"
                  :class="nodeClass(node.id)"
                  :transform="`translate(${node.x}, ${node.y})`"
                  role="button"
                  tabindex="0"
                  :aria-label="`节点 ${node.id}，${statusText(node.id)}`"
                  @click="selectedNodeId = node.id"
                  @keydown.enter.space.prevent="selectedNodeId = node.id"
                >
                  <circle class="node-halo" r="22" />
                  <circle class="node-body" r="14" />
                  <text class="node-id" text-anchor="middle" y="4">{{ node.id }}</text>
                  <text class="node-value" text-anchor="middle" y="40">
                    {{ statusText(node.id) }}
                  </text>
                </g>
              </svg>
            </div>
            <footer class="topology-footer">
              <span>点击节点联动右侧曲线</span>
              <span>节点 {{ selectedNodeId }} · {{ hourLabel(selectedHour) }}</span>
            </footer>
          </section>

          <section class="surface-panel node-panel">
            <header class="panel-header">
              <div>
                <span class="panel-kicker">NODE {{ selectedNodeId }}</span>
                <h2>节点运行明细</h2>
              </div>
              <span class="state-pill" :class="{ warning: riskNodeIds.includes(selectedNodeId) }">
                {{ riskNodeIds.includes(selectedNodeId) ? '电压越限' : '运行正常' }}
              </span>
            </header>
            <dl class="node-detail-list">
              <div v-for="item in selectedPhaseVoltages" :key="item.phase">
                <dt
                  ><i :style="{ backgroundColor: phaseColors[item.phase] }"></i
                  >{{ item.phase }}相电压</dt
                >
                <dd>{{ flowCalculated ? item.value.toFixed(4) : '--' }} <small>pu</small></dd>
              </div>
              <div>
                <dt>有功负荷</dt>
                <dd>{{ formatNumber(selectedNode.loadMw, 2) }} <small>MW</small></dd>
              </div>
              <div>
                <dt>无功负荷</dt>
                <dd>{{ formatNumber(selectedNode.reactiveMvar, 2) }} <small>Mvar</small></dd>
              </div>
              <div>
                <dt>节点储能</dt>
                <dd>
                  {{
                    STORAGE_PROFILES.find((item) => item.nodeId === selectedNodeId)?.capacityKwh ||
                    0
                  }}
                  <small>kWh</small>
                </dd>
              </div>
            </dl>
          </section>

          <section class="surface-panel chart-panel">
            <header class="panel-header">
              <div>
                <span class="panel-kicker">24H VOLTAGE</span>
                <h2>三相电压曲线</h2>
              </div>
              <strong class="header-value">{{ selectedAverageVoltage.toFixed(4) }} pu</strong>
            </header>
            <PlanningChart
              :option="voltageChartOption"
              :aria-label="`节点 ${selectedNodeId} 三相电压曲线`"
            />
          </section>

          <section class="surface-panel branch-panel">
            <header class="panel-header">
              <div>
                <span class="panel-kicker">BRANCH LOADING</span>
                <h2>支路负载率</h2>
              </div>
              <span>{{ hourLabel(selectedHour) }}</span>
            </header>
            <div class="table-scroll">
              <table>
                <thead>
                  <tr><th>支路</th><th>方向</th><th>潮流</th><th>负载率</th></tr>
                </thead>
                <tbody>
                  <tr v-for="branch in branchRows.slice(0, 7)" :key="branch.id">
                    <td>{{ branch.id }}</td>
                    <td>{{ branch.from }} → {{ branch.to }}</td>
                    <td>{{ branch.flowMw.toFixed(3) }} MW</td>
                    <td>
                      <span class="loading-value" :class="{ warning: branch.loading > 1 }">
                        {{ formatNumber(branch.loading * 100, 1) }}%
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <footer class="panel-summary">
              <span
                >系统电压 {{ voltageMinimum.toFixed(4) }} ～
                {{ voltageMaximum.toFixed(4) }} pu</span
              >
              <span>估算网损 {{ totalLossMw.toFixed(4) }} MW</span>
            </footer>
          </section>
        </div>
      </template>

      <template v-else-if="activeWorkbench === 'parameters'">
        <div class="parameters-layout">
          <section class="surface-panel parameter-form-panel">
            <header class="panel-header">
              <div>
                <span class="panel-kicker">PLANNING INPUT</span>
                <h2>规划与投资参数</h2>
              </div>
              <ElButton text @click="resetParameters"><Icon icon="ep:refresh" />恢复默认</ElButton>
            </header>
            <div class="parameter-section">
              <h3>规划边界</h3>
              <div class="form-grid">
                <label
                  ><span>规划周期</span
                  ><ElInputNumber v-model="parameters.periodYears" :min="1" :max="30" /><em
                    >年</em
                  ></label
                >
                <label
                  ><span>折现率</span
                  ><ElInputNumber
                    v-model="parameters.discountRate"
                    :min="0"
                    :max="0.3"
                    :step="0.005"
                    :precision="3"
                  /><em>p.u.</em></label
                >
                <label
                  ><span>电压下限</span
                  ><ElInputNumber
                    v-model="parameters.voltageLowerLimit"
                    :min="0.8"
                    :max="1"
                    :step="0.01"
                    :precision="2"
                  /><em>pu</em></label
                >
                <label
                  ><span>电压上限</span
                  ><ElInputNumber
                    v-model="parameters.voltageUpperLimit"
                    :min="1"
                    :max="1.2"
                    :step="0.01"
                    :precision="2"
                  /><em>pu</em></label
                >
              </div>
            </div>
            <div class="parameter-section">
              <h3>储能单元</h3>
              <div class="form-grid">
                <label
                  ><span>单台容量</span
                  ><ElInputNumber v-model="parameters.unitCapacityKwh" :min="10" :step="10" /><em
                    >kWh</em
                  ></label
                >
                <label
                  ><span>单台功率</span
                  ><ElInputNumber v-model="parameters.unitPowerKw" :min="5" :step="5" /><em
                    >kW</em
                  ></label
                >
                <label
                  ><span>充电效率</span
                  ><ElInputNumber
                    v-model="parameters.chargeEfficiency"
                    :min="0.5"
                    :max="1"
                    :step="0.01"
                    :precision="2"
                  /><em>p.u.</em></label
                >
                <label
                  ><span>放电效率</span
                  ><ElInputNumber
                    v-model="parameters.dischargeEfficiency"
                    :min="0.5"
                    :max="1"
                    :step="0.01"
                    :precision="2"
                  /><em>p.u.</em></label
                >
              </div>
            </div>
            <div class="parameter-section">
              <h3>成本参数</h3>
              <div class="form-grid">
                <label
                  ><span>初始投资</span
                  ><ElInputNumber
                    v-model="parameters.investmentCostPerKwh"
                    :min="0"
                    :step="50"
                  /><em>元/kWh</em></label
                >
                <label
                  ><span>年运维成本</span
                  ><ElInputNumber
                    v-model="parameters.operationCostPerKwh"
                    :min="0"
                    :step="0.5"
                  /><em>元/kWh</em></label
                >
                <label
                  ><span>更换成本</span
                  ><ElInputNumber
                    v-model="parameters.replacementCostPerKwh"
                    :min="0"
                    :step="25"
                  /><em>元/kWh</em></label
                >
                <label
                  ><span>更换周期</span
                  ><ElInputNumber v-model="parameters.replacementCycles" :min="1" :step="1" /><em
                    >次</em
                  ></label
                >
              </div>
            </div>
          </section>

          <section class="surface-panel parameter-chart-panel">
            <header class="panel-header">
              <div>
                <span class="panel-kicker">VOLTAGE TARGET</span>
                <h2>典型日电压控制曲线</h2>
              </div>
              <span class="state-pill">母线 1</span>
            </header>
            <PlanningChart :option="voltageSetOption" aria-label="典型日电压控制曲线" />
          </section>

          <section class="financial-band">
            <div
              ><span>推荐规模</span
              ><strong>{{ recommendationCapacity }} kWh / {{ recommendationPower }} kW</strong></div
            >
            <div
              ><span>初始投资估算</span
              ><strong>{{ formatNumber(investmentEstimate, 0) }} 元</strong></div
            >
            <div
              ><span>年运维成本</span
              ><strong>{{ formatNumber(annualOperationCost, 0) }} 元</strong></div
            >
            <div
              ><span>规划周期</span><strong>{{ parameters.periodYears }} 年</strong></div
            >
          </section>
        </div>
      </template>

      <template v-else-if="activeWorkbench === 'optimization'">
        <section class="control-band optimization-controls" aria-label="储能优化条件">
          <div>
            <strong>候选节点</strong>
            <span>选择参与储能配置评估的负荷节点</span>
          </div>
          <div class="control-actions">
            <ElButton
              @click="
                selectedAreas = PLANNING_NODES.filter((node) => node.loadMw > 0).map(
                  (node) => node.id
                )
              "
              >全选</ElButton
            >
            <ElButton @click="selectedAreas = []">清空</ElButton>
            <ElButton
              type="primary"
              :loading="optimizationRunning"
              :disabled="selectedAreas.length === 0"
              @click="runOptimization"
            >
              <Icon icon="ep:video-play" />运行配置评估
            </ElButton>
          </div>
        </section>

        <section class="node-selector" aria-label="候选节点列表">
          <ElCheckboxGroup v-model="selectedAreas">
            <ElCheckbox
              v-for="node in PLANNING_NODES.filter((item) => item.loadMw > 0)"
              :key="node.id"
              :value="node.id"
              border
            >
              节点 {{ node.id }}
            </ElCheckbox>
          </ElCheckboxGroup>
        </section>

        <section v-if="optimizationCalculated" class="result-banner" role="status">
          已评估 {{ selectedAreas.length }} 个候选节点，生成
          <strong>{{ activeRecommendations.length }}</strong> 处储能配置建议。
        </section>

        <div class="optimization-layout">
          <section class="surface-panel optimization-summary">
            <header class="panel-header">
              <div><span class="panel-kicker">OPTIMIZATION</span><h2>配置结果概览</h2></div>
              <span class="state-pill">典型日</span>
            </header>
            <div class="optimization-kpis">
              <div
                ><span>配置位置</span
                ><strong>{{ optimizationCalculated ? activeRecommendations.length : '--' }}</strong
                ><em>处</em></div
              >
              <div
                ><span>总容量</span
                ><strong>{{ optimizationCalculated ? recommendationCapacity : '--' }}</strong
                ><em>kWh</em></div
              >
              <div
                ><span>总功率</span
                ><strong>{{ optimizationCalculated ? recommendationPower : '--' }}</strong
                ><em>kW</em></div
              >
              <div
                ><span>风险节点</span
                ><strong>{{
                  optimizationCalculated ? `${riskNodeIds.length} → ${postOptimizationRisk}` : '--'
                }}</strong
                ><em>处</em></div
              >
            </div>
            <div class="risk-comparison" :class="{ ready: optimizationCalculated }">
              <div>
                <span>规划前风险</span>
                <div class="risk-track"
                  ><i
                    :style="{
                      width: optimizationCalculated
                        ? `${Math.min(100, riskNodeIds.length * 14)}%`
                        : '0%'
                    }"
                  ></i
                ></div>
                <strong>{{ optimizationCalculated ? riskNodeIds.length : '--' }}</strong>
              </div>
              <div>
                <span>规划后风险</span>
                <div class="risk-track after"
                  ><i
                    :style="{
                      width: optimizationCalculated
                        ? `${Math.min(100, postOptimizationRisk * 14)}%`
                        : '0%'
                    }"
                  ></i
                ></div>
                <strong>{{ optimizationCalculated ? postOptimizationRisk : '--' }}</strong>
              </div>
            </div>
          </section>

          <section class="surface-panel recommendation-table-panel">
            <header class="panel-header">
              <div><span class="panel-kicker">RECOMMENDATION</span><h2>储能配置建议</h2></div>
              <span>{{ activeRecommendations.length }} 条</span>
            </header>
            <div class="table-scroll">
              <table>
                <thead
                  ><tr
                    ><th>设备</th><th>接入节点</th><th>容量</th><th>功率</th><th>单元数</th
                    ><th>依据</th></tr
                  ></thead
                >
                <tbody v-if="optimizationCalculated && activeRecommendations.length">
                  <tr v-for="profile in activeRecommendations" :key="profile.id">
                    <td
                      ><strong>{{ profile.id }}</strong></td
                    >
                    <td>节点 {{ profile.nodeId }}</td>
                    <td>{{ profile.capacityKwh }} kWh</td>
                    <td>{{ profile.powerKw }} kW</td>
                    <td>{{ Math.ceil(profile.capacityKwh / parameters.unitCapacityKwh) }}</td>
                    <td><span class="source-tag">计算结果推断</span></td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr><td colspan="6" class="empty-cell">选择候选节点并运行配置评估</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </template>

      <template v-else>
        <section class="control-band strategy-controls" aria-label="储能策略选择">
          <div class="control-group">
            <label for="storage-device">储能设备</label>
            <ElSelect id="storage-device" v-model="selectedStorageId" aria-label="储能设备">
              <ElOption
                v-for="profile in STORAGE_PROFILES"
                :key="profile.id"
                :label="`${profile.id} / 节点 ${profile.nodeId}`"
                :value="profile.id"
              />
            </ElSelect>
          </div>
          <div class="strategy-summary">
            <span
              >额定容量<strong>{{ selectedProfile.capacityKwh }} kWh</strong></span
            >
            <span
              >额定功率<strong>{{ selectedProfile.powerKw }} kW</strong></span
            >
            <span
              >数据冲突归一化<strong>{{ selectedDispatch.conflictCount }} 时段</strong></span
            >
          </div>
        </section>

        <div class="strategy-layout">
          <section class="surface-panel dispatch-panel">
            <header class="panel-header"
              ><div><span class="panel-kicker">DISPATCH</span><h2>充放电功率</h2></div
              ><span>净功率互斥化</span></header
            >
            <PlanningChart
              :option="dispatchChartOption"
              :aria-label="`${selectedProfile.id} 充放电功率曲线`"
            />
          </section>
          <section class="surface-panel soc-panel">
            <header class="panel-header"
              ><div><span class="panel-kicker">STATE OF CHARGE</span><h2>储能 SOC</h2></div
              ><strong class="header-value"
                >{{ Math.max(...selectedProfile.soc).toFixed(1) }} kWh</strong
              ></header
            >
            <PlanningChart
              :option="socChartOption"
              :aria-label="`${selectedProfile.id} SOC 曲线`"
            />
          </section>
          <section class="surface-panel comparison-panel">
            <header class="panel-header"
              ><div><span class="panel-kicker">VOLTAGE EFFECT</span><h2>规划前后电压对比</h2></div
              ><span>节点 {{ selectedProfile.nodeId }} · A相</span></header
            >
            <PlanningChart :option="comparisonChartOption" aria-label="规划前后电压对比曲线" />
          </section>
          <section class="surface-panel schedule-panel">
            <header class="panel-header"
              ><div><span class="panel-kicker">KEY PERIODS</span><h2>关键调度时段</h2></div
              ><span>{{ criticalScheduleRows.length }} 条</span></header
            >
            <div class="table-scroll">
              <table>
                <thead
                  ><tr><th>时段</th><th>充电</th><th>放电</th><th>SOC</th><th>状态</th></tr></thead
                >
                <tbody>
                  <tr v-for="row in criticalScheduleRows" :key="row.hour">
                    <td>{{ hourLabel(row.hour) }}</td>
                    <td>{{ row.charge.toFixed(2) }} kW</td>
                    <td>{{ row.discharge.toFixed(2) }} kW</td>
                    <td>{{ row.soc.toFixed(1) }} kWh</td>
                    <td
                      ><span
                        class="source-tag"
                        :class="{ discharge: row.discharge > row.charge }"
                        >{{ row.charge >= row.discharge ? '充电' : '放电' }}</span
                      ></td
                    >
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </template>
    </main>
  </section>
</template>

<style scoped lang="scss">
.planning-workspace {
  --planning-bg: #091221;
  --planning-surface: #101d31;
  --planning-surface-strong: #14243b;
  --planning-border: rgb(112 143 186 / 22%);
  --planning-text: #edf4ff;
  --planning-muted: #96a8c2;
  --planning-primary: #3d8fea;
  --planning-cyan: #32b8d8;
  --planning-amber: #e4a957;
  --planning-danger: #e36a78;
  display: flex;
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  flex-direction: column;
  color: var(--planning-text);
  background: var(--planning-bg);
  letter-spacing: 0;
}

.workspace-header {
  display: flex;
  min-height: 74px;
  padding: 14px 24px;
  border-bottom: 1px solid var(--planning-border);
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.workspace-header h1,
.panel-header h2,
.parameter-section h3 {
  margin: 0;
  letter-spacing: 0;
}

.workspace-header h1 {
  font-size: 22px;
  font-weight: 650;
}

.workspace-header p {
  margin: 5px 0 0;
  color: var(--planning-muted);
  font-size: 13px;
}

.title-line {
  display: flex;
  align-items: center;
  gap: 10px;
}

.source-tag,
.state-pill {
  display: inline-flex;
  min-height: 24px;
  box-sizing: border-box;
  padding: 3px 9px;
  border: 1px solid rgb(228 169 87 / 34%);
  border-radius: 4px;
  align-items: center;
  color: #ffd28e;
  background: rgb(228 169 87 / 10%);
  font-size: 12px;
  line-height: 1;
}

.workbench-nav {
  display: grid;
  padding: 10px 24px;
  border-bottom: 1px solid var(--planning-border);
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  background: #0c1728;
}

.workbench-tab {
  display: flex;
  min-height: 56px;
  padding: 8px 12px;
  border: 1px solid transparent;
  border-radius: 4px;
  align-items: center;
  gap: 10px;
  color: var(--planning-muted);
  text-align: left;
  background: transparent;
  cursor: pointer;
  transition:
    color 180ms ease,
    border-color 180ms ease,
    background-color 180ms ease;
}

.workbench-tab:hover {
  color: var(--planning-text);
  background: rgb(61 143 234 / 8%);
}

.workbench-tab:focus-visible,
.topology-node:focus-visible {
  outline: 2px solid #75b8ff;
  outline-offset: 2px;
}

.workbench-tab.active {
  border-color: rgb(61 143 234 / 42%);
  color: #fff;
  background: rgb(61 143 234 / 14%);
}

.workbench-tab > :first-child {
  width: 22px;
  height: 22px;
  flex: 0 0 22px;
}

.workbench-tab strong,
.workbench-tab small {
  display: block;
}

.workbench-tab strong {
  font-size: 14px;
  font-weight: 600;
}

.workbench-tab small {
  margin-top: 3px;
  color: var(--planning-muted);
  font-size: 11px;
}

.metric-strip {
  display: grid;
  min-height: 82px;
  padding: 0 24px;
  border-bottom: 1px solid var(--planning-border);
  grid-template-columns: repeat(5, minmax(0, 1fr));
  background: #0b1626;
}

.metric-item {
  display: flex;
  min-width: 0;
  padding: 12px 18px;
  border-right: 1px solid var(--planning-border);
  flex-direction: column;
  justify-content: center;
}

.metric-item:first-child {
  padding-left: 0;
}
.metric-item:last-child {
  border-right: 0;
}
.metric-item > span {
  color: var(--planning-muted);
  font-size: 11px;
}
.metric-item strong {
  margin-top: 4px;
  font-size: 21px;
  font-weight: 650;
  white-space: nowrap;
}
.metric-item strong small {
  color: #b9c7da;
  font-size: 12px;
  font-weight: 500;
}
.metric-item em {
  margin-top: 2px;
  overflow: hidden;
  color: #7388a5;
  font-size: 11px;
  font-style: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.metric-item .metric-status {
  font-size: 16px;
}

.workbench-content {
  flex: 1;
  min-height: 0;
  padding: 16px 24px 24px;
  overflow: auto;
}

.control-band,
.financial-band,
.node-selector,
.result-banner {
  border: 1px solid var(--planning-border);
  background: var(--planning-surface);
}

.control-band {
  display: flex;
  min-height: 70px;
  padding: 12px 16px;
  box-sizing: border-box;
  align-items: center;
  gap: 22px;
}

.control-group {
  display: flex;
  min-width: 190px;
  flex-direction: column;
  gap: 6px;
}

.control-group--wide {
  min-width: 320px;
  flex: 1;
}
.control-group label {
  color: var(--planning-muted);
  font-size: 12px;
}
.range-row {
  display: flex;
  align-items: center;
  gap: 14px;
}
.range-row input {
  width: 100%;
  accent-color: var(--planning-primary);
  cursor: pointer;
}
.range-row output {
  width: 52px;
  color: #fff;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
}
.control-actions {
  display: flex;
  margin-left: auto;
  align-items: center;
  gap: 8px;
}

.result-banner {
  padding: 10px 14px;
  margin-top: 10px;
  border-color: rgb(76 195 138 / 28%);
  color: #bfe9d2;
  background: rgb(76 195 138 / 8%);
  font-size: 13px;
}

.result-banner strong {
  color: #fff;
}

.power-layout,
.optimization-layout,
.strategy-layout,
.parameters-layout {
  display: grid;
  margin-top: 12px;
  gap: 12px;
}

.power-layout {
  grid-template-columns: minmax(0, 1.65fr) minmax(260px, 0.55fr);
}
.surface-panel {
  min-width: 0;
  border: 1px solid var(--planning-border);
  background: var(--planning-surface);
}
.topology-panel {
  min-height: 430px;
}
.node-panel {
  min-height: 430px;
}
.chart-panel {
  min-height: 340px;
}
.branch-panel {
  min-height: 340px;
}

.panel-header {
  display: flex;
  min-height: 58px;
  padding: 10px 14px;
  box-sizing: border-box;
  border-bottom: 1px solid var(--planning-border);
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.panel-header h2 {
  margin-top: 2px;
  font-size: 15px;
  font-weight: 600;
}
.panel-header > span {
  color: var(--planning-muted);
  font-size: 12px;
}
.panel-kicker {
  color: #659bd9;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
}
.header-value {
  color: #fff;
  font-size: 15px;
  font-variant-numeric: tabular-nums;
}
.state-pill {
  border-color: rgb(76 195 138 / 28%);
  color: #8edcaf;
  background: rgb(76 195 138 / 8%);
}
.state-pill.warning {
  border-color: rgb(227 106 120 / 32%);
  color: #ff9da9;
  background: rgb(227 106 120 / 9%);
}

.legend {
  display: flex;
  color: var(--planning-muted);
  font-size: 11px;
  gap: 12px;
}
.legend span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}
.legend-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4cc38a;
}
.legend-dot.risk {
  background: var(--planning-danger);
}
.legend-ring {
  width: 9px;
  height: 9px;
  border: 2px solid #a779d1;
  border-radius: 50%;
}

.topology-viewport {
  height: 318px;
  padding: 4px 12px;
  overflow: hidden;
}
.topology-viewport svg {
  width: 100%;
  height: 100%;
}
.topology-branches line {
  stroke: #49627f;
  stroke-width: 2;
  vector-effect: non-scaling-stroke;
}
.topology-node {
  cursor: pointer;
}
.topology-node .node-halo {
  fill: transparent;
  stroke: transparent;
  stroke-width: 2;
}
.topology-node .node-body {
  fill: #193655;
  stroke: #5d83aa;
  stroke-width: 1.5;
}
.topology-node .node-id {
  fill: #f4f8ff;
  font-size: 10px;
  font-weight: 700;
  pointer-events: none;
}
.topology-node .node-value {
  fill: #8398b5;
  font-size: 9px;
  pointer-events: none;
}
.topology-node.risk .node-body {
  fill: #542b3a;
  stroke: var(--planning-danger);
}
.topology-node.storage .node-halo {
  stroke: #a779d1;
}
.topology-node.selected .node-halo {
  fill: rgb(61 143 234 / 12%);
  stroke: #5eabff;
}
.topology-node.selected .node-body {
  fill: #245e91;
  stroke: #8bc6ff;
}

.topology-footer,
.panel-summary {
  display: flex;
  min-height: 38px;
  padding: 8px 14px;
  box-sizing: border-box;
  border-top: 1px solid var(--planning-border);
  align-items: center;
  justify-content: space-between;
  color: var(--planning-muted);
  font-size: 11px;
}

.node-detail-list {
  padding: 6px 16px 14px;
  margin: 0;
}
.node-detail-list > div {
  display: flex;
  min-height: 47px;
  border-bottom: 1px solid rgb(112 143 186 / 14%);
  align-items: center;
  justify-content: space-between;
}
.node-detail-list > div:last-child {
  border-bottom: 0;
}
.node-detail-list dt {
  display: flex;
  align-items: center;
  color: var(--planning-muted);
  font-size: 12px;
  gap: 7px;
}
.node-detail-list dt i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}
.node-detail-list dd {
  margin: 0;
  color: #fff;
  font-size: 15px;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
}
.node-detail-list dd small {
  color: var(--planning-muted);
  font-size: 10px;
  font-weight: 400;
}
.chart-panel :deep(.planning-chart) {
  height: 282px;
  min-height: 0;
}
.parameter-chart-panel :deep(.planning-chart) {
  height: 362px;
  min-height: 0;
}
.dispatch-panel :deep(.planning-chart),
.soc-panel :deep(.planning-chart),
.comparison-panel :deep(.planning-chart) {
  height: 272px;
  min-height: 0;
}

.table-scroll {
  overflow: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}
th,
td {
  padding: 10px 12px;
  border-bottom: 1px solid rgb(112 143 186 / 14%);
  text-align: left;
  white-space: nowrap;
}
th {
  color: #8094af;
  background: #0d192a;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
}
td {
  color: #d7e1ef;
}
tbody tr:hover {
  background: rgb(61 143 234 / 6%);
}
.loading-value {
  color: #8edcaf;
  font-variant-numeric: tabular-nums;
}
.loading-value.warning {
  color: #ff9da9;
}

.parameters-layout {
  grid-template-columns: minmax(420px, 0.82fr) minmax(0, 1.18fr);
}
.parameter-form-panel {
  grid-row: span 2;
}
.parameter-section {
  padding: 14px;
  border-bottom: 1px solid var(--planning-border);
}
.parameter-section:last-child {
  border-bottom: 0;
}
.parameter-section h3 {
  margin-bottom: 12px;
  color: #b9c8dc;
  font-size: 12px;
  font-weight: 600;
}
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 14px;
}
.form-grid label {
  display: grid;
  grid-template-columns: minmax(82px, 1fr) minmax(110px, 1.3fr) 56px;
  min-height: 36px;
  align-items: center;
  color: var(--planning-muted);
  font-size: 11px;
  gap: 7px;
}
.form-grid label em {
  color: #7186a3;
  font-size: 10px;
  font-style: normal;
}
.form-grid :deep(.el-input-number) {
  width: 100%;
}
.parameter-chart-panel {
  min-height: 420px;
}
.financial-band {
  display: grid;
  min-height: 108px;
  grid-column: 2;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.financial-band > div {
  display: flex;
  padding: 16px;
  border-right: 1px solid var(--planning-border);
  flex-direction: column;
  justify-content: center;
}
.financial-band > div:last-child {
  border-right: 0;
}
.financial-band span {
  color: var(--planning-muted);
  font-size: 11px;
}
.financial-band strong {
  margin-top: 9px;
  color: #fff;
  font-size: 16px;
}

.optimization-controls > div:first-child {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.optimization-controls > div:first-child span {
  color: var(--planning-muted);
  font-size: 11px;
}
.node-selector {
  padding: 10px 12px 4px;
  margin-top: 10px;
}
.node-selector :deep(.el-checkbox) {
  min-height: 34px;
  margin: 0 6px 6px 0;
}
.optimization-layout {
  grid-template-columns: minmax(300px, 0.46fr) minmax(0, 1.54fr);
}
.optimization-summary,
.recommendation-table-panel {
  min-height: 390px;
}
.optimization-kpis {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.optimization-kpis > div {
  display: grid;
  min-height: 90px;
  padding: 14px;
  box-sizing: border-box;
  border-right: 1px solid var(--planning-border);
  border-bottom: 1px solid var(--planning-border);
  grid-template-columns: 1fr auto;
  align-items: end;
}
.optimization-kpis > div:nth-child(2n) {
  border-right: 0;
}
.optimization-kpis span {
  grid-column: 1 / -1;
  color: var(--planning-muted);
  font-size: 11px;
}
.optimization-kpis strong {
  color: #fff;
  font-size: 22px;
}
.optimization-kpis em {
  color: var(--planning-muted);
  font-size: 10px;
  font-style: normal;
}
.risk-comparison {
  padding: 18px 14px;
}
.risk-comparison > div {
  display: grid;
  margin-bottom: 16px;
  grid-template-columns: 76px 1fr 28px;
  align-items: center;
  color: var(--planning-muted);
  font-size: 11px;
  gap: 10px;
}
.risk-track {
  height: 7px;
  overflow: hidden;
  border-radius: 2px;
  background: #20304a;
}
.risk-track i {
  display: block;
  width: 0;
  height: 100%;
  background: var(--planning-danger);
  transition: width 280ms ease;
}
.risk-track.after i {
  background: #4cc38a;
}
.risk-comparison strong {
  color: #fff;
  text-align: right;
}
.source-tag {
  min-height: 21px;
  padding: 3px 7px;
  border-color: rgb(61 143 234 / 28%);
  color: #8fc4ff;
  background: rgb(61 143 234 / 8%);
}
.source-tag.discharge {
  border-color: rgb(227 106 120 / 28%);
  color: #ff9da9;
  background: rgb(227 106 120 / 8%);
}
.empty-cell {
  height: 230px;
  color: var(--planning-muted);
  text-align: center;
}

.strategy-controls .control-group {
  min-width: 260px;
}
.strategy-summary {
  display: flex;
  margin-left: auto;
  gap: 0;
}
.strategy-summary span {
  display: flex;
  min-width: 150px;
  padding: 2px 18px;
  border-left: 1px solid var(--planning-border);
  flex-direction: column;
  color: var(--planning-muted);
  font-size: 10px;
  gap: 6px;
}
.strategy-summary strong {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
}
.strategy-layout {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.dispatch-panel,
.soc-panel,
.comparison-panel,
.schedule-panel {
  min-height: 330px;
}

:deep(.el-select) {
  width: 100%;
}
:deep(.el-button) {
  border-radius: 4px;
}
:deep(.el-button + .el-button) {
  margin-left: 0;
}

@media (max-width: 1180px) {
  .metric-strip {
    grid-template-columns: repeat(5, minmax(135px, 1fr));
    overflow-x: auto;
  }
  .power-layout,
  .parameters-layout,
  .optimization-layout {
    grid-template-columns: 1fr;
  }
  .parameter-form-panel {
    grid-row: auto;
  }
  .financial-band {
    grid-column: 1;
  }
  .strategy-summary span {
    min-width: 120px;
  }
}

@media (max-width: 820px) {
  .workspace-header {
    align-items: flex-start;
    flex-direction: column;
  }
  .workbench-nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .control-band {
    align-items: stretch;
    flex-direction: column;
  }
  .control-group,
  .control-group--wide {
    width: 100%;
    min-width: 0;
  }
  .control-actions {
    width: 100%;
    margin-left: 0;
    flex-wrap: wrap;
  }
  .strategy-summary {
    margin-left: 0;
    overflow-x: auto;
  }
  .strategy-summary span:first-child {
    border-left: 0;
    padding-left: 0;
  }
  .strategy-layout {
    grid-template-columns: 1fr;
  }
  .form-grid {
    grid-template-columns: 1fr;
  }
  .financial-band {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .topology-viewport {
    overflow-x: auto;
  }
  .topology-viewport svg {
    min-width: 900px;
  }
}

@media (max-width: 520px) {
  .workspace-header,
  .workbench-nav,
  .workbench-content {
    padding-right: 12px;
    padding-left: 12px;
  }
  .metric-strip {
    padding: 0 12px;
  }
  .workbench-tab {
    min-height: 52px;
  }
  .workbench-tab small {
    display: none;
  }
  .financial-band {
    grid-template-columns: 1fr;
  }
  .financial-band > div {
    border-right: 0;
    border-bottom: 1px solid var(--planning-border);
  }
  .form-grid label {
    grid-template-columns: 84px minmax(0, 1fr) 50px;
  }
  .optimization-kpis {
    grid-template-columns: 1fr;
  }
  .optimization-kpis > div {
    border-right: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .workbench-tab,
  .risk-track i {
    transition: none;
  }
}
</style>
