<script setup lang="ts">
import * as echarts from 'echarts'
import screenConfig from '@/views/screen/config/echart.json'
import CardHeader from '@/views/screen/components/CardHeader.vue'
import centerBg from '@/views/screen/assets/realtime_fork/image.png'
import gfIcon from '@/views/screen/assets/real/icon-gf.png'
import cdlIcon from '@/views/screen/assets/real/icon-cdl.png'
import tdIcon1 from '@/views/screen/assets/real/today-icon-1.png'
import tdIcon2 from '@/views/screen/assets/real/today-icon-2.png'
import tdIcon3 from '@/views/screen/assets/real/today-icon-3.png'
import tdIcon4 from '@/views/screen/assets/real/today-icon-4.png'

import {useProjectStore} from "@/store/modules/project";
import {dateFormatter} from "@/utils/formatTime";
echarts.registerTheme('screen', screenConfig);

defineOptions({
  name: 'ScreenDataRealtime',
})

const projectStore = useProjectStore();
const detailVisible = ref(false)
const isEdit = ref(false)
const keyValue = ref<Record<string, string | number>>({});

interface TodayDataItem {
  label: string;
  key: string;
  valKey: string;
  unit: string;
  icon: string;
  iconWidth: number;
  value?: number;
}
const todayDataList: TodayDataItem[] = [
  {
    label: '购电量',
    key: '1',
    valKey:'购电总量',
    unit: 'kWh',
    icon: cdlIcon,
    iconWidth: 26,
  },
  {
    label: '发电量',
    key: '2',
    valKey:  '发电总量',
    unit: 'kWh',
    icon: gfIcon,
    iconWidth: 44,
  },
  {
    label: '储能量',
    key: '3',
    unit: 'kWh',
    valKey:  '储能总量',
    icon: tdIcon3,
    iconWidth: 27,
  },
  {
    label: '用电量',
    key: '4',
    valKey:  '用电总量',
    unit: 'kWh',
    icon: tdIcon2,
    iconWidth: 25,
  },
  {
    label: '排碳量',
    key: '11',
    valKey:  '排碳总量',
    unit: 'kg',
    icon: tdIcon1,
    iconWidth: 26,
  },
  {
    label: '减碳量',
    key: '21',
    unit: 'kg',
    valKey:  '减碳总量',
    icon: tdIcon1,
    iconWidth: 26,
  },
  {
    label: '节能量',
    key: '31',
    unit: 'kg',
    icon: tdIcon1,
    iconWidth: 26,
    valKey:  '节能总量',
  },
  {
    label: '降费金额',
    key: '41',
    unit: '元',
    valKey:  '降费金额',
    icon: tdIcon4,
    iconWidth: 30,
  },
]

interface WarningRecordItem {
  id: number;
  createTime: string;
  level: string;
  info: string;
}
const warningData = ref<{ data: { list: WarningRecordItem[] } }>({
  data: { list: [] }
});

function getData() {
  // 静态面板数据（用于替换接口返回）
  keyValue.value = {
    '购电总量': 12680,
    '发电总量': 8540,
    '储能总量': 4320,
    '用电总量': 17020,
    '排碳总量': 2350,
    '减碳总量': 3180,
    '节能总量': 920,
    '降费金额': 46800,
  };

  // 静态告警列表
  warningData.value = {
    data: {
      list: [
        { id: 1, createTime: new Date().toISOString(), level: '一般', info: '逆变器1温度偏高' },
        { id: 2, createTime: new Date(Date.now() - 60_000).toISOString(), level: '提示', info: '今日光伏发电低于昨日' },
        { id: 3, createTime: new Date(Date.now() - 120_000).toISOString(), level: '重要', info: '储能SOC低于30%' },
        { id: 4, createTime: new Date(Date.now() - 180_000).toISOString(), level: '一般', info: '并网点电压波动' },
        { id: 5, createTime: new Date(Date.now() - 240_000).toISOString(), level: '提示', info: '电价即将进入峰时段' },
      ]
    }
  };

  return { data: keyValue.value };
}

