<script setup lang="ts">
import * as echarts from "echarts";

import SelectDateRange from "@/views/screen/components/SelectDateRange.vue";
import theme from '@/views/screen/config/echart.json'

echarts.registerTheme('screen', theme);
const queryParams = reactive({
  endTime: '',
  startTime: '',
})

</script>

<template>
  <ElForm
    ref="queryFormRef"
    :inline="true"
    :model="queryParams"
    class="-mb-15px form"
  >
    <SelectDateRange
      v-model:end="queryParams.endTime"
      v-model:start="queryParams.startTime"
    />
    <ElFormItem>
      <ElButton type="primary">查询</ElButton>
      <ElButton type="primary">上传档案</ElButton>
    </ElFormItem>
  </ElForm>

  <section>

  </section>
</template>

<style scoped lang="scss">

</style>
