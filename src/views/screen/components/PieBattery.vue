<script setup lang="ts">
  import * as echarts from "echarts";
  const batteryRef = ref();
  const chartRef = ref();
  defineOptions({
    name: 'PieBattery',
  })
  const data = defineProps<{
    class: string;
    title: string;
    data?: any;
    unit?: string;
    options?: Record<string, any>;
  }>()

  const total = computed(() => {
    if (!data.data) {
      return 0;
    }
    return data.data.source.reduce((t, item) => t + (item.value || 0), 0);
  })

  watch(data.data, (v) => {
    console.log(v);
    if (chartRef.value) {
      chartRef.value.setOption({
        dataset: data.data,
      })
    }
  })

  watch(total, v => {
    console.log(v);
    if (chartRef.value) {
      chartRef.value.setOption({
        dataset: data.data,
      })
    }
  })

  onMounted(() => {
    const chart = echarts.init(batteryRef.value, 'screen');
    console.log(data.data);
    chart.setOption({
      ...(data.options || {}),
      dataset:  data.data || {
        dimensions: ['label', 'value'],
        source: [
          {
            label: '电池剩余电量',
            value: 120,
          }, {
            label: '电池已放电量',
            value: 300,
          }, {
            label: 'soc电量',
            value: 10,
          }
        ],
      },
      backgroundColor: 'transparent',
      legend: {
        right: 20,
        orient: 'vertical',
        top: 40,
        icon: 'circle',
        // width: 8,
        // height: 8,

        itemStyle: {
          borderWidth: 1,
        },
        textStyle: {
          color: '#fff',
        },
        formatter(name) {
          console.log(name);
          const item = data.data?.source.find(i => i.label === name);
          if (!item) {
            return name;
          }
          return name + ` ${item.value} ${data.unit || ''}`;
        },
        ...(data.options?.legend || {})
      },
      title: {
        text: data.title,
        top: 20,
        left: 30,
      },
      series: [{
        type: 'pie',
        encode: {
          itemName: 'label',
          value: 'value',
        },
        radius: ['50%', '70%'],
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          disabled: true,
          label: {
            show: false,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        itemStyle: {
          color(params) {
            return ['#286074', '#0c2452', '#53412c'][params.dataIndex];
          },
        },
        padAngle: 3,
        labelLine: {
          show: false
        },
        ...(data.options?.series || {})
      }, {
        type: 'pie',
        encode: {
          itemName: 'label',
          value: 'value',
        },
        radius: ['70%', '80%'],
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          disabled: true,
          label: {
            show: false,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        itemStyle: {
          color(params) {
            return ['#6bc987', '#4e71c6', '#bc3938'][params.dataIndex];
          },
        },
        colorBy: 'series',
        padAngle: 3,
        labelLine: {
          show: false
        },
        ...(data.options?.series || {})
      }, {
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
        ...(data.options?.series || {})
      }]
    })
    chartRef.value = chart;
  });
</script>

<template>
  <div :class="data.class" ref="batteryRef"></div>

</template>

<style scoped lang="scss">

</style>