onMounted(() => {
  getData();
});
const projectInfo = computed(() => {
  const project = (projectStore.projectInfo || {}) as Record<string, any>;

 return {
   projectCode: project.code,
   projectName: project.name,
   address: project.address,
   userName: project.ownerName,
   code4: '8000kVA',
   code5: '8000kW',
   latlng: [project.lng, project.lat].join(','),
   ...project,
   r1: '6000kVA',
   fh: '6000kW',
   cn: '电池储能',
   cnrl: '8000kWh',
   edgl: '8000kW',
   dclx: '铅酸电池',
   dcdy: '48V',
   fdsd: '90%',
   xhsm: '1000次循环',
   cfdsl: '2C',
   yqsm: '10年',
   wdfw: '-20℃至60℃',
 }
})
const getValue = (key, unit = '') => {
  const v =  {
    ...(unref(projectInfo)),
    ...(unref(keyValue)),
  }[key] || '';
  if (v) {
    return v + (unit || '');
  }
  return v;
}

// 已切换为静态数据渲染，编辑弹窗入口暂不使用

</script>

<template>
  <section class="w-full overflow-x-hidden">
    <div class="flex gap-24px">
      
      <div class="flex-1">
        <img :src="centerBg" class="w-full" alt="" />
        
      </div>
      <div class="w-24% pr-20px">

        <article class="card-box">
          <CardHeader title="当日数据" />
          <div class="flex flex-wrap ">
            <div v-for="item in todayDataList" class="w-50%" :key="item.key">
              <div class=" flex items-center mb-20px mr-20px pl-30px">
                <div class="today-bg">
                  <img :src="item.icon" :style="{width: item.iconWidth + 'px'}"  alt="" />
                </div>
                <div class="ml-8px w-0 flex-1">
                  <div class="fw-bold line-height-20px">{{item.label}}</div>
                  <div class="color-#3DBDFF font-you-she-biao-ti-hei fw-bold text-26px line-height-30px">{{getValue(item.valKey) || item.value || '-'}}{{item.unit}}</div>
                </div>
              </div>

            </div>
          </div>
        </article>
        <article class="card-box mt-30px">
          <card-header title="警告信息" />
          <div class="shadow-bg">
            <ElTable
              :data="warningData.data?.list"
              row-key="id"
              class="data-table"
              border
              stripe
            >
              <ElTableColumn :width="60" label="序号" type="index"  />
              <ElTableColumn :width="180" label="时间" prop="createTime" :formatter="dateFormatter" />
              <ElTableColumn label="警告级别" prop="level"  />
              <ElTableColumn show-overflow-tooltip label="警告信息" prop="info"  />
            </ElTable>
          </div>

        </article>
      </div>
    </div>
  </section>

  <ElDialog
    :title="getValue('projectName')"
    lock-scroll
    class="dialog"
    center
    align-center
    :append-to-body="false"
    v-model="detailVisible"
  >
    <ElForm
      label-width="auto"
    >
      <ElFormItem label="项目编号" prop="projectCode">
        <ElInput :readonly="!isEdit" v-model="projectInfo.projectCode" />
      </ElFormItem>
      <ElFormItem label="业主名称" prop="userName">
        <ElInput :readonly="!isEdit" v-model="projectInfo.userName" />
      </ElFormItem>
      <ElFormItem label="项目地址" prop="address">
        <ElInput :readonly="!isEdit" v-model="projectInfo.address" />
      </ElFormItem>
      <ElFormItem label="项目经纬度" prop="latlng">
        <ElInput :readonly="!isEdit" v-model="projectInfo.latlng" />
      </ElFormItem>
      <ElFormItem label="变压器容量" prop="r1">
        <ElInput :readonly="!isEdit" v-model="projectInfo.r1" />
      </ElFormItem>
      <ElFormItem label="负荷总功率" prop="fh">
        <ElInput :readonly="!isEdit" v-model="projectInfo.fh" />
      </ElFormItem>
      <ElFormItem label="储能类型" prop="cn">
        <ElInput :readonly="!isEdit" v-model="projectInfo.cn" />
      </ElFormItem>
      <ElFormItem label="储能容量" prop="cnrl">
        <ElInput :readonly="!isEdit" v-model="projectInfo.cnrl" />
      </ElFormItem>
      <ElFormItem label="额定功率" prop="edgl">
        <ElInput :readonly="!isEdit" v-model="projectInfo.edgl" />
      </ElFormItem>
      <ElFormItem label="电池类型" prop="dclx">
        <ElInput :readonly="!isEdit" v-model="projectInfo.dclx" />
      </ElFormItem>
      <ElFormItem label="电池电压范围" prop="dcdy">
        <ElInput :readonly="!isEdit" v-model="projectInfo.dcdy" />
      </ElFormItem>
      <ElFormItem label="放电深度" prop="fdsd">
        <ElInput :readonly="!isEdit" v-model="projectInfo.fdsd" />
      </ElFormItem>
      <ElFormItem label="循环寿命" prop="xhsm">
        <ElInput :readonly="!isEdit" v-model="projectInfo.xhsm" />
      </ElFormItem>
      <ElFormItem label="充放电速率" prop="cfdsl">
        <ElInput :readonly="!isEdit" v-model="projectInfo.cfdsl" />
      </ElFormItem>
      <ElFormItem label="预期寿命" prop="yqsm">
        <ElInput :readonly="!isEdit" v-model="projectInfo.yqsm" />
      </ElFormItem>
      <ElFormItem label="温度范围" prop="wdfw">
        <ElInput :readonly="!isEdit" v-model="projectInfo.wdfw" />
      </ElFormItem>
    </ElForm>
    <template #footer v-if="isEdit">
      <div class="dialog-footer">
        <el-button @click="detailVisible = false">关闭</el-button>
        <el-button type="primary" @click="detailVisible = false">
          确认提交
        </el-button>
      </div>
    </template>
  </ElDialog>
