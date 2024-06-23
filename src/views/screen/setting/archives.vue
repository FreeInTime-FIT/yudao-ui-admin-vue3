<script setup lang="tsx">
import SelectEquipment from "@/views/screen/components/SelectEquipment.vue";
import SelectDateRange from "@/views/screen/components/SelectDateRange.vue";
import InputWarp from "@/views/screen/components/InputWarp.vue";

import {useTable} from "@/hooks/web/useTable";
import {Select} from "@element-plus/icons-vue";
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
      list: [{id: 1, time: '2024-05-05 09:09:09', level : 1}, { id: 2, time: '2024-05-05 09:09:09', level : 2}, { id: 3, time: '2024-05-05 09:09:09', level : 3}] as RecordItem[],
      total: 20,
    };
  }, props: undefined, response: undefined,
  defaultParams: queryParams,
});
const { getList, setSearchParams } = tableMethods
onMounted(() => {
  getList()
})
const handleEdit = (row) => {
  console.log(row);
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
        <ElSelect placeholder="地区" v-model="queryParams.equipment" >
          <ElOption value="浙江">浙江</ElOption>
        </ElSelect>
      </InputWarp>
    </ElFormItem>
    <ElFormItem prop="12" >
      <InputWarp>
        <ElSelect placeholder="操作人" >
          <ElOption value="a">所有设备</ElOption>
        </ElSelect>
      </InputWarp>

    </ElFormItem>
    <SelectDateRange
      v-model:end="queryParams.endTime"
      v-model:start="queryParams.startTime"
    />
    <ElFormItem>
      <ElButton type="primary">查询</ElButton>
      <ElButton type="primary">上传档案</ElButton>
    </ElFormItem>
    <ElFormItem>
      <ElInput placeholder="请输入关键字" />
    </ElFormItem>
  </ElForm>
  <ContentWrap
    title="档案配置列表"
  >
    <ElTable

      v-loading="tableObject.loading"
      :data="tableObject.tableList"
      stripe
    >
      <ElTableColumn width="80" label="序号" type="index" :index="index => index + 1" />
      <ElTableColumn prop="time" label="编号" />
      <ElTableColumn prop="level" label="型号" />
      <ElTableColumn prop="3" label="所属项目" />
      <ElTableColumn prop="4" label="业主" />
      <ElTableColumn prop="5" label="负责人" />
      <ElTableColumn prop="6" label="操作" fixed="right" width="80" >
        <template #default="scope">
          <a @click="handleEdit(scope.row)">操作</a>
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
