<script setup lang="ts">

import {Filter} from "@element-plus/icons-vue";
import { ClickOutside as vClickOutside } from 'element-plus'

const domRef = ref();
const popoverRef = ref()
const { list, rowKey, options} = defineProps<{
  list: Record<string, any>;
  rowKey: string;
  options?: string[];
}>()
const modelValue = defineModel<any>();
defineOptions({
  name: 'FilterPopover'
})
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}

const filterList = computed(() => {
  const res = [];
  if (options){
    return options;
  }
  if (!list) {
    return res;
  }
  list.forEach(record => {
    if (record[rowKey] && res.every(k => k !== record[rowKey] )) {
      res.push(record[rowKey]);
    }
  })
  return res;
})
</script>

<template>
  <ElIcon ref="domRef" class="cursor-pointer" v-click-outside="onClickOutside">
    <Filter />
  </ElIcon>
  <ElPopover
    ref="popoverRef"
    virtual-triggering
    trigger="click"
    :virtual-ref="domRef"
  >
    <ElSelect
      clearable
      filterable
      allowCreate
      multiple
      v-model="modelValue"
      v-if="filterList.length > 6"
    >
      <ElOption v-for="item in filterList" :key="item" :label="item" :value="item" />
    </ElSelect>
    <div class="filter-wrapper" v-else-if="filterList.length">
      <div class="filter-group">
        <ElCheckboxGroup
          v-model="modelValue"

        >
          <ElCheckbox v-for="item in filterList" :key="item" :label="item" :value="item" />
        </ElCheckboxGroup>
      </div>
    </div>
    <div class="filter-wrapper" v-else>
      <div class="filter-group">
        <ElInput placeholder="请输入" v-model="modelValue" />
      </div>
    </div>
  </ElPopover>
</template>

<style scoped lang="scss">

</style>
