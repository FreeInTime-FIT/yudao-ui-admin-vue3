<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'
import CardHeader from "@/views/screen/components/CardHeader.vue";
import PieBattery from "@/views/screen/components/PieBattery.vue";
import * as echarts from "echarts";
import screenConfig from "@/views/screen/config/echart.json";
import {
  getLatestPrice, getPanelData
} from "@/services/services/IotReportController";
import dayjs from "dayjs";
import { useProjectStore } from "@/store/modules/project";
import cdlIcon from "@/views/screen/assets/real/icon-cdl.png";
import gfIcon from "@/views/screen/assets/real/icon-gf.png";
import tdIcon3 from "@/views/screen/assets/real/today-icon-3.png";
import tdIcon2 from "@/views/screen/assets/real/today-icon-2.png";
import tdIcon1 from "@/views/screen/assets/real/today-icon-1.png";
import icon1 from "@/views/screen/assets/data/icon-1.png";
import icon2 from "@/views/screen/assets/data/icon-2.png";
import icon3 from "@/views/screen/assets/data/icon-3.png";
import icon4 from "@/views/screen/assets/data/icon-4.png";
import icon5 from "@/views/screen/assets/data/icon-5.png";
import icon6 from "@/views/screen/assets/data/xiaoyi-icon-1.png";
import icon7 from "@/views/screen/assets/data/xiaoyi-icon-2.png";
import icon8 from "@/views/screen/assets/real/center-elc-icon.png";
import eleIcon from "@/views/screen/assets/real/center-elc-icon.png";
import dot from '@/views/screen/assets/data/dot.png'

defineOptions({ name: '云监控系统' })

const keyValue = ref<Record<string, any>>({});
const projectStore = useProjectStore();

const getLastData = async () => {
  const res = await getPanelData({
    key: 'xierqi',
    projectId: projectStore.projectInfo?.id,
  })
  keyValue.value = res.data || {};
  return res;
}

const realRef = ref();
const realChartRef = ref();

const useTotalOptions = {
  legend: {
    bottom: 0,
    right: 0,
    left: undefined,
    top: undefined,
    width: '100%',
    orient: 'horizontal',
  },
  title: {
    left: '54%',
  },
  series: {
    top: 0,
    bottom: 10,
    left: '30%',
  },
}

const useCurrentOptions = {
  legend: {
    bottom: 0,
    right: 0,
    left: undefined,
    top: undefined,
    width: '100%',
    orient: 'horizontal',
  },
  series: {
    left: '30%',
    bottom: 10,
  },
  title: {
    left: '54%',
  },
}

const useTotalRef = computed(() => {
  return {
    dimensions: ['label', 'value'],
    source: [
      {
        label: '上日剩余供电电量',
        value: getValue('上日剩余供电电量', false) || 35,
      }, 
      {
        label: '占比',
        value: getValue('上日剩余供电占比', false) || 70,
      }
    ],
  }
})

const getterTotalRef = computed(() => {
  return {
    dimensions: ['label', 'value'],
    source: [
      {
        label: '微网提供的总电量',
        value: getValue('微网提供的总电量', false) || 7.1,
      }, 
      {
        label: '占比',
        value: getValue('微网总电量占比', false) || 70,
      }
    ],
  }
})

watchEffect(() => {
  if (projectStore.projectInfo) {
    getLastData();
  }
})

let timer = setInterval(() => {
  if (projectStore.projectInfo) {
    getLastData();
  }
}, 5000)

useResizeObserver(realRef, () => {
  if (realChartRef.value) {
    realChartRef.value.resize();
  }
});

onUnmounted(() => {
  clearInterval(timer);
})

onMounted(() => {
  if (projectStore.projectInfo) {
    getLastData();
  }
})

const getValue = (key: string, hasEmpty: boolean) => {
  const v = unref(keyValue)[key];
  if (!v && v !== 0 && hasEmpty) {
    return '-'
  }
  return v;
}

