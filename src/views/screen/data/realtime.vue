<script setup lang="ts">
import SelectDateRange from "@/views/screen/components/SelectDateRange.vue";
import * as echarts from 'echarts'
import screenConfig from '@/views/screen/config/echart.json'
import CardHeader from '@/views/screen/components/CardHeader.vue'
import UseInfoItem from '@/views/screen/components/UseInfoItem.vue'
import bg from '@/views/screen/assets/real-bg.png'

const domRef = ref();
const realRef = ref();
echarts.registerTheme('screen', screenConfig);

const chartRef = ref()
defineOptions({
  name: 'ScreenDataHistory',
})


const projectAttrs = [
  {
    label: '项目编号',
    key: 'code',
    value: ''
  },
  {
    label: '业主名称',
    key: 'code1',
    value: ''
  },
  {
    label: '项目地址',
    key: 'code2',
    value: ''
  },
  {
    label: '项目经纬度',
    key: 'code3',
    value: ''
  },
  {
    label: '变压器容量',
    key: 'code4',
    value: ''
  },
  {
    label: '负荷总功率',
    key: 'code5',
    value: ''
  },
]
const todayDataList = [
  {
    label: '购电总量',
    key: '1',
  },
  {
    label: '发电总量',
    key: '2',
  },
  {
    label: '储电总量',
    key: '3',
  },
  {
    label: '用电总量',
    key: '4',
  },
  {
    label: '排碳总量',
    key: '11',
  },
  {
    label: '减碳总量',
    key: '21',
  },
  {
    label: '节能总量',
    key: '31',
  },
  {
    label: '降费金额',
    key: '41',
  },
  {
    label: '调荷总览',
    key: '12',
  },
  {
    label: '补贴金额',
    key: '22',
  },
  {
    label: '交易电量',
    key: '32',
  },
  {
    label: '交易收益',
    key: '42',
  },
].reduce((res, item, idx) => {
  console.log(idx, idx % 2);
  if (idx % 2 === 1) {
    res[res.length - 1] = {
      ...res[res.length - 1],
      next: item,
    }
    return res;
  }
  return [
    ...res,
    {
      first: item,
    }
  ]
}, [])
const dataList = [{
  title: '并网点',
  list: [
   [ 'A相电压', 'B相电压', 'C相电压'],
    [ 'A相电流', 'B相电流', 'C相电流'],
    [ 'A相有功', 'B相有功', 'C相有功'],
    [ 'A相功率因数', 'B相功率因数', 'C相功率因数'],
    [ 'A相需量', 'B相需量', 'C相需量'],
    [ '三相平衡度', '频率', '谐波'],
  ],
}, {
  title: '负载点',
  list: [
    [ 'A相电压', 'B相电压', 'C相电压'], [ 'A相电流', 'B相电流', 'C相电流'],[ 'A相有功', 'B相有功', 'C相有功'],
    [ 'A相功率因数', 'B相功率因数', 'C相功率因数'], [ 'A相需量', 'B相需量', 'C相需量'],[ '三相平衡度', '频率', '谐波'],
  ],
}]
const messList = [
  {id: 1, voltage: 'A相电压', electric: 'A相电流', type: '并网点'},
  {id: 2, voltage: 'B相电压', type: '并网点'},
  { id: 3, voltage: 'C相电压', type: '并网点'},
  {id: 4, voltage: 'A相电压', electric: 'A相电流', type: '并网点'},
  {id: 5, voltage: 'B相电压', type: '并网点'},
  { id: 6, voltage: 'C相电压', type: '并网点'},
]
const spanMethod = ({ rowIndex, columnIndex}) => {
  if (columnIndex === 0) {
    if (rowIndex % 3 === 0) {
      return {
        rowspan: 3,
        colspan: 1,
      }
    }
    return {
      rowspan: 0,
      colspan: 1,
    }
  }
}
</script>

