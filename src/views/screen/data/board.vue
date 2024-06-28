<template>
  <IFrame src="/go-view/#/chart/preview/1" />
</template>
<script lang="ts" setup>
defineOptions({ name: '数据中心' })

</script>

<style lang="scss">
.board-bg{
  width: 100%;
  margin-bottom: 12px;
  img{
    width: 100%;
  }
}
.border-total{
  background: url("@/views/screen/assets/lineBg.png") no-repeat top center;
  background-size: 100% 100%;
  --el-border-color: #32508d;
}
</style>
