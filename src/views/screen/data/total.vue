<script setup lang="ts">
import * as echarts from 'echarts'
import screenConfig from '@/views/screen/config/echart.json'
import CardHeader from '@/views/screen/components/CardHeader.vue'
import earthBg from '@/views/screen/assets/real/elec-earth.png'
import centerBg from '@/views/screen/assets/data/total-center.png'
import gfIcon from '@/views/screen/assets/data/icon-6.png'
import cdlIcon from '@/views/screen/assets/real/icon-cdl.png'
import fdlIcon from '@/views/screen/assets/real/icon-fdl.png'
import tdIcon2 from '@/views/screen/assets/real/today-icon-2.png'
import tdIcon3 from '@/views/screen/assets/data/icon-3.png'
import tdIcon4 from '@/views/screen/assets/data/battery-icon-3.png'
import PieVoltage from "@/views/screen/components/PieVoltage.vue";
import get from "lodash-es/get";
import {
  getLatestPrice,
  getPanelData
} from "@/services/services/IotReportController";
import {useProjectStore} from "@/store/modules/project";
import {dateFormatter, formatDate} from "@/utils/formatTime";
import dayjs from "dayjs";
echarts.registerTheme('screen', screenConfig);

defineOptions({
  name: 'ScreenDataTotal',
})

const voltageRef = ref();
const ypxingRef = ref();
const prevRef = ref();
const projectStore = useProjectStore();
const keyValue = ref({});

const chunengList: {
  label: string;
  key: string;
  valKey: string;
  valKey2?: string;
  unit?: string;
  icon?: string | Object;
  iconWidth: number;
}[] = [
  {
    label: 'SOC值',
    key: '1',
    valKey:'电池电量',
    unit: '%',
    icon: cdlIcon,
    iconWidth: 26,
  },
  {
    label: '当前充/放电功率',
    key: '1',
    valKey:'当前充电',
    valKey2: '当前放电',
    unit: 'kW',
    icon: fdlIcon,
    iconWidth: 26,
  },
  {
    label: '累计充/放电量',
    key: '1',
    valKey:'累计充电',
    valKey2: '累计放电',
    unit: 'kWh',
    icon: tdIcon2,
    iconWidth: 26,
  },
  {
    label: '当日充/放电量',
    key: '1',
    valKey:'今日充电',
    valKey2: '今日放电',
    unit: 'kWh',
    icon: gfIcon,
    iconWidth: 26,
  },
]

const bianyaqiList = [
  {
    label: '有功功率',
    key: '1',
    valKey:'transformerLoadRatio',
    unit: '%',
    icon: tdIcon4,
    iconWidth: 36,
  },
  {
    label: '功率因数',
    key: '1',
    valKey:'powerFactor',
    unit: 'kW',
    icon: tdIcon4,
    iconWidth: 36,
  },
  {
    label: '电压等级',
    key: '1',
    valKey:'voltageLevel',
    unit: 'kWh',
    icon: tdIcon3,
    iconWidth: 36,
  },
  {
    label: '容量',
    key: '1',
    valKey:'transformerCapacity',
    unit: 'KVA',
    icon: tdIcon3,
    iconWidth: 36,
  },
]

const getData = async () => {
  const res = await  getPanelData({
    key: 'total',
    projectId: projectStore.projectInfo?.id,
  })
  keyValue.value = res.data || {};
  return res;
}

