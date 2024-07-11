<script setup lang="tsx">
  import {getAccessToken} from "@/utils/auth";
  import {useWebSocket, useLocalStorage, useResizeObserver} from "@vueuse/core";
  import queryString from 'query-string';
  import dayjs from "dayjs";
  import type  {Ref} from "vue";
  import * as echarts from 'echarts'
  import { TrendCharts, Hide } from '@element-plus/icons-vue'
  import FilterPopover from "@/views/screen/setting/components/FilterPopover.vue";
  import InputWarp from "@/views/screen/components/InputWarp.vue";
  import { ElNotification, TableV2FixedDir, ElMessage, notificationProps } from 'element-plus'
  import screenConfig from "@/views/screen/config/echart.json";
  const WRITE_KEY = 'device-write-addr';
  const READ_KEY = 'device-read-addr'
  const TOPIC_LIST_KEY = 'device-topic-list'
  const DEVICE_LIST_KEY = 'device-last-data';
  const PUSH_KEY = 'device-push-any';
  const confirmVisible = ref(false);
  const chartDom = ref();
  let chart;
  const chartRef = ref();
  const selectedList = ref<string[]>([]);
  const historyList = ref([]);
  const isVisible = ref(false);

  const dealData = (prev, nowData) => {
    return {
      ...nowData,
      profits: [
        ...nowData.profits,
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
  echarts.registerTheme('screen', screenConfig);
  defineOptions({
    name: '字段维护',
  })
  const server = queryString.stringifyUrl({
    url: (import.meta.env.VITE_BASE_URL + '/infra/ws').replace(/^http/, 'ws'),
    query: {
      token: getAccessToken(),
     }});
   // WebSocket 服务地址
  const resData: Ref<any> = useLocalStorage<any>('sc:screen-setting-field', {}) as Ref<any>;
  const selectedTopic: Ref<any> = useLocalStorage<any>('sc:screen-setting-field-topic', {}) as Ref<any>;
  const fieldValue = shallowRef({});
  const updateValue = shallowRef({})
  const moduleContent = ref();
  const topicValue = ref()
  const notifyRef = ref([]);
  const { status, data, send, close, open } = useWebSocket<string>(server as any, {
    autoReconnect: false,
    heartbeat: !import.meta.env.DEV,
    autoClose: false,
    immediate: false,
  })
  const sendData = (type, content) => {
    send(JSON.stringify({
      type,
      content: JSON.stringify(content),
    }));
  }

  const handleChange = (rowData, key, v) => {
    updateValue.value = {
      ...updateValue.value,
      [rowData.addr]: {
        [key]: v,
      },
    }
  }
  const handleFilter = (key, v) => {

    fieldValue.value = {
      ...fieldValue.value,
      [key]: v,
    }
  }
  type KeyItem = {
    key: string;
    editable?: boolean;
    isInput?: boolean;
    width?: number;
    minWidth?: number;
    options?: string[];
    percentage?: number;
  }
  const keys: KeyItem[] = [
    {
      key: 'addr',
      editable: false,
      isInput: true,
    },
    {
      key: 'type',
      editable: false,
      width: 80,
      minWidth: 80,
      options: 'BITS_ENUM16_INT16_UINT16_UINT32_STRING'.split('_'),
    },
    {
      key: 'access',
      editable: false,
      width: 80,
      minWidth: 80,
      options: ['RO', 'WO', 'RW'],
    },
    {
      key: 'value',
      editable: true,
      isInput: true,
      percentage: 0.15,
    },
    {
      key: 'set',
      editable: true,
      isInput: true,
    },
    {
      key: 'des',
      editable: false,
      isInput: true,
      percentage: 0.30,
    },
  ]
  const handleWrite = (rowData) => {
    sendData(WRITE_KEY, {
      ...rowData,
      ...(updateValue.value[rowData.addr] || {}),
    });
  }
  const handleRead = (rowData) => {
    sendData(READ_KEY, {
      ...rowData,
      ...(updateValue.value[rowData.addr] || {}),
    });
    updateValue.value[rowData.addr] = {};

  }
  useResizeObserver(chartDom.value, () => {
    if (chart) {
      chart.resize();
    }
  })
  const showList = computed(() => {
    if (!resData.value.profits) {
      return []
    }
    if (!Object.keys(fieldValue.value)) {
      return resData.value.profits;
    }
    const fieldKeyList = Object.keys(fieldValue.value);
    const filterData = (item) => {
      return fieldKeyList.every(key => {
        const fieldV = fieldValue.value[key];
        if (!fieldV) {
          return true;
        }
        if (Array.isArray(fieldV)) {
          return !fieldV.length || fieldV.some(i => i === item[key]);
        }
        if (typeof fieldV === 'string') {
          return item[key] && item[key].indexOf(fieldV) !== -1;
        }
        return false;
      });
    }
    return resData.value.profits.filter(item => filterData(item))
  })
  const columns = ref([{
    key: 'selection',
    dataKey: 'selection',
    width: 60,
    minWidth: 60,
    align: 'center',
    fixed: TableV2FixedDir.LEFT,
    cellRenderer({ rowData, rowIndex }) {
      const isChecked = unref(selectedList).some(i => i === rowData.addr);
      return (
        <ElCheckbox
          modelValue={isChecked}
          onChange={v => {
            if (v) {
              selectedList.value = [...selectedList.value, rowData.addr];
            }else {
              selectedList.value = selectedList.value.filter(i => i !== rowData.addr);
            }
          }}
        />
      );
    },
    headerCellRenderer(props) {
      let isChecked = false;
      let unChecked = false;
      unref(showList).forEach(i => {
        if (unref(selectedList).some(k => i.addr === k)) {
          isChecked = true;
        } else {
          unChecked = true;
        }
      });
      return (
        <ElCheckbox
          indeterminate={isChecked && unChecked}
          modelValue={isChecked && !unChecked}
          onChange={v => {
            if (v) {
              if(unref(showList).length > 50) {
                ElMessage({
                  message: '当前行数太多，请筛选后在选择',
                  type: 'warning',
                })
                return true;
              }
              selectedList.value = unref(showList).map(i => i.addr);
            } else {
              selectedList.value = [];

            }
          }}
        />
      );
    },
  },{
    key: 'index',
    dataKey: 'index',
    title: '序号',
    width: 80,
    minWidth: 80,
    fixed: TableV2FixedDir.LEFT,
    cellRenderer({ rowData, rowIndex }) {
      return rowIndex + 1;
    },
  },...keys.map((item, index) => ({
    key: item.key,
    dataKey: item.key,
    title: item.key,
    minWidth: item.minWidth ||150,
    width: item.width || 150,
    percentage: item.percentage || 0.1,
    headerCellRenderer(props) {
      return (
        <div class="flex items-center justify-center">
          <span class="mr-2 text-xs">{props.column.title}</span>

          <FilterPopover
            key={item}
            options={item.options}
            isInput={item.isInput}
            list={resData.value.profits || []}
            modelValue={fieldValue.value[item.key]}
            {...{['onUpdate:modelValue']: (v) => handleFilter(item.key, v)}}
            rowKey={item.key}
          />
        </div>
      )
    },
    cellRenderer: ({cellData, rowIndex, rowData}) => {
      if (!item.editable) {
        return cellData;
      }
      const val = rowData.addr in updateValue.value && item.key in updateValue.value[rowData.addr] ? updateValue.value[rowData.addr][item.key] : cellData;
      if (item.options) {
        return (
          <ElSelect
            modelValue={val}
            onChange={v => handleChange(rowData, item.key, v)}
            onInput={v => handleChange(rowData, item.key, v)}
          >
            {item.options.map(option => (
              <ElOption
                key={option}
                value={option}
                label={option}
              />
            ))}
          </ElSelect>
        )
      }
      return (
        <ElInput
          modelValue={val}
          onChange={v => handleChange(rowData, item.key, v)}
          onInput={v => handleChange(rowData, item.key, v)}
        />
      )
    },
  })), {
    key: 'id',
    dataKey: 'id',
    title: '操作',
    width: 180,
    minWidth: 180,
    fixed: TableV2FixedDir.RIGHT,
    cellRenderer({rowData, rowIndex}) {
      const isChecked = unref(selectedList).some(i => i === rowData.addr);
      return (
        <ElSpace>
          <ElButton onClick={() => handleRead(rowData)}>读</ElButton>
          <ElButton onClick={() => handleWrite(rowData)}>写</ElButton>
          <ElButton onClick={() => {
            if (!isChecked) {
              selectedList.value = [...selectedList.value, rowData.addr];
            }else {
              selectedList.value = selectedList.value.filter(i => i !== rowData.addr);
            }
            isVisible.value = !!selectedList.value.length;
          }}>
            <el-icon>{isChecked && isVisible.value ? (
              <Hide/>
            ) : (<TrendCharts/>)}</el-icon>
          </ElButton>
        </ElSpace>
      )
    },
  }]);

  const getColumns = (width) => {
    return columns.value.map((item: Record<string, any>) => {
      let columnWidth = item.width;
      return {
        ...item,
        width: item.percentage ? Math.max(item.minWidth, width * item.percentage): item.width
      }
    });
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
      if (jsonMessage.type === DEVICE_LIST_KEY) {
        resData.value = dealData(resData.value || {}, JSON.parse(jsonMessage.content));
        historyList.value = [...historyList.value, JSON.parse(jsonMessage.content)];
        console.log(resData.value);
        // 大于1000就清除掉之前的数据
        if (historyList.value.length > 1000) {
          historyList.value.shift();
        }
        return;
      }
      if (jsonMessage.type === TOPIC_LIST_KEY) {
        topicValue.value = JSON.parse(jsonMessage.content);
        if (!unref(selectedTopic)) {
          selectedTopic.value = topicValue.value[0];
        }
        console.log(topicValue.value);
        return;
      }
      if (jsonMessage.type === 'error') {
        if (notifyRef.value && notifyRef.value.length > 3) {
          notifyRef.value.shift().close();
        }
        const msg = JSON.parse(jsonMessage.content);
        notifyRef.value.push(
          ElNotification({
            title: msg.code,
            message: msg.msg,
            type: 'error',
          } as notificationProps)
        )

        return;
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
      if (jsonMessage.type === WRITE_KEY) {
        ElNotification({
          title: '操作成功',
          message: '成功',
          type: 'success',
        }as notificationProps)
      }

    }catch (e) {
      console.warn(e);
    }

  })
  watch(selectedTopic, (v) => {
    if (!v) {
      return
    }
    historyList.value = [];
    selectedList.value = [];
    sendData(DEVICE_LIST_KEY, unref(selectedTopic));
  });

  watch(selectedList, (v) => {
    if (v.length) {
      return
    }
    isVisible.value = false;
  })
  watch([historyList, selectedList, isVisible], (v, oldValue) => {
    if (!unref(v[2])) {
      chart = null;
      return;
    }
    const dataset = {
      dimensions: [
        'updateTime',
        ...unref(v[1]),
      ],
      source: unref(v[0]).map(item => {
        return [dayjs(item.updateTime).toDate(), ...unref(v[1]).map(k => {
          const curr = item.profits?.find(i => i.addr === k);
          if (!curr) {
            return undefined;
          }
          if (curr.type === 'STRING' || curr.type === 'BITS' || curr.type === 'ENUM16') {
            return curr.value;
          }
          return Number(curr.value);
        })]
      })
    }
    const series = unref(v[1]).map(key => ({
      name: key,
      type: 'line',
      showSymbol: false,
      smooth: true,
      connectNulls: true,
      encode: {
        x: 'updateTime',
        y: key,
        // tooltip: ['updateTime', key],
      },
    }))
    if (chart) {

      if (v[0] !== oldValue[0]) {
        chart.setOption({
          dataset,
        });
        return;
      }

      chart.setOption({
        dataset,
        series,
      });
      return;
    }

    chart = echarts.init(chartDom.value, 'screen');
    chart.setOption({
      dataset,
      title: {
        text: '实时数据',
        top: 10,
        left: 10,
      },
      grid: {
        right: 16,
        top: 50,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false,
          label: {
            show: true,
            formatter(params) {
              return dayjs(params.value).format('HH:mm:ss SSS')
            },
          },
        }
      },

      xAxis: {
        type: 'time',
      },
      yAxis: [{
        type: 'value',
        boundaryGap: [0, '100%'],
      }, {
        type: 'category',
      }],
      legend: {
        bottom: 0,
        left: 'center',
      },
      series,
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: 0,
          minSpan: 2
        },
        {
          type: 'slider',
          xAxisIndex: 0,
          minSpan: 2,
          bottom: 50,
          height: 12,
        }
      ],
    });
  }, {
    flush: 'post',
  })
  onMounted(() => {

    open() ;

    sendData(TOPIC_LIST_KEY, {});
    if (unref(selectedTopic).topicId) {
      sendData(DEVICE_LIST_KEY, unref(selectedTopic));
    }
  })

  onUnmounted(() => {
    console.log('close');
    close();
  })
  function handleVisible() {
    isVisible.value = !isVisible.value;

  }
  function handleReset() {
    updateValue.value = {};
  }
  function handleRefresh() {
    sendData(DEVICE_LIST_KEY, unref(selectedTopic));
  }
  function handlePush(content) {
    confirmVisible.value = true;
    moduleContent.value = content;
  }
  function handlePushConfirm() {
    confirmVisible.value = false;
    sendData(PUSH_KEY, {
      content: moduleContent.value,
    });
  }
