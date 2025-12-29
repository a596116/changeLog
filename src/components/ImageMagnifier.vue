<script setup lang="ts">
import { ref, computed, type CSSProperties, onUnmounted } from 'vue'

interface Props {
  src: string
  alt?: string
  magnifierHeight?: number
  magnifierWidth?: number
  zoomLevel?: number
  minZoom?: number
  maxZoom?: number
  enableWheelZoom?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  alt: '圖片',
  magnifierHeight: 250,
  magnifierWidth: 250,
  zoomLevel: 2.5,
  minZoom: 1.5,
  maxZoom: 5,
  enableWheelZoom: true,
})

const showMagnifier = ref(false)
const imgRef = ref<HTMLImageElement | null>(null)
const magnifierX = ref(0)
const magnifierY = ref(0)
const imgX = ref(0)
const imgY = ref(0)
const currentZoom = ref(props.zoomLevel)
const showZoomIndicator = ref(false)
const imgLoaded = ref(false)
let zoomIndicatorTimer: number | null = null
let rafId: number | null = null
let cachedBoundingRect: DOMRect | null = null
let wheelTimeout: number | null = null

// 清理函數
onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  if (zoomIndicatorTimer) clearTimeout(zoomIndicatorTimer)
  if (wheelTimeout) clearTimeout(wheelTimeout)
})

// 快取計算結果避免重複運算
const bgSize = computed(() => {
  if (!imgRef.value || !imgLoaded.value) return '0px 0px'
  return `${imgRef.value.width * currentZoom.value}px ${imgRef.value.height * currentZoom.value}px`
})

// 圖片載入完成處理
const handleImageLoad = () => {
  imgLoaded.value = true
}

const magnifierStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
    height: `${props.magnifierHeight}px`,
    width: `${props.magnifierWidth}px`,
    border: '1px solid #000',
    backgroundImage: `url("${props.src}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: bgSize.value,
    top: `${magnifierY.value}px`,
    left: `${magnifierX.value}px`,
    backgroundPositionX: `${-imgX.value * currentZoom.value + props.magnifierWidth / 2}px`,
    backgroundPositionY: `${-imgY.value * currentZoom.value + props.magnifierHeight / 2}px`,
    borderRadius: '50%',
    transformOrigin: 'center center',
    // 結合 GPU 加速和縮放動畫
    transform: showMagnifier.value ? 'scale(1) translateZ(0)' : 'scale(0) translateZ(0)',
    transition: showMagnifier.value
      ? 'transform 0.4s cubic-bezier(0.28, 0, 0, 1) 0.1s'
      : 'transform 0.3s cubic-bezier(0.28, 0, 0, 1)',
    willChange: showMagnifier.value ? 'transform, background-position' : 'auto',
    backfaceVisibility: 'hidden',
  }
  return style
})

const handleMouseEnter = (e: MouseEvent) => {
  showMagnifier.value = true
  // 快取邊界矩形，避免重複計算
  const elem = e.currentTarget as HTMLElement
  cachedBoundingRect = elem.getBoundingClientRect()
}

// 使用 RAF 優化 mousemove 效能
const handleMouseMove = (e: MouseEvent) => {
  if (!imgRef.value || !cachedBoundingRect) return

  // 取消之前的 RAF
  if (rafId) {
    cancelAnimationFrame(rafId)
  }

  // 使用 RAF 確保在瀏覽器下一次重繪前更新
  rafId = requestAnimationFrame(() => {
    const x = e.pageX - cachedBoundingRect!.left - window.scrollX
    const y = e.pageY - cachedBoundingRect!.top - window.scrollY

    imgX.value = x
    imgY.value = y

    magnifierX.value = x - props.magnifierWidth / 2
    magnifierY.value = y - props.magnifierHeight / 2
  })
}

const handleMouseLeave = () => {
  showMagnifier.value = false
  cachedBoundingRect = null
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

// 節流優化的滾輪處理
const handleWheel = (e: WheelEvent) => {
  // 如果未啟用滾輪縮放或放大鏡未顯示，則不處理
  if (!props.enableWheelZoom || !showMagnifier.value) return

  e.preventDefault()

  // 節流：避免過於頻繁的更新
  if (wheelTimeout) return

  wheelTimeout = window.setTimeout(() => {
    wheelTimeout = null
  }, 16) // ~60fps

  // deltaY > 0 表示向下滾動（縮小），< 0 表示向上滾動（放大）
  const delta = e.deltaY > 0 ? -0.2 : 0.2
  let newZoom = currentZoom.value + delta

  // 使用 Math.min 和 Math.max 限制在範圍內
  newZoom = Math.max(props.minZoom, Math.min(props.maxZoom, newZoom))
  newZoom = Number(newZoom.toFixed(1))

  // 只有當值有變化時才更新
  if (newZoom !== currentZoom.value) {
    currentZoom.value = newZoom

    // 顯示縮放指示器
    showZoomIndicator.value = true

    // 清除之前的計時器
    if (zoomIndicatorTimer) {
      clearTimeout(zoomIndicatorTimer)
    }

    // 1秒後隱藏指示器
    zoomIndicatorTimer = window.setTimeout(() => {
      showZoomIndicator.value = false
    }, 1000)
  }
}
</script>

<template>
  <div class="image-magnifier-container">
    <div
      class="image-wrapper"
      @mouseenter="handleMouseEnter"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
      @wheel="handleWheel"
    >
      <img ref="imgRef" :src="src" :alt="alt" class="magnifier-image" @load="handleImageLoad" />
      <div :style="magnifierStyle" class="magnifier-glass"></div>

      <!-- 縮放倍率指示器（僅在啟用滾輪縮放時顯示） -->
      <transition name="zoom-indicator">
        <div v-if="enableWheelZoom && showZoomIndicator" class="zoom-indicator">
          {{ currentZoom.toFixed(1) }}x
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.image-magnifier-container {
  display: inline-block;
  position: relative;
}

.image-wrapper {
  position: relative;
  display: inline-block;
  /* cursor: crosshair; */
  overflow: hidden;
}

.magnifier-image {
  display: block;
  max-width: 100%;
  height: auto;
  user-select: none;
}

.magnifier-glass {
  z-index: 99;
}

.zoom-indicator {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  pointer-events: none;
  z-index: 100;
  backdrop-filter: blur(8px);
}

.zoom-indicator-enter-active,
.zoom-indicator-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.zoom-indicator-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.zoom-indicator-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
