<template>
<!--  <IFrame src="/go-view/#/chart/preview/1" />-->
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
        :params="{c: 'addr_6000'}"
        success-value="电池soc"
      />
      <UseInfoItem
        title="充放电次数(当日)"
        value="56"
        success-value="两充两放"
      />
      <UseInfoItem
        title="功率"
        value="0.1kw"
        success-value="功率"
      />
      <UseInfoItem
        title="温度"
        value="0.1°"
        success-value="单体温度最大值"
      />
      <UseInfoItem
        title="温度"
        value="0.1°"
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
            value="4.6kWh"
            success-value="用电量(当日)"
          />
        </div>
      </div>
      <div class="flex-[1]">
        <CardHeader title="电网" />
        <div class="flex">
          <UseInfoItem
            value="19kWh"
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
        <ElDivider border-style="dashed" content-position="left">总体运行</ElDivider>
        <div class="flex">
          <div>
            <span>微电网日用电量：</span>
            <span>5.55kWh</span>
          </div>
          <div>
            <span>微电网日用电量：</span>
            <span>5.55kWh</span>
          </div>
        </div>
        <ElDivider border-style="dashed" content-position="left">天气</ElDivider>
        <div>
          <span>天气：</span>
          <span>37°</span>
        </div>
      </div>
      <div class="flex-[2]">
        <ElDivider border-style="dashed" content-position="left">光伏</ElDivider>
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
                  <span class="font-size-[18px] fw-600">{{1212}}</span>
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
    <div class="flex flex-items-stretch mt-[16px]" >
      <div class="flex-[1]">
        <header class="title-name">用电统计</header>
        <PieBattery class="pie-chart" title="" />
      </div>
      <div class="flex-[1]">
        <header class="title-name">发电统计</header>
        <PieBattery class="pie-chart" title="" />

      </div>
      <div class="flex-[1] flex flex-col">
        <header class="title-name">效益分析</header>
        <nav class="flex flex-[1] flex-col mt-[16px] gap-[16px] flex-items-start">
          <div>
            <span class="color-[var(--el-color-primary)] font-size-[18px]">节电量：</span>
            <span class="font-size-[24px] font-600">5.55</span>
            <span>kw</span>
          </div>
          <div>
            <span class="color-[var(--el-color-primary)] font-size-[18px]">减碳量：</span>
            <span>
              <span class="font-size-[24px] font-600">5.55</span>
              <span>kg</span>
            </span>
          </div>
          <div>
            <span class="color-[var(--el-color-primary)] font-size-[18px]">节省金额：</span>
            <span>
              <span class="font-size-[24px] font-600">5.55</span>
              <span>元</span>
            </span>
          </div>
        </nav>
      </div>
    </div>
  </ElCol>
</ElRow>

</template>
<script lang="ts" setup>
import CardHeader from "@/views/screen/components/CardHeader.vue";
import UseInfoItem from "@/views/screen/components/UseInfoItem.vue";
import PieBattery from "@/views/screen/components/PieBattery.vue";
import board from '@/views/screen/assets/board-bg.jpg'
import * as echarts from "echarts";
import screenConfig from "@/views/screen/config/echart.json";
import {getLatest1} from "@/services/services/guanlihoutaiIOTshujushishihuoqu";
defineOptions({ name: '数据中心' })
const elec = reactive({
  elecSoc: '',
})
const realRef = ref();
onMounted(() => {

})
onMounted(() => {
  const chart = echarts.init(realRef.value, screenConfig);
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
    },
    splitLine: {
      show: true,
    },
  }
  const valueTypes = [{
    value: 'value1',
    label: '数据1',
  },{
    value: 'value2',
    label: '数据2',
  },{
    value: 'value3',
    label: '数据3',
  }]
  chart.setOption({
    dataset:   {
      dimensions: ['time', 'value1', 'value2', 'value3'],
      source: Array(24 * 5).fill(1).map((_, i) => [i + 1, 50 - Math.random() * 100, 50 - Math.random() * 100, 50 - Math.random() * 100]),
    },
    title: {
      text: '实时电价',
      top: '2%',
      left: '2%',
    },
    xAxis: {
      ...axisProps,
    },
    yAxis: {
      ...axisProps,
    },
    series: valueTypes.map((type, idx) => ({
      type: 'line',
      smooth: false,
      encode: {
        x: 'time',
        y: type.value,
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
const solarTypes = [{
  value: 'fdl',
  label: '发电量',
  unit: 'kWh',
},{
  value: 'fdl1',
  label: '电流',
  unit: 'A',
},{
  value: 'fdl12',
  label: '电压',
  unit: 'V',
},{
  value: 'fdl34',
  label: '功率',
  unit: 'kw',
},]
const solarList = [{
  id: '1',
  name: '光伏1',
  type: 'pv1',
},{
  id: '2',
  name: '光伏2',
  type: 'pv2',
},]
</script>

<style lang="scss">
.board-bg{
  width: 100%;
  margin-bottom: 12px;
  img{
    width: 100%;
  }
}
.pie-chart{
  height: 200px;
}
.real-price{
  height: 300px;
}
.border-total{
  background: url("@/views/screen/assets/lineBg.png") no-repeat top center;
  background-size: 100% 100%;
  --el-border-color: #32508d;
  padding: 8px 18px;
}
.title-name{
  font-size: 18px;
  font-weight: bold;
  margin-top: 3px;
}
</style>
