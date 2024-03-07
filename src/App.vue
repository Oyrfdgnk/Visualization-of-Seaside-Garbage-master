<template>
  <div id="app">
    <AppHeader />    
    <AsideMenuVue />    
    <!-- map -->
    <router-view />  
  </div>
</template>

<script>
//import AppHeader from '@/components/Login/Header.vue'; 
import AppHeader from '@/components/Login/HeaderComponent.vue'
import AsideMenuVue from '@/components/Aside/AsideMenu.vue';
export default {
  name: 'App',
  components: {
    AppHeader,  // 在组件中注册Header组件
    AsideMenuVue

  }
}
</script>
<style>
</style>