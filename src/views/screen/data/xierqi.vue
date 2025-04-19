<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'
import CardHeader from "@/views/screen/components/CardHeader.vue";
import * as echarts from "echarts";
import screenConfig from "@/views/screen/config/echart.json";
import { getLatestPrice, getPanelData } from "@/services/services/IotReportController";
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
import dot from '@/views/screen/assets/data/dot.png'
import batteryBlue from '@/views/screen/assets/real/battery-blue.png'
import batteryGreen from '@/views/screen/assets/real/battery-green.png'
import money from '@/views/screen/assets/real/money.png'
import building from '@/views/screen/assets/5421744856302_.pic.png'

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

// 添加两个新的ref用于Echarts圆环图
const supplyChartRef = ref();
const microGridChartRef = ref();

// 解决无法访问初始化函数的问题，先定义函数

// 初始化供电电量圆环图的方法
function initSupplyChart() {
  if (!supplyChartRef.value) return;

  const chart = echarts.init(supplyChartRef.value, screenConfig);
  const microGridValue = getValue('上日微电网供电电量', false) || 35;
  const totalValue = (getValue('上日计划用电量', false) || 50);
  const percentage = Math.round((microGridValue / totalValue) * 100);

  chart.setOption({
    backgroundColor: 'transparent',
    title: {
      text: '上日微电网供电电量',
      subtext: `${microGridValue}kWh`,
      left: 'center',
      top: '25%',
      textStyle: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold'
      },
      subtextStyle: {
        color: '#FCFF00',
        fontSize: 20,
        fontWeight: 'bold'
      }
    },
    graphic: {
      type: 'text',
      left: 'center',
      top: '65%',
      style: {
        text: `占比 ${percentage}%`,
        textAlign: 'center',
        fill: '#FCFF00',
        fontSize: 14,
        fontWeight: 'bold'
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['70%', '90%'],
        center: ['50%', '50%'],
        startAngle: 90,
        data: [
          {
            value: percentage,
            name: '已使用',
            itemStyle: {
              color: '#FCFF00'
            }
          },
          {
            value: 100 - percentage,
            name: '未使用',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#0066FF' },
                { offset: 1, color: '#4e71c6' }
              ])
            }
          }
        ],
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        silent: true,
        clockwise: true,
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicInOut'
      }
    ]
  });

  // 监听容器大小变化，自动调整图表大小
  useResizeObserver(supplyChartRef, () => {
    chart && chart.resize();
  });
}

// 初始化微网供电量圆环图的方法
function initMicroGridChart() {
  if (!microGridChartRef.value) return;

  const chart = echarts.init(microGridChartRef.value, screenConfig);
  const microGridValue = getValue('微网提供的总电量', false) || 7.1;
  const totalValue = getValue('累计用电量', false) || 10.1;
  const percentage = Math.round((microGridValue / totalValue) * 100);

  chart.setOption({
    backgroundColor: 'transparent',
    title: {
      text: '微网提供的总电量',
      subtext: `${microGridValue}kWh`,
      left: 'center',
      top: '25%',
      textStyle: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold'
      },
      subtextStyle: {
        color: '#FCFF00',
        fontSize: 20,
        fontWeight: 'bold'
      }
    },
    graphic: {
      type: 'text',
      left: 'center',
      top: '65%',
      style: {
        text: `占比 ${percentage}%`,
        textAlign: 'center',
        fill: '#FCFF00',
        fontSize: 14,
        fontWeight: 'bold'
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['70%', '90%'],
        center: ['50%', '50%'],
        startAngle: 90,
        data: [
          {
            value: percentage,
            name: '微网供电',
            itemStyle: {
              color: '#FF3030'
            }
          },
          {
            value: 100 - percentage,
            name: '其他供电',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#0066FF' },
                { offset: 1, color: '#4e71c6' }
              ])
            }
          }
        ],
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        silent: true,
        clockwise: true,
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicInOut'
      }
    ]
  });

  // 监听容器大小变化，自动调整图表大小
  useResizeObserver(microGridChartRef, () => {
    chart && chart.resize();
  });
}

watchEffect(() => {
  if (projectStore.projectInfo) {
    getLastData();
  }
})

