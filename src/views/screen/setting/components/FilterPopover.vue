<script setup lang="ts">

import {Filter} from "@element-plus/icons-vue";
import { ClickOutside as vClickOutside } from 'element-plus'

const domRef = ref();
const popoverRef = ref()
const { list, rowKey, options, isInput} = defineProps<{
  list: Record<string, any>;
  rowKey: string;
  options?: string[];
  isInput?: boolean;
}>()
const modelValue = defineModel<any>();
defineOptions({
  name: 'FilterPopover'
})
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}

const filterList = computed<string[]>(() => {
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
const querySearch = (query, cb) => {
  console.log(query, cb, filterList);

  if (!query) {
    cb( unref(filterList).map(i => ({
      value: i,
    })))
    return
  }
   cb(unref(filterList).map(i => ({
    value: i,
  })).filter(i => i.value && i.value.indexOf(query) !== -1));
}
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
      v-if="!isInput && filterList.length > 6"
    >
      <ElOption v-for="item in filterList" :key="item" :label="item" :value="item" />
    </ElSelect>
    <div class="filter-wrapper" v-else-if="!isInput && filterList.length">
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
        <ElInput
          placeholder="请输入"
          v-model="modelValue"
        />
      </div>
    </div>
  </ElPopover>
</template>

<style scoped lang="scss">

</style>
