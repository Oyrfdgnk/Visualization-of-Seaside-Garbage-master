<template>
  <div>
    <h3>热力图--根据kg</h3>
    <papa_parse @getObject="setHeatdata">获取heatMapData</papa_parse>
    <button @click="darwMap">drawMap</button>
    <div id="tooltip" class="tooltip"></div>
    <div ref="Map" id="main"></div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
// eslint-disable-next-line no-unused-vars
import NorwayJSON from "../assets/json/norway-with-regions_.json"
// eslint-disable-next-line no-unused-vars
import NorwaymapJson1 from '../assets/json/NorwayMap.json'
// eslint-disable-next-line no-unused-vars
import mapJson2 from '../assets/json/kommuner_komprimert.json'
import papa_parse from "@/components/papa_parse";

export default {
  //name: "Norway_map",
  components:{
    papa_parse,
  },
  data(){
    return{
      regions:[
        {
          name:"Troms",
          itemStyle: {
            areaColor: '#374ba4',
            opacity: 1,
          }
        },
        {
          name:'Aust-Agder',
          itemStyle: {
            areaColor: '#fe9b45',
            opacity: 1,
          },
        },
        {
          name: 'Buskerud',
          itemStyle: {
            areaColor: '#ffc556',
            opacity: 1,
          },
        },
      ],

      scatter:[
        {name:'1',value:[11.5358, 58.868,9],rubType:{personal_use: 20, fisheries: 39, industrial: 20, hygiene: 0, others: 12},symbolSize: 10},
        { name: 'Point 1', value: [12.5358, 56.868,9], rubType: { personal_use: 10, fisheries: 5, industrial: 20, hygiene: 8, others: 15 } },
        { name: 'Point 2', value: [10.5358, 59.868,9], rubType: { personal_use: 5, fisheries: 12, industrial: 18, hygiene: 7, others: 10 } },
        // ... 更多散点数据
      ],
      heatdata1:[[6.595407938897836, 67.06621414564643,10], [12.5358, 56.868,5]],
      heatdata2:[[6.595407938897836, 59.868,10], [10.5358, 56.868,5]],
      //chartID:'bar-chart-' + Math.random().toString(36).substr(2, 9),
    }
  },
  mounted() {
    this.darwMap()
  },
  methods:{
    darwMap(){
      //初始化一个echarts容器
      const myChart=echarts.init(this.$refs.Map);
      echarts.registerMap('norway',NorwaymapJson1)
      // eslint-disable-next-line no-unused-vars
      const randomColor=this.getRandomColor();
      // eslint-disable-next-line no-unused-vars
      var colorPalette = echarts.color.palette;
      var geo_labelFontSize=10;
      // eslint-disable-next-line no-unused-vars
     var data=this.heatdata;
      // 配置 visualMap，分别为两个热力图设置不同颜色
      var visualMap1 = {
        type: 'continuous',
        min: 0,
        max: 10,
        inRange: {
          color: ['#ffeda0', '#feb24c', '#f03b20']  // 设置热力图1的颜色
        },
        seriesIndex: 0  // 关联 visualMap 到对应的系列（热力图1）
      };

      var visualMap2 = {
        type: 'continuous',
        min: 0,
        max: 10,
        inRange: {
          color: ['#edf8b1', '#7fcdbb', '#2c7fb8']  // 设置热力图2的颜色
        },
        seriesIndex: 1  // 关联 visualMap 到对应的系列（热力图2）
      };
      var option={
        geo:{
          type: 'map',
          map:'norway',//用上述注册地图
          roam: true,//是否允许缩放
          zoom:10,//初始化大小
          scaleLimit:{
            min:1,
            max:500,
          },
          label:{
            show:true,
            fontSize:geo_labelFontSize
          },
          //设置中心点
          center:[6.595407938897836,
            67.06621414564643],
          //省份地图添加背景
          regions: this.regions,
          itemStyle: {
            areaColor: 'white',
            //areaColor:{},
            color: 'red',
            borderColor: '#232652',
            borderWidth: 2,
          },
          //高亮状态
          emphasis: {
            itemStyle: {
              areaColor: '#1af',
              color: '#fff',
            },
          },
        },
        tooltip: {
          // trigger:"item",
        },
        visualMap: [visualMap1, visualMap2],
          //配置属性
          series: [{
          name:'heatmap1',
            type: 'heatmap',
            coordinateSystem: 'geo',

            data:this.heatdata1,
            emphasis: {
              itemStyle: {
                borderColor: '#333',
                borderWidth: 1
              }
            },
          },
            {
              name:'heatmap2',
              type: 'heatmap',
              coordinateSystem: 'geo',
              data:this.heatdata2,
              emphasis: {
                itemStyle: {
                  borderColor: '#333',
                  borderWidth: 1
                }
              },
            },
          ],
        }
      console.log('this option',option)
      myChart.setOption(option)
    },
    setScatter(data){
      console.log("map_object:    ",data)
      console.log(data.length)
      for(var i=1;i<data.length;i++){
        var tem={name:i,value:data[i].point,rubType:data[i].type,symbolSize: 12}
        this.scatter.push(tem)
      }
      console.log("scatter:   ",this.scatter)
    },
    setHeatdata(data){
      for(var i=1;i<data.length;i++){
        var value=[data[i].point[0],data[i].point[1],data[i].kg_of_collected_waste]
        var tem={name:i,value:value}
        this.heatdata.push(tem)
      } console.log('heat',this.heatdata)
    },
    getRandomColor(){
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
    },
    // 计算标签字体大小的函数，根据需要自行定义
    calculateLabelFontSize(zoomLevel) {
      const scale = (zoomLevel - 1) / (80 - 1);

      // 根据缩放比例调整字体大小
      const minFontSize = 5; // 最小字体大小
      const maxFontSize = 45; // 最大字体大小
      const fontSizeRange = maxFontSize - minFontSize; // 字体大小范围

      // 计算当前缩放级别对应的字体大小
      var currentFontSize = minFontSize + scale * fontSizeRange;
      if(zoomLevel<2){
        currentFontSize=1
      }
      return currentFontSize;
    },
    autoTextfontsize(zoomLevel){
      // 获取当前地图缩放级别
      //let zoomLevel = myChart.getOption().geo[0].zoom;
      console.log('zoomLevel',zoomLevel)
      // 根据缩放级别调整标签的字体大小
      var geo_labelFontSize=10
      geo_labelFontSize = this.calculateLabelFontSize(zoomLevel);
      console.log("geo_labelFontSize",geo_labelFontSize)
      return geo_labelFontSize
    },

  }
}
</script>

<style scoped>
#main{
  width: 1000px;
  height: 800px;
  border: 1px solid red;
}
</style>