<template>
  <div id="echarts-google-map"></div>
</template>

<script>
import * as echarts from "echarts";
import 'echarts-extension-gmap';
export default {
  name: "gMapTest",
  mounted() {
    this.initGMap();
  },
  methods: {
    initGMap() {
      let myChart = echarts.init(document.getElementById("echarts-google-map"));
      let option = {
        gmap: {
          // initial options of Google Map
          // See https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions for details
          // initial map center, accepts an array like [lng, lat] or an object like { lng, lat }
          center: [108.39, 39.9],
          // center: { lng: 108.39, lat: 39.9 },
          // initial map zoom
          zoom: 4,

          // whether ECharts layer should be re-rendered when the map is moving. `true` by default.
          // if false, it will only be re-rendered after the map `moveend`.
          // It's better to set this option to false if data is large.
          renderOnMoving: true,
          // the zIndex of echarts layer for Google Map. `2000` by default.
          echartsLayerZIndex: 2019,
          // whether to enable gesture handling. `true` by default.
          // since v1.4.0
          roam: true
        },
      }
      myChart.setOption(option);
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
html,
body,
#echarts-google-map {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>