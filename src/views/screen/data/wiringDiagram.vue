<template>
  <section class="wiring-board" ref="boardRef">
    <div class="wiring-canvas">
      <div class="wiring-surface">
        <img class="wiring-core" :src="core" alt="" />
        <p class="wiring-desc">
          国网新型电力系统——现代智慧配电网数智化（源网荷储）微电网应用示范工程
        </p>
        <p class="wiring-desc wiring-desc-sub">
          负荷管理系统支撑新型电力系统建设示范项目（基于用户侧数智柔性能源管理系统的零碳建筑源网荷储协同互动微电网示范应用）
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'

import core from '@/views/screen/assets/wiring_diagram/core.png'

defineOptions({ name: 'ScreenDataWiringDiagram' })

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
.wiring-board {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #fff;
  background: #0b1229;
}

.wiring-canvas {
  position: absolute;
  top: 45%;
  left: 50%;
  width: 1920px;
  height: 1080px;
  transform: translate(-50%, -50%) scale(v-bind(scale));
  transform-origin: center center;
}

.wiring-surface {
  position: relative;
  width: 100%;
  height: 100%;
}

.wiring-core {
  position: absolute;
  top: 200px;
  left: 50%;
  width: 1680px;
  height: auto;
  transform: translateX(-50%);
}

.wiring-header {
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

.wiring-desc {
  position: absolute;
  top: 106px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  font-size: 20px;
  color: #dfe6f4;
  letter-spacing: 1px;
}

.wiring-desc-sub {
  top: 140px;
  font-size: 18px;
  opacity: 0.9;
}
</style>
