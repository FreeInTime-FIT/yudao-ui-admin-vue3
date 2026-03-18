<template>
  <div class="villa-model-viewer">
    <div ref="containerRef" class="villa-model-viewer__canvas"></div>

    <button
      v-if="sceneConfig.showBackButton && !loading && !loadError"
      class="villa-model-viewer__back"
      type="button"
      @click="handleBack"
    >
      返回整体
    </button>

    <div
      v-if="sceneMode === 'overall' && hoveredClickableName && !loading && !loadError"
      class="villa-model-viewer__hint"
    >
      {{ sceneConfig.hintText }}
    </div>

    <div v-if="loading" class="villa-model-viewer__status villa-model-viewer__status--loading">
      3D模型加载中...
    </div>

    <div v-else-if="loadError" class="villa-model-viewer__status villa-model-viewer__status--error">
      <p>{{ loadError }}</p>
      <button class="villa-model-viewer__retry" type="button" @click="handleRetry">重新加载</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { findClickableNodeName, getSceneConfig, type SceneMode } from './VillaModelViewer.config'

defineOptions({ name: 'VillaModelViewer' })

const containerRef = ref<HTMLDivElement>()
const sceneMode = ref<SceneMode>('overall')
const loading = ref(true)
const loadError = ref('')
const hoveredClickableName = ref<string | null>(null)

const sceneConfig = computed(() => getSceneConfig(sceneMode.value))

const loader = new GLTFLoader()
const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()

let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let controls: OrbitControls | null = null
let currentModel: THREE.Object3D | null = null
let animationFrameId = 0
let resizeObserver: ResizeObserver | null = null
let loadRequestId = 0

const resetPointerState = () => {
  hoveredClickableName.value = null
  if (renderer?.domElement) {
    renderer.domElement.style.cursor = 'grab'
  }
}

const disposeMaterial = (material: THREE.Material) => {
  for (const value of Object.values(material)) {
    if (value && typeof value === 'object' && 'isTexture' in value) {
      ;(value as THREE.Texture).dispose()
    }
  }
  material.dispose()
}

const disposeCurrentModel = () => {
  if (!scene || !currentModel) {
    return
  }

  currentModel.traverse((node) => {
    if (!(node instanceof THREE.Mesh)) {
      return
    }
    node.geometry.dispose()
    if (Array.isArray(node.material)) {
      node.material.forEach(disposeMaterial)
      return
    }
    disposeMaterial(node.material)
  })

  scene.remove(currentModel)
  currentModel = null
}

const resizeRenderer = () => {
  if (!containerRef.value || !renderer || !camera) {
    return
  }

  const width = Math.max(containerRef.value.clientWidth, 1)
  const height = Math.max(containerRef.value.clientHeight, 1)

  renderer.setSize(width, height, false)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  camera.aspect = width / height
  camera.updateProjectionMatrix()
}

const fitCameraToModel = (model: THREE.Object3D, mode: SceneMode) => {
  if (!camera || !controls) {
    return
  }

  const box = new THREE.Box3().setFromObject(model)
  if (box.isEmpty()) {
    camera.position.set(0, 6, 16)
    controls.target.set(0, 0, 0)
    controls.update()
    return
  }

  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())
  const maxDimension = Math.max(size.x, size.y, size.z, 1)
  const offsetFactor = mode === 'overall' ? 1.65 : 1.95

  camera.near = Math.max(0.1, maxDimension / 100)
  camera.far = Math.max(200, maxDimension * 30)
  camera.position.set(
    center.x + maxDimension * 0.7,
    center.y + maxDimension * 0.35,
    center.z + maxDimension * offsetFactor
  )
  camera.updateProjectionMatrix()

  controls.target.copy(center)
  controls.minDistance = maxDimension * 0.45
  controls.maxDistance = maxDimension * 6
  controls.update()
}

const animate = () => {
  animationFrameId = window.requestAnimationFrame(animate)
  controls?.update()
  if (scene && camera && renderer) {
    renderer.render(scene, camera)
  }
}

const collectNodeNames = (object: THREE.Object3D): string[] => {
  const names: string[] = []
  let current: THREE.Object3D | null = object

  while (current) {
    if (current.name) {
      names.push(current.name)
    }
    current = current.parent
  }

  return names
}

const resolveClickableNodeName = (event: PointerEvent): string | null => {
  if (!renderer || !camera || !currentModel || sceneMode.value !== 'overall') {
    return null
  }

  const rect = renderer.domElement.getBoundingClientRect()
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(pointer, camera)

  const intersections = raycaster.intersectObject(currentModel, true)
  for (const intersection of intersections) {
    const matchedName = findClickableNodeName(
      collectNodeNames(intersection.object),
      sceneConfig.value.clickableNodeNames
    )
    if (matchedName) {
      return matchedName
    }
  }

  return null
}

