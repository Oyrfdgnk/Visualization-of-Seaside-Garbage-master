<template>
  <div>
    <div class="aside-menu-container">
      <div class="toggle-collapse" @click="toggleCollapse">
        <i class="el-icon-arrow-left" v-if="isCollapse"></i>
        <i class="el-icon-arrow-right" v-else></i>
      </div>
      <div class="aside-menu" :class="{ 'is-collapse': isCollapse }">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">图像</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click.native="navigateToShowMap"
                >Map</el-menu-item
              >
              <el-menu-item index="1-2" @click.native="navigateToShowFigure"
                >Bar plot</el-menu-item
              >

              <el-menu-item index="1-3">Line graph</el-menu-item>
              <el-menu-item index="1-4">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">Upload</span>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">Tendency</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">Tendency1</el-menu-item>
              <el-menu-item index="3-2">Tendency2</el-menu-item>
              <el-menu-item index="3-3">Tendency3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "AsideMenu",
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse; //缩放
    },
    navigateToShowFigure() {
      if (this.$route.name !== "figure") {
        this.$router.push({ name: "figure" }); // 导航到图表
      }
    },
    navigateToShowMap() {
      if (this.$route.name !== "map") {
        this.$router.push({ name: "map" }); // 导航到地图
      }
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
  html, body, #app {
    height: 100%;
    margin: 0; /* 移除默认的边距 */
    padding: 0; /* 移除默认的内边距 */
  }
.top-nav {
  background-image: linear-gradient(
    to bottom,
    #a6d6e1,
    #88d2f5
  ); /* 蓝白色渐变 */
  color: #333; /* 字体颜色 */
  padding: 20px 20px; /* 增加填充以使导航栏更粗 */
  text-align: center;
  font-size: 20px;
  font-weight: bold; /* 字体加粗 */
}
.aside-menu-container {
    display: flex;
    flex-direction: column;
    color: #333;
    height: 100vh; /* 这将使侧边菜单占据整个视口的高度 */
    overflow: hidden; /* 防止内容溢出 */
  }

/* 其他样式保持不变 */

.toggle-collapse {
  cursor: pointer;
  margin-right: 10px; /* 调整箭头与菜单之间的间距 */
}

.aside-menu {
  transition: width 0.3s ease;
  position: relative;
  height: 200%;
}

.is-collapse {
  width: 64px; /* 折叠状态的宽度 */
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px; /* 非折叠状态下的宽度 */
}
/* 根据需要添加或调整更多样式 */
</style>