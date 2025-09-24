<script setup lang="ts">
import p1 from '@/views/screen/assets/realtime_fork/energy.png'

defineOptions({ name: 'EnergyRouterView' })

interface MenuGroup {
  title: string
  items: string[]
}

const menu: MenuGroup[] = [
  {
    title: '台区1参数',
    items: [
      '光伏峰值功率  320kW',
      '光伏直流电压  680V',
      '光伏交流输出电压  385V',
      '液流电池负荷功率  388kW',
      '互联路由器交流电压  385V',
      '互联路由器直流电压  688V',
      '互联路由器模式选择  1',
      '互联路由器可转移功率  80kW',
    ],
  },
  {
    title: '台区2参数',
    items: [
      '综合楼负荷功率  66kW',
      '科研中心负荷  52kW',
      '金刚石建筑负荷  88kW',
      '互联路由器交流电压  380V',
      '互联路由器直流电压  680V',
      '互联路由器模式选择  0',
      '互联路由器可接收转移功率  206kW',
    ],
  },
]
</script>

<template>
  <section class="er-root w-full overflow-hidden" :style="{ height: 'calc(100vh - 80px)' }">
    <div class="er-center-title">台区互联能量路由器展示</div>
    <div class="h-full grid grid-cols-[27%_73%] gap-24px">
      <!-- 左侧参数列表（与 zkt.vue 风格一致） -->
      <aside class="h-full flex flex-col">
        <div class="flex-1 overflow-y-auto pr-28px">
          <div v-for="group in menu" :key="group.title" class="mb-18px">
            <div class="er-title px-10px py-6px mb-28px">{{ group.title }}</div>
            <div class="space-y-8px">
              <ElButton
                v-for="item in group.items"
                :key="item"
                size="large"
                class="w-100% justify-between !bg-transparent !text-white !border-1 !border-#2b4b7e hover:!bg-#0b122a"
              >
                <span class="truncate text-left">{{ item.split('  ')[0] }}</span>
                <span class="color-#FFD84D pl-8px fw-600">{{ item.split('  ')[1] }}</span>
              </ElButton>
            </div>
          </div>
        </div>
      </aside>

      <!-- 右侧整图占位（由图片替代复杂连线与元件） -->
      <aside class="h-full pr-20px mr-20px">
        <div class="w-full h-full shadow-bg flex items-center justify-center">
          <img :src="p1" class="max-w-full max-h-full object-contain" alt="台区互联能量路由器展示图" />
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped lang="scss">
.er-root{

  position: relative;
}
.er-center-title{
  position: absolute;
  left: 50%;
  top: 6px;
  transform: translateX(-50%);
  font-size: 30px;
  font-weight: 600;
}
.er-title{
  border-left: 3px solid #248FDA;
  font-weight: bold;
}
.shadow-bg{
  padding: 12px;
  
}
.el-button{
  margin-left: 0px !important;
}
</style>


