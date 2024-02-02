<template>
  
  <div id="chart">
    <button @click="openDrawer">打开抽屉</button>
    <!-- 主内容区域 -->
    <div class="main-content">
      <Chart1Wrapper />
      <Chart2Wrapper />
      <Chart3Wrapper />
      <Chart6Wrapper />

    </div>

    <!-- 抽屉 -->
    <transition name="fade">
      <div v-if="drawerOpen" class="drawer">
        <button class="close-btn" @click="closeDrawer">关闭</button>
        <Chart4Wrapper />
        <Chart5Wrapper />
        <button @click="closeDrawer">关闭抽屉</button>
      </div>
    </transition>    
  </div>
</template>

<script>
import Chart1Wrapper from '@/chart/Chart1Wrapper.vue';
import Chart2Wrapper from '@/chart/Chart2Wrapper.vue';
import Chart3Wrapper from '@/chart/Chart3Wrapper.vue';
import Chart4Wrapper from '@/chart/Chart4Wrapper.vue';
import Chart5Wrapper from '@/chart/Chart5Wrapper.vue';
import Chart6Wrapper from '@/chart/c';


export default {
  name: 'ChartWrapper',
  components: {
    Chart1Wrapper,
    Chart2Wrapper,
    Chart3Wrapper,
    Chart4Wrapper,
    Chart5Wrapper,
    Chart6Wrapper,

  },
  data() {
    return {
      drawerOpen: false,
    };
  },
  methods: {
    openDrawer() {
      this.drawerOpen = true;
    },
    closeDrawer() {
      this.drawerOpen = false;
    },
  },
};
</script>

<style>
/* 添加样式以适应你的需求 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.drawer {
  /* 添加样式以定义抽屉的外观 */
  background-color: #f0f0f0;
  padding: 20px;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 800px;
}

/* 关闭按钮样式 */
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ccc;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}
</style>
