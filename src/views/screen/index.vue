<script setup lang="ts">
import {computed, onMounted} from "vue";
import { useUserStore } from '@/store/modules/user'
import * as echarts from 'echarts';
import { useResizeObserver } from '@vueuse/core'

import styleJson from './config/custom_map_config.json'
const echartsDomRef = ref<HTMLElement>()
const chartRef = ref()
const mapStyle = {
  styleJson,
}
console.log(mapStyle);

useResizeObserver(echartsDomRef, () => {
  if (chartRef.value) {
    chartRef.value.resize();
  }
});
onMounted(() => {
  const myChart = echarts.init(echartsDomRef.value);
  const gridValue = '55%';
  const axisProps = {
    nameTextStyle: {
      color: '#fff',
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: 'yellow',
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: '#fff',
      show: false,
    },
    splitLine: {
      show: false,
    },
  }
  myChart.setOption({
    grid: [
      {
        bottom: gridValue,
        right: gridValue,
        borderColor: 'yellow',
      },
      {
        left: gridValue,
        bottom: gridValue,
      },
      {
        top: gridValue,
        right: gridValue,
      },
      {
        left: gridValue,
        top: gridValue,
      },
    ],
    title: [
      {
        text: '客户增长曲线',
        textAlign: 'center',
        left: '25%',
        top: '45%',
        textStyle: {
          color: '#fff',
          fontSize: 14,
        },
      },
      {
        text: '设备增长曲线',
        top: '45%',
        left: '75%',
        textAlign: 'center',
        textStyle: {
          color: '#fff',
          fontSize: 14,
        },
      },
      {
        text: '负荷增长曲线',
        textAlign: 'center',
        left: '25%',
        top: '80%',
        textStyle: {
          color: '#fff',
          fontSize: 14,
        },
      },
      {
        text: '交易电量增长曲线',
        top: '80%',
        left: '75%',
        textAlign: 'center',
        textStyle: {
          color: '#fff',
          fontSize: 14,
        },
      },
    ],
    dataset: [
      {
        dimensions: ['time', 'value'],
        source: Array(24).fill(1).map((_, i) => [i + 1, i + 1 + Math.random()]),
      },
      {
        dimensions: ['time', 'value'],
        source: Array(24).fill(1).map((_, i) => [i + 1, i + 1 + Math.random()]),
      },
      {
        dimensions: ['time', 'value'],
        source: Array(24).fill(1).map((_, i) => [i + 1, i + 1 + Math.random()]),
      },
      {
        dimensions: ['time', 'value'],
        source: Array(24).fill(1).map((_, i) => [i + 1, i + 1 + Math.random()]),
      },
    ],
    xAxis: Array(4).fill(1).map((_, i) => ({
      gridIndex: i,
      ...axisProps,
    })),
    yAxis: Array(4).fill(1).map((_, i) => ({
      gridIndex: i,
      ...axisProps,
    })),
    series: [{
      name: '客户增长曲线',
    },{
      name: '设备增长曲线',
    },{
      name: '负荷增长曲线',
    },{
      name: '交易电量增长曲线',
    },].map((item, i) => ({
      type: 'line',
      yAxisIndex: i,
      xAxisIndex: i,
      datasetIndex: i,
      smooth: true,
      encode: {
        x: 'time',
        y: 'value',
      },
      labelLine: {
        show: 0,
      },
      showSymbol: false,
      itemStyle: {
        color: 'yellow',
      },
      ...item,
    }))
  });
  chartRef.value = myChart
});

onUnmounted(() => {
});
const userStore = useUserStore()
const userName = computed(() => userStore.user.nickname ?? 'Admin')
  const sex = '先生'
const totalList = [{
  label: '用户总量',
  key: 'user',
  unit: '个',
}, {
  label: '项目总量',
  key: 'user1',
  unit: '个',
}, {
  label: '设备总量',
  key: 'user2',
  unit: '台',
}, {
  label: '负荷总量',
  key: 'user3',
  unit: 'kW',
}, {
  label: '电源总量',
  key: 'user4',
  unit: 'kWp',
}, {
  label: '储能总量',
  key: 'user5',
  unit: 'kWh',
}]
const todayData = [
  {
    label: '购电总量',
    key: '1',
    unit: 'kWh',
  },
  {
    label: '发电总量',
    key: '2',
    unit: 'kWh',
  },
  {
    label: '储电总量',
    key: '3',
    unit: 'kW',
  },
  {
    label: '用电总量',
    key: '3',
    unit: 'kWh',
  },
  {
    label: '排碳总量',
    key: '4',
    unit: 't',
  },
  {
    label: '调荷总量',
    key: '5',
    unit: 'kW',
  },
  {
    label: '减碳总量',
    key: '6',
    unit: 't',
  },
  {
    label: '节能总量',
    key: '7',
    unit: 'kWh',
  },
  {
    label: '降费总额',
    key: '8',
    unit: '万元',
  },
  {
    label: '交易总量',
    key: '9',
    unit: '万元',
  },
  {
    label: '收益总量',
    key: '10',
    unit: '万元',
  },
]
const handleMapReady = ({ BMap, map}) => {
  console.log(BMap, map);

}
</script>

<template>
  <header class="flex flex-justify-between gap-10px pa-10px color-[var(--screen-content-text-color)]">
    <div>尊敬的{{userName}}{{sex}}，您好</div>
    <div>数据更新时间：12120</div>
    <div><ElButton type="primary">数据维护</ElButton><ElButton type="primary">退出登录</ElButton></div>
  </header>
  <article>
    <section class="sideLeft">
      <aside class="side-list">
        <div class="side-item" v-for="item in totalList" :key="item.key">
          <span>{{item.label}}</span>
          <span>{{item.value}}{{item.unit}}</span>
        </div>
      </aside>
      <div class="echarts" ref="echartsDomRef"></div>
    </section>
    <baidu-map
      class="bm-view"
      @ready="handleMapReady"
      :zoom="5.5"
      scroll-wheel-zoom
      :mapStyle="mapStyle"
      :center="{lng: 116.404, lat: 39.915}"
    >
      <span>1</span>
    </baidu-map>
    <aside class="sideRight">
      <div class="side-item-header">
        <span>当日数据</span>
      </div>
      <div class="side-item" v-for="item in todayData" :key="item.key">
        <span>{{item.label}}</span>
        <span>{{item.value}}{{item.unit}}</span>
      </div>
    </aside>
  </article>
</template>

<style scoped lang="scss">
  .sideLeft{
    position: absolute;
    z-index: 2;
    left: 50px;
    top: 20px;
    bottom: 10px;
    font-size: 24px;
    display: flex;
    flex-direction: column;
  }
  .sideRight{
    position: absolute;
    z-index: 2;
    right: 50px;
    top: 20px;
    bottom: 30px;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .side-item-header{
    text-align: center;

  }
  .side-list{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  }
  .side-item{
    width: 240px;
    display: flex;
    justify-content: space-between;
  }
  .echarts{
    width: 400px;
    height: 50%;
  }
  .bm-view{
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
