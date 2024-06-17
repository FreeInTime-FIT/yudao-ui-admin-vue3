<script setup lang="ts">
import {computed} from "vue";
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()
const userName = computed(() => userStore.user.nickname ?? 'Admin')
  const sex = '先生'
</script>

<template>
  <header class="flex flex-justify-between gap-10px pa-10px color-[var(--screen-content-text-color)]">
    <div>尊敬的{{userName}}{{sex}}，您好</div>
    <div>数据更新时间：12120</div>
    <div><ElButton type="primary">数据维护</ElButton><ElButton type="primary">退出登录</ElButton></div>
  </header>
</template>

<style scoped lang="scss">

</style>
