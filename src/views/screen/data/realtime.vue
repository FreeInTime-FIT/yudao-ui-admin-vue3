<script setup lang="ts">
import * as echarts from 'echarts'
import screenConfig from '@/views/screen/config/echart.json'
import CardHeader from '@/views/screen/components/CardHeader.vue'
import earthBg from '@/views/screen/assets/real/elec-earth.png'
import centerBg from '@/views/screen/assets/real/middlebg.png'
import eleIcon from '@/views/screen/assets/real/center-elc-icon.png'
import gfIcon from '@/views/screen/assets/real/icon-gf.png'
import cdlIcon from '@/views/screen/assets/real/icon-cdl.png'
import fdlIcon from '@/views/screen/assets/real/icon-fdl.png'
import tdIcon1 from '@/views/screen/assets/real/today-icon-1.png'
import tdIcon2 from '@/views/screen/assets/real/today-icon-2.png'
import tdIcon3 from '@/views/screen/assets/real/today-icon-3.png'
import tdIcon4 from '@/views/screen/assets/real/today-icon-4.png'

import {
  getPanelData
} from "@/services/services/IotReportController";
import {useProjectStore} from "@/store/modules/project";
echarts.registerTheme('screen', screenConfig);

defineOptions({
  name: 'ScreenDataRealtime',
})

const projectStore = useProjectStore();
const detailVisible = ref(false)
const isEdit = ref(false)
const keyValue = ref({});

const todayDataList = [
  {
    label: '购电总量',
    key: '1',
    valKey:'购电总量',
    unit: 'kWh',
    icon: cdlIcon,
    iconWidth: 26,
  },
  {
    label: '发电总量',
    key: '2',
    valKey:  '发电总量',
    unit: 'kWh',
    icon: gfIcon,
    iconWidth: 44,
  },
  {
    label: '储能总量',
    key: '3',
    unit: 'kWh',
    valKey:  '储能总量',
    icon: tdIcon3,
    iconWidth: 27,
  },
  {
    label: '用电总量',
    key: '4',
    valKey:  '用电总量',
    icon: tdIcon2,
    iconWidth: 25,
  },
  {
    label: '排碳总量',
    key: '11',
    valKey:  '排碳总量',
    icon: tdIcon1,
    iconWidth: 26,
  },
  {
    label: '减碳总量',
    key: '21',
    valKey:  '减碳总量',
    icon: tdIcon1,
    iconWidth: 26,
  },
  {
    label: '节能总量',
    key: '31',
    icon: tdIcon1,
    iconWidth: 26,
    valKey:  '节能总量',
  },
  {
    label: '降费金额',
    key: '41',
    valKey:  '降费金额',
    icon: tdIcon4,
    iconWidth: 30,
  },
]

