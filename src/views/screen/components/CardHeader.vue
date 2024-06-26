<script setup lang="ts">

defineOptions({
  name: 'CardHeader',
})
const { title } = defineProps<{
  title: string;
  size?: 'small' | 'default';
}>()
</script>

<template>
  <header class="screen-card-header">
    <div class="screen-card-header_arrow_left">
      <div class="screen-card-header_arrow_left_first"></div>
      <div class="screen-card-header_arrow_left_second"></div>
    </div>
    <h3>{{title}}</h3>
    <div class="screen-card-header_arrow_right">
      <div class="screen-card-header_arrow_right_first"></div>
      <div class="screen-card-header_arrow_right_second"></div>
    </div>
  </header>
</template>

<style scoped lang="scss">
  $arrowFirstWidth: 2px;
  .screen-card-header{
    position: relative;
    background: linear-gradient(to right, #111c38, rgb(24 50 117) 50% , #111c38);
    padding: 4px 12px;
    margin-block: 12px;

    --arrow-first-top: 1px;
    --arrow-first-width: 2px;
    --arrow-first-height: 8px;
    --arrow-second-top: -3px;
    --arrow-second-width: 3px;
    --arrow-second-height: 3px;
    h3{
      text-shadow: 0 0 5px #000;
      padding: 3px 0;
      background: linear-gradient(to right,rgb(11 20 41), #1f4fca 50% , rgb(11 20 41));
      text-align: center;
      margin: 0;
    }
    &_arrow_left{


      &_first{
        position: absolute;
        width: var(--arrow-first-width);
        top: 0;
        bottom: 0;
        left: 0px;
        background-color: #2d68c5;
        border-radius: 4px;
        &:before{
          content: '';
          position: absolute;
          width: var(--arrow-first-width);
          top: var(--arrow-first-top);
          background-color: #2d68c5;
          height: var(--arrow-first-height);
          transform-origin: 2px 0;
          transform: rotate(-100deg) skew(30deg, 0deg);
          left: -1px;
        }
        &:after{
          content: '';
          position: absolute;
          width:  var(--arrow-first-width);
          bottom: var(--arrow-first-top);
          background-color: #2d68c5;
          height: var(--arrow-first-height);
          transform-origin: 2px 100%;
          transform: rotate(100deg) skew(-30deg, 0);
          left: -2px;
        }
      }
      &_second{
        position: absolute;
        width: var(--arrow-second-width);
        top: 4px;
        bottom: 4px;
        left: 10px;
        background-color: #72f6fa;
        &:before{
          content: '';
          position: absolute;
          width: var(--arrow-second-width);
          top: var(--arrow-second-top);
          height: var(--arrow-second-height);

          background: linear-gradient(to top right, #72f6fa, transparent);
          transform-origin: 2px 100%;
          transform: skew(-45deg, 0);
          left: 0px;
        }
        &:after{
          content: '';
          position: absolute;
          width: var(--arrow-second-width);
          bottom: var(--arrow-second-top);
          height: var(--arrow-second-height);
          background: linear-gradient(to left bottom, #72f6fa, transparent);
          transform-origin: 2px 0;
          transform: skew(45deg, 0deg);
          left: 0;
        }
      }
    }
    &_arrow_right{
      &_first{
        position: absolute;
        width:  var(--arrow-first-width);
        top: 0;
        bottom: 0;
        right: 0px;
        background-color: #2d68c5;
        border-radius: 4px;
        &:before{
          content: '';
          position: absolute;
          width: var(--arrow-first-width);
          top: var(--arrow-first-top);
          background-color: #2d68c5;
          height: var(--arrow-first-height);
          transform-origin: 2px 0;
          transform: rotate(100deg) skew(-30deg, 0deg);
          left: 0;
        }
        &:after{
          content: '';
          position: absolute;
          width:  var(--arrow-first-width);
          bottom: var(--arrow-first-top);
          background-color: #2d68c5;
          height: var(--arrow-first-height);
          transform-origin: 2px 100%;
          transform: rotate(-100deg) skew(30deg, 0);
          left: 0;
        }
      }
      &_second{
        position: absolute;
        width: var(--arrow-second-width);
        top: 4px;
        bottom: 4px;
        right: 10px;
        background-color: #72f6fa;
        &:before{
          content: '';
          position: absolute;
          width: var(--arrow-second-width);
          top: var(--arrow-second-top);
          height: var(--arrow-second-height);
          background: linear-gradient(to right top, #72f6fa, transparent);
          transform-origin: 2px 0;
          transform: skew(45deg, 0deg);
          left: -3px;
        }
        &:after{
          content: '';
          position: absolute;
          width: var(--arrow-second-width);
          bottom: var(--arrow-second-top);
          height: var(--arrow-second-height);
          background: linear-gradient(to bottom left, #72f6fa, transparent);
          transform-origin: 2px 100%;
          transform: skew(-45deg, 0);
          left: -3px;
        }
      }
    }
  }
</style>