onMounted(() => {
  const chart = echarts.init(realRef.value, screenConfig);
  const axisProps = {
    nameTextStyle: {
      color: '#fff',
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: 'yellow',
      },
      symbol: ['none', 'arrow'],
    },
    axisTick: {
      show: true,
    },
    axisLabel: {
      show: true,
      hideOverlap: true,
    },
    splitLine: {
      show: true,
    },
  }
  
  const valueTypes = [{
    value: 'price',
    label: '今天',
    color: '#FFAE3A',
  }]
  
  getLatestPrice({
    key: '实时电价'
  }).then(res => {
    chart.setOption({
      backgroundColor: 'transparent',
      top: 0,
      bottom: 0,
      dataset: {
        ...(res.data || {}),
        source: ((res.data?.source?.length ? res.data.source : [
          {
            hour: '00:00',
            price: 0.3,
          },
          {
            hour: '04:00',
            price: 0.2
          },
          {
            hour: '08:00',
            price: 0.6
          },
          {
            hour: '12:00',
            price: 0.91
          },
          {
            hour: '16:00',
            price: 0.8
          },
          {
            hour: '20:00',
            price: 0.5
          },
          {
            hour: '24:00',
            price: 0.3
          },
        ])).map(item => ({
          ...item,
          hour: dayjs(item.hour, 'HH:mm').toDate(),
        }))
      },
      xAxis: {
        ...axisProps,
        type: 'time',
        min: dayjs('00:00', 'HH:mm').toDate(),
        max: dayjs('00:00', 'HH:mm').add(1, 'day').toDate(),
        splitLine: {
          show: true,
          lineStyle: {
            color: '#024a8a'
          },
        },
        interval: 1000 * 60 * 60 * 4,
        axisLabel: {
          formatter: function (value: any) {
            return dayjs(value).format('HH:mm');
          }
        },
      },
      yAxis: {
        ...axisProps,
        name: '单位: 元',
        nameLocation: 'end',
        nameGap: 20,
        splitLine: {
          show: false,
        },
        axisLabel: {
          margin: 20,
        },
      },
      grid: {
        backgroundColor: 'transparent',
      },
      legend: {
        icon: 'rect',
        right: 20,
        top: 20,
        itemWidth: 12,
        itemHeight: 12,
        show: true,
        backgroundColor: 'transparent',
        data: valueTypes.map((type) => ({
          name: type.label,
          itemStyle: {
            color: type.color,
          },
        })),
      },
      series: valueTypes.map((type) => ({
        type: 'line',
        smooth: true,
        name: type.label,
        encode: {
          x: 'hour',
          y: type.value,
        },
        step: 'end',
        itemStyle: {
          color: type.color,
        },
        lineStyle: {
          width: 1,
        },
        labelLine: {
          show: false,
        },
        markPoint: {
          symbol: 'rect',
        },
        symbol: `image://${dot}`,
        symbolSize: [6, 8],
        showSymbol: true,
      }))
    })
  })
  
  realChartRef.value = chart;
})

const solarList = [
  {
    id: '1',
    name: '光伏1',
    type: 'pv1',
    key: 'gf1',
  },
  {
    id: '2',
    name: '光伏2',
    type: 'pv2',
    key: 'gf2',
  },
]

const solarTypes = [
  {
    value: 'fdl',
    label: '发电量',
    unit: 'KWH',
    gf1: '光伏1发电量',
    gf2: '光伏2发电量',
    icon: icon1,
    iconCls: 'w-41px',
    cls: 'bg-icon-primary'
  },
  {
    value: 'fdl1',
    label: '电流',
    unit: 'A',
    gf1: '光伏1电流',
    gf2: '光伏2电流',
    icon: icon2,
    iconCls: 'w-41px',
    cls: 'bg-icon-primary'
  },
  {
    value: 'fdl12',
    label: '电压',
    unit: 'V',
    gf1: '光伏1电压',
    gf2: '光伏2电压',
    icon: icon3,
    iconCls: 'w-36px',
    cls: 'bg-icon-success'
  },
  {
    value: 'fdl34',
    label: '功率',
    unit: 'KW',
    gf1: '光伏1功率',
    gf2: '光伏2功率',
    icon: icon4,
    iconCls: 'w-35px',
    cls: 'bg-icon-success'
  },
]

const batteryInfo = [
  {
    label: '电池电量(电池SOC)',
    key: '1',
    valKey: '电池电量',
    unit: '%',
    icon: cdlIcon,
    iconWidth: 26,
  },
  {
    label: '充放电次数(14日)',
    key: '2',
    valKey: '充放电次数',
    unit: '',
    icon: gfIcon,
    iconWidth: 44,
  },
  {
    label: '功率',
    key: '3',
    unit: 'KW',
    valKey: '电池功率',
    icon: tdIcon3,
    iconWidth: 27,
  },
  {
    label: '状态',
    key: '4',
    valKey: '电池功率',
    icon: tdIcon3,
    iconWidth: 27,
    render() {
      const v = getValue('电池功率', false);
      if (!v && v !== 0) {
        return '-'
      }
      if (v > 0) {
        return '放电'
      }
      return '充电';
    },
  },
  {
    label: '温度-单体温度最大值',
    key: '5',
    valKey: '单体温度最大值',
    icon: tdIcon2,
    unit: '°',
    iconWidth: 25,
  },
  {
    label: '温度-单体温度最小值',
    key: '6',
    valKey: '单体温度最小值',
    unit: '°',
    icon: tdIcon1,
    iconWidth: 26,
  },
]
</script>

