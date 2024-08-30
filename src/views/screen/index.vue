<script setup lang="tsx">
import {computed, onMounted, ref} from "vue";
import { useUserStore } from '@/store/modules/user'
import { useProjectStore } from '@/store/modules/project'
import * as echarts from 'echarts';
import { useResizeObserver } from '@vueuse/core'
import dayjs from "dayjs";
import icon from '@/views/screen/assets/location.png'
import styleJson from './config/custom_map_config.json'
import {getPanelData} from "@/services/services/IotReportController";
const echartsDomRef = ref<HTMLElement>()
const chartRef = ref()
const mapDomRef = ref();
const drawer = ref(false)
const keyValue = ref({});
const mapStyle = {
  styleJson,
}
let mapChart;
console.log(mapStyle);
const time = dayjs().format('YYYY-MM-DD HH:mm')
const projectStore = useProjectStore();
useResizeObserver(echartsDomRef, () => {
  if (mapChart) {
    mapChart.resize();
  }
});

const getData = async () => {
  const res = await  getPanelData({
    key: 'indexView',
    projectId: projectStore.projectInfo?.id,
  })
  keyValue.value = res.data || {};
  return res;
}
watch(() => [projectStore.projectInfo], (val) => {
  if (!val) {
    return
  }
  getData();
}, {
  immediate: true,
})
watchEffect(() => {
  if (mapChart && projectStore.projectList) {
    mapChart.setOption({
      series: [
        {
          name: '项目数量',
          type: 'map',
          roam: false,
          map: 'CHINA',
          emphasis: {
            label: {
              show: true
            },
            itemStyle: {
              color: '#02bce8'
            },
          },
          nameMap: {

          },
          colorBy: 'data',
          data: [
            {name: '河北', value: 1},
          ],
          markPoint: {
            symbol: `image://${icon}`,
            symbolSize: 24,
            symbolOffset: [12, 24] ,
            data: projectStore.projectList.map(item => ({
              ...item,
              coord: [item.lng, item.lat],
              name: item.name,
              id: item.id,
            })),
          },
          itemStyle: {
            borderColor: '#8ac2d0',
            areaColor: '#1a1b1e',
            shadowColor: '#fff',
            shadowBlur:  3,
          },
          markLine: {
            lineStyle: {
              color: 'green',
            },
          },
          select: {
            label: {
              show: true,
            },
          },
        },
      ],
    })
  }
})
onMounted(() => {
  mapChart = echarts.init(mapDomRef.value);
  mapChart.showLoading();
  import('@/views/screen/config/china.json').then(res => {
    console.log(res.default);
    mapChart.hideLoading();
    echarts.registerMap('CHINA', res.default, {

    });
    mapChart.setOption({
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        show: false, // 暂时隐藏，后续有需求在开
        formatter(params) {
          console.log(params);
          if (params.componentType === 'markPoint') {
            return `
            <div>
            <div>项目信息</div>
            <div> <strong>${params.name}</strong></div>
            <div><small>地址：${params.data.address}</small></div>
            <div><small>负责人：${params.data.contentUser}</small></div>
            <div><small>联系电话：${params.data.contentMobile}</small></div>
</div>
          `
          }

          return `
            <div>
            <div>项目数量</div>
            <span>${params.data.name}:</span>
            <span>${params.data.value}</span>
</div>
          `
        },
        transitionDuration: 0.2
      },
      visualMap: {
        type: 'piecewise',
        left: '40%',
        bottom: '2%',
        calculable: true,
        realtime: false,
        pieces: [
          {gte: 1000},            // (1500, Infinity]
          {gte: 600, lte: 999},  // (900, 1500]
          {gte: 200, lte: 599},  // (310, 1000]
          {gte: 50, lte: 199},   // (200, 300]
          {gte: 10, lte: 49 },
          {lte: 9}
        ],
        textStyle: {
          color: '#fff',
        },
        inRange: {
          color: [
            '#c7d6de',
            '#94bbcf',
            '#72b2c9',
            '#75a8c6',
            '#4c8fb5',
            '#3c80b1',
          ]
        }
      },
      darkMode: true,
      color: [
        '#c7d6de',
        '#94bbcf',
        '#72b2c9',
        '#75a8c6',
        '#4c8fb5',
        '#3c80b1',
      ],
      series: [
        {
          name: '项目数量',
          type: 'map',
          roam: false,
          map: 'CHINA',
          emphasis: {
            label: {
              show: true
            },
            itemStyle: {
              color: '#02bce8'
            },
          },
          nameMap: {

          },
          colorBy: 'data',
          data: [
            {name: '河北', value: 1},
          ],
          markPoint: {
            symbol: `image://${icon}`,
            symbolSize: 24,
            symbolOffset: [12, 24] ,
            data: projectStore.projectList.map(item => ({
              ...item,
              coord: [item.lng, item.lat],
              name: item.name,
              id: item.id,
            })),
          },
          itemStyle: {
            borderColor: '#8ac2d0',
            areaColor: '#1a1b1e',
            shadowColor: '#fff',
            shadowBlur:  3,
          },
          markLine: {
            lineStyle: {
              color: 'green',
            },
          },
          select: {
            label: {
              show: true,
            },
          },
        },
      ],
    })
  })
  const myChart = echarts.init(echartsDomRef.value);
  const gridValue = '55%';
  const axisProps = {
    nameTextStyle: {
      color: '#fff',
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#409EFF',
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
        source: Array(24).fill(1).map((_, i) => [i + 1, i * 0.5 + Math.random()]),
      },
      {
        dimensions: ['time', 'value'],
        source: Array(24).fill(1).map((_, i) => [i + 1, i * 0.6 + 1 + Math.random()]),
      },
      {
        dimensions: ['time', 'value'],
        source: Array(24).fill(1).map((_, i) => [i + 1, i * 0.7 + 1 + Math.random()]),
      },
      {
        dimensions: ['time', 'value'],
        source: Array(24).fill(1).map((_, i) => [i + 1, i * 0.4 + 1 + Math.random()]),
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
        color: '#409EFF',
      },
      ...item,
    }))
  });
});

