<script setup lang="tsx">
import InputWarp from "@/views/screen/components/InputWarp.vue";
import {useTable} from "@/hooks/web/useTable";
import CardHeader from "@/views/screen/components/CardHeader.vue";
import {getPanelData} from "@/services/services/IotReportController";
import {useIntervalFn, useLocalStorage, useWebSocket} from "@vueuse/core";
import {useProjectStore} from "@/store/modules/project";
import dayjs from "dayjs";
import type {Ref} from "vue";
import queryString from "query-string";
import {getAccessToken} from "@/utils/auth";
import {ElNotification, notificationProps} from "element-plus";

type QueryParams = {
  startTime?: string;
  endTime?: string;
  module?: string;
}
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
  deviceType:'1#'
})
const WRITE_KEY = 'device-write-addr';
const READ_KEY = 'device-read-addr'
const DEVICE_LIST_KEY = 'device-project-last-data';
const DEVICE_LIST_DATA = 'device-last-data';

const projectStore = useProjectStore();

const getLastData = async () => {
  const res = await getPanelData({
    key: 'equipment',
    projectId: projectStore.projectInfo?.id,
  })
  keyValue.value = res.data || {};
  return res;
}


const keyValue = ref<any>({});
const notifyRef = ref([]);

const server = queryString.stringifyUrl({
  url: (import.meta.env.VITE_BASE_URL + '/infra/ws').replace(/^http/, 'ws'),
  query: {
    token: getAccessToken(),
  }});
const { status, data, send, close, open } = useWebSocket<string>(server as any, {
  autoReconnect: true,
  heartbeat: !import.meta.env.DEV,
  autoClose: false,
  immediate: false,
})
const updateValue = ref({})
const resData: Ref<any> = useLocalStorage<any>('sc:screen-setting-field', {}) as Ref<any>;
const tableList = ref([])
const sendData = (type, content) => {
  send(JSON.stringify({
    type,
    content: JSON.stringify(content),
  }));
}
const handleEdit = (rowData) => {
  sendData(WRITE_KEY, {
    ...rowData,
    set: (updateValue.value[rowData.addr] || undefined),
  });
}
const handleRead = (rowData) => {
  sendData(READ_KEY, {
    ...rowData,
    set: (updateValue.value[rowData.addr] || {}),
  });
  updateValue.value[rowData.addr] = undefined;
}
function handleRefresh() {
  sendData(DEVICE_LIST_KEY, {
    projectId: projectStore.projectInfo?.id,
  });
}
const dealData = (prev, nowData) => {
  return {
    ...nowData,
    profits: [
      ...nowData.profits.map(i => ({
        updateTime: dayjs(nowData.updateTime).format('HH:mm:ss.SSS'),
        ...i,
      })),
      ...(prev?.profits || []).filter(i => nowData.profits.every(item => item.addr !== i.addr)),
    ].sort((a, b) => {
      const aArr = a.addr.split('#').map(i => parseInt(i));
      const bArr = b.addr.split('#').map(i => parseInt(i));
      if (aArr[0] !== bArr[0]) {
        return aArr[0] - bArr[0]
      }
      return aArr[1] - bArr[1]
    }),
  }
}
watch(data, () => {
  if (!unref(data)) {
    return
  }

  if (unref(data) === 'pong' || unref(data) === '"pong"') {
    return;
  }
  try {
    const jsonMessage = JSON.parse(unref(data) as string)
    if (jsonMessage.type === DEVICE_LIST_DATA) {
      // resData.value = dealData(resData.value || {}, JSON.parse(jsonMessage.content))
      resData.value = JSON.parse(jsonMessage.content)
      tableList.value = resData.value.profits.filter(it=> it.access == 'RW')
      console.log(tableList.value);
    }
    if (jsonMessage.type === 'success') {
      if (notifyRef.value && notifyRef.value.length > 3) {
        notifyRef.value.shift().close();
      }
      const res = JSON.parse(jsonMessage.content);
      notifyRef.value.push(
        ElNotification({
          title: '操作成功',
          message: res.msg,
          type: 'success',
        } as notificationProps)
      )
      return;
    }
    return;
  }catch (e) {
    console.warn(e);
  }
})
onMounted(() => {
  open() ;
  getLastData()
})
watch(() => [projectStore.projectInfo], (val) => {
  if (!val) {
    return
  }
  handleRefresh()
}, {
  immediate: true,
})
useIntervalFn(() => {
  getLastData();
}, 3000)