const loadScene = (mode: SceneMode) => {
  const currentRequestId = ++loadRequestId

  sceneMode.value = mode
  loading.value = true
  loadError.value = ''
  resetPointerState()
  disposeCurrentModel()

  loader.load(
    getSceneConfig(mode).url,
    (gltf) => {
      if (!scene || currentRequestId !== loadRequestId) {
        return
      }

      currentModel = gltf.scene
      scene.add(currentModel)
      fitCameraToModel(currentModel, mode)
      loading.value = false
    },
    undefined,
    (error) => {
      if (currentRequestId !== loadRequestId) {
        return
      }
      console.error('加载3D模型失败', error)
      loadError.value = '3D模型加载失败，请稍后重试'
      loading.value = false
    }
  )
}

const handlePointerMove = (event: PointerEvent) => {
  hoveredClickableName.value = resolveClickableNodeName(event)
  if (renderer?.domElement) {
    renderer.domElement.style.cursor = hoveredClickableName.value ? 'pointer' : 'grab'
  }
}

const handlePointerLeave = () => {
  resetPointerState()
}

const handleCanvasClick = (event: PointerEvent) => {
  const matchedName = resolveClickableNodeName(event)
  if (!matchedName) {
    return
  }
  hoveredClickableName.value = matchedName
  loadScene('substation')
}

const handleBack = () => {
  loadScene('overall')
}

const handleRetry = () => {
  loadScene(sceneMode.value)
}

onMounted(() => {
  if (!containerRef.value) {
    return
  }

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, 1, 0.1, 2000)
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  })

  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.setClearAlpha(0)
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'
  renderer.domElement.style.display = 'block'
  renderer.domElement.style.cursor = 'grab'

  containerRef.value.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.enablePan = false
  controls.rotateSpeed = 0.85
  controls.zoomSpeed = 0.9

  const ambientLight = new THREE.AmbientLight(0xffffff, 2.2)
  const mainLight = new THREE.DirectionalLight(0xffffff, 1.8)
  const fillLight = new THREE.DirectionalLight(0x5eb8ff, 1.1)

  mainLight.position.set(18, 20, 12)
  fillLight.position.set(-10, 12, -8)

  scene.add(ambientLight, mainLight, fillLight)

  renderer.domElement.addEventListener('pointermove', handlePointerMove)
  renderer.domElement.addEventListener('pointerleave', handlePointerLeave)
  renderer.domElement.addEventListener('click', handleCanvasClick)

  resizeObserver = new ResizeObserver(() => {
    resizeRenderer()
  })
  resizeObserver.observe(containerRef.value)

  resizeRenderer()
  animate()
  loadScene('overall')
})

onBeforeUnmount(() => {
  if (renderer?.domElement) {
    renderer.domElement.removeEventListener('pointermove', handlePointerMove)
    renderer.domElement.removeEventListener('pointerleave', handlePointerLeave)
    renderer.domElement.removeEventListener('click', handleCanvasClick)
  }

  if (animationFrameId) {
    window.cancelAnimationFrame(animationFrameId)
  }

  resizeObserver?.disconnect()
  controls?.dispose()
  disposeCurrentModel()

  if (renderer) {
    renderer.dispose()
    renderer.domElement.remove()
  }

  scene = null
  camera = null
  renderer = null
  controls = null
  resizeObserver = null
})
</script>

<style scoped lang="scss">
.villa-model-viewer {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background:
    radial-gradient(circle at top, rgba(34, 101, 196, 0.18), transparent 48%),
    linear-gradient(180deg, rgba(6, 17, 45, 0.9), rgba(3, 10, 30, 0.95));
}

.villa-model-viewer__canvas {
  width: 100%;
  height: 100%;
}

.villa-model-viewer__back,
.villa-model-viewer__retry {
  border: none;
  color: #dff7ff;
  cursor: pointer;
  transition: opacity 0.2s ease;
  background: linear-gradient(180deg, rgba(25, 164, 255, 0.88), rgba(12, 103, 202, 0.88));
}

.villa-model-viewer__back:hover,
.villa-model-viewer__retry:hover {
  opacity: 0.9;
}

.villa-model-viewer__back {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 3;
  height: 34px;
  padding: 0 14px;
  border-radius: 17px;
  box-shadow: 0 8px 20px rgba(6, 38, 89, 0.4);
  font-size: 13px;
}

.villa-model-viewer__hint {
  position: absolute;
  bottom: 14px;
  left: 50%;
  z-index: 3;
  transform: translateX(-50%);
  padding: 8px 14px;
  border: 1px solid rgba(81, 184, 255, 0.5);
  border-radius: 18px;
  color: #dff7ff;
  font-size: 13px;
  background: rgba(4, 16, 38, 0.82);
  backdrop-filter: blur(6px);
}

.villa-model-viewer__status {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #dff7ff;
  background: rgba(4, 14, 33, 0.72);
  text-align: center;
}

.villa-model-viewer__status--loading {
  font-size: 14px;
  letter-spacing: 1px;
}

.villa-model-viewer__status--error {
  font-size: 14px;
}

.villa-model-viewer__status--error p {
  margin: 0;
}

.villa-model-viewer__retry {
  height: 34px;
  padding: 0 18px;
  border-radius: 17px;
  font-size: 13px;
}
</style>