onUnmounted(() => {
});
const userStore = useUserStore()
const userName = computed(() => userStore.user.nickname ?? 'Admin')

  const sex = '先生'
const totalList = [{
  label: '用户总量',
  key: 'userCount',
  unit: '个',
}, {
  label: '项目总量',
  key: 'projectCount',
  unit: '个',
}, {
  label: '设备总量',
  key: 'deviceCount',
  unit: '台',
}, {
  label: '负荷总量',
  key: 'user3',
  value: '-',
  unit: 'kW',
}, {
  label: '电源总量',
  key: 'user4',
  value: '-',
  unit: 'kWh',
}, {
  label: '储能总量',
  key: 'user5',
  unit: 'kWh',
  value: '-',
}]
const todayData = [
  {
    label: '购电总量',
    key: '1',
    value: 5,
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
const handleClickMarker = (item) => {

}
const handleMapReady = ({ BMap, map}) => {
  console.log(BMap, map);

}
const handleShowProject = () => {
  drawer.value = true;
}
const handleHideProject = () => {
  drawer.value = false;
}

</script>

<template>
  <section class="pos-relative flex-[1]">
    <header class="flex flex-justify-between index-header  gap-10px pa-10px color-[var(--screen-content-text-color)]">
      <div>尊敬的{{userName}}{{sex}}，您好</div>
      <div>数据更新时间：{{ time }}</div>
    </header>
    <article class="index-content">
      <section class="sideLeft">
        <aside class="side-list">
          <div class="side-item" v-for="item in totalList" :key="item.key">
            <span>{{item.label}}</span>
            <span>{{keyValue[item.key] || item.value}}{{item.unit}}</span>
          </div>
        </aside>
        <div class="echarts" ref="echartsDomRef"></div>
      </section>
      <div class="mapCharts" ref="mapDomRef"></div>
      <!--    <baidu-map
            class="bm-view"
            @ready="handleMapReady"
            :zoom="5"
            :dragging="false"
            scroll-wheel-zoom
            :mapStyle="mapStyle"
            :center="{lng: 105.404, lat: 38.915}"
          >
            <bm-marker
              v-for="item in projectList"
              :position="{lat: item.lat, lng: item.lng}"
              :key="item.name"
              @click="handleClickMarker(item)"
              :icon="{url: icon, size: {width: 32, height: 32}}"
            />
          </baidu-map>-->
    </article>
  </section>

</template>

<style scoped lang="scss">
.index-header{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #999;
  background: linear-gradient(to bottom, #666,  #333,50%, #222);
  box-shadow:0 10px 10px 0 #333;
  z-index: 8;
}
.index-content{
  height: 100%;
  box-sizing: border-box;
  padding-top: 60px;
}
:deep{
  .drawer-project{
    .el-drawer{
      background: linear-gradient(to bottom, #676b78, #385693, #273b66, #181819);
    }
  }
}

  .sideLeft{
    position: absolute;
    z-index: 2;
    left: 50px;
    top: 80px;
    bottom: 10px;
    font-size: 24px;
    display: flex;
    flex-direction: column;
  }
  .sideHeader{
    position: absolute;
    z-index: 20;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
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
  .mapCharts{
    width: 100%;
    height: 100%;
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
  .province-item{
    padding: 8px 12px;
    width: 200px;
    font-size: 18px;
    border: 1px solid var(--el-border-color);
    cursor: pointer;
    background-color: var(--el-color-primary-dark-2);
  }
</style>
