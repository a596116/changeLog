<script setup lang="ts">
import ImageMagnifier from './components/ImageMagnifier.vue'
</script>

<template>
  <div class="app-container">
    <h1>🔍 圖片放大鏡效果展示</h1>
    <p class="description">將滑鼠移到圖片上，可以看到放大鏡效果</p>
    <p class="description">💡 使用滑鼠滾輪可以調整放大倍率（1.5x - 5x）</p>

    <div class="demo-section">
      <h2>預設設定（開啟滾輪縮放）</h2>
      <ImageMagnifier
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
        alt="美麗的山景"
      />
    </div>

    <div class="demo-section">
      <h2>自訂放大倍率（3.5x）+ 滾輪縮放</h2>
      <ImageMagnifier
        src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&q=80"
        alt="海邊景色"
        :zoom-level="3.5"
        :magnifier-height="200"
        :magnifier-width="200"
      />
    </div>

    <div class="demo-section">
      <h2>小型放大鏡（關閉滾輪縮放）</h2>
      <ImageMagnifier
        src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80"
        alt="森林景觀"
        :zoom-level="2"
        :magnifier-height="100"
        :magnifier-width="100"
        :enable-wheel-zoom="false"
      />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: 700;
}

.description {
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.demo-section {
  margin-bottom: 4rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.demo-section h2 {
  color: #34495e;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.demo-section :deep(.image-magnifier-container) {
  display: flex;
  justify-content: center;
}

.demo-section :deep(.magnifier-image) {
  max-width: 600px;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
</style>