<template>
  <ElRow :gutter="24">
    <ElCol :span="8">
      <CardHeader title="使用数据" />
      <section class="use-info">
        <UseInfoItem title="购电量" />
        <UseInfoItem title="用电量" />
        <UseInfoItem title="光伏发电量" success-value="光伏1发电量" value="0.1kWh" />
        <UseInfoItem title="光伏发电量" success-value="光伏2发电量" value="0.1kWh" />
        <UseInfoItem title="储能调电量" />
      </section>
      <CardHeader title="项目信息" />
      <article class="card-box">
        <header class="card-header">
          <h3>xxx项目</h3>
        </header>
        <ElTable
          :data="projectAttrs"
          row-key="label"
          border
          :show-header="false"
        >
          <ElTableColumn :width="100" label="名称" prop="label"  />
          <ElTableColumn label="值" prop="key"  />
        </ElTable>
        <footer class="card-footer">
          <ElButton >更多档案信息</ElButton>
          <ElButton>修改档案</ElButton>
          <ElButton>删除项目</ElButton>
        </footer>
      </article>
    </ElCol>
    <ElCol :span="9">
      <CardHeader title="" />
      <article class="real-box">、
        <img :src="bg" class="bg" alt="" />
        <div class="content">
          <div class="content_1"></div>
        </div>
      </article>
      <CardHeader title="电网信息" />
      <article class="card-box">
        <ElTable
          :data="messList"
          row-key="label"
          border
          :span-method="spanMethod"
          :show-header="false"
        >
          <ElTableColumn width="40" label="类别" prop="type"  />
          <ElTableColumn label="电压" prop="voltage"  />
          <ElTableColumn label="电流" prop="first.key"  />
          <ElTableColumn label="有功" prop="next.label"  />
          <ElTableColumn label="功率因数" prop="next.key"  />
          <ElTableColumn label="需量" prop="next.key"  />
          <ElTableColumn label="参数" prop="next.key"  />
        </ElTable>
      </article>
    </ElCol>
    <ElCol :span="7">
      <CardHeader title="当日数据" />
      <article class="card-box ">
        <ElTable
          :data="todayDataList"
          row-key="label"
          border
          :show-header="false"
        >
          <ElTableColumn :width="90" label="名称" prop="first.label"  />
          <ElTableColumn label="值" prop="first.key"  />
          <ElTableColumn :width="90" label="名称" prop="next.label"  />
          <ElTableColumn label="值" prop="next.key"  />
        </ElTable>
        <footer class="card-footer">
          <ElButton>更多档案信息</ElButton>
          <ElButton>修改档案</ElButton>
          <ElButton>删除项目</ElButton>
        </footer>
      </article>
      <article class="card-box">
        <header class="card-header text-left">
          <h3>电网调度指令</h3>
        </header>
        <ElTable
          :data="[{id: 1}, {id: 2}]"
          row-key="id"
          border
        >
          <ElTableColumn :width="60" label="序号" type="index"  />
          <ElTableColumn label="并网功率" prop="index1"  />
          <ElTableColumn label="所属部分" prop="index2"  />
          <ElTableColumn label="发生时间"  prop="index3"  />
          <ElTableColumn label="重要度" prop="index4"  />
        </ElTable>
        <footer class="card-footer">
          <ElButton >更多调度指令</ElButton>
          <ElButton >告警数据更新</ElButton>
        </footer>
      </article>
      <article class="card-box">
        <header class="card-header text-left">
          <h3>运行参数</h3>
        </header>
        <ElTable
          :data="[{id: 1}, {id: 2}]"
          row-key="id"
          border
          :show-header="false"
        >
          <ElTableColumn label="序号" prop="index"  />
          <ElTableColumn label="并网功率" prop="index1"  />
          <ElTableColumn label="所属部分" prop="index2"  />
          <ElTableColumn label="重要度" prop="index4"  />
        </ElTable>
        <footer class="card-footer">
          <ElButton>更多运行参数</ElButton>
          <ElButton>修改参数</ElButton>
          <ElButton>本地参数上传</ElButton>
        </footer>
      </article>
    </ElCol>
  </ElRow>
</template>

<style scoped lang="scss">
  .use-info{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
    justify-content: center;
    padding: 30px 0;
  }

  .card-box{
    margin: 16px 0 16px;
    padding: 12px 16px;
    background: var(--el-bg-color);
    border-radius: 3px;
    box-shadow: var(--el-box-shadow);
    .el-table{
      --el-table-border-color: #333;
    }
    .el-button{
      --el-fill-color-blank: #000;
    }
  }
  .card-header{
    text-align: center;
    padding: 8px 12px;
    &.text-left{
      text-align: left;
    }
    h3{
      margin: 0;
    }
  }
  .card-list{
  }
  .card-footer{
    margin-top: 12px;
    text-align: center;
    display: flex;
    justify-content: center;
  }
  .el-table{

  }
  .real-box{
    position: relative;
    margin-bottom: 30px;
    height: 379px;
    .bg{
      width: 100%;
      user-select: none;
      height: auto;
      display: block;
    }

    .content{
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
</style>
