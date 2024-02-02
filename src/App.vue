<template>
  <div id="app">
    <AppHeader />    
    <router-view />  
  </div>
</template>

<script>
import AppHeader from '@/components/Login/Header.vue'; 

export default {
  name: 'App',
  components: {
    AppHeader  // 在组件中注册Header组件
  }
}
</script>
<style>
</style>