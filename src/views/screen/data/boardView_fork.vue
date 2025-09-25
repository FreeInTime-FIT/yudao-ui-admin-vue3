<template>
<!--  <IFrame src="/go-view/#/chart/preview/1" />-->
  <div class="flex gap-24px">
    <div class="w-24%">
      <article>
        <CardHeader
          title='实时电价'
        />
        <div class="real-price shadow-bg !p-0" ref="realRef"></div>
      </article>

      <div class="flex mt-12px fuzai-bg relative">
        <img :src="fuzaiBg" class="w-103% -translate-x-3% pointer-events-none" alt="" />
        <div class='absolute text-18px top-7% left-7% fw-bold'>
          <div>负载</div>
        </div>
        <div class="value-content-1">
          <div class="text-32px fw-bold text-shadow-num">{{keyValue['用电功率']}}</div>
          <div class="fw-bold">用电功率(kw)</div>
        </div>
        <div class="value-content-2">
          <div class="text-32px fw-bold text-shadow-num">{{keyValue['当日用电量']}}</div>
          <div class="fw-bold">当日用电量(kWh)</div>
        </div>
      </div>

      <div class="flex relative">
        <img :src="bingwangBg" class="w-103% -translate-x-3% pointer-events-none" alt="" />
        <div class='absolute text-18px top-7% left-7% fw-bold'>
          <div>电网</div>
        </div>
        <div class="value-content-1">
          <div class="text-32px fw-bold text-shadow-num">{{keyValue['电网功率']}}</div>
          <div class="fw-bold">功率(kw)</div>
        </div>
        <div class="value-content-2">
          <div>
            <ElButton class="w-60% max-w-120px min-w-60px" :type="((keyValue['并网状态'] as number) >> 4 & 1) === 1 ? 'primary' : 'info'">并网</ElButton>
          </div>
          <div>
            <ElButton class="w-60% max-w-120px min-w-60px mt-8px" :type="((keyValue['并网状态'] as number) >> 4 & 1) === 0 ? 'primary' : 'info'">离网</ElButton>
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
              微电网累计用电量
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
              微电网累计发电量
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
        
        </div>
      </div>

      <div class="flex gap-8px items-end mb-12px">
        <div class="flex-1">
          <card-header title="光伏" hide-action />
        </div>
        <div class="flex-1">
          <card-header title="风电" />
        </div>
      </div>
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
                <div class="ele-title">{{type.getLabel ? type.getLabel(item) : type.label}}</div>
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
      <CardHeader title="储能" />
      <div class="flex flex-wrap shadow-bg !pt-40px battery-list">
        <div v-for="item in batteryInfo" class="w-50%" :key="item.key">
          <div class=" flex items-center mb-16px pl-10px battery-item">
            <div class="today-bg">
              <img :src="item.icon" :style="{width: item.iconWidth + 'px'}"  alt="" />
            </div>
            <div class="ml-8px w-0 flex-1 ">
              <div class="fw-bold text-14px line-height-20px">{{item.label}}</div>
              <div class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px line-height-24px">{{item.render ? item.render() : getValue(item.valKey, false) || '-'}}{{item.unit}}</div>
            </div>
          </div>

        </div>
      </div>
      <CardHeader class="mt-30px" title="效益分析" />
      <div class="flex flex-items-stretch mt-[16px] relative shadow-bg" >
        <nav class="absolute top-18% bottom-22% flex flex-col justify-evenly  left-36px flex-col mt-[16px] gap-20px flex-items-start">
          <div class="flex items-center gap-8px">
            <div>
              <img :src="icon8" class="w-44px" alt="" />
            </div>
            <div>
              <div class="color-#fff font-size-[15px]">累计减少电网电量：</div>
              <div class="font-size-24px font-600 color-#FCFF00">{{getValue(`节电量`, true)}}kWh</div>
            </div>
          </div>
          <div class="flex items-center gap-8px">
            <div>
              <img :src="icon6" class="w-47px" alt="" />
            </div>
            <div>
              <div class="color-#fff font-size-[15px]">减碳量：</div>
              <div class="font-size-24px font-600 color-#FCFF00">{{getValue(`减碳量`, true)}}t</div>

            </div>
          </div>
          <div class="flex items-center gap-8px">
            <div>
              <img :src="icon7" class="w-47px" alt="" />
            </div>
            <div>
              <div class="color-#fff font-size-[15px]">节省金额：</div>
              <div class="font-size-24px font-600 color-#FCFF00">{{getValue(`节省金额`, true)}}万元</div>

            </div>
          </div>
        </nav>

        <div class="flex-1 pl-38px">
          <PieBattery
            :data="useTotalRef"
            class="h-11vw"
            title="用电统计"
            unit="%"
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
import board from '@/views/screen/assets/realtime_fork/board_image.png'
import * as echarts from "echarts";
import screenConfig from "@/views/screen/config/echart.json";
// 已切换为静态数据渲染，移除接口依赖
import dayjs from "dayjs";
// 已切换为静态数据，移除项目状态依赖
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
const keyValue = ref<Record<string, string | number>>({});

