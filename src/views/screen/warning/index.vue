<script setup lang="tsx">
import SelectEquipment from "@/views/screen/components/SelectEquipment.vue";
import SelectDateRange from "@/views/screen/components/SelectDateRange.vue";
import InputWarp from "@/views/screen/components/InputWarp.vue";

import {useTable} from "@/hooks/web/useTable";
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
})
const {  tableObject, tableMethods } = useTable<RecordItem>({
  async getListApi(option: any) {
    console.log(option);
    return {
      list: [
        {id: 1, time: '2024-05-05 09:09:09', level : 1, status: 3, product: '垂直轴风机', message: '系统故障汇总', type: '故障码4'},
        { id: 2, time: '2024-05-05 09:09:09', level : 2, status: 2, product: '光伏逆变器 ', message: 'COM板汇总故障', type: '故障码4'},
        { id: 3, time: '2024-05-05 09:09:09', level : 3, product: '垂直轴风机', message: '正在过载告警', type: '警告'},
        { id: 2, time: '2024-05-05 09:09:09', level : 2, product: '光伏逆变器 ', message: ' 烟雾报警器', type: '消防   '},
      ] as RecordItem[],
      total: 20,
    };
  }, props: undefined, response: undefined,
  defaultParams: queryParams,
});
const { getList, setSearchParams } = tableMethods
onMounted(() => {
  getList()
})
const handleIgnore = (row) => {
  ElMessageBox.confirm('确认忽略当前警告么？', '提示',{

  })
}
const handleEdit = (row) => {
  ElMessageBox.confirm('确认处理当前警告么？', '提示',{

  })
}
const levelFormatter = (row, cellValue, index) => {
  const levels = {
    1: {
      color: 'var(--el-color-danger)',
      label: '一级警告',
    },
    2: {
      color: 'var(--el-color-warning)',
      label: '二级警告',
    },
    3: {
      color: 'var(--el-color-warning-light-7)',
      label: '三级警告',
    },
  }
  const type = levels[row.level] || {};
  console.log(row, cellValue);

  return (
    <div>
      <div class="dot" style={{backgroundColor: type.color}}></div>
      {type.label}
    </div>
  )
}
</script>

<template>
  <ElForm
    ref="queryFormRef"
    :inline="true"
    :model="queryParams"
    class="-mb-15px form"
  >
    <ElFormItem prop="d" >
      <InputWarp>
        <SelectEquipment v-model="queryParams.equipment" />
      </InputWarp>
    </ElFormItem>
    <ElFormItem prop="12" >
      <InputWarp>
        <ElSelect >
          <ElOption value="a">所有设备</ElOption>
        </ElSelect>
      </InputWarp>

    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary">查询</ElButton>
    </ElFormItem>
    <ElFormItem>
      <ElInput placeholder="请输入关键字" />
    </ElFormItem>
  </ElForm>
  <ContentWrap
    title="告警列表"
  >
    <ElTable

      v-loading="tableObject.loading"
      :data="tableObject.tableList"
      stripe
    >
      <ElTableColumn width="80" label="序号" type="index" :index="index => index + 1" />
      <ElTableColumn prop="time" label="告警时间" />
      <ElTableColumn prop="level" label="警告级别" :formatter="levelFormatter" />
      <ElTableColumn prop="product" label="所属设备" />
      <ElTableColumn prop="message" label="告警信息" />
      <ElTableColumn prop="type" label="告警类型" />
      <ElTableColumn prop="status" label="状态" >
        <template #default="scope">
          <ElSpace>
            <ElTag type="success" v-if="scope.row.status=== 3">已处理</ElTag>
            <ElTag type="danger" v-else-if="scope.row.status=== 2">未处理</ElTag>
            <ElTag type="info" v-else>已忽略</ElTag>
          </ElSpace>

        </template>
      </ElTableColumn>
      <ElTableColumn prop="oper" label="操作" fixed="right" width="100">
        <template #default="scope">
          <ElSpace>
<!--            <a @click="handleIgnore(scope.row)">忽略</a>-->
            <ElButton  @click="handleEdit(scope.row)">处理</ElButton>
          </ElSpace>

        </template>
      </ElTableColumn>
    </ElTable>
    <ElPagination
      :total="tableObject.total"
      v-model:current-page="tableObject.currentPage"
      v-model:page-size="tableObject.pageSize"
    />
  </ContentWrap>
</template>

<style scoped lang="scss">
  :deep{
    .el-select{
      --el-select-width: 180px;
    }
    .el-form-item{
      align-items: center;
    }
  }
  a{
    color: #fff;
    text-decoration: none;
  }
  :deep(.dot){
    display: inline-flex;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 8px;
    vertical-align: middle;
  }
</style>
