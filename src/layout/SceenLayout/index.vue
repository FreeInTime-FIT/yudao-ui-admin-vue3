<script setup lang="ts">
import dayjs from "dayjs";
import {ref, computed } from "vue";
import {useRouter, useRoute} from "vue-router";
const now = ref(dayjs());
const route = useRoute();
const router = useRouter();
const menu = router.options.routes.find(i => i.path === '/screen').children;

const date = computed(() => ({
  time: now.value.format('HH:mm:ss'),
  date: now.value.format('YYYY-MM-DD'),
}));

function handleClick(item) {
  router.push({
    name: item.name,
  })
}

const menuList = [];
setInterval(() => {
   now.value = dayjs();
}, 1000)
defineOptions({ name: 'ScreenLayout' })

</script>

<template>
  <section class="h-[100%] flex flex-col ">
    <header class="flex pa-[12px] shadow-[var(--el-box-shadow-dark)] bg-[var(--screen-header-bg)] color-[var(--screen-header-text-color)]">
      <div class="flex-1 flex-items-center">
        <a type="info" href="/screen/index" class="font-size-[30px] color-[var(--screen-header-text-color)] logo">
          能量管理云监控系统
        </a>

      </div>
      <div class="flex flex-items-center gap-10px">
        <RouterLink to="/screen/warning/index">
          <ElButton type='text'>实时告警</ElButton>
        </RouterLink>
        <ElDivider direction='vertical' />
        <RouterLink to="/screen/setting/index">
          <ElButton type='text'>
            <ElAvatar />
            <span>管理中心</span>
          </ElButton>

        </RouterLink>
        <div class="text-center">
          <div class="text-24px font-600">
            {{date.time}}
          </div>
          <div>{{date.date}}</div>
        </div>
      </div>

    </header>
    <section class="flex-1 position-relative h-0 bg-[var(--screen-content-bg)]  color-[var(--screen-content-text-color)]">
      <div class="menu-box">
        <div class="menu-list">
          <div class="menu-item" :class="{active: item.name === route.name}" v-for="item in menu" :key="item.path" @click="handleClick(item)">
            <div><Icon icon="ant-design:dashboard-filled" /></div>
            <div>{{item.meta.title}}</div>
          </div>
        </div>
      </div>
      <router-view>
        <template #default="{ Component, route }">
          <component :is="Component" :key="route.fullPath" />
        </template>
      </router-view>
    </section>
  </section>


</template>

<style scoped lang="scss">
  .menu-box{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: transparent;
    color: #fff;
    z-index: 999;
    min-width: 30px;
    &:hover{
      background-color: var(--screen-content-bg);
      .menu-list{
        display: block;
      }
    }
  }
  .menu-list{
    transition: all linear 0.3s;
    display: none;
    width: 200px;
    background-color: #376ed8;
    padding: 12px 0;
  }
  .menu-item{
    display: flex;
    align-items: center;
    padding: 8px 12px;
    gap: 8px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    &.active{
      background-color: #fff;
      color: #376ed8;
    }
    &:hover{
      color: #6d9af3;
    }
    .el-icon{
      color: #6d9af3;
    }
    &:last-child{
      border-bottom: none;
    }
  }
  .logo{
    text-decoration: none;
    font-weight: bold;
  }
  :deep(.el-button) {
    color: #fff;
  }
</style>