</template>

<style scoped lang="scss">

  .border-bottom-primary{
    position: relative;
    &:after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: #1EBCA1;
    }
  }
  .border-bottom-primary-1{
    position: relative;
    &:after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(to right, rgba(30, 188, 161, 0.1), rgba(30, 188, 161, 0.8));
    }
  }
  .border-bottom-blue{
    position: relative;
    &:after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(to right, rgba(36, 143, 218, 0.1), #248FDA);
    }
  }

  .shadow-bg{
    padding: 12px;
    box-shadow: inset 0 0 20px 0px #024A8A;
  }
  .ele-bg{
    position: relative;
    padding: 18px 16px;
    border-radius: 8px;
    background: linear-gradient(to right, rgba(32, 168, 232, 0.2),  #0b122a 30%, #0b122a 50%, rgba(32, 168, 232, 0.17));
    &:before{
      content: '';
      position: absolute;
      background: url(@/views/screen/assets/real/brackets-left.png) no-repeat;
      width: 19px;
      top: -5px;
      left: -5px;
      bottom: -5px;
      background-size: 100% 100%;
    }
    &:after{
      content: '';
      position: absolute;
      background: url(@/views/screen/assets/real/brackets-right.png) no-repeat;
      width: 18px;
      top: -5px;
      right: -5px;
      bottom: -5px;
      background-size: 100% 100%;
    }
  }
  .real-box{
    margin: 16px 7.5vw 40px;
    position: relative;
    font-weight: bold;
    .content{
      position: absolute;
      top: 0;
      left:0 ;
      right: 0;
      bottom: 0;
    }
    .content_1{
      position: absolute;
      top: 16%;
      left: -50px;
    }
    .content_2{
      position: absolute;
      top: 16%;
      right: -50px;
    }
    .content_3{
      position: absolute;
      top: 60%;
      left: -100px;
    }
    .content_4{
      position: absolute;
      top: 60%;
      right: -110px;
    }
    .content_5{
      position: absolute;
      bottom: -24px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .bg-icon-primary{
    background-color:rgba(30, 188, 161, 0.1);
    border-left: 3px solid rgba(30, 188, 161, 100);
    padding-left: 5px;
    .bg-icon{
      background-color: rgba(1, 206, 220, 0.2);
    }
    .ele-title{
      color: rgba(30, 188, 161, 100);;
    }
  }
  .bg-icon-success{
    background-color: rgba(25, 164, 255, 0.1);
    border-left: 3px solid rgba(25, 164, 255, 100);
    padding-left: 5px;
    .ele-title{
      color: rgba(25, 164, 255);;
    }

    .bg-icon{
      background-color: rgba(25, 164, 255, 0.2);
    }
  }
  .bg-icon{
    width: 52px;
    display: flex;
    align-items: center;
    height: 61px;
    justify-content: center;
  }
  .ele-title{
    font-weight: bold;
  }
  .ele-value{
    font-size: 20px;
    font-weight: bold;
  }
  .today-bg{
    width: 55px;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(@/views/screen/assets/real/today-bg.png) no-repeat;
    background-size: 100% 100%;
  }
  :deep(.dialog){
    --el-dialog-margin-top: 50px;
  }
  .data-table{
    //--el-fill-color-lighter: rgb(23,34,70);
    --el-table-header-bg-color: #172246;
    :deep( .el-table__cell){
      padding: 12px 0;
    }
    &.el-table--border :deep(th.el-table__cell){
      border-bottom: 1px dashed #fff;
    }
    :deep(td.el-table__cell) {
      border-right:1px dashed #fff; ;
    }
  }
</style>
