<script setup lang="tsx">
import { SuccessFilled, CircleCloseFilled} from "@element-plus/icons-vue";
import CardHeader from "@/views/screen/components/CardHeader.vue";
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
      list: [{id: 1, name: '光伏模型      ',  status : '经济模式', person: 'xxxx'},
        { id: 2, name: '储能模型', status : '经济模式', person: 'xxxx'},
        { id: 3, name: '负荷模型 ', status : '经济模式', person: 'xxxx'},
        {id: 11, name: '电网模型', status : '经济模式', person: 'xxxx'},
        { id: 21, name: '光伏模型1', status : '经济模式', person: 'xxxx'},
        { id: 31, name: '储能模型', status : '经济模式', person: 'xxxx'},
        {id: 111, name: '负荷模型', status : '经济模式', person: 'xxxx'},
        { id: 211, name: '电网模型', status : '经济模式'},
        { id: 311, time: '2024-05-05 09:09:09', level : 3},
        {id: 1111, time: '2024-05-05 09:09:09', level : 1},
        { id: 2111, time: '2024-05-05 09:09:09', level : 2},
        { id: 3111, time: '2024-05-05 09:09:09', level : 3}, ] as RecordItem[],
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
const handleClose = () => {

}
const handleOpen = () => {

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
        <ElSelect placeholder="名称" >
          <ElOption value="a">所有设备</ElOption>
        </ElSelect>
      </InputWarp>
    </ElFormItem>
    <ElFormItem prop="12" >
      <InputWarp>
        <ElSelect placeholder="运行状态" >
          <ElOption value="a">所有设备</ElOption>
        </ElSelect>
      </InputWarp>

    </ElFormItem>

    <ElFormItem>
      <ElButton type="primary">查询</ElButton>
    </ElFormItem>
  </ElForm>
  <ContentWrap
    title="模式设置列表"
  >
    <ElTable

      v-loading="tableObject.loading"
      :data="tableObject.tableList"
      stripe
    >
      <ElTableColumn width="80" label="序号" type="index" :index="index => index + 1" />
      <ElTableColumn prop="name" label="名称" />
      <ElTableColumn prop="status" label="运行状态"  />
      <ElTableColumn prop="3" label="控制" >
        <template #default="scope">
          <el-icon size="20" color="var(--el-color-success)" @click="handleOpen(scope.row)"><SuccessFilled /></el-icon>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="4" label="闭锁" >
        <template #default="scope">
          <el-icon size="20" color="var(--el-color-danger)" @click="handleClose(scope.row)"><CircleCloseFilled /></el-icon>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="person" label="操作人" />
      <ElTableColumn prop="7" label="用户编号" />
      <ElTableColumn prop="6" label="操作" >
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
