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
    key: 'Xierqi',
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
// 添加负载功率曲线图ref
const loadChartRef = ref();

// 创建一个ref存储图表实例
const loadChart = ref<echarts.ECharts | null>(null);

// 全局定时器数组，用于统一管理
const timers: NodeJS.Timeout[] = [];

// 添加请求锁，防止重复请求
const isLoadingPowerData = ref(false);

// 初始化供电电量圆环图的方法
function initSupplyChart() {
  if (!supplyChartRef.value) return;

  const chart = echarts.init(supplyChartRef.value, screenConfig);
  const microGridValue = getValue('微网电量', false) || 0;
  const totalValue = (getValue('上日累计量', false)) || 1;
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
  const microGridValue = getValue('微网累计供电量', false) || 7.1;
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

// 初始化负载功率曲线图
function initLoadChart(): echarts.ECharts | null {
  if (!loadChartRef.value) return null;

  const chart = echarts.init(loadChartRef.value, screenConfig);

  // 封装获取数据的方法，方便重复调用
  const fetchPowerData = () => {
    // 如果正在加载数据或没有项目信息，则不发起请求
    if (isLoadingPowerData.value || !projectStore.projectInfo) return;

    // 设置加载状态为true
    isLoadingPowerData.value = true;

    getLatestPrice({
      key: "today_功率曲线",
      projectId: projectStore.projectInfo?.id,
    }).then(res => {
      if (!res.data) return;

      // 定义各曲线的颜色
      const colors = {
        '光伏发电功率': '#FFAE3A',
        '储能充放电功率': '#1EBCA1',
        '总闸功率': '#FF3030',
        '微网并网功率': '#19A4FF',
        '微网负荷功率': '#FCFF00'
      };

      // 将时间字符串转换为日期对象
      const formattedData = (res.data.source || []).map(item => ({
        ...item,
        time: dayjs(item.time).toDate()
      }));

      // 获取所有的数据系列（除了time）
      const seriesKeys = res.data.dimensions.filter(dim => dim !== 'time');

      // 创建数据系列
      const series = seriesKeys.map(key => {
        return {
          name: key,
          type: 'line',
          smooth: true,
          symbolSize: [6, 8],
          showSymbol: false,
          sampling: 'average',
          itemStyle: {
            color: colors[key] || '#1EBCA1'
          },
          lineStyle: {
            width: 2
          },
          // 直接指定数据
          data: formattedData.map(item => {
            return [
              item.time,
              item[key] || 0 // 确保有值，避免undefined
            ];
          })
        };
      });

      chart.setOption({
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            if (!params.length) return '';

            const time = dayjs(params[0].data[0]).format('MM-DD HH:mm');
            let res = `<div>${time}</div>`;

            params.forEach(param => {
              const color = param.color;
              const name = param.seriesName;
              const value = param.data[1];

              res += `<div style="display:flex;align-items:center;">
                      <div style="width:10px;height:10px;border-radius:50%;background:${color};margin-right:5px;"></div>
                      <div>${name}: ${value} kW</div>
                    </div>`;
            });

            return res;
          }
        },
        legend: {
          data: seriesKeys,
          textStyle: {
            color: '#fff'
          },
          right: 10,
          top: 10
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#024a8a'
            }
          },
          axisLabel: {
            color: '#fff',
            formatter: function(value) {
              return dayjs(value).format('HH:mm');
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#024a8a'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: 'kW',
          nameTextStyle: {
            color: '#fff'
          },
          axisLine: {
            lineStyle: {
              color: '#024a8a'
            }
          },
          axisLabel: {
            color: '#fff'
          },
          splitLine: {
            lineStyle: {
              color: '#024a8a'
            }
          }
        },
        series: series
      });
    }).finally(() => {
      // 无论成功失败，都将加载状态设置为false
      isLoadingPowerData.value = false;
    });
  };

  // 首次加载数据
  fetchPowerData();

  // 设置定时器，每10秒刷新一次数据
  let powerChartTimer = setInterval(() => {
    fetchPowerData();
  }, 10000);

  // 添加定时器到全局定时器数组
  timers.push(powerChartTimer);

  // 监听容器大小变化，自动调整图表大小
  useResizeObserver(loadChartRef, () => {
    chart && chart.resize();
  });

  return chart;
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

// 监听projectStore.projectInfo变化，重新初始化负载功率图表
// 使用简单的watch而不是watchEffect，避免多次触发
watch(() => projectStore.projectInfo?.id, (newVal, oldVal) => {
  // 只有当ID真正变化时才重新初始化
  if (newVal && newVal !== oldVal) {
    // 如果图表已经存在，先销毁
    if (loadChart.value) {
      loadChart.value.dispose();
      loadChart.value = null;
    }
    // 重新初始化图表
    nextTick(() => {
      loadChart.value = initLoadChart();
    });
  }
}, { immediate: true })

