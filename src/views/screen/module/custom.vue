<script setup lang="tsx">
import * as echarts from 'echarts';
import dayjs from "dayjs";
import theme from '@/views/screen/config/echart.json'

echarts.registerTheme('screen', theme);

const chartDomRef = ref();
const chartRef = ref();
type RecordItem = {
  id: number | string;
  time: string;
  level: 1 | 2 | 3 | 4;
}
const queryParams = reactive<{
  startTime?: string;
  endTime?: string;
  module?: string;
}>({
  module: '',
  startTime: undefined,
  endTime: undefined,
})

onMounted(() => {
  console.log(chartRef);
  const myChart = echarts.init(chartDomRef.value, 'screen');
  const time = dayjs('00:00', 'HH:mm');
  const source = Array(24 * 60).fill(1).map((_, i) => ({
      time: dayjs(time).set('minute', i).toDate(),
      total: Math.round(Math.random() * 1000)/100,
      di: Math.round(Math.random() * 1000)/100,
      tc: Math.round(Math.random() * 1000)/100,
      cd: i,
      fd: 24 * 60 - i + Math.round(Math.random() * 1000)/1000 * 2,
    }));
  console.log(source);
  setTimeout(() => {
    myChart.setOption({
      title: [
        {
          text: '当日功能曲线(kW)',
          textAlign: 'center',
          left: '50%',
          top: '3%',
        },
        {
          text: '储能当日充放电量(kWh)',
          top: '50%',
          left: '50%',
          textAlign: 'center',
        },
      ],
      tooltip: {
        trigger: 'axis'
      },
      legend: {},
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          start: 0,
          end: 10
        },
        {
          start: 0,
          end: 10
        },
      ],
      grid: [
        {
          bottom: '55%',
        },
        {
          top: '55%',
        },
      ],
      xAxis: [
        {
          type: 'time',
          gridIndex: 0,
          minInterval: 5 * 60 * 1000,
        },
        {
          type: 'time',
          gridIndex: 1,
        },
      ],
      yAxis: [
        {
          type: 'value',
          gridIndex: 0,
        },
        {
          type: 'value',
          gridIndex: 1,
        },
      ],
      dataset: {
        dimensions: [{name: 'time', type: 'time'}, 'total', 'di', 'tc', 'cd', 'fd'],
        source: source,
      },
      series: [
        {
          type: 'line',
          symbolSize: 2.5,
          xAxisIndex: 0,
          yAxisIndex: 0,
          encode: {
            x: 'time',
            y: 'total',
            // tooltip: [0, 1, ]
          },
        },
        {
          type: 'line',
          symbolSize: 2.5,
          xAxisIndex: 0,
          yAxisIndex: 0,
          encode: {
            x: 'time',
            y: 'di',
            tooltip: 1,
            // tooltip: [0, 1, ]
          },
        },
        {
          type: 'line',
          symbolSize: 2.5,
          xAxisIndex: 0,
          yAxisIndex: 0,
          encode: {
            x: 'time',
            y: 'tc',
            // tooltip: [0, 1, ]
          },
        },
        {
          type: 'line',
          symbolSize: 2.5,
          xAxisIndex: 1,
          yAxisIndex: 1,
          encode: {
            x: 'time',
            y: 'fd',
            tooltip: [0, 1, 2, 3, 4]
          },
        },
        {
          type: 'line',
          symbolSize: 2.5,
          xAxisIndex: 1,
          yAxisIndex: 1,
          encode: {
            x: 'time',
            y: 'cd',
          },
        },

      ]
    });
    console.log(myChart);

  }, 0)
})
const handleEdit = (row) => {
  console.log(row);
}
const handleClose = () => {

}
const handleOpen = () => {

}
</script>

