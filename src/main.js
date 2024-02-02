import Vue from 'vue'
import App from './App.vue'
import * as echartsGmap from 'echarts-extension-gmap'
import router from './components/router/router.js'; // 导入router.js中定义的路由器

import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css'; // 导入样式

Vue.config.productionTip = false
Vue.use(echartsGmap, {
  load: {
    key: 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg',
  },
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
