<script setup lang="ts">
import { propTypes } from '@/utils/propTypes'
import { ref, defineModel } from 'vue'
const loading = ref(false)
const model = defineModel()
interface ListItem {
  value: string
  label: string
}
const options = ref<ListItem[]>([{
  value: '1',
  label: '设备1'
}])
const getEquipment = async () => {

}
const props = defineProps({
  title: propTypes.string,
})
</script>

<template>
  <ElSelect
    remote
    :remote-method="getEquipment"
    filterable
    placeholder='请选择设备'
    :loading="loading"
    v-model="model"
  >
    <ElOption v-for="item in options" :label="item.label" :value="item.value" :key="item.value" />
  </ElSelect>
</template>

<style scoped lang="scss">

</style>
