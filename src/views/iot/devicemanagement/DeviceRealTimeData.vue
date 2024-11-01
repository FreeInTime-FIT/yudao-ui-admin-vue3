<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="传感器" prop="index">
        <el-select
          v-model="queryParams.index"
          placeholder="请选择传感器编号"
          size="large"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="上报时间" prop="createTime">
        <el-date-picker
          v-model="queryParams.ts"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-340px"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery">
          <Icon icon="ep:search" class="mr-5px"/>
          搜索
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>
  <ContentWrap>
    <el-popover placement="bottom" title="筛选列" trigger="click" width="40">
      <el-scrollbar>
        <el-checkbox v-model="selectAll" @change="handleSelectAll">全选</el-checkbox>
        <el-input v-model="searchInput" placeholder="请输入搜索内容" clearable @clear="clearSearch"/>
        <el-checkbox-group v-model="checkedColumns"  class="h-300px">
          <el-checkbox
            v-for="item in columns.filter(it=> it.showName.includes(searchInput.toLowerCase()))"
            :key="item.column_name"
            :label="item.showName"
            @change="(value) => handleColumnChange(item,value)"
            :value="item"/>
        </el-checkbox-group>
      </el-scrollbar>
      <template #reference>
        <el-button style="float: right;" type="primary">列筛选</el-button>
      </template>
    </el-popover>
    <el-table
      ref="elTable" v-loading="loading" :data="list" :stripe="true"
      :show-overflow-tooltip="true">
      <el-table-column label="时间" prop="ts" :formatter="dateFormatter" width="200"/>
      <el-table-column
        v-for="c in columns.filter(it=>!it.hidden)"
        :key="c.column_name"
        :label="c.showName"
        align="center"
        :prop="c.column_name"/>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </ContentWrap>
</template>
<script setup lang="ts">
import {DeviceManagementVO} from "@/api/iot/devicemanagement";
import {IOTRealTimeAPI} from "@/api/iot/real_time";
import {dateFormatter} from "@/utils/formatTime";

const route = useRoute()
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  index: 1,
  deviceName: route.query.deviceName as string,
  productKey: route.query.productKey as string,
  ts: null
})
const selectAll = ref(true)
const loading = ref(true) // 列表的加载中
const list = ref<DeviceManagementVO[]>([]) // 列表的数据
const columns = ref([])
const total = ref(0) // 列表的总页数
const checkedColumns = ref([])
const options = [
  {
    value: 0,
    label: '0#',
  },
  {
    value: 1,
    label: '1#',
  },
  {
    value: 2,
    label: '2#',
  },
  {
    value: 3,
    label: '3#',
  },
  {
    value: 4,
    label: '4#',
  },
  {
    value: 11,
    label: '11#',
  },
]
const initColumn = async () => {
  selectAll.value = true
  columns.value = await IOTRealTimeAPI.getTableColumns(queryParams)
  checkedColumns.value = columns.value

}
const getData = async () => {
  loading.value = true
  try {
    const data = await IOTRealTimeAPI.getTableData(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}
const handleColumnChange = (item,value)=> {
  columns.value = columns.value.map(it => {
    if (it.column_name === item.column_name) {
      it.hidden = !value
    }
    return it
  })
}
onMounted(() => {
  initColumn()
  getData()
})
const handleQuery = () => {
  queryParams.pageNo = 1
  getData()
}
watch(() => [
  queryParams.pageNo, queryParams.pageSize
], () => {
  getData()
})
watch(() => [
  queryParams.index
], () => {
  initColumn()
  getData()
})
const searchInput = ref<string>('');
const clearSearch=() =>  {
  searchInput.value = '';
}
const handleSelectAll = (value) => {
  if (value) {
    checkedColumns.value = columns.value
  }else {
    checkedColumns.value = []
  }
  columns.value = columns.value.map(it => {
    it.hidden = !checkedColumns.value.includes(it)
    return it
  })
}

</script>