const messList = [
  {id: 1, v: 'A相', voltageKey: '1_177', electricKey: '1_174', powerKey: '1_180', powerFactorKey: '1_186', otherKey: '',  type: '并网点'},
  {id: 2, v: 'B相', voltageKey: '1_178', electricKey: '1_175', powerKey: '1_181', powerFactorKey: '1_187', otherKey: '', type: '并网点'},
  {id: 3, v: 'C相', voltageKey: '1_179', electricKey: '1_176', powerKey: '1_182', powerFactorKey: '1_188', otherKey: '', type: '并网点'},
  {id: 4, voltage: 'A相电压', type: '负载点'},
  {id: 5, voltage: 'B相电压', voltageKey: '4#addr_2102h', electricKey: '4#addr_210eh', powerKey: '4#addr_2116h', powerFactorKey: '4#addr_212eh', type: '负载点',otherKey: '4#addr_2134h'},
  {id: 6, voltage: 'C相电压', voltageKey: '4#addr_2104h', electricKey: '4#addr_2110h', powerKey: '4#addr_2118h', powerFactorKey: '4#addr_2130h', type: '负载点'},
]
const messNewList = [
  {id: 1, name: '电压（V）', aValue: '1_177', bValue: '1_178', cValue: '1_179', total: ''},
  {id: 2,  name: '电流（A）', aValue: '1_174', bValue: '1_175', cValue: '1_176', total: ''},
  {id: 3,  name: '功率因数', aValue: '', bValue: '', cValue: '', total: ''},
  {id: 4, name: '有功功率（KW）', aValue: '1_180', bValue: '1_181', cValue: '1_182', total: '1_180'},
  {id: 5, name: '无功功率（Kvar）', voltageKey: '4#addr_2102h', electricKey: '4#addr_210eh', powerKey: '4#addr_2116h', powerFactorKey: '4#addr_212eh', type: '负载点',otherKey: '4#addr_2134h'},
  {id: 6, name: '视在功率（KVA）', aValue: '1_186', bValue: '1_187', cValue: '1_188', total: '1_194'},

]
type UseItem = {
  title: string;
  key: string;
  unit?: string;
  async?: boolean;
  successValue?: string;
  value?: any;
}
const useList: UseItem[] = [{
  title: '光伏发电量',
  key: '光伏1发电量',
  unit: 'kWh',
  async: true,
  icon: gfIcon,
  iconCls: 'w-44px',
  successValue: '光伏1发电量',
  cls: 'bg-icon-primary',
},{
  title: '光伏发电量',
  key: '光伏2发电量',
  async: true,
  icon: gfIcon,
  iconCls: 'w-44px',
  successValue: '光伏2发电量',
  unit: 'kWh',
  cls: 'bg-icon-primary',
},{
  title: '充电调用量',
  key: '充电调用量',
  value: 1300,
  unit: 'kWh',
  icon: cdlIcon,
  iconCls: 'w-26px',
  cls: 'bg-icon-success',
},{
  title: '放电调用量',
  key: '放电调用量',
  unit: 'kWh',
  icon: fdlIcon,
  iconCls: 'w-25px',
  cls: 'bg-icon-success',
  value: 1300,
},]
const getData = async () => {
  const res = await  getPanelData({
    key: 'realtime',
    projectId: projectStore.projectInfo?.id,
  })
  keyValue.value = res.data || {};
  return res;
}
watch(() => projectStore.projectInfo, (project) => {
  if (!project) {
    return;
  }
  getData();
}, {
  immediate: true,
})
const projectInfo = computed(() => {
  const project = projectStore.projectInfo || {};

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

const handleProject = () => {
  detailVisible.value = true;
  isEdit.value = false;
}

</script>

<template>
  <section class="w-full overflow-x-hidden">
    <el-row :gutter="48">
      <el-col :span="6">
        <CardHeader title="项目信息" >
          <h3 class="text-18px mb-0 mt-0">
            项目信息:
            <a class="color-#D8FF00" @click="handleProject">{{getValue('projectName')}}</a>
          </h3>
        </CardHeader>
        <article class="flex mb-40px shadow-bg items-center">
          <div>
            <img :src="earthBg" class="w-95px" alt="" />
          </div>
          <div class="flex-1 p-12px">
            <div class="flex p-[12px_20px_12px_12px]">
              <div class="border-bottom-primary pb-12px">项目编号</div>
              <div class="border-bottom-primary-1 pb-12px flex-1 text-right">{{getValue('projectCode')}}</div>
            </div>
            <div class="flex  p-[12px_20px_12px_12px]">
              <div class="border-bottom-primary pb-12px">业主名称</div>
              <div class="border-bottom-primary-1 pb-12px flex-1 text-right">{{getValue('userName')}}</div>
            </div>
            <div class="flex  p-[12px_20px_12px_12px]">
              <div class="border-bottom-primary pb-12px">项目经纬度</div>
              <div class="border-bottom-primary-1 pb-12px flex-1 text-right">{{getValue('latlng')}}</div>
            </div>
            <div class="flex p-12px border-bottom-blue justify-between">
              <div>变压器容量</div>
              <div>{{getValue('code4')}}</div>
            </div>
            <div class="flex p-12px  border-bottom-blue justify-between">
              <div>负荷总功率</div>
              <div>{{getValue('code5')}}</div>
            </div>
          </div>
        </article>
        <article class="">
          <CardHeader title="电网信息" />
          <article class="card-box">
            <ElTable
              :data="messNewList"
              row-key="label"
              border
            >
              <ElTableColumn label="电网" width="140" prop="name"  >
                <template #default="{row}">
                  <span class="font-bold">{{row.name}}</span>
                </template>
              </ElTableColumn>
              <ElTableColumn label="A" prop="voltageKey"  >
                <template #default="{row}">
                  {{getValue(row.aValue)}}
                </template>
              </ElTableColumn>
              <ElTableColumn label="B" prop="electricKey"  >
                <template #default="{row}">
                  {{getValue(row.bValue)}}
                </template>
              </ElTableColumn>
              <ElTableColumn label="C" width="100" prop="powerKey"  >
                <template #default="{row}">
                  {{getValue(row.cValue)}}
                </template>
              </ElTableColumn>
              <ElTableColumn label="总" prop="powerFactorKey"  >
                <template #default="{row}">
                  {{getValue(row.total, '')}}
                </template>
              </ElTableColumn>
            </ElTable>
          </article>
        </article>
      </el-col>
      <el-col :span="12">
        <CardHeader title="使用数据" />
        <div class="flex gap-28px">
          <div class="flex-1 flex items-center ele-bg">
            <div><img :src="eleIcon" class="w-44px" alt="" /></div>
            <div class="ml-12px">
              <div>
                购电量
              </div>
              <div class="color-#FCFF00 text-26px">
                {{getValue('购电量')}}kWh
              </div>
            </div>
          </div>
          <div class="flex-1 flex items-center ele-bg">
            <div><img :src="eleIcon" class="w-44px" alt="" /></div>
            <div class="ml-12px">
              <div>
                用电量
              </div>
              <div class="color-#FCFF00 text-26px">
                {{getValue('用电量')}}kWh
              </div>
            </div>
          </div>
        </div>
        <div class="real-box">
          <img :src="centerBg" class="w-full" alt="" />
          <div class="content">
            <div class="content_1">
              <div>P:{{keyValue['光伏板1_P']}}kw</div>
              <div>U:{{keyValue['光伏板1_U']}}V</div>
              <div>I:{{keyValue['光伏板1_A']}}A</div>
            </div>
            <div class="content_2">
              <div>P:{{keyValue['光伏板2_P']}}kw</div>
              <div>U:{{keyValue['光伏板2_U']}}V</div>
              <div>I:{{keyValue['光伏板2_A']}}A</div>
            </div>
            <div class="content_3">
              <div>P:{{keyValue['hub_P']}}kW</div>
              <div>Ua:{{keyValue['hub_UA']}}V</div>
              <div>Ub:{{keyValue['hub_UB']}}V</div>
              <div>Uc:{{keyValue['hub_UC']}}V</div>
              <div>Ia:{{keyValue['hub_IA']}}VA</div>
              <div>Ib:{{keyValue['hub_IB']}}VA</div>
              <div>Ic:{{keyValue['hub_IC']}}VA</div>
              <div>F:{{keyValue['hub_F']}}Hz</div>
            </div>
            <div class="content_4">
              <div>P:{{keyValue['hub_负载_P']}}kW</div>
              <div>Ua:{{keyValue['hub_负载_UA']}}V</div>
              <div>Ub:{{keyValue['hub_负载_UB']}}V</div>
              <div>Uc:{{keyValue['hub_负载_UC']}}V</div>
              <div>Ia:{{keyValue['hub_负载_IA']}}VA</div>
              <div>Ib:{{keyValue['hub_负载_IB']}}VA</div>
              <div>Ic:{{keyValue['hub_负载_IC']}}VA</div>
              <div>F:{{keyValue['hub_负载_F']}}Hz</div>
            </div>
            <div class="content_5">
              <div>P:{{keyValue['p']}}kW U:{{keyValue['u']}}V I:{{keyValue['i']}}A</div>
            </div>
          </div>

        </div>
        <div class="flex gap-8px mb-20px">
          <div
            v-for="item in useList"
            class="flex-1 flex items-center"
            :key="item.key"
            :class="item.cls"
          >
            <div class="bg-icon"><img
              :src="item.icon"
              :class="item.iconCls"
              alt="" /></div>
            <div class="ml-10px">
              <div class="ele-title">{{item.title}}</div>
              <div class="ele-value">{{getValue(item.key) || item.value}}{{item.unit}}</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">

        <article class="card-box">
          <CardHeader title="当日数据" />
          <div class="flex flex-wrap">
            <div v-for="item in todayDataList" class="w-50%" :key="item.id">
              <div class=" flex items-center mb-16px mr-20px pl-30px">
                <div class="today-bg">
                  <img :src="item.icon" :style="{width: item.iconWidth + 'px'}"  alt="" />
                </div>
                <div class="ml-8px">
                  <div class="fw-bold">{{item.label}}</div>
                  <div class="color-#3DBDFF fw-bold text-26px">{{getValue(item.key) || item.value}}</div>
                </div>
              </div>

            </div>
          </div>
        </article>
        <article class="card-box">
          <card-header title="告警信息" />
          <ElTable
            :data="[{id: 1}, {id: 2}, {id: 3}, {id: 4},{id: 5}, {id: 6},{id: 7}, {id: 8}]"
            row-key="id"
            border
          >
            <ElTableColumn :width="60" label="序号" type="index"  />
            <ElTableColumn label="时间" prop="index1"  />
            <ElTableColumn label="警告级别" prop="index2"  />
            <ElTableColumn label="所属设备"  prop="index3"  />
            <ElTableColumn label="警告信息" prop="index4"  />
          </ElTable>
        </article>
      </el-col>
    </el-row>
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
    margin: 16px 130px 36px;
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
      left: 0;
    }
    .content_2{
      position: absolute;
      top: 16%;
      right: 0px;
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
</style>