const projectInfo = computed(() => {
  const project = projectStore.projectInfo || {};

 return {
   projectCode: project.code,
   projectName: project.name,
   address: project.address,
   userName: project.ownerName,
   code4: '8000kVA',
   code5: '8000kW',
   latlng: [project.lng, project.lat].join(','),
   ...project,
   r1: '6000kVA',
   fh: '6000kW',
   cn: '电池储能',
   cnrl: '8000kWh',
   edgl: '8000kW',
   dclx: '铅酸电池',
   dcdy: '48V',
   fdsd: '90%',
   xhsm: '1000次循环',
   cfdsl: '2C',
   yqsm: '10年',
   wdfw: '-20℃至60℃',
 }
})
const getValue = (key, unit = '') => {
  let v =  get({
    ...(unref(projectInfo)),
    ...(unref(keyValue)),
  }, key);
  if (v || v === 0)  {
    return v + (unit || '')
  }
  return v || '';
}
let ypxingChart =  null;
let voltageChart = null;
let prevChart = null;
const handleResize = () => {
  console.log(window.innerWidth, window.innerHeight);
  voltageChart?.resize();
  ypxingChart?.resize();
  prevChart?.resize();
}
onMounted( () => {
  voltageChart = echarts.init(voltageRef.value, 'screen');
  ypxingChart = echarts.init(ypxingRef.value, 'screen');
  prevChart = echarts.init(prevRef.value, 'screen');

  const valList = [{
    valueKey: 'a相',
    name: 'A相',
    color: '#FF9E17',
  }, {
    valueKey: 'b相',
    name: 'B相',
    color: '#4FF9FA',
  }, {
    valueKey: 'c相',
    name: 'C相',
    color: '#FF0800',
  }]
  const today = dayjs();
  const xAxis = {
    type: 'time',
    splitLine: {
      show: false,
    },
    axisLine: {
      show: true,
      lineStyle: {
        width: 0.5,
        color: 'rgba(0,170,255,0.47)',
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#00AAFF',
      }
    },
    axisLabel: {
      color: '#00AAFF',
      fontWeight: '600',
    },
  }
  const yAxis = {
    type: 'value',
    nameLocation: 'end',
    splitLine: {
      show: false,
    },
    nameTextStyle: {
      color: '#00AAFF',
      fontWeight: '600',
    },
    axisLabel: {
      color: '#00AAFF',
      fontWeight: '600',
    },
  }
  voltageChart.setOption({
    color: '#fff',
    backgroundColor: 'transparent',
    tooltip: {
      show: true,
    },
    legend: [{
      show: true,
      data: valList.map(item => ({
        name: item.name,
        icon: 'circle',
        itemStyle: {
          color: "#fff",
          borderWidth: 4,
          borderColor: item.color,
        },
      })),
    }],
    dataset: [
    ],
    grid: [
      {
        top: '30%',
        right: '55%',
        left: '5%',
        bottom: '10%',
      },
      {
        top: '30%',
        left: '55%',
        right: '5%',
        bottom: '10%',
      },
    ],
    xAxis: [
      {
        gridIndex: 0,
        ...xAxis,
      },
      {
        gridIndex: 1,
        ...xAxis,
      },
    ],
    yAxis: [
      {
        name: '功率(kW)',
        gridIndex: 0,
        ...yAxis,
      },
      {
        name: '电压(V)',

        gridIndex: 1,
        ...yAxis,
      },
    ],
    series: [0, 1].reduce((res, i) => {
      return [
        ...res,
        ...valList.map(item => {
          return {
            type: 'line',
            xAxisIndex: i,
            yAxisIndex: i,
            datasetIndex: i,
            encode: {
              x: 'time',
              y: item.valueKey,
            },
            name: item.name,
            smooth: true,
            labelLine: {
              show: false,
            },
            lineStyle: {
              color: item.color,
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: item.color,
                },
                {
                  offset: 1,
                  color: 'transparent'
                }
              ])
            },
            showSymbol: false,
          }
        })
      ]
    }, []),
  })
  prevChart.setOption({
    color: '#fff',
    backgroundColor: 'transparent',
    tooltip: {
      show: true,
    },
    legend: [{
      show: true,
      data: valList.map(item => ({
        name: item.name,
        icon: 'circle',
        itemStyle: {
          color: "#fff",
          borderWidth: 4,
          borderColor: item.color,
        },
      })),
    }],
    dataset: [
    ],
    xAxis,
    yAxis: {
      ...yAxis,
      name: '电压(V)',
    },
    series: valList.map(item => {
      return {
        type: 'line',
        encode: {
          x: 'time',
          y: item.valueKey,
        },
        name: item.name,
        smooth: true,
        labelLine: {
          show: false,
        },
        lineStyle: {
          color: item.color,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: item.color,
            },
            {
              offset: 1,
              color: 'transparent'
            }
          ])
        },
        showSymbol: false,
      }
    }),
  })
  ypxingChart.setOption({
    color: '#fff',
    backgroundColor: 'transparent',
    // dataset: {
    //   dimensions: ['power', 'voltage', { name: 'time', type: 'time'}],
    //   source: Array(24).fill(1).map((_, i) => ({
    //     power: Math.round(Math.random() * 60) + 100,
    //     voltage: Math.round(Math.random() * 60) + 100,
    //     time: dayjs(today).hour(i).minute(0).second(0).toDate(),
    //   })),
    // },
    grid: [
      {
        left: '15%',
        right: '10%',
      }
    ],
    xAxis: {
      type: 'time',
      splitLine: {
        show: false,
      },
    },
    yAxis: [{
      nameTextStyle: {
        color: '#fff',
      },
      splitLine: {
        show: true,
      },
    }, {
      name: '电压(V)',
      nameTextStyle: {
        color: '#fff',
      },
      splitLine: {
        show: true,
      },
    }],
    legend: {
      show: true,

      data: [{
        name: '功率',
        itemStyle: {
          color: '#ff0800',
        }
      }, {
        name: '电压',
        itemStyle: {
          color: '#E23AF5',
        }
      }],
    },
    series: [
      {
        type: 'line',
        encode: {
          x: 'time',
          y: '功率',
        },
        name: '功率',
        smooth: true,
        yAxisIndex: 0,
        lineStyle: {
          color: '#FF0800',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(255,255,255,0.4)',
            },
            {
              offset: 1,
              color: 'transparent'
            }
          ])
        },
        showSymbol: false,
      },
      {
        type: 'line',
        smooth: true,
        name: '电压',
        encode: {
          x: 'time',
          y: '电压',
        },
        yAxisIndex: 1,
        lineStyle: {
          color: '#E23AF5',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(255,255,255,0.4)',
            },
            {
              offset: 1,
              color: 'transparent'
            }
          ])
        },
        showSymbol: false,
      },
    ],
  })
  window.addEventListener('resize', handleResize);
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
})
const voltageData = ref({

});
const handleQuery = async ()=> {
  const dataList = await Promise.all([
    getLatestPrice({
      key: "total_今日_电压曲线",
      projectId: projectStore.projectInfo?.id,
    }),
    getLatestPrice({
      key: "total_今日_功率曲线",
      projectId: projectStore.projectInfo?.id,
    }),
    getLatestPrice({
      key: "total_今日_电压功率汇总",
      projectId: projectStore.projectInfo?.id,
    }),
    getLatestPrice({
      key:'全年电压',
      projectId: projectStore.projectInfo?.id,
    }),
    getLatestPrice({
      key:'当月电压',
      projectId: projectStore.projectInfo?.id,
    }),
    getLatestPrice({
      key: "total_治理前_电压曲线",
      projectId: projectStore.projectInfo?.id,
    }),
  ]);
  console.log(dataList)
   if(voltageChart) {
     voltageChart.setOption({
       dataset: [
         !dataList[1].code ?
         {
           ...dataList[1].data,
           source: dataList[1].data.source.map(item => ({
             ...item,
             time: dayjs().hour(item.time).minute(0).second(0).toDate(),
           }))
         } : {},
         !dataList[0].code ? {
           ...dataList[0].data,
           source: dataList[0].data.source.map(item => ({
             ...item,
             time: dayjs().hour(item.time).minute(0).second(0).toDate(),
           }))
           } : {},
       ],
     });
   }
   if (ypxingChart && !dataList[2].code) {
     console.log(dataList[2])
     ypxingChart.setOption({
       dataset: {
         ...dataList[2].data,
         source: dataList[2].data.source.map(item => ({
           ...item,
           time: dayjs().hour(item.time).minute(0).second(0).toDate(),
         }))
       },
     });
   }
  voltageData.value = {
    month: dataList[4].data,
    year: dataList[3].data,
  }
  if (prevChart && !dataList[5].code) {
    prevChart.setOption({
     dataset: {
       ...dataList[5].data,
       source: dataList[5].data.source.map(item => ({
         ...item,
         time: dayjs().hour(item.time).minute(0).second(0).toDate(),
       }))
     }
    });
  }
  console.log(dataList);
}
const powerList = computed(() => {
  const list = keyValue.value['充放电功率表'] || [];
  if (list&&list.length >= 6) {
    return list;
  }
  return Array(6).fill(1).map((_, i) => {
    return list[i] || {};
  })
})
let timer = setInterval(() => {
  getData();
}, 5000)
onUnmounted(() => {
  clearInterval(timer);
})
watch(() => projectStore.projectInfo, (project) => {
  if (!project) {
    projectStore.getProjectList();
    return;
  }
  handleQuery();
  getData();
}, {
  immediate: true,
})
</script>

