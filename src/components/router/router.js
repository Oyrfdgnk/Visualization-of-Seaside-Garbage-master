import Vue from 'vue';
import VueRouter from 'vue-router';
import homePage from '@/components/Login/homePage.vue'; // Replace with the path to your actual Home component
import registerPage from '@/components/Login/registerPage.vue'; // Replace with the path to your actual Home component
import showMap from '@/components/showMap.vue'; // Replace with the path to your actual Home component
import showFigure from '@/components/Aside/Barplot.vue'; // Replace with the path to your actual Home component

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'homePage',
    component: homePage,
  },
  {
    path: '/register',
    name: 'registerPage',
    component: registerPage,
  },
  {
    path: '/map',
    name: 'map',
    component: showMap,
  },

  {
    path: '/map/figure',
    name: 'figure',
    component: showFigure,
  },
];

const router = new VueRouter({
  mode: 'history', 
  routes,
});

export default router;
