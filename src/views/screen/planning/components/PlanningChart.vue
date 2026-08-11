<script setup lang="ts">
import * as echarts from 'echarts'
import type { ECharts, EChartsOption } from 'echarts'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useResizeObserver } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    option: EChartsOption
    ariaLabel: string
  }>(),
  {}
)

const chartRef = ref<HTMLElement>()
let chart: ECharts | undefined

const renderChart = async () => {
  await nextTick()
  if (!chartRef.value) return
  if (!chart) chart = echarts.init(chartRef.value, 'screen')
  chart.setOption(props.option, true)
}

watch(() => props.option, renderChart, { deep: true })
useResizeObserver(chartRef, () => chart?.resize())

onMounted(renderChart)
onBeforeUnmount(() => {
  chart?.dispose()
  chart = undefined
})
</script>

<template>
  <div ref="chartRef" class="planning-chart" role="img" :aria-label="ariaLabel"></div>
</template>

<style scoped>
.planning-chart {
  width: 100%;
  height: 100%;
  min-height: 220px;
}
</style>
