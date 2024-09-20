<script setup lang="ts">
import * as echarts from 'echarts'
import screenConfig from '@/views/screen/config/echart.json'
import dayjs from "dayjs";
import {useProjectStore} from "@/store/modules/project";
import {getLatestPrice} from "@/services/services/IotReportController";
import {IDatePickerType} from "element-plus/es/components/date-picker/src/date-picker.type";

const domRef = ref();
const realRef = ref();
echarts.registerTheme('screen', screenConfig);
const projectStore = useProjectStore();
defineOptions({
  name: 'ScreenDataHistory',
})
const now = dayjs();
const handleQuery =()=> {
  getLatestPrice({
    key: "历史记录_发电量",
    projectId: projectStore.projectInfo?.id,
    ...queryParams
  }).then(res => {
    chart.setOption({
      dataset: [
        {
          ...res.data
        },
      ]
    })
  })
  getLatestPrice({
    key: "历史记录_储能电量",
    projectId: projectStore.projectInfo?.id,
    ...queryParams
  }).then(res => {
    chart.setOption({
      dataset: [
        {

        },
        {
          ...res.data
        },
      ]
    })
  })

}
const queryParams = reactive<{
  type: IDatePickerType,
  time: Date | [Date, Date],
  format: string
}>({
  type: 'yearrange',
  time: [now.format('YYYY'), now.format('YYYY')],
  format: 'YYYY'
})
const restQuery = (value: IDatePickerType) => {

  if (value === 'yearrange'){
    queryParams.format = 'YYYY'
    queryParams.time = [now.format(queryParams.format) , now.add(1, 'year').format(queryParams.format)]
  } else if(value==='monthrange'){
    queryParams.format = 'YYYY-MM'
    queryParams.time = [now.format(queryParams.format) , now.add(1, 'month').format(queryParams.format)]
  } else if(value==='date'){
    queryParams.format = 'YYYY-MM-DD'
    queryParams.time = now.format(queryParams.format);
  }
}
watch(() => [queryParams.type], () => {
  restQuery(queryParams.type)
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
    tooltip: {
      trigger: 'axis',
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
let chart
onMounted(() => {
  chart = echarts.init(domRef.value, 'screen');
  const customList = [
    {name: '发电量', value: 1, unit: 'kWh'},
    {name: '用电量', value: 2, unit: 'kWh'},
    {name: '储能电量', value: 3, unit: 'kWh'},
    {name: '并网电量', value: 4, unit: 'kWh'},
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
    name: '发电量',
  },{
    name: '储能电量',
  },{
    name: '用电量',
  },{
    name: '并网电量',
  }];
  chart.setOption({
    dataset: [
      {
        dimensions: ['month', 'total_per_month'],
        source: [{month: "2024-08", total_per_month: 2414295}, {month: "2024-09", total_per_month: 1251178}],
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
    ],
    title: [
      ...group.map((item, i) => ({
        text: item.name,
        left:  ['4%', '32%'][i % 2],
        top: ['2%', '48%'][Number(i > 1)],
      })),
      {
        text: '数据总览',
        left: '64%',
        top: '2%',
      },
    ],
    tooltip: {},
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
      },
    ],

    xAxis: [...group.map((_, i) => ({
      gridIndex: i,
      ...axisProps,
    })), {
      gridIndex: 4,
      ...customProps,

    }],
    yAxis: [...group.map((_, i) => ({
      gridIndex: i,
      ...axisProps,
    })), {
      gridIndex: 4,
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
      yAxisIndex: 4,
      xAxisIndex: 4,
      encode: {
        x: 'name',
        y: 'value',
      },
      data: customList,
      renderItem: function (params, api) {
        const item = customList[params.dataIndex]
        return  {
          type: 'group',
          x: params.coordSys.x - 80,
          y: params.coordSys.y + params.dataIndex * 80 + 10,
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
                fontSize: 18,
                fontWeight: 'bold',
              },

            },
            {
              type: 'text',
              x: params.coordSys.width - 40,
              style: {
                text: item.value + item.unit,
                fill: '#FFF',
                fontSize: 20,
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
    class="form"
  >
    <el-form-item prop="type">
      <el-radio-group v-model="queryParams.type">
        <el-radio-button label="年" value="yearrange" />
        <el-radio-button label="月" value="monthrange" />
        <el-radio-button label="日" value="date" />
      </el-radio-group>
    </el-form-item>
    <el-form-item prop="time">
      <el-date-picker
        v-model="queryParams.time"
        :type="queryParams.type"
        :format="queryParams.format"
        :value-format="queryParams.format"
        :key="queryParams.type"
        :clearable="false"
        placeholder="请选择"
        range-separator="到"
        start-placeholder="开始"
        end-placeholder="结束"
      />
    </el-form-item>
    <ElFormItem>
      <ElButton type="primary" @click="handleQuery">查询</ElButton>
    </ElFormItem>
  </ElForm>
  <div class=" chartBox">
    <div class="real-echarts" ref="realRef"></div>
    <div class="echarts" ref="domRef"></div>
  </div>

</template>

<style scoped lang="scss">
.chartBox{
  margin: 0 16px 16px;
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