let timer = setInterval(() => {
  if (projectStore.projectInfo) {
    getLastData();
  }
}, 5000)

// 添加到定时器数组
timers.push(timer);

useResizeObserver(realRef, () => {
  if (realChartRef.value) {
    realChartRef.value.resize();
  }
});

onUnmounted(() => {
  // 清除所有定时器
  timers.forEach(timer => clearInterval(timer));

  // 销毁图表实例
  if (loadChart.value) {
    loadChart.value.dispose();
  }
  if (realChartRef.value) {
    realChartRef.value.dispose();
  }
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

  // 初始化负载功率曲线图
  initLoadChart();
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
    label: '充放电次数(当日)',
    key: '2',
    valKey: '电池充放电次数',
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
    valKey: '电池单体温度最大值',
    icon: tdIcon2,
    unit: '°',
    iconWidth: 25,
  },
  {
    label: '温度-单体温度最小值',
    key: '6',
    valKey: '电池单体温度最小值',
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
  <div class="grid grid-cols-12 gap-6 h-screen p-3">
    <!-- 左侧部分 原来固定宽度460px -->
    <div class="col-span-3">
      <article>
        <CardHeader title='实时电价' />
        <div class="real-price shadow-bg !p-0" ref="realRef"></div>
      </article>

      <article class="mt-3">
        <CardHeader title='电池' />
        <div class="flex flex-wrap shadow-bg !pt-30px">
          <div v-for="item in batteryInfo" :key="item.key" class="w-50%">
            <div class="flex items-center mb-4 pl-3">
              <div class="today-bg">
                <img :src="item.icon" :style="{ width: item.iconWidth + 'px' }" alt="" />
              </div>
              <div class="ml-2 w-0 flex-1">
                <div class="fw-bold text-14px line-height-20px">{{ item.label }}</div>
                <div class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px line-height-24px">
                  {{ item.render ? item.render() : getValue(item.valKey, true) }}{{
                    item.unit
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article class="mt-3">
        <div class="shadow-bg power-chart" ref="loadChartRef"></div>
      </article>
    </div>

    <!-- 中间部分 原来固定宽度960px -->
    <div class="col-span-6">
      <card-header title="光伏" />
      <div class="flex gap-2 pt-1">
        <div class="flex-1">
          <div class="flex gap-2 mb-2" v-for="item in solarList" :key="item.id">
            <div v-for="type in solarTypes" :key="type.value" class="flex-1 flex items-center h-20" :class="type.cls">
              <div class="bg-icon">
                <img :src="type.icon" :class="type.iconCls" alt="" />
              </div>
              <div class="ml-3">
                <div class="ele-title">{{ item.name }}{{ type.label }}</div>
                <div class="ele-value">{{ keyValue[`${type[item.key]}`]}}{{ type.unit }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center my-3 h-500px">
        <!-- 建筑模型 -->
        <img :src="building" alt="" class="max-h-[400px] w-auto" />
      </div>

      <div class="mt-3">
        <div class="grid grid-cols-6 gap-0.5">
          <div v-for="item in ['a', 'b', 'c']" :key="item" class="grid-box">
            <div class="grid-title">负载点电压V{{ item }}:</div>
            <div class="grid-value">{{ getValue(`负载点电压V${item}`, true)}}V</div>
          </div>
          <div v-for="item in ['a', 'b', 'c']" :key="item" class="grid-box grid-box-blue">
            <div class="grid-title">负载点电流I{{ item }}:</div>
            <div class="grid-value">{{ getValue(`负载点电流I${item}`, true) }}A</div>
          </div>
        </div>
        <div class="grid grid-cols-6 gap-0.5 mt-3">
          <div v-for="item in ['a', 'b', 'c']" :key="item" class="grid-box">
            <div class="grid-title">并网点电压V{{ item }}:</div>
            <div class="grid-value">{{ getValue(`并网点电压V${item}`, true) }}V</div>
          </div>
          <div v-for="item in ['a', 'b', 'c']" :key="item" class="grid-box grid-box-blue">
            <div class="grid-title">并网点电流I{{ item }}:</div>
            <div class="grid-value">{{ getValue(`并网点电流I${item}`, true) }}A</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧部分 原来固定宽度450px -->
    <div class="col-span-3">
      <card-header title="电量数据" />
      <div class="pie-statistics shadow-bg">
        <div class="flex items-center h-45 pt-3">
          <div ref="supplyChartRef" class="w-50% h-full"></div>
          <div class="w-50% pl-6">
            <div class="font-you-she-biao-ti-hei fw-bold text-16px mb-2">上日累计量用电量</div>
            <div class="fw-bold text-26px">
              {{ getValue('上日累计量', true) || '50' }}kWh
            </div>
          </div>
        </div>
      </div>

      <div class="pie-statistics shadow-bg mt-3">
        <div class="flex items-center h-45 pt-3">
          <div ref="microGridChartRef" class="w-50% h-full"></div>
          <div class="w-50% pl-6">
            <div class="font-you-she-biao-ti-hei fw-bold text-16px mb-2">累计用电量</div>
            <div class="fw-bold text-26px">
              {{ getValue('累计用电量', true) || '10.1' }}kWh
            </div>
          </div>
        </div>
      </div>
      <!-- 光伏发电量 -->
      <div class="mt-8">
        <div class="bg-icon-primary flex items-center h-22">
          <div class="bg-icon h-full w-22">
            <img :src="batteryGreen" style="width: 30px;" alt="光伏发电量" />
          </div>
          <div class="ml-2 w-0 flex-1">
            <div class="info-row">
              <div class="info-block">
                <div class="ele-title">上日光伏发电：</div>
                <div class="ele-value">{{ getValue('上日光伏发电量',false) }}KWH</div>
              </div>
              <div class="info-block">
                <div class="ele-title">上日电池充电：</div>
                <div class="ele-value">{{ getValue('上日电池充电量', false) }}KWH</div>
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
      <div class="mt-4">
        <div class="bg-icon-primary flex items-center h-22">
          <div class="bg-icon h-full w-22">
            <img :src="money" style="width: 35px;" alt="开销电费" />
          </div>
          <div class="ml-2 w-0 flex-1">
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
                <div class="ele-value color-#FCFF00">{{ getValue('上日减少碳排', false) }}kg</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 累计用电 -->
      <div class="mt-4">
        <div class="bg-icon-success flex items-center h-22">
          <div class="bg-icon h-full w-22">
            <img :src="icon3" style="width: 50px;" alt="累计用电" />
          </div>
          <div class="ml-2 w-0 flex-1">
            <div class="info-row">
              <div class="info-block">
                <div class="ele-title">当日累计用电：</div>
                <div class="ele-value">{{ getValue('当日累计用电', true) || '5001' }}KWH</div>
              </div>
              <div class="info-block">
                <div class="ele-title">当日微网供电：</div>
                <div class="ele-value">{{ getValue('当日微网供电', true) || '1.3' }}KWH</div>
              </div>
              <div class="info-block">
                <div class="ele-title">当日微网取电：</div>
                <div class="ele-value">{{ getValue('当日微网取电', true) || '9.32' }}KWH</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 累计发电 -->
      <div class="mt-4">
        <div class="bg-icon-success flex items-center h-22">
          <div class="bg-icon h-full w-22">
            <img :src="batteryBlue" style="width: 30px;" alt="累计发电" />
          </div>
          <div class="ml-2 w-0 flex-1">
            <div class="info-row">
              <div class="info-block">
                <div class="ele-title">当日光伏发电：</div>
                <div class="ele-value">{{ getValue('当日光伏发电', true) }}KWH</div>
              </div>
              <div class="info-block">
                <div class="ele-title">当日电池充电：</div>
                <div class="ele-value">{{ getValue('当日电池充电', true) }}KWH</div>
              </div>
              <div class="info-block">
                <div class="ele-title">当日电池放电：</div>
                <div class="ele-value">{{ getValue('当日电池放电', true) }}KWH</div>
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
  height: 280px;
}

.power-chart {
  box-sizing: border-box;
  height: 280px;
  padding: 0;
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
  width: min(55px, 15%);
  height: min(54px, 15%);
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
  width: min(88px, 20%);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.ele-title {
  font-weight: bold;
  font-size: 14px;
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
  text-align: center;
  color: #fff;
  height: min(80px, 10vh);
}

.grid-box-blue {
  border-left: 3px solid rgba(25, 164, 255, 1);
}

.grid-title {
  color: rgba(30, 188, 161, 1);
  padding-top: 10px;
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
  margin-top: 6px;
}

.info-row {
  display: flex;
  align-items: center;
  height: 100%;
}

.info-block {
  margin-right: 10px;

}

.color-\#FCFF00 {
  color: #FCFF00;
}

.battery-blue {
  filter: hue-rotate(140deg) brightness(1.2);
}

/* 添加响应式工具类 */
.h-22 {
  height: min(88px, 10vh);
}
.h-20 {
  height: min(80px, 10vh);
}
.h-45 {
  height: min(180px, 20vh);
}
.w-22 {
  width: min(88px, 20%);
}
</style>
