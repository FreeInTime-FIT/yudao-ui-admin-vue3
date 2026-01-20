<template>
  <section class="publicity-board" ref="boardRef">
    <div class="publicity-canvas">
      <div class="publicity-inner">
        <header class="publicity-header">
          <h1 class="publicity-title font-you-she-biao-ti-hei">
            高比例新能源乡村微电网试点政策解读与机遇
          </h1>
          <p class="publicity-subtitle">—— 乡村振兴背景下的分布式能源创新实践</p>
          <p class="publicity-desc">
            国家能源局2025年启动5-10个试点，聚焦“村电村用、多能互补、协同互动、惠民利民”
          </p>
        </header>

        <section class="direction-block">
          <h2 class="direction-title">三大试点方向：</h2>
          <div class="direction-grid">
            <article v-for="item in directionList" :key="item.title" class="direction-card">
              <img class="direction-icon" :src="item.image" :alt="item.title" />
              <h3 class="direction-name">{{ item.title }}</h3>
              <ul class="direction-list">
                <li v-for="line in item.lines" :key="line.label">
                  <span class="direction-label">{{ line.label }}：</span>{{ line.text }}
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section class="feature-block">
          <div class="feature-title font-you-she-biao-ti-hei">本项目实现功能</div>
          <ul class="feature-list">
            <li v-for="item in featureList" :key="item">{{ item }}</li>
          </ul>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import pic1 from '@/views/screen/assets/publicity/pic_1.png'
import pic2 from '@/views/screen/assets/publicity/pic_2.png'
import pic3 from '@/views/screen/assets/publicity/pic_3.png'

defineOptions({ name: 'ScreenDataPublicity' })

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

const directionList = [
  {
    title: '农村合作社',
    image: pic1,
    lines: [
      { label: '特征', text: '村社合作、自发自用、内部交易机制' },
      { label: '场景', text: '别墅群联建微电网，共享光伏+储能，形成社区能源自治' },
    ],
  },
  {
    title: '加工作坊/工商业型',
    image: pic2,
    lines: [
      { label: '特征', text: '高消纳率（≥60%）、冷热电联供' },
      { label: '场景', text: '别墅+小型民宿/农业加工，实现能效优化与绿色电力增值' },
    ],
  },
  {
    title: '供电补强型',
    image: pic3,
    lines: [
      { label: '特征', text: '黑启动、离网运行，提升供电可靠性' },
      { label: '场景', text: '偏远地区别墅独立微电网，保障极端天气下能源韧性' },
    ],
  },
]

const featureList = [
  '光伏+储能+智能调度系统，实现90%以上本地消纳',
  '分时电价管理 + 村内电力交易机制，降低用能成本30%+',
  '并离网无缝切换，具备黑启动能力，保障极端天气供电',
]
</script>

<style scoped lang="scss">
.publicity-board {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #fff;
  background: #0b1228;
}

.publicity-canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1920px;
  height: 1080px;
  box-sizing: border-box;
  transform: translate(-50%, -50%) scale(v-bind(scale));
  transform-origin: center center;
}

.publicity-inner {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  gap: 64px;
}

.publicity-header {
  display: flex;
  text-align: center;
  flex-direction: column;
  gap: 24px;
}

.publicity-title {
  margin: 0;
  font-size: 44px;
  font-weight: 600;
  letter-spacing: 2px;
}

.publicity-subtitle {
  margin: 0;
  font-size: 24px;
  letter-spacing: 4px;
  opacity: 0.95;
}

.publicity-desc {
  max-width: 1400px;
  margin: 0;
  font-size: 22px;
  line-height: 1.7;
  opacity: 0.9;
  align-self: center;
}

.direction-block {
  display: flex;
  flex-direction: column;
  gap: 40px;
  flex: 1;
}

.direction-title {
  margin: 0;
  font-size: 26px;
  font-weight: 500;
  text-align: left;
  opacity: 0.9;
}

.direction-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 40px;
  margin-top: 20px;
}

.direction-card {
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.direction-icon {
  width: 280px;
  height: auto;
  filter: drop-shadow(0 12px 18px rgb(20 86 220 / 35%));
}

.direction-name {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
}

.direction-list {
  width: fit-content;
  max-width: 360px;
  padding: 0;
  margin: 0;
  font-size: 16px;
  line-height: 1.8;
  text-align: left;
  list-style: none;
  opacity: 0.92;
}

.direction-list li {
  margin-bottom: 8px;
}

.direction-label {
  font-weight: 600;
}

.feature-block {
  display: flex;
  padding-bottom: 16px;
  margin-top: auto;
  justify-content: space-around;
  align-items: center;
}

.feature-title {
  margin: 0;
  margin-left: 160px;
  font-size: 56px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 2px;
}

.feature-list {
  padding: 0;
  margin: 0;
  margin-right: 120px;
  font-size: 24px;
  line-height: 2;
  color: #f3e43a;
  text-align: left;
  list-style: none;
}

.feature-list li {
  margin-bottom: 4px;
}


</style>
