<template>
  <div>
    <h3>Echarts</h3>
    <div ref="chinaMap" id="main">
      <!-- Your content goes here -->
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import chinaJSON from '../assets/json/china.json'

export default {
  data() {
    return {
      regions: [
        {
          name: '湖北省',
          itemStyle: {
            areaColor: '#374ba4',
            opacity: 1,

          },
        },
        {
          name: '四川省',
          itemStyle: {
            areaColor: '#fe9b45',
            opacity: 1,
          },
        },
        {
          name: '陕西省',
          itemStyle: {
            areaColor: '#fd691b',
            opacity: 1,
          },
        },
        {
          name: '黑龙江省',
          itemStyle: {
            areaColor: '#ffc556',
            opacity: 1,
          },
        },
      ],
      scatter: [
        {name: '北京烤鸭', value: [116.46122, 39.97886,1]},
        {name: '兰州拉面', value: [103.86615, 36.040129, 9]},
        {name: '新疆烤肉', value: [87.613228, 43.810394, 9]},
        {name: '131', value: [112.915204, 28.207735, 9]},
        {name: '西安肉夹馍', value: [111.953445, 34.288842, 9]},


      ]
    }
  },
  mounted() {
    //console.log("jiazaiwanbi");
    this.drawChina()
  },
  methods: {
    drawChina() {
      //初始化一个echarts容器
      let myChart = echarts.init(this.$refs.chinaMap)
      // this.drawChina(myChart)
      echarts.registerMap('china', chinaJSON) //注册可用的地图
      var option = {
        geo: {
          map: 'china',
          roam: true, //是否允许缩放，拖拽
          zoom: 1, //初始化大小
          //缩放大小限制
          scaleLimit: {
            min: 1, //最小
            max: 2, //最大
          },
          //设置中心点
          center: [115.97, 29.71],
          //省份地图添加背景
          regions: this.regions,
          itemStyle: {
            areaColor: 'white',
            color: 'red',
            borderColor: '#232652',
            borderWidth: 2,
          },
          //高亮状态
          emphasis: {
            itemStyle: {
              areaColor: '#1af9e5',
              color: '#fff',
            },
          },
        },
        //配置属性
        series: {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: this.scatter,
          showEffectOn: 'render',
          rippleEffect: {
            //涟漪特效相关配置
            brushType: 'stroke', //波纹的绘制方式，可选 'stroke' 和 'fill'
          },
          hoverAnimation: true, //是否开启鼠标 hover 的提示动画效果
          label: {
            //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true,
            },
          },
          itemStyle: {
            //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时
            normal: {
              color: 'red', //散点的颜色
              shadowBlur: 10,
              shadowColor: 20,
              fontSize: '5px',
            },
          },
          zlevel: 1,
        }
      }
      myChart.setOption(option)
    },
    getRandomColor() {
      // 生成随机的 R、G 和 B 分量
      const r = Math.floor(Math.random() * 256); // 0 到 255
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);

      // 将分量转换为十六进制，并保证字符串长度为 2
      const rHex = r.toString(16).padStart(2, '0');
      const gHex = g.toString(16).padStart(2, '0');
      const bHex = b.toString(16).padStart(2, '0');

      // 返回随机颜色的字符串表示，格式为 '#RRGGBB'
      return `#${rHex}${gHex}${bHex}`;
    }
  }
}
</script>

<style scoped>
#main {
  width: 1000px;
  height: 800px;
  /*border: 1px solid red;*/
}
</style>