<template>
  <section class="w-full overflow-x-hidden">
    <div class="flex gap-24px">
      <div class="w-25%">
        <CardHeader title="台区整体情况" >
          <h3 class="text-18px mb-0 mt-0">
            台区整体情况
          </h3>
        </CardHeader>
        <article class="flex mb-20px shadow-bg items-center">
          <div>
            <img :src="earthBg" class="w-95px" alt="" />
          </div>
          <div class="flex-1 p-12px">
            <div class="flex p-[12px_20px_12px_12px]">
              <div class="border-bottom-primary pb-12px">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称</div>
              <div class="border-bottom-primary-1 pb-12px flex-1 text-right">{{getValue('name')}}</div>
            </div>
            <div class="flex  p-[12px_20px_12px_12px]">
              <div class="border-bottom-primary pb-12px">台区位置</div>
              <div class="border-bottom-primary-1 pb-12px flex-1 text-right">{{getValue('address')}}</div>
            </div>
            <div class="flex p-12px border-bottom-blue justify-between">
              <div>储能容量</div>
              <div>{{getValue('platformInfo.energyStorageCapacity', 'kVA')}}</div>
            </div>
            <div class="flex p-12px  border-bottom-blue justify-between">
              <div>变压器容量</div>
              <div>{{getValue('platformInfo.transformerCapacity', 'kVA')}}</div>
            </div>
          </div>
        </article>
        <article class="card-box">
          <CardHeader title="储能信息" />
          <div class="flex flex-wrap shadow-bg">
            <div v-for="item in chunengList" class="w-50%" :key="item.id">
              <div class=" flex items-center mb-20px mr-12px">
                <div class="today-bg">
                  <img :src="item.icon" :style="{width: item.iconWidth + 'px'}"  alt="" />
                </div>
                <div class="ml-8px w-0 flex-1">
                  <div class="fw-bold line-height-20px">{{item.label}}</div>
                  <div class="color-#3DBDFF flex items-center flex-wrap font-you-she-biao-ti-hei fw-bold text-22px line-height-30px">
                    <div class="whitespace-nowrap">
                         <span class="whitespace-nowrap">
                      {{getValue(item.valKey) || item.value || '-'}}
                    </span>
                      <span class="text-12px fw-normal">{{item.unit}}</span>
                    </div>

                    <div class="whitespace-nowrap" v-if="item.valKey2">
                      <span class="ml-3px whitespace-nowrap">{{getValue(item.valKey2) || item.value2 || '-'}}</span>
                      <span class="text-12px fw-normal">{{item.unit}}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </article>
        <article class="">
          <CardHeader title="充放电功率" />
          <article class="shadow-bg">
            <ElTable
              :data="powerList"
              row-key="label"
              current-row-key="start_ts"
              class="data-table"
              stripe
              border
            >
              <ElTableColumn label="充放电状态" min-width="60" prop="status"  >
                <template #default="{row}">
                  <span class="font-bold" v-if="row.sum_value">{{row.sum_value > 0 ? '放电' : '充电'}}</span>
                  <span class="font-bold" v-else-if="row.sum_value === 0">无</span>
                </template>
              </ElTableColumn>
              <ElTableColumn label="功率" min-width="80" prop="sum_value"  >
                <template #default="{row}">
                  {{row.sum_value && Math.abs(row.sum_value)}}
                </template>
              </ElTableColumn>
              <ElTableColumn label="上传时间" min-width="120" prop="start_ts"  >
                <template #default="{row}">
                  {{formatDate(row.start_ts, 'YYYY-MM-DD HH:mm:ss')}}
                </template>
              </ElTableColumn>
            </ElTable>
          </article>
        </article>
      </div>
      <div class="flex-1">
        <div class="total-box">
          <img :src="centerBg" class="w-full" alt="" />
          <div class="content">
            <div class="content_title">变压器负载率{{getValue('transformerLoadRatio')}}%</div>
            <div class="content_list">
              <div v-for="item in bianyaqiList" class="content_item" :class="item.full ? 'w-full' : 'w-50%'" :key="item.id">
                <div class="pr-12px flex items-center">
                  <div class="today-bg">
                    <img :src="item.icon" :style="{width: item.iconWidth + 'px'}"  alt="" />
                  </div>
                  <div class="ml-8px w-0 flex-1">
                    <div class=" line-height-20px">{{item.label}}</div>
                    <div class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px line-height-30px">{{getValue(item.valKey) || item.value || '-'}}{{item.unit}}</div>
                  </div>
                </div>
              </div>
              <div class="content_item w-full">
                <div class="pr-12px flex items-center">
                  <div class="today-bg">
                    <img :src="gfIcon" :style="{width:'32px'}"  alt="" />
                  </div>
                  <div class="ml-8px w-0 flex-1">
                    <div class="text-center line-height-16px">电压电流</div>
                    <div class="flex items-center justify-between">
                      <div>
                        <span>Ua:</span>
                        <span class="font-you-she-biao-ti-hei color-#3DBDFF text-24px">{{getValue('hub_UA')}}V</span>
                      </div>
                      <div>
                        <span>Ub:</span>
                        <span class="font-you-she-biao-ti-hei color-#3DBDFF text-24px">{{getValue('hub_UB')}}V</span>
                      </div>
                      <div>
                        <span>Uc:</span>
                        <span class="font-you-she-biao-ti-hei color-#3DBDFF text-24px">{{getValue('hub_UC')}}V</span>
                      </div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div>
                        <span>La:</span>
                        <span class="font-you-she-biao-ti-hei color-#3DBDFF text-24px">{{getValue('hub_IA')}}A</span>
                      </div>
                      <div>
                        <span>Lb:</span>
                        <span class="font-you-she-biao-ti-hei color-#3DBDFF text-24px">{{getValue('hub_IB')}}A</span>
                      </div>
                      <div>
                        <span>Lc:</span>
                        <span class="font-you-she-biao-ti-hei color-#3DBDFF text-24px">{{getValue('hub_IC')}}A</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <article class="mt-0">
          <CardHeader title="今日数据" />
          <div class="shadow-bg">
            <div ref="voltageRef" class="h-216px"></div>
          </div>
        </article>
      </div>
      <div class="w-24% pr-20px">

        <article class="card-box">
          <CardHeader title="24小时运行数据" />
          <div class="shadow-bg ">
            <div ref="ypxingRef" class="h-275px"></div>
          </div>
        </article>
        <article class="card-box mt-30px">
          <CardHeader title="治理前台区数据" />
          <div class="shadow-bg">
            <div class="h-220px" ref="prevRef"></div>
          </div>

        </article>
        <article class="card-box mt-36px">
          <CardHeader title="台区电压分析" />
          <div class="shadow-bg flex flex-wrap">
            <PieVoltage :data="voltageData" />
          </div>

        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">

  .border-bottom-primary{
    position: relative;
    &:after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: #1EBCA1;
    }
  }
  .border-bottom-primary-1{
    position: relative;
    &:after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(to right, rgba(30, 188, 161, 0.1), rgba(30, 188, 161, 0.8));
    }
  }
  .border-bottom-blue{
    position: relative;
    &:after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(to right, rgba(36, 143, 218, 0.1), #248FDA);
    }
  }

  .shadow-bg{
    padding: 12px;
    box-shadow: inset 0 0 20px 0px #024A8A;
  }
  .ele-bg{
    position: relative;
    padding: 18px 16px;
    border-radius: 8px;
    background: linear-gradient(to right, rgba(32, 168, 232, 0.2),  #0b122a 30%, #0b122a 50%, rgba(32, 168, 232, 0.17));
    &:before{
      content: '';
      position: absolute;
      background: url(@/views/screen/assets/real/brackets-left.png) no-repeat;
      width: 19px;
      top: -5px;
      left: -5px;
      bottom: -5px;
      background-size: 100% 100%;
    }
    &:after{
      content: '';
      position: absolute;
      background: url(@/views/screen/assets/real/brackets-right.png) no-repeat;
      width: 18px;
      top: -5px;
      right: -5px;
      bottom: -5px;
      background-size: 100% 100%;
    }
  }
  .total-box{
    margin: 16px 48px 16px;
    position: relative;
    font-weight: bold;
    .content{
      position: absolute;
      top: 0;
      left: 0 ;
      box-sizing: border-box;
      padding: 12px;
      width: 57%;
      height: 50%;
      display: flex;
      flex-direction: column;
      &_title{
        font-size: 26px;
        font-style: italic;
        font-weight: bold;
        color: #fff;
        text-align: center;
      }
      &_list{
        padding: 12px;
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        justify-content: space-between;
        align-items: stretch;
        gap:12px 0;
        //gap: 12px;
      }
      &_item{
        display: flex;
        flex-direction: column;
        justify-items: center;
      }
    }
  }
  .bg-icon-primary{
    background-color:rgba(30, 188, 161, 0.1);
    border-left: 3px solid rgba(30, 188, 161, 100);
    padding-left: 5px;
    .bg-icon{
      background-color: rgba(1, 206, 220, 0.2);
    }
    .ele-title{
      color: rgba(30, 188, 161, 100);;
    }
  }
  .bg-icon-success{
    background-color: rgba(25, 164, 255, 0.1);
    border-left: 3px solid rgba(25, 164, 255, 100);
    padding-left: 5px;
    .ele-title{
      color: rgba(25, 164, 255);;
    }

    .bg-icon{
      background-color: rgba(25, 164, 255, 0.2);
    }
  }
  .bg-icon{
    width: 52px;
    display: flex;
    align-items: center;
    height: 61px;
    justify-content: center;
  }
  .ele-title{
    font-weight: bold;
  }
  .ele-value{
    font-size: 20px;
    font-weight: bold;
  }
  .today-bg{
    width: 55px;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(@/views/screen/assets/real/today-bg.png) no-repeat;
    background-size: 100% 100%;
  }
  :deep(.dialog){
    --el-dialog-margin-top: 50px;
  }
  .data-table{
    //--el-fill-color-lighter: rgb(23,34,70);
    --el-table-header-bg-color: #172246;
    :deep( .el-table__cell){
      padding: 12px 0;
    }
    &.el-table--border :deep(th.el-table__cell){
      border-bottom: 1px dashed #fff;
    }
    :deep(td.el-table__cell) {
      border-right:1px dashed #fff; ;
    }
  }
</style>