</script>

<template>
  <ElForm
    ref="queryFormRef"
    :inline="true"
    :model="queryParams"
    class="-mb-15px form"
  >
    <ElFormItem prop="d">
      <InputWarp>
        <ElSelect placeholder="设备选择" v-model="queryParams.deviceType">
          <ElOption value="1#" label="1#:逆变器" />
          <ElOption value="2#" label="2#:空调"/>
          <ElOption value="11#" label="11#电表"/>
        </ElSelect>
      </InputWarp>
    </ElFormItem>

    <ElFormItem>
      <ElButton type="primary" @click="handleRefresh">查询</ElButton>
    </ElFormItem>
  </ElForm>
  <ContentWrap
    title="设备配置列表"
  >
    <ElAutoResizer>
      <template #default="{ height, width }">
        <ElTable
          :data="tableList.filter(i => i.addr.includes(queryParams.deviceType))"
          fixed
          :width="width || 800"
          :height="height || 800"
        >
          <ElTableColumn width="80" label="序号" type="index" :index="index => index + 1"/>
          <ElTableColumn prop="addr" label="addr"/>
          <ElTableColumn prop="type" label="type"/>
          <ElTableColumn prop="access" label="access"/>
          <ElTableColumn prop="value" label="value">
            <template #default="scope">
              <el-input v-model="scope.row.value" />
            </template>
          </ElTableColumn>
          <ElTableColumn prop="set" label="set">
            <template #default="scope">
              <el-input v-model="updateValue[scope.row.addr]" />
            </template>
          </ElTableColumn>
          <ElTableColumn prop="des" label="desc"/>
          <ElTableColumn label="操作">
            <template #default="scope">
              <ElButton @click="handleRead(scope.row)">招采</ElButton>
              <ElButton @click="handleEdit(scope.row)">下发</ElButton>
            </template>
          </ElTableColumn>
        </ElTable>
      </template>
    </ElAutoResizer>
  </ContentWrap>
  <CardHeader title="环控设备"/>
  <section class="flex  gap-[40px] mt-[30px]">
    <article class="flex-[1] module-item">
      <h3>运行状态</h3>
      <div class="row-list">
        <div class="row-item border">
          <div class="row-item_col_1">
            整机状态
          </div>
          <div class="row-item_col_2">
            <div v-if="keyValue['整机状态'] === 1" class="status status-success">运行</div>
            <div v-else class="status status-stop">暂停</div>
          </div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">
            内风机
          </div>
          <div class="row-item_col_2">
            <div v-if="keyValue['内风机'] === 1" class="status status-success">运行</div>
            <div v-else class="status status-stop">暂停</div>
          </div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">
            外风机
          </div>
          <div class="row-item_col_2">
            <div v-if="keyValue['外风机'] === 1" class="status status-success">运行</div>
            <div v-else class="status status-stop">暂停</div>
          </div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">
            压缩机
          </div>
          <div class="row-item_col_2">
            <div v-if="keyValue['压缩机'] === 1" class="status status-success">运行</div>
            <div v-else class="status status-stop">暂停</div>
          </div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">
            电加热
          </div>
          <div class="row-item_col_2">
            <div v-if="keyValue['电加热'] === 1" class="status status-success">运行</div>
            <div v-else class="status status-stop">暂停</div>
          </div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">
            应急风机
          </div>
          <div class="row-item_col_2">
            <div class="status status-stop">暂停</div>
          </div>
        </div>
      </div>
    </article>
    <article class="flex-[1] module-item">
      <h3>柜体状态</h3>
      <div class="row-list">
        <div class="row-item border">
          <div class="row-item_col_1">
            温度
          </div>
          <div class="row-item_col_2">
            {{keyValue['温度']}}℃
          </div>
        </div>
        <div class="row-item border">
          <div class="row-item_col_1">
            湿度
          </div>
          <div class="row-item_col_2">
            {{keyValue['湿度']}}%
          </div>
        </div>
      </div>
      <h3>模式状态</h3>
      <div class="row-list">
        <div class="row-item border">
          <div class="row-item_col_1">
            模式状态
          </div>
          <div class="row-item_col_2">
            <div v-if="keyValue['待机'] === 0" class="status status-stop">待机</div>
            <div v-else class="status status-success">运行</div>
          </div>
        </div>
      </div>
    </article>
    <article class="flex-[2] module-item">
      <h3>遥控参数</h3>
      <div class="flex gap-[40px]">
        <div class="row-list flex-[1]">
          <div class="row-item border">
            <div class="row-item_col_1">
              监控开关机
            </div>
            <div class="row-item_col_2">
              <div v-if="keyValue['监控开关机'] === 1" class="status status-success">开机</div>
              <div v-else class="status status-stop">关机</div>
            </div>
          </div>
          <div class="row-item border">
            <div class="row-item_col_1">
              下发最高控制温度
            </div>
            <div class="row-item_col_2">
              {{keyValue['下发最高控制温度']}}℃
            </div>
          </div>
          <div class="row-item border">
            <div class="row-item_col_1">
              下发最低控制温度
            </div>
            <div class="row-item_col_2">
              {{keyValue['下发最低控制温度']}}℃
            </div>
          </div>
          <div class="row-item border">
            <div class="row-item_col_1">
              保留
            </div>
            <div class="row-item_col_2">
            </div>
          </div>
          <div class="row-item border">
            <div class="row-item_col_1">
              下发控制湿度
            </div>
            <div class="row-item_col_2">
              {{keyValue['下发控制湿度']}}%
            </div>
          </div>
        </div>
        <div class="row-list flex-[1]">
          <div class="row-item border">
            <div class="row-item_col_1">
              启动制冷
            </div>
            <div class="row-item_col_2">
              <div v-if="keyValue['启动制冷'] === 1" class="status status-success">开机</div>
              <div v-else class="status status-stop">关机</div>
            </div>
          </div>
          <div class="row-item border">
            <div class="row-item_col_1">
              启动送风
            </div>
            <div class="row-item_col_2">
              <div v-if="keyValue['启动送风'] === 1" class="status status-success">开机</div>
              <div v-else class="status status-stop">关机</div>
            </div>
          </div>
          <div class="row-item border">
            <div class="row-item_col_1">
              启动待机
            </div>
            <div class="row-item_col_2">
              <div v-if="keyValue['启动待机'] === 1" class="status status-success">开机</div>
              <div v-else class="status status-stop">关机</div>
            </div>
          </div>
          <div class="row-item border">
            <div class="row-item_col_1">
              启动加热
            </div>
            <div class="row-item_col_2">
              <div v-if="keyValue['启动加热'] === 1" class="status status-success">开机</div>
              <div v-else class="status status-stop">关机</div>
            </div>
          </div>
        </div>
      </div>

    </article>
  </section>