<template>
  <header class="module-header">
    <h1>能量管理云监控自定义模式</h1>
  </header>
  <section class="module-list">
    <article class="module-item flex-1">
      <header class="module-item_header">
        <h2>自动策略模式</h2>
      </header>
      <div class="row-list">
        <div class="row-item">
          <div class="row-item_col_1">允许充电功率</div>
          <div class="row-item_col_2">3.0</div>
          <div class="row-item_col_3">KW</div>
        </div>
        <div class="row-item">
          <div class="row-item_col_1">允许放电功率</div>
          <div class="row-item_col_2">3.0</div>
          <div class="row-item_col_3">KW</div>
        </div>
      </div>
      <div class="row-list">
        <div class="row-item ">
          <div class="row-item_col_header">充放电ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ时段设定</div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">充电起始时间</div>
          <div class="row-item_col_2">11:00</div>
          <div class="row-item_col_3">hh:mm</div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">充电时长</div>
          <div class="row-item_col_2">120</div>
          <div class="row-item_col_3">min</div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">充电目标SOC</div>
          <div class="row-item_col_2">120</div>
          <div class="row-item_col_3">%</div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">放电起始时间</div>
          <div class="row-item_col_2">11:00</div>
          <div class="row-item_col_3">hh:mm</div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">放电时长</div>
          <div class="row-item_col_2">120</div>
          <div class="row-item_col_3">min</div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">放电目标SOC</div>
          <div class="row-item_col_2">5</div>
          <div class="row-item_col_3">%</div>
        </div>
      </div>
      <div class="row-list">
        <div class="row-item ">
          <div class="row-item_col_header">充放电ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ时段设定</div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">充电起始时间</div>
          <div class="row-item_col_2">11:00</div>
          <div class="row-item_col_3">hh:mm</div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">充电时长</div>
          <div class="row-item_col_2">120</div>
          <div class="row-item_col_3">min</div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">充电目标SOC</div>
          <div class="row-item_col_2">120</div>
          <div class="row-item_col_3">%</div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">放电起始时间</div>
          <div class="row-item_col_2">11:00</div>
          <div class="row-item_col_3">hh:mm</div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">放电时长</div>
          <div class="row-item_col_2">120</div>
          <div class="row-item_col_3">min</div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">放电目标SOC</div>
          <div class="row-item_col_2">5</div>
          <div class="row-item_col_3">%</div>
        </div>
      </div>
      <div class="row-list">
        <div class="row-item ">
          <div class="row-item_col_header">充放电ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ时段设定</div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">充电起始时间</div>
          <div class="row-item_col_2">11:00</div>
          <div class="row-item_col_3">hh:mm</div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">充电时长</div>
          <div class="row-item_col_2">120</div>
          <div class="row-item_col_3">min</div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">充电目标SOC</div>
          <div class="row-item_col_2">120</div>
          <div class="row-item_col_3">%</div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">放电起始时间</div>
          <div class="row-item_col_2">11:00</div>
          <div class="row-item_col_3">hh:mm</div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">放电时长</div>
          <div class="row-item_col_2">120</div>
          <div class="row-item_col_3">min</div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">放电目标SOC</div>
          <div class="row-item_col_2">5</div>
          <div class="row-item_col_3">%</div>
        </div>
      </div>
      <aside>
        <span>注：时间用小数表示，整数位为时，小数位为分</span>
      </aside>
    </article>
    <article class="module-item flex-1">
      <header class="module-item_header">
        <h2>能量管理运行状态</h2>
      </header>
      <h3>光伏</h3>
      <div class="row-list">
        <div class="row-item border">
          <div class="row-item_col_1">光伏送电优先级</div>
          <div class="row-item_col_2"></div>
          <div class="row-item_col_3"></div>
        </div>
      </div>
      <h3>电池</h3>
      <div class="row-list">
        <div class="row-item border">
          <div class="row-item_col_1">充电起始时间</div>
          <div class="row-item_col_2"></div>
          <div class="row-item_col_3"></div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">充电结束时间</div>
          <div class="row-item_col_2"></div>
          <div class="row-item_col_3"></div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">充电起始电量</div>
          <div class="row-item_col_2"></div>
          <div class="row-item_col_3"></div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">充电结束电量</div>
          <div class="row-item_col_2"></div>
          <div class="row-item_col_3"></div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">放电起始时间</div>
          <div class="row-item_col_2"></div>
          <div class="row-item_col_3"></div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">放电结束时间</div>
          <div class="row-item_col_2"></div>
          <div class="row-item_col_3"></div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">放电起始电量</div>
          <div class="row-item_col_2"></div>
          <div class="row-item_col_3"></div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">放电结束电量</div>
          <div class="row-item_col_2"></div>
          <div class="row-item_col_3"></div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">充电最大功率</div>
          <div class="row-item_col_2"></div>
          <div class="row-item_col_3"></div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">放电最大功率</div>
          <div class="row-item_col_2"></div>
          <div class="row-item_col_3"></div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">充电优先级</div>
          <div class="row-item_col_2"></div>
          <div class="row-item_col_3"></div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">放电优先级</div>
          <div class="row-item_col_2"></div>
          <div class="row-item_col_3"></div>
        </div>
      </div>
      <h3>负荷</h3>
      <div class="row-list">
        <div class="row-item border">
          <div class="row-item_col_1">负荷供电优先级</div>
          <div class="row-item_col_2"></div>
          <div class="row-item_col_3"></div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">负荷用电最大功率</div>
          <div class="row-item_col_2"></div>
          <div class="row-item_col_3"></div>
        </div>
      </div>
      <h3>离网</h3>
      <div class="row-list">
        <div class="row-item border">
          <div class="row-item_col_1">离网供电时长</div>
          <div class="row-item_col_2"></div>
          <div class="row-item_col_3"></div>
        </div>
      </div>
      <h3>并网</h3>
      <div class="row-list">
        <div class="row-item border">
          <div class="row-item_col_1">购电最大功率</div>
          <div class="row-item_col_2"></div>
          <div class="row-item_col_3"></div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">返送最大功率</div>
          <div class="row-item_col_2"></div>
          <div class="row-item_col_3"></div>
        </div>
      </div>
    </article>
    <article class="module-item flex-[2]">
      <div ref="chartDomRef" style="height: 800px"></div>
    </article>
  </section>
