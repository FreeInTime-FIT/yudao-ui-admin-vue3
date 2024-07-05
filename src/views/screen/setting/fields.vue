<script setup lang="tsx">
  import {getAccessToken} from "@/utils/auth";
  import {useWebSocket, useLocalStorage} from "@vueuse/core";
  import queryString from 'query-string';
  import dayjs from "dayjs";
  import FilterPopover from "@/views/screen/setting/components/FilterPopover.vue";
  import InputWarp from "@/views/screen/components/InputWarp.vue";
  import { ElNotification } from 'element-plus'
  const WRITE_KEY = 'device-write-addr';
  const READ_KEY = 'device-read-addr'
  const TOPIC_LIST_KEY = 'device-topic-list'
  const DEVICE_LIST_KEY = 'device-last-data';

  defineOptions({
    name: '字段维护',
  })
  const server = ref(queryString.stringifyUrl({
    url: (import.meta.env.VITE_BASE_URL + '/infra/ws').replace(/^http/, 'ws'),
    query: {
      token: getAccessToken(),
      productKey: 'UEJQdCOqf2o',
      'deviceName': 'Inverter_01',
    }})
  ) // WebSocket 服务地址
  const resData = useLocalStorage('sc:screen-setting-field', {});
  const selectedTopic = useLocalStorage('sc:screen-setting-field-topic', {});
  const fieldValue = shallowRef({});
  const updateValue = shallowRef({})
  const topicValue = ref()
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
      editable: true,
      options: 'BITS_ENUM16_INT16_UINT16_UINT32_STRING'.split('_'),
    },
    {
      key: 'access',
      editable: true,
      options: ['RO', 'WO', 'RW'],
    },
    {
      key: 'value',
      editable: true,
      isInput: true,
    },
    {
      key: 'set',
      editable: true,
      isInput: true,
    },
    {
      key: 'desc',
      editable: true,
      isInput: true,
    },
  ]
  const handleWrite = (rowData, rowIndex) => {
    sendData(WRITE_KEY, {
      ...rowData,
      ...(updateValue.value[rowIndex] || {}),
    });
  }
  const columns = ref([{
    key: 'index',
    dataKey: 'index',
    title: '序号',
    width: 80,
    fixed: true,
    cellRenderer({ rowData, rowIndex }) {
      return rowIndex + 1;
    },
  },...keys.map((item, index) => ({
    key: item.key,
    dataKey: item.key,
    title: item.key,
    minWidth: 150,
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
    width: 150,
    fixed: 'right',
    cellRenderer({rowData, rowIndex}) {
      return (
        <ElSpace>
          <ElButton>读</ElButton>
          <ElButton onClick={() => handleWrite(rowData, rowIndex)}>写</ElButton>
        </ElSpace>
      )
    },
  }]);



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
        const msg = JSON.parse(jsonMessage.content);
        ElNotification({
          title: msg.code,
          message: msg.msg,
          type: 'error',
        })
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
    console.log(v);
    sendData(DEVICE_LIST_KEY, {
      productKey: unref(selectedTopic).productKey,
      deviceName: unref(selectedTopic).deviceName,
    });
  });
  onMounted(() => {
    open();

    sendData(TOPIC_LIST_KEY, {});
  })

  onUnmounted(() => {
    console.log('close');
    close();
  })
</script>

<template>
  <header class="header">
    <h2>数据运维</h2>
    <span>数据更新时间：{{dayjs(resData.updateTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
  </header>
  <aside class="aside">
    <ElFormItem label="订阅主题" class="flex-items-center">
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


  </aside>
  <article class="flex-[1] m-[12px_16px_24px] h-[0]">
    <ElAutoResizer>
      <template #default="{ height, width }">
        <el-table-v2
          :columns="columns"
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
    padding: 12px 16px;
  }
</style>
