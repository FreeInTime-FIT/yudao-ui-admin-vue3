<script setup lang="tsx">
  import {getAccessToken} from "@/utils/auth";
  import {useWebSocket, useLocalStorage, useResizeObserver} from "@vueuse/core";
  import queryString from 'query-string';
  import dayjs from "dayjs";
  import * as echarts from 'echarts'
  import { TrendCharts, Hide } from '@element-plus/icons-vue'
  import FilterPopover from "@/views/screen/setting/components/FilterPopover.vue";
  import InputWarp from "@/views/screen/components/InputWarp.vue";
  import { ElNotification, TableV2FixedDir } from 'element-plus'
  import screenConfig from "@/views/screen/config/echart.json";
  const WRITE_KEY = 'device-write-addr';
  const READ_KEY = 'device-read-addr'
  const TOPIC_LIST_KEY = 'device-topic-list'
  const DEVICE_LIST_KEY = 'device-last-data';
  const chartDom = ref();
  let chart;
  const chartRef = ref();
  const selectedList = ref<string[]>([]);
  const historyList = ref([]);
  const isVisible = ref(false);

  echarts.registerTheme('screen', screenConfig);
  defineOptions({
    name: '字段维护',
  })
  const server = ref(queryString.stringifyUrl({
    url: (import.meta.env.VITE_BASE_URL + '/infra/ws').replace(/^http/, 'ws'),
    query: {
      token: getAccessToken(),
     }})
  ) // WebSocket 服务地址
  const resData = useLocalStorage('sc:screen-setting-field', {});
  const selectedTopic = useLocalStorage('sc:screen-setting-field-topic', {});
  const fieldValue = shallowRef({});
  const updateValue = shallowRef({})
  const topicValue = ref()
  const notifyRef = ref([]);
  const { status, data, send, close, open } = useWebSocket<Record<string, any>>(server.value, {
    autoReconnect: false,
    heartbeat: false,
    autoClose: false,
    immediate: false,
  })
  const sendData = (type, content) => {
    send(JSON.stringify({
      type,
      content: JSON.stringify(content),
    }));
  }

  const handleChange = (rowData, rowIndex, key, v) => {
    updateValue.value = {
      ...updateValue.value,
      [rowIndex]: {
        [key]: v,
      },
    }
  }
  const handleFilter = (key, v) => {
    console.log(key, v);

    fieldValue.value = {
      ...fieldValue.value,
      [key]: v,
    }
  }
  const keys = [
    {
      key: 'addr',
      editable: false,
    },
    {
      key: 'type',
      editable: false,
      options: 'BITS_ENUM16_INT16_UINT16_UINT32_STRING'.split('_'),
    },
    {
      key: 'access',
      editable: false,
      options: ['RO', 'WO', 'RW'],
    },
    {
      key: 'value',
      editable: false,
      isInput: true,
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
  const handleWrite = (rowData, rowIndex) => {
    sendData(WRITE_KEY, {
      ...rowData,
      ...(updateValue.value[rowIndex] || {}),
    });
  }
  useResizeObserver(chartDom.value, () => {
    if (chart) {
      chart.resize();
    }
  })
  const showList = computed(() => {
    if (!resData.value?.profits) {
      return []
    }
    if (!Object.keys(fieldValue.value)) {
      return resData.value?.profits
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
    return resData.value?.profits.filter(item => filterData(item))
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
            console.log(v);
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
    minWidth: 150,
    width: 150,
    percentage: item.percentage || 0.1,
    headerCellRenderer(props) {
      return (
        <div class="flex items-center justify-center">
          <span class="mr-2 text-xs">{props.column.title}</span>

          <FilterPopover
            key={item}
            options={item.options}
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
      const val = rowIndex in updateValue.value && item.key in updateValue.value[rowIndex] ? updateValue.value[rowIndex][item.key] : cellData;
      if (item.options) {
        return (
          <ElSelect
            modelValue={val}
            onChange={v => handleChange(rowData, rowIndex, item.key, v)}
            onInput={v => handleChange(rowData, rowIndex, item.key, v)}
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
          onChange={v => handleChange(rowData, rowIndex, item.key, v)}
          onInput={v => handleChange(rowData, rowIndex, item.key, v)}
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
          <ElButton>读</ElButton>
          <ElButton onClick={() => handleWrite(rowData, rowIndex)}>写</ElButton>
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
    return columns.value.map(item => {
      let columnWidth = item.width;
      return {
        ...item,
        width: item.percentage ? Math.max(item.minWidth, width * item.percentage): item.width
      }
    });
  }

  watchEffect(() => {
    if (!data.value) {
      return
    }

    if (data.value === 'pong' || data.value === '"pong"') {
      return;
    }
    try {
      const jsonMessage = JSON.parse(data.value)
      console.log(jsonMessage);
      if (jsonMessage.type === DEVICE_LIST_KEY) {
        resData.value = JSON.parse(jsonMessage.content);
        historyList.value = [...historyList.value, resData.value];
        // 大于1000就清除掉之前的数据
        if (historyList.value.length > 1000) {
          historyList.value.shift();
        }
        return;
      }
      if (jsonMessage.type === TOPIC_LIST_KEY) {
        topicValue.value = JSON.parse(jsonMessage.content);
        if (!selectedTopic.value) {
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
          })
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
          })
        )

        return;
      }
      if (jsonMessage.type === WRITE_KEY) {
        ElNotification({
          title: '操作成功',
          message: '成功',
          type: 'success',
        })
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
          return Number(curr.value);
        })]
      })
    }
    const series = unref(v[1]).map(key => ({
      name: key,
      type: 'line',
      showSymbol: true,
      smooth: false,
      encode: {
        x: 'updateTime',
        y: key,
        // tooltip: ['updateTime', key],
      },
    }))
    if (chart) {
      console.log(v, oldValue);

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
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
      },
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
    open();

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

    <div>
      <ElButton v-if="!!selectedList.length" @click="handleVisible">
        <el-icon>
          <TrendCharts v-if="!isVisible" />
          <Hide v-else />
        </el-icon>
        <span>实时数据</span>
      </ElButton>
    </div>

  </aside>
  <div
    class="charts"
    ref="chartDom"
    v-if="isVisible"
  >

  </div>
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
  .charts{
    height: 300px;
    margin: 0 16px 0 32px;
  }
</style>