// 添加数据变化时重新渲染图表的监听
watchEffect(() => {
  if (keyValue.value) {
    initSupplyChart();
    initMicroGridChart();
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

  // 初始化实时电价图表
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

  // 初始化供电电量和微网供电量图表
  initSupplyChart();
  initMicroGridChart();
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

const getValue = (key: string, hasEmpty: boolean) => {
  const v = unref(keyValue)[key];
  if (!v && v !== 0 && hasEmpty) {
    return '-'
  }
  return v;
}
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
                <img :src="item.icon" :style="{ width: item.iconWidth + 'px' }" alt="" />
              </div>
              <div class="ml-8px w-0 flex-1">
                <div class="fw-bold text-14px line-height-20px">{{ item.label }}</div>
                <div class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px line-height-24px">
                  {{ item.render ? item.render() : getValue(item.valKey, true) || '-' }}{{
                    item.unit
                  }}
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
                {{ getValue('用电功率', true) || '-5.59' }}KW
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
            <div v-for="type in solarTypes" :key="type.value" class="flex-1 flex items-center" :class="type.cls">
              <div class="bg-icon">
                <img :src="type.icon" :class="type.iconCls" alt="" />
              </div>
              <div class="ml-10px">
                <div class="ele-title">{{ item.name }}{{ type.label }}</div>
                <div class="ele-value">{{ keyValue[`${type[item.key]}`] || '-' }}{{ type.unit }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center">
        <!-- 建筑模型 -->
        <img :src="building" alt="" class="h-522px w-630px" />
      </div>

      <div class="mt-12px">
        <div class="grid grid-cols-6 gap-2px">
          <div v-for="item in ['a', 'b', 'c']" :key="item" class="grid-box">
            <div class="grid-title">负载点电压V{{ item }}:</div>
            <div class="grid-value">{{ getValue(`负载点电压V${item}`, true) || '220V' }}</div>
          </div>
          <div v-for="item in ['a', 'b', 'c']" :key="item" class="grid-box grid-box-blue">
            <div class="grid-title">负载点电流I{{ item }}:</div>
            <div class="grid-value">{{ getValue(`负载点电流I${item}`, true) || '3A' }}</div>
          </div>
        </div>
        <div class="grid grid-cols-6 gap-2px mt-12px">
          <div v-for="item in ['a', 'b', 'c']" :key="item" class="grid-box">
            <div class="grid-title">并网点电压V{{ item }}:</div>
            <div class="grid-value">{{ getValue(`并网点电压V${item}`, true) || '220V' }}</div>
          </div>
          <div v-for="item in ['a', 'b', 'c']" :key="item" class="grid-box grid-box-blue">
            <div class="grid-title">并网点电流I{{ item }}:</div>
            <div class="grid-value">{{ getValue(`并网点电流I${item}`, true) || '3A' }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-23.5% pr-20px">
      <card-header title="光伏" />
      <div class="pie-statistics shadow-bg">
        <div class="flex items-center h-7vw">
          <div ref="supplyChartRef" class="w-50% h-full"></div>
          <div class="w-50% pl-25px">
            <div class="font-you-she-biao-ti-hei fw-bold text-16px mb-6px">上日计划用电量</div>
            <div class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px">
              {{ getValue('上日计划用电量', true) || '50' }}kWh
            </div>
          </div>
        </div>
      </div>

      <div class="pie-statistics shadow-bg mt-12px">
        <div class="flex items-center h-7vw">
          <div ref="microGridChartRef" class="w-50% h-full"></div>
          <div class="w-50% pl-25px">
            <div class="font-you-she-biao-ti-hei fw-bold text-16px mb-6px">累计用电量</div>
            <div class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px">
              {{ getValue('累计用电量', true) || '10.1' }}kWh
            </div>
          </div>
        </div>
      </div>
      <!-- 光伏发电量 -->
      <div class="mt-30px">
        <div class="bg-icon-primary flex items-center h-88px">
          <div class="bg-icon h-full w-88px">
            <img :src="batteryGreen" style="width: 30px;" alt="光伏发电量" />
          </div>
          <div class="ml-10px w-0 flex-1">
            <div class="info-row">
              <div class="info-block">
                <div class="ele-title">当日光伏发电：</div>
                <div class="ele-value">{{ getValue('当日光伏发电', true) || '8.2' }}KWH</div>
              </div>
              <div class="info-block">
                <div class="ele-title">当日电池发电：</div>
                <div class="ele-value">{{ getValue('当日电池发电', true) || '7.1' }}KWH</div>
              </div>
              <div class="info-block">
                <div class="ele-title">占比</div>
                <div class="ele-value color-#FCFF00">{{ getValue('光电占比', true) || '100' }}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 开销电费 -->
      <div class="mt-30px">
        <div class="bg-icon-primary flex items-center h-88px">
          <div class="bg-icon h-full w-88px">
            <img :src="money" style="width: 35px;" alt="开销电费" />
          </div>
          <div class="ml-10px w-0 flex-1">
            <div class="info-row">
              <div class="info-block">
                <div class="ele-title">上日开销电费：</div>
                <div class="ele-value">{{ getValue('上日开销电费', true) || '7000' }}元</div>
              </div>
              <div class="info-block">
                <div class="ele-title">上日节约电费：</div>
                <div class="ele-value">{{ getValue('上日节约电费', true) || '6000' }}元</div>
              </div>
              <div class="info-block">
                <div class="ele-title">上日减少碳排：</div>
                <div class="ele-value color-#FCFF00">{{ getValue('上日减少碳排', true) || '12' }}kg</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 累计用电 -->
      <div class="mt-30px">
        <div class="bg-icon-success flex items-center h-88px">
          <div class="bg-icon h-full w-88px">
            <img :src="icon3" style="width: 50px;" alt="累计用电" />
          </div>
          <div class="ml-10px w-0 flex-1">
            <div class="info-row">
              <div class="info-block">
                <div class="ele-title">当日累计用电：</div>
                <div class="ele-value">{{ getValue('当日累计用电', true) || '5001' }}KWH</div>
              </div>
              <div class="info-block">
                <div class="ele-title">当日峰值用电：</div>
                <div class="ele-value">{{ getValue('当日峰值用电', true) || '1.3' }}KWH</div>
              </div>
              <div class="info-block">
                <div class="ele-title">当日峰值功率：</div>
                <div class="ele-value">{{ getValue('当日峰值功率', true) || '9.32' }}KWH</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 累计发电 -->
      <div class="mt-30px">
        <div class="bg-icon-success flex items-center h-88px">
          <div class="bg-icon h-full w-88px">
            <img :src="batteryBlue" style="width: 30px;" alt="累计发电" />
          </div>
          <div class="ml-10px w-0 flex-1">
            <div class="info-row">
              <div class="info-block">
                <div class="ele-title">当日光伏发电：</div>
                <div class="ele-value">{{ getValue('当日光伏发电量', true) || '8.2' }}KWH</div>
              </div>
              <div class="info-block">
                <div class="ele-title">当日电池发电：</div>
                <div class="ele-value">{{ getValue('当日电池发电量', true) || '7.1' }}KWH</div>
              </div>
              <div class="info-block">
                <div class="ele-title">当日电池容量：</div>
                <div class="ele-value">{{ getValue('当日电池容量', true) || '2.1' }}KWH</div>
              </div>
            </div>
          </div>
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
  width: 88px;
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

.grid-box {
  background-color: rgba(2, 74, 138, 0.3);
  border-left: 3px solid rgba(30, 188, 161, 1);
  padding: 12px 16px;
  text-align: center;
  color: #fff;
}

.grid-box-blue {
  border-left: 3px solid rgba(25, 164, 255, 1);
}

.grid-title {
  color: rgba(30, 188, 161, 1);
  font-size: 14px;
  font-weight: bold;
}

.grid-box-blue .grid-title {
  color: rgba(25, 164, 255, 1);
}

.grid-value {
  font-size: 22px;
  font-weight: bold;
  color: #fff;
}

// 添加新的样式
.energy-info-box {
  display: flex;
  background-color: rgba(0, 32, 56, 0.6);
  box-shadow: inset 0 0 20px 0px #024A8A;
  border-radius: 4px;
  padding: 16px;
  overflow: hidden;
  height: 88px;
  position: relative;
  border-left: 2px solid #01CEDC;
}

.energy-info-list {
  display: flex;
  overflow: hidden;
  height: 88px;
  position: relative;
  border-left: 2px solid #01CEDC;
}


.info-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: 10px;
    top: -16px;
    bottom: -16px;
    width: 60px;
    background-color: rgba(58, 235, 240, 0.6);
    z-index: 0;
  }

  img {
    position: relative;
    z-index: 1;
  }
}

.info-content {
  flex: 1;
  padding-left: 30px;
}

.info-row {
  display: flex;
  align-items: center;
  height: 100%;
}

.info-block {
  margin-right: 30px;

  &:last-child {
    display: flex;
    align-items: center;
  }
}

.info-label {
  font-size: 16px;
  color: #3DBDFF;
  font-weight: bold;
  margin-bottom: 8px;
}

.info-value {
  font-size: 26px;
  color: #3DBDFF;
  font-weight: bold;
}

.info-value-yellow {
  font-size: 26px;
  color: #FFFF00;
  font-weight: bold;
}

.battery-blue {
  filter: hue-rotate(140deg) brightness(1.2);
}
</style>
