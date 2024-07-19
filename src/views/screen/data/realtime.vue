<script setup lang="ts">
import * as echarts from 'echarts'
import screenConfig from '@/views/screen/config/echart.json'
import CardHeader from '@/views/screen/components/CardHeader.vue'
import UseInfoItem from '@/views/screen/components/UseInfoItem.vue'
import bg from '@/views/screen/assets/real-bg.png'
import {
  getLatestForKeys,
} from "@/services/services/guanlihoutaiIOTshujushishihuoqu";
echarts.registerTheme('screen', screenConfig);

defineOptions({
  name: 'ScreenDataHistory',
})

const detailVisible = ref(false)
const isEdit = ref(false)
const keyValue = ref({});
const projectAttrs = [
  {
    label: '项目编号',
    key: 'projectCode',
    value: ''
  },
  {
    label: '业主名称',
    key: 'userName',
    value: ''
  },
  {
    label: '项目地址',
    key: 'address',
    value: ''
  },
  {
    label: '项目经纬度',
    key: 'latlng',
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
const todayDataShowList = todayDataList.reduce((res, item, idx) => {
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
const messList = [
  {id: 1, voltage: 'A相电压', electric: 'A相电流', type: '并网点'},
  {id: 2, voltage: 'B相电压', type: '并网点'},
  {id: 3, voltage: 'C相电压', type: '并网点'},
  {id: 4, voltage: 'A相电压', electric: 'A相电流', type: '负载点'},
  {id: 5, voltage: 'B相电压', type: '负载点'},
  {id: 6, voltage: 'C相电压', type: '负载点'},
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
  title: '购电量',
  key: '1',
  unit: 'kWh',
  value: 0,
}, {
  title: '用电量',
  key: '3#addr_0x3000',
  async: true,
  unit: 'kWh',
},{
  title: '光伏发电量',
  key: '3',
  unit: 'kWh',
  successValue: '光伏1发电量',
  value: 1300,
},{
  title: '光伏发电量',
  key: '4',
  successValue: '光伏2发电量',
  unit: 'kWh',
  value: 1200,
},{
  title: '充电调用量',
  key: '5',
  value: 1300,
  unit: 'kWh',
},{
  title: '放电调用量',
  key: '6',
  unit: 'kWh',
  value: 1300,
},]
const getData = async () => {
  const keys = [...useList.filter(i => i.async).map(i => i.key)];
  const res = await  getLatestForKeys({}, {
    keys,
  })
  keyValue.value = res.data || {};
  return res;
}
onMounted(() => {
  getData();
})
const projectInfo = reactive({
  projectCode: '03123033',
  projectName: '电力A项目',
  address: '杭州市余杭区万达广场',
  userName: '万达管理集团',
  code4: '8000kVA',
  code5: '8000kW',
  latlng: '120.0000,31.000',
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
})
const getValue = (key) => {
  console.log(unref(keyValue), key, unref(keyValue)[key]);
  return {
    ...(unref(projectInfo)),
    ...(unref(keyValue)),
  }[key] || '';
}
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
const handleProject = () => {
  detailVisible.value = true;
  isEdit.value = false;
}
const handleProjectEdit = () => {
  detailVisible.value = true;
  isEdit.value = true;
}
</script>

<template>
  <ElRow :gutter="24">
    <ElCol :span="8">
      <CardHeader title="使用数据" />
      <section class="use-info">

        <UseInfoItem v-for="item in useList"
                     :key="item.key"
                     :title="item.title"
                     :success-value="item.successValue"
                     :unit="item.unit"
                     :value="getValue(item.key) || item.value"
        />
      </section>
      <CardHeader title="项目信息" />
      <article class="card-box">
        <header class="card-header">
          <h3> {{getValue('projectName')}}</h3>
        </header>
        <ElTable
          :data="projectAttrs"
          row-key="label"
          border
          :show-header="false"
        >
          <ElTableColumn :width="100" label="名称" prop="label"  />
          <ElTableColumn label="值" prop="key"  >
            <template #default="{row}">
              {{getValue(row.key)}}
            </template>
          </ElTableColumn>
        </ElTable>
        <footer class="card-footer">
          <ElButton @click="handleProject">更多档案信息</ElButton>
          <ElButton @click="handleProjectEdit">修改档案</ElButton>
          <ElButton>删除项目</ElButton>
        </footer>
      </article>
    </ElCol>
    <ElCol :span="9">
      <CardHeader title="" />
      <article class="real-box">、
        <img :src="bg" class="bg" alt="" />
        <div class="content">
          <div class="content_1">
            <div>P:50kW</div>
            <div>U:400V</div>
            <div>I:125A</div>
          </div>
          <div class="content_2">
            <div>P:50kW</div>
            <div>U:400V</div>
            <div>I:125A</div>
          </div>
          <div class="content_3">
            <div>P:50kW</div>
            <div>Ua:230V</div>
            <div>Ub:230V</div>
            <div>Uc:230V</div>
            <div>Ia:1321A</div>
            <div>Ib:1321A</div>
            <div>Ic:1321A</div>
            <div>F:50Hz</div>
            <div>PF:95%</div>
          </div>
          <div class="content_4">
            <div>P:100kW</div>
            <div>Ua:230V</div>
            <div>Ub:230V</div>
            <div>Uc:230V</div>
            <div>Ia:264A</div>
            <div>Ib:264A</div>
            <div>Ic:264A</div>
            <div>F:50Hz</div>
            <div>PF:95%</div>
          </div>
          <div class="content_5">
            <div>P:268kW U:12V I:208A</div>
          </div>
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
          <ElTableColumn label="电流" prop="first.key"  >
            <template #default="{row}">
              {{getValue(row.voltage)}}
            </template>
          </ElTableColumn>
          <ElTableColumn label="有功" prop="next.label"  >
            <template #default="{row}">
              {{getValue(row.voltage)}}
            </template>
          </ElTableColumn>
          <ElTableColumn label="功率因数" prop="next.key"  >
            <template #default="{row}">
              {{getValue(row.voltage)}}
            </template>
          </ElTableColumn>
          <ElTableColumn label="需量" prop="next.key"  >
            <template #default="{row}">
              {{getValue(row.voltage)}}
            </template>
          </ElTableColumn>
          <ElTableColumn label="参数" prop="next.key"  >
            <template #default="{row}">
              {{getValue(row.voltage)}}
            </template>
          </ElTableColumn>
        </ElTable>
      </article>
    </ElCol>
    <ElCol :span="7">
      <CardHeader title="当日数据" />
      <article class="card-box ">
        <ElTable
          :data="todayDataShowList"
          row-key="label"
          border
          :show-header="false"
        >
          <ElTableColumn :width="90" label="名称" prop="first.label"  />
          <ElTableColumn label="值" prop="first.key"  >
            <template #default="{row}">
              {{getValue(row.first.key)}}
            </template>
          </ElTableColumn>
          <ElTableColumn :width="90" label="名称" prop="next.label"  />
          <ElTableColumn label="值" prop="next.key"  >
            <template #default="{row}">
              {{getValue(row.next.key)}}
            </template>
          </ElTableColumn>
        </ElTable>
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
      max-height: 379px;
    }

    .content{
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
    .content_1{
      position: absolute;
      top: 5%;
      left: 26%;
    }
    .content_2{
      position: absolute;
      top: 5%;
      left: 64%;
    }
    .content_3{
      position: absolute;
      top: 45%;
      left: 7%;
    }
    .content_4{
      position: absolute;
      top: 45%;
      left: 80%;
    }
    .content_5{
      position: absolute;
      top: 90%;
      left: 36%;
    }
  }
  :deep(.dialog){
    --el-dialog-margin-top: 50px;
  }
</style>
