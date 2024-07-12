<template>
<!--  <IFrame src="/go-view/#/chart/preview/1" />-->
  <article class="content-box">
    <ElRow :gutter="24">
      <ElCol :span="8">
        <CardHeader
          title=''
        />
        <div class="board-bg">
          <img :src="board" alt="" />
        </div>
        <CardHeader
          title='实时电价'
        />
        <div class="real-price" ref="realRef"></div>
      </ElCol>
      <ElCol :span="16">
        <CardHeader
          title='电池'
        />
        <nav class="flex">
          <UseInfoItem
            title="电池电量"
            :api="getLatest1"
            :params="{c: 'addr_6003'}"
            success-value="电池soc"
          />
          <UseInfoItem
            title="充放电次数(当日)"
            :value="keyValue['addr_6000'] || 2"
            success-value="两充两放"
          />
          <UseInfoItem
            title="功率"
            :value="keyValue['addr_141']"
            unit="kw"
            success-value="功率"
          />
          <UseInfoItem
            title="温度"
            :value="keyValue.addr_6013"
            unit="°"
            success-value="单体温度最大值"
          />
          <UseInfoItem
            title="温度"
            :value="keyValue.addr_6014"
            unit="°"
            success-value="单体温度最小值"
          />
        </nav>
        <nav class="flex gap-[12px]">
          <div class="flex-[1]">
            <CardHeader title="负载" />
            <div class="flex">
              <UseInfoItem
                value="4.6kWh"
                success-value="用电功率"
              />
              <UseInfoItem
                value="3.4kWh"
                success-value="用电量(当日)"
              />
            </div>
          </div>
          <div class="flex-[1]">
            <CardHeader title="电网" />
            <div class="flex">
              <UseInfoItem
                :value="keyValue['addr_192']"
                success-value="功率"
              />
              <div class="flex flex-col gap-[12px] mb-[12px]">
                <div>
                  <ElButton type="primary">并网</ElButton>
                </div>
                <div>
                  <ElButton>离网</ElButton>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div class="flex gap-[12px] border-total">
          <div class="flex-[1]">
            <div class="split-title">
              <span>总体运行</span>
            </div>
            <div>
              <div>
                <span class="color-[var(--el-color-primary)]">微电网日用电量：</span>
                <span class="font-size-[24px]">{{keyValue['3#addr_0x3000']}}</span>
                <span>kW</span>
              </div>
              <div>
                <span class="color-[var(--el-color-primary)]">微电网日发电量：</span>
                <span class="font-size-[24px]">{{keyValue['calc_addr_162+addr_164']}}</span>
                <span>kW</span>
              </div>
            </div>
            <div class="split-title">
              <span>天气</span>
            </div>
            <div>
              <span>天气：</span>
              <span>37°</span>
            </div>
          </div>
          <div class="flex-[2] ml-[12px]">
            <div class="split-title">
              <span>光伏</span>
            </div>
            <div class="flex gap-[12px]">
              <div class="flex-[1]">
                <div class="flex">
                  <div class="flex-[1]" v-for="item in solarTypes" :key="item.value">
                    <span class="color-[var(--el-color-primary)]">{{item.label}}:</span>
                  </div>
                </div>
                <div class="flex" v-for="item in solarList" :key="item.id">
                  <div class="flex-[1] mt-[8px]" v-for="type in solarTypes" :key="type.value">
                    <div class="color-[var(--el-color-warning)] fw-500">{{item.name}}{{type.label}}:</div>
                    <div>
                      <span class="font-size-[18px] fw-600">{{keyValue[`addr_${type[item.key]}`]}}</span>
                      <span class="font-500 ml-[3px]">{{type.unit}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="color-[var(--el-color-primary)]">总发电量:</div>
                <div class="color-[var(--el-color-warning)] fw-500">7天</div>
                <div class="font-size-[18px] fw-600">PV1 + PV2</div>
              </div>
            </div>

          </div>
        </div>
        <CardHeader title="效益分析" />
        <div class="flex flex-items-stretch mt-[16px] " >
          <div class="flex-[1] mr-[8px]">
            <header class="title-name">用电统计</header>
            <PieBattery
              :data="useTotalRef"
              class="pie-chart"
              title=""
              unit="kWh"
              :options="useTotalOptions"
            />
          </div>
          <div class="flex-[1]">
            <header class="title-name">发电统计</header>
            <PieBattery
              class="pie-chart"
              title=""
              unit="kWh"
              :options="useTotalOptions"
              :data="getterTotalRef"
            />

          </div>
          <div class="flex-[1] flex flex-col">
            <header class="title-name">效益分析</header>
            <nav class="flex flex-[1] flex-col mt-[16px] gap-[16px] flex-items-start">
              <div>
                <span class="color-[var(--el-color-primary)] font-size-[18px]">节电量：</span>
                <span class="font-size-[24px] font-600">5.55</span>
                <span>kWh</span>
              </div>
              <div>
                <span class="color-[var(--el-color-primary)] font-size-[18px]">减碳量：</span>
                <span>
              <span class="font-size-[24px] font-600">5.55</span>
              <span class="font-600 ml-[4px]">kg</span>
            </span>
              </div>
              <div>
                <span class="color-[var(--el-color-primary)] font-size-[18px]">节省金额：</span>
                <span>
              <span class="font-size-[24px] font-600">5.55</span>
              <span class="font-600 ml-[4px]">元</span>
            </span>
              </div>
            </nav>
          </div>
        </div>
      </ElCol>
    </ElRow>
  </article>


</template>
<script lang="ts" setup>
import { useIntervalFn, useResizeObserver } from '@vueuse/core'
import CardHeader from "@/views/screen/components/CardHeader.vue";
import UseInfoItem from "@/views/screen/components/UseInfoItem.vue";
import PieBattery from "@/views/screen/components/PieBattery.vue";
import board from '@/views/screen/assets/board-bg.png'
import * as echarts from "echarts";
import screenConfig from "@/views/screen/config/echart.json";
import {
  getLatest1,
  getLatestForKeys,
  getLatestPrice
} from "@/services/services/guanlihoutaiIOTshujushishihuoqu";
import dayjs from "dayjs";
defineOptions({ name: '数据中心' })
const keyValue = ref<any>({});
const keys = []

const getLastData = async () => {
  const res = await getLatestForKeys({},{
    "keys":[
      "addr_6003",
      "addr_141",
      "addr_6013",
      "addr_6014",
      "addr_192",
      "addr_32",
      "addr_162",
      "addr_164",
      "addr_151",
      "addr_154",
      "addr_153",
      "addr_152",
      "addr_155",
      'addr_150',
      '3#addr_0x3000',
      'calc_addr_162+addr_164',
    ]
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
    top: 0,
    right: 0,
    left: 0,
    width: '100%',
    orient: 'horizontal',
  },
  series: {
    top: 20,
  },
}
onMounted(() => {
  getLastData()
})
useIntervalFn(() => {
  getLastData();
}, 3000)
useResizeObserver(realRef, () => {
  if (realChartRef.value) {
    realChartRef.value.resize();
  }
});
onMounted(() => {
  getLatestPrice({
    key: '用电统计',
  }).then(res => {
    useTotalRef.value = res.data;
  })
  getLatestPrice({
    key: '发电统计',
  }).then(res => {
    getterTotalRef.value = res.data;
  })
})
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
        // color: 'yellow',
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
    value: 'yesterday_avg',
    label: '昨天',
    color: '#e49134',
  },{
    value: 'today_avg',
    label: '今天',
    color: '#3b76e8',
  }]
  getLatestPrice({
    key: '实时电价'
  }).then(res => {
    chart.setOption({
      dataset:  {
        ...res.data,
        source: (res.data.source.length ? res.data.source : [
          {
            hour: '00:00',
            yesterday_avg: 0.3,
            today_avg: 0.3
          },
          {
            hour: '08:00',
            yesterday_avg: 0.6,
            today_avg: 0.6
          },
          {
            hour: '12:00',
            yesterday_avg: 0.9,
            today_avg: 0.91
          },
          {
            hour: '18:00',
            yesterday_avg: 0.6,
            today_avg: 0.6
          },
          {
            hour: '21:00',
            yesterday_avg: 0.3,
            today_avg: 0.3
          },
          {
            hour: '24:00',
            yesterday_avg: 0.3,
            today_avg: 0.3
          },
        ]).map(item => ({
          ...item,
          hour: dayjs(item.hour, 'HH:mm').toDate(),
        }))
      },
      title: {
        text: '实时电价',
        top: '2%',
        left: '2%',
      },
      xAxis: {
        ...axisProps,
        type: 'time',
        interval: 1000 * 60 * 60 * 2,
      },
      yAxis: {
        ...axisProps,
      },
      legend: {
        icon: 'circle',
        right: 20,
        top: 20,
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
        step: 'start',
        itemStyle: {
          color: type.color,
        },
        labelLine: {
          show: 0,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            {
              offset: 0,
              color: screenConfig.color[idx],
            },
            {
              offset: 1,
              color: 'transparent'
            }
          ])
        },
        showSymbol: false,
      }))
    })

  })
  realChartRef.value = chart;
})
const solarTypes = [{
  value: 'fdl',
  label: '发电量',
  unit: 'kWh',
  gf1: '162',
  gf2: '164',
},{
  value: 'fdl1',
  label: '电流',
  unit: 'A',
  gf1: '151',
  gf2: '154',
},{
  value: 'fdl12',
  label: '电压',
  unit: 'V',
  gf1: '150',
  gf2: '153',
},{
  value: 'fdl34',
  label: '功率',
  unit: 'kw',
  gf1: '152',
  gf2: '155',
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
</script>

<style lang="scss">
.content-box{
  width: 1440px;
  margin: 0 auto;
  background-color: #030711;
  padding: 12px;
}
.board-bg{
  width: 100%;
  margin-bottom: 12px;
  img{
    width: 100%;
  }
}
.pie-chart{
  height: 20vw;
  min-height: 200px;
}
.real-price{
  height: 300px;
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
  padding: 5px 0;
  margin-top: 12px;
  font-size: 12px;
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
</style>
