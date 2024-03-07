<template>
    <div id="app">
      <div id="main-content" :class="{ 'shrink': isDrawerOpen, 'shift-right': isDrawerOpen }">
        <Chart1Wrapper></Chart1Wrapper>
        <Chart2Wrapper></Chart2Wrapper>
        <Chart3Wrapper></Chart3Wrapper>
        <Chart6Wrapper></Chart6Wrapper>
        <Chart7Wrapper></Chart7Wrapper>
      </div>
      
      <div id="drawer" :class="{ open: isDrawerOpen }">
        <div id="drawer-content">
          <Chart4Wrapper></Chart4Wrapper>
          <Chart5Wrapper></Chart5Wrapper>
        </div>
        <div id="toggle-button" @click="toggleDrawer">
          <span class="arrow" :class="{ 'open': isDrawerOpen }"></span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Chart1Wrapper from '@/components/Chart/Chart1Wrapper.vue';
  import Chart2Wrapper from '@/components/Chart/Chart2Wrapper.vue';
  import Chart3Wrapper from '@/components/Chart/Chart3Wrapper.vue';
  import Chart4Wrapper from '@/components/Chart/Chart4Wrapper.vue';
  import Chart5Wrapper from '@/components/Chart/Chart5Wrapper.vue';
  import Chart6Wrapper from '@/components/Chart/Chart6Wrapper.vue';
  import Chart7Wrapper from '@/components/Chart/Chart7Wrapper.vue';
  
  export default {
    name: 'Bar-plot',
    components: {
      Chart1Wrapper,
      Chart2Wrapper,
      Chart3Wrapper,
      Chart4Wrapper,
      Chart5Wrapper,
      Chart6Wrapper,
      Chart7Wrapper,
    },
    data() {
      return {
        isDrawerOpen: false,
      };
    },
    methods: {
      toggleDrawer() {
        this.isDrawerOpen = !this.isDrawerOpen;
      },
    },
  }
  </script>
  
  <style>
  #app {
    position: relative;
  }
  
  #main-content {
    flex-grow: 1;
    transition: transform 0.3s ease;
  }
  #main-content {
  position: absolute; /* 使元素相对于视窗固定位置 */
  top: -110px; /* 顶部与视窗顶部的距离 */
  left: 15%; /* 左侧与视窗左侧的距离 */
  transition: transform 0.0s ease;
}


  .shift-right {
    transform: translateX(0px); /* Adjust the value as needed */
  }
  
  #drawer {
    position: fixed;
    top: 0;
    right: 0;
    width: 400px;
    height: 100%;
    background-color: #fff;
    box-shadow: -4px 0 5px rgba(0,0,0,0.5);
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }
  
  #drawer.open {
    transform: translateX(0);
  }
  
  #toggle-button {
    position: absolute;
    left: -30px;
    top: 20px;
    width: 30px;
    height: 30px;
    background-color: #ddd;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .arrow {
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  
  #drawer-content {
    padding: 20px;
  }
  
  #drawer .arrow.open {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }
  </style>
  