// 静态数据定义
const staticData = {
  '用电功率': 372,
  '当日用电量': 5600.4,
  '电网功率': 800,
  '并网状态': 16, // 二进制位控制按钮状态
  '微电网日用电量':588000.1,
  '微电网日发电量': 128590.1,
  // 光伏展示重定义
  '当日发电量-1': 8900,
  '累计发电量-1': 78540,
  '发电功率-1': 400,
  '装机功率-1': 3740,
  '累计发电量-2': 50050,
  '当日发电量-2': 25,
  '发电功率值': 0,
  '装机容量值': 1100,
  '七日用电量': 19800,
  '电池电量': 95,
  '充放电次数': 2,
  '装机功率':2,
  '装机电量': 8,
  '单体温度最大值': 27,
  '单体温度最小值': 28,
  '节电量': 2368.2 ,
  '减碳量': 1376,
  '节省金额': 1012.4,
};

const getLastData = () => {
  keyValue.value = { ...staticData };
  return { data: staticData };
}
// 随机区间工具
function randomInRange(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}
// 定时随机更新关键功率指标
let dynamicTimer: any;
const realRef = ref();
const realChartRef = ref();
// const getterTotalRef = ref();
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
        label: '新能源电量',
        value: 22,
      }, {
        label: '电网电量',
        value: 100 - 22,
      }
    ],
  }
})
const getterTotalRef = computed(() => {
  return {
    dimensions: ['label', 'value'],
    source: [
      {
        label: '光伏',
        value: 61,
      }, {
        label: '风电',
        value: 39,
      }
    ],
  }
})
// 已切换为静态数据，移除轮询和监听
useResizeObserver(realRef, () => {
  if (realChartRef.value) {
    realChartRef.value.resize();
  }
});
onMounted(() => {
  getLastData();
  // 每2秒波动：用电功率(150~190)，电网功率(50~80)
  dynamicTimer = setInterval(() => {
    const kv = keyValue.value;
    if (!kv) return;
    kv['用电功率'] = randomInRange(346, 380);
    kv['电网功率'] = randomInRange(50, 80);
  }, 2000);
})
onUnmounted(() => {
  if (dynamicTimer) clearInterval(dynamicTimer);
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
  // 已移除未使用的now变量
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
  // 使用静态电价数据
  const staticPriceData = {
    source: [
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
    ]
  };
  
  // 模拟异步操作
  Promise.resolve(staticPriceData).then(res => {
    chart.setOption({
      backgroundColor: 'transparent',
      top:0,
      bottom: 0,
      dataset:  {
        ...res,
        source: res.source.map(item => ({
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
          formatter: function (value) {
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
  gf1: '当日发电量-1',
  gf2: '累计发电量-1',
  getLabel: (item: any) => (item.id === '1' ? '当日发电量' : '累计发电量'),
  icon: icon1,
  iconCls: 'w-41px',
  cls: 'bg-icon-primary'
},{
  value: 'fdl1',
  label: '功率',
  unit: 'kW',
  gf1: '发电功率-1',
  gf2: '装机功率-1',
  getLabel: (item: any) => (item.id === '1' ? '发电功率' : '装机功率'),
  icon: icon2,
  iconCls: 'w-41px',
  cls: 'bg-icon-primary'
},{
  value: 'fdl12',
  label: '发电量',
  unit: 'kWh',
  gf1: '累计发电量-2',
  gf2: '当日发电量-2',
  getLabel: (item: any) => (item.id === '1' ? '累计发电量' : '当日发电量'),
  icon: icon3,
  iconCls: 'w-36px',
  cls: 'bg-icon-success'
},{
  value: 'fdl34',
  label: '功率',
  unit: 'kW',
  gf1: '发电功率值',
  gf2: '装机容量值',
  getLabel: (item: any) => (item.id === '1' ? '发电功率值' : '装机容量值'),
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
    label: '电池soc',
    key: '1',
    valKey:'电池电量',
    unit: '%',
    icon: cdlIcon,
    iconWidth: 26,
  },
  {
    label: '累计充放次数',
    key: '2',
    valKey:  '充放电次数',
    unit: '',
    icon: gfIcon,
    iconWidth: 44,
  },
  {
    label: '装机功率',
    key: '3',
    unit: 'MW',
    valKey:  '装机功率',
    icon: tdIcon3,
    iconWidth: 27,
  },
  {
    label: '装机电量',
    key: '6',
    valKey:  '装机电量',
    icon: tdIcon3,
    unit: 'MWh',
    iconWidth: 27,
  },
  {
    label: '温度-单体温度最大值',
    key: '4',
    valKey:  '单体温度最大值',
    icon: tdIcon2,
    unit: '°',
    iconWidth: 25,
  },
  {
    label: '温度-单体温度最小值',
    key: '11',
    valKey:  '单体温度最小值',
    unit: '°',
    icon: tdIcon1,
    iconWidth: 26,
  },
]
</script>

<style lang="scss">
.board-bg-box{
  padding: 24px 1px 46px;
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
.card-screen-header{
  position: relative;
  padding: 10px 0;
  margin-bottom: 12px;
  &:before{
    content: '';
    position: absolute;
    height: 2px;
    left: 0;
    width: 32px;
    bottom: -1px;
    background-color: #29F0F1;
  }
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
.battery-list{
  padding-top: 46px !important;
  padding-bottom: 8px;
}
.battery-item{
  margin-bottom: 22px !important;
  padding-top: 6px;
  padding-bottom: 6px;
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
  left: 4%;
  right: 70%;
  text-align: center;
}
.value-content-2{
  position: absolute;
  top: 45%;
  right: 4%;
  left: 70%;
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
