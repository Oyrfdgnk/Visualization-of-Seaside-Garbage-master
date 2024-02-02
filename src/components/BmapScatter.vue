<template>
  <div class="bmap" id="bmap" ref="bmap" style="width: 100%;height: 100%; border: 1px solid red"></div>
</template>

<script>
import 'echarts/extension/bmap/bmap'
import * as echarts from 'echarts'
export default {
  name: "BmapScatter",
  mounted () {
    this.initBmap()
  },
  methods: {
    initBmap () {
      const myChart = echarts.init(this.$refs.bmap)
      myChart.setOption({
        bmap: {
          key: 'eQrizFSVmroF88r0pOoC3AQzdlOfluhg',
          center: [104.114129, 37.550339] // 当前视角中心位置的坐标
        }
      })
    }
  }
}
</script>

<style scoped>

</style>