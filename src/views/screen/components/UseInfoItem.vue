<script setup lang="ts">
  defineOptions({
    name: 'UserInfoItem',
  })
  const valRef = ref()
  const { title, successValue, value, api, params } = defineProps<{
    title: string;
    successValue?: string;
    value?: string;
    api?: (params) => Promise<any>;
    params?: Record<string, any>;
  }>()
  onMounted(() => {
   if (!api) {
     return
   }
   api(params).then(res => {
     valRef.value = res.data;
   })
  })
  const showValue = computed(() => {
    if (valRef.value !== undefined) {
      return valRef.value
    }
    return value
  })
</script>

<template>
  <div class="use-info_item">
    <div class="use-info_name">{{title}}</div>
    <div class="use-info_value">
      <div class="color-[var(--el-color-success)]">{{ successValue }}</div>
      <div class="color-[var(--el-color-primary)]">{{ showValue }}</div>
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
