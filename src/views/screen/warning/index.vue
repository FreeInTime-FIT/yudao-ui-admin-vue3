<script setup lang="ts">
import SelectEquipment from "@/views/screen/components/SelectEquipment.vue";
const queryParams = reactive<{
  startTime?: string;
  endTime?: string;
  module?: string;
}>({
  module: '',
  startTime: undefined,
  endTime: undefined,
})

</script>

<template>
  <ElForm
    ref="queryFormRef"
    :inline="true"
    :model="queryParams"
    class="-mb-15px form"
  >
    <ElFormItem prop="d" >
      <SelectEquipment />
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
  <ContentWrap>
    <ElTable v-loading="loading" :data="list">

    </ElTable>
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
