<script setup lang="ts">
import SelectDateRange from "@/views/screen/components/SelectDateRange.vue";
import * as echarts from 'echarts'
import screenConfig from '@/views/screen/config/echart.json'
import CardHeader from '@/views/screen/components/CardHeader.vue'
import UseInfoItem from '@/views/screen/components/UseInfoItem.vue'
import dayjs from "dayjs";

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
]
const dataList = [{
  title: '并网点',
  list: [
   [ 'A相电压', 'B相电压', 'C相电压'], [ 'A相电流', 'B相电流', 'C相电流'],[ 'A相有功', 'B相有功', 'C相有功'],
    [ 'A相功率因数', 'B相功率因数', 'C相功率因数'], [ 'A相需量', 'B相需量', 'C相需量'],[ '三相平衡度', '频率', '谐波'],
  ],
}, {
  title: '负载点',
  list: [
    [ 'A相电压', 'B相电压', 'C相电压'], [ 'A相电流', 'B相电流', 'C相电流'],[ 'A相有功', 'B相有功', 'C相有功'],
    [ 'A相功率因数', 'B相功率因数', 'C相功率因数'], [ 'A相需量', 'B相需量', 'C相需量'],[ '三相平衡度', '频率', '谐波'],
  ],
}]
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
        <div class="card-list ">
          <div class="card-item" v-for="item in projectAttrs" :key="item.key">
            <div class="card-item_col w-[100px]">{{item.label}}</div>
            <div class="card-item_col flex-[1]">{{item.key}}</div>
          </div>
        </div>
        <footer class="card-footer">
          <ElButton >更多档案信息</ElButton>
          <ElButton>修改档案</ElButton>
          <ElButton>删除项目</ElButton>
        </footer>
      </article>
    </ElCol>
    <ElCol :span="9">
      <article class="card-box">
        <div class="card-box_inner" v-for="inner in dataList" :key="inner.title">
          <header class="card-header">
            <h3>{{inner.title}}</h3>
          </header>
          <div class="card-data-list ">
            <div class="card-item-row" v-for="(item, index) in inner.list" :key="index">
              <div class="card-item-row_item" v-for="rowItem in item" :key="rowItem">{{rowItem}}</div>
            </div>
          </div>
        </div>

      </article>
    </ElCol>
    <ElCol :span="7">
      <article class="card-box">
        <header class="card-header">
          <h3>当日数据</h3>
        </header>
        <div class="card-list card-list-grid">
          <div class="card-item" v-for="item in todayDataList" :key="item.key">
            <div class="card-item_col w-[100px]">{{item.label}}</div>
            <div class="card-item_col flex-[1]">{{item.key}}</div>
          </div>
        </div>
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
          <ElTableColumn label="序号" type="index"  />
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
        <div class="card-list card-list-grid">
          <div class="card-item" v-for="item in todayDataList" :key="item.key">
            <div class="card-item_col w-[100px]">{{item.label}}</div>
            <div class="card-item_col flex-[1]">{{item.key}}</div>
          </div>
        </div>
        <footer class="card-footer">
          <ElButton >更多运行参数</ElButton>
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
    margin: 30px 0;
    padding: 8px 16px;
    background: linear-gradient(#5f687c, #344e86);
  }
  .card-header{
    border: 2px solid #fff;
    border-bottom: none;
    text-align: center;
    padding: 8px 12px;
    &.text-left{
      text-align: left;
    }
    h3{
      margin: 0;
    }
  }
  .card-item{
    display: flex;
    box-sizing: border-box;
    border: 2px solid #fff;
    border-bottom: none;
    &_col{
      padding: 4px 8px;
      border-left: 2px solid #fff;
      font-size: 16px;
      font-weight: bold;
      &:first-child{
        border-left: none;
      }
    }
  }
  .card-list-grid{
    display: flex;
    flex-wrap: wrap;
    .card-item{
      width: 50%;
      &:nth-child(2n) {
        border-left: none;
      }
    }
  }
  .card-list{
    border-bottom: 2px solid #fff;
  }
  .card-footer{
    margin-top: 12px;
    text-align: center;
    display: flex;
    justify-content: center;
    gap: 6px;
  }
  .card-box_inner{
    display: flex;
    align-items: stretch;
    margin-top: 12px;
    .card-header{
      writing-mode: tb;
      border-bottom: 2px solid #fff;
    }

  }
  .card-data-list{
    display: flex;
    border-top: 2px solid #fff;
  }
  .card-item-row{
    border-right: 2px solid #fff;
    &_item{
      padding: 12px 8px;
      border-bottom: 2px solid #fff;
    }
  }
  .el-table{
    --el-table-header-bg-color: #4f73bd;
    --el-table-header-text-color: #fff;
    --el-table-tr-bg-color: #d0d5e8;
    --el-fill-color-lighter: #eaebf4;
    --el-table-border-color: #fff;
    color: #333;
  }
</style>
