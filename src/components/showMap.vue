<template>
  <div id="map-container">
    <Norway_heatmap></Norway_heatmap>
    <Norway_scattermap></Norway_scattermap>
  </div>
</template>

<script>
import CanvasNest from 'canvas-nest.js';
import Norway_heatmap from "@/components/norway_heatmap";
import Norway_scattermap from "@/components/norway_scattermap";

const config = {
  color: '64, 158, 255', // 线条颜色
  pointColor: '64, 158, 255', // 节点颜色
  opacity: 0.5, // 线条透明度
  count: 500, // 线条数量
  zIndex: -1 // 画面层级
};

export default {
  name: 'App',
  components: {
    Norway_heatmap,
    Norway_scattermap,
  },
  mounted() {
    new CanvasNest(document.getElementById('map-container'), config);
  }
}
</script>

<style>
#map-container {
  position: absolute;
  top: 15%;
  left: 20%; /* 向右移动 20px */
}
</style>
