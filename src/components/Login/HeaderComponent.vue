<template>
  <header class="app-header">
    <nav class="navbar">
      <div>
        <router-link to="/" class="nav-button">首页</router-link>
        <!-- 使用router-link导航到首页 -->
      </div>
      <div class="title">Visualization of Seaside Garbage</div>
      <!-- 在这里添加了标题 -->
      <div class="spacer"></div>
      <div class="header-content">
        <router-link to="/register" class="nav-button">注册</router-link>
        <!-- 使用router-link导航到注册页面，现在看起来像按钮 -->
        <span class="separator">|</span>
        <router-link to="/" class="nav-button">登录</router-link>
        <!-- 使用router-link导航到登录页面，现在看起来像按钮 -->
      </div>
    </nav>
  </header>
</template>
  
  <script>
export default {
  name: "AppHeader",
};
</script>
  
  <style scoped>
.app-header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}
.title {
  position: absolute; /* 或者根据你的布局需求选择合适的定位方式 */
  left: 50%;
  transform: translateX(-50%);
  font-size: 25px;
  color: #76bfea;
  transition: font-weight 0.3s ease; /* 添加过渡效果 */
}

.title:hover {
  font-weight: bold;
}

.spacer {
  flex-grow: 1;
}

.header-content {
  display: flex;
  align-items: center;
}

.nav-button {
  display: inline-block;
  background-color: #e6f7ff;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  margin: 0 0.5rem;
  transition: background-color 0.3s;
}

.nav-button:hover {
  background-color: #b3e0ff;
}

.separator {
  margin: 0 0.5rem;
  color: #333;
}
</style>
  