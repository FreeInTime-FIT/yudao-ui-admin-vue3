<template>
  <section class="network-board" ref="boardRef">
    <div class="network-canvas">
      <div class="network-surface">
        <img class="network-core" :src="core" alt="" />

        <header class="network-header">
          <div class="header-left">
            <span class="header-title">云监控系统</span>
            <span class="header-subtitle">数据看板</span>
          </div>
          <div class="header-center">网络拓扑图</div>
          <div class="header-right">
            <span class="header-alert">实时告警</span>
            <span class="header-admin">
              <span class="header-avatar"></span>
              <span>管理中心</span>
            </span>
            <div class="header-time">
              <div class="header-clock">14:21:49</div>
              <div class="header-date">2024-11-27</div>
            </div>
          </div>
        </header>

        <p class="network-footer">
          国网智慧配电网统一管控平台，通过“融合终端+”模式，实现融合终端与主配微协同，提升配网分布式光伏接入能力，解决台区反向过载、三相不平衡、电压越限，实现对分布式资源的“可观、可测、可调、可控”。营销负荷管理系统，采集2.0生产控制域对分布式光伏调控，空调负荷管控，并与虚拟电厂贯通。
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'

import core from '@/views/screen/assets/network/core.png'

defineOptions({ name: 'ScreenDataNetwork' })

const boardRef = ref<HTMLElement>()
const scale = ref(1)

const updateScale = () => {
  if (!boardRef.value) {
    return
  }
  const { width, height } = boardRef.value.getBoundingClientRect()
  const nextScale = Math.min(width / 1920, height / 1080)
  scale.value = Number.isFinite(nextScale) && nextScale > 0 ? nextScale : 1
}

useResizeObserver(boardRef, updateScale)

onMounted(() => {
  updateScale()
  window.addEventListener('resize', updateScale)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScale)
})
</script>

<style scoped lang="scss">
.network-board {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #fff;
  background: #0b1229;
}

.network-canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1920px;
  height: 1080px;
  transform: translate(-50%, -50%) scale(v-bind(scale));
  transform-origin: center center;
}

.network-surface {
  position: relative;
  width: 100%;
  height: 100%;
}

.network-core {
  position: absolute;
  top: 104px;
  left: 50%;
  width: 1680px;
  height: auto;
  transform: translateX(-50%);
}

.network-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  padding: 0 40px 0 46px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  background: linear-gradient(90deg, #1b3d7f 0%, #1c468b 48%, #1b3d7f 100%);
  box-sizing: border-box;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 18px;
  font-weight: 600;
  justify-self: start;
}

.header-title {
  font-size: 30px;
  letter-spacing: 2px;
}

.header-subtitle {
  font-size: 20px;
  opacity: 0.85;
}

.header-center {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 8px;
  justify-self: center;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 18px;
  font-size: 16px;
  justify-self: end;
}

.header-alert {
  opacity: 0.9;
}

.header-admin {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.header-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #d7deea;
  display: inline-block;
}

.header-time {
  text-align: right;
  font-size: 14px;
}

.header-clock {
  font-size: 18px;
  font-weight: 600;
}

.network-footer {
  position: absolute;
  left: 90px;
  right: 90px;
  bottom: 56px;
  font-size: 20px;
  color: #e1e6f1;
}
</style>
