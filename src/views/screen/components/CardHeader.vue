<script setup lang="ts">

defineOptions({
  name: 'CardHeader',
})
const { title } = defineProps<{
  title: string;
}>()
</script>

<template>
  <header class="card-header">
    <div class="card-header_arrow_left">
      <div class="card-header_arrow_left_first"></div>
      <div class="card-header_arrow_left_second"></div>
    </div>
    <h3>{{title}}</h3>
    <div class="card-header_arrow_right">
      <div class="card-header_arrow_right_first"></div>
      <div class="card-header_arrow_right_second"></div>
    </div>
  </header>
</template>

<style scoped lang="scss">
  .card-header{
    position: relative;
    background: linear-gradient(to right, #111c38, rgb(24 50 117) 50% , #111c38);
    padding: 4px 12px;
    margin-block: 12px;
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
        width: 4px;
        top: 0;
        bottom: 0;
        left: 0px;
        background-color: #2d68c5;
        border-radius: 4px;
        &:before{
          content: '';
          position: absolute;
          width: 4px;
          top: 3px;
          background-color: #2d68c5;
          height: 16px;
          transform-origin: 2px 0;
          transform: rotate(-100deg) skew(30deg, 0deg);
          left: -1px;
        }
        &:after{
          content: '';
          position: absolute;
          width: 4px;
          bottom: 4px;
          background-color: #2d68c5;
          height: 16px;
          transform-origin: 2px 100%;
          transform: rotate(100deg) skew(-30deg, 0);
          left: -2px;
        }
      }
      &_second{
        position: absolute;

      }
    }
    &_arrow_right{
      &_first{
        position: absolute;
        width: 4px;
        top: 0;
        bottom: 0;
        right: 0px;
        background-color: #2d68c5;
        border-radius: 4px;
        &:before{
          content: '';
          position: absolute;
          width: 4px;
          top: 3px;
          background-color: #2d68c5;
          height: 16px;
          transform-origin: 2px 0;
          transform: rotate(100deg) skew(-30deg, 0deg);
          left: 2px;
        }
        &:after{
          content: '';
          position: absolute;
          width: 4px;
          bottom: 4px;
          background-color: #2d68c5;
          height: 16px;
          transform-origin: 2px 100%;
          transform: rotate(-100deg) skew(30deg, 0);
          left: 2px;
        }
      }
    }
  }
</style>