</template>
<style scoped lang="scss">
:deep {
  .el-select {
    --el-select-width: 180px;
  }

  .el-form-item {
    align-items: center;
  }
}
.el-table{
  :deep(.el-input){
    --el-input-bg-color: #000;
  }
}
a {
  color: #fff;
  text-decoration: none;
}

.module-item {

  h3 {
    margin: 0;
    background-color: #102e4e;
    display: inline-block;
    padding: 3px 100px 3px 8px;
    font-weight: bolder;
  }

}

.row-list {
  padding: 12px 0;
}

.row-item {
  background-color: #183b5f;
  display: flex;
  align-items: stretch;
  border: 2px solid #29616d;
  border-bottom: none;

  &.border {
    > div {
      border-right: 1px solid #29616d;

      &:last-child {
        border-right: none;
      }
    }
  }

  &_col_header {
    flex: 1;
    text-align: center;
  }

  &_col_1 {
    flex: 1.2;
    min-width: 60px;
  }

  &_col_2 {
    flex: 1;
    min-width: 60px;
  }

  &:last-child {
    border-bottom: 2px solid #29616d;
  }

  > div {
    width: 0;
    padding: 3px 8px;
  }
}


.status {
  &:before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #fff;
    margin-right: 8px;
    vertical-align: middle;
  }

  &.status-success:before {
    background-color: var(--el-color-success);
  }

  &.status-stop:before {
    background-color: var(--el-color-danger);
  }
}
</style>
