<script setup lang="ts">
  import SelectDateRange from "@/views/screen/components/SelectDateRange.vue";
  import CardHeader from "@/views/screen/components/CardHeader.vue";
  import BatteryInfo from "@/views/screen/components/BatteryInfo.vue";
  import PieBattery from "@/views/screen/components/PieBattery.vue";
  import * as echarts from 'echarts'
  import screenConfig from '@/views/screen/config/echart.json'

  const domRef = ref();
  const powerRef = ref();
  echarts.registerTheme('screen', screenConfig);

  const chartRef = ref()
  defineOptions({
    name: 'ScreenStatisticAnalysis',
  })
  const queryParams = reactive({

  })
  onMounted(() => {
    const chart = echarts.init(domRef.value, 'screen');
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
    const group = [{
      name: '节电量',
    },{
      name: '节省金额',
    },{
      name: '减碳量',
    }];
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
      dataset: [
        {
          dimensions: ['time', 'value1', 'value2', 'value3'],
          source: Array(24 * 5).fill(1).map((_, i) => [i + 1, 50 - Math.random() * 100, 50 - Math.random() * 100, 50 - Math.random() * 100]),
        },
        {
          dimensions: ['time', 'value1', 'value2', 'value3'],
          source: Array(24 * 5).fill(1).map((_, i) => [i + 1,50 - Math.random() * 50, 50 - Math.random() * 100, 50 - Math.random() * 100]),
        },
        {
          dimensions: ['time', 'value1', 'value2', 'value3'],
          source: Array(24 * 5).fill(1).map((_, i) => [i + 1, 50 - Math.random() * 50, 50 - Math.random() * 100, 50 - Math.random() * 100]),
        },
      ],
      title: [
        ...[...group].map((item, i) => ({
          text: item.name,
          top: ['3%', '30%', '64%' ][i],
          left: '2%',
        })),
      ],
      grid: [
        {
          bottom: '75%',
        },
        {
          bottom: '40%',
          top: '35%',
        },
        {
          top: '70%',
        },
      ],

      xAxis: group.map((_, i) => ({
        gridIndex: i,
        ...axisProps,
      })),
      yAxis: group.map((_, i) => ({
        gridIndex: i,
        ...axisProps,
      })),
      series: group.reduce((res, item, i) => [
        ...res,
        ...valueTypes.map((type, idx) => ({
          type: 'line',
          yAxisIndex: i,
          xAxisIndex: i,
          datasetIndex: i,
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
          ...item,
        })),
      ], [])
    })
  });

  onMounted(() => {
    const chart = echarts.init(powerRef.value, 'screen');
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
        text: '功率曲线',
        top: '',
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


</script>

<template>
  <ElForm
    ref="queryFormRef"
    :inline="true"
    :model="queryParams"
    class="-mb-15px form"
  >
    <SelectDateRange
      v-model:end="queryParams.endTime"
      v-model:start="queryParams.startTime"
    />
    <ElFormItem>
      <ElButton type="primary">查询</ElButton>
      <ElButton type="primary">下载</ElButton>
    </ElFormItem>
  </ElForm>
  <ElRow :gutter="24">
    <ElCol :span="8">
      <CardHeader title="节能减排" />
      <div class="echarts" ref="domRef"></div>
    </ElCol>
    <ElCol :span="16">
      <CardHeader title="电池统计分析" />
      <div class="flex">
        <BatteryInfo />
        <PieBattery class="battery-echarts" />
      </div>
      <CardHeader title="设备统计分析" />
      <div class="power-echarts" ref="powerRef"></div>
    </ElCol>
  </ElRow>
</template>

<style scoped lang="scss">
  .echarts{
    height: 800px;
    width: 100%;
  }
  .power-echarts{
    height: 400px;
    width: 100%;
  }
  .battery-echarts{
    flex: 1;
    height: 350px;
  }
  .header{
    font-size: 16px;
    padding: 8px 12px;
    font-weight: bolder;
  }
</style>
