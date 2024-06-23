<script setup lang="ts">
import {computed, onMounted} from "vue";
import { useUserStore } from '@/store/modules/user'

const mapRef = ref(null)

onMounted(() => {

});

onUnmounted(() => {
});
const userStore = useUserStore()
const userName = computed(() => userStore.user.nickname ?? 'Admin')
  const sex = '先生'
const totalList = [{
  label: '用户总量',
  key: 'user',
  unit: '个',
}, {
  label: '项目总量',
  key: 'user1',
  unit: '个',
}, {
  label: '设备总量',
  key: 'user2',
  unit: '台',
}, {
  label: '负荷总量',
  key: 'user3',
  unit: 'kW',
}, {
  label: '电源总量',
  key: 'user4',
  unit: 'kWp',
}, {
  label: '储能总量',
  key: 'user5',
  unit: 'kWh',
}]
const todayData = [
  {
    label: '购电总量',
    key: '1',
    unit: 'kWh',
  },
  {
    label: '发电总量',
    key: '2',
    unit: 'kWh',
  },
  {
    label: '储电总量',
    key: '3',
    unit: 'kW',
  },
  {
    label: '用电总量',
    key: '3',
    unit: 'kWh',
  },
  {
    label: '排碳总量',
    key: '4',
    unit: 't',
  },
  {
    label: '调荷总量',
    key: '5',
    unit: 'kW',
  },
  {
    label: '减碳总量',
    key: '6',
    unit: 't',
  },
  {
    label: '节能总量',
    key: '7',
    unit: 'kWh',
  },
  {
    label: '降费总额',
    key: '8',
    unit: '万元',
  },
  {
    label: '交易总量',
    key: '9',
    unit: '万元',
  },
  {
    label: '收益总量',
    key: '10',
    unit: '万元',
  },
]
</script>

<template>
  <header class="flex flex-justify-between gap-10px pa-10px color-[var(--screen-content-text-color)]">
    <div>尊敬的{{userName}}{{sex}}，您好</div>
    <div>数据更新时间：12120</div>
    <div><ElButton type="primary">数据维护</ElButton><ElButton type="primary">退出登录</ElButton></div>
  </header>
  <article>
    <section class="sideLeft">
      <aside>
        <div v-for="item in totalList" :key="item.key">
          <span>{{item.label}}</span>
          <span>{{item.value}}{{item.unit}}</span>
        </div>
      </aside>
    </section>
    <article ref="mapRef" id="mapContainer"></article>
    <aside class="sideRight">
      <div v-for="item in todayData" :key="item.key">
        <span>{{item.label}}</span>
        <span>{{item.value}}{{item.unit}}</span>
      </div>
    </aside>
  </article>
</template>

<style scoped lang="scss">
  .sideLeft{
    position: absolute;
    z-index: 2;
    left: 0;
  }
  .sideRight{
    position: absolute;
    z-index: 2;
    right: 0;
  }
  #mapContainer{
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
