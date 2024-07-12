<script setup lang="ts">
  defineOptions({
    name: 'UserInfoItem',
  })
  const valRef = ref()
  const props = defineProps<{
    title?: string;
    successValue?: string;
    value?: string | number;
    unit?: string;
    api?: (params) => Promise<any>;
    params?: Record<string, any>;
    emptyText?: string;
  }>()
  onMounted(() => {
   if (!props.api) {
     return
   }
    props.api(props.params).then(res => {
     valRef.value = res.data;
   })
  })
  const showValue = computed(() => {
    if (props.value || props.value === 0) {
      return props.value;
    }
    if (unref(valRef) || unref(valRef) === 0) {
      return unref(valRef)
    }
    return props.emptyText;
  })
</script>

<template>
  <div class="use-info_item">
    <div class="use-info_name">{{title}}</div>
    <div class="use-info_value">
      <div class="color-[var(--el-color-success)]">{{ successValue }}</div>
      <div class="color-[var(--el-color-primary)]">{{ showValue }}{{showValue !== emptyText ? unit : ''}}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.use-info_item{
  box-sizing: border-box;
  padding: 3px 12px;
  width: 40%;
  text-align: center;
}
.use-info_value{
  display: flex;
  flex-direction: column-reverse;
  background: url("@/views/screen/assets/item-bg.png") bottom center no-repeat;
  background-size: 100% auto;
  //width: 280px;
  min-height: 40px;
  padding-bottom: 20px;
}

</style>
