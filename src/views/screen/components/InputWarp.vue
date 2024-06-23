<script setup lang="ts">
  defineOptions({
    name: 'InputWarp'
  })
</script>

<template>
  <div class="warp">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
  .warp{
    position: relative;
    padding: 6px;
    border: 1px solid rgb(16 27 67);
    &:after,
    &:before{
      content: '';
      position: absolute;
      user-select: none;
      z-index: 3;
      width: 8px;
      top: -1px;
      bottom: -1px;
      border: 1px solid rgb(27 45 95);
    }
    &:before{
      left: -1px;
      border-right: none;
    }
    &:after{
      right: -1px;
      border-left: none;
    }
  }
</style>
