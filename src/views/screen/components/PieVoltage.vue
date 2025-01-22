<script setup lang="ts">
  import * as echarts from "echarts";
  import {useResizeObserver} from "@vueuse/core";
  const batteryRef = ref();
  let chartRef;
  defineOptions({
    name: 'PieVoltage',
  })
  const props = defineProps<{
    class: string;
    title: string;
    data?: any;
    unit?: string;
    options?: Record<string, any>;
  }>()


  watch(() => props.data, (v) => {
    if (chartRef && v) {
      const dataset = [];
      let obj = {};
      v.month.source.map(item => {
        if (obj[item.voltage_range]) {
          obj[item.voltage_range][item.voltage_type] = item.count;
        } else {
          obj[item.voltage_range] = {
            [item.voltage_type]: item.count,
          };
        }
      });
      dataset.push({
        dimensions: ['label', 'A相', 'B相', 'C相'],
        source: Object.keys(obj).map((key) => ({
          label: key,
          ...obj[key],
        })),
      });
      obj = {};
      v.year.source.map(item => {
        if (obj[item.voltage_range]) {
          obj[item.voltage_range][item.voltage_type] = item.count;
        } else {
          obj[item.voltage_range] = {
            [item.voltage_type]: item.count,
          };
        }
      });
      dataset.push({
        dimensions: ['label', 'A相', 'B相', 'C相'],
        source: Object.keys(obj).map((key) => ({
          label: key,
          ...obj[key],
        })),
      });
      console.log(dataset)
      chartRef.setOption({
        dataset,
      })
    }
  }, {
    immediate: true
  })
  useResizeObserver(batteryRef, () => {
    if (chartRef) {
      chartRef.resize();
    }
  });

  onMounted(() => {
    const chart = echarts.init(batteryRef.value, 'screen');
    const colors = {
      '高电压': '#d83632',
      '正常电压': '#8cebb2',
      '低电压': 'rgb(96,148,233)',
    }
    chart.setOption({
      backgroundColor: 'transparent',
      legend: {
        orient: 'horizontal',
        bottom: 0,
        left: 'center',
        icon: 'circle',
        // width: 8,
        // height: 8,

        itemStyle: {
          borderWidth: 1,
        },
        textStyle: {
          color: '#fff',
        },
      },
      tooltip: {
        showContent: true,
      },
      title: [
        {
          text: '当月电压情况分析',
          top: '1%',
          left: '8%',
          textStyle: {
            color: '#fff',
          },
        },
        {
          text: '全年电压情况分析',
          top: '1%',
          left: '55%',
          textStyle: {
            color: '#fff',
          },
        }
      ],
      series: [{
        top: '15%',
        left: '5%',
        right: '55%',
        bottom: '5%',
        index: 0,
      }, {
        top: '15%',
        left: '55%',
        right: '5%',
        bottom: '5%',
        index: 1,
      }].reduce((res, posItem, idx) => [
        ...res,
        ...[{
          name: 'A相',
          start: '90%',
          end: '85%',
        }, {
          name: 'B相',
          start: '85%',
          end: '80%',
        }, {
          name: 'C相',
          start: '80%',
          end: '75%',
        }].map((item) => ({
          type: 'pie',
          gridIndex: idx,
          encode: {
            itemName: 'label',
            value: item.name,
          },
          name: item.name,
          radius: [item.end, item.start],
          datasetIndex: posItem.index,
          ...posItem,
          emphasis: {
            disabled: false,
            label: {
              show: false,
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          label: {
            position: 'outside',
            show: false,
          },
          itemStyle: {
            color(params) {
              return colors[params.value.label];
            },
          },
          padAngle: 0,
          labelLine: {
            show: false
          },
          tooltip: {
            // formatter: '{a}:{b} : {c} ({d}%)',
            formatter(params) {
              return `${item.name}-${params.name}:${params.percent}%`
            },
          },
        })),
        {
          type: 'pie',
          encode: {
            itemName: 'label',
            value: 'value',
          },
          radius: ['44%', '45%'],
          label: {
            show: false,
            position: 'center',
          },
          startAngle: -90,
          data: [{ value: 340, label: 'all'}],
          animation: false,
          ...posItem,
          itemStyle: {
            color(params) {
              return {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#4e71c6' // 0% 处的颜色
                }, {
                  offset: 1, color: 'transparent' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              };
            },
          },
          colorBy: 'series',
          padAngle: 3,
          labelLine: {
            show: false
          },
        }
      ],[]),
    })
    chartRef = chart;
  });
</script>

<template>
  <div class="h-216px w-full" :class="data.class" ref="batteryRef"></div>
</template>

<style scoped lang="scss">

</style>