<template>
  <div class="flex gap-24px">
    <div class="w-24%">
      <article>
        <CardHeader title='实时电价' />
        <div class="real-price shadow-bg !p-0" ref="realRef"></div>
      </article>

      <article class="mt-12px">
        <CardHeader title='电池' />
        <div class="flex flex-wrap shadow-bg !pt-30px">
          <div v-for="item in batteryInfo" :key="item.key" class="w-50%">
            <div class="flex items-center mb-16px pl-10px">
              <div class="today-bg">
                <img :src="item.icon" :style="{width: item.iconWidth + 'px'}" alt="" />
              </div>
              <div class="ml-8px w-0 flex-1">
                <div class="fw-bold text-14px line-height-20px">{{item.label}}</div>
                <div class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px line-height-24px">
                  {{item.render ? item.render() : getValue(item.valKey, true) || '-'}}{{item.unit}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article class="mt-12px">
        <CardHeader title='负载' />
        <div class="shadow-bg">
          <div class="flex items-center mb-16px pl-10px">
            <div class="today-bg">
              <img :src="tdIcon3" style="width: 27px;" alt="" />
            </div>
            <div class="ml-8px w-0 flex-1">
              <div class="fw-bold text-14px line-height-20px">用电功率</div>
              <div class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px line-height-24px">
                {{getValue('用电功率', true) || '-5.59'}}KW
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>

    <div class="flex-1">
      <card-header title="光伏" />
      <div class="flex gap-8px pt-4px">
        <div class="flex-1">
          <div class="flex gap-8px mb-8px" v-for="item in solarList" :key="item.id">
            <div
              v-for="type in solarTypes"
              :key="type.value"
              class="flex-1 flex items-center"
              :class="type.cls"
            >
              <div class="bg-icon">
                <img
                  :src="type.icon"
                  :class="type.iconCls"
                  alt="" 
                />
              </div>
              <div class="ml-10px">
                <div class="ele-title">{{item.name}}{{type.label}}</div>
                <div class="ele-value">{{keyValue[`${type[item.key]}`] || '-'}}{{type.unit}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="h-40%">
        <div class="flex-1 h-full board-building">
          <!-- 建筑模型 -->
        </div>
      </div>

      <div class="grid grid-cols-3 gap-8px mt-12px">
        <div v-for="i in 6" :key="i" class="load-box">
          <div class="load-title">
            <span>负载点电压{{ i > 3 ? 'V' + (i-3) : i }}a:</span>
            <span>{{getValue(`负载点电压${i > 3 ? 'V' + (i-3) : i}a`, true) || '220V'}}</span>
          </div>
          <div class="load-title">
            <span>负载点电流{{ i > 3 ? 'I' + (i-3) : i }}a:</span>
            <span>{{getValue(`负载点电流${i > 3 ? 'I' + (i-3) : i}a`, true) || '3A'}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="w-23.5% pr-20px">
      <div class="pie-statistics shadow-bg">
        <div class="flex-1">
          <PieBattery
            class="h-13vw"
            title="上日剩余供电电量"
            unit="kWh"
            :options="useCurrentOptions"
            :data="useTotalRef"
          />
          <div class="text-center mb-8px">
            <span class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px">{{getValue('上日计划用电量', true) || '50'}}kWh</span>
          </div>
        </div>
      </div>

      <div class="pie-statistics shadow-bg mt-12px">
        <div class="flex-1">
          <PieBattery
            class="h-13vw"
            title="微网供电量"
            unit="kWh"
            :options="useCurrentOptions"
            :data="getterTotalRef"
          />
          <div class="text-center mb-8px">
            <span class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px">{{getValue('累计用电量', true) || '10.1'}}kWh</span>
          </div>
        </div>
      </div>

      <div class="mt-12px shadow-bg p-12px">
        <div class="battery-info-item">
          <div class="font-you-she-biao-ti-hei fw-bold text-16px">上日光伏发电：</div>
          <div class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px">{{getValue('上日光伏发电', true) || '8.1'}}KWH</div>
        </div>
        <div class="battery-info-item">
          <div class="font-you-she-biao-ti-hei fw-bold text-16px">上日用电用量：</div>
          <div class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px">{{getValue('上日用电用量', true) || '8.1'}}KWH</div>
        </div>
        <div class="battery-info-item">
          <div class="font-you-she-biao-ti-hei fw-bold text-16px">占比：</div>
          <div class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px">{{getValue('占比', true) || '100'}}%</div>
        </div>
      </div>

      <div class="mt-12px shadow-bg p-12px">
        <div class="battery-info-item">
          <div class="font-you-she-biao-ti-hei fw-bold text-16px">上日节约电费：</div>
          <div class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px">{{getValue('上日节约电费', true) || '7000'}}元</div>
        </div>
        <div class="battery-info-item">
          <div class="font-you-she-biao-ti-hei fw-bold text-16px">上日节约电量：</div>
          <div class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px">{{getValue('上日节约电量', true) || '6000'}}元</div>
        </div>
        <div class="battery-info-item">
          <div class="font-you-she-biao-ti-hei fw-bold text-16px">上日减少排放：</div>
          <div class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px">{{getValue('上日减少排放', true) || '12'}}kg</div>
        </div>
      </div>

      <div class="mt-12px shadow-bg p-12px">
        <div class="battery-info-item">
          <div class="font-you-she-biao-ti-hei fw-bold text-16px">当日累计用电：</div>
          <div class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px">{{getValue('当日累计用电', true) || '5001'}}KWH</div>
        </div>
        <div class="battery-info-item">
          <div class="font-you-she-biao-ti-hei fw-bold text-16px">当日峰谷用电：</div>
          <div class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px">{{getValue('当日峰谷用电', true) || '1.3'}}KWH</div>
        </div>
        <div class="battery-info-item">
          <div class="font-you-she-biao-ti-hei fw-bold text-16px">当日峰值电荷：</div>
          <div class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px">{{getValue('当日峰值电荷', true) || '9.32'}}KWH</div>
        </div>
      </div>

      <div class="mt-12px shadow-bg p-12px">
        <div class="battery-info-item">
          <div class="font-you-she-biao-ti-hei fw-bold text-16px">当日光伏发电：</div>
          <div class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px">{{getValue('当日光伏发电', true) || '8.2'}}KWH</div>
        </div>
        <div class="battery-info-item">
          <div class="font-you-she-biao-ti-hei fw-bold text-16px">当日电池放电：</div>
          <div class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px">{{getValue('当日电池放电', true) || '7.1'}}KWH</div>
        </div>
        <div class="battery-info-item">
          <div class="font-you-she-biao-ti-hei fw-bold text-16px">当日电池充电：</div>
          <div class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px">{{getValue('当日电池充电', true) || '2.1'}}KWH</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.real-price {
  box-sizing: border-box;
  height: 12vw;
}

.pie-statistics {
  padding: 12px;
}

.battery-info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
}

.board-building {
  background: url(@/views/screen/assets/data/building.png) no-repeat center;
  background-size: contain;
}

.load-box {
  background-color: rgba(2, 74, 138, 0.3);
  border: 1px solid rgba(2, 74, 138, 0.8);
  padding: 8px 12px;
  border-radius: 4px;
}

.load-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-size: 14px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.today-bg {
  width: 55px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(@/views/screen/assets/real/today-bg.png) no-repeat;
  background-size: 100% 100%;
}

.bg-icon-primary {
  background-color: rgba(30, 188, 161, 0.1);
  border-left: 3px solid rgba(30, 188, 161, 1);
  padding-left: 5px;
  
  .bg-icon {
    background-color: rgba(1, 206, 220, 0.2);
  }
  
  .ele-title {
    color: rgba(30, 188, 161, 1);
  }
}

.bg-icon-success {
  background-color: rgba(25, 164, 255, 0.1);
  border-left: 3px solid rgba(25, 164, 255, 1);
  padding-left: 5px;
  
  .ele-title {
    color: rgba(25, 164, 255);
  }

  .bg-icon {
    background-color: rgba(25, 164, 255, 0.2);
  }
}

.bg-icon {
  width: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.ele-title {
  font-weight: bold;
}

.ele-value {
  font-size: 20px;
  font-weight: bold;
}

.shadow-bg {
  padding: 12px;
  box-shadow: inset 0 0 20px 0px #024A8A;
}
</style>