</template>

<style scoped lang="scss">
  :deep{
    .el-select{
      --el-select-width: 180px;
    }
    .el-form-item{
      align-items: center;
    }
  }
  a{
    color: #fff;
    text-decoration: none;
  }
  .module-header{
    h1{
      text-align: center;
      font-size: 32px;
      line-height: 1;
      margin: 18px 0 ;
    }
  }
  .module-list{
    display: flex;
    padding: 12px 40px 30px;
    gap: 40px;
  }
  .module-item{
    border: 1px dashed #29616d;
    padding: 8px 24px;
    &_header{
      h2{
        margin: 4px 0 0;
        font-size: 18px;
        text-align: center;
      }
    }
    h3{
      margin: 0;
    }
  }
  .row-list{
    padding: 12px 0;
  }
  .row-item{
    background-color: #183b5f;
    display: flex;
    align-items: stretch;
    border: 2px solid #29616d;
    border-bottom: none;
    &.border{
      > div{
        border-right: 1px solid #29616d;
        &:last-child{
          border-right: none;
        }
      }
    }
    &_col_header{
      flex: 1;
      text-align: center;
    }
    &_col_1{
      flex: 1;
      min-width: 120px;
    }
    &_col_2{
      width: 120px;
      min-width: 60px;
    }
    &_col_3{
      width: 120px;
      min-width: 60px;
    }
    &:last-child{
      border-bottom: 2px solid #29616d;
    }
    > div{
      width: 0;
      padding: 3px 8px;
    }
  }

</style>
