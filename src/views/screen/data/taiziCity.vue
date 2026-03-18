<script setup lang="ts">
import taiziCityImage from '@/views/screen/assets/taizi_city/photovoltaic-green-power-mode.jpg'

defineOptions({ name: 'TaiziCityView' })
</script>

<template>
  <section class="taizi-city" :style="{ height: 'calc(100vh - 80px)' }">
    <div class="taizi-city__content">
      <img :src="taiziCityImage" class="taizi-city__image" alt="光伏绿电模式示意图" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.taizi-city {
  width: 100%;
  background-color: #fff;
  overflow: hidden;
}

.taizi-city__content {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
}

.taizi-city__image {
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
