<template>
<!--  <IFrame src="/go-view/#/chart/preview/1" />-->
  <div class="flex gap-24px">
    <div class="w-24%">
      <article>
        <CardHeader
          title='实时电价'
        />
        <div class="real-price shadow-bg" ref="realRef"></div>
      </article>

      <div class="flex mt-12px fuzai-bg relative">
        <img :src="fuzaiBg" class="w-103% -translate-x-3% pointer-events-none" alt="" />
        <div class="value-content-1">
          <div class="text-32px fw-bold text-shadow-num">{{keyValue['用电功率']}}</div>
          <div class="fw-bold">用电功率(kw)</div>
        </div>
        <div class="value-content-2">
          <div class="text-32px fw-bold text-shadow-num">{{keyValue['当日用电量']}}</div>
          <div class="fw-bold">当日用电量(kw)</div>
        </div>
      </div>

      <div class="flex relative">
        <img :src="bingwangBg" class="w-103% -translate-x-3% pointer-events-none" alt="" />
        <div class="value-content-1">
          <div class="text-32px fw-bold text-shadow-num">{{keyValue['电网功率']}}</div>
          <div class="fw-bold">功率(kw)</div>
        </div>
        <div class="value-content-2">
          <div>
            <ElButton class="w-60% max-w-120px min-w-60px" :type="(keyValue['并网状态'] >> 4 & 1) === 1 ? 'primary' : ''">并网</ElButton>
          </div>
          <div>
            <ElButton class="w-60% max-w-120px min-w-60px mt-8px" :type="(keyValue['并网状态'] >> 4 & 1) === 0 ? 'primary' : ''">离网</ElButton>
          </div>
        </div>
      </div>

    </div>
    <div class="flex-1">
      <card-header title="总体运行情况" />
      <div class="flex gap-28px">
        <div class="flex-1 flex items-center ele-bg">
          <div><img :src="eleIcon" class="w-44px pointer-events-none" alt="" /></div>
          <div class="ml-12px">
            <div>
              微电网日用电量
            </div>
            <div class="color-#FCFF00 text-26px">
              {{getValue('微电网日用电量', false)}}kWh
            </div>
          </div>
        </div>
        <div class="flex-1 flex items-center ele-bg">
          <div><img :src="eleIcon" class="w-44px pointer-events-none" alt="" /></div>
          <div class="ml-12px">
            <div>
              微电网日发电量
            </div>
            <div class="color-#FCFF00 text-26px">
              {{getValue('微电网日发电量', false)}}kWh
            </div>
          </div>
        </div>
      </div>
      <div class="board-bg-box">
        <div class="board-bg">
          <img :src="board" class="pointer-events-none" alt="" />
          <div class="board-pos board-pos1">光伏发电量：{{ keyValue['微电网日发电量'] }}kWh</div>
          <div class="board-pos board-pos2">变压器频率：50Hz</div>
          <div class="board-pos board-pos3">储能电量：{{ keyValue['储能电量'] }}kWh</div>
          <div class="board-pos board-pos4">
            <div>总用电量：{{ keyValue['总用电量'] }}kWh</div>
          </div>
        </div>
      </div>

      <card-header title="光伏" />
      <div class="flex gap-8px pt-4px">
        <div class="flex-1">
          <div class="flex gap-8px mb-8px" v-for="item in solarList" :key="item.id">
            <div
              v-for="type in solarTypes"
              :key="type.value"
              class="flex-1 flex items-center "
              :class="type.cls"
            >
              <div class="bg-icon"><img
                :src="type.icon"
                :class="type.iconCls"
                alt="" /></div>
              <div class="ml-10px">
                <div class="ele-title">{{item.name}}{{type.label}}</div>
                <div class="ele-value">{{keyValue[`${type[item.key]}`]}}{{type.unit}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-icon-success flex items-center">
          <div class="bg-icon"><img
            :src="icon5"
            class="w-37px"
            alt="" /></div>
          <div class="ml-10px">
            <div class="ele-title">7天总发电量</div>
            <div class="ele-value">{{keyValue["七日用电量"]}}kWh</div>
          </div>
        </div>
      </div>

    </div>
    <div class="w-23.5% pr-20px">
      <CardHeader title="电池" />
      <div class="flex flex-wrap shadow-bg !pt-30px ">
        <div v-for="item in batteryInfo" class="w-50%" :key="item.id">
          <div class=" flex items-center mb-16px pl-10px">
            <div class="today-bg">
              <img :src="item.icon" :style="{width: item.iconWidth + 'px'}"  alt="" />
            </div>
            <div class="ml-8px w-0 flex-1 ">
              <div class="fw-bold text-14px line-height-20px">{{item.label}}</div>
              <div class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px line-height-24px">{{getValue(item.key) || item.value || '-'}}</div>
            </div>
          </div>

        </div>
      </div>
      <CardHeader class="mt-30px" title="效益分析" />
      <div class="flex flex-items-stretch mt-[16px] relative shadow-bg" >
        <nav class="absolute top-12px bottom-12px flex flex-col justify-center  left-36px flex-col mt-[16px] gap-[16px] flex-items-start">
          <div class="flex items-center gap-8px">
            <div>
              <img :src="icon8" class="w-44px" alt="" />
            </div>
            <div>
              <div class="color-#fff font-size-[15px]">节电量：</div>
              <div class="font-size-24px font-600 color-#FCFF00">{{getValue(`节电量`, true)}}kWh</div>
            </div>
          </div>
          <div class="flex items-center gap-8px">
            <div>
              <img :src="icon6" class="w-47px" alt="" />
            </div>
            <div>
              <div class="color-#fff font-size-[15px]">减碳量：</div>
              <div class="font-size-24px font-600 color-#FCFF00">{{getValue(`减碳量`, true)}}kg</div>

            </div>
          </div>
          <div class="flex items-center gap-8px">
            <div>
              <img :src="icon7" class="w-47px" alt="" />
            </div>
            <div>
              <div class="color-#fff font-size-[15px]">节省金额：</div>
              <div class="font-size-24px font-600 color-#FCFF00">{{getValue(`节省金额`, true)}}元</div>

            </div>
          </div>
        </nav>

        <div class="flex-1 pl-30px">
          <PieBattery
            :data="useTotalRef"
            class="h-11vw"
            title="用电统计"
            unit="kWh"
            :options="useCurrentOptions"
          />
          <PieBattery
            class="h-11vw"
            title="发电统计"
            unit="kWh"
            :options="useTotalOptions"
            :data="getterTotalRef"
          />
        </div>
      </div>

    </div>
  </div>



</template>
<script lang="ts" setup>
import { useResizeObserver } from '@vueuse/core'
import CardHeader from "@/views/screen/components/CardHeader.vue";
import PieBattery from "@/views/screen/components/PieBattery.vue";
import board from '@/views/screen/assets/data/board.png'
import * as echarts from "echarts";
import screenConfig from "@/views/screen/config/echart.json";
import {
  getLatestPrice, getPanelData
} from "@/services/services/IotReportController";
import dayjs from "dayjs";
import {useProjectStore} from "@/store/modules/project";
import cdlIcon from "@/views/screen/assets/real/icon-cdl.png";
import gfIcon from "@/views/screen/assets/real/icon-gf.png";
import tdIcon3 from "@/views/screen/assets/real/today-icon-3.png";
import tdIcon2 from "@/views/screen/assets/real/today-icon-2.png";
import tdIcon1 from "@/views/screen/assets/real/today-icon-1.png";
import fuzaiBg from "@/views/screen/assets/data/fuzai-bg.png";
import bingwangBg from "@/views/screen/assets/data/bingwang-bg.png";
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
defineOptions({ name: '数据中心' })
const keyValue = ref<any>({});
const keys = []
const projectStore = useProjectStore();
const getLastData = async () => {
  const res = await getPanelData({
    key: 'boardView',
    projectId: projectStore.projectInfo?.id,
  })
  keyValue.value = res.data || {};
  return res;
}
const realRef = ref();
const realChartRef = ref();
const useTotalRef = ref();
const getterTotalRef = ref();
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
    show: false,
  },
  series: {
    left: '30%',
    bottom: 10,
  },
  title: {
    left: '54%',
  },
}
watchEffect(() => {
  if (projectStore.projectInfo) {
    getLastData({
      projectId: projectStore.projectInfo?.id,
    });
    getLatestPrice({
      key: '用电统计',
      projectId: projectStore.projectInfo?.id,
    }).then(res => {
      useTotalRef.value = res.data;
    })
    getLatestPrice({
      key: '发电统计',
      projectId: projectStore.projectInfo?.id,
    }).then(res => {
      getterTotalRef.value = res.data;
    })
  }
})
let timer = setInterval(() => {
  getLastData({
    projectId: projectStore.projectInfo?.id,
  });
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
  getLastData({
    projectId: projectStore.projectInfo?.id,
  })
  getLatestPrice({
    key: '用电统计',
    projectId: projectStore.projectInfo?.id,
  }).then(res => {
    useTotalRef.value = res.data;
  })
  getLatestPrice({
    key: '发电统计',
    projectId: projectStore.projectInfo?.id,
  }).then(res => {
    getterTotalRef.value = res.data;
  })}
})
const getValue = (key, hasEmpty) => {
  const v = unref(keyValue)[key];
  if (!v && v !== 0 && hasEmpty) {
    return '-'
  }
  return v;
}
onMounted(() => {
  const chart = echarts.init(realRef.value, screenConfig);
  const now = dayjs('00:00', 'HH:mm');
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
      dataset:  {
        ...res.data,
        source: (res.data.source?.length ? res.data.source : [
          {
            hour: '00:00',
            price: 0.3,
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
            hour: '18:00',
            price: 0.6
          },
          {
            hour: '21:00',
            price: 0.3
          },
          {
            hour: '24:00',
            price: 0.3
          },
        ]).map(item => ({
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
        interval: 1000 * 60 * 60 * 2,
        axisLabel: {
          formatter: function (value, index) {
            return dayjs(value).format('HH:mm');
          }
        },
      },
      yAxis: {
        ...axisProps,
        name: '单位: 元/kWh',
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
      series: valueTypes.map((type, idx) => ({
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
          show: 0,
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
const solarTypes = [{
  value: 'fdl',
  label: '发电量',
  unit: 'kWh',
  gf1: '光伏1发电量',
  gf2: '光伏2发电量',
  icon: icon1,
  iconCls: 'w-41px',
  cls: 'bg-icon-primary'
},{
  value: 'fdl1',
  label: '电流',
  unit: 'A',
  gf1: 'pv1电流',
  gf2: 'pv2电流',
  icon: icon2,
  iconCls: 'w-41px',
  cls: 'bg-icon-primary'
},{
  value: 'fdl12',
  label: '电压',
  unit: 'V',
  gf1: 'pv1电压',
  gf2: 'pv2电压',
  icon: icon3,
  iconCls: 'w-36px',
  cls: 'bg-icon-success'
},{
  value: 'fdl34',
  label: '功率',
  unit: 'kW',
  gf1: 'pv1功率',
  gf2: 'pv2功率',
  icon: icon4,
  iconCls: 'w-35px',
  cls: 'bg-icon-success'
},]
const solarList = [{
  id: '1',
  name: '光伏1',
  type: 'pv1',
  key: 'gf1',
},{
  id: '2',
  name: '光伏2',
  type: 'pv2',
  key: 'gf2',
},]
const batteryInfo = [
  {
    label: '电池电量(电池soc)',
    key: '1',
    valKey:'电池电量',
    unit: 'kWh',
    icon: cdlIcon,
    iconWidth: 26,
  },
  {
    label: '充放电次数(当日)',
    key: '2',
    valKey:  '充放电次数',
    unit: 'kWh',
    icon: gfIcon,
    iconWidth: 44,
  },
  {
    label: '功率',
    key: '3',
    unit: 'kWh',
    valKey:  '电池功率',
    icon: tdIcon3,
    iconWidth: 27,
  },
  {
    label: '温度-单体温度最大值',
    key: '4',
    valKey:  '单体温度最大值',
    icon: tdIcon2,
    iconWidth: 25,
  },
  {
    label: '温度-单体温度最小值',
    key: '11',
    valKey:  '单体温度最小值',
    icon: tdIcon1,
    iconWidth: 26,
  },
]
</script>

<style lang="scss">
.board-bg-box{
  padding: 32px 6vw 20px;
}
.board-bg{
  position: relative;
  margin-bottom: 12px;
  img{
    width: 100%;
  }
}
.board-pos{
  position: absolute;
  font-weight: bold;
  font-size: 16px;
}
.board-pos1{
  top: 62%;
  left: 2%;
}
.board-pos2{
  top: 62%;
  left: 78%;
}
.board-pos3{
  top: 90%;
  left: 27%;
}
.board-pos4{
  top: 90%;
  left: 60%;
}
.pie-chart{
  height: 13vw;
  min-height: 200px;
}
.real-price{
  box-sizing: border-box;
  height: 12vw;
}
.border-total{
  background: url("@/views/screen/assets/lineBg.png") no-repeat top center;
  background-size: 100% 100%;
  --el-border-color: #32508d;
  padding: 12px 18px 24px;
}
.split-title{
  display: flex;
  align-items: center;
  padding: 5px 0 10px;
  margin-top: 12px;
  font-size: 16px;
  color: #eee;
  &:after{
    content: '';
    flex: 1;
    display: block;
    height: 0;
    margin-left: 4px;
    border-top: 1px dashed var(--el-color-primary);
  }
}
.title-name{
  font-size: 18px;
  font-weight: bold;
  margin-top: 3px;
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
  justify-content: center;
  height: 100%;
}
.ele-title{
  font-weight: bold;
}
.ele-value{
  font-size: 20px;
  font-weight: bold;
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

.fuzai-bg{
  width: 100%;

}
.value-content-1{
  position: absolute;
  top: 45%;
  left: 8%;
  text-align: center;
}
.value-content-2{
  position: absolute;
  top: 45%;
  right: 4%;
  left: 63%;
  text-align: center;
}
.text-shadow-num{
  text-shadow: -1px 2px 5px 0 #103c63a8;;
}
.shadow-bg{
  padding: 12px;
  box-shadow: inset 0 0 20px 0px #024A8A;
}
</style>