</script>

<template>
  <header class="header">
    <h2>数据运维</h2>
    <span>数据更新时间：{{dayjs(resData.updateTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
  </header>
  <aside class="aside">
    <ElFormItem label="订阅主题" class="flex-items-center mb-[0px]">
      <InputWarp>
        <ElSelect
          v-model="selectedTopic"
          placeholder="请选择主题"
          class="w-[300px]"
          filterable
          value-key="productTopicName"
        >
          <ElOption
            v-for="item in topicValue"
            :key="item.productTopicName"
            :value="item"
            :label="item.productTopicName"
          />
        </ElSelect>
      </InputWarp>
    </ElFormItem>

    <ElSpace>
      <ElButton v-if="!!selectedList.length" @click="handleVisible">
        <el-icon>
          <TrendCharts v-if="!isVisible" />
          <Hide v-else />
        </el-icon>
        <span>实时数据</span>
      </ElButton>
      <ElButton @click="handleReset">
        重置
      </ElButton>
      <ElButton v-if="selectedTopic.topicId" @click="handleRefresh">
        刷新列表
      </ElButton>
      <ElButton @click="handlePush('reboot')">
        重启设备
      </ElButton>
      <ElButton @click="handlePush('quit')">
        退出设备
      </ElButton>
    </ElSpace>

  </aside>
  <div
    class="charts"
    ref="chartDom"
    v-if="isVisible"
  >

  </div>
  <el-dialog
    v-model="confirmVisible"
    title="推送设备"
    width="500"

  >
    <div class="mb-[5px]">将会推送以下内容至设备</div>
    <el-input class="input" autofocus v-model="moduleContent" autocomplete="off" />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="confirmVisible = false">取消</el-button>
        <el-button type="primary" @click="handlePushConfirm">
          确认推送
        </el-button>
      </div>
    </template>
  </el-dialog>
  <article class="flex-[1] m-[0px_16px_24px_32px] h-[0]">
    <ElAutoResizer>
      <template #default="{ height, width }">
        <el-table-v2
          :columns="getColumns(width, height)"
          fixed
          :data="showList"
          :width="width || 800"
          :height="height || 800"
        />
      </template>
    </ElAutoResizer>
  </article>

</template>

<style scoped lang="scss">
  .el-table-v2{
    --el-fill-color-blank: #000;
    :deep(.el-input){
      --el-input-bg-color: #000;
    }
  }
  .el-select{
    width: 300px;
  }
  .header{
    display: flex;
    justify-content: space-between;
    margin: 24px 16px 0;
    h2{
      margin: 0;
      font-size: 24px;
    }
  }
  .aside{
    display: flex;
    padding: 12px 16px 0;
    align-items: center;
    justify-content: space-between;
  }
  .input{
    --el-input-bg-color: #000;
  }
  .charts{
    height: 300px;
    margin: 0 16px 0 32px;
  }
</style>
