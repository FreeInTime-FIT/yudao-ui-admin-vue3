<script setup lang="ts">
import SelectEquipment from "@/views/screen/components/SelectEquipment.vue";
import SelectDateRange from "@/views/screen/components/SelectDateRange.vue";
import {useTable} from "@/hooks/web/useTable";
type QueryParams = {
  startTime?: string;
  endTime?: string;
  module?: string;
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
const {  tableObject, tableMethods } = useTable<QueryParams>({
  getListApi(option: any): Promise<QueryParams> {
    return Promise.resolve(undefined);
  }, props: undefined, response: undefined,
  defaultParams: queryParams,
});

</script>

<template>
  <ElForm
    ref="queryFormRef"
    :inline="true"
    :model="queryParams"
    class="-mb-15px form"
  >
    <ElFormItem prop="d" >

      <SelectEquipment v-model="queryParams.equipment" />
    </ElFormItem>
    <ElFormItem prop="12" >
      <ElSelect >
        <ElOption value="a">所有设备</ElOption>
      </ElSelect>
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
    title="告警列表"
  >
    <ElTable

      v-loading="tableObject.loading"
      :data="tableObject.tableList"
    >
      <ElTableColumn label="序号" type="index" :index="index => index + 1" />
      <ElTableColumn prop="1" label="告警时间" />
      <ElTableColumn prop="2" label="警告级别" />
      <ElTableColumn prop="3" label="所属设备" />
      <ElTableColumn prop="4" label="告警信息" />
      <ElTableColumn prop="5" label="告警类型" />
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
  }
  .form{
  }
</style>
