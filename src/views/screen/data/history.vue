<script setup lang="ts">
import SelectDateRange from "@/views/screen/components/SelectDateRange.vue";
import * as echarts from 'echarts'
import screenConfig from '@/views/screen/config/echart.json'
import dayjs from "dayjs";

const domRef = ref();
const realRef = ref();
echarts.registerTheme('screen', screenConfig);

const chartRef = ref()
defineOptions({
  name: 'ScreenDataHistory',
})
const queryParams = reactive({

})
onMounted(() => {
  console.log(realRef);
  const chart = echarts.init(realRef.value, 'screen');
  const group = [{
    label: '实时数据',
    value: 'num',
  }, {
    label: '实时数据1',
    value: 'num1',
  }, {
    label: '实时数据2',
    value: 'num2',
  }]
  const time = dayjs('00:00', 'HH:mm');
  chart.setOption({
    dataset:  {
      dimensions: [{ type: 'time', name: 'time'}, 'num', 'num1', 'num2'],
      source: Array(24 * 60 / 10).fill(1).map((_, i) => ({
        time: dayjs(time).set("m", i * 10).toDate(),
        num: Math.random(),
        num1: Math.random() * 2,
        num2: Math.random() * 2,
      })),
    },
    title: {
      text: '实时数据',
      top: 20,
      left: 30,
    },
    xAxis: {
      type: 'time',
    },
    yAxis: {

    },
    series: [...group.map((item, i) => ({
      type: 'line',
      smooth: false,
      encode: {
        x: 'time',
        y: item.value,
      },
      labelLine: {
        show: 0,
      },
      showSymbol: false,
      name: item.label,
    }))]
  })

});
onMounted(() => {
  const chart = echarts.init(domRef.value, 'screen');
  const customList = [
    {name: '月用电', value: 1},
    {name: '购电', value: 2},
    {name: '发电', value: 3},
    {name: '调电量', value: 4},
    {name: '碳排放', value: 5},
  ];
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
  const customProps = {
    axisLine: {
      show: false,
      symbol: 'none',
    },
    splitLine: {
      show: false,
    },
    axisTick: {
      show: true,
    },
    axisLabel: {
      show: false,
      lineStyle: {
        "color": "transparent",
      },
    },
    splitArea: {
      show: false,
    },
  }
  const group = [{
    name: '日用电',
  },{
    name: '调电量',
  },{
    name: '购电',
  },{
    name: '发电',
  },{
    name: '碳排放',
  }];
  chart.setOption({
    dataset: [
      {
        dimensions: ['time', 'value'],
        source: Array(24).fill(1).map((_, i) => [i + 1, Math.random() * 1000]),
      },
      {
        dimensions: ['time', 'value'],
        source: Array(24).fill(1).map((_, i) => [i + 1, Math.random() * 1000]),
      },
      {
        dimensions: ['time', 'value'],
        source: Array(24).fill(1).map((_, i) => [i + 1, Math.random() * 1000]),
      },
      {
        dimensions: ['time', 'value'],
        source: Array(24).fill(1).map((_, i) => [i + 1, Math.random() * 1000]),
      },
      {
        dimensions: ['time', 'value'],
        source: Array(24).fill(1).map((_, i) => [i + 1,  Math.random() * 1000]),
      },
    ],
    title: [
      ...[...group, {name: '历史数据'}].map((item, i) => ({
        text: item.name,
        left: ['3%', '30%', '64%' ][i % 3],
        top: ['2%', '48%'][Number(i < 3)],
      })),
    ],
    grid: [
      {
        right: '70%',
        bottom: '55%',
      },
      {
        left: '35%',
        right: '40%',
        bottom: '55%',
      },
      {
        left: '70%',
        bottom: '55%',
      },
      {
        right: '70%',
        top: '55%',
      },
      {
        left: '35%',
        right: '40%',
        top: '55%',
      },
      {
        left: '70%',
        top: '55%',
      },
    ],

    xAxis: [...group.map((_, i) => ({
      gridIndex: i,
      ...axisProps,
    })), {
      gridIndex: 5,
      ...customProps,

    }],
    yAxis: [...group.map((_, i) => ({
      gridIndex: i,
      ...axisProps,
    })), {
      gridIndex: 5,
      ...customProps,
    }],
    series: [...group.map((item, i) => ({
      type: 'line',
      yAxisIndex: i,
      xAxisIndex: i,
      datasetIndex: i,
      smooth: false,
      encode: {
        x: 'time',
        y: 'value',
      },
      labelLine: {
        show: 0,
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
          {
            offset: 0,
            color: 'yellow'
          },
          {
            offset: 1,
            color: 'transparent'
          }
        ])
      },
      showSymbol: false,
      ...item,
    })), {
      type: 'custom',
      // coordinateSystem: 'none',
      yAxisIndex: 5,
      xAxisIndex: 5,
      encode: {
        x: 'name',
        y: 'value',
      },
      data: customList,
      renderItem: function (params, api) {
        const item = customList[params.dataIndex]
        return  {
          type: 'group',
          x: params.coordSys.x,
          y: params.coordSys.y + params.dataIndex * 36 + 10,
          children: [
            {
              type: 'line',
              x: 8,
              y: 26,
              shape: {
                x1: 0,
                y1: 0,
                x2: params.coordSys.width,
                y2: 0,
              },
              style: {
                lineWidth: 0.5,
                fill: '#fff',
                stroke: '#fff',
              },
            },
            {
              type: 'text',
              x: 20,
              style: {
                text: item.name + ':',
                fill: '#FFF',
                fontSize: 16,
                fontWeight: 'bold',
              },

            },
            {
              type: 'text',
              x: 200,
              style: {
                text: item.value,
                fill: '#FFF',
                fontSize: 16,
                fontWeight: 'bold',
              },
            },

          ],
        };
      },
    }]
  })
});
</script>

<template>
  <ElForm
    ref="queryFormRef"
    :inline="true"
    :model="queryParams"
    class="m-[15px_0px_0_16px] form"
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
  <div class=" chartBox">
    <div class="real-echarts" ref="realRef"></div>
    <div class="echarts" ref="domRef"></div>
  </div>

</template>

<style scoped lang="scss">
.chartBox{
  margin: 0 16px 16px 32px;
  display: flex;
  flex: 1;
  flex-direction: column;
}
.echarts{
  margin-top: 12px;
  flex: 1;
  width: 100%;
}
.real-echarts{
  height: 300px;
  width: 100%;
}
.header{
  font-size: 16px;
  padding: 8px 12px;
  font-weight: bolder;
}
</style>
