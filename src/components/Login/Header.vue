<!-- eslint-disable no-mixed-spaces-and-tabs -->
<template>
	<header class="app-header">
	  <nav class="navbar">
		<div>
		  <router-link to="/">首页</router-link> <!-- 使用router-link导航到首页 -->
		</div>
		<div class="spacer"></div>
		<div class="header-content">
		  <router-link to="/register">注册</router-link> <!-- 使用router-link导航到注册页面 -->
		  <span class="separator">|</span>
		  <router-link to="/">登录</router-link> <!-- 使用点击事件导航到登录页面 -->
		</div>
	  </nav>
	</header>
  </template>
  
  
  <script>
  export default {
	name: 'AppHeader',
  }
  </script>
  
  <style scoped>
  .app-header {
	/* Styles for the header */
	background-color: #ffffff; /* Change this to the color of your header */
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* This adds a slight shadow to the header */
  }
  
  .navbar {
	/* Styles for the navbar */
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem;
  }
  
  .logo button {
	/* Styles for the logo button */
	background-color: transparent;
	border: none;
	cursor: pointer;
	font-size: 16px;
	color: #333; /* Change this to the color you prefer */
	padding: 0;
	margin: 0;
	text-decoration: underline;
  }
  
  .spacer {
	/* Spacer between logo and other content */
	flex-grow: 1;
  }
  
  .header-content {
	/* Styles for the right side of the header */
	display: flex;
	align-items: center;
  }
  
  .header-content button {
	/* Styles for the buttons in header-content */
	background-color: transparent;
	border: none;
	cursor: pointer;
	font-size: 16px;
	color: #333; /* Change this to the color you prefer */
	padding: 0;
	margin: 0;
	text-decoration: underline;
  }
  
  .separator {
	/* Separator between login and register */
	margin: 0 0.5rem; /* Adjust the spacing as needed */
	color: #333; /* Change this to the color you prefer */
  }
  </style>
  

  