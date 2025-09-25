<script setup lang="ts">
import arrow1 from '@/views/screen/assets/real/arrow-1.png'
import arrow2 from '@/views/screen/assets/real/arrow-2.png'
import arrow3 from '@/views/screen/assets/real/arrow-3.png';

defineOptions({
  name: 'CardHeader',
})
const { title, hideAction } = defineProps<{
  title: string;
  size?: 'small' | 'default';
  hideAction?: true;
}>()
</script>

<template>
  <header class="flex justify-between items-center card-screen-header">
    <slot>
      <h3 class="text-18px mb-0 mt-0">{{title}}</h3>
    </slot>

    <div class="action" v-if="!hideAction">
      <img :src="arrow1" class="w-16px" alt="" />
      <img :src="arrow2" class="w-16px" alt="" />
      <img :src="arrow3" class="w-16px" alt="" />
    </div>
  </header>
</template>

<style scoped lang="scss">
.card-screen-header{
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px 0;
  margin-bottom: 12px;
  &:before{
    content: '';
    position: absolute;
    height: 2px;
    left: 0;
    width: 32px;
    bottom: -1px;
    background-color: #29F0F1;
  }
}
</style